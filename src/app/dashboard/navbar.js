"use client";
// components/Navbar.tsx
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import logo from "../../assets/LogoBlue.png";

const Navbar = (props) => {
  return (
    <nav
      className={classNames({
        "bg-white blue-text": true, // colors
        "flex items-center": true, // layout
        "w-screen md:w-full sticky z-10 px-4 shadow-sm h-[73px] top-0 ": true, //positioning & styling
      })}
    >
      <div className="text-lg libre-franklin">
        <img src={logo.src} className="w-[64px] h-auto" />
      </div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};
export default Navbar;
