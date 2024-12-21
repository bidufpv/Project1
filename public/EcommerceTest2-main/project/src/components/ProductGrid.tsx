import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    title: "Arduino Uno R3",
    price: 699,
    category: "Development Boards",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 2,
    title: "Raspberry Pi 4 Model B",
    price: 4999,
    category: "Single Board Computers",
    image: "data:image/jpeg;base64,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kW1AdLjr8/aavBcDUqaWphlUHUGLC9x+G8unPeXB1va5HTuOokU3D6qaIrOgWwuoOQMZtsfbvPNxtWVBJxW73s3b01MCwn8jhKdqb1srLXTS72XL0K3xHAWBovfVp1gkdbnVa2LA5sOjdxIWncEgISy7lj6UPfoB8ybS6c5pX8sa7FQckXqEkWBAG3vIXh/BT13Z+IqVailmKUyfKpohPpXTTOprC2dQB6g7yzCVJVYZpG2m0rwWy0T5r57EHwXOAKvlIDxDswFRUytME5qVKhFkK5Ixnoc3lv4Pgg3w02qG99TkkXvfGroOg6Sf5V4ap0lChVCrsqqqoD3CKAAfe0naXCgdJpdGLd2KkFPRlc4PkLXDO5uNtJK2+VpM8HytE2X69TJJUnqWKKWiOpJKyMaUgJ7An2J06IiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIBjqU7yJ4jkqsSQWW++kkX/KTUWnGk1ZgieE5QibLnud5IJQAmaJ0HwLPsRAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAP/2Q=="
  },
  {
    id: 3,
    title: "Robot Kit DIY",
    price: 2499,
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Sensor Pack",
    price: 999,
    category: "Sensors",
    image: "https://images.unsplash.com/photo-1601143752400-c518b2b2e1fd?auto=format&fit=crop&w=800&q=80"
  },
];

const ProductGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;