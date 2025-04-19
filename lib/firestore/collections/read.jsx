"use client"; // Ensures the component is client-side in Next.js

import { db } from '@/lib/auth/firebase';
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore"; // Firebase functions for Firestore
import useSWRSubscription from 'swr/subscription'; // SWR's subscription-based hook

//for fetching products
export const fetchPaginatedProducts = async ({ limitCount = 10, startAfterDoc = null }) => {
  try {
    let q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(limitCount));

    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return {
      products,
      lastVisible: snapshot.docs[snapshot.docs.length - 1] ?? null,
      hasMore: snapshot.docs.length === limitCount,
    };
  } catch (err) {
    throw new Error("Failed to fetch paginated products.");
  }
};


export function useCollection() {
  // useSWRSubscription listens to real-time updates using a custom subscription
  const { data, error } = useSWRSubscription(
    ['collection'], // The key for SWR's cache (used for data caching and revalidation)
    
    // Subscription function: executed to set up the real-time listener
    ([path], { next }) => {
      // Create a Firestore collection reference
      const ref = collection(db, path); // `db` is assumed to be the initialized Firestore instance

      // Set up a real-time listener using Firestore's `onSnapshot`
      const unsubscribe = onSnapshot(
        ref, // The collection reference
        (snapshot) => 
          next(
            null, // No error occurred 
            snapshot.docs.length === 0 
              ? [] // If there are no documents, return an empty array
              : snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() })) // Map document snapshots to their data
          ),
        (err) => next(err, null) // If an error occurs, pass it to SWR
      );

      // Return a cleanup function to unsubscribe from Firestore when the hook is unmounted
      return () => unsubscribe();
    }
  );

  

  // Return the data, error, and loading state
  return {
    data, // The real-time collection data
    error:error?.message, // Any error encountered during the subscription
    isLoading: data === undefined || !data && !error, // `isLoading` is true if data is still undefined
  };
}
