"use client";
import BasicDetails from "./components/BasicDetails";

export default function Page(){
    return (
        <main className="p-6 gap-4 flex flex-col">
                <h1 className=" font-semibold">Create new Products</h1>

                <div>
                    <BasicDetails />
                </div>

                <button className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg">
                    Create
                </button>
           
        </main>
    )
}