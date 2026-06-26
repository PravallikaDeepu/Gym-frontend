import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/UserDashboard.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/user/home" },
    { name: "My Gym", path: "/user/gym" },
    { name: "Membership Plans", path: "/user/plans" },
    { name: "BMI Tracker", path: "/user/bmi" },
    { name: "Payments", path: "/user/payments" },
    { name: "Settings", path: "/user/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🏋️ GymApp</h2>

      <ul className="menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}