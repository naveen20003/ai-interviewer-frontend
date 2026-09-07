import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function protectedLayout({ children }) {
     const token = (await cookies()).get("refreshToken");
     const OauthToken = (await cookies()).get("next-auth.session-token");
    
     if (!token && !OauthToken) {
        redirect("/login");
     };

     return children;
}