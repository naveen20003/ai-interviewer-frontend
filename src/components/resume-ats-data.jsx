import { Separator } from "./ui/separator";

function ResumeEvaluation({ analysis }) {
    // console.log("analysis in child component: ", analysis);
    
    
return (
  <div className="w-full max-w-3xl space-y-6">
    {/* ATS Score */}
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            ATS Score
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight">
            {analysis.ats_score}
            <span className="ml-1 text-lg font-medium text-muted-foreground">
              /100
            </span>
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <span className="text-lg font-bold text-primary">
            {analysis.ats_score}%
          </span>
        </div>
      </div>
    </div>

    {/* Summary */}
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold">Summary</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {analysis.summary}
      </p>
    </div>

    {/* Strengths */}
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold">Strengths</h3>

      <ul className="mt-4 space-y-3">
        {analysis.strengths.map((strength, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-lg bg-muted/40 p-3 text-sm"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓
            </span>

            <span className="leading-5 text-muted-foreground">
              {strength}
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* Improvements */}
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold">Areas for Improvement</h3>

      <div className="mt-4 space-y-3">
        {analysis.improvements.map((improvement, index) => (
          <div
            key={index}
            className="rounded-lg border bg-muted/20 p-4"
          >
            <h4 className="font-medium">
              {improvement.title}
            </h4>

            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              {improvement.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Section Scores */}
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          Section Scores
        </h3>

        <span className="text-xs text-muted-foreground">
          Resume breakdown
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Object.entries(analysis.section_scores).map(
          ([section, score]) => (
            <div
              key={section}
              className="rounded-lg border bg-muted/20 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm capitalize text-muted-foreground">
                  {section}
                </span>

                <span className="text-sm font-semibold">
                  {score}/100
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${Math.min(Math.max(score, 0), 100)}%`,
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>

    {/* Missing Keywords */}
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          Missing Keywords
        </h3>

        <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
          {analysis.missing_keywords.length} missing
        </span>
      </div>

      {analysis.missing_keywords.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.missing_keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-md border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No important keywords are missing.
        </p>
      )}
    </div>
  </div>
);


}

export default ResumeEvaluation;