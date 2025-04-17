import { db } from "@/lib/auth/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCollections = async ({id}) => {
    const data = await getDoc(doc(db, `collection/${id}`)); 
    if(data.exists()){
        return {id: data.id, ...data.data()};
    } else{
        return null;
    }
};