import InterviewStatus from "./interviewState";
import QuestionHint from "./questionHint";

function InterviewHeader({ questionNumber, totalQuestion, hint, state }) {
  return (
    <div className="w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-xl px-3 py-3 sm:px-5">

        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Title */}
          <div className="font-semibold text-sm sm:text-base whitespace-nowrap">
            Mock Interview
          </div>

          {/* Question count */}
          <div className="text-sm font-medium whitespace-nowrap">
            {questionNumber}/{totalQuestion}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-3 flex items-center justify-between gap-2">

          {/* Interview status */}
          <div className="min-w-0">
            <InterviewStatus state={state} />
          </div>

          {/* Hint */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={`inline-block w-2.5 h-2.5 shrink-0 rounded-full ${
                hint ? "bg-green-500" : "bg-gray-400"
              }`}
            />

            <div className="min-w-0">
              <QuestionHint hint={hint} />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InterviewHeader;