"use client";
// components/Navbar.tsx
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import logo from "../../assets/LogoBlue.png";
import Image from "next/image";

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
        <Image
          src={logo.src}
          className="w-[64px] h-auto"
          alt="MagnumInsight Logo"
          width={64}
          height={64}
        />
      </div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        TOGGLE SIDEBAR
      </button>
    </nav>
  );
};
export default Navbar;
