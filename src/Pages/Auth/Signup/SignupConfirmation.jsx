import React from "react";
import { useNavigate } from "react-router-dom";

function SignupConfirmationWeb() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid text-center justify-center rounded-2xl p-10 bg-[#fff5d1]">
        <img
          src="/success.png"
          alt="Success Image"
          className="w-fit flex justify-self-center"
        />
        <h1 className="font-bold text-[#181818] text-4xl p-6">
          Congratulations!
        </h1>
        <p className="p-4 text-[#464646]">
          You have successfully created your account with{" "}
        </p>
        <p className="font-medium text-[#464646] text-2xl">Access2Edu</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#BCA0D2] p-4 mt-5 rounded-lg hover:bg-[#785491] text-[#000000] hover:text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function SignupConfimationMobile() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid justify-between p-6">
        <div className="grid text-center justify-center p-6">
          <img
            src="/success.png"
            alt="Success Image"
            className="w-fit flex justify-self-center"
          />
          <h1 className="font-bold text-[#181818] text-3xl p-4">
            Congratulations!
          </h1>
          <p className="p-2 text-[#464646]">
            You have successfully created your account with
          </p>
          <p className="font-medium text-[#464646] text-xl">Access2Edu</p>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="p-4 mt-5 rounded-lg bg-[#785491] text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function SignupConfirmation() {
  return (
    <div>
      <div className="webView">
        <SignupConfirmationWeb />
      </div>

      <div className="mobileView">
        <SignupConfimationMobile />
      </div>
    </div>
  );
}

export default SignupConfirmation;
