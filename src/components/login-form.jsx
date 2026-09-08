"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import api from "@/lib/api";
import { tokenStore } from "@/lib/tokenStore";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setAccessToken, loginWithAccessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const [isVerified, setIsVerified] = useState(null);
  const [email, setEmail] = useState(null);

  const isOAuthLogin = searchParams.get("oauth") === "true";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /*
   * ----------------------------------------------------
   * NORMAL EMAIL/PASSWORD LOGIN
   * ----------------------------------------------------
   */

  const onSubmit = async (data) => {
    setLoading(true);
    setEmail(data.email);

    try {
      const res = await api.post("/users/login", data);

      const { accessToken } = res.data;

      if (!accessToken) {
        throw new Error("No access token returned");
      }

      tokenStore.setToken(accessToken);
      setAccessToken(accessToken);

      toast.add({
        type: "success",
        description: "Logged In Successfully!",
      });

      router.push("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      setLoading(false);

      toast.error(
        error.response?.data?.message || "Unable to create account"
      );
    }
  };

  /*
   * ----------------------------------------------------
   * GOOGLE OAUTH LOGIN
   * ----------------------------------------------------
   */

  const { data: session, status } = useSession();

  const backendLoginStarted = useRef(false);

  useEffect(() => {
    if (
      !isOAuthLogin ||
      status !== "authenticated" ||
      !session ||
      backendLoginStarted.current
    ) {
      return;
    }

    backendLoginStarted.current = true;
    setOauthLoading(true);

    const loginToBackend = async () => {
      try {
        const response = await api.post(
          "/users/googleauth",
          {
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
            provider: session.provider,
            providerAccountId: session.providerAccountId,
          },
          {
            withCredentials: true,
          }
        );

        const accessToken = response.data?.accessToken;

        if (!accessToken) {
          throw new Error("No access token returned");
        }

        /*
         * If loginWithAccessToken is async in your AuthContext,
         * change this to:
         *
         * const loggedIn = await loginWithAccessToken(accessToken);
         *
         * Otherwise keep it as it is.
         */

        const loggedIn = loginWithAccessToken(accessToken);

        if (!loggedIn) {
          throw new Error("Failed to store access token");
        }

        router.replace("/dashboard");
      } catch (error) {
        console.error(
          "OAuth backend login failed:",
          error.response?.data || error.message
        );

        backendLoginStarted.current = false;
        setOauthLoading(false);

        toast.add({
          type: "error",
          description:
            error.response?.data?.message ||
            "Google login failed",
          priority: "high",
        });
      }
    };

    loginToBackend();
  }, [
    isOAuthLogin,
    status,
    session,
    loginWithAccessToken,
    router,
  ]);

  /*
   * ----------------------------------------------------
   * UI
   * ----------------------------------------------------
   */

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome back
          </CardTitle>

          <CardDescription className="text-card-foreground">
            Login with your Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* GOOGLE LOGIN */}

              <Field>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading || oauthLoading}
                  className="w-full bg-secondary text-secondary-foreground"
                  onClick={() =>
                    signIn("google", {
                      prompt: "select_account",
                      callbackUrl: "/login?oauth=true",
                    })
                  }
                >
                  {oauthLoading ? (
                    <>
                      <Spinner className="size-4" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      {/* Google SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21.35 12.27c0-.78-.07-1.54-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.6Z"
                        />
                        <path
                          fill="currentColor"
                          d="M6.54 13.68A5.86 5.86 0 0 1 6.23 12c0-.58.1-1.15.31-1.68V7.79H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.21l3.24-2.53Z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 6.29c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.29 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53C6.54 8.01 8.69 6.29 12 6.29Z"
                        />
                      </svg>

                      Login with Google
                    </>
                  )}
                </Button>
              </Field>

              <FieldSeparator>
                Or continue with
              </FieldSeparator>

              {/* EMAIL */}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Email
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      className="bg-input"
                      disabled={loading || oauthLoading}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                      className="bg-input"
                      disabled={loading || oauthLoading}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* LOGIN BUTTON */}

              <Field>
                <Button
                  type="submit"
                  disabled={loading || oauthLoading}
                  className="w-full bg-primary"
                >
                  {loading ? (
                    <>
                      <Spinner className="size-4" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <FieldDescription className="text-center text-card-foreground">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="underline"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-card-foreground">
        By clicking continue, you agree to our Terms and
        Privacy.
      </FieldDescription>
    </div>
  );
}