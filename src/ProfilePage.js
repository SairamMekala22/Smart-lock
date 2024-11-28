import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // Import the CSS file

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Redirect to the Edit Profile Page
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <h1 className="username">Username123</h1>
          <p className="detail">
            <strong>Full Name:</strong> John Doe
          </p>
          <p className="detail">
            <strong>Phone:</strong> +1234567890
          </p>
          <p className="detail">
            <strong>Email:</strong> johndoe@email.com
          </p>
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
