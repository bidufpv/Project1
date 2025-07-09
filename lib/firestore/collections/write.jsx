// Description: This file contains functions to create, delete, and update collections in Firestore.
// It uses Firebase Firestore SDK to interact with the database and Cloudinary for image uploads.
import { db } from "@/lib/auth/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";

// Create a new collection
export const createNewCollection = async (data, image) => {
  if (!image) throw new Error("Image is required.");
  if (!data?.title) throw new Error("Collection name is required.");
  if (!data?.products || data.products.length === 0)
    throw new Error("Products are required.");

  const newId = doc(collection(db, "collections")).id;
  const imageUrl = await uploadToCloudinary(image);

  await setDoc(doc(db, `collections/${newId}`), {
    ...data,
    image: imageUrl,
    id: newId,
    timestampCreate: Timestamp.now(),
    isFeatured: true, 

  });

  return { success: true, id: newId };
};

// Delete a collection
export const deleteCollection = async ({ id }) => {
  if (!id) throw new Error("Collection ID is required.");

  await deleteDoc(doc(db, `collections/${id}`));
};

// Update a collection
export const updateCollection = async (data, image) => {
  if (!data?.title) throw new Error("Collection name is required.");
  if (!data?.products || data.products.length === 0)
    throw new Error("Products are required.");
  if (!data?.id) throw new Error("Collection ID is required.");

  const id = data.id;

  let imageUrl = data.image;
  if (image) {
    imageUrl = await uploadToCloudinary(image);
  }

  await updateDoc(doc(db, `collections/${id}`), {
    ...data,
    image: imageUrl,
    timestampUpdate: Timestamp.now(),
  });
};
