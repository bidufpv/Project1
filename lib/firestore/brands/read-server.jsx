// import { db } from "@/lib/auth/firebase";
// import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

// export const getBrand = async ({id}) => {
//     const data = await getDoc(doc(db, `brands/${id}`)); 
//     if(data.exists()){
//         return {id: data.id, ...data.data()};
//     } else{
//         return null;
//     }
// };

// export const getBrands = async () => {
//   // Create a query for products where isFeatured == true
//   const categoriesQuery = query(
//     collection(db, "brands") // Reference to the "categories" collection
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

// Helper to safely convert timestamps
const convertTimestamps = (data) => {
  return {
    ...data,
    timestampCreate: data.timestampCreate?.toDate().toISOString() || null,
    timestampUpdate: data.timestampUpdate?.toDate().toISOString() || null,
  };
};

export const getBrand = async ({ id }) => {
  const data = await getDoc(doc(db, `brands/${id}`));
  if (data.exists()) {
    return { id: data.id, ...convertTimestamps(data.data()) };
  } else {
    return null;
  }
};

export const getBrands = async () => {
  const categoriesQuery = query(collection(db, "brands"));

  const querySnapshot = await getDocs(categoriesQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  }));
};
