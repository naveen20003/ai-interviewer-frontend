"use client"

import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEndIcon } from "lucide-react"
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function LoginPage() {

  const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
       setMounted(true);
    }, [])
    
    if (!mounted) {
      return <div className="w-24 md:w-32 lg:w-36 h-10" />;
    }

  return (
    <div
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          {/* <div
            className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div> */}
          <Image
            src={resolvedTheme === "dark" ? "/logo-night.png" : "/logo-light.png"}
            alt="AI Interviewer"
            width={120}
            height={40}
            priority
            className="w-16 md:w-20 lg:w-24 h-auto object-contain"
            />
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
