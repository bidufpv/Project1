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
 } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){

const menuList = [
    {
        name: "Dashboard",
        link: '/dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
        name: "Products",
        link: '/dashboard/products',
        icon: <SquareChartGantt className="w-5 h-5" />
    },
    {
        name: "Categories",
        link: '/dashboard/categories',
        icon: <ChartColumnStacked className="w-5 h-5"/>
    },
    {
        name: "Brand",
        link: '/dashboard/brand',
        icon: <BookA className="w-5 h-5"/>,
    },
    {
        name: "Orders",
        link: '/dashboard/orders',
        icon: <ListOrdered className="w-5 h-5"/>
    },
    {
        name: "Customers",
        link: '/dashboard/customers',
        icon: <User className="w-5 h-5"/>,
    },
    {
        name: "Reviews",
        link: '/dashboard/reviews',
        icon: <Star className="w-5 h-5"/>,
    },
    {
        name: "Collection",
        link: '/dashboard/collection',
        icon: <Library className="w-5 h-5"/>
    },
];

    return <section className="flex flex-col gap-2 items-center
     md:w-[200px] bg-white border-r px-5 py-3 h-screen overflow-hidden">
        <img className="h-20  " src="/logo.jpg" alt="" />
        <ul className="flex-1 flex flex-col gap-5  ">

            {menuList?.map((item, key)=>(
                
               <SelectedTab item={item} key={key}/>
            ))}

        </ul>
    </section>
};

function SelectedTab({item}){
    const pathName  = usePathname();
    const isSelected = pathName.startsWith(item?.link);
    console.log(isSelected);
    
    return (
        <Link href={item?.link}>
                 <li className={`flex items-center gap-3 py-4 px-4 rounded-xl
                 hover:text-blue-500 hover:underline italic text-blue-800 font-semibold
                 ${isSelected ? "bg-blue-700 text-white" : "bg-white text-blue-800"}
                 `}>
                  {item?.icon}{item?.name}
                  </li>
                </Link>
    )
}