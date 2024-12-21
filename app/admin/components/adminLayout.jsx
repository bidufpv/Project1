// "use client";
// import { useEffect, useRef, useState } from "react";
// import Header from "./header.jsx";
// import Sidebar from "./siderbar.jsx";
// import { usePathname } from "next/navigation.js";

// export default function AdminLayout({ children }) {
  
//   // State to track whether the sidebar is open or closed
//   const [isOpen, setIsOpen] = useState(false);
//   const pathName = usePathname();
//   // Reference to the sidebar element
//   const sideBarRef = useRef(null);


//   //for chaning the pathname and toggling the sidebar
//   useEffect(()=>{
//      toggleSideBar();
//   }, [pathName])

  
//   // useEffect to handle clicks outside the sidebar
//   useEffect(() => {
//      // Function to handle click events outside the sidebar
//      function handleClickOutsideEvent(event) {
//        // Check if the sidebar exists and the clicked target is NOT inside the sidebar
//        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
//          setIsOpen(false); // Close the sidebar
//        }
//      }
 
//      // Add a mousedown event listener to the document
//      document.addEventListener("mousedown", handleClickOutsideEvent);
 
//      // Cleanup function: remove the event listener when the component unmounts
//      return () => {
//        document.removeEventListener("mousedown", handleClickOutsideEvent);
//      };
//    }, []); // Empty dependency array ensures the effect runs only once on mount

//   const toggleSideBar = () => {
//     setIsOpen(!isOpen);
//   };

//   // console.log("Sidebar toggle triggered");


//   return (
//     <main className="relative flex">
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>
//       <div
//         ref={sideBarRef}
//         className={`fixed md:hidden ease-in-out transition-all duration-400 z-50 
//         ${isOpen ? "translate-x-0" : "-translate-x-[300px]"}
//         `}
//       >
//         <Sidebar />
//       </div>
//       <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
//         <Header toggleSidebar={toggleSideBar} />
//         <section className="pt-14 flex-1 bg-slate-100">{children}</section>
//       </section>
//     </main>
//   );
// }


import { useEffect, useRef, useState } from "react";
import Header from "./header.jsx";
import Sidebar from "./siderbar.jsx";
import { usePathname } from "next/navigation.js";

export default function AdminLayout({ children }) {
  
  // State to track whether the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  // Reference to the sidebar element
  const sideBarRef = useRef(null);

  //for changing the pathname and toggling the sidebar
  useEffect(() => {
    setIsOpen(false); // Close the sidebar when the pathname changes
  }, [pathName]);

  // useEffect to handle clicks outside the sidebar
  useEffect(() => {
     // Function to handle click events outside the sidebar
     function handleClickOutsideEvent(event) {
       // Check if the sidebar exists and the clicked target is NOT inside the sidebar
       if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
         setIsOpen(false);
       }
     }

     // Add a mousedown event listener to the document
     document.addEventListener("mousedown", handleClickOutsideEvent);

     // Cleanup function: remove the event listener when the component unmounts
     return () => {
       document.removeEventListener("mousedown", handleClickOutsideEvent);
     };
   }, []); // Empty dependency array ensures the effect runs only once on mount

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="relative flex">
      <button onClick={toggleSideBar} className="md:hidden">
        <Header toggleSideBar={toggleSideBar} />
      </button>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
      ref={sideBarRef}
      className={`fixed md:hidden ease-in-out transition-transform duration-100 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
        <Sidebar />
      </div>
      {children}
    </main>
  );
}
