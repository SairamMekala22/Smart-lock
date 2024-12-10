import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const ESP_BASE_URL = "http://192.168.142.106"; // Replace with your ESP's IP address

const Dashboard = () => {
  // const [isLocked, setIsLocked] = useState(true);
  const [isLocked, setisLocked] = useState(false);

  // Fetch initial states on load
  useEffect(() => {
    fetchLockStatus();
  }, []);

  const fetchLockStatus = async () => {
    try {
      const response = await fetch(`${ESP_BASE_URL}/lock/status`);
      const data = await response.json();
      setisLocked(data.state === 1);
    } catch (error) {
      console.error("Failed to fetch lock status:", error);
    }
  };



  const toggleLock = async () => {
    try {
      const newState = !isLocked ? "1" : "0";
      const response = await fetch(`${ESP_BASE_URL}/lock/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: newState }),
      });
      const data = await response.json();
      setisLocked(data.state === 1);
    } catch (error) {
      console.error("Failed to toggle lock:", error);
    }
  };
  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-collapsed"></div>
          <span className="logo-text">SMART SHIELD</span>
        </div>
        <div class="icon-section">
        <ul className="menu">
          <li>
            <i className="fas fa-home"></i>
            <span className="menu-label">Dashboard</span>
          </li>
          <li>
            <i className="fas fa-user"></i>
            <span className="menu-label">Profile</span>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <span className="menu-label">Settings</span>
          </li>
          <li>
            <i className="fas fa-sign-out-alt"></i>
            <span className="menu-label">Logout</span>
          </li>
        </ul>
        </div>
        <div className="sidebar-footer">
          {/* <img
            src=""
            alt="Avatar"
            className="avatar"
          /> */}
          <span className="username"></span>
        </div>
      </div>
      <div className="dashboard-content">
       <div class="dash-info">
           <div className="dash-content">
             <h3>Control Devices</h3>
               <button className="action-button" onClick={toggleLock}>
                 Lock: {isLocked ? "ON" : "OFF"}
               </button>
           </div>
           <div className="dash-content">
             <h3>Recent Activities</h3>
             <div className="recent_act">
               <ul>
               <li>🔔 Door unlocked by Deekshitha (2 hours ago)</li>
               <li>🔔 Door locked automatically (4 hours ago)</li>
               <li>🔔 Battery low warning (1 day ago)</li>
               </ul>
             </div>
           </div>
       </div>
       <div className="camview">
         <h3>Cam view</h3>
         <img
           className="cam"
           src="http://192.168.0.112/" // Replace with your camera stream URL
           width="778"
           height="883"
           alt="Live stream" />
       </div>
      </div>
    </div>
  );
};

export default Dashboard;