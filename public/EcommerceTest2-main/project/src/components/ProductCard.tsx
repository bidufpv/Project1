import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="text-sm text-blue-600 font-medium">{category}</span>
        <h3 className="text-lg font-semibold mt-1 mb-2">{title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">₹{price.toLocaleString()}</span>
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;