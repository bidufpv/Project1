// "use client"; // Ensures the component is client-side in Next.js

// import { db } from '@/lib/auth/firebase';
// import { collection, doc, getDoc, limit, onSnapshot, query, updateDoc } from 'firebase/firestore'; // Firebase functions for Firestore
// import useSWRSubscription from 'swr/subscription'; // SWR's subscription-based hook

// export function useProducts({pageLimit, lastSnapDoc}) {
//   // useSWRSubscription listens to real-time updates using a custom subscription
//   const { data, error } = useSWRSubscription(
//     ['products', pageLimit], // The key for SWR's cache (used for data caching and revalidation)
    
//     // Subscription function: executed to set up the real-time listener
//     ([path, pageLimit], { next }) => {
//       // Create a Firestore collection reference
//       const ref = collection(db, path); // `db` is assumed to be the initialized Firestore instance
//       let q = query(ref, limit(pageLimit ?? 10)); // Create a query with the specified page limit

//       if(lastSnapDoc) {
//         // If there's a last document snapshot, use it for pagination
//         q = query(q, limit(pageLimit ?? 10), startAfter(lastSnapDoc));
//       }

//       // Set up a real-time listener using Firestore's `onSnapshot`
//       const unsubscribe = onSnapshot(
//         q,
//         (snapshot) =>
//           next(
//             null,
//             snapshot.docs.length === 0
//               ? []
//               : snapshot.docs.map((snap) => snap.data())
//           ),
//         (err) => next(err, null)
//       );
//       return () => unsubscribe();
//     }
//   );

//   // Return the data, error, and loading state 
//   return {
//     data: data?.list, // The real-time categories data
//     lastSnapDoc: data?.lastSnapDoc, // The last document snapshot for pagination
//     error:error?.message, // Any error encountered during the subscription
//     isLoading: data === undefined || !data && !error, // `isLoading` is true if data is still undefined
//   };
// }

// // function for get product Id
// export const getProductById = async (id) => {
//   const docRef = doc(db, "products", id);
//   const snap = await getDoc(docRef);
//   if (!snap.exists()) throw new Error("Product not found");
//   return { id, ...snap.data() };
// };


// // Update product by ID function
// export const updateProductById = async (id, { data, featureImage, imageList }) => {
//   const productRef = doc(db, "products", id); // Reference to the specific product document in Firestore

//   try {
//     // Update the product document with the new data
//     await updateDoc(productRef, {
//       title: data.title,
//       description: data.description,
//       price: data.price,
//       featureImageURL: featureImage, // Update the featured image URL
//       imageList: imageList, // Update the image list
//       // Add any other fields you want to update here
//     });

//     console.log("Product updated successfully!");
//   } catch (error) {
//     console.error("Error updating product:", error.message);
//     throw new Error(error.message);
//   }
// };



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
    });

    console.log("✅ Product updated successfully!");
  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    throw new Error(error.message); // Re-throw error for handling
  }
};
