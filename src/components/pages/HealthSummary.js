import {
  FaHeartbeat,
  FaWeight,
  FaFire,
  FaRunning,
} from "react-icons/fa";

import "../../assets/styles/HealthSummary.css";

function HealthSummary() {
  return (
    <div className="health-summary">

      <div className="health-header">
        <h3>Health Summary</h3>
      </div>

      <div className="health-grid">

        <div className="health-card bmi">
          <FaHeartbeat className="health-icon" />
          <h4>BMI</h4>
          <p>23.4</p>
          <span>Normal</span>
        </div>

        <div className="health-card weight">
          <FaWeight className="health-icon" />
          <h4>Weight</h4>
          <p>72 kg</p>
          <span>Current</span>
        </div>

        <div className="health-card calories">
          <FaFire className="health-icon" />
          <h4>Calories</h4>
          <p>540</p>
          <span>Today</span>
        </div>

        <div className="health-card workout">
          <FaRunning className="health-icon" />
          <h4>Workout</h4>
          <p>18</p>
          <span>Sessions</span>
        </div>

      </div>

    </div>
  );
}

export default HealthSummary;