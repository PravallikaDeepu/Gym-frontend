import { FaMapMarkerAlt, FaCrown, FaQrcode, FaHeartbeat, FaCreditCard } from "react-icons/fa";
import "../../assets/styles/TopActions.css";

function TopActions() {
  return (
  <div className="top-actions-container">

  <div className="left-section">
    <div className="search-box">
      <FaMapMarkerAlt className="search-icon" />
      <input type="text" placeholder="Search or explore nearby gyms..." />
      <button>Search</button>
    </div>
  </div>

  <div className="right-section">
    <div className="quick-actions">

      <div className="action-card membership">
        <FaCrown className="icon" />
        <div>
          <h4>My Membership</h4>
          <p className="active">Active</p>
        </div>
      </div>

      <div className="action-card qr">
        <FaQrcode className="icon" />
        <div>
          <h4>Show QR Code</h4>
          <p>For Check-in</p>
        </div>
      </div>

      <div className="action-card bmi">
        <FaHeartbeat className="icon" />
        <div>
          <h4>BMI Tracker</h4>
          <p>Track Progress</p>
        </div>
      </div>

      <div className="action-card payments">
        <FaCreditCard className="icon" />
        <div>
          <h4>Payments</h4>
          <p>View History</p>
        </div>
      </div>

    </div>
  </div>

</div>
  );
}

export default TopActions;