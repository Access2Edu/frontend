// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#FAEEDD] p-4 fixed w-full top-0 z-50 shadow">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <img src="/src/assets/logo.png" alt="Logo" className="h-8" />

        <button onClick={() => setMenuOpen(true)} className="md:hidden">
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-[#76469A] text-white p-6 transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={() => setMenuOpen(false)} className="mb-6 text-right text-2xl font-bold">
          ✕
        </button>

        <nav className="space-y-4">
          <a href="#" className="block hover:underline">Home</a>
          <button className="flex items-center justify-between w-full">
            About us <IoIosArrowDown />
          </button>
          <button className="flex items-center justify-between w-full">
            Streams <IoIosArrowDown />
          </button>
          <button className="flex items-center justify-between w-full">
            Admission <IoIosArrowDown />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
