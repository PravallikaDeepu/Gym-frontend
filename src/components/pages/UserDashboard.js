import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/UserDashboard.css";
import Sidebar from "./Sidebar";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  return (
   <>
    <div className="dashboard-header">
      <div className="header-left"></div>


      <h1 className="welcome-text">
        Welcome, {user?.name}
      </h1>

      {/* Logout */}
      <button
        className="btn btn-light rounded-pill logout-btn"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
    <Sidebar/>
   </>
  );
}