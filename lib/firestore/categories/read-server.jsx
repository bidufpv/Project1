// import { db } from "@/lib/auth/firebase";
// import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

// export const getCategory = async ({id}) => {
//     const data = await getDoc(doc(db, `categories/${id}`)); 
//     if(data.exists()){
//         return {id: data.id, ...data.data()};
//     } else{
//         return null;
//     }
// };

// export const getCategories = async () => {
//   // Create a query for products where isFeatured == true
//   const categoriesQuery = query(
//     collection(db, "categories") // Reference to the "categories" collection
//   );

//   // Execute the query and get matching documents
//   const querySnapshot = await getDocs(categoriesQuery);

//   // Map each document to a category object with its ID and data
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };

import { db } from "@/lib/auth/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

// Utility to safely convert Firestore timestamps
const convertTimestamps = (data) => {
  const safeDate = (timestamp) => {
    return timestamp && typeof timestamp.toDate === "function"
      ? timestamp.toDate().toISOString()
      : null;
  };

  return {
    ...data,
    timestampCreate: safeDate(data.timestampCreate),
    timestampUpdate: safeDate(data.timestampUpdate),
  };
};

export const getCategory = async ({ id }) => {
  const data = await getDoc(doc(db, `categories/${id}`));
  if (data.exists()) {
    return {
      id: data.id,
      ...convertTimestamps(data.data()),
    };
  } else {
    return null;
  }
};

export const getCategories = async () => {
  const categoriesQuery = query(collection(db, "categories"));
  const querySnapshot = await getDocs(categoriesQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  }));
};
