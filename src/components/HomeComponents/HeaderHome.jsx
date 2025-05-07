import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const HeaderHome = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [streamsOpen, setStreamsOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleStreams = () => setStreamsOpen(!streamsOpen);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-[#fff9f0] z-50 shadow-md px-4 py-3 flex items-center justify-between md:px-8">
        <div className="logo">
          <img
            src="src/assets/access_II_edu-logo.png"
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <div className="relative group">
            <span className="cursor-pointer">Streams</span>
            {/* Dropdown on hover */}
            <div className="absolute top-full mt-2 bg-[#774a94] text-white shadow-md rounded p-2 hidden group-hover:block z-10">
              <Link to="/science" className="block px-4 py-1 hover:bg-[#643b7a]">Science</Link>
              <Link to="/arts" className="block px-4 py-1 hover:bg-[#643b7a]">Arts</Link>
              <Link to="/commercial" className="block px-4 py-1 hover:bg-[#643b7a]">Commercial</Link>
            </div>
          </div>
          <Link to="/admission">Admission</Link>
          <Link to="/about">About</Link>
          <Link to="/login" className="text-[#774a94]">Log in</Link>
          <Link to="/signup">
            <button className="bg-[#774a94] text-white px-4 py-1.5 rounded-full hover:bg-[#643b7a]">
              Sign Up
            </button>
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden" onClick={toggleDrawer}>
          {drawerOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-[#fff9f0] z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b border-[#774a94]">
          <span className="text-lg font-bold text-[#774a94]">Menu</span>
          <button onClick={toggleDrawer}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
          <Link to="/" onClick={toggleDrawer}>Home</Link>

          {/* Streams Dropdown */}
          <div>
            <button
              onClick={toggleStreams}
              className="flex items-center justify-between w-full"
            >
              <span>Streams</span>
              {streamsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {streamsOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2 text-sm text-white bg-[#774a94] p-2 rounded">
                <Link to="/science" onClick={toggleDrawer}>Science</Link>
                <Link to="/arts" onClick={toggleDrawer}>Arts</Link>
                <Link to="/commercial" onClick={toggleDrawer}>Commercial</Link>
              </div>
            )}
          </div>

          <Link to="/admission" onClick={toggleDrawer}>Admission</Link>
          <Link to="/about" onClick={toggleDrawer}>About</Link>
          <Link to="/login" onClick={toggleDrawer} className="text-[#774a94]">Log in</Link>
          <Link to="/signup" onClick={toggleDrawer}>
            <button className="bg-[#774a94] text-white px-4 py-1.5 rounded-full hover:bg-[#643b7a] w-full mt-2">
              Sign Up
            </button>
          </Link>
        </nav>
      </div>

      {/* Spacer below fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default HeaderHome;
