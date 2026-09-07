"use client";

import { useEffect, useRef, useState } from "react";
import * as ort from "onnxruntime-web";
// import { convertfloat32topcm } from "@/services/audio/pcm";
import { convertfloat32topcm } from "@/utils/float32topcm.utils";
import useSocketConnection from "./socket";

export default function useVAD() {
  const  socket  = useSocketConnection();

  const vadInstance = useRef(null);
  const [status, setStatus] = useState("Idle");

  const initializeVAD = async () => {
    if (typeof window === "undefined") return;


    if (!socket?.connected) {
      console.log("Socket is not connected");
      return;
    }

    try {
      // Destroy old VAD instance
      if (
        vadInstance.current &&
        typeof vadInstance.current.destroy === "function"
      ) {
        vadInstance.current.destroy();
        vadInstance.current = null;
      }

      // ONNX environment
      window.ort = ort;

      // Dynamic import
      const { MicVAD } = await import("@ricky0123/vad-web");

      setStatus("Loading Silero model...");

      vadInstance.current = await MicVAD.new({
        getStream: async () => {
          return navigator.mediaDevices.getUserMedia({
            audio: {
              channelCount: 1,
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });
        },

        positiveSpeechThreshold: 0.7,
        negativeSpeechThreshold: 0.5,

        preSpeechPadFrames: 5,
        redemptionFrames: 12,
        minSpeechFrames: 8,

        onSpeechStart: () => {
          console.log("Speech started");

          setStatus("Speech active!");
        },

        onVADMisfire: () => {
          console.warn("VAD misfire");
        },

        onSpeechEnd: (audio) => {
          console.log("Speech ended");

          setStatus("Processing...");

          const pcmData = convertfloat32topcm(audio);

          console.log("pcmData",pcmData);
          

          socket.emit("user", pcmData);
        },

        onnxWASMBasePath:
          "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",

        baseAssetPath:
          "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.29/dist/",
      });

      // await vadInstance.current.start();

      // setStatus("Listening...");
    } catch (error) {
      console.error("VAD initialization failed:", error);
      setStatus("Initialization Failed.");
    }
  };
  const pauseVAD = async () => {
    if (vadInstance.current) {
      await vadInstance.current.pause();
      setStatus("Notlistening");
    }
  };

  const startVAD = async () => {
    if (vadInstance.current) {
      await vadInstance.current.start();
      setStatus("Listening");
    }
  };

  const destroyVAD = () => {
    if (vadInstance.current) {
      vadInstance.current.destroy();
      vadInstance.current = null;
    }
  };

  useEffect(() => {
    return () => {
      destroyVAD();
    };
  }, []);

  return {
    initializeVAD,
    pauseVAD,
    startVAD,
    destroyVAD,
    status,
    vadInstance,
  };
}