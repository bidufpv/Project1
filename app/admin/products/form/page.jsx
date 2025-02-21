"use client";
import { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import RTE from "./components/RTE";

export default function Page(){

    const [data, setData] = useState({});
    const [featuredImage, setFeaturedImage] = useState(null);
    const [ImageList, setImageList] = useState([]);

    const handleData = (key, value)=>{
        setData((prevData)=>{
            return {
                ...(prevData?? {}),
                [key]: value,
            }
        })
    }


    return (
        <main className="p-6 gap-4 flex flex-col">
                <h1 className=" font-semibold">Create new Products</h1>

                <div className="flex flex-col md:flex-row gap-10 justify-center w-full">
                <div className="w-full md:w-1/3">
                    <BasicDetails data={data} handleData={handleData} />
                </div>

                <div className="flex flex-col gap-4 w-full md:w-2/3">
                    <Images data={data} 
                    featuredImage={featuredImage} 
                    setFeaturedImage={setFeaturedImage}
                    ImageList={ImageList}
                    setImageList={setImageList}
                     />


                    <RTE data={data} handleData={handleData} />
                    </div>

                </div>

                <button className="text-sm w-20 hover:bg-blue-500 bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Create
                </button>


           
        </main>
    )
}