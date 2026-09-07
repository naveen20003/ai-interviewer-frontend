
function InterviewStatus({ state }) {
  const stateToPhase = {
    idle: "idle",

    generateintroduction: "preparing",
    speakingtroduction: "speaking",

    generatequestion: "preparing",
    askquestion: "preparing",

    speaking: "speaking",
    sendingtext: "speaking",

    listening: "listening",
    answerintext: "listening",

    evaluate: "evaluating",
    decision: "evaluating",

    User_response: "waiting",

    waitForHint: "listening",

    hint: "thinking",
    speakhint: "speaking",
    sendingtexthint: "speaking",

    generate_explaination: "thinking",
    speak_explaination: "speaking",
    sendingtextexplaination: "speaking",

    follow_up: "thinking",
    ask_follow_up: "speaking",
    sendingtextfollowup: "speaking",

    generate_goodbye: "wait, updating database...",
    say_goodbye: "wait, updating database..."
};

  const phase = stateToPhase[state] || "idle";
  // console.log("interviewer State: ", state);
  // console.log("interviewer Phase: ", phase);
  
  return (
    <div className="flex gap-2 rounded-2xl p-4">
      <p className="text-sm font-semibold">
        Interviewer State: 
      </p>
      <p className="text-sm font-semibold">
        {phase}
      </p>

      {/* <p className="text-xs text-muted-foreground">
        {current.description}
      </p> */}
    </div>
  );
}

export default InterviewStatus;