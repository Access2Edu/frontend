import React, { useState, useEffect } from "react";
import "./Login.css";
import { googleAuth } from "../../../services/studentServices";

function SocialMediaWebSignIn() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });
      } else {
        setError("Google API failed to load.");
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Ensure the Google API is available
      if (!window.google || !window.google.accounts) {
        throw new Error("Google API is not loaded.");
      }

      // Prompt the user to sign in and get the token
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed || notification.isSkippedMoment) {
          setError("Google Sign-In was canceled or could not be displayed.");
          setLoading(false);
          return;
        }

        // Retrieve the token from the callback
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
          callback: async (response) => {
            if (!response.credential) {
              setError("Google Sign-In failed. No credentials received.");
              setLoading(false);
              return;
            }

            try {
              // Call the googleAuth function with the token
              const { data } = await googleAuth({ token: response.credential });

              // Set the user state with the retrieved details
              setUser({
                name: data.name,
                email: data.email,
                picture: data.picture,
                provider: "Google",
                token: data.token,
              });
            } catch (err) {
              setError(err.response?.data?.message || "An error occurred during Google Sign-In.");
            } finally {
              setLoading(false);
            }
          },
        });
      });
    } catch (err) {
      setError(err.message || "An error occurred during Google Sign-In.");
      setLoading(false);
    }
  };

  const handleGoogleResponse = async (response) => {
    if (!response.credential) return;
    setLoading(true);
    try {
      const { data } = await googleAuth({ token: response.credential });
      setUser({
        name: data.name,
        email: data.email,
        picture: data.picture,
        provider: "Google",
        token: data.token,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => setUser(null);

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
          {error}
        </div>
      )}

      <div className="flex justify-center gap-10 pt-4 pb-10">
        {/* Google Sign-in Button */}
        <button onClick={handleGoogleSignIn} disabled={loading}>
          <img
            src="src/assets/devicon_google.svg"
            alt="Google Icon"
            className="w-10 h-10"
          />
          
        </button>
      </div>
    </div>
  );
}

export default SocialMediaWebSignIn;