"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";

export default function BasicDetails({ data, handleData }) {
  const { data: brand } = useBrands();
  const { data: categories } = useCategories();

  return (
    <section className="flex flex-col gap-5 bg-white rounded-xl p-5 border">
      <h1 className="font-semibold">Basic Details</h1>

      {/* Product Name */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-slate-700 text-xs" htmlFor="Product-Title">
          Product Name
          <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          id="product-title"
          name="Product-Title"
          value={data?.title ?? ""}
          onChange={(e) => {
            handleData("title", e.target.value);
          }}
          required
          className="border px-3 py-2 rounded-lg w-full outline-none "
        />
      </div>

      {/* Product Description
            <div className="flex flex-col gap-1 w-full ">
                <label className="text-slate-700 text-xs" htmlFor="Product-description">
                    Description 
                    <span className="text-red-600">*</span>
                </label>
                <input type="text" placeholder="Enter description"
                id="product-description" name="Product-description"

                value={data?.description ?? ""}
                onChange={(e)=>{
                    handleData("description", e.target.value)
                }}
                required
                className="border px-3 py-2 rounded-lg w-full outline-none " />
            </div> */}

      {/* Product Price */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-slate-700 text-xs" htmlFor="Product-price">
          Price
          <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter price"
          id="product-price"
          name="Product-price"
          value={data?.price ?? ""}
          onChange={(e) => {
            handleData("price", e.target.valueAsNumber);
          }}
          required
          className="border px-3 py-2 rounded-lg w-full outline-none "
        />
      </div>

      {/* Product Sale Price */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-slate-700 text-xs" htmlFor="Product-saleprice">
          Sale Price
          <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Sale Price"
          id="product-saleprice"
          name="Product-saleprice"
          value={data?.saleprice ?? ""}
          onChange={(e) => {
            handleData("saleprice", e.target.valueAsNumber); // ✅ Now correctly updates saleprice
          }}
          required
          className="border px-3 py-2 rounded-lg w-full outline-none "
        />
      </div>

      {/* Product Stock */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-slate-700 text-xs" htmlFor="Product-stock">
          Stock
          <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Stock"
          id="product-stock"
          name="Product-stock"
          value={data?.stock ?? ""}
          onChange={(e) => {
            handleData("stock", e.target.valueAsNumber);
          }}
          required
          className="border px-3 py-2 rounded-lg w-full outline-none "
        />
      </div>

      {/* Product Brand */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-slate-700 text-xs" htmlFor="product-brand">
          Brand
          <span className="text-red-600">*</span>
        </label>
        <select
          type="text"
          id="product-brand"
          name="product-brand"
          value={data?.brandId ?? ""}
          onChange={(e) => {
            handleData("brandId", e.target.value);
          }}
          required
          className="border px-3 py-2 rounded-lg w-full outline-none text-xs text-slate-700"
        >
          <option value="">Select Brand</option>
          {brand?.map((item) => (
            <option value={item?.id} key={item?.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Categories */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-slate-700 text-xs" htmlFor="product-categories">
          Categories
          <span className="text-red-600">*</span>
        </label>
        <select
          type="text"
          id="product-categories"
          name="product-categories"
          value={data?.categoriesId ?? ""}
          onChange={(e) => {
            handleData("categoriesId", e.target.value);
          }}
          required
          className="border px-3 py-2 rounded-lg w-full outline-none text-xs text-slate-700"
        >
          <option value="">Select the Category</option>
          {categories?.map((item) => (
            <option value={item?.id} key={item?.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
