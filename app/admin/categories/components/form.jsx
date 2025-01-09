"use client";

import { createNewCategory } from "@/lib/firestore/categories/write";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Form() {
    // State to hold form data
  const [data, setData] = useState(null);
   // State to hold the uploaded image file
  const [image, setImage] = useState(null);


  // Function to handle updating the form data
  const handleData = (key, value) => {
     // Use functional update to ensure proper merging of previous state

    setData((preData)=> { 
      return { 
        ...(preData ?? {}),  // Spread existing data, or initialize as an empty object if null
         [key]: value }       // Dynamically update the field by key
        
        });
  };

  // Function to handle form submission and send data to the server
  const handleCreate =async()=>{
    try {
      await createNewCategory(data, image);
    } catch (error) {
      toast.error(error?.message);
      
    }
  }

  
  return (
    <div className="bg-slate-100 p-5 flex flex-col gap-5 rounded-xl w-full md:w-[400px]">

      {/* Form title */}
      <h1 className="font-semibold">Create a category</h1>

      {/* Form element with onSubmit handler */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          handleCreate(); // Trigger form submission logic
        }}
        className="gap-5 flex flex-col"
      >
        {/* Image upload section */}
        
        <div className="flex flex-col gap-1">
          <label htmlFor="category-image" className="text-slate-600 text-sm">
            Image
            <span className="text-red-600">*</span>
          </label>
          {/* Display image preview if an image is uploaded */}
          {image && (
            <div className="flex p-5 items-center gap-2 justify-center">
              <img className="h-12" src={URL.createObjectURL(image)} alt="Preview" />
            </div>
          )}
          <input
            onChange={(e) => {
              // Check if a file is selected before updating the state
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]); // Update image state with the selected file
              }
            }}
            id="category-image"
            name="category-image"
            type="file"
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>

        {/* Name input field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-slate-600 text-sm">
            Name
            <span className="text-red-600">*</span>
          </label>
          <input
            id="category-name"
            name="category-name"
            type="text"
            placeholder="Add a category"
            value={data?.name ?? ""} // Use optional chaining to handle null `data`
            onChange={(e) => handleData("name", e.target.value)} // Update name field in state
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>

        {/* Slug input field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category-slug" className="text-slate-600 text-sm">
            Slug
            <span className="text-red-600">*</span> {""}
          </label>
          <input
            id="category-slug"
            name="category-slug"
            type="text"
            value={data?.slug ?? ""} // Use optional chaining to handle null `data`
            onChange={(e) => handleData("slug", e.target.value)} // Update slug field in state
            placeholder="Add a Slug"
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button
            type="submit" // Form submission is handled via `onSubmit` in the parent `form`
            className="bg-blue-600 w-15 h-8 text-white rounded-lg text-xs font-semibold"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}