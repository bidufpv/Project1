"use client";

import Slider from "react-slick";
import { Rating } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CustomerReviews() {
  const list = [
    {
      name: "Penny Albritoon",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      rating: 4.5,
      imageLink:
        "https://res.cloudinary.com/dfzr1sxu6/image/upload/v1744742660/categories/ixfybwgzsqrwxpzwtyec.jpg",
    },
    {
      name: "Oscar Nommanee",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      rating: 5,
      imageLink:
        "https://res.cloudinary.com/dfzr1sxu6/image/upload/v1744742660/categories/ixfybwgzsqrwxpzwtyec.jpg",
    },
    {
      name: "Emma Watson",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      rating: 4.5,
      imageLink:
        "https://res.cloudinary.com/dfzr1sxu6/image/upload/v1744742660/categories/ixfybwgzsqrwxpzwtyec.jpg",
    },
    {
      name: "John Doe",
      message: "Great products! Will recommend to others. bfjhsbdfsdbvjds vjdhbvdsj dncbajhcban sancbauwbd sjhcasjcb sahjcabcjs cbac ah",
      rating: 5,
      imageLink:
        "https://res.cloudinary.com/dfzr1sxu6/image/upload/v1744742660/categories/ixfybwgzsqrwxpzwtyec.jpg",
    },
    {
      name: "Jane Smith",
      message: "Amazing service and fast delivery. hbadkdac kajbanksabjhca kabjahv adkja adkn adnc ",
      rating: 4,
      imageLink:
        "https://res.cloudinary.com/dfzr1sxu6/image/upload/v1744742660/categories/ixfybwgzsqrwxpzwtyec.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-white py-12">
      <div className="w-full max-w-6xl mx-auto px-5">
        <h1 className="text-center font-semibold text-2xl text-blue-700 mb-8">
          What Our Customers Say
        </h1>

        <Slider {...settings}>
          {list.map((item, index) => (
            <div key={index} className="px-3">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-center shadow hover:scale-105 transition-transform duration-300">
                <img
                  src={item?.imageLink}
                  className="h-24 w-24 mx-auto rounded-full border border-blue-200 object-cover mb-3"
                  alt={item?.name}
                />
                <h2 className="text-base font-medium text-blue-900">
                  {item?.name}
                </h2>
                <Rating
                  size="small"
                  name={`customer-rating-${index}`}
                  defaultValue={item?.rating}
                  precision={0.5}
                  readOnly
                />
                <p className="text-sm text-gray-600 mt-2">{item?.message}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
