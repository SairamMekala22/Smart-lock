import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="login-page">
      {/* Button Container */}
      <div className="button-container">
        <button
          className="login-btn"
          onClick={() => setFlipped(false)}
        >
          Owner Login
        </button>
        <button
          className="login-btn"
          onClick={() => setFlipped(true)}
        >
          sign up
        </button>
      </div>

      {/* Animated Rings */}
      <div className="ring">
        <i style={{ "--clr": "#00ff0a" }}></i>
        <i style={{ "--clr": "#ff0057" }}></i>
        <i style={{ "--clr": "#fffd44" }}></i>

        {/* Login Form */}
        <div className={`login-container ${flipped ? "flipped" : ""}`}>
          {/* Owner Login */}
          <div className="login front">
            <h2>Login</h2>
            <div className="inputBx">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBx">
              <input type="password" placeholder="Password" />
            </div>
            <div className="inputBx">
              <input type="submit" value="owner login" />
            </div>
            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="#">Signup</a>
            </div>
          </div>

          {/* Guest Login */}
          <div className="login back">
            <h2>Sign-up</h2>
            <div className="inputBx">
              <input type="text" placeholder="Mobile Number" />
            </div>
            <div className="inputBx">
              <input type="text" placeholder="Full Name" />
            </div>
            <div className="inputBx">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBx">
              <input type="password" placeholder="Password" />
            </div>
            <div className="inputBx">
              <input type="submit" value="Sign Up" />
            </div>
            <div className="links">
              <a href="#">Account already exists? Back to login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
