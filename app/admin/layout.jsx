"use client";
import Sidebar from "./components/siderbar.jsx";

export default function Layout({children}){
     return <main className="flex">
        <Sidebar />
       <section className="flex-1"> {children} </section> 
     </main>
}