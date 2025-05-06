import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState({
    email: null, // Replace with actual email from login
    firstName: null, // Replace with actual first name from login
    lastName: null, // Replace with actual last name from login
  });

  useEffect(() => {
    // Retrieve token and user data from storage
    const storedToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const storedStudent = localStorage.getItem("student") || sessionStorage.getItem("student");

    if (storedToken && storedStudent) {
      setStudent(JSON.parse(storedStudent)); // Restore user data
      console.log("User data restored from storage:", JSON.parse(storedStudent));
    }
  }, []);


  return (
    <AuthContext.Provider value={{ student, setStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);