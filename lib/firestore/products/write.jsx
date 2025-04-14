import { collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/auth/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary"; // ✅ Use function, not hook

// Function to create a new product
export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) throw new Error("Title is required");
  if (!featureImage) throw new Error("Feature Image is required");

  // ✅ Upload Feature Image to Cloudinary
  const featureImageURL = await uploadToCloudinary(featureImage);

  // ✅ Upload Additional Images to Cloudinary
  let imageURLList = [];
  for (let i = imageList?.length - 1; i >= 0; i--) {
    const imageURL = await uploadToCloudinary(imageList[i]);
    imageURLList.push(imageURL);
  }

  // ✅ Generate new Firestore ID
  const newId = doc(collection(db, `products`)).id;

  // ✅ Store product data in Firestore
  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featureImageURL,
    imageList: imageURLList,
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

// Function to update an existing product
export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) throw new Error("Title is required");
  if (!data?.id) throw new Error("ID is required");

  let featureImageURL = data?.featureImageURL ?? ""; // Keep existing feature image URL

  // ✅ Upload a new feature image if provided
  if (featureImage) {
    featureImageURL = await uploadToCloudinary(featureImage);
  }

  // ✅ Handle additional images:
  let imageURLList = imageList?.length === 0 ? data?.imageList : [];
  for (let i = 0; i < imageList?.length; i++) {
    const imageURL = await uploadToCloudinary(imageList[i]);
    imageURLList.push(imageURL);
  }

  // ✅ Update product data in Firestore
  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    timestampUpdate: Timestamp.now(),
  });
};

// Function to delete a product from Firestore
export const deleteProduct = async ({ id }) => {
  if (!id) throw new Error("ID is required");

  // ✅ Delete the product document from Firestore
  await deleteDoc(doc(db, `products/${id}`));
};

