"use client";

import {
  ArrowLeft,
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  FileText,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function ResumePreviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH RESUME ANALYSIS
  // =============================

  useEffect(() => {
    if (!id) return;

    const fetchResumeAnalysis = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/grok/${id}`);

        // console.log("Resume analysis:", response.data);

        setData(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch resume analysis:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResumeAnalysis();
  }, [id]);

  // =============================
  // ATS STYLE
  // =============================

  const getAtsStyle = (score) => {
    if (score >= 80) {
      return {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        progress: "bg-emerald-500",
        label: "Excellent",
      };
    }

    if (score >= 60) {
      return {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        progress: "bg-amber-500",
        label: "Good",
      };
    }

    return {
      text: "text-red-600 dark:text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      progress: "bg-red-500",
      label: "Needs Improvement",
    };
  };

  // =============================
  // SECTION SCORE STYLE
  // =============================

  const getScoreStyle = (score) => {
    if (score >= 8) {
      return {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        progress: "bg-emerald-500",
      };
    }

    if (score >= 6) {
      return {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        progress: "bg-amber-500",
      };
    }

    return {
      text: "text-red-600 dark:text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      progress: "bg-red-500",
    };
  };

  // =============================
  // LOADING
  // =============================

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <div className="animate-pulse space-y-6">

            <div className="h-8 w-40 rounded-lg bg-muted" />

            <div className="h-52 rounded-3xl bg-muted" />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl bg-muted"
                />
              ))}
            </div>

            <div className="h-80 rounded-3xl bg-muted" />

            <div className="h-72 rounded-3xl bg-muted" />

            <div className="h-72 rounded-3xl bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  // =============================
  // NOT FOUND
  // =============================

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <CircleAlert size={24} />
          </div>

          <h2 className="text-xl font-semibold">
            Resume analysis not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find the resume analysis you're
            looking for.
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

  // =============================
  // DATA
  // =============================

  const atsScore = data.atsScore ?? 0;

  const sectionScores = data.sectionScores || {};

  const strengths = Array.isArray(data.strengths)
    ? data.strengths
    : [];

  const improvements = Array.isArray(data.improvements)
    ? data.improvements
    : [];

  const missingKeywords = Array.isArray(data.missingKeywords)
  ? data.missingKeywords
  : [];

  const atsStyle = getAtsStyle(atsScore);

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : "—";

  // =============================
  // SECTION SCORE DATA
  // =============================

  const scoreSections = [
    {
      key: "formatting",
      label: "Formatting",
      icon: FileText,
    },
    {
      key: "keywords",
      label: "Keywords",
      icon: Search,
    },
    {
      key: "experience",
      label: "Experience",
      icon: TrendingUp,
    },
    {
      key: "projects",
      label: "Projects",
      icon: BarChart3,
    },
    {
      key: "skills",
      label: "Skills",
      icon: Target,
    },
    {
      key: "education",
      label: "Education",
      icon: Award,
    },
    {
      key: "grammar",
      label: "Grammar",
      icon: CheckCircle2,
    },
  ];

  // =============================
  // AVERAGE SCORE
  // =============================

  const scores = Object.values(sectionScores);

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce(
            (total, score) => total + Number(score),
            0
          ) / scores.length
        ).toFixed(1)
      : "0";

  // =============================
  // UI
  // =============================

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

            Back to Resumes
          </Button>

          <span className="hidden text-sm text-muted-foreground sm:block">
            Resume Analysis Report
          </span>

        </div>

        {/* ========================================
            RESUME OVERVIEW
        ======================================== */}

        <section className="mb-5 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              {/* LEFT */}

              <div className="min-w-0">

                <div className="mb-4 flex flex-wrap items-center gap-2">

                  {/* Resume */}

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Resume
                  </span>

                  {/* ATS */}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${atsStyle.bg} ${atsStyle.text}`}
                  >
                    ATS {atsScore}/100
                  </span>

                  {/* Status */}

                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={13} />
                    Analyzed
                  </span>

                </div>

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Resume Analysis
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Review your ATS compatibility, resume
                  strengths, missing keywords, and AI-powered
                  improvement recommendations.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">

                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {formattedDate}
                  </span>

                  <span className="flex items-center gap-2">
                    <FileText size={15} />
                    Resume Report
                  </span>

                </div>

              </div>

              {/* ATS SCORE */}

              <div className="flex shrink-0 items-center gap-4">

                <div
                  className={`flex h-28 w-28 flex-col items-center justify-center rounded-3xl ${atsStyle.bg} ring-1 ${atsStyle.border}`}
                >

                  <span
                    className={`text-4xl font-bold tracking-tight ${atsStyle.text}`}
                  >
                    {atsScore}
                  </span>

                  <span className="mt-0.5 text-xs text-muted-foreground">
                    out of 100
                  </span>

                </div>

                <div className="hidden sm:block">

                  <p className="text-sm font-semibold">
                    ATS Score
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium ${atsStyle.text}`}
                  >
                    {atsStyle.label}
                  </p>

                  <p className="mt-1 max-w-[150px] text-xs leading-5 text-muted-foreground">
                    Resume compatibility with applicant
                    tracking systems.
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
            icon={<ShieldCheck size={18} />}
            label="ATS Score"
            value={`${atsScore}/100`}
          />

          <StatCard
            icon={<BarChart3 size={18} />}
            label="Section Average"
            value={`${averageScore}/10`}
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="Strengths"
            value={strengths.length}
          />

          <StatCard
            icon={<CircleAlert size={18} />}
            label="Improvements"
            value={improvements.length}
          />

        </section>

        {/* ========================================
            ANALYSIS SUMMARY
        ======================================== */}

        <section className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">

          <div className="mb-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles
                  size={19}
                  className="text-primary"
                />
              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Analysis Summary
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Overall assessment of your resume.
                </p>

              </div>

            </div>

          </div>

          {/* Summary */}

          <div className="rounded-2xl border border-border bg-muted/20 p-5">

            <p className="text-sm leading-7 text-muted-foreground">
              {data.summary || "No summary available."}
            </p>

          </div>

          {/* ATS Progress */}

          <div className="mt-7">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-sm font-medium">
                ATS Compatibility
              </span>

              <span
                className={`text-sm font-semibold ${atsStyle.text}`}
              >
                {atsScore}%
              </span>

            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-muted">

              <div
                className={`h-full rounded-full ${atsStyle.progress} transition-all duration-700`}
                style={{
                  width: `${Math.min(
                    Math.max(atsScore, 0),
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </section>

        {/* ========================================
            SECTION SCORES
        ======================================== */}

        <section className="mb-8">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Section Scores
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Performance breakdown across different parts
              of your resume.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {scoreSections.map((section) => {

              const score =
                sectionScores[section.key] ?? 0;

              const style = getScoreStyle(score);

              const Icon = section.icon;

              return (
                <div
                  key={section.key}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.bg}`}
                    >
                      <Icon
                        size={17}
                        className={style.text}
                      />
                    </div>

                    <div className="text-right">

                      <span
                        className={`text-2xl font-bold ${style.text}`}
                      >
                        {score}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        /10
                      </span>

                    </div>

                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    {section.label}
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">

                    <div
                      className={`h-full rounded-full ${style.progress}`}
                      style={{
                        width: `${Math.min(
                          Math.max(score * 10, 0),
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ========================================
            STRENGTHS + MISSING KEYWORDS
        ======================================== */}

        <section className="mb-8 grid gap-6 lg:grid-cols-2">

          {/* =====================================
              STRENGTHS
          ===================================== */}

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-7">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2
                  size={19}
                  className="text-emerald-500"
                />
              </div>

              <div>

                <h2 className="font-semibold">
                  Resume Strengths
                </h2>

                <p className="text-xs text-muted-foreground">
                  What's working well
                </p>

              </div>

            </div>

            <div className="space-y-3">

              {strengths.length > 0 ? (
                strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-4"
                  >

                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <p className="text-sm leading-6">
                      {strength}
                    </p>

                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No strengths available.
                </p>
              )}

            </div>

          </div>

          {/* =====================================
              MISSING KEYWORDS
          ===================================== */}

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-7">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <Search
                  size={19}
                  className="text-amber-500"
                />
              </div>

              <div>

                <h2 className="font-semibold">
                  Missing Keywords
                </h2>

                <p className="text-xs text-muted-foreground">
                  Keywords that could improve ATS matching
                </p>

              </div>

            </div>

            {missingKeywords?.length > 0 ? (
              <div className="flex flex-wrap gap-3">

                {missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}

              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No missing keywords detected.
              </p>
            )}

            <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-4">

              <div className="flex gap-3">

                <Lightbulb
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <p className="text-xs leading-5 text-muted-foreground">
                  Add these keywords naturally only when they
                  accurately represent your skills or
                  experience.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ========================================
            IMPROVEMENTS
        ======================================== */}

        <section className="mb-8">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Areas to Improve
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              AI recommendations for making your resume
              stronger.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {improvements.length > 0 ? (
              improvements.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Lightbulb
                        size={18}
                        className="text-primary"
                      />
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center md:col-span-2">

                <p className="text-sm text-muted-foreground">
                  No improvement recommendations available.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* ========================================
            FINAL RECOMMENDATION
        ======================================== */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.03]">

          {/* Header */}

          <div className="border-b border-primary/10 bg-primary/[0.04] px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles
                  size={19}
                  className="text-primary"
                />
              </div>

              <div>

                <h2 className="font-semibold">
                  Final Recommendation
                </h2>

                <p className="text-xs text-muted-foreground">
                  Your next steps for improving the resume
                </p>

              </div>

            </div>

          </div>

          {/* Content */}

          <div className="p-6 md:p-7">

            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <h3 className="text-lg font-bold">
                  Your resume has a strong foundation.
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                  With an ATS score of{" "}
                  <span className="font-semibold text-foreground">
                    {atsScore}/100
                  </span>
                  , your resume is already reasonably
                  optimized for applicant tracking systems.
                  Focus on the identified improvement areas,
                  especially quantified achievements and
                  role-specific keywords, to make your resume
                  more competitive.
                </p>

              </div>

              <div
                className={`flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border ${atsStyle.border} ${atsStyle.bg}`}
              >

                <span
                  className={`text-3xl font-black ${atsStyle.text}`}
                >
                  {atsScore}
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  ATS Score
                </span>

              </div>

            </div>

            {/* Recommendation Steps */}

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <RecommendationCard
                number="01"
                title="Quantify"
                description="Add measurable results to your experience and projects."
              />

              <RecommendationCard
                number="02"
                title="Optimize"
                description="Add relevant keywords from your target job descriptions."
              />

              <RecommendationCard
                number="03"
                title="Strengthen"
                description="Use stronger action verbs and highlight project impact."
              />

            </div>

          </div>

        </section>

        {/* ========================================
            BOTTOM
        ======================================== */}

        <div className="flex justify-center py-4 pb-10">

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
   RECOMMENDATION CARD
======================================== */

function RecommendationCard({
  number,
  title,
  description,
}) {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">

      <div className="flex items-center gap-2">

        <span className="text-xs font-bold text-primary">
          {number}
        </span>

        <p className="text-xs font-semibold">
          {title}
        </p>

      </div>

      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {description}
      </p>

    </div>
  );
}