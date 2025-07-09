"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Contact Us", link: "/contact-us" },
    { name: "About Us", link: "/about-us" },
  ];

  return (
    <nav className="w-full border-b shadow-sm px-4 py-3 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {menuList.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/signin">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl text-sm">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 px-2 pb-4">
          {menuList.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-4 border-t mt-4">
            <Link href="/signin">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm w-full">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl text-sm w-full">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
