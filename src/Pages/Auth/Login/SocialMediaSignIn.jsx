import React, { useState, useEffect } from "react";
import "./Login.css";

import { googleAuth } from "../../../services/studentServices";

function SocialMediaSignIn() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the auth providers when component mounts
  useEffect(() => {
    // Load Google API
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAuth;
      document.body.appendChild(script);
    };
  

    loadGoogleScript();
    
  }, []);

  // Google Authentication setup
  const initializeGoogleAuth = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // Replace with your actual Google Client ID
        callback: handleGoogleResponse,
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"), // ID of the container where the button will be rendered
        { theme: "outline", size: "large" } // Customize the button
      );
    } else {
      setError("Google API failed to load.");
    }
  };

    

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Call your Google API function here
      const response = await googleAuth(); // Replace with your actual function name
  
      if (response) {
        // Assuming the response contains user details
        const { name, email, picture, token } = response;
  
        setUser({
          name,
          email,
          picture,
          provider: "Google",
          token,
        });
      } else {
        setError("Google Sign-In failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during Google Sign-In.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 

  // Handle Google Sign-in response
  const handleGoogleResponse = (response) => {
    if (response.credential) {
      // Decode the JWT token to get user information
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const { name, email, picture } = JSON.parse(jsonPayload);

      setUser({
        name,
        email,
        picture,
        provider: "Google",
        token: response.credential,
      });
    }

    setLoading(false);
  };

  // Handle sign out
  const handleSignOut = () => {
    setUser(null);
    // Additional sign out logic for each provider if needed
  };

  if (user) {
    return (
      <div className="user-profile p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Welcome, {user.name}</h2>
        <p className="mb-2">Logged in with: {user.provider}</p>
        <p className="mb-4">Email: {user.email}</p>
        {user.picture && (
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-full w-16 h-16 mb-4"
          />
        )}
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="otherSignIn grid gap-3 p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}{" "}
        </div>
      )}

      {/* Google Sign-in Button */}
      <button
        className="google"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <img src="src/assets/devicon_google.svg" alt="Google Icon" />
        <p className="font-semibold">Sign in with Google</p>
      </button>
      

      {/* Divider with text */}
      <div className="flex items-center w-full my-2 mt-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">Or Sign in with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
}

export default SocialMediaSignIn;
