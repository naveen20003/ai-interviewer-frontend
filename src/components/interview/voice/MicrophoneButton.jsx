
async function MicrophoneButton() {
    async function iniVad() {
         if (!socketRef.current.connected) return;
         if (typeof window === "undefined") return;
   
         try {
           // 2. Clear old audio listeners if this event fires multiple times
           if (vadInstance.current && typeof vadInstance.current.destroy === "function") {
             vadInstance.current.destroy();
           }
   
           // 3. Mount ONNX environment to the window variable scope
           window.ort = ort;
   
           // 4. Safely resolve the dynamic import inside the async event loop
           const { MicVAD } = await import("@ricky0123/vad-web");
           
           setStatus("Loading Silero model...");
   
           // 5. Instantiating via the direct imported 'MicVAD' reference
           vadInstance.current = await MicVAD.new({
             getStream: async () => {
               return await navigator.mediaDevices.getUserMedia({
                 audio: {
                   channelCount: 1,
                   echoCancellation: true,
                   noiseSuppression: true,
                   autoGainControl: true
                 },
               });
             },
   
             positiveSpeechThreshold:0.7,
             negativeSpeechThreshold:0.5,
   
             preSpeechPadFrames: 5,
             redemptionFrames:12,
             minSpeechFrames: 8,
             onSpeechStart: () => {
              //  console.log("Speech start detected");
               setStatus("Speech active!");
               
               if (currentaudioref.current) {
                 currentaudioref.current?.pause();
                 currentaudioref.current.currentTime = 0;
                 currentaudioref.current = null;
             }
             },
              onVADMisfire: () => {
               // Access the probability value captured at the moment of the misfire
               console.warn(`Misfired! Last known speech probability was: ${currentaudioref.current}`);
               // currentaudioref.current?.play();
             },
             onSpeechEnd: (audio) => {
               console.log("Speech ended, audio recorded:", audio);
               setStatus("Listening...");
               
               // Convert to 16-bit PCM and emit
               const pcmdata = convertfloat32topcm(audio);
               console.log("pcmdata",pcmdata);
               console.log("Emitting user event");
               socketRef.current.emit("user", pcmdata);
             },
             onnxWASMBasePath: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
             baseAssetPath: "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.29/dist/",
           });
   
           await vadInstance.current.start();
           setStatus("Listening...");
           
           socketRef.current.on("audio", async (buffer) => {
             await vadInstance.current.pause();
             setStatus("stop listening...")
             // console.log(buffer);
             const blob = new Blob([buffer], {type: "audio/wav" });
             const url = URL.createObjectURL(blob);
             
             const audio = new Audio(url);
             currentaudioref.current = audio;
             // console.log(currentaudioref.current.play());
             // 1. Setup the ended handler first
             audio.onended = async () => {
                 URL.revokeObjectURL(url);
                 currentaudioref.current = null;
                 socketRef.current.emit("speech-finished");
                 if (vadInstance.current) {
                     await vadInstance.current.start(); // Safely restart mic listening
                 }
             };
   
             // 2. Pause the VAD *before* playing the audio file
             audio.onplay = async () => {
               if (vadInstance.current) {
                   await vadInstance.current.pause(); 
               }
             }
   
             // 3. Start playback now that the microphone is safely muted
             currentaudioref.current.play();
             // currentaudioref.current.pause();
           })
         } catch (err) {
           console.error("VAD Engine failed to initialize:", err);
           setStatus("Initialization Failed.");
         }
       };
       iniVad();
  return (
    <div>MicrophoneButton</div>
  )
}

export default MicrophoneButton