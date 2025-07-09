import { db } from "@/lib/auth/firebase";
import { doc, getDoc,collection, getDocs, query, where } from "firebase/firestore";

export const getCollections = async ({id}) => {
    const data = await getDoc(doc(db, `collection/${id}`)); 
    if(data.exists()){
        return {id: data.id, ...data.data()};
    } else{
        return null;
    }
};

export const getfeaturedcollection = async () => {
  // Create a query for products where isFeatured == true
  const featuredQuery = query(
    collection(db, "products"), // Reference to the "products" collection
    where("isFeatured", "==", true) // Filter condition
  );

  // Execute the query and get matching documents
  const querySnapshot = await getDocs(featuredQuery);

  // Map each document to a product object with its ID and data
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
