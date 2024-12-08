import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [isLocked, setIsLocked] = useState(true);


  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-collapsed"></div>
          <span className="logo-text">SMART SHIELD</span>
        </div>
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
        <div className="sidebar-footer">
          <img
            src="https://assets.aceternity.com/manu.png"
            alt="Avatar"
            className="avatar"
          />
          <span className="username">User name</span>
        </div>
      </div>

      {/* Dash-content */}
      <div>
        <div className="dash-content">
          <h3>Quick actions</h3>
          <button className="action-button" onClick={toggleLock}>
            Main Door
            <img
              src={
                isLocked
                  ? "https://cdn-icons-png.flaticon.com/512/3064/3064197.png" // Lock icon
                  : "https://cdn-icons-png.flaticon.com/512/3064/3064237.png" // Unlock icon
              }
              alt={isLocked ? "Lock Icon" : "Unlock Icon"}
              className="button-icon"
            />
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
          <img className="cam" src="http://192.168.0.112/" width="778" height="883" alt="live stream"></img>

      </div>
    </div>
  );
};

export default Dashboard;