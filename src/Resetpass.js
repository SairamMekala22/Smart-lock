import React, { useState } from "react";
import axios from "axios";
import "./Resetpass.css"; // Include your custom CSS file.

const OTPVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify OTP & Reset Password
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      setMessage(response.data.message || "OTP sent successfully.");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      setMessage("OTP and new password are required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
        newPassword,
      });
      setMessage(response.data.message || "Password reset successfully.");
      if (response.status === 200) {
        setStep(3);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to verify OTP or reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="center-vertically">
      <div className="custom-container">
        <h2 className="title">RESET PASSWORD</h2>
        <div className="formbox">
          {step === 1 && (
            <form className="form">
              <div className="form-item">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="button" onClick={handleSendOtp} disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
              {message && <p className="message">{message}</p>}
            </form>
          )}

          {step === 2 && (
            <form className="form" onSubmit={handleVerifyAndResetPassword}>
              <div className="form-item">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  required
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP and Reset Password"}
              </button>
              {message && <p className="message">{message}</p>}
            </form>
          )}

          {step === 3 && <p className="message success">Password reset successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;