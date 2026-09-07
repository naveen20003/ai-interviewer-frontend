import { useRouter } from "next/navigation"
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function HeroSection() {
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
    <div className="bg-background text-foreground rounded-xl w-full gap-16 py-16 px-8 grid grid-cols-1 md:grid-cols-2 md:place-items-center border border-border">

        {/* Content */}
        <div className="max-w-md p-5 flex flex-col gap-6">

            <span className="w-fit px-3 py-1 rounded-full text-sm font-medium
                            bg-primary/10 text-primary border border-primary/20">
                AI-Powered Career Preparation
            </span>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Your Next Interview Starts Here.
            </h1>

            <p className="text-muted-foreground leading-relaxed">
                Practice realistic interviews with AI, improve your answers, 
                and get the confidence you need to land your next opportunity.
            </p>

            <Button 
             onClick={() => router.push("/signup")}
             className="w-fit px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                Get Start →
            </Button>

        </div>

        {/* Image */}
        <div className="w-full flex justify-center">
            <Image
                src={resolvedTheme === "dark" ? "/dashboard-night.png" : "/dashboard-light.png"}
                alt="AI Interviewer"
                width={1200}
                height={400}
                priority
                className="w-full max-w-xl object-contain"
            />
        </div>

    </div>
  )
}

export default HeroSection