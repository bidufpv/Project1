"use client";
import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { ShoppingCart, Heart } from "lucide-react";
import striptags from "striptags";

export default function Products({ products }) {
  return (
    <section className="w-full px-4 md:px-10 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-10">
          Shop by Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const plainText = striptags(product?.description || "");

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4 shadow hover:shadow-md transition duration-300 flex flex-col justify-between">
      <img
        src={product?.featureImageURL}
        alt={product?.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-blue-800 mb-1">{product?.title}</h2>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{plainText}</p>

        <div>
        <Rating size="small" readOnly name="half-rating" defaultValue={2.5} precision={0.5} />
        </div>

      <div className="flex justify-between items-center gap-2 mt-auto">
        {/* Buy Now Button */}
        <Button
          size="sm"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full"
        >
          Buy Now
        </Button>

        {/* Icons Section */}
        <div className="flex gap-2">
          {/* Cart Icon Button */}
          <Button
            isIconOnly
            size="sm"
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>

          {/* Wishlist Heart Icon */}
          <Button
            isIconOnly
            size="sm"
            className="bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-full flex items-center justify-center"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
