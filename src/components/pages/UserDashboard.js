import React from "react";
import "../../assets/styles/UserDashboard.css";

import Sidebar from "./Sidebar";
import TopActions from "./TopActions";
import MembershipOverview from "./MembershipOverview";
import NearbyGyms from "./NearbyGyms";
import RecentCheckins from "./RecentCheckins";
import HealthSummary from "./HealthSummary";
// import Footer from "./Footer";

export default function UserDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">
          <h1 className="welcome-text">
            Welcome, {user?.name}
          </h1>
        </div>

        {/* Search + Quick Actions */}
        <TopActions />

        {/* Main Content */}
        <div className="dashboard-content">

          {/* Left Column */}
          <div className="left-column">

            <MembershipOverview />

            <RecentCheckins />

          </div>

          {/* Right Column */}
          <div className="right-column">

             <NearbyGyms />
           <HealthSummary />

          </div>

        </div>

        {/* Footer */}
        {/* <Footer /> */}

      </div>

    </div>
  );
}