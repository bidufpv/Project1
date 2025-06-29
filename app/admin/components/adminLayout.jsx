// Description: This file contains functions to create, delete, and update collections in Firestore.
// It uses Firebase Firestore SDK to interact with the database and Cloudinary for image uploads.
"use client";
import { useEffect, useRef, useState } from "react";
import Header from "./header.jsx";
import Sidebar from "./siderbar.jsx";
import { usePathname } from "next/navigation.js";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useAdmin } from "@/lib/firestore/admins/read.jsx";
import { CircularProgress } from "@nextui-org/react";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const sideBarRef = useRef(null);
  const { user } = useAuth();
  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-red-500">Admin Not Found</h1>
      </div>
    );
  }

  return (
    <>
      {/* Always visible header */}
      <Header toggleSideBar={toggleSideBar} />

      <main className="relative flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <div
          ref={sideBarRef}
          className={`fixed md:hidden ease-in-out transition-transform duration-200 z-50 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>

        {/* Page Content */}
        <div className="flex-1 w-full">{children}</div>
      </main>
    </>
  );
}





