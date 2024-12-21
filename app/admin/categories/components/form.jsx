"use client";

import { Button } from "@nextui-org/react";

export default function Form() {
  return (
    <div className="bg-slate-100  p-5 flex flex-col gap-5 rounded-xl w-full md:w-[400px]">
      <h1 className="font-semibold">Create a category</h1>
      <form className="gap-4 flex flex-col">
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-slate-600 text-sm ">
            Name
            <span className="text-red-600">*</span>
          </label>
          <input
            id="category name"
            name="category-name"
            type="text"
            placeholder="Add a category"
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-slate-600 text-sm ">
            Slug
            <span className="text-red-600">*</span> {""}
          </label>
          <input
            id="category slug"
            name="category-slug"
            type="text"
            placeholder="Add a Slug"
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>
        <div className="flex justify-end">
        <Button className="bg-blue-600 w-15 h-8 text-white rounded-lg text-xs font-semibold">
         Add
        </Button>
        </div>
      </form>
    </div>
  );
}
