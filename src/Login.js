// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";

// function LoginSignup() {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [formData, setFormData] = useState({ username: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e, issignup) => {
//     e.preventDefault();
//     const endpoint = issignup ? '/signup' : '/owner-login';
//     try {
//       const response = await axios.post('http://localhost:5000${endpoint}', formData);
//       alert(response.data.message);
//     } catch (error) {
//       alert(error.response?.data?.message || 'An error occurred');
//     }
//   };
//   return (
//     <div className="login-page">
//       {/* Button Container */}
//       <div className="App">
//       <div className="button-container">
//         <button className="login-btn" onClick={() => setIsFlipped(false)}>
//           Owner Login
//         </button>
//         <button className="login-btn" onClick={() => setIsFlipped(true)}>
//           signup
//         </button>
//       </div>
//       </div>

//       {/* Animated Rings */}
//       <div className="ring">
       

//         {/* Login Form */}
//         <div className={`login-container ${isFlipped ? "isFlipped" : ""}`}>
        
            
//           {/* Owner Login */}
//           <form
//            className="login front"
//           onSubmit={(e) => handleSubmit(e, false)}>
//             <h2>Login</h2>
//             <div className="inputBx">
//               <input type="text" name="Username" placeholder="Username" value={formData.username} onChange={handleChange}/>
//             </div>
//             <div className="inputBx">
//               <input type="password" name="password"placeholder="Password" value={formData.password} onChange={handleChange} />
//             </div>
//             <div className="inputBx">
//               <input type="submit" value="owner login" />
//             </div>
//             <div className="links">
//               <a href="#">Forgot Password</a>
//               <a href="#">Signup</a>
//             </div>
//           </div>
//           </form>

//           {/* Guest Login */}
//           <div className="login back">
//             <h2>Sign-up</h2>
//             <div className="inputBx">
//               <input type="text" name="Mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
//             </div>
//             <div className="inputBx">
//               <input type="text" Name="Email" placeholder="Email" value={formData.email} onChange={handleChange}/>
//             </div>
//             <div className="inputBx">
//               <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}/>
//             </div>
//             <div className="inputBx">
//               <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
//             </div>
//             <div className="inputBx">
//               <input type="submit" value="Sign Up" />
//             </div>
//             <div className="links">
//               <a href="#">Account already exists? Back to login</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;
import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

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
      alert(response.data.message);
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

      <div className="ring">
        <div className={`login-container ${isFlipped ? "isFlipped" : ""}`}>
          {/* Login Form */}
          <form className="login front" onSubmit={(e) => handleSubmit(e, false)}>
            <h2>Owner Login</h2>
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
            {/* <div className="links">
            <a href="signup">Signup</a>
            </div> */}
          </form>

          {/* Signup Form */}
          <form className="login back" onSubmit={(e) => handleSubmit(e, true)}>
            <h2>Signup</h2>
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
      </div>
    </div>
  );
}

export default LoginSignup;
