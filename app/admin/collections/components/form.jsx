"use client";
import { getCollections } from "@/lib/firestore/collections/read-server";
import { createNewCollection, updateCollection } from "@/lib/firestore/collections/write";
import { useProducts } from "@/lib/firestore/products/read";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function Form() {
    // State to hold form data
  const [data, setData] = useState(null);
   // State to hold the uploaded image file
  const [image, setImage] = useState(null);
  const [isloading, setIsLoading] = useState(false);

const [product, setProduct] = useState([]);
const [lastDoc, setLastDoc] = useState(null);
const [hasMore, setHasMore] = useState(true);


// for searching the id
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // console.log(id);


  const {data: products}  =  useProducts({pageLimit: 1000});
  const router = useRouter();


  
// for fetching products
const fetchMoreProducts = async () => {
  try {
    const res = await fetchPaginatedProducts({
      limitCount: 10,
      startAfterDoc: lastDoc,
    });

    setProduct((prev) => [...prev, ...res.products]);
    setLastDoc(res.lastVisible);
    setHasMore(res.hasMore);
  } catch (error) {
    toast.error("Failed to fetch products");
  }
};

useEffect(() => {
  fetchMoreProducts();
}, []);


  

  const fetchData = async () => {
    try {
      const res = await getCollections({id: id});
      if(!res){
        toast.error("Collection not found!");
      }else{
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]); 




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
    setIsLoading(true);
    try {
      await createNewCollection(data, image);
      toast.success("Collection created successfully");
      setData(null); // Reset form data
      setImage(null); // Reset image state
      
    } catch (error) {
      toast.error(error?.message);
      
    }
    setIsLoading(false);  // Reset loading state
  }

//function for handle update the category
  const handleUpdate =async()=>{
    setIsLoading(true);
    try {
      await updateCollection(data, image);
      toast.success("Collection Updated successfully");
      setData(null); // Reset form data
      setImage(null); // Reset image state
      router.push("/admin/collection"); // Redirect to the categories page
    } catch (error) {
      toast.error(error?.message);
      
    }
    setIsLoading(false);  // Reset loading state
  }

  
  return (
    <div className="bg-slate-100 p-5 flex flex-col gap-5 rounded-xl w-full md:w-[400px]">

      {/* Form title */}
      <h1 className="font-semibold">{id ?'Update':'Create'} a collection</h1>

      {/* Form element with onSubmit handler */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          if(id){
            handleUpdate();
           }
           else{
             handleCreate(); // Trigger form submission logic
           }
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
            id="collectionimage"
            name="collectionimage"
            type="file"
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>



        {/* Title input field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="collectioname" className="text-slate-600 text-sm">
            Title
            <span className="text-red-600">*</span>
          </label>
          <input
            id="collectiontitle"
            name="collectiontitle"
            type="text"
            placeholder="Add a collection name"
            // Use optional chaining to handle null `data` and provide a default value
            value={data?.title ?? ""} // Use optional chaining to handle null `data`
            onChange={(e) => handleData("title", e.target.value)} // Update name field in state
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>




        {/* Slug input field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="collection-slug" className="text-slate-600 text-sm">
            sub-title
            <span className="text-red-600">*</span> {""}
          </label>
          <input
            id="collection-title"
            name="collection-title"
            type="text"
            value={data?.subtitle ?? ""} // Use optional chaining to handle null `data`
            onChange={(e) => handleData("subtitle", e.target.value)} // Update slug field in state
            placeholder="Add a sub-title"
            className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
          />
        </div>


        {/* Products input field */}
        <div className="flex flex-col gap-1">
  <label htmlFor="collection-products" className="text-slate-600 text-sm">
    Select Products <span className="text-red-600">*</span>
  </label>
  <select
    id="collection-products"
    name="collection-products"
    onChange={(e) => handleData("productId", e.target.value)}
    className="border px-4 py-1 text-sm rounded-lg w-full focus:outline"
  >
    <option value="">Select a product</option>
    {products.map((product) => (
      <option key={product.id} value={product.id}>
        {product.title}
      </option>
    ))}
  </select>
  {hasMore && (
    <button
      type="button"
      onClick={fetchMoreProducts}
      className="text-xs text-blue-600 hover:underline mt-1 self-end"
    >
      Load more products
    </button>
  )}
</div>




      
        <div className="flex justify-end">
  <button
    disabled={isloading} // Disable the button while loading
    type="submit" // Form submission
    className={`flex items-center justify-center bg-blue-600 w-20 h-10
       text-white rounded-lg text-sm font-semibold transition duration-300 ease-in-out ${
      isloading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
    }`}
  >
    {isloading ? (
      <div className="flex items-center gap-2">
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-xs">Adding...</span>
      </div>
    ) : (
      (id ? "Update" : "Add") // Conditional button text based on form mode
    )}
  </button>
</div>

      </form>
    </div>
  );
}