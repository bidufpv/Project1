"use client";
import { auth } from "@/lib/auth/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import {
  LayoutDashboard,
  SquareChartGantt,
  ChartColumnStacked,
  ListOrdered,
  User,
  Star,
  Library,
  LogOut,
  Shield,
  Box,
  Baseline,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <SquareChartGantt className="w-5 h-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <ChartColumnStacked className="w-5 h-5" />,
    },
    {
      name: "Brands",
      link: "/admin/brands",
      icon: <Baseline className="w-5 h-5"  />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ListOrdered className="w-5 h-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: "Collection",
      link: "/admin/collections",
      icon: <Library className="w-5 h-5" />,
    },
    {
      name: "Admin",
      link: "/admin/admins",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Shiprocket",
      link: "/admin/shiprocket",
      icon: <Box className="w-5 h-5" />,
    },
    {
      name: "Logout",
      action: async () => {
        try {
          await toast.promise(signOut(auth), {
            error: (e) => e?.message,
            loading: "Signing Off",
            success: "Successfully Logged Out",
          });
        } catch (error) {
          toast.error(error?.message);
        }
      },
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  return (
    <section
      className="sticky top-0 flex flex-col gap-4 items-center md:w-[220px]
         bg-white border-r px-4 py-3 h-screen overflow-hidden"
    >
      {/* Logo */}
      <Link href="/">
      <img className="h-10 w-auto mb-2" src="/logo.jpg" alt="Logo" />
      </Link>
      

      {/* Menu List */}
      <ul className="flex-1 w-full overflow-y-auto flex flex-col gap-3">
        {menuList?.map((item, key) => (
          <SelectedTab item={item} key={key} />
        ))}
      </ul>
    </section>
  );
}

function SelectedTab({ item }) {
  const pathName = usePathname();
  const isSelected = pathName === item?.link;

  const handleClick = async () => {
    if (item?.action) {
      // Execute the logout logic if `action` is defined
      await item.action();
    }
  };

  return (
    <li
      className={`flex italic items-center gap-3 py-2 px-3 rounded-lg
          ease-in-out transition-all duration-300 font-semibold
          ${isSelected ? "bg-blue-500 text-white" : "bg-white text-blue-800"}
          hover:bg-blue-100 hover:text-blue-500 cursor-pointer
          `}
      onClick={handleClick}
    >
      {/* If action exists, use onClick; otherwise, use a link */}
      {item?.link ? (
        <Link href={item?.link} className="flex items-center gap-3 w-full">
          {item?.icon} <span>{item?.name}</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          {item?.icon} <span>{item?.name}</span>
        </div>
      )}
    </li>
  );
}
