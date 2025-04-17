"use client";

import { useEffect, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images"; // Already imported correctly
import RTE from "./components/RTE";
import toast from "react-hot-toast";
import { createNewProduct } from "@/lib/firestore/products/write";
import { getProductById, updateProductById } from "@/lib/firestore/products/read";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const [data, setData] = useState({});
  const [featuredImage, setFeaturedImage] = useState(""); // Initialize with empty string
  const [imageList, setImageList] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");


  const router = useRouter(); // Use the router to navigate after creating/updating a product


  // ✅ Fetch existing product data if editing
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        console.log("Fetched Product:", product); // Log the fetched product data
        if (product) {
          setData(product);
          setFeaturedImage(product.featureImageURL || ''); // Ensure featuredImage is a string
          setImageList(product.imageList ?? []); // Ensure imageList is an array
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

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
      if (isEditing) {
        // Update the product if in editing mode
        await updateProductById(id, { data, featureImage: featuredImage, imageList: imageList });
        toast.success("Product updated successfully!");
        router.push("/admin/products"); // Redirect to products page after updating
      } else {
        // Create a new product if not editing
        await createNewProduct({ data, featureImage: featuredImage, imageList: imageList });
        setData({}); // Only reset the data if creating a new product
        setFeaturedImage(''); // Reset featuredImage
        setImageList([]); // Reset imageList
        toast.success("Product created successfully!");
      }
    } catch (error) {
      console.error("Error saving product:", error.message);
      toast.error(error?.message || "Error saving product");
    }
    setIsLoading(false);
  };

  return (
    <main className="p-6 gap-4 flex flex-col">
      <h1 className="font-semibold">{isEditing ? "Edit Product" : "Create New Product"}</h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center w-full">
        {/* Left Section: Basic Details */}
        <div className="w-full md:w-1/3">
          <BasicDetails data={data} handleData={handleData} />
        </div>

        {/* Right Section: Images & Rich Text Editor */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          <Images
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            imageList={imageList}
            setImageList={setImageList}
          />
          <RTE data={data} handleData={handleData} />
        </div>
      </div>

      {/* ✅ Create/Update Button with Disabled State */}
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className={`text-sm w-24 px-4 py-2 rounded-lg text-white ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {isLoading
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
          ? "Update"
          : "Create"}
      </button>
    </main>
  );
}
