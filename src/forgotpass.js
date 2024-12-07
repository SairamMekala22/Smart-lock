import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./forgotpass.css"; // Include your modular CSS file.

const ForgotPassword = () => {
  return (
    <div className="center-vertically">
      <div className="container custom-container p-2 shadow-sm">
        <h2 className="title text-center">FORGOT PASSWORD?</h2>
        <div className="formbox">
          <form className="form mt-5 my-5">
            <div className="row mb-4 form-items">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="form-control w-75 rounded-pill shadow-sm"
                  placeholder="Enter your Username"
                  aria-label="Username"
                  aria-describedby="username-icon"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 button">
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
