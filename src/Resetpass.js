// // import React from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./App.css"; // Include your custom CSS file.

// // const App = () => {
// //   return (
// //     <div className="center-vertically">
// //       <div className="container custom-container p-2 shadow-sm">
// //         <h2 className="title text-center mb-2">RESET PASSWORD</h2>
// //         <div className="formbox mt-4.5 my-5">
// //           <form className="form ">
// //             <div className="row mb-4 form-items">
// //               <label htmlFor="username" className="col-sm-2 col-form-label texts">
// //                 Username
// //               </label>
// //               <div className="col-sm-10">
// //                 <input
// //                   type="text"
// //                   id="username"
// //                   name="username"
// //                   required
// //                   className="form-control w-75 rounded-pill shadow-sm"
// //                   placeholder="Enter the Username"
// //                 />
// //               </div>
// //             </div>
// //             <div className="row mb-4">
// //               <label htmlFor="otp" className="col-sm-2 col-form-label texts">
// //                 OTP
// //               </label>
// //               <div className="col-sm-10">
// //                 <input
// //                   type="text"
// //                   id="otp"
// //                   name="otp"
// //                   required
// //                   className="form-control w-75 rounded-pill shadow-sm"
// //                   placeholder="Enter OTP"
// //                 />
// //               </div>
// //             </div>
// //             <div className="row mb-4 align-items-center">
// //               <label htmlFor="newPassword" className="col-sm-2 col-form-label texts">
// //                 New Password
// //               </label>
// //               <div className="col-sm-10">
// //                 <input
// //                   type="password"
// //                   id="newPassword"
// //                   name="newPassword"
// //                   required
// //                   className="form-control w-75 rounded-pill shadow-sm"
// //                   placeholder="Enter new password"
// //                 />
// //               </div>
// //             </div>
// //             <button type="submit" className="btn btn-primary mb-4 button">
// //               Verify OTP and Reset Password
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";
// // iimport "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css"; // Include your custom CSS file.

// const OTPVerification = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify OTP & Reset Password

//   const handleSendOtp = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/send-otp", { email });
//       setMessage(response.data.message);
//       setStep(2); // Move to OTP verification step
//     } catch (error) {
//       setMessage("Failed to send OTP");
//       console.error(error);
//     }
//   };

//   const handleVerifyAndResetPassword = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/verify-otp", { email, otp, newPassword });
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         setStep(3); // Password reset successfully
//       }
//     } catch (error) {
//       setMessage("Failed to verify OTP or reset password");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="center-vertically">
//       <div className="container custom-container p-2 shadow-sm">
//         <h2 className="title text-center mb-2">RESET PASSWORD</h2>
//         <div className="formbox mt-4.5 my-5">
//           {step === 1 && (
//             <form className="form">
//               <div className="row mb-4 form-items">
//                 <label htmlFor="email" className="col-sm-2 col-form-label texts">
//                   Email
//                 </label>
//                 <div className="col-sm-10">
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     className="form-control w-75 rounded-pill shadow-sm"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-primary mb-4 button"
//                 onClick={handleSendOtp}
//               >
//                 Send OTP
//               </button>
//               {message && <p className="text-center">{message}</p>}
//             </form>
//           )}

//           {step === 2 && (
//             <form className="form" onSubmit={handleVerifyAndResetPassword}>
//               <div className="row mb-4 form-items">
//                 <label htmlFor="otp" className="col-sm-2 col-form-label texts">
//                   OTP
//                 </label>
//                 <div className="col-sm-10">
//                   <input
//                     type="text"
//                     id="otp"
//                     name="otp"
//                     required
//                     className="form-control w-75 rounded-pill shadow-sm"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="row mb-4 align-items-center">
//                 <label htmlFor="newPassword" className="col-sm-2 col-form-label texts">
//                   New Password
//                 </label>
//                 <div className="col-sm-10">
//                   <input
//                     type="password"
//                     id="newPassword"
//                     name="newPassword"
//                     required
//                     className="form-control w-75 rounded-pill shadow-sm"
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary mb-4 button">
//                 Verify OTP and Reset Password
//               </button>
//               {message && <p className="text-center">{message}</p>}
//             </form>
//           )}

//           {step === 3 && (
//             <p className="text-center text-success">Password reset successfully!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css"; // Include your custom CSS file.

// const OTPVerification = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify OTP & Reset Password
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const handleSendOtp = async () => {
//     if (!email) {
//       setMessage("Please enter a valid email.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/send-otp", { email });
//       setMessage(response.data.message || "OTP sent successfully.");
//       setStep(2); // Move to OTP verification step
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send OTP.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyAndResetPassword = async (e) => {
//     e.preventDefault();

//     if (!otp || !newPassword) {
//       setMessage("OTP and new password are required.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/verify-otp", {
//         email,
//         otp,
//         newPassword,
//       });
//       setMessage(response.data.message || "Password reset successfully.");
//       if (response.status === 200) {
//         setStep(3); // Password reset successfully
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to verify OTP or reset password.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="center-vertically">
//       <div className="container custom-container p-2 shadow-sm">
//         <h2 className="title text-center mb-2">RESET PASSWORD</h2>
//         <div className="formbox mt-4.5 my-5">
//           {step === 1 && (
//             <form className="form">
//               <div className="row mb-4 form-items">
//                 <label htmlFor="email" className="col-sm-2 col-form-label texts">
//                   Email
//                 </label>
//                 <div className="col-sm-10">
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     className="form-control w-75 rounded-pill shadow-sm"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-primary mb-4 button"
//                 onClick={handleSendOtp}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Sending OTP..." : "Send OTP"}
//               </button>
//               {message && <p className="text-center text-danger">{message}</p>}
//             </form>
//           )}

//           {step === 2 && (
//             <form className="form" onSubmit={handleVerifyAndResetPassword}>
//               <div className="row mb-4 form-items">
//                 <label htmlFor="otp" className="col-sm-2 col-form-label texts">
//                   OTP
//                 </label>
//                 <div className="col-sm-10">
//                   <input
//                     type="text"
//                     id="otp"
//                     name="otp"
//                     required
//                     className="form-control w-75 rounded-pill shadow-sm"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="row mb-4 align-items-center">
//                 <label htmlFor="newPassword" className="col-sm-2 col-form-label texts">
//                   New Password
//                 </label>
//                 <div className="col-sm-10">
//                   <input
//                     type="password"
//                     id="newPassword"
//                     name="newPassword"
//                     required
//                     className="form-control w-75 rounded-pill shadow-sm"
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary mb-4 button" disabled={isLoading}>
//                 {isLoading ? "Verifying..." : "Verify OTP and Reset Password"}
//               </button>
//               {message && <p className="text-center text-danger">{message}</p>}
//             </form>
//           )}

//           {step === 3 && (
//             <p className="text-center text-success">Password reset successfully!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;
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
