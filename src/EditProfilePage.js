import React, { useState } from "react";
import "./EditProfilePage.css";
import { useNavigate } from "react-router-dom";
const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "Username123",
    fullName: "John Doe",
    phone: "+1234567890",
    email: "johndoe@email.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    // Add logic to save updated data
    alert("Profile updated successfully!");
  };
  const handleEditProfile = () => {
    // navigate("/profile"); // Redirect to the Edit Profile Page
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="save-button" onClick={handleEditProfile}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;