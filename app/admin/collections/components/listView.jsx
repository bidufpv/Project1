"use client";

import { useCollection } from "@/lib/firestore/collections/read";
import { deleteCollection } from "@/lib/firestore/collections/write";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Listview() {
  const { data: collection = [], error, isLoading } = useCollection();

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!collection.length) {
    return <div className="text-gray-500 italic">No collections found.</div>;
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col gap-5 h-full overflow-auto w-full">
      <h1 className="text-lg font-semibold pb-3">Collections</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-blue-50 text-blue-600">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((item, index) => (
              <CollectionRow key={item.id || index} item={item} index={index} router={router} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CollectionRow({ item, index, router }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this collection?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteCollection({ id: item.id });
      toast.success("Collection deleted successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to delete collection.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/collection?id=${item.id}`);
  };

  return (
    <tr className={`transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} hover:bg-blue-50`}>
      <td className="px-6 py-4 text-gray-700">{index + 1}</td>

      <td className="px-6 py-4">
        {item?.image ? (
          <img
            src={item.image}
            alt={item?.title || "Collection Image"}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        )}
      </td>

      <td className="px-6 py-4 text-gray-700">{item?.title || "Unnamed Collection"}</td>

      <td className="px-6 py-4 flex gap-2">
        <button
          onClick={handleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
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

