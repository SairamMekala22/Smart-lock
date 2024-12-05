import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import EditProfilePage from "./EditProfilePage";
import Dashboard from "./Dashboard";
import Login from "./Login";
// import Signup from "./Signup";
import SignupForm from "./Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProfilePage />} /> */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
