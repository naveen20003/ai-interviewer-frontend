"use client";

import { useEffect, useRef, useState } from "react";
import useVAD from "./useVad";
import useSocketConnection from "./socket";

export default function useAudioPlayer() {
  const socket = useSocketConnection(); 
  const currentAudioRef = useRef(null);
  const audioUrlRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const { 
    pauseVAD,
    startVAD
  } = useVAD();

  useEffect(() => {

    if (!socket) return;

    const handleAudio = async (buffer) => {
      console.log("AI audio received");

      // Stop VAD while AI is speaking
      await pauseVAD();

      setIsPlaying(true);

      const blob = new Blob([buffer], {
        type: "audio/wav",
      });

      const url = URL.createObjectURL(blob);

      audioUrlRef.current = url;

      const audio = new Audio(url);

      currentAudioRef.current = audio;

      audio.onplay = async () => {
        await pauseVAD();
      };

      audio.onended = async () => {
        console.log("AI speech finished");

        URL.revokeObjectURL(url);

        audioUrlRef.current = null;
        currentAudioRef.current = null;

        setIsPlaying(false);

        socket.emit("speech-finished");

        // Start listening again
        await startVAD();
      };

      audio.onerror = async () => {
        console.error("Audio playback failed");

        URL.revokeObjectURL(url);

        audioUrlRef.current = null;
        currentAudioRef.current = null;

        setIsPlaying(false);

        await startVAD();
      };

      // await audio.play();
    };

    // socket.on("audio", handleAudio);

    return () => {
      socket.off("audio", handleAudio);

      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
  }, [socket, pauseVAD, startVAD]);
  
  const startAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.start();
    };
   setIsPlaying(true); 
  }
  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }

    setIsPlaying(false);
  };

  return {
    isPlaying,
    startAudio,
    stopAudio,
    currentAudioRef,
  };
}