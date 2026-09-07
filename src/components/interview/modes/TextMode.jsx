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
    <div className="flex justify-center">
        <form onSubmit={HandleSubmit} className="w-[600px] mb-3 max-w-sm md:max-w-2xl fixed bottom-0">
            <div className="relative md:max-w-2xl">
                <Input
                    type="text"
                    placeholder="type answer"
                    value={answer}
                    onChange={(e) => {
                    setAnswer(e.target.value);
                    setIsInputActive(e.target.value !== "");
                    }}
                    className="h-20 border-4 bg-input pr-24"
                    required
                />

                {/* <VoiceMode className="absolute bottom-1 right-12" /> */}

                {isInputActive && (
                    <Button
                    type="submit"
                    className="absolute bottom-1 right-1 bg-primary text-primary-foreground"
                    >
                    <SendHorizontal />
                    </Button>
                )}
            </div>
        </form>
    </div>
  )
}

export default TextMode