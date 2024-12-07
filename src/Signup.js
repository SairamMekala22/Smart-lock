import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleOwnerSignup = () => {
    setIsFlipped(false);
  };

  const handleGuestSignup = () => {
    setIsFlipped(true);
  };

  return (
    <div>
      {/* Button container for Owner and Guest Signup */}
      <div className="button-container">
        <button className="signup-btn" onClick={handleOwnerSignup}>
          Owner Signup
        </button>
        <button className="signup-btn" onClick={handleGuestSignup}>
          Guest Signup
        </button>
      </div>

      {/* Animated Rings */}
      <div className="ring">
        {/* <i style={{ "--clr": "#fffd44" }}></i> */}
        <div className={`signup-container ${isFlipped ? "flipped" : ""}`}>
          {/* Owner Signup Form (Front side) */}
          <div className="signup front">
            <h2>Sign-up</h2>
            <div className="inputBx">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBx">
              <input type="text" placeholder="Email " />
            </div>
            <div className="inputBx">
              <input type="text" placeholder="Mobile Number" />
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

          {/* Guest Signup Form (Back side) */}
          <div className="signup back">
            <h2>Guest Sign-up</h2>
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

export default Signup;
