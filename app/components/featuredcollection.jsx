"use client";
import Slider from "react-slick";
import { Button } from "@nextui-org/react";



export default function Featuredcollection({ featuredcollections }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full px-6 py-14 overflow-hidden">
      {/* Heading */}
      <h1 className="text-xl font-medium text-center text-gray-800 mb-10">
        Shop by Collection
      </h1>

      {/* Slider */}
      <Slider {...settings}>
        {featuredcollections?.map((collection) => (
          <div key={collection.id} className="px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-tr from-blue-100 to-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
              
              {/* Content */}
              <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
                <h2 className="text-xl font-semibold  text-gray-800">
                  {collection?.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 max-w-sm">
                  {collection?.subtitle}
                </p>
                <div className="mt-2">
                  <Button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    SHOP NOW
                  </Button>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  src={collection?.image}
                  alt={collection?.title}
                  className="w-[200px] h-[140px] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
