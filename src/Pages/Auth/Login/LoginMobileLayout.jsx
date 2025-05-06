import React from "react";
import "./Login.css";
import SocialMediaMobileSignIn from "./SocialMediaMobileSignIn";
import LoginForm from "./LoginForm";

function LoginMobileLayout() {
  return (
    <div className="bg-[#fffbeb]">
      <div className="headbar shadow-[1px_0px_12px_rgba(0,0,0,0.17)]">
        <img
          src="src\assets\access_II_edu-removebg-preview 2.svg"
          alt="Access2Edu Logo"
          className="pr-4"
        />
        <h1 className="text-[#563A68] text-base">Access2Edu</h1>
      </div>

      <div className="intro">
        <div className="headingText">
          <h1 className="text-2xl font-extrabold">Welcome Back </h1>
          <img src="src\assets\waving.svg" alt="waving hand" />
        </div>
        <p className="text-xl text-[#3D3D3D]">
          Sign in to your learning journey!
        </p>
      </div>

      <SocialMediaMobileSignIn />

      <div className="flex justify-center items-center pt-4">
        <hr className="w-1/3 mr-2 border-[#785491]" />
        <p className="text-[#785491] font-semibold"> OR </p>
        <hr className="w-1/3 ml-2 border-[#785491]" />
      </div>
      
      <LoginForm />
    </div>
  );
}

export default LoginMobileLayout;
