"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

const signupschema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .email("Invalid email")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export function SignupForm({
  className,
  ...props
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupschema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await api.post(
        "/users/register",
        data
      );

      toast.add({
        type: "success",
        description: "Account Has Been Created Successfully!",
      });

      router.push("/login");
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      toast.add({
        type: "error",
        description:
          error.response?.data?.message ||
          "Unable to create account",
        priority: "high",
      });

      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <Card className="bg-card text-card-foreground">

        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Create your account
          </CardTitle>

          <CardDescription className="text-card-foreground">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>

              {/* NAME */}

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor={field.name}>
                      Full Name
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="name"
                      className="bg-input"
                      disabled={loading}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* EMAIL */}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                  >
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
                      disabled={loading}
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
                  <Field
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                      className="bg-input"
                      disabled={loading}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* CREATE ACCOUNT */}

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Spinner className="size-4" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <FieldDescription className="text-center text-card-foreground">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign in
                  </a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-card-foreground">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="hover:bg-accent hover:text-accent-foreground"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="hover:bg-accent hover:text-accent-foreground"
        >
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}