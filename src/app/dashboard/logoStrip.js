"use client";
// components/Navbar.tsx
import React, { useState } from "react";
import logo from "../../assets/LogoWhite.png";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

//import actions
import { logoutUser } from "../apiCalls/apiCalls";

const Logostrip = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between flex-wrap p-6 blue-bg">
      <div className="flex items-center flex-shrink-0 text-white">
        <img src={logo.src} className="w-100 h-10 mr-2" alt="Logo" />
      </div>

      <div>
        <Button
          className="custom-button"
          variant="primary"
          onClick={() => {
            logoutUser();
            const loggedoutUser = localStorage.removeItem("user-storage");
            router.push("/login");
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};
export default Logostrip;
