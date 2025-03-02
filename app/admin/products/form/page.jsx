"use client";

import { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import RTE from "./components/RTE";
import toast from "react-hot-toast";
import { createNewProduct } from "@/lib/firestore/products/write";

export default function Page() {
  const [data, setData] = useState({});
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Handles form data changes
  const handleData = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // ✅ Handles form submission
  const handleSubmit = async () => {
    if (!data.title || !featuredImage) {
      return toast.error("Title and Feature Image are required!");
    }

    setIsLoading(true);
    try {
      await createNewProduct({ data, featureImage: featuredImage, imageList: imageList });

      setData({});
      setFeaturedImage(null);
      setImageList([]);
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error.message);
      toast.error(error?.message || "Error creating product");
    }
    setIsLoading(false);
  };

  return (
    <main className="p-6 gap-4 flex flex-col">
      <h1 className="font-semibold">Create new Products</h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center w-full">
        {/* Left Section: Basic Details */}
        <div className="w-full md:w-1/3">
          <BasicDetails data={data} handleData={handleData} />
        </div>

        {/* Right Section: Images & Rich Text Editor */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">

          <Images
            data={data}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            ImageList={imageList}
            setImageList={setImageList}
          />
          <RTE data={data} handleData={handleData} />
        </div>
      </div>

      {/* ✅ Create Button with Disabled State */}
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className={`text-sm w-20 px-4 py-2 rounded-lg text-white ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {isLoading ? "Creating..." : "Create"}
      </button>
    </main>
  );
}
