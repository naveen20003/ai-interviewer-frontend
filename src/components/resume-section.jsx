import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";


function ResumeSection() {
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])
    
    if (!mounted) {
        return <div className="w-24 md:w-32 lg:w-36 h-10" />;
    }    
  return (
    <div className="bg-background text-foreground rounded-xl w-full gap-16 py-16 px-8 grid grid-cols-1 md:grid-cols-2 md:place-items-center border border-border">

    {/* Resume Analyzer Image */}
    <div className="flex justify-center">
      <Image
        src={resolvedTheme === "dark" ? "/resume-score1.png" : "/resume-score1-light.png"}
        alt="AI Interviewer"
        width={1200}
        height={400}
        priority
        className="w-full max-w-xl object-contain"
    />
    </div>

    {/* Resume Analyzer Content */}
    <div className="max-w-md flex flex-col gap-6">
        
        <span className="w-fit px-3 py-1 rounded-full text-sm font-medium 
                         bg-primary/10 text-primary border border-primary/20">
            AI Resume Analyzer
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Build a Resume That Gets Noticed.
        </h1>

        <p className="text-muted-foreground leading-relaxed">
            Analyze your resume with AI and discover what is holding it back.
            Get an instant resume score, identify missing keywords, and receive
            actionable suggestions to make your resume stronger.
        </p>

        <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span>Get an AI-powered resume score</span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span>Find missing skills and important keywords</span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span>Identify strengths and areas for improvement</span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span>Optimize your resume for your target job</span>
            </div>
        </div>

        <Button onClick={() => router.push("/resume")} className="w-fit px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
            Analyze Your Resume →
        </Button>
    </div>
</div>
  )
}

export default ResumeSection;