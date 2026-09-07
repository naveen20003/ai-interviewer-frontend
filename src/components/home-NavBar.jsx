"use client"
import { MenubarRadio } from "./menu-bar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function HomeNavigationBar() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
     setMounted(true);
  }, [])
  
  if (!mounted) {
    return <div className="w-24 md:w-32 lg:w-36 h-10" />;
  };

  return (
    <nav className="w-full bg-background text-foreground p-4 border border-gray-700 dark:border-gray-300 max-w-xs md:max-w-lg rounded-full min-h-[80px] fixed top-5 flex justify-between items-center">
        <div>
           <Image
              src={resolvedTheme === "dark" ? "/logo-night.png" : "/logo-light.png"}
              alt="AI Interviewer"
              width={120}
              height={40}
              priority
              className="w-16 md:w-20 lg:w-24 h-auto object-contain"
            />
        </div>
        <div className="flex md:gap-5 items-center">
            <MenubarRadio />
            <Button className="text-lg" variant="ghost" onClick={() => router.push("/contact")}>Contact</Button>           
            <Button className="text-lg" variant="ghost" onClick={() => router.push("/signup")}>Sign In</Button>           
        </div>
    </nav>
  )
}

export default HomeNavigationBar;