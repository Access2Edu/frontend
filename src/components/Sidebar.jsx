import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Subject as SubjectIcon,
  EventAvailable as EventAvailableIcon,
  VideocamOutlined as VideocamOutlinedIcon,
  EditNoteOutlined as EditNoteOutlinedIcon,
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
} from "@mui/icons-material";
import LiveDate from "./LiveDate";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: Home,
    color: "#F5F5F5",
    href: "/dashboard",
  },
  {
    name: "Subjects",
    icon: SubjectIcon,
    color: "#F5F5F5",
    href: "/dashboard/subjects-page",
  },
  {
    name: "Time Table",
    icon: EventAvailableIcon,
    color: "#F5F5F5",
    href: "/dashboard/timetable-page",
  },
  {
    name: "Video Record",
    icon: VideocamOutlinedIcon,
    color: "#F5F5F5",
    href: "/dashboard/video-record-page",
  },
  {
    name: "Result",
    icon: EditNoteOutlinedIcon,
    color: "#F5F5F5",
    href: "/dashboard/result-page",
  },
  {
    name: "Fee",
    icon: AccountBalanceWalletOutlinedIcon,
    color: "#F5F5F5",
    href: "/dashboard/fees-page",
  },
  {
    name: "Settings",
    icon: SettingsOutlinedIcon,
    color: "#F5F5F5",
    href: "/dashboard/settings-page",
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setStudent } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("student");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("student");
    setStudent(null); // Clear user state
    navigate("/login");
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    //Sidebar
    <div className="w-80 h-full bg-[#785491] flex justify-between  rounded-br-2xl flex-col">
      <div className="flex-col">
        <div>
          {/* Access2edu Logo  */}
          <div className="bg-[#e7def0] p-10">
            <img
              src="/ACCESS2EDU-LOGO.svg"
              alt="Access2eduLogo"
              width={88}
              className="flex justify-self-center"
            />
          </div>

          {/* Navbars */}
          <nav className="mt-8 flex-grow w-full">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link key={item.href} to={item.href}>
                  <div
                    className={`flex pl-20 p-4 text-sm font-medium rounded-lg text-[#b7b7b7] hover:bg-[#9e7abb] hover:text-[#f5f5f5] active:text-[#f5f5f5] transition-colors mb-2   ${
                      isActive
                        ? "bg-[#9e7abb] text-[#f5f5f5] border-r-8 border-[#f5f5f5]"
                        : "text-[#b7b7b7] hover:bg-[#9e7abb] hover:text-[#f5f5f5]"
                    } `}
                  >
                    <item.icon size={20} style={{ minWidth: "20px" }} />

                    <motion.span
                      className="ml-4 whitespace-nowrap hover:text-[#f5f5f5] active:text-[#f5f5f5]"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="flex justify-between pl-6 pr-6 pb-15 text-[#f5f5f5]  items-center">
        <LiveDate />
        <div className="flex gap-2 cursor-pointer text-sm" onClick={openModal}>
          <LogoutIcon />
          <p>Sign Out</p>
        </div>
      </div>


      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
          <div className="bg-[#fffbeb] p-6 rounded-3xl text-center flex flex-col justify-items-center justify-center shadow-lg w-96 h-80">
            <div className="flex justify-center text-red-600">
              <LogOutIcon width={80} height={80} /> 
            </div>
            
            
            <h2 className="text-lg font-semibold mt-4">Confirm Logout</h2>
            <p className="text-gray-600 my-2">Are you sure you want to log out?</p>
            <div className="flex justify-between mt-6 gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeModal();
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
