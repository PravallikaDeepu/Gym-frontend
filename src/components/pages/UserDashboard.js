import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  return (
   <div className="dashboard-header">
  <div className="row h-100 align-items-center">
    <div className="col-3"></div>

    <div className="col-6 text-center">
      <h1 className="welcome-text">
        Welcome, {user?.name} 👋
      </h1>
    </div>

    <div className="col-3 text-end pe-4">
      <button
        className="btn btn-light rounded-pill logout-btn"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
  </div>
</div>
  );
}