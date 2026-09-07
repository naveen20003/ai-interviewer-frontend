"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.replace("/login");
    }
  }, [loading, accessToken, router]);

  // Don't render protected content while checking authentication
  if (loading) {
    return null;
  }

  // Prevent protected content from rendering when unauthenticated
  if (!accessToken) {
    return null;
  }

  return children;
}