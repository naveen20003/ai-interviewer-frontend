import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";


function MessageScroller({ Answer }) {
    // const { userVoice } = useInterview();
    // const [answer, setAnswer] = useState("");
    // console.log("Answer", Answer);
    
    // useEffect(() => {
    //         if(!Answer) return;
    
    //        setAnswer((prev) => {
    //         if(!prev.trim()) return Answer;
    //         return `${prev} ${Answer}`;
    //  });
    // }, [Answer]);
    
    // useEffect(() => {
    //         if(!userVoice) return;
    
    //        setAnswer((prev) => {
    //         if(!prev.trim()) return userVoice;
    //         return `${prev} ${userVoice}`;
    //  });
    // }, [userVoice]);    

  return (
    <div className="relative flex justify-center">
        <ScrollArea className="h-50 w-[580px] rounded-xl border">
            <div className="p-5 text-3xl">
              {Answer}
            </div>
        </ScrollArea>

        {/* Top fade */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background to-transparent" />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

export default MessageScroller;
