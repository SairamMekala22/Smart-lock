import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Include your custom CSS file.

const App = () => {
  return (
    <div className="center-vertically">
      <div className="container custom-container p-2 shadow-sm">
        <h2 className="title text-center mb-2">RESET PASSWORD</h2>
        <div className="formbox mt-4.5 my-5">
          <form className="form ">
            <div className="row mb-4 form-items">
              <label htmlFor="username" className="col-sm-2 col-form-label texts">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="form-control w-75 rounded-pill shadow-sm"
                  placeholder="Enter the Username"
                />
              </div>
            </div>
            <div className="row mb-4">
              <label htmlFor="otp" className="col-sm-2 col-form-label texts">
                OTP
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  required
                  className="form-control w-75 rounded-pill shadow-sm"
                  placeholder="Enter OTP"
                />
              </div>
            </div>
            <div className="row mb-4 align-items-center">
              <label htmlFor="newPassword" className="col-sm-2 col-form-label texts">
                New Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  required
                  className="form-control w-75 rounded-pill shadow-sm"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-4 button">
              Verify OTP and Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

