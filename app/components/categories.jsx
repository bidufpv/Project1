"use client";
import Link from "next/link";
import Slider from "react-slick";

export default function Categories({ categories }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden px-6 py-14">
      {/* Section Heading */}
      <h1 className="text-xl  text-center text-gray-800 mb-10">
        Shop by Category
      </h1>

      {/* Slider */}
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category?.id} className="px-4">
            <Link href={`/collections/${category?.id}`} className="block group">
              <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl transition-transform duration-300 hover:scale-105">
                
                {/* Image */}
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden">
                  <img
                    src={category?.imageUrl}
                    alt={category?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category Name */}
                <h2 className="text-sm md:text-base font-normal text-gray-700 text-center">
                  {category?.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
