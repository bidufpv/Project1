"use client"; // Ensures the component is client-side in Next.js

import { db } from '@/lib/auth/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore'; // Firebase functions for Firestore
import useSWRSubscription from 'swr/subscription'; // SWR's subscription-based hook

export function useAdmins() {
  // useSWRSubscription listens to real-time updates using a custom subscription
  const { data, error } = useSWRSubscription(
    ['admins'], // The key for SWR's cache (used for data caching and revalidation)
    
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
    data, // The real-time categories data
    error:error?.message, // Any error encountered during the subscription
    isLoading: data === undefined || !data && !error, // `isLoading` is true if data is still undefined
  };
}


export function useAdmin({ email }) {
  const { data, error } = useSWRSubscription(
    ["admins", email],
    ([path, email], { next }) => {
      const ref = doc(db, `admins/${email}`);
      const unsubscribe = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.exists() ? snapshot.data() : null),
        (err) => next(err, null)
      );
      return () => unsubscribe();
    }
  );

  // ✅ Now inside the function
  return {
    data,
    error: error?.message,
    isLoading: data === undefined || (!data && !error),
  };
}
