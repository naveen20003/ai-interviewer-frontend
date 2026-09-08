"use client";

import { useEffect } from "react";
import InterviewHeader from "./InterviewHeader";
import QuestionDisplay from "./QuestionDisplay";
import TextMode from "./modes/TextMode";
import VoiceMode from "./modes/VoiceMode";
import { useParams, useRouter } from "next/navigation";
import { useInterview } from "@/context/interviewContext";
import MessageScroller from "./messageScroller";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

function InterviewRoom() {
    const router = useRouter();
    const params = useParams();

    const {
        socket,
        interviewData,
        userAnswer,
        userVoice,
        isInterviewEnd
    } = useInterview();

    useEffect(() => {
        if (!isInterviewEnd) return;

        toast.success("Mock Interview Completed! 🎉", {
            description:
                "Redirecting you back to the dashboard in 3 seconds...",
            action: {
                label: "Go Now",
                onClick: () => router.push("/dashboard"),
            },
        });

        const timer = setTimeout(() => {
            router.push("/dashboard");
        }, 3000);

        return () => clearTimeout(timer);
    }, [isInterviewEnd, router]);

    if (isInterviewEnd) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Spinner className="size-10" />
            </div>
        );
    }

    if (!interviewData) {
        return (
            <div className="min-h-screen w-full flex justify-center items-center">
                <Spinner className="size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full overflow-hidden flex flex-col gap-5 p-3 pb-28">

            <InterviewHeader
                questionNumber={interviewData.questionNumber}
                totalQuestion={interviewData.totalQuestions}
                hint={interviewData?.hint?.hint}
                state={interviewData?.state}
            />

            <QuestionDisplay
                Question={interviewData?.currentQuestion?.question}
                follow_up={interviewData?.followup}
                isFollowUP={interviewData?.isFollowUP}
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