
function HowItWorks() {
  return (
    <div className="w-full bg-background text-foreground min-h-[600px] py-20 border border-border">
        <h1 className="text-4xl font-bold text-center mb-16">
            How It Works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto p-5">

            {/* AI Interviewer */}
            <div className="w-full md:border-r">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
                AI Interviewer
            </h2>

            <div className="flex flex-col gap-8">

                <div>
                <h3 className="text-xl font-medium">
                    01 Choose Your Interview
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Select your role, experience level, interview type,
                    and preferred interview mode.
                </p>
                </div>

                <div>
                <h3 className="text-xl font-medium">
                    02 Start the Interview
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Have a realistic conversation with your AI interviewer
                    through voice or text.
                </p>
                </div>

                <div>
                <h3 className="text-xl font-medium">
                    03 Answer & Adapt
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Answer questions while the AI evaluates your responses
                    and asks relevant follow-up questions.
                </p>
                </div>

                <div>
                <h3 className="text-xl font-medium">
                    04 Review Your Performance
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Receive scores, feedback, strengths, and areas
                    that need improvement.
                </p>
                </div>

            </div>
            </div>

          
            {/* Resume Analyzer */}
            <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
                Resume Analyzer
            </h2>

            <div className="flex flex-col gap-8">

                <div>
                <h3 className="text-xl font-medium">
                    01 Upload Your Resume
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Upload your resume in a supported format and let
                    the AI analyze your profile.
                </p>
                </div>

                <div>
                <h3 className="text-xl font-medium">
                    02 AI Analyzes Your Resume
                </h3>
                <p className="mt-2 text-muted-foreground">
                    The AI analyzes your skills, experience, projects,
                    education, and overall resume quality.
                </p>
                </div>

                <div>
                <h3 className="text-xl font-medium">
                    03 Identify Strengths & Gaps
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Discover your strongest skills and identify missing
                    skills, keywords, or areas that can be improved.
                </p>
                </div>

                <div>
                <h3 className="text-xl font-medium">
                    04 Get Actionable Feedback
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Get personalized suggestions to improve your resume
                    and make it more effective for your target role.
                </p>
                </div>

            </div>
            </div>

        </div>
      </div>
  )
}

export default HowItWorks