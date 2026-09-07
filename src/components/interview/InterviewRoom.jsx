import InterviewHeader from "./InterviewHeader"; 
import QuestionDisplay from "./QuestionDisplay";
import TextMode from "./modes/TextMode";
import VoiceMode from "./modes/VoiceMode";
import { useParams, useRouter } from "next/navigation";
import { useInterview } from "@/context/interviewContext";
import MessageScroller from "./messageScroller";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { ToastAction } from "../ui/toast";
function InterviewRoom() {
    const router = useRouter();
    const {
        socket,
        interviewData,
        userAnswer,
        userVoice,
        isInterviewEnd
    } = useInterview();

    const params = useParams();

    // console.log(
    //     "INTERVIEW ROOM DATA:",
    //     interviewData
    // );
    
    // console.log(
    //     "INTERVIEW ROOM state:",
    //     interviewData?.state
    // );

    if (isInterviewEnd) {
        toast.success("Mock Interview Completed! 🎉", {
            description: "Redirecting you back to the dashboard in 3 seconds...",
            action: {
            label: "Go Now",
            onClick: () => router.push("/dashboard"),
            },
        });

        setTimeout(() => {
            router.push("/dashboard");
        }, 3000);

        return;
        }
    if (!interviewData) {
        return (
            <div className="min-h-screen w-full flex justify-center items-center">
                <Spinner className="size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-3 overflow-hidden flex flex-col gap-5">

            <InterviewHeader
                questionNumber={
                    interviewData.questionNumber
                }
                totalQuestion={
                    interviewData.totalQuestions
                }
                hint={
                    interviewData?.hint?.hint
                }
                state={interviewData?.state}
            />

            <QuestionDisplay
                Question={
                    interviewData?.currentQuestion?.question
                }
                follow_up={
                    interviewData?.followup
                }
                isFollowUP={
                    interviewData?.isFollowUP
                }
            />

            <p className="flex justify-center">
                Your Answer
            </p>

            <MessageScroller
                Answer={userAnswer}
            />

            {params.mode === "text" ? (
                <TextMode
                    userVoice={userVoice}
                    socket={socket}
                />
            ) : (
                <VoiceMode />
            )}

        </div>
    );
}

export default InterviewRoom;
