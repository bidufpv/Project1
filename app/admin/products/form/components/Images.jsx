export default function Images({
    data = {},
    setFeaturedImage,
    featuredImage,
    imageList = [],
    setImageList,
  }) {
    // Log the values of data, featuredImage, and imageList
    console.log("data:", data);
    console.log("featuredImage:", featuredImage);
    console.log("imageList:", imageList);
  
    // Normalize the data.imageList to ensure it's always an array
    const normalizedImageList = Array.isArray(data?.imageList) ? data.imageList : [];
  
    return (
      <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
        <h1 className="font-semibold">Images</h1>
  
        {/* Featured Image Upload */}
        <div className="flex flex-col gap-1">
          {data?.featuredImageURL && !featuredImage && (
            <div className="flex justify-center">
              <img
                className="h-20 object-cover rounded-lg"
                src={data?.featuredImageURL}
                alt="Featured"
              />
            </div>
          )}
          {featuredImage && typeof featuredImage === 'string' && (
            <div className="flex justify-center">
              <img
                className="h-20 object-cover rounded-lg"
                src={featuredImage}
                alt="Selected Featured"
              />
            </div>
          )}
          {featuredImage && typeof featuredImage !== 'string' && (
            <div className="flex justify-center">
              <img
                className="h-20 object-cover rounded-lg"
                src={URL.createObjectURL(featuredImage)}
                alt="Selected Featured"
              />
            </div>
          )}
          <label className="text-gray-500 text-xs" htmlFor="product-feature-image">
            Feature Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="product-feature-image"
            name="product-feature-image"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setFeaturedImage(e.target.files[0]);
              }
            }}
            className="border px-4 py-2 rounded-lg w-full outline-none"
          />
        </div>
  
        {/* Multiple Images Upload */}
        <div className="flex flex-col gap-1">
          {imageList?.length === 0 && normalizedImageList.length !== 0 && (
            <div className="flex flex-wrap gap-3">
              {normalizedImageList.map((item, index) => (
                <img
                  key={`existing-image-${index}`}
                  className="w-20 object-cover rounded-lg"
                  src={item}
                  alt={`Existing ${index}`}
                />
              ))}
            </div>
          )}

          
         {imageList?.length > 0 && (
  <div className="flex flex-wrap gap-3">
    {imageList.map((item, index) => {
      const src = typeof item === "string" ? item : URL.createObjectURL(item);
      return (
        <img
          key={`new-image-${index}`}
          className="w-20 object-cover rounded-lg"
          src={src}
          alt={`Selected ${index}`}
        />
      );
    })}
  </div>
)}

          <label className="text-gray-500 text-xs" htmlFor="product-images">
            Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="product-images"
            name="product-images"
            multiple
            accept="image/*"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);
              console.log(newFiles); // Log the selected files
              setImageList(newFiles);
            }}
            className="border px-4 py-2 rounded-lg w-full outline-none"
          />
        </div>
      </section>
    );
  }
  