"use client";
import AuthContextProvider, {useAuth} from "@/contexts/AuthContext";
import AdminLayout from "./components/adminLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";
export default function Layout({children}){


     return( 
     
     <AuthContextProvider>
          <CheckingAdmin>
           {children}
          </CheckingAdmin>
     </AuthContextProvider>

)}


function CheckingAdmin({ children }) {
     // This component checks if the user is authenticated and handles loading or redirection.
   
     const { user, isLoading } = useAuth(); 
     // Extract `user` and `isLoading` state from the authentication context.
     const router = useRouter(); 
     // Get access to the router for navigation.
   
     useEffect(() => {
       // Redirect to the sign-in page if the user is not logged in and the loading is complete.
       if (!user && !isLoading) {
         router.push('/signin'); 
         // Navigate to the `/signin` page if no user is found.
       }
     }, [user, isLoading]); 
     
   
     if (isLoading) {
       // While authentication data is still loading, show a spinner.
       return (
         <div className="h-screen w-screen flex justify-center items-center">
           {/* Full-screen centered loading spinner */}
           <CircularProgress />
         </div>
       );
     }
   
     if (!user) {
       // If the user is not logged in (after loading), display a message.
       return (
         <div className="h-screen w-screen flex justify-center items-center">
           {/* Full-screen centered message */}
           <h1>Please Login First</h1>
         </div>
       );
     }
   
     // If the user is authenticated, render the admin layout and children components.
     return (
       <AdminLayout>
         {children}
       </AdminLayout>
     );
   }