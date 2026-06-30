import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaDumbbell,
  FaChartLine,
  FaUser,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";


export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <span className="logo-icon">🏋️</span>
        <h2>GymApp</h2>
      </div>

      {/* Menu */}
      <nav className="menu">
        <NavLink to="/home" className="menu-item">
          <FaHome /> <span>Home</span>
        </NavLink>

        <NavLink to="/explore" className="menu-item">
          <FaSearch /> <span>Explore Gyms</span>
        </NavLink>

        <NavLink to="/plans" className="menu-item">
          <FaDumbbell /> <span>Membership Plans</span>
        </NavLink>

        <NavLink to="/bmi" className="menu-item">
          <FaChartLine /> <span>BMI Tracker</span>
        </NavLink>

        <NavLink to="/profile" className="menu-item">
          <FaUser /> <span>Profile</span>
        </NavLink>

        <NavLink to="/payments" className="menu-item">
          <FaMoneyBill /> <span>Payments</span>
        </NavLink>

        <NavLink to="/settings" className="menu-item">
          <FaCog /> <span>Settings</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="logout">
        <button>Logout</button>
      </div>
    </div>
  );
}