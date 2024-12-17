"use client";

import AuthContextProvider from "@/contexts/AuthContext";

export default function layout({children}){
return (
    <AuthContextProvider>{children}</AuthContextProvider>
)
}