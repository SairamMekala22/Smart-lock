import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";  // Import the useAuth hook

// A simple component that checks authentication and conditionally renders
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
