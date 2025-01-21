import { db } from "@/lib/auth/firebase";
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";


//function for creating new Admin
export const createNewAdmin = async (data, image) => {
    
    if (!image) throw new Error("Avatar is required.");
    if (!data?.name) throw new Error("Name is required.");
    if (!data?.email) throw new Error("e-mail is required.");
    // if (!data?.slug) throw new Error("Category slug is required.");

    //for generating new random id
    const newId = data?.email;

    const imageUrl = await uploadToCloudinary(image);

    await setDoc(doc(db, `admins/${newId}`), {
        ...data,
        image: imageUrl,
        id: newId,
        timestampCreate: Timestamp.now(),
    });

    return { success: true, id: newId };
};


//function for deleting Admin
export const deleteAdmin = async ({id}) => {
   if(!id){
    throw new Error("Admin id is required.");
   }
   //delete the admin delete doc comes from firebase
   await deleteDoc(doc(db, `admins/${id}`));
}   


//function for updating Admin
export const updateAdmin = async (data, image) => {
    if(!data?.name){
        throw new Error("Admin name is required.");
    }
    // if(!data?.slug){
    //     throw new Error("Admin slug is required.");
    // }
    if(!data?.id){
        throw new Error("Admin id is required.");
    }
    if(!data?.email){
        throw new Error("e-mail id is required.");
    }
    
    const id = data.id;

    // Update the image if a new one is provided
    let imageUrl = data?.image;

 
    if (image) {
        // Upload the new image to Cloudinary
        imageUrl = await uploadToCloudinary(image);
    }

    // If the ID (email) hasn't changed, update the existing document
    if (id === data?.email) {
        await updateDoc(doc(db, `admins/${id}`), {
            ...data,
            image: imageUrl,
            timestampUpdate: Timestamp.now(),
        });
    } else {
        // If the ID (email) has changed, delete the old document and create a new one
        const newId = data?.email;

        await deleteDoc(doc(db, `admins/${id}`)); // Delete the old document

        await setDoc(doc(db, `admins/${newId}`), {
            ...data,
            id: newId,
            image: imageUrl,
            timestampUpdate: Timestamp.now(),
        });
    }
};