"use client";
// components/Navbar.tsx
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap  sticky z-10 pb-16 shadow-sm h-[73px]">
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow px-6 py-0 lg:flex lg:items-center bg-white lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="libre-franklin lg:flex-grow">
          <a
            href="/dashboard"
            className="block  md:mt-0 mt-4  lg:inline-block  text-white-200 mr-4"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/profile"
            className="block mt-4 md:mt-0 lg:inline-block  text-white-200 mr-4"
          >
            Profile
          </a>
          <a
            href="/dashboard/applications"
            className="block mt-4 md:mt-0 lg:inline-block  text-white-200 mr-4"
          >
            Application
          </a>
          <a
            href="#"
            className="block mt-4 md:mt-0 lg:inline-block  text-white-200 mr-4"
          >
            Messages
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
