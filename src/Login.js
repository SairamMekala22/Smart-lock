import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

let loggedIn = false;

function LoginSignup() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    fullName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, isSignup) => {
    e.preventDefault();
    const endpoint = isSignup ? "/signup" : "/owner-login";
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      // alert(response.data.message);
      loggedIn = response.data.loggedIn;
      if (loggedIn) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-page">
      <div className="App">
        <div className="button-container">
          <button className="login-btn" onClick={() => setIsFlipped(false)}>
            Login
          </button>
          <button className="login-btn" onClick={() => setIsFlipped(true)}>
            Signup
          </button>
        </div>
      </div>

      {/* <div className="ring"> */}
        <div className={`login-container ${isFlipped ? "isFlipped" : ""}`}>
          {/* Login Form */}
          <form className="login front" onSubmit={(e) => handleSubmit(e, false)}>
            
            <div className="inputBx">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <input type="submit" value="Login" />
            </div>
            <div className="links">
            <a href="reset-password">Forgot password?</a>
            </div>
          </form>

          {/* Signup Form */}
          <form className="login back" onSubmit={(e) => handleSubmit(e, true)}>
            
            <div className="inputBx">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      {/* </div> */}
    </div>
  );
}

export default LoginSignup;
