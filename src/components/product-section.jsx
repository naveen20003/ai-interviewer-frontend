"use client"

import { Bot, FileText } from "lucide-react"; 
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
function ProductSection() {
    const router = useRouter();
  return (
    <div className="w-full bg-background text-foreground border border-border py-12 sm:py-16 md:py-20 px-4 sm:px-6">
  <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 md:mb-16">
    Products
  </h1>

  <div className="w-full max-w-6xl mx-auto">
    
    {/* Products */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">

      {/* AI Interviewer */}
      <div className="w-full md:pr-10 md:border-r border-border">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 md:mb-10 flex gap-3 items-center">
          <Bot className="size-5 sm:size-6 md:size-7 shrink-0" />
          AI Interviewer
        </h2>

        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            Practice realistic AI-powered interviews.
          </h3>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Improve your interview skills with realistic questions,
            follow-ups, and AI-powered feedback.
          </p>
        </div>
      </div>

      {/* Resume Analyzer */}
      <div className="w-full md:pl-10">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 md:mb-10 flex gap-3 items-center">
          <FileText className="size-5 sm:size-6 md:size-7 shrink-0" />
          Resume Analyzer
        </h2>

        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            Analyze your resume and discover improvement areas.
          </h3>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Get useful insights to improve your resume and make it
            stronger for your target roles.
          </p>
        </div>
      </div>

    </div>

    {/* Try Now Button */}
    <div className="mt-10 md:mt-14 flex justify-center">
      <Button
        size="lg"
        className="w-full sm:w-auto px-8"
        onClick={() => router.push("/signup")}
      >
        Try Now
      </Button>
    </div>

  </div>
</div>
  )
}

export default ProductSection;