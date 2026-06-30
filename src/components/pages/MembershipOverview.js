import { FaCrown, FaDumbbell } from "react-icons/fa";
import "../../assets/styles/MembershipOverview.css";

function MembershipOverview() {
  // Later this data will come from backend
  const membership = {
    planName: "Premium Plan",
    status: "Active",
    validUntil: "20 Jun 2025",
    daysLeft: 23,
  };

  return (
    <div className="membership-section">

      <div className="membership-header">
        <div className="membership-title">
          <FaCrown className="title-icon" />
          <h3>Your Membership</h3>
        </div>

        <button className="details-btn">
          View Details
        </button>
      </div>

      <div className="membership-card">

        <div className="membership-info">

          <div className="plan-row">
            <h2>{membership.planName}</h2>

            <span className="status">
              {membership.status}
            </span>
          </div>

          <div className="membership-details">

            <div>
              <p>Valid Until</p>
              <h3>{membership.validUntil}</h3>
            </div>

            <div className="divider"></div>

            <div>
              <p>Days Left</p>
              <h3>{membership.daysLeft} Days</h3>
            </div>

          </div>

        </div>

        <FaDumbbell className="membership-bg-icon" />

      </div>

    </div>
  );
}

export default MembershipOverview;