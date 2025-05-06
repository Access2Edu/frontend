import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { student } = useAuth(); // Access the logged-in user's data

  // Check if the user is authenticated
  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!authToken || !student) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;