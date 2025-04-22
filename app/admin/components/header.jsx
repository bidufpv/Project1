// "use client";
// import { useAuth } from "@/contexts/AuthContext";
// import { useAdmin } from "@/lib/firestore/admins/read";
// import { Avatar } from "@nextui-org/react";
// import { Menu } from "lucide-react";

// export default function Header({ toggleSideBar }) {

//    const{user} = useAuth();
//    const {data: admin} = useAdmin({email: user?.email}); 

//   return (
//     <section
//       className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3"
//     >
//       {/* Menu Button for Mobile */}
//       <div className="flex justify-center items-center md:hidden">
        
//         <button onClick={toggleSideBar}>
//           <Menu className="w-6 h-6" />
//         </button>
//       </div>

//       <h1 className="text-xl font-semibold">Dashboard</h1>
//       <div>
//         <Avatar src={admin?.imageURL} />
//       </div>
//     </section>
//   );
// }

"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react";

export default function Header({ toggleSideBar }) {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      
      {/* Left: Logo + Sidebar toggle (for mobile) */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSideBar} className="md:hidden block">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <img src="/logo.jpg" alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-lg font-semibold hidden md:inline-block">Admin Panel</span>
      </div>

      {/* Right: Admin Avatar */}
      <div className="flex items-center gap-3">
        {admin?.name && <p className="text-sm font-medium hidden sm:block">{admin.name}</p>}
        <Avatar src={admin?.image || "/placeholder-avatar.png"} alt="Admin Avatar" className="w-9 h-9" />
      </div>
    </header>
  );
}
