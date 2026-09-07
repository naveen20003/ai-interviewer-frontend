"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useSocket } from "./socketContext";

const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const socket = useSocket();

  const [sessionId, setSessionId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [userVoice, setUserVoice] = useState("");
  const [isInterviewEnd, setisInterviewEnd] = useState(false);

  // =========================
  // SOCKET LISTENERS
  // =========================

  useEffect(() => {
    if (!socket) return;

    // console.log(
    //   "InterviewProvider: registering listeners",
    //   socket.id
    // );

    const handleSessionCreated = (data) => {
      // console.log(
      //   "SESSION CREATED:",
      //   data
      // );

      setSessionId(data.sessionId);

      sessionStorage.setItem(
        "sessionId",
        data.sessionId
      );

      if (data.newSession === true) {
        sessionStorage.setItem(
          "isNewInterview",
          "true"
        );
      }
    };

    const handleInterviewState = (data) => {
      // console.log("🔥 INTERVIEW STATE RECEIVED");
      // console.log("🔥 questionNumber:", data?.questionNumber);
      // console.log("🔥 question:", data?.currentQuestion?.question);
      // console.log("🔥 full data:", data);
      // console.log(
      //   "INTERVIEW STATE:",
      //   data
      // );

      setInterviewData(data);
      // The new interview has successfully started.
      // From now on, a refresh should restore it.
      sessionStorage.removeItem("isNewInterview");
    };

    const handleSessionRestored = (data) => {
      // console.log(
      //   "SESSION RESTORED:",
      //   data
      // );

      setInterviewData(data);

      setSessionId(
        sessionStorage.getItem("sessionId")
      );
    };

    const handleUserAnswer = (data) => {
      setUserAnswer(data);
    };

    const handleUserVoice = (data) => {
      setUserVoice(data);
    };

    const handleInterviewEnd = (data) => {
      setisInterviewEnd(true);
      // console.log("isInterviewENd: ", isInterviewEnd);
      
      // console.log("interview ended: ", data);
      
    };

    socket.on(
      "session-created",
      handleSessionCreated
    );

    socket.on(
      "interview-state",
      handleInterviewState
    );

    socket.on(
      "session-restored",
      handleSessionRestored
    );

    socket.on(
      "user-answer",
      handleUserAnswer
    );

    socket.on(
      "user-voice",
      handleUserVoice
    );
    
    socket.on(
      "interview-completed",
      handleInterviewEnd
    );

    return () => {
      // console.log(
      //   "InterviewProvider: removing listeners"
      // );

      socket.off(
        "session-created",
        handleSessionCreated
      );

      socket.off(
        "interview-state",
        handleInterviewState
      );

      socket.off(
        "session-restored",
        handleSessionRestored
      );

      socket.off(
        "user-answer",
        handleUserAnswer
      );

      socket.off(
        "user-voice",
        handleUserVoice
      );

      socket.off(
       "interview-completed",
        handleInterviewEnd
      );
    };
  }, [socket]);

  // =========================
  // RESTORE AFTER REFRESH
  // =========================

  useEffect(() => {
    if (!socket) return;

    const sessionId =
      sessionStorage.getItem(
        "sessionId"
      );

    const isNewInterview =
      sessionStorage.getItem(
        "isNewInterview"
      );

    // console.log(
    //   "Provider restore check:",
    //   {
    //     sessionId,
    //     isNewInterview,
    //     connected: socket.connected,
    //   }
    // );

    if (!sessionId) {
      return;
    }

    if (isNewInterview === "true") {
      // console.log(
      //   "New interview - don't restore"
      // );

      sessionStorage.removeItem(
        "isNewInterview"
      );

      return;
    }

    const restore = () => {
      // console.log(
      //   "RESTORING SESSION:",
      //   sessionId
      // );

      setSessionId(sessionId);

      socket.emit(
        "restore-session",
        {
          sessionId,
        }
      );
    };

    // Socket already connected
    if (socket.connected) {
      restore();
      return;
    }

    // Wait for socket connection
    socket.once(
      "connect",
      restore
    );

    return () => {
      socket.off(
        "connect",
        restore
      );
    };

  }, [socket]);

  // =========================
  // START INTERVIEW
  // =========================

  const startInterview = useCallback(
    (data) => {
      if (!socket) return;

      // console.log(
      //   "START INTERVIEW:",
      //   data
      // );

      socket.emit(
        "candidatedata",
        data
      );
    },
    [socket]
  );

  // =========================
  // SUBMIT ANSWER
  // =========================

  const submitAnswer = useCallback(
    (answer) => {
      if (!socket) return;

      socket.emit(
        "text-answer",
        answer
      );
    },
    [socket]
  );

  return (
    <InterviewContext.Provider
      value={{
        socket,

        sessionId,
        interviewData,
        userAnswer,
        userVoice,
        isInterviewEnd,

        startInterview,
        submitAnswer,

        setInterviewData,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context =
    useContext(InterviewContext);

  if (!context) {
    throw new Error(
      "useInterview must be used inside InterviewProvider"
    );
  }

  return context;
}