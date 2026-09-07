"use client"

import ResumeAnalyzer from "@/components/resume-analyzer";

export default function resumeAnalyzer() {

 return (
    <div className="w-full min-h-screen gap-5 flex flex-col items-center justify-start p-5 bg-background text-foreground">
        <div className="w-full flex flex-col items-center justify-center gap-5 text-2xl">
            Let's Check Your Resume Credibility
            <div className="bg-muted foreground-muted-foreground text-xs">Only JPG, JPEG, PNG, and WEBP files are allowed</div>
        </div> 
        <ResumeAnalyzer />
    </div>
 )
}