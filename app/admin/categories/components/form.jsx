"use client";
export default function Form(){
    return <div className="bg-white p-5 flex flex-col gap-5 rounded-xl w-full md:w-[400px]">
        <h1 className="font-semibold">Create a category</h1>
        <form>
            <div>
                <input 
                id="category name"
                name="category-name"
                type="text"
                placeholder="Add a category"
                className="border px-4 py-2 rounded-lg w-full focus:outline-none" />
                
            </div>

        </form>
    </div>
}