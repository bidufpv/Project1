"use client";

import Slider from "react-slick";

export default function Brands({ brands }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!brands?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-white">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        Shop by Brand
      </h2>
      <Slider {...settings}>
        {(brands?.length <= 2 ? [...brands, ...brands, ...brands] : brands)?.map(
          (brand, index) => (
            <div key={index} className="px-3">
              <div className="flex flex-col gap-3 items-center justify-center bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm hover:scale-105 transition-transform duration-300">
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border border-blue-300 bg-white">
                  <img
                    className="h-full w-full object-cover "
                    src={brand?.image}
                    alt={brand?.name}
                  />
                </div>
                <h3 className="text-sm md:text-base font-medium text-blue-800 text-center">
                  {brand?.name}
                </h3>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
}
