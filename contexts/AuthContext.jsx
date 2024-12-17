"use client"
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/lib/auth/firebase";

const AuthContext = createContext();

export default function AuthContextProvider({children}){

      const [user , SetUser] = useState(undefined);

      useEffect(()=>{
         const unsubscribe = onAuthStateChanged(auth, (user)=>{
              if(user){
                SetUser(user);
              }else{
                SetUser(null)
              }
         })
         return ()=> unsubscribe();
      }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoading:user === undefined,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)