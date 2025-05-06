import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { forgotPassword } from "../../../services/studentServices"; // Import API function
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPasswordMobile() {
  const [password, setPassword] = useState(""); // Password Value
  const [passwordError, setPasswordError] = useState(""); // Password Error
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password Value
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Confirm Password Error
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams(); // To get the reset token from the URL
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    const isValid = value.length >= 6 && /\d/.test(value);
    if (!isValid) {
      setPasswordError(
        "Password must be at least 6 characters including a number"
      );
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage("");
    setIsSubmitting(true);

    if (!password || !confirmPassword) {
      setFormMessage(
        <p className="text-red-400 bg-red-100 p-4 text-center font-medium">
          Please fill in all fields
        </p>
      );
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setFormMessage(
        <p className="text-red-400 bg-red-100 p-4 text-center font-medium">
          Passwords do not match
        </p>
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Get the reset token from the URL
      const token = searchParams.get("token");

      // Call the API to reset the password
      const response = await forgotPassword({ newPassword: password, token });

      setFormMessage(
        <p className="text-green-700 bg-green-100 p-4 text-center font-medium">
           {response.data?.message || "Password reset successfully! Redirecting to login..."}
        </p>
      );

      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setFormMessage(
        <p className="text-red-400 bg-red-100 p-4 text-center font-medium">
          {err.response?.data?.message || "Failed to reset password. Try again."}
        </p>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F9F5F2] rounded-2xl shadow-[0px_0px_12px_rgba(0,0,0,0.17)]">
      <div className="p-6">
        <h1 className="font-bold text-center text-2xl p-6 pb-1">
          Reset Password
        </h1>
        <p className="text-center mt-4 p-4 bg-red-200 text-red-600 rounded-lg ">Please enter your new password</p>

        <form onSubmit={handleSubmit} className="grid gap-3 mt-5 mb-3">
          {formMessage && <div className="mt-2">{formMessage}</div>}

          {/* Enter Password  */}
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="p-4 border-1 pwordSpace border-[#7c7c7c] rounded-md"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="eyeIcon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <label htmlFor="password">Confirm Password</label>
            <div className="passwordWrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confimPassword"
                placeholder="Confirm Password"
                className="p-4 border-1 pwordSpace border-[#7c7c7c] rounded-md"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span
                className="eyeIcon"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </span>
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
          </div>

          {/* Button */}
          <button
            className="bg-[#BCA0D2] mt-5 p-4 rounded-lg hover:bg-[#785491] text-[#000000] hover:text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <p className="p-4 pl-0 flex justify-center">
          Go back to{" "}
          <span className="text-[#785491] font-semibold pl-2">
            <a href="/Login"> Log In</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordMobile;