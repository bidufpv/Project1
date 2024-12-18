// "use client";

// import { Menu } from "lucide-react";


// export default function Header({toggleSidebar}) {
//   return (
//     <section
//       className="fixed w-full top-0 flex items-center gap-3
//      bg-white border-b px-4 py-3"
//     >
//       <div className="md:hidden flex items-center">
//         <button onClick={toggleSidebar}>
//           <Menu className="w-6 h-6" />
//         </button>
//       </div>

//       <h1 className="text-xl font-semibold">Dashboard</h1>
//     </section>
//   );
// }


"use client";
import { Menu } from "lucide-react";

export default function Header({ toggleSideBar }) {
  return (
    <section
      className="fixed w-full top-0 flex items-center gap-3
     bg-white border-b px-4 py-3"
    >
      {/* Menu Button for Mobile */}
      <div className="block md:hidden">
        <button onClick={toggleSideBar}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <h1 className="text-xl font-semibold">Dashboard</h1>
    </section>
  );
}
