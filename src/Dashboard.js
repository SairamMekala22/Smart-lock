// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [isLocked, setIsLocked] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("You must log in first!");
//       window.location.href = "/"; // Redirect to login page
//     } else {
//       // Verify token and fetch user info
//       axios
//         .get("http://localhost:5000/authenticated", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setUser(response.data.user);
//           setIsAuthenticated(true);
//         })
//         .catch((error) => {
//           console.error("Authentication failed:", error.response?.data || error);
//           alert("Session expired. Please log in again.");
//           localStorage.removeItem("token");
//           window.location.href = "/"; // Redirect to login page
//         });
//     }
//   }, []);

//   const toggleLock = () => {
//     setIsLocked(!isLocked);
//   };

//   const handleLogout = () => {
//     localStorage.clear(); // Clear all localStorage
//     alert("You have been logged out!");
//     window.location.href = "/"; // Redirect to login page
//   };
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [isLocked, setIsLocked] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/authenticated", { withCredentials: true })
      .then((response) => {
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          alert("Session expired. Please log in.");
          window.location.href = "/";
        }
      })
      .catch(() => {
        alert("Authentication error");
        window.location.href = "/";
      });
  }, []);

  const handleLogout = () => {
    axios.post("http://localhost:5000/logout", {}, { withCredentials: true }).then(() => {
      alert("Logged out successfully");
      window.location.href = "/";
    });
  };
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
          <li onClick={handleLogout}>
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
          <span className="username">{user ? user.username : "Loading..."}</span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1>Welcome to your Dashboard</h1>
        {user ? (
          <p>Welcome, {user.username}</p>
        ) : (
          <p>Loading user information...</p>
        )}

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="action-button" onClick={toggleLock}>
            Main Door
            <img
              src={
                isLocked
                  ? "https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
                  : "https://cdn-icons-png.flaticon.com/512/3064/3064237.png"
              }
              alt={isLocked ? "Lock Icon" : "Unlock Icon"}
              className="button-icon"
            />
          </button>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            <li>🔔 Door unlocked by Deekshitha (2 hours ago)</li>
            <li>🔔 Door locked automatically (4 hours ago)</li>
            <li>🔔 Battery low warning (1 day ago)</li>
          </ul>
        </div>

        <div className="cam-view">
          <h3>Cam View</h3>
          <img
            className="cam"
            src="http://192.168.0.112/"
            width="778"
            height="883"
            alt="Live Stream"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
