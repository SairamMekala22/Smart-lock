import React, { useState } from "react";
import "./Dashboard.css";

const App = () => {
  const [lockedDoors, setLockedDoors] = useState({
    "Main Door": true,
    "Door - 1": true,
    "Door - 2": true,
  });

  const toggleLock = (door) => {
    setLockedDoors((prevState) => ({
      ...prevState,
      [door]: !prevState[door],
    }));
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

      {/* Dashboard */}
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="quickActions">
            <h2>Quick Actions</h2>
            <div className="door">
              {Object.keys(lockedDoors).map((door, index) => (
                <button
                  key={index}
                  className="lock-btn"
                  onClick={() => toggleLock(door)}
                >
                  <h3>{door}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    className={`bi ${
                      lockedDoors[door] ? "bi-lock-fill" : "bi-unlock-fill"
                    }`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      d={
                        lockedDoors[door]
                          ? "M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"
                          : "M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m-4 6v4h8V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"
                      }
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className="quickActions">
            <h2>System Status</h2>
                <div class="recent_act">
                <div>
                  <span >Battery:</span>
                  <span >75%</span>
                </div>
                <div>
                  <span>Wi-Fi Signal:</span>
                  <span >Strong</span>
                </div>
                <div>
                  <span >Last Update:</span>
                  <span >10 minutes ago</span>
                </div>
                <button class="buttonn">Check for Updates</button>
                </div>
                
          </div>
        </div>
        <div className="dashboard-content">
          <div className="quickActions">
            <h2>recent activities</h2>
            <div class="recent_act">
              <ul>
                  <li>🔔 Door unlocked by Deekshitha (2 hours ago)</li>
                  <li>🔔 Door locked automatically (4 hours ago)</li>
                  <li>🔔 Battery low warning (1 day ago)</li>
              </ul>
            </div>
          </div>
          <div className="quickActions">
            <h2>Manage guests</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
