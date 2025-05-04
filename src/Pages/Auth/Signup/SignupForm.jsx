import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { registerStudent } from "../../../services/studentServices"; // Import API function
import "./Signup.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    level: "",
    parent_guardian: "",
    email: "",    
    password: "",
    confirmPassword: "",
  }); // Form Data

  const [emailError, setEmailError] = useState(""); // Email Error
  const [passwordError, setPasswordError] = useState(""); // Password Error
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Confirm Password Error
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (event) => {
    const value = event.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    setFormData((prev) => ({ ...prev, email: value }));
  };

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
    setFormData((prev) => ({ ...prev, password: value }));
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    if (value !== formData.password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
    setFormData((prev) => ({ ...prev, confirmPassword: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage("");
    setIsSubmitting(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.otherName ||
      !formData.level ||
      !formData.parent_guardian ||
      !formData.email ||      
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormMessage(
        <p className="text-red-400 bg-red-200 p-4 rounded-lg text-center font-medium">
          Please fill in all fields
        </p>
      );
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormMessage(
        <p className="text-red-400 bg-red-200 p-4 rounded-lg text-center font-medium">
          Passwords do not match
        </p>
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the API to register the student
      await registerStudent(formData);

      setFormMessage(
        <p className="text-green-700 bg-green-100 p-4 rounded-lg text-center font-medium">
          Registration successful! Redirecting to login...
        </p>
      );

      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setFormMessage(
        <p className="text-red-400 bg-red-200 p-4 rounded-lg text-center font-medium">
          {err.response?.data?.message || "Failed to register. Try again."}
        </p>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="" className="grid gap-3 p-6">
      {/* First Name */}
      <div className="grid gap-2">
        <label htmlFor="firstName">Firstname</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Firstname"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      {/* Last Name */}
      <div className="grid gap-2">
        <label htmlFor="lastName">Surname</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Surname"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      {/* Other Name */}
      <div className="grid gap-2">
        <label htmlFor="lastName">Other Name</label>
        <input
          type="text"
          name="otherName"
          id="otherName"
          placeholder="Other Name"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.otherName}
          onChange={handleChange}
        />
      </div>

      {/* Level */}
      <div className="grid gap-2">
        <label htmlFor="lastName">Level</label>
        <input
          type="text"
          name="level"
          id="level"
          placeholder="Level"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.level}
          onChange={handleChange}
        />
      </div>

      {/* Parent Guardian */}
      <div className="grid gap-2">
        <label htmlFor="parent_guardian">Parent/Guardian</label>
        <input
          type="text"
          name="parent_guardian"
          id="parent_guardian"
          placeholder="Parent/Guardian Name"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.parent_guardian}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.email}
          onChange={validateEmail}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      {/* Parent/Guardian Name */}
      <div className="grid gap-2">
        <label htmlFor="gName">Parent/Guardian Name</label>
        <input
          type="text"
          name="gName"
          id="gName"
          placeholder="Parent/Guardian Name"
          className="p-4 border-1 border-[#7c7c7c] rounded-md"
          value={formData.gName}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="grid gap-2">
        <label htmlFor="password">Password</label>
        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="p-4 border-1 pwordSpace border-[#7c7c7c] rounded-md"
            value={formData.password}
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
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <span
            className="eyeIcon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        {confirmPasswordError && (
          <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        )}
      </div>

      {/* Button */}
      {formMessage && <div className="mt-2">{formMessage}</div>}
      <button
        className="mt-5 p-4 rounded-lg bg-[#785491] text-white"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p className="p-4 pl-0 flex justify-center">
        Already have an account{" "}
        <span className="text-[#785491] font-semibold pl-2">
          <a href="/Login"> Log In</a>
        </span>
      </p>
    </form>
  );
}

export default SignupForm;