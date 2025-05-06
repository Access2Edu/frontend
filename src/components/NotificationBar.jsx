import React, { useState, useEffect, useRef } from "react";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import EmailIcon from "@mui/icons-material/Email";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../AuthContext";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`,
  };
}

function NotificationBar() {
  const { student } = useAuth(); // Access the logged-in user's information
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Use the first name from the AuthContext
  const firstName = student.firstName || "Guest"; // Default to "Guest" if no user is logged in

  return (
    <div>
      {/* Desktop Design */}
      <div className="hidden md:flex gap-4 items-center rounded-4xl p-6 pt-3 pb-3 bg-[#fdf4d9] shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]">
        {/* Email Icon */}
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-4xl border border-[#9E7ABB]">
          <EmailIcon />
        </div>

        {/* Notification Icon */}
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-4xl border border-[#9E7ABB]">
          <CircleNotificationsIcon />
        </div>

        {/* Avatar */}
        <div className="flex gap-2 items-center">
          <Avatar {...stringAvatar(firstName)} style={{ width: 32, height: 32 }} />
          <p>{firstName}</p>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <div
          className="flex gap-2 items-center rounded-4xl p-3 pt-3 pb-3 bg-[#fdf4d9] shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)] "
          onClick={toggleDropdown}
          aria-label="Menu"
        >
          <Avatar {...stringAvatar(firstName)} style={{ width: 32, height: 32 }} />
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 mt-1 bg-[#fdf4d9] rounded-lg shadow-lg w-50 py-1 z-50">
            <div className="px-4 py-3 border-b flex gap-4 items-center hover:bg-[#eeecd9] cursor-pointer border-gray-100">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-4xl border border-[#9E7ABB]">
                <EmailIcon />
              </div>
              <p>Messages</p>
            </div>

            <div className="px-4 py-3 border-b flex gap-4 items-center hover:bg-[#eeecd9] cursor-pointer border-gray-100">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-4xl border border-[#9E7ABB]">
                <CircleNotificationsIcon />
              </div>
              <p>Notifications</p>
            </div>

            <div className="px-4 py-3 border-b flex gap-4 items-center hover:bg-[#eeecd9] cursor-pointer border-gray-100">
              <Avatar {...stringAvatar(firstName)} style={{ width: 32, height: 32 }} />
              <p>{firstName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationBar;