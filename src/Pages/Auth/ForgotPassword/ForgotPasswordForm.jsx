import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendForgotPasswordOTP,
  forgotPassword,
} from "../../../services/studentServices"; // Import API functions

function ForgotPasswordForm() {
  const [step, setStep] = useState("request"); // 'request' | 'otp' | 'reset'
  const [email, setEmail] = useState(""); // User Email
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP
  const [newPassword, setNewPassword] = useState(""); // New Password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password
  const [alert, setAlert] = useState({
    type: "error",
    message: (
      <div className="flex justify-center justify-self-center items-center gap-3">
        <img src="public/notificationIcon.svg" alt="notification" />
        <p className="text-sm">Follow instructions to set your password</p>
      </div>
    ),
  }); // Alert Message
  const [timer, setTimer] = useState(60); // OTP Timer
  const [canResend, setCanResend] = useState(false); // Resend OTP Timer
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (step === "otp" && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [step, timer]);

  async function handleRequestOtp() {
    if (!email.includes("@")) {
      setAlert({ type: "error", message: "Enter a valid email address." });
      return;
    }

    try {
      // Send OTP request to the API
      const response = await sendForgotPasswordOTP(email); // Capture the response from the backend
      setAlert({
        type: "success",
        message:
          response.data?.message || "OTP sent successfully. Check your email.", // Use backend message or fallback
      });
      setTimer(60);
      setCanResend(false);
      setStep("otp");
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to send OTP.",
      });
    }
  }

  function handleOtpChange(value, index) {
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  }

  async function handleVerify() {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setAlert({ type: "error", message: "Please enter the 6-digit code." });
      return;
    }

    try {
      // Verify OTP with the API
      const response = await forgotPassword(otpValue, null); // Pass OTP only for verification
      setAlert({
        type: "success",
        message:  response.data?.message || "OTP verified. You can now reset your password.",
      });
      setStep("reset");
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message || "Invalid OTP. Please try again.",
      });
    }
  }

  async function handleResetPassword() {
    if (newPassword !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    try {
      // Reset password with the API
      await forgotPassword(null, newPassword); // Pass new password for reset
      setAlert({
        type: "success",
        message: "Password reset successfully. Redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message || "Failed to reset password. Try again.",
      });
    }
  }

  const handleResend = async () => {
    if (canResend) {
      try {
        await sendForgotPasswordOTP(email);
        setOtp(["", "", "", "", "", ""]);
        setTimer(60);
        setCanResend(false);
        setAlert({
          type: "success",
          message: "OTP resent successfully.",
        });
      } catch (err) {
        setAlert({
          type: "error",
          message: err.response?.data?.message || "Failed to resend OTP.",
        });
      }
    }
  };

  function renderAlert() {
    if (alert) {
      return (
        <div
          className={`flex justify-self-center items-center gap-3 p-4 rounded-lg w-fit ${
            alert.type === "error"
              ? "text-red-700 bg-red-100"
              : "text-green-700 bg-green-100"
          }`}
        >
          {alert.message}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="bg-[#F9F5F2] rounded-2xl shadow-[0px_0px_12px_rgba(0,0,0,0.17)]">
      <div className="grid justify-center items-center gap-3 p-4 pb-20 w-full">
        {step === "request" && (
          <div>
            <h1 className="font-bold text-center text-2xl p-6">
              Forgot Password?
            </h1>
            {renderAlert()}
            <p className="text-center p-6 text-[#525252]">
              Enter your registered email below to receive password reset
              instructions.
            </p>
            <input
              type="email"
              placeholder="Email Address"
              className="p-4 border rounded-lg w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleRequestOtp}
              className="bg-[#BCA0D2] hover:bg-[#785491] text-black font-medium text-base rounded-lg p-4 w-full mt-4"
            >
              Request OTP
            </button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <h1 className="font-bold text-center text-2xl p-6">Enter OTP</h1>
            {renderAlert()}
            <p className="text-center p-6 text-[#525252]">
              Enter the six (6) digit code sent to your email address.
            </p>
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-12 h-12 text-center text-xl border rounded-lg"
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              className="bg-[#785491] text-white font-medium text-base rounded-lg p-4 w-full mt-4"
            >
              Verify OTP
            </button>
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`w-full mt-2 rounded-lg p-4 ${
                canResend
                  ? "bg-gray-200 text-black"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {canResend
                ? "Resend OTP"
                : `Resend OTP in 00:${timer < 10 ? "0" + timer : timer}`}
            </button>
          </div>
        )}

        {step === "reset" && (
          <div>
            <h1 className="font-bold text-center text-2xl p-6">
              Reset Password
            </h1>
            {renderAlert()}
            <input
              type="password"
              placeholder="New Password"
              className="p-4 border rounded-lg w-full mt-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-4 border rounded-lg w-full mt-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="bg-[#785491] text-white font-medium text-base rounded-lg p-4 w-full mt-4"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
