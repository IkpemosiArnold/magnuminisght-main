"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// Zustand

import { useStore } from "../store/store";

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { authUser } = useStore();
  return (
    <main className="flex min-h-screen flex-col pl-4 pt-12 pr-4 libre-franklin min-w-[80vw] sm:min-w-[88vw]">
      <h1 className="font-bold text-2xl blue-text">
        {isClient ? `Hello, ${authUser["first_name"]}!` : " "}
      </h1>
      <h3 className="font-bold text-xl mt-12 ">
        What would you like assistance with today ?
      </h3>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 mt-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Number of current applications
            </p>
          </CardContent>
          <CardFooter>
            <button className="red-button py-2 px-4">View</button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">IELT Practice</div>
            <p className="text-xs text-muted-foreground">Resource material</p>
          </CardContent>
          <CardFooter>
            <button className="red-button py-2 px-4">View</button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Scholarships</div>
            <p className="text-xs text-muted-foreground">Resource material</p>
          </CardContent>
          <CardFooter>
            <button className="red-button py-2 px-4">View</button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-white mt-4">
        <Link href="/dashboard/applications/expressentry">
          {" "}
          <div className="service-box">
            <p>Express Entry</p>
            <ArrowRightIcon className="w-6 h-6" />
          </div>
        </Link>

        <div className="service-box">
          <p>Study Assessment </p>
          <ArrowRightIcon className="w-6 h-6" />
        </div>
        <Link href="/dashboard/applications/visitorsvisa">
          <div className="service-box">
            <p>Visitors Visa</p>
            <ArrowRightIcon className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/dashboard/applications/workpermit">
          <div className="service-box">
            <p>Work Permit</p>
            <ArrowRightIcon className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </main>
  );
}
