// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import '../src/index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="107678866199-sup9p5u1um5r1k2c9i9t70obge9cpi8t.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);