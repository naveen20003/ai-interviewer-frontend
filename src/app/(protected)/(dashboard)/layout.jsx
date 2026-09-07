"use client"

import SidebarlayoutInset from "@/components/sidebarlayout-inset";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function sidebarLayout({ children }) {    
    const { accessToken, loading } = useAuth();
    const router = useRouter();
   useEffect(() => {
             if (loading) return;
             if (!accessToken) {
               router.push("/login");
               return;
             }
         }, [loading, accessToken, router]);
   
         if (loading) {
           return <div className="min-h-screen w-full flex justify-center items-center"><Spinner className="size-10"/></div>;
         }
   
         if (!accessToken) {
           return null;
         }
    
    return(
        <div>
            <SidebarlayoutInset children={children}/>
        </div>
    )
}