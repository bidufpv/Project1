import { db } from "@/lib/auth/firebase";
import { collection, getDoc, getDocs, doc, query, where } from "firebase/firestore";

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

export const getCollections = async ({ id }) => {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return { id: data.id, ...convertTimestamps(data.data()) };
  } else {
    return null;
  }
};

export const getfeaturedcollection = async () => {
  const featuredQuery = query(
    collection(db, "collections"),
    where("isFeatured", "==", true)
  );

  const querySnapshot = await getDocs(featuredQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  }));
};
