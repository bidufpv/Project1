// "use client";
// import { useState } from "react";
// import Header from "./components/header.jsx";
// import Sidebar from "./components/siderbar.jsx";

// export default function Layout({children}){

//      const[isOpen, setIsOpen] = useState(false);

//      const toggleSideBar = ()=>{
//           setIsOpen(!isOpen);
//      }
      
//      console.log(setIsOpen);
//      console.log(isOpen);
     
//      return( 
//        <main className="flex relative">

//         {/* for desktop size */}
//         <div className="hidden md:block ">
//         <Sidebar />
//         </div>

//         {/* for mobile size */}
//         <div className={`fixed md:hidden ${isOpen ? "translate-x-0" : "-translate-x-[1000px]"} `}>
//         <Sidebar />
//         </div>
        

//        <section className="flex-1 flex flex-col min-h-screen"> 
//           <Header toggleSideBar={toggleSideBar}/>
//           <section className="flex-1 bg-slate-100 ">
//           {children} 
//           </section>
          
//        </section> 
//      </main>
// )}

"use client";
import { useEffect, useState } from "react";
import Header from "./components/header.jsx";
import Sidebar from "./components/siderbar.jsx";
import { usePathname } from "next/navigation.js";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  //for chaning the pathname and toggling the sidebar
  useEffect(()=>{
     toggleSideBar();
  }, [pathName])

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="flex relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed md:hidden inset-y-0 left-0 z-50 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-500 ease-in-out`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <section className="flex-1 flex flex-col min-h-screen">
        <Header toggleSideBar={toggleSideBar} />
        <section className="flex-1 bg-slate-100">{children}</section>
      </section>
    </main>
  );
}
