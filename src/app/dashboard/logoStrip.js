"use client";
// components/Navbar.tsx
import React, { useState } from "react";
import logo from "../../assets/LogoWhite.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

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
            const loggedoutUser = localStorage.removeItem("loggedInUser");
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
