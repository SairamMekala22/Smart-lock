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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/reset-password" element={<OTPVerification />} />

          {/* Private routes */}
        
          <Route
              path="/dashboard"  
              element={<PrivateRoute><Dashboard /></PrivateRoute>  } 
          />

          <Route
              path="/profile"  
              element={<PrivateRoute><ProfilePage /></PrivateRoute>  } 
          />

          <Route
              path="edit-profile"  
              element={<PrivateRoute><EditProfilePage /></PrivateRoute>  } 
          />
          {/* <PrivateRoute path="/profile" element={<ProfilePage />} />
          <PrivateRoute path="/edit-profile" element={<EditProfilePage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
