"use client";
import { 
LayoutDashboard,
SquareChartGantt,
ChartColumnStacked,
BookA,
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

    return  <section className="flex flex-col gap-2 items-center
     md:w-[200px] bg-white border-r px-5 py-3 h-screen overflow-hidden">
        <img className="h-20  " src="/logo.jpg" alt="" />
        <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-5  ">

            {menuList?.map((item, key)=>(
                
               <SelectedTab item={item} key={key}/>
            ))}

        </ul>
        <button className=" flex flex-row bg-blue-500 hover:bg-blue-400 
        text-white font-bold py-2 gap-2 italic px-5 border-b-4 border-blue-700
         hover:border-blue-500 rounded-2xl cursor-pointer">
        Logout
        <LogOut />
        </button>
    </section>
};

function SelectedTab({item}){
    const pathName  = usePathname();
    // Check if the current path starts with the menu item's link
    const isSelected = pathName === item?.link;
    console.log(isSelected);
    
    return (
        <Link href={item?.link} className="block group h-10 w-50">
            <li
                className={`flex items-center gap-3 py-4 px-4 rounded-xl
                ease-soft-spring transition-all duration-500 italic font-semibold
                ${isSelected ? "bg-blue-500 text-white" : "bg-white text-blue-800"}
                group-hover:text-blue-500 
                ${isSelected ? "group-hover:text-white group-hover:no-underline" : ""}
                `}
            >
                {item?.icon} {item?.name}
            </li>
        </Link>
    );
    
}