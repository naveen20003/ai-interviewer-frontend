import InterviewProviders from "@/components/interview/interviewProviders";


export default function InterviewLayout({ children }) {
  return (
    <InterviewProviders>
      {children}
    </InterviewProviders>
  );
}