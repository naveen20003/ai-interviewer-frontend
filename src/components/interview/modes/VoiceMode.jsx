"use client";

import { Button } from "@/components/ui/button";
import useVAD from "@/hooks/useVad";
import { useState } from "react";
import { Mic, MicOff } from 'lucide-react';
import WavForm from "../voice/WavForm";
import { Ear, EarOff } from 'lucide-react';

function VoiceMode() {
  const [sessionInitilized, setSessionInitilized] = useState(false);
  const [pause, setPause] = useState(false);
  const [micon, setMicon] = useState(false);
  const [wavform, setWavform] = useState(false);

  const {
    initializeVAD,
    pauseVAD,
    startVAD,
    status,
  } = useVAD();

  return (
    <div>
      <div className="w-full flex justify-center">
        {
          status === "Loading Silero model..." && <p className="bg-background text-foreground">Starting The Session...</p>
        }
        {
          status === "Listening" && <p className="w-15 h-15 rounded-full bg-background text-foreground">listening...</p>
        }
        {
          status === "Notlistening" && <p className="w-15 h-15 rounded-full bg-background text-foreground">Not Listening...</p>
        }
      </div>
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        {
            wavform &&
            <WavForm />
          }
      </div>
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 text-white shadow-lg" >
          {!sessionInitilized &&
          <Button onClick={() =>{
            initializeVAD();
            setSessionInitilized(true);
            setMicon(true);
            }} 
            className="bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground">
            Start
          </Button> }
          
          {
            micon &&
            <Button onClick={() =>{
              startVAD();
              setPause(true);
              setWavform(true);
              setMicon(false);
              }}
              className="bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground"
              >
              <Mic className="text-card-foreground"/>
            </Button>        
          }
          { pause && 
          <Button onClick={() =>{
            pauseVAD();
            setPause(false);
            setMicon(true);
            setWavform(false);
            }}
            className="bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground"
            >
            <MicOff className="text-card-foreground"/>
          </Button>
          }
      </div>
    </div>
  );
};

export default VoiceMode;