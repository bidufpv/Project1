"use client";
import { useBrands } from "@/lib/firestore/brands/read";
import { deleteBrand } from "@/lib/firestore/brands/write";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Listview() {
  const { data: brands = [], error, isLoading } = useBrands();

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

  // No Brands State
  if (!brands || brands.length === 0) {
    return <div className="text-gray-500 italic">No Brands found.</div>;
  }

  return (
    <div
      className="bg-white flex flex-col gap-5 flex-1 rounded-xl 
      px-5 py-5 shadow-lg h-full overflow-auto w-full"
    >
      <h1 className="font-semibold text-lg pb-3">Brands</h1>
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
            {brands.map((item, index) => (
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
    if(!confirm("Are you sure you want to delete this Brand?")) return;
    setIsDeleting(true);
    try {
      await deleteBrand({ id });
      toast.success("Brand deleted successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to delete Brand.");
    } finally {
      setIsDeleting(false);
    }
  };

  //Function to handle update
  const handleUpdate = async () => {
    // console.log("Item ID:", item.id);
    router.push(`/admin/brands?id=${item.id}`);
  };
  


  return (
    <tr
      className={`transition-colors ${
        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
      } hover:bg-blue-50`}
    >
      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
      <td className="px-6 py-4">
        {item?.image ? (
          <img
            src={item.image}
            alt={item?.name || "Brand Image"}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        )}
      </td>
      <td className="px-6 py-4 text-gray-700">{item?.name || "Unnamed Category"}</td>
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
