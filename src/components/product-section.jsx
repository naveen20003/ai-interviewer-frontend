"use client"

import { Bot, FileText } from "lucide-react"; 
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
function ProductSection() {
    const router = useRouter();
  return (
    <div className="w-full bg-background text-foreground min-h-[100px] py-20 border border-border">
        <h1 className="text-4xl font-bold text-center mb-16">
            Products
        </h1>

        <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">

            {/* AI Interviewer */}
            <div className="w-full border-r">
            <h2 className="text-sm font-semibold mb-10 flex gap-3 items-center md:text-2xl">
               <Bot /> AI Interviewer
            </h2>

            <div className="flex flex-col">

                <div>
                    <h3 className="text-xs md:text-xl font-medium">
                        Practice Realistic Ai Powered Interview.
                    </h3>
                </div>

            </div>
            </div>

          
            {/* Resume Analyzer */}
            <div className="w-full">
            <h2 className="text-sm font-semibold mb-10 flex gap-3 items-center md:text-2xl">
              <FileText />  Resume Analyzer
            </h2>

            <div className="flex flex-col">

                <div>
                    <h3 className="text-xs md:text-xl font-medium">
                        Analyze Your Resume And Discover Improvement Areas
                    </h3>
                </div>


            </div>
            </div>
            <div className="col-span-2 mr-10 flex justify-center">
              <Button size="lg" onClick={() => router.push("/signup")}>Try Now</Button>
            </div>
        </div>
      </div>
  )
}

export default ProductSection;