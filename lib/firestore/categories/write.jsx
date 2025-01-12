import { db } from "@/lib/auth/firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";

export const createNewCategory = async (data, image) => {
    
    if (!image) throw new Error("Image is required.");
    if (!data?.name) throw new Error("Category name is required.");
    if (!data?.slug) throw new Error("Category slug is required.");

    //for generating new random id
    const newId = doc(collection(db, "categories")).id;

    const imageUrl = await uploadToCloudinary(image);

    await setDoc(doc(db, `categories/${newId}`), {
        ...data,
        image: imageUrl,
        id: newId,
        timestampCreate: Timestamp.now(),
    });

    return { success: true, id: newId };
};


