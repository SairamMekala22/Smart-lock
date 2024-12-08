import React from "react";
import "./forgotpass.css";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <form className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="form-input"
              placeholder="Enter your Username"
            />
          </div>
          <button type="submit" className="submit-btn">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;