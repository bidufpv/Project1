import { db } from "@/lib/auth/firebase"; 
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";



/**
 * Fetch a single product by its ID from the Firestore "products" collection.
 * 
 * @param {Object} param0 - An object containing the product ID.
 * @param {string} param0.id - The ID of the product to fetch.
 * @returns {Promise<Object|null>} - Returns the product object with ID, or null if not found.
 */

export const getProduct = async ({ id }) => {
  // Get a reference to the document and fetch it
  const data = await getDoc(doc(db, `products/${id}`));

  // If document exists, return its data along with its ID
  if (data.exists()) {
    return { id: data.id, ...data.data() };
  } else {
    // Return null if the product doesn't exist
    return null;
  }
};



/**
 * Fetch all products that are marked as "featured" from Firestore.
 * 
 * @returns {Promise<Array>} - An array of featured product objects.
 */

export const getFeaturedProducts = async () => {
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


/**
 * Fetch all products from Firestore, ordered by creation timestamp.
 * 
 * @returns {Promise<Array>} - An array of product objects.
 */
export const getAllProducts = async () => {
  const productsQuery = query(collection(db, "products"), orderBy("timestampCreate", "desc"));
  const querySnapshot = await getDocs(productsQuery);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
     
    };
  });
};
