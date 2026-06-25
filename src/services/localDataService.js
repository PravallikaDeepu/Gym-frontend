import Database from "@tauri-apps/plugin-sql";

/**
 * LocalDataService handling asynchronous persistence in both Tauri (SQLite) and Web (IndexedDB)
 * Eliminates UI "lag" by moving away from synchronous localStorage.
 */
const DB_NAME = "allvion_db";
const STORE_NAME = "kv_store";
const DB_VERSION = 1;

let idb = null;

const getIDB = () => {
  return new Promise((resolve, reject) => {
    if (idb) return resolve(idb);
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => {
      idb = e.target.result;
      resolve(idb);
    };
    request.onerror = (e) => reject(e.target.error);
  });
};

export const localDataService = {
  db: null,

  async getDb() {
    if (!window.__TAURI_INTERNALS__) return null;
    if (!this.db) {
      try {
        this.db = await Database.load("sqlite:allvion.db");
        // Ensure kv_store exists in SQLite for Tauri
        await this.db.execute(
          "CREATE TABLE IF NOT EXISTS kv_store (key TEXT PRIMARY KEY, value TEXT, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
        );
      } catch (err) {
        console.warn("LocalDataService: Failed to init SQLite", err);
        return null;
      }
    }
    return this.db;
  },

  /**
   * Universal data retrieval (IndexedDB for Web, SQLite for Tauri)
   */
  getData: async (key) => {
    try {
      // 1. Tauri (SQLite)
      if (window.__TAURI_INTERNALS__) {
        const db = await localDataService.getDb();
        if (db) {
          const result = await db.select(
            "SELECT value FROM kv_store WHERE key = $1",
            [key]
          );
          if (result && result.length > 0) {
            return JSON.parse(result[0].value);
          }
        }
      }

      // 2. Web (IndexedDB)
      const db = await getIDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      // Final Fallback: localStorage (only for small legacy keys or emergencies)
      const fallback = localStorage.getItem(`allvion_cache_${key}`);
      return fallback ? JSON.parse(fallback) : null;
    }
  },

  /**
   * Universal data saving
   */
  saveData: async (key, data) => {
    try {
      // 1. Tauri (SQLite)
      if (window.__TAURI_INTERNALS__) {
        const db = await localDataService.getDb();
        if (db) {
          await db.execute(
            "INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
            [key, JSON.stringify(data)]
          );

          // Pro-Grade: Emit global sync event to other windows
          try {
            const { emit } = await import("@tauri-apps/api/event");
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            const appWindow = getCurrentWindow();
            emit("allvion://data-updated", { key, sender: appWindow.label });
          } catch (err) {
            console.warn("LocalDataService: Failed to emit sync event", err);
          }
        }
      }

      // 2. Web (IndexedDB)
      const db = await getIDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(data, key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error(`LocalDataService: Failed to save data for key ${key}`, e);
      // Fallback: localStorage (Try to save but it might fail if quota is low)
      try {
        localStorage.setItem(`allvion_cache_${key}`, JSON.stringify(data));
      } catch (err) {}
    }
  },

  /**
   * Chat persistence logic (Kept for compatibility)
   */
  saveConversation: async (conv) => {
    if (!window.__TAURI_INTERNALS__) return;
    try {
      const db = await localDataService.getDb();
      if (!db) return;
      await db.execute(
        "INSERT OR REPLACE INTO conversations (id, type, members_details, members, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [
          conv.conversationId || conv._id || conv.id,
          conv.type || "direct",
          conv.members_details ? JSON.stringify(conv.members_details) : null,
          conv.members ? JSON.stringify(conv.members) : null,
          conv.updated_at || new Date().toISOString(),
        ]
      );
    } catch (e) {
      console.error("LocalDataService: Failed to save conversation", e);
    }
  },

  saveMessage: async (msg) => {
    if (!window.__TAURI_INTERNALS__) return;
    try {
      const db = await localDataService.getDb();
      if (!db) return;

      if (msg.conversationId) {
        await db.execute(
          "INSERT OR IGNORE INTO conversations (id, type) VALUES ($1, $2)",
          [msg.conversationId, "direct"]
        );
      }

      await db.execute(
        "INSERT OR IGNORE INTO messages (local_id, remote_id, conversation_id, sender_id, msg_type, content, media, status, sync_status, is_local, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        [
          msg.messageId || msg._id || `local-${Date.now()}`,
          msg.remoteId || null,
          msg.conversationId,
          msg.senderId || msg.sender,
          msg.type || "text",
          msg.content || msg.text || "",
          msg.media ? JSON.stringify(msg.media) : null,
          msg.status || "sent",
          msg.syncStatus || 0,
          msg.is_local || 0,
          msg.createdAt || new Date().toISOString(),
        ]
      );
    } catch (e) {
      console.error("LocalDataService: Failed to save message", e);
    }
  },

  /**
   * ETag Storage for Smart Refresh Caching (Now using IndexedDB/SQLite Async)
   */
  async getEtag(url) {
    try {
      const etagKey = `allvion_etag_${url}`;
      return await this.getData(etagKey);
    } catch (e) {
      return null;
    }
  },

  async saveEtag(url, etag, data) {
    try {
      const etagKey = `allvion_etag_${url}`;
      const etagObj = {
        etag,
        data,
        timestamp: Date.now(),
      };
      // await this.saveData(etagKey, etagObj);
    } catch (e) {
      console.error(`LocalDataService: Failed to save ETag for ${url}`, e);
    }
  },

  /**
   * Removes item from persistence
   */
  clearData: async (key) => {
    try {
      // 1. Tauri
      if (window.__TAURI_INTERNALS__) {
        const db = await localDataService.getDb();
        if (db) {
          await db.execute("DELETE FROM kv_store WHERE key = $1", [key]);
          await db.execute("DELETE FROM messages WHERE conversation_id = $1", [
            key,
          ]);
        }
      }

      // 2. Web (IndexedDB)
      const db = await getIDB();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      await store.delete(key);

      // 3. Fallback cleanup
      localStorage.removeItem(`allvion_cache_${key}`);
      localStorage.removeItem(`allvion_etag_${key}`);
    } catch (e) {
      console.error("LocalDataService: Failed to clear data", e);
    }
  },
};











