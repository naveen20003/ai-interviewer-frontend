import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import  axios  from "axios";
import { toast, Toaster  } from "@/components/ui/toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import api from "@/lib/api";
import { useState } from "react";
import CheckEmail from "./checkmail";
import { useRouter } from "next/navigation";

const signupschema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
  .email("Invalid email")
  .min(1, "Email is required"),
  password: z.string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters"),
});

export function SignupForm({
  className,
  ...props
}) {
  // const [registeredEmail, setRegisteredEmail] = useState(null);
  const router = useRouter();
  const form = useForm({
      resolver: zodResolver(signupschema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
    }})
  
      const onSubmit = async (data) => {
      // console.log("Form Submitted Successfully:", data);
      try {
        const res = await api.post("/users/register",data);
        // console.log(res.data);
        router.push("/login");
        // setRegisteredEmail(data.email);
        toast.add({
            type: "success",
            description: "Account Has Been Created Successfully !",
        });  
      } catch (error) {
        if (error.response && error.response.data) {
           toast.add({
            type: "error",
            description: error.response.data.message,
            priority: "high",
          })
        } else {
         console.error(error);
        }
      }
    };

    // if (registeredEmail) {
    //     return (
    //     <CheckEmail  email={registeredEmail} />
    //   );
    // }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription className="text-card-foreground">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          className="bg-input"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
              <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          className="bg-input"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
              <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          className="bg-input"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center text-card-foreground">
                  Already have an account? <a href="login" className="hover:bg-accent hover:text-accent-foreground">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-card-foreground">
        By clicking continue, you agree to our <a href="#" className="hover:bg-accent hover:text-accent-foreground">Terms of Service</a>{" "}
        and <a href="#" className="hover:bg-accent hover:text-accent-foreground">Privacy Policy</a>.
      </FieldDescription>
      <div>
         <Toaster/> 
      </div>
    </div>
  );
}
