export default function Images({
  data,
  setFeaturedImage,
  featuredImage,
  ImageList,
  setImageList,
}) {
  return (
      <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
          <h1 className="font-semibold">Images</h1>

          {/* Featured Image Upload */}
          <div className="flex flex-col gap-1">
              {/* Display the existing featured image if available */}
              {data?.featuredImageURL && !featuredImage && (
                  <div className="flex justify-center">
                      <img
                          className="h-20 object-cover rounded-lg"
                          src={data?.featuredImageURL}
                          alt="Featured"
                      />
                  </div>
              )}


              {/* Display the newly selected featured image */}

              {featuredImage && (
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

              {/* File input for selecting a featured image */}
              <input
                  type="file"
                  id="product-feature-image"
                  name="product-feature-image"
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
              {/* Display existing images if available and no new images are selected */}
              {ImageList?.length === 0 && data?.imageList?.length !== 0 && (
                  <div className="flex flex-wrap gap-3">
                      {data?.imageList?.map((item, index) => (
                          <img
                              key={`existing-image-${index}`} // Unique key
                              className="w-20 object-cover rounded-lg"
                              src={item}
                              alt={`Existing ${index}`}
                          />
                      ))}
                  </div>
              )}



              {/* Display newly selected images */}

              {ImageList?.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                      {ImageList?.map((item, index) => (
                          <img
                              key={`new-image-${index}`} // Unique key
                              className="w-20 object-cover rounded-lg"
                              src={URL.createObjectURL(item)}
                              alt={`Selected ${index}`}
                          />
                      ))}
                  </div>
              )}

              <label className="text-gray-500 text-xs" htmlFor="product-images">
                  Images <span className="text-red-500">*</span>
              </label>


              {/* File input for selecting multiple images */}
              <input
                  type="file"
                  id="product-images"
                  name="product-images"
                  multiple
                  onChange={(e) => {
                      const newFiles = Array.from(e.target.files); // Convert FileList to Array
                      setImageList(newFiles);
                  }}
                  className="border px-4 py-2 rounded-lg w-full outline-none"
              />
          </div>
      </section>
  );
}
