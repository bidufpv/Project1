// import { db, storage } from "@/lib/auth/firebase";
// import { collection,doc,setDoc,Timestamp } from "firebase/firestore";
// import {getDownloadURL,ref,uploadBytes} from "firebase/storage";

// export const createNewCategory = async (data, image) => {
//     if (!image) {
//         throw new Error("Data and image are required");
//     }
//     if(!data?.name){
//        throw new Error("Category name is required");
//     }
//     if(!data?.slug){
//        throw new Error("Category slug is required");
//     }

//     //for generating new  random id
//     const newId = doc(collection(db, `ids`)).id;
//     const imageRef = ref(storage, `categories/${newId}`);
//     await uploadBytes(imageRef, image);
//     const imageUrl = await getDownloadURL(imageRef);

//     await setDoc(doc(db, `categories/${newId}`), {
//         ...data,
//         image: imageUrl,
//         id: newId,
//         timestampCreate: Timestamp.now(),
//     });
// }

import { db } from "@/lib/auth/firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary/uloadCloudinary";

export const createNewCategory = async (data, image) => {
    if (!image) throw new Error("Image is required.");
    if (!data?.name) throw new Error("Category name is required.");
    if (!data?.slug) throw new Error("Category slug is required.");

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
