"use client";

import { useEffect, useRef, useState } from "react";
// Import ONNX runtime directly from your node_modules folder
import * as ort from "onnxruntime-web"; 

export default function VoiceVADComponent() {
  const vadInstance = useRef(null);
  const [status, setStatus] = useState("Initializing VAD...");

  useEffect(() => {
    async function initVAD() {
      // 1. Ensure code only executes in the browser client environment
      if (typeof window === "undefined") return;

      try {
        // 2. Assign the imported ONNX object globally so ricky-vad can see it
        window.ort = ort;

        // 3. Dynamically import VAD bundle to keep it safely off the Next.js server
        const { MicVAD } = await import("@ricky0123/vad-web");

        setStatus("Loading Silero model...");
        vadInstance.current = await MicVAD.new({
          onSpeechStart: () => {
            console.log("Speech start detected");
            setStatus("Speech active!");
          },
          onSpeechEnd: (audio) => {
            console.log("Speech ended, audio recorded:", audio);
            setStatus("Listening...");
          },
          // Route the underlying WASM engine directly to the NPM distribution package CDN
          onnxWASMBasePath: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
          baseAssetPath: "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.29/dist/",
        });

        await vadInstance.current.start();
        setStatus("Listening...");
      } catch (err) {
        console.error("VAD Engine failed to initialize:", err);
        setStatus("Initialization Failed.");
      }
    }

    initVAD();

    // Cleanup audio threads on unmount
    return () => {
      if (vadInstance.current && typeof vadInstance.current.destroy === "function") {
        vadInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>VAD Tracker Status: <span style={{ color: "green" }}>{status}</span></h3>
    </div>
  );
}
