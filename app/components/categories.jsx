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
        breakpoint: 768, // mobile screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // very small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 w-screen overflow-hidden p-10">
      <div>
        <h1 className="text-xl font-semibold flex flex-col px-8">Shop By Category</h1>
      </div>
      <Slider {...settings}>
        {categories?.map((category) => (
          <Link href={'/collections/' + category?.id} className="w-full" key={category?.id}>
          {/* Using Link to wrap the category card for navigation */}

          <div className="px-4" key={category?.id}>
            <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl ">
              <div className="w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden">
                <img
                  src={category?.imageUrl}
                  alt={category?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-lg font-sans text-center">{category?.name}</h1>
              
            </div>
          </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
