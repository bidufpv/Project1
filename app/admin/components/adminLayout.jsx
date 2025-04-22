// import { useEffect, useRef, useState } from "react";
// import Header from "./header.jsx";
// import Sidebar from "./siderbar.jsx";
// import { usePathname } from "next/navigation.js";
// import { useAuth } from "@/contexts/AuthContext.jsx";
// import { useAdmin } from "@/lib/firestore/admins/read.jsx";
// import { CircularProgress } from "@nextui-org/react";

// export default function AdminLayout({ children }) {
  
//   // State to track whether the sidebar is open or closed
//   const [isOpen, setIsOpen] = useState(false);
//   const pathName = usePathname();
//   // Reference to the sidebar element
//   const sideBarRef = useRef(null);
//   const {user} = useAuth(); // Assuming you have a useAuth hook to get the user context
//   const {data: admin, error, isLoading} = useAdmin({email:user?.email}); // Fetching admin data based on user email

//   //for changing the pathname and toggling the sidebar
//   useEffect(() => {
//     setIsOpen(false); // Close the sidebar when the pathname changes
//   }, [pathName]);

//   // useEffect to handle clicks outside the sidebar
//   useEffect(() => {
//      // Function to handle click events outside the sidebar
//      function handleClickOutsideEvent(event) {
//        // Check if the sidebar exists and the clicked target is NOT inside the sidebar
//        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
//          setIsOpen(false);
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


//   if(isLoading) {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if(error) {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center">
//         <h1 className="text-red-500">{error}</h1>
//       </div>
//     );
//   }

//   if(!admin) {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center">
//         <h1 className="text-red-500">Admin Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <main className="relative flex">
//       <div onClick={toggleSideBar} className="md:hidden">
//         <Header toggleSideBar={toggleSideBar} />
//       </div>
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>
//       <div
//       ref={sideBarRef}
//       className={`fixed md:hidden ease-in-out transition-transform duration-100 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//     >
//         <Sidebar />
//       </div>
//       {children}
//     </main>
//   );
// }





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





