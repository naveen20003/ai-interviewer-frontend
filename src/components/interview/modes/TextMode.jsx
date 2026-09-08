import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SendHorizontal } from 'lucide-react';
import VoiceMode from "./VoiceMode";


function TextMode({ userVoice, socket }) {
    const [answer, setAnswer] = useState(userVoice);
    const [isInputActive, setIsInputActive] = useState(false);
    // const { SubmitAnswer } = useInterview();
    useEffect(() => {
        if(!userVoice) return;

       setAnswer((prev) => {
        if(!prev.trim()) return userVoice;
        setIsInputActive(true);
        return `${prev} ${userVoice}`;
    });
    }, [userVoice]);
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        // console.log("input value", answer);
        setIsInputActive(true);
        socket.emit("text-answer", answer)
        // SubmitAnswer(answer)
        setAnswer("");
    }
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 md:px-6">
        <form
            onSubmit={HandleSubmit}
            className="w-full max-w-[700px]"
        >
            <div className="relative">
            <Input
                type="text"
                placeholder="Type answer"
                value={answer}
                onChange={(e) => {
                setAnswer(e.target.value);
                setIsInputActive(e.target.value !== "");
                }}
                className="h-16 w-full border-2 bg-input pr-16"
                required
            />

            {isInputActive && (
                <Button
                type="submit"
                size="icon"
                className="absolute bottom-2 right-2"
                >
                <SendHorizontal className="h-5 w-5" />
                </Button>
            )}
            </div>
        </form>
        </div>
  )
}

export default TextMode