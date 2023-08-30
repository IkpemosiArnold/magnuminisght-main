// components/Sidebar.tsx
"use client";
import React from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { defaultNavItems, NavItem } from "./defaultNavItems";
import logoMark from "../../assets/MagnumAi.jpg";
// 👇 props to get and set the collapsed state from parent component

const Sidebar = ({
  collapsed,
  navItems = defaultNavItems,
  shown,
  setCollapsed,
}) => {
  // 👇 use the correct icon depending on the state.
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={classNames({
        "blue-bg text-white fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-black transition-none": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <span className="whitespace-nowrap">
              {" "}
              <Image
                src={logoMark.src}
                className="h-auto w-16 rounded-full"
                alt="logomark"
                width={0}
                height={0}
                unoptimized
              />
            </span>
          )}
          <button
            className="grid place-content-center hover:bg-indigo-800 w-10 h-10 rounded-full opacity-1 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "text-white hover:bg-indigo-900 flex": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                >
                  <Link href={item.href} className="flex gap-2">
                    {item.icon} <span>{!collapsed && item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className={classNames({
            "grid place-content-stretch p-4 ": true,
          })}
        >
          <div className="flex gap-4 items-center h-11 overflow-hidden">
            {!collapsed && (
              <div className="flex flex-col ">
                <span className="text-indigo-50 my-0">contact us</span>
                <Link href="/" className="text-indigo-200 text-sm">
                  hello@MagnumInsights.com
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
