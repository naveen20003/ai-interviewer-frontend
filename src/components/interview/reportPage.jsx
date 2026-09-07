"use client";

import {
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
  Clock3,
  CircleAlert,
  Trophy,
  ChevronDown,
  ChevronUp,
  MessageSquareText,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import api from "@/lib/api";

export default function InterviewPreviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  useEffect(() => {
    if (!id) return;

    const interviewById = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/interview/${id}`);

        setData(response.data);

        // Open first question by default
        if (response.data?.questions?.length > 0) {
          setExpandedQuestions(
            new Set([response.data.questions[0].id])
          );
        }
      } catch (error) {
        console.error("Failed to fetch interview:", error);
      } finally {
        setLoading(false);
      }
    };

    interviewById();
  }, [id]);

  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);

      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }

      return next;
    });
  };

  const getScoreStyle = (score) => {
    if (score >= 8) {
      return {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      };
    }

    if (score >= 6) {
      return {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
      };
    }

    return {
      text: "text-red-600 dark:text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    };
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-40 rounded-lg bg-muted" />

            <div className="h-48 rounded-3xl bg-muted" />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl bg-muted"
                />
              ))}
            </div>

            <div className="h-72 rounded-3xl bg-muted" />

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 rounded-2xl bg-muted"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Not found
  // -----------------------------

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <CircleAlert size={24} />
          </div>

          <h2 className="text-xl font-semibold">
            Interview not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find the interview you're looking for.
          </p>

          <Button
            onClick={() => router.push("/dashboard")}
            className="mt-6"
          >
            Back to Dashboard
          </Button>
        </div>
      </main>
    );
  }

  const questions = data.questions || [];

  const totalQuestions =
    data.totalQuestions ?? questions.length;

  const answeredQuestions = questions.filter(
    (question) =>
      question.answer &&
      question.answer.trim() !== ""
  ).length;

  const score = data.score ?? 0;

  const scorePercentage = Math.min((score / 10) * 100, 100);

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8 lg:px-8">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="group -ml-2 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to Interviews
          </Button>

          <span className="hidden text-sm text-muted-foreground sm:block">
            Interview Report
          </span>
        </div>

        {/* ========================================
            INTERVIEW OVERVIEW
        ======================================== */}

        <section className="mb-5 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              {/* Left */}
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-2">

                  {/* Domain */}
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {data.domain || "Interview"}
                  </span>

                  {/* Level */}
                  {data.level && (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {data.level}
                    </span>
                  )}

                  {/* Status */}
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={13} />
                    {data.status || "Completed"}
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {data.domain || "Technical"} Interview
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Review your interview performance, answers,
                  scores and AI feedback.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {formattedDate}
                  </span>

                  {data.duration && (
                    <span className="flex items-center gap-2">
                      <Clock3 size={15} />
                      {data.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div className="flex shrink-0 items-center gap-4">
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl bg-primary/10 ring-1 ring-primary/10">
                  <span className="text-4xl font-bold tracking-tight text-primary">
                    {score}
                  </span>

                  <span className="mt-0.5 text-xs text-muted-foreground">
                    out of 10
                  </span>
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">
                    Overall Rating
                  </p>

                  <p className="mt-1 max-w-[130px] text-xs leading-5 text-muted-foreground">
                    {score >= 8
                      ? "Excellent performance"
                      : score >= 6
                      ? "Good performance"
                      : "Needs improvement"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            QUICK STATS
        ======================================== */}

        <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            icon={<Trophy size={18} />}
            label="Overall Rating"
            value={`${score}/10`}
          />

          <StatCard
            icon={<MessageSquareText size={18} />}
            label="Questions"
            value={`${answeredQuestions}/${totalQuestions}`}
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="Status"
            value={data.status || "Completed"}
          />

          <StatCard
            icon={<CalendarDays size={18} />}
            label="Interview Date"
            value={formattedDate}
          />
        </section>

        {/* ========================================
            PERFORMANCE SUMMARY
        ======================================== */}

        <section className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">

          <div className="mb-7">
            <h2 className="text-lg font-semibold">
              Performance Summary
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your overall performance in this interview.
            </p>
          </div>

          {/* Score Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Overall Performance
              </span>

              <span className="text-sm font-semibold">
                {score}/10
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{
                    width: `${scorePercentage}%`,
                  }}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Strengths
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    What you did well
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {data.good ? (
                  Array.isArray(data.good) ? (
                    data.good.map((item, index) => (
                      <PerformanceItem
                        key={index}
                        icon={
                          <CheckCircle2
                            size={15}
                            className="text-emerald-500"
                          />
                        }
                        text={item}
                      />
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {data.good}
                    </p>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No strengths recorded.
                  </p>
                )}
              </div>
            </div>

            {/* Improvements */}
            <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10">
                  <CircleAlert
                    size={18}
                    className="text-amber-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Areas to Improve
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Where you can improve
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {data.improvement ? (
                  Array.isArray(data.improvement) ? (
                    data.improvement.map((item, index) => (
                      <PerformanceItem
                        key={index}
                        icon={
                          <CircleAlert
                            size={15}
                            className="text-amber-500"
                          />
                        }
                        text={item}
                      />
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {data.improvement}
                    </p>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No improvement areas recorded.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            QUESTIONS
        ======================================== */}

        <section>

          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Interview Questions
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Review each answer and its AI evaluation.
              </p>
            </div>

            <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
              {questions.length} questions
            </span>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No questions found for this interview.
              </p>
            </div>
          ) : (
            <div className="space-y-3">

              {questions.map((item) => {
                const expanded = expandedQuestions.has(item.id);
                const scoreStyle = getScoreStyle(
                  item.score ?? 0
                );

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                  >

                    {/* Question Header */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleQuestion(item.id)
                      }
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30 md:p-6"
                    >

                      {/* Number */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                        {item.questionNumber}
                      </div>

                      {/* Question */}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-6">
                          {item.question}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">

                          {item.score !== null &&
                            item.score !== undefined && (
                              <span
                                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${scoreStyle.bg} ${scoreStyle.border} ${scoreStyle.text}`}
                              >
                                {item.score}/10
                              </span>
                            )}

                          {item.isFollowUp && (
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              Follow-up
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="shrink-0 text-muted-foreground">
                        {expanded ? (
                          <ChevronUp size={19} />
                        ) : (
                          <ChevronDown size={19} />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expanded && (
                      <div className="border-t border-border p-5 md:p-6">

                        {/* Answer */}
                        <div className="mb-6">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Your Answer
                            </p>
                          </div>

                          <div className="rounded-xl border border-border bg-muted/30 p-4">
                            {item.answer ? (
                              <p className="text-sm leading-7">
                                {item.answer}
                              </p>
                            ) : (
                              <p className="text-sm italic text-muted-foreground">
                                No answer provided.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Score + Feedback */}
                        <div className="grid gap-4 md:grid-cols-[110px_1fr]">

                          {/* Score */}
                          <div
                            className={`flex h-fit min-h-[100px] flex-col items-center justify-center rounded-xl border ${scoreStyle.bg} ${scoreStyle.border}`}
                          >
                            <span
                              className={`text-3xl font-bold ${scoreStyle.text}`}
                            >
                              {item.score ?? "—"}
                            </span>

                            <span className="mt-0.5 text-xs text-muted-foreground">
                              out of 10
                            </span>
                          </div>

                          {/* Feedback */}
                          <div className="rounded-xl border border-border p-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              AI Feedback
                            </p>

                            {item.feedback ? (
                              <p className="text-sm leading-7 text-muted-foreground">
                                {item.feedback}
                              </p>
                            ) : (
                              <p className="text-sm italic text-muted-foreground">
                                No feedback available.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Follow-up */}
                        {item.followup && (
                          <div className="mt-5 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03]">

                            {/* Follow-up Header */}
                            <div className="border-b border-primary/10 bg-primary/[0.04] px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                                  <MessageSquareText
                                    size={15}
                                    className="text-primary"
                                  />
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                  Follow-up Question
                                </span>
                              </div>
                            </div>

                            <div className="space-y-4 p-4">

                              {/* Follow-up Question */}
                              {item.followup.question && (
                                <div>
                                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Question
                                  </p>

                                  <p className="text-sm font-medium leading-6">
                                    {item.followup.question}
                                  </p>
                                </div>
                              )}

                              {/* Follow-up Answer */}
                              {item.followup.answer && (
                                <div>
                                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Your Answer
                                  </p>

                                  <div className="rounded-xl border border-border bg-background/60 p-4">
                                    <p className="text-sm leading-7 text-muted-foreground">
                                      {item.followup.answer}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Follow-up Score + Feedback */}
                              <div className="grid gap-4 md:grid-cols-[90px_1fr]">

                                {/* Score */}
                                {item.followup.score !== null &&
                                  item.followup.score !== undefined && (
                                    <div
                                      className={`flex h-fit min-h-[85px] flex-col items-center justify-center rounded-xl border ${
                                        getScoreStyle(item.followup.score).bg
                                      } ${
                                        getScoreStyle(item.followup.score).border
                                      }`}
                                    >
                                      <span
                                        className={`text-2xl font-bold ${
                                          getScoreStyle(item.followup.score).text
                                        }`}
                                      >
                                        {item.followup.score}
                                      </span>

                                      <span className="text-xs text-muted-foreground">
                                        / 10
                                      </span>
                                    </div>
                                  )}

                                {/* Feedback */}
                                {item.followup.feedback && (
                                  <div className="rounded-xl border border-border bg-background/50 p-4">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                      AI Feedback
                                    </p>

                                    <p className="text-sm leading-7 text-muted-foreground">
                                      {item.followup.feedback}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================
            BOTTOM
        ======================================== */}

        <div className="flex justify-center py-10">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="rounded-xl px-6"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}

/* ========================================
   STAT CARD
======================================== */

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 truncate text-base font-semibold md:text-lg">
        {value}
      </p>
    </div>
  );
}

/* ========================================
   PERFORMANCE ITEM
======================================== */

function PerformanceItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/50 p-3">
      <div className="mt-0.5 shrink-0">
        {icon}
      </div>

      <span className="text-sm leading-5">
        {text}
      </span>
    </div>
  );
}