import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import EditProfilePage from "./EditProfilePage";
import Dashboard from "./Dashboard";
import LoginSignup from "./Login";
// import Signup from "./Signup";
import OTPVerification from "./Resetpass";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProfilePage />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element={<LoginSignup />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/reset-password" element={<OTPVerification />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
