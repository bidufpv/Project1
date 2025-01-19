import { db } from "@/lib/auth/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getBrand = async ({id}) => {
    const data = await getDoc(doc(db, `brands/${id}`)); 
    if(data.exists()){
        return {id: data.id, ...data.data()};
    } else{
        return null;
    }
};