import { db } from "@/lib/auth/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    //firebase storage


//function for creating new category
export const createNewBrand = async (data, image) => {
    
    if (!image) throw new Error("Image is required.");
    if (!data?.name) throw new Error("Category name is required.");
    // if (!data?.slug) throw new Error("Category slug is required.");

    //for generating new random id
    const newId = doc(collection(db, "brands")).id;

    const imageUrl = await uploadToCloudinary(image);

    await setDoc(doc(db, `brands/${newId}`), {
        ...data,
        image: imageUrl,
        id: newId,
        timestampCreate: Timestamp.now(),
    });

    return { success: true, id: newId };
};


//function for deleting category
export const deleteBrand = async ({id}) => {
   if(!id){
    throw new Error("Brand id is required.");
   }
   //delete the category delete doc comes from firebase
   await deleteDoc(doc(db, `categories/${id}`));
}   


//function for updating category
export const updateBrand = async (data, image) => {
    if(!data?.name){
        throw new Error("Brand name is required.");
    }
    // if(!data?.slug){
    //     throw new Error("Category slug is required.");
    // }
    if(!data?.id){
        throw new Error("Brand id is required.");
    }
    
    const id = data.id;

    let imageUrl = data?.image;
    if(image){
        const imageRef = ref(Storage, `brands/${id}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, `brands/${id}`), {
        ...data,
        imageUrl,
        timestampUpdate: Timestamp.now(),
    });
}
