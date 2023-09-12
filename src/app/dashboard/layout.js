"use client";
import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Logostrip from "./logoStrip";
import logowhite from "../../assets/LogoWhite.png";
import "../dashboardstyles.css";
export default function Layout(props) {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div
      className={classNames({
        "grid bg-white min-h-screen": true,
      })}
    >
      <div className="">
        <Logostrip />
        <Navbar />
        {props.children}
      </div>
    </div>
  );
}
