import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
function AppDashboard() {
    const [data, setData] = useState(null);
    const [interviewData, setInterviewData] = useState(null);
    const [allResumeAnalyses, setAllResumeAnalyses] = useState([]);
    const [allInterviews, setAllInterviews] = useState([]);
    const router = useRouter();
    useEffect(() => {  
      const dashData = async () => {
        try {
          const res = await api.get("/grok/dash");
          // console.log(res.data.data);
          
          setData(res.data.data);
        } catch (error) {
          console.error("DASHBOARD API ERROR:", error);
        }
      };
      const allResumeData = async () => {
        try {
          const res = await api.get("/grok/allresumes");
          // console.log(res.data.data);
          
          setAllResumeAnalyses(res.data.data);
        } catch (error) {
          console.error("DASHBOARD API ERROR:", error);
        }
      };
      const interviewData = async () => {
          try {
            const interDash = await api.get("/interview");
            // console.log(interDash.data);
            setInterviewData(interDash.data);
          } catch (error) {
            console.error(error);
          }
      };
      const AllInterviewData = async () => {
          try {
            const getAll = await api.get("/interview/all");
            // console.log(getAll.data);
            setAllInterviews(getAll.data);
          } catch (error) {
            console.error(error);
          }
      };

      dashData();
      allResumeData();
      interviewData();
      AllInterviewData();
    }, []);

    const HandleInterviewDelete = async (id) => {
      // console.log("deleteid: ", id);
      
       try {
          const res = await api.delete(`/interview/${id}`);
          // console.log(res.data);
          router.refresh();
       } catch (error) {
          console.error(error);
       }
    };
    
    const HandleResumeDelete = async (id) => {
      // console.log("deleteid: ", id);
      
       try {
          const res = await api.delete(`/grok/${id}`);
          // console.log(res.data);
          router.refresh();
       } catch (error) {
          console.error(error);
       }
    };

  return (
                
    <div className="flex flex-1 flex-col gap-6 bg-background p-4 pt-0 md:p-6">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Track your interview performance and improve your skills.
        </p>
      </div>


      {/* ===================== */}
      {/* TOP STATS */}
      {/* ===================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Resume Score */}
        <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Resume Score
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                ATS compatibility
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
              📄
            </div>

          </div>

          <div className="mt-5 flex items-end gap-2">

            <span className="text-4xl font-bold tracking-tight">
              {data?.atsScore ?? "--"}
            </span>

            {data && (
              <span className="mb-1 text-sm text-muted-foreground">
                / 100
              </span>
            )}

          </div>

          {data && (
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(data.atsScore, 100)}%`,
                }}
              />
            </div>
          )}

        </div>


        {/* Interview Score */}
        <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Interview Score
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest performance
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-lg">
              🎯
            </div>

          </div>

          <div className="mt-5 flex items-end gap-2">

            <span className="text-4xl font-bold tracking-tight">
              {interviewData?.score ?? "--"}
            </span>

            {interviewData && (
              <span className="mb-1 text-sm text-muted-foreground">
                / 10
              </span>
            )}

          </div>

          {interviewData && (
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{
                  width: `${Math.min(interviewData.score * 10, 100)}%`,
                }}
              />
            </div>
          )}

        </div>


        {/* Interview Role */}
        <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Interview Role
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest interview
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
              💼
            </div>

          </div>

          <h2 className="mt-5 truncate text-2xl font-bold capitalize">
            {interviewData?.domain ?? "--"}
          </h2>

          <p className="mt-2 text-xs capitalize text-muted-foreground">
            {interviewData?.level ?? "No interview yet"}
          </p>

        </div>


        {/* Interview Status */}
        <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Interview Status
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest session
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-lg">
              ✨
            </div>

          </div>

          <div className="mt-5">

            {interviewData ? (
              <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                Completed
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
                No interview
              </span>
            )}

          </div>

        </div>

      </div>


      {/* ===================== */}
      {/* MAIN CONTENT */}
      {/* ===================== */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Interview */}
        <div className="rounded-2xl border bg-card shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between border-b p-6">

            <div>
              <h2 className="font-semibold">
                Recent Interview
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest interview performance
              </p>
            </div>

            {/* <button className="text-sm font-medium text-primary hover:underline">
              View all →
            </button> */}

          </div>


          {!interviewData ? (

            <div className="flex min-h-[250px] flex-col items-center justify-center p-6 text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-2xl">
                🎤
              </div>

              <h3 className="font-semibold">
                No interviews yet
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Complete your first AI interview to see your performance here.
              </p>

              <button onClick={() => router.push("/interview")} className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Start Interview →
              </button>

            </div>

          ) : (

            <div className="p-6">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl">
                    💼
                  </div>

                  <div>
                    <h3 className="font-semibold capitalize">
                      {interviewData.domain}
                    </h3>

                    <p className="mt-1 text-sm capitalize text-muted-foreground">
                      {interviewData.level} · Technical Interview
                    </p>
                  </div>

                </div>


                <div className="text-left sm:text-right">

                  <p className="text-xs text-muted-foreground">
                    Score
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {interviewData.score}
                    <span className="text-sm font-normal text-muted-foreground">
                      /10
                    </span>
                  </p>

                </div>

              </div>


              {/* Score Progress */}
              <div className="mt-6">

                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Performance</span>
                  <span>{interviewData.score * 10}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">

                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min(interviewData.score * 10, 100)}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          )}

        </div>


        {/* Performance Summary */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Performance
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest interview
              </p>
            </div>

            <div className="text-2xl">
              📊
            </div>

          </div>


          <div className="mt-8 flex items-center justify-center">

            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[15px] border-primary/10">

              <div
                className="absolute inset-[-12px] rounded-full border-[12px] border-primary border-r-transparent border-b-transparent"
              />

              <div className="text-center">

                <p className="text-4xl font-bold">
                  {interviewData?.score ?? "--"}
                </p>

                <p className="text-xs text-muted-foreground">
                  out of 10
                </p>

              </div>

            </div>

          </div>


          <p className="mt-6 text-center text-sm text-muted-foreground">
            {interviewData
              ? "Keep practicing to improve your interview score."
              : "Complete an interview to see your performance."}
          </p>

        </div>

      </div>


      {/* ===================== */}
      {/* AI INSIGHTS */}
      {/* ===================== */}

      <div>

        <div className="mb-4">

          <h2 className="text-lg font-semibold">
            AI Interview Insights
          </h2>

          <p className="text-sm text-muted-foreground">
            Understand your strengths and where you can improve.
          </p>

        </div>


        <div className="grid gap-4 lg:grid-cols-3">

          {/* Strengths */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-lg">
                ✓
              </div>

              <div>
                <h3 className="font-semibold">
                  What you did well
                </h3>

                <p className="text-xs text-muted-foreground">
                  Your strengths
                </p>
              </div>

            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {interviewData?.good ??
                "Complete an interview to receive AI-generated feedback about your strengths."}
            </p>

          </div>


          {/* Weaknesses */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-lg">
                !
              </div>

              <div>
                <h3 className="font-semibold">
                  What held you back
                </h3>

                <p className="text-xs text-muted-foreground">
                  Areas that need attention
                </p>
              </div>

            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {interviewData?.bad ??
                "Complete an interview to identify your weaker areas."}
            </p>

          </div>


          {/* Improvement */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-lg">
                ↗
              </div>

              <div>
                <h3 className="font-semibold">
                  How to improve
                </h3>

                <p className="text-xs text-muted-foreground">
                  AI recommendations
                </p>
              </div>

            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {interviewData?.improvement ??
                "Complete an interview to receive personalized improvement recommendations."}
            </p>

          </div>

        </div>

      </div>



  
      {/* ===================== */}
      {/* ALL INTERVIEWS */}
      {/* ===================== */}

      <div className="rounded-2xl border bg-card shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">
              All Interviews
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your previous interview sessions.
            </p>
          </div>

          <button
            onClick={() => router.push("/interview")}
            className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:mt-0"
          >
            + New Interview
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  Domain
                </th>

                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  Level
                </th>

                {/* <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Questions
                </th> */}

                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Rating
                </th>

                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  Status
                </th>

                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  Date
                </th>

                <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {allInterviews.map((interview) => (
                <tr
                  key={interview?.id}
                  className="border-b last:border-0 transition-colors hover:bg-muted/30"
                >
                  {/* Domain */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        💼
                      </div>

                      <span className="font-medium">
                        {interview?.domain}
                      </span>
                    </div>
                  </td>

                  {/* Level */}
                  <td className="px-6 py-4">
                    <span className="capitalize text-muted-foreground">
                      {interview?.level}
                    </span>
                  </td>

                  {/* Questions */}
                  {/* <td className="px-6 py-4 text-center text-muted-foreground">
                    {interview?.totalQuestions}
                  </td> */}

                  {/* Score */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold">
                      {interview?.score}/10
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {interview?.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {interview?.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* Preview */}
                      <button
                        onClick={() => router.push(`/mockreport/${interview.id}`)}
                        title="Preview interview"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        👁
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => HandleInterviewDelete(interview.id)}
                        title="Delete interview"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================== */}
      {/* ALL RESUME ANALYSES */}
      {/* ===================== */}

      <div className="rounded-2xl border bg-card shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">
              All Resume Analyses
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your previous resume analysis reports.
            </p>
          </div>

          <button
            onClick={() => router.push("/resume")}
            className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:mt-0"
          >
            + Analyze Resume
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                {/* Resume */}
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  Resume
                </th>

                {/* ATS Score */}
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  ATS Score
                </th>

                {/* Keywords */}
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Keywords
                </th>

                {/* Skills */}
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Skills
                </th>

                {/* Experience */}
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Experience
                </th>

                {/* Date */}
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  Date
                </th>

                {/* Actions */}
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {allResumeAnalyses.map((resume) => (
                <tr
                  key={resume?.id}
                  className="border-b last:border-0 transition-colors hover:bg-muted/30"
                >
                  {/* Resume */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        📄
                      </div>

                      <div>
                        <span className="font-medium">
                          Resume Analysis
                        </span>

                        <p className="mt-0.5 max-w-[220px] truncate text-xs text-muted-foreground">
                          {resume?.summary}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ATS Score */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`font-semibold ${
                        resume?.atsScore >= 80
                          ? "text-green-600 dark:text-green-400"
                          : resume?.atsScore >= 60
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {resume?.atsScore}/100
                    </span>
                  </td>

                  {/* Keywords */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold">
                      {resume?.sectionScores?.keywords ?? "-"}/10
                    </span>
                  </td>

                  {/* Skills */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold">
                      {resume?.sectionScores?.skills ?? "-"}/10
                    </span>
                  </td>

                  {/* Experience */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold">
                      {resume?.sectionScores?.experience ?? "-"}/10
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {resume?.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* Preview */}
                      <button
                        onClick={() =>
                          router.push(`/resumereport/${resume.id}`)
                        }
                        title="Preview resume analysis"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        👁
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          HandleResumeDelete(resume.id)
                        }
                        title="Delete resume analysis"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>      
    </div>
  )
}

export default AppDashboard;