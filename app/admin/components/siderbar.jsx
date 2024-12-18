"use client";
import { auth } from "@/lib/auth/firebase";
import { signOut } from "firebase/auth";
import {toast} from 'react-hot-toast';
import { 
LayoutDashboard,
SquareChartGantt,
ChartColumnStacked,
ListOrdered,
User,
Star,
Library,
LogOut,
 } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){

const menuList = [
    {
        name: "Dashboard",
        link: '/admin',
        icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
        name: "Products",
        link: '/admin/products',
        icon: <SquareChartGantt className="w-5 h-5" />
    },
    {
        name: "Categories",
        link: '/admin/categories',
        icon: <ChartColumnStacked className="w-5 h-5"/>
    },
    {
        name: "Orders",
        link: '/admin/orders',
        icon: <ListOrdered className="w-5 h-5"/>
    },
    {
        name: "Customers",
        link: '/admin/customers',
        icon: <User className="w-5 h-5"/>,
    },
    {
        name: "Reviews",
        link: '/admin/reviews',
        icon: <Star className="w-5 h-5"/>,
    },
    {
        name: "Collection",
        link: '/admin/collection',
        icon: <Library className="w-5 h-5"/>
    },
];

    return (
        <section className="flex flex-col gap-4 items-center md:w-[220px]
         bg-white border-r px-4 py-3 h-screen overflow-hidden">
            {/* Logo */}
            <img className="h-10 w-auto mb-2" src="/logo.jpg" alt="Logo" />
            
            {/* Menu List */}
            <ul className="flex-1 w-full overflow-y-auto flex flex-col gap-3">
                {menuList?.map((item, key) => (
                    <SelectedTab item={item} key={key} />
                ))}
            </ul>

            {/* Logout Button */}
            <button 
            //async function to handle logout logic
            onClick={async()=>{
                try {
                    //Display a promise toast to show notifications based on the signOut process

                    await toast.promise(signOut(auth),{  //signOut(auth) initiates the logout process comes from firebase auth
                         // Error state: Displays an error message if signOut fails
                        error: (e) => e?.message, //Extracts and displays the error message
                         // Loading state: Shows a notification while signOut is in progress
                        loading: "Signing Off",
                         // Success state: Displays when signOut is successful
                        success: "Successfully Logged Out"
                    });
                } catch (error) {
                    toast.error(error?.message)
                }
            }}
            
            
            className="w-12px flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 
            text-white font-semibold py-1 px-2 border-b-4 border-blue-700
            hover:border-blue-500 rounded-xl cursor-pointer mt-4">
                Logout
                <LogOut />
            </button>
        </section>
    );
};

function SelectedTab({item}) {
    const pathName = usePathname();
    const isSelected = pathName === item?.link;

    return (
        <Link href={item?.link} className="block w-full">
            <li
                className={`flex items-center gap-3 py-2 px-3 rounded-lg
                ease-in-out transition-all duration-300 italic font-semibold
                ${isSelected ? "bg-blue-500 text-white" : "bg-white text-blue-800"}
                hover:bg-blue-100 hover:text-blue-500
                `}
            >
                {item?.icon} {item?.name}
            </li>
        </Link>
    );
}
