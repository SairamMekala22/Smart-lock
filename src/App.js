import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/authContext"; // import your AuthProvider
import ProfilePage from "./ProfilePage";
import EditProfilePage from "./EditProfilePage";
import Dashboard from "./Dashboard";
import LoginSignup from "./Login";
import OTPVerification from "./Resetpass";
import PrivateRoute from "./auth/privateRoute"; // import your PrivateRoute

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/reset-password" element={<OTPVerification />} />

          {/* Private routes */}
        
          <Route
              path="/dashboard"  
              element={ <Dashboard /> } 
          />

          <Route
              path="/profile"  
              element={ <ProfilePage /> } 
          />

          <Route
              path="edit-profile"  
              element={ <EditProfilePage /> } 
          />
          {/* <PrivateRoute path="/profile" element={<ProfilePage />} />
          <PrivateRoute path="/edit-profile" element={<EditProfilePage />} /> */}
        </Routes>
      </Router>
    
  );
}

export default App;
