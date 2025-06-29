"use client"; // Ensures the component is run on the client side in Next.js

import { db } from "@/lib/auth/firebase"; // Import your initialized Firestore instance
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore"; // Firestore functions
import useSWRSubscription from "swr/subscription"; // SWR hook for real-time data subscription

/**
 * Custom hook: useProducts
 * Fetches products from Firestore with real-time updates and pagination support
 */
export function useProducts({ pageLimit = 10, lastSnapDoc = null }) {
  // useSWRSubscription helps us set up a subscription to Firestore updates
  const { data, error } = useSWRSubscription(
    // SWR cache key - includes pagination and last document ID to avoid cache mismatch
    ["products", pageLimit, lastSnapDoc?.id || null],

    // Subscription function
    ([path, limitValue, _lastId], { next }) => {
      // Create reference to "products" collection
      const ref = collection(db, path);

      // Base query with limit
      let q = query(ref, limit(limitValue));

      // If there's a lastSnapDoc, apply startAfter() for pagination
      if (lastSnapDoc) {
        q = query(ref, startAfter(lastSnapDoc), limit(limitValue));
      }

      // Start listening to the collection in real-time
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // Map snapshot to array of product objects with ID
          const products = snapshot.docs.map((snap) => ({
            id: snap.id,
            ...snap.data(),
          }));

          // Get the last document for pagination (used in next "load more" call)
          const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

          // Call next to update SWR data
          next(null, {
            list: products,
            lastSnapDoc: lastDoc,
          });
        },
        (err) => next(err, null) // Handle error in subscription
      );

      // Return cleanup function (unsubscribe) when component unmounts
      return () => unsubscribe();
    }
  );


  

  return {
    data: data?.list ?? [], // Array of product objects
    lastSnapDoc: data?.lastSnapDoc ?? null, // Last document snapshot for pagination
    error: error?.message ?? null, // Error message if any
    isLoading: data === undefined && !error, // Loading state
  };
}

/**
 * Fetches a single product by its ID
 * @param {string} id - Product document ID
 */
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id); // Reference to product doc
  const snap = await getDoc(docRef); // Fetch document

  if (!snap.exists()) throw new Error("Product not found"); // Handle missing document

  return { id, ...snap.data() }; // Return product data with ID
};

/**
 * Updates a product in Firestore
 * @param {string} id - Product ID
 * @param {object} data - Contains updated fields, featureImage URL, and imageList array
 */
export const updateProductById = async (id, { data, featureImage, imageList }) => {
  const productRef = doc(db, "products", id); // Reference to the product

  try {
    // Update the document with new values
    await updateDoc(productRef, {
      title: data.title,
      description: data.description,
      price: data.price,
      featureImageURL: featureImage,
      imageList: imageList,
      isFeatured: data.isFeatured,
    });

    console.log("✅ Product updated successfully!");
  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    throw new Error(error.message); // Re-throw error for handling
  }
};


export function useProduct({ productId }) {
  const { data, error } = useSWRSubscription(
    ["products", productId],
    ([path, productId], { next }) => {
      const ref = doc(db, `${path}/${productId}`);

      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.data()),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  };
}