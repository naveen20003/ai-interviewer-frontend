import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) {
    redirect("/login");
  }

  return children;
}