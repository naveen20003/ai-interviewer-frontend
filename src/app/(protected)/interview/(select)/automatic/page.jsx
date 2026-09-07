"use client"

import InputJobData from "@/components/interview-tabs"

export default function AutoInterviewSetup() {
     return(
        <div className="w-full min-h-screen pt-10 flex justify-center bg-background text-foreground overflow-hideen">
          <div className="w-full max-w-sm md:max-w-5xl">
            <InputJobData/>
          </div>
        </div>
        
     )
}