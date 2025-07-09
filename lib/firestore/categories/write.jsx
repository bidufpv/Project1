import { db } from "@/lib/auth/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";


//function for creating new category
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
        timestampCreate: Timestamp.now().toDate().toISOString(),
    });

    return { success: true, id: newId };
};


//function for deleting category
export const deleteCategory = async ({id}) => {
   if(!id){
    throw new Error("Category id is required.");
   }
   //delete the category delete doc comes from firebase
   await deleteDoc(doc(db, `categories/${id}`));
}   


//function for updating category
export const updateCategory = async (data, image) => {
    if(!data?.name){
        throw new Error("Category name is required.");
    }
    if(!data?.slug){
        throw new Error("Category slug is required.");
    }
    if(!data?.id){
        throw new Error("Category id is required.");
    }
    
    const id = data.id;

    let imageUrl = data?.image;
    if (image) {
        // Upload the new image to Cloudinary
        imageUrl = await uploadToCloudinary(image);
    }

    await updateDoc(doc(db, `categories/${id}`), {
        ...data,
        imageUrl,
        timestampUpdate: Timestamp.now().toDate().toISOString(),
    });
}

