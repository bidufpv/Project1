"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Listview() {
  const [pageLimit, setPageLimit] = useState(3);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);

  const {
    data: products = [],
    error,
    isLoading,
    lastSnapDoc,
  } = useProducts({
    pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });

  const handleNextPage = () => {
    setLastSnapDocList((prev) => [...prev, lastSnapDoc]);
  };

  const handlePrePage = () => {
    setLastSnapDocList((prev) => {
      const updated = [...prev];
      updated.pop();
      return updated;
    });
  };

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

  if (!products || products.length === 0) {
    return <div className="text-gray-500 italic">No Products found.</div>;
  }

  return (
    <div className="bg-white flex flex-col gap-5 flex-1 rounded-xl px-5 py-5 shadow-lg h-full overflow-auto w-full">
      <h1 className="font-semibold text-lg pb-3">Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-blue-50 text-blue-600">
            <tr>
              <th className="px-6 py-3">SN</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Orders</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <Row
                key={item.id}
                item={item}
                index={index + lastSnapDocList.length * pageLimit}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm py-3">
        <button
          disabled={isLoading || lastSnapDocList.length === 0}
          onClick={handlePrePage}
          className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="px-4 py-2 border rounded-md text-sm"
        >
          <option value="3">3 Items</option>
          <option value="5">5 Items</option>
          <option value="10">10 Items</option>
          <option value="20">20 Items</option>
          <option value="100">100 Items</option>
        </select>

        <button
          disabled={isLoading || products.length === 0}
          onClick={handleNextPage}
          className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setIsDeleting(true);
    try {
      await deleteProduct({ id: item?.id });
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/products/form?id=${item?.id}`);
  };

  const price = Number(item?.price) || 0;
  const salePrice = Number(item?.saleprice) || price;
  const stock = Number(item?.stock) || 0;
  const orders = Number(item?.orders) || 0;

  return (
    <tr
      className={`transition-colors ${
        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
      } hover:bg-blue-50`}
    >
      <td className="px-6 py-4 text-gray-700 text-center">{index + 1}</td>
      <td className="px-6 py-4">
        {item?.featureImageURL ? (
          <img
            src={item.featureImageURL}
            alt={item?.title || "Product Image"}
            className="w-12 h-12 object-cover rounded-md mx-auto"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        )}
      </td>
      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
        {item?.title || "Unnamed Product"}{" "}
       {/* {item?.isFeatured && (
        <span className="bg-gradient-to-tr from-blue-500 to-indigo-500 text-white">
          Featured
        </span>
       )} */}

{item?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}

      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        {salePrice < price && (
          <span className="text-xs text-gray-500 line-through mr-1">
            ₹{price.toFixed(2)}
          </span>
        )}
        ₹{salePrice.toFixed(2)}
      </td>
      <td className="px-6 py-4 text-gray-700">{stock}</td>
      <td className="px-6 py-4 text-gray-700">{orders}</td>
      <td className="px-6 py-4 text-gray-700">
        {stock - orders > 0 ? (
          <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-md">
            Available
          </span>
        ) : (
          <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-md">
            Out of Stock
          </span>
        )}
      </td>
      <td className="px-6 py-4 flex gap-2 justify-center">
        <button
          onClick={handleUpdate}
          disabled={isDeleting}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-3 py-1 rounded text-xs ${
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
