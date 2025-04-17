import { db } from "@/lib/auth/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";


//function for creating new collection
export const createNewCollection = async (data, image) => {
    
    if (!image) throw new Error("Image is required.");
    if (!data?.title) throw new Error("Collection name is required.");
    if (!data?.products || data?.products?.length === 0) throw new Error("Products is required.");

    //for generating new random id
    const newId = doc(collection(db, "collections")).id;
    const imageUrl = await uploadToCloudinary(image);


    //For saving in DB
    await setDoc(doc(db, `collection/${newId}`), {
        ...data,
        image: imageUrl,
        id: newId,
        timestampCreate: Timestamp.now(),
    });

    return { success: true, id: newId };
};



//function for deleting collection
export const deleteCollection = async ({id}) => {
   if(!id){
    throw new Error("Collection id is required.");
   }
   //delete the collection delete doc comes from firebase
   await deleteDoc(doc(db, `collection/${id}`));
}   


//function for updating collection
export const updateCollection = async (data, image) => {
    if(!data?.Title){
        throw new Error("Collection name is required.");
    }
    if(!data?.products || data?.products?.length === 0){
        throw new Error("Products is required.");
        
    }
    if(!data?.id){
        throw new Error("Collection id is required.");
    }
    
    const id = data.id;

    let imageUrl = data?.image;
    if (image) {
        // Upload the new image to Cloudinary
        imageUrl = await uploadToCloudinary(image);
    }

    await updateDoc(doc(db, `collection/${id}`), {
        ...data,
        imageUrl,
        timestampUpdate: Timestamp.now(),
    });
}

