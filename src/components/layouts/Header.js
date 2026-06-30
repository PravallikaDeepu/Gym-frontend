import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import "../../assets/styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="header-container">
      
      {/* Left - Logo */}
      <div className="logo-section">
        <div className="logo-circle"></div>
        <h2>GymApp</h2>
      </div>

      {/* Center - Welcome */}
      <div className="welcome-section">
        <h2>
          Welcome back,{" "}
          <span>
            {user?.firstName} {user?.lastName}
          </span> 👋
        </h2>
        <p>Manage your fitness journey with ease.</p>
      </div>

      {/* Right - Actions */}
      <div className="right-section">

        {/* Notification */}
        <div className="bell">
          <FaBell />
          <span className="badge">3</span>
        </div>

        {/* Profile */}
        <div
          className="profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="avatar">
            {user?.firstName?.charAt(0)}
          </div>
          <span>
            {user?.firstName}
          </span>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

      </div>
    </header>
  );
}

export default Header;