import React, { useEffect } from "react";
import "./Login.css";
import { loginWithGoogle } from "../../../services/studentServices";

function SocialMediaMobileSignIn() {
  
  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large', shape: 'pill', width: "200", } 
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    setError(null);

    const idToken = response.credential;

    try {
      const userData = await loginWithGoogle(idToken);
      alert(`Welcome, ${userData.name}`);
      // You can save the returned JWT or user info to localStorage
    } catch (err) {
      alert('Login failed');
    }
  };
  return (
    <div >
      {/* <h1>Login with Google</h1> */}
      <div id="googleSignInDiv" className="flex justify-center items-center"></div>
    </div>
  );

}

export default SocialMediaMobileSignIn;