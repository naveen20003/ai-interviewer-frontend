"use client"

import { Button } from "./ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const profileSchema = z.object({
  name: z.string()
  .min(1, "Name is required"),
  email: z.email("Invalid email"),
  avatar: z
    .instanceof(File)
    .nullable()
    .optional(),
});


function ProfileDialog({setUser}) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const form = useForm({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: "",
        email: "",
        avatar: null,
    }});


  useEffect(() => {
    const fetchProfile = async() => {
      try {
        const profileData = await api.get("/users/profile")
        // console.log("profile", profileData.data);
        setUser(profileData.data);
        setData(profileData.data);
        // console.log(profileData.data);
        
        form.reset({
          name: profileData.data.name,
          email: profileData.data.email
        });
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, [form])
  

    const onSubmit = async (data) => {
      try {
        // console.log("FORM DATA:", data);
        // console.log("AVATAR:", data.avatar);

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);

        if (data.avatar instanceof File) {
          formData.append("avatar", data.avatar);
        }

        // console.log("FormData:");

        // for (const [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
         
        const res = await api.put("/users/profile", formData);
        setData(res.data.data);
        setUser(res.data.data);
        // console.log(res.data.data);
        router.push("/dashboard");                 
      } catch (error) {
        console.error(error);
      }
    }

    const handleDeleteUser = async(id) => {
        try {
          await api.delete("users/delete");
          router.push("/login")
        } catch (error) {
          console.error(error);
        };
    };

    
    
  return (
    <DialogContent className="sm:max-w-sm">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>

          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Avatar className="size-20">
                <AvatarImage
                  src={data?.avatar}
                  alt={data?.name}
                />
                <AvatarFallback>
                  {data?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <Controller
                name="avatar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="avatar">
                      Profile Image
                    </FieldLabel>

                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;

                        // console.log("SELECTED FILE:", file);

                        field.onChange(file);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
          <Field>
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
          </Field>

          <Field>
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
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline">
                Cancel
              </Button>
            }
          />

          <Button type="submit">
            Save changes
          </Button>
          <Button variant="destructive" onClick={handleDeleteUser}>
             Delete Your Account!
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default ProfileDialog;