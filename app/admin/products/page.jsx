import Link from "next/link";

export default function Page(){
    return <main className="p-6 gap-5">
        <div className="flex justify-between items-center">
            <h1 className="text-xl">Products</h1>
            </div>

            <Link href={`/admin/products/form`}>
            <button className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg">
                Create
            </button>

            </Link>
     
    </main>
}