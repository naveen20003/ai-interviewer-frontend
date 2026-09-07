"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function CheckEmail({ email }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await api.post(
        "/users/resend-verification",
        {
          email,
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      console.error("RESEND ERROR:", error);
      console.error("RESEND ERROR:", error.data);
      
      setMessage(
        error.response?.data?.message ||
        "Unable to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          Check your email
        </h1>

        <p>
          We sent a verification link to:
        </p>

        <p className="font-medium">
          {email}
        </p>

        <p className="text-sm text-muted-foreground">
          Please check your inbox and click the
          verification link.
        </p>

        <Button
          onClick={resendVerificationEmail}
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Resend verification email"}
        </Button>

        {message && (
          <p className="text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}