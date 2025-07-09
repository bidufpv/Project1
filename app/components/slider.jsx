"use client";
import Slider from "react-slick";
import { Heart } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function Productslider({ featuredProducts }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {featuredProducts?.map((product) => (
          <div key={product.id}>
            <div className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-tr from-gray-100 to-white p-6 md:p-16 rounded-lg">
              
              {/* Left: Content */}
              <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
                <span className="uppercase text-blue-600 tracking-wide font-semibold text-sm">
                  New Arrival
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-800">
                  {product?.title}
                </h1>
                <p className="text-gray-500 max-w-xl line-clamp-3 mx-auto md:mx-0 text-sm md:text-base">
                  {product?.description?.replace(/<[^>]+>/g, '')}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <Button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                    Buy Now
                  </Button>
                  <Button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100 transition">
                    Add to Cart
                  </Button>
                  <Button isIconOnly className="hover:bg-red-100 rounded-full p-2">
                    <Heart className="text-red-600 w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex-1 flex justify-center">
                <img
                  src={product?.featureImageURL}
                  alt={product?.title}
                  className="w-full max-w-xs md:max-w-md h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
