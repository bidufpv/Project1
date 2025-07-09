"use client"
import Slider from "react-slick";
import { Heart } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function Productslider({featuredProducts}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-screen overflow-hidden">
      <Slider {...settings}>
     {featuredProducts?.map((product)=>{
        return(
            <div key={product.id}>
            <div className="flex gap-4 bg-gray-100 p-10 md:px-24 md:py-20" key={product.id}>
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-slate-600">NEW PRRODUCTS</h2>
                <h1 className="text-4xl font-serif">{product?.title}</h1>
                <h1 className="text-sm text-gray-500 max-w-96 line-clamp-2">{product?.description.replace(/<[^>]+>/g, '')}</h1>
                <div className="flex gap-4">
                    <Button className="px-2 py-1 rounded-xl bg-blue-600 text-white font-normal">
                        Buy Now
                        </Button>

                    <Button className="px-2 py-1 rounded-xl border-blue-600 border-2
                     text-blue-700 font-normal">
                        Add to Cart 
                        </Button>

                    <Button className="px-1 py-1 rounded-lg ">
                        <Heart className="text-red-600 w-7 h-7" />
                        </Button>


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
    </div>
  );
}