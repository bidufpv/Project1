"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Listview() {
  const { data: products = [], error, isLoading } = useProducts();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  // Error State
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // No Products State
  if (!products || products.length === 0) {
    return <div className="text-gray-500 italic">No Products found.</div>;
  }

  return (
    <div
      className="bg-white flex flex-col gap-5 flex-1 rounded-xl 
      px-5 py-5 shadow-lg h-full overflow-auto w-full"
    >
      <h1 className="font-semibold text-lg pb-3">Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-blue-50 text-blue-600">
            <tr>
              <th className="px-6 py-3">Serial No</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <Row item={item} index={index} key={item.id || index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  // Function to Handle Delete
  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this Product?")) return;
    setIsDeleting(true);
    try {
      await deleteProduct({ id });
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to delete Product.");
    } finally {
      setIsDeleting(false);
    }
  };

  //Function to handle update
  const handleUpdate = async () => {
    // console.log("Item ID:", item.id);
    router.push(`/admin/products/form?id=${item.id}`);
  };
  


  return (
    <tr
      className={`transition-colors ${
        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
      } hover:bg-blue-50`}
    >
      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
      <td className="px-6 py-4">
        {item?.featureImageURL ? (
          <img
            src={item.featureImageURL}
            alt={item?.title || "Product Image"}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        )}
      </td>
      <td className="px-6 py-4 text-gray-700">{item?.title || "Unnamed Product"}</td>
      <td className="px-6 py-4 flex gap-2">

        <button onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(item?.id)}
          disabled={isDeleting}
          className={`px-4 py-2 rounded transition ${
            isDeleting
              ? "bg-red-600 text-white cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </td>
    </tr>
  );
}
