// // import React, { useState } from "react";
// // import "./Login.css";

// // const Login = () => {
// //   const [flipped, setFlipped] = useState(false);

// //   return (
// //     <div className="login-page">
// //       {/* Button Container */}
// //       <div className="button-container">
// //         <button
// //           className="login-btn"
// //           onClick={() => setFlipped(false)}
// //         >
// //           Owner Login
// //         </button>
// //         <button
// //           className="login-btn"
// //           onClick={() => setFlipped(true)}
// //         >
// //           Guest Login
// //         </button>
// //       </div>

// //       {/* Animated Rings */}
// //       <div className="ring">
        
// //         {/* Login Form */}
// //         <div className={`login-container ${flipped ? "flipped" : ""}`}>
// //           {/* Owner Login */}
// //           <div className="login front">
// //             <h2>Login</h2>
// //             <div className="inputBx">
// //               <input type="text" placeholder="Username" />
// //             </div>
// //             <div className="inputBx">
// //               <input type="password" placeholder="Password" />
// //             </div>
// //             <div className="inputBx">
// //               <input type="submit" value="owner login" />
// //             </div>
// //             <div className="links">
// //               <a href="#">Forgot Password</a>
// //               <a href="Signup">Signup</a>
// //             </div>
// //           </div>

// //           {/* Guest Login */}
// //           <div className="login back">
// //             <h2>Guest Login</h2>
// //             <div className="inputBx">
// //               <input type="text" placeholder="Guest Username" />
// //             </div>
// //             <div className="inputBx">
// //               <input type="password" placeholder="Guest Password" />
// //             </div>
// //             <div className="inputBx">
// //               <input type="submit" value="Guest Login" />
// //             </div>
// //             <div className="links">
// //               <a href="#">Forgot Password</a>
// //               <a href="#">Signup</a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import './Login.css'; // Import your CSS here

// function Login() {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [formData, setFormData] = useState({ username: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e, isGuest) => {
//     e.preventDefault();
//     const endpoint = isGuest ? '/guest-login' : '/owner-login';
//     try {
//       const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
//       alert(response.data.message);
//     } catch (error) {
//       alert(error.response?.data?.message || 'An error occurred');
//     }
//   };
  
//   return (
//     <div className="App">
//       <div className="button-container">
//         <button className="login-btn" onClick={() => setIsFlipped(false)}>
//           Owner Login
//         </button>
//         <button className="login-btn" onClick={() => setIsFlipped(true)}>
//           Guest Login
//         </button>
//       </div>

//       <div className="ring">
//         <div className={`login-container ${isFlipped ? 'flipped' : ''}`}>
//           <form
//             className="login front"
//             onSubmit={(e) => handleSubmit(e, false)}
//           >
//             <h2>Login</h2>
//             <div className="inputBx">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="inputBx">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="inputBx">
//               <input type="submit" value="Sign in" />

//             </div>
//             <div className="links">
//               <a href="#">Forgot Password</a>
//               <a href="signup">Signup</a>
//             </div>
//           </form>

//           <form
//             className="login back"
//             onSubmit={(e) => handleSubmit(e, true)}
//           >
//             <h2>Guest Login</h2>
//             <div className="inputBx">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Guest Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="inputBx">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Guest Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="inputBx">
//               <input type="submit" value="Guest Login" />
//             </div>
//             <div className="links">
//               <a href="#">Forgot Password</a>
//               <a href="signup">Signup</a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import './Login.css'; // Import your CSS here

// function Login() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const navigate = useNavigate(); // Hook for navigation

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/owner-login', formData);

//       if (response.data.success) {
//         // Save the token to localStorage
//         localStorage.setItem('token', response.data.token);
//         // Redirect to the dashboard
//         navigate('/dashboard');
//       } else {
//         alert(response.data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || 'An error occurred');
//     }
//   };
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/owner-login", formData, {
//         withCredentials: true,
//       });

//       if (response.data.user) {
//         localStorage.setItem("token", response.data.token);
//         navigate("/dashboard");
//       } else {
//         alert("login failed");
//       }
//     } catch (error) {
//       alert("An error occurred during login");
//     }
//   };
//   return (
//     <div className="App">
//       <div className="login-container">
//         <form className="login" onSubmit={handleSubmit}>
//           <h2>Owner Login</h2>
//           <div className="inputBx">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="inputBx">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="inputBx">
//             <input type="submit" value="Sign in" />
//           </div>
//           <div className="links">
//             <a href="#">Forgot Password</a>
//             <a href="signup">Signup</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/owner-login", formData, {
        withCredentials: true,
      });

      if (response.data.user) {
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("An error occurred during login");
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <form className="login" onSubmit={handleSubmit}>
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
            <input type="submit" value="Sign in" />
          </div>
          <div className="links">
            <a href="#">Forgot Password</a>
            <a href="/signup">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
