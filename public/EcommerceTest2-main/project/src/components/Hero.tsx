import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-blue-600 h-[500px]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Your One-Stop Shop for Electronics
            </h1>
            <p className="text-lg mb-8">
              Discover the latest in electronics, robotics, and DIY components. Quality products at competitive prices.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
          <div className="mt-8 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
              alt="Electronics"
              className="rounded-lg shadow-xl max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;