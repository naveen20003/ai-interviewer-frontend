import InterviewStatus from "./interviewState";
import QuestionHint from "./questionHint";

function InterviewHeader({ questionNumber, totalQuestion, hint, state }) {
  return (
    <div className="w-full bg-background text-foreground flex justify-center p-5">
        <div className="w-full max-w-xl flex justify-between items-center pt-10 pr-5">
            <div>Mock Interview</div>
            <div><InterviewStatus state={state}/></div>
            <div className="flex items-center gap-1">
              <div>
                {
                  hint ?
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  :
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                }
              </div>
             <div><QuestionHint hint={hint}/></div>
            </div>
            <div>{questionNumber}/{totalQuestion}</div>
        </div>
    </div>
  )
}

export default InterviewHeader;