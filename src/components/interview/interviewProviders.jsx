"use client";

import { InterviewProvider } from "@/context/interviewContext";
import SocketProvider from "@/context/socketContext";


export default function InterviewProviders({ children }) {
  return (
    <SocketProvider>
      <InterviewProvider>
        {children}
      </InterviewProvider>
    </SocketProvider>
  );
}