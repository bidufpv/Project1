"use client"
import Slider from "react-slick";
import { Heart } from "lucide-react";

export default function Productslider({featuredProducts}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
     {featuredProducts?.map((product)=>{
        return(
            <div key={product.id}>
            <div className="flex gap-4 bg-gray-100 p-10 md:p-20" key={product.id}>
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-4xl font-serif">{product?.title}</h1>
                <h1 className="text-sm text-gray-500 max-w-96 line-clamp-2">{product?.description.replace(/<[^>]+>/g, '')}</h1>
                <div className="flex gap-4">
                    <button className="px-3 py-3 rounded-lg bg-blue-600 text-white font-normal">
                        Add to Cart
                        </button>

                    <button className="px-3 py-3 rounded-lg bg-blue-600 text-white font-normal">
                        Add to Wishlist <Heart className="inline h-4 w-4" />
                        
                        </button>
                </div>
              </div>
              <div>
                <img className="h-[15rem] w-full" src={product?.featureImageURL} alt="" />
              </div>
            </div>
            </div>
        )
     })}
    </Slider>
  );
}