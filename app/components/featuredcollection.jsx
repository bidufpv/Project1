"use client"
import Slider from "react-slick";
import { Heart } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function Featuredcollection({featuredcollections}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  return (
    <div className="flex flex-col gap-3 w-screen overflow-hidden p-14">
      <div>
        <h1 className="text-xl font-semibold flex flex-col p-4 px-4">Shop By Collection</h1>
      </div>
      <Slider {...settings}>
     {featuredcollections?.map((collection)=>{
        return(
            <div className="px-5  over" key={collection.id}>
            <div className="flex gap-4 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-10 md:px-20 md:py-15
            rounded-xl" key={collection.id}>
              <div className="flex-1 flex flex-col gap-8 ">
                <h1 className="text-xl font-serif">{collection?.title}</h1>
                <h1 className="text-sm text-gray-500 max-w-96 line-clamp-2">{collection?.subtitle}</h1>
                <div className="flex gap-8">
                    <Button className="px-2 py-1 rounded-xl bg-blue-600 text-white font-normal">
                        SHOP NOW
                        </Button>
                </div>
              </div>
              <div>
                <img className="h-[10rem] w-[15rem] object-cover rounded-xl" src={collection?.featureImageURL} alt="" />
              </div>
            </div>
            </div>
        )
     })}
    </Slider>
    </div>
  );
}