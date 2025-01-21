import { db } from "@/lib/auth/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadCloudinary";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    //firebase storage


//function for creating new Admin
export const createNewAdmin = async (data, image) => {
    
    if (!image) throw new Error("Avatar is required.");
    if (!data?.name) throw new Error("Name is required.");
    if (!data?.email) throw new Error("e-mail is required.");
    // if (!data?.slug) throw new Error("Category slug is required.");

    //for generating new random id
    const newId = doc(collection(db, "admins")).id;

    const imageUrl = await uploadToCloudinary(image);

    await setDoc(doc(db, `admins/${newId}`), {
        ...data,
        image: imageUrl,
        id: newId,
        timestampCreate: Timestamp.now(),
    });

    return { success: true, id: newId };
};


//function for deleting category
export const deleteAdmin = async ({id}) => {
   if(!id){
    throw new Error("Admin id is required.");
   }
   //delete the category delete doc comes from firebase
   await deleteDoc(doc(db, `categories/${id}`));
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
    
    const id = data.id;

    let imageUrl = data?.image;
    if(image){
        const imageRef = ref(Storage, `admins/${id}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, `admins/${id}`), {
        ...data,
        imageUrl,
        timestampUpdate: Timestamp.now(),
    });
}

