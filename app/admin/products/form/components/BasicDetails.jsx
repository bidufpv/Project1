"use client";

export default function BasicDetails(){
    return (
        <section className="flex flex-col gap-4bg-white rounded-xl border p-4">
            <h1 className="font-semibold">Basic Details</h1>
            <div className="flex flex-col gap-1 ">
                <label className="text-slate-700 text-xs" htmlFor="Product-Title">
                    Product Name 
                    <span className="text-red-600">*</span>
                </label>
                <input type="text" placeholder="Enter Title"
                id="product-title" name="Product-Title"
                className="border px-3 py-2 rounded-lg w-full outline-none " />
            </div>
        </section>
    )
}