import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function SignupForm() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e, isGuest) => {
    e.preventDefault();
    const endpoint = isGuest ? '/guest-signup' : '/owner-signup';
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };
  
  // const handleSubmit = async (e, isGuest) => {
  //   e.preventDefault();
  //   const endpoint = isFlipped ? '/signup' : '/signup';
  //   try {
  //     const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
  //     alert(response.data.message);
  //   } catch (error) {
  //     alert(error.response?.data?.message || 'An error occurred');
  //   }
  // };

  return (
    <div className="App">
      <div className="button-container">
        <button className="signup-btn" onClick={() => setIsFlipped(false)}>
          Owner Signup
        </button>
        <button className="signup-btn" onClick={() => setIsFlipped(true)}>
          Guest Signup
        </button>
      </div>

      <div className="ring">
        <div className={`signup-container ${isFlipped ? 'flipped' : ''}`}>
          <form
            className="signup front"
            onSubmit={(e) => handleSubmit(e, false)}
          >
            <h2>Sign-Up</h2>
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
                name="email"
                placeholder="Email"
                value={formData.fullName}
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
              <input type="submit" value="Sign up" />
            </div>
          </form>

          <form
            className="signup back"
            onSubmit={(e) => handleSubmit(e, true)}
          >
            <h2>Guest Sign-Up</h2>
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
                name="email"
                placeholder="Email"
                value={formData.fullName}
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
              <input type="submit" value="Sign up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;


// import React, { useState } from "react";
// import "./Signup.css";

// const Signup = () => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleOwnerSignup = () => {
//     setIsFlipped(false);
//   };

//   const handleGuestSignup = () => {
//     setIsFlipped(true);
//   };

//   return (
//     <div>
//       {/* Button container for Owner and Guest Signup */}
//       <div className="button-container">
//         <button className="signup-btn" onClick={handleOwnerSignup}>
//           Owner Signup
//         </button>
//         <button className="signup-btn" onClick={handleGuestSignup}>
//           Guest Signup
//         </button>
//       </div>

//       {/* Animated Rings */}
//       <div className="ring">
//         {/* <i style={{ "--clr": "#fffd44" }}></i> */}
//         <div className={`signup-container ${isFlipped ? "flipped" : ""}`}>
//           {/* Owner Signup Form (Front side) */}
//           <div className="signup front">
//             <h2>Sign-up</h2>
//             <div className="inputBx">
//               <input type="text" placeholder="Mobile Number" />
//             </div>
//             <div className="inputBx">
//               <input type="text" placeholder="Full Name" />
//             </div>
//             <div className="inputBx">
//               <input type="text" placeholder="Username" />
//             </div>
//             <div className="inputBx">
//               <input type="password" placeholder="Password" />
//             </div>
//             <div className="inputBx">
//               <input type="submit" value="Sign Up" />
//             </div>
//             <div className="links">
//               <a href="#">Account already exists? Back to login</a>
//             </div>
//           </div>

//           {/* Guest Signup Form (Back side) */}
//           <div className="signup back">
//             <h2>Guest Sign-up</h2>
//             <div className="inputBx">
//               <input type="text" placeholder="Mobile Number" />
//             </div>
//             <div className="inputBx">
//               <input type="text" placeholder="Full Name" />
//             </div>
//             <div className="inputBx">
//               <input type="text" placeholder="Username" />
//             </div>
//             <div className="inputBx">
//               <input type="password" placeholder="Password" />
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

// export default Signup;


