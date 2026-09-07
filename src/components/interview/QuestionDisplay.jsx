import useAudioPlayer from "@/hooks/useAudioPlayer";
import { useState } from "react";
import { Button } from "../ui/button";
import { VolumeOff, Volume2 } from 'lucide-react';
import { CornerDownRight } from 'lucide-react';

function QuestionDisplay({ Question, follow_up, isFollowUP }) {
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);
    const [IsSpeakerOff, setIsSpeakerOff] = useState(false);
    // console.log("follow_UP Question", follow_up);
    // console.log("follow_UP is true or false Question", isFollowUP);
    
    
     const {
        isPlaying,
        startAudio,
        stopAudio,
      } = useAudioPlayer();
  return (
      <div className="w-full flex justify-center gap-5 rounded-md">
        {
          isFollowUP && 
          <div className="w-full flex flex-col max-w-xl p-5 min-h-auto bg-followup-card text-followup-card-foreground border border-followup-card-border rounded-md gap-5 relative">
            <div className="flex gap-2">
             <CornerDownRight />
             <p>Followup Question</p>
            </div>
            {follow_up}         
          {/* <div className="absolute bottom-0 right-0 pr-3 pb-3">
              {
                isSpeakerOn &&
                <Button onClick={() => {
                  startAudio();
                  setIsSpeakerOn(false);
                  setIsSpeakerOff(true);
                  }}
                  className="bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground"
                  >
                  <Volume2 className="text-card-foreground"/>
                </Button>
              }

              {
                IsSpeakerOff &&
                <Button onClick={() => {
                  stopAudio();
                  setIsSpeakerOff(false);
                  setIsSpeakerOn(true);
                  }}
                  className="bg-blue-300 rounded-full hover:bg-blue-700 hover:text-blue-100"
                  >
                  <VolumeOff className="text-blue-700"/>
                </Button>
              }
          </div> */}
          </div>
      }
      {
        !isFollowUP &&
        <div className="w-full flex flex-col max-w-xl p-5 flex min-h-auto bg-card text-card-foreground border rounded-md gap-5 relative">
          <p>Question</p>
          {Question}         
        {/* <div className="absolute bottom-0 right-0 pr-3 pb-3">
            {
              isSpeakerOn &&
              <Button onClick={() => {
                startAudio();
                setIsSpeakerOn(false);
                setIsSpeakerOff(true);
                }}
                className="bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground"
                >
                <Volume2 className="text-card-foreground"/>
              </Button>
            }

            {
              IsSpeakerOff &&
              <Button onClick={() => {
                stopAudio();
                setIsSpeakerOff(false);
                setIsSpeakerOn(true);
                }}
                className="bg-blue-300 rounded-full hover:bg-blue-700 hover:text-blue-100"
                >
                <VolumeOff className="text-blue-700"/>
              </Button>
            }
        </div> */}
        </div>
      }
    </div>
  )
}

export default QuestionDisplay;