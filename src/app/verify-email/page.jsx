"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import CheckEmail from "@/components/checkmail";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await api.get(
          `/users/verify-email?token=${encodeURIComponent(token)}`
        );

        setStatus("success");
        setMessage(response.data.message);

      } catch (error) {
        console.log("VERIFY ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);

        setStatus("error");

        setMessage(
          error.response?.data?.message ||
          error.message ||
          "Unable to verify email."
        );
      }
    };

    verifyEmail();

  }, [token]);


  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold">
            Verifying your email...
          </h1>

          <p className="text-muted-foreground">
            Please wait.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Email Verified 🎉
          </h1>

          <p className="mt-2 text-muted-foreground">
            {message}
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
          >
            Continue to Login
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">

        <h1 className="text-3xl font-bold">
          Verification Failed
        </h1>

        <p className="mt-2 text-muted-foreground">
          {message}
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg border px-5 py-3"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}