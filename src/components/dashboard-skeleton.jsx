export default function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 bg-background p-4 pt-0 md:p-6">

      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-40 animate-pulse rounded-md bg-muted md:h-9" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
            </div>

            <div className="mt-5 h-9 w-20 animate-pulse rounded bg-muted" />

            <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Interview */}
        <div className="rounded-2xl border bg-card shadow-sm lg:col-span-2">
          <div className="border-b p-6">
            <div className="h-5 w-36 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-44 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="ml-auto h-3 w-12 animate-pulse rounded bg-muted" />
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-2 w-full animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            </div>

            <div className="h-7 w-7 animate-pulse rounded bg-muted" />
          </div>

          <div className="mt-8 flex justify-center">
            <div className="h-40 w-40 animate-pulse rounded-full bg-muted" />
          </div>

          <div className="mx-auto mt-6 h-4 w-64 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <div className="mb-4 space-y-2">
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables */}
      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <div
          key={sectionIndex}
          className="rounded-2xl border bg-card shadow-sm"
        >
          <div className="flex items-center justify-between border-b p-6">
            <div className="space-y-2">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />
              <div className="h-4 w-64 animate-pulse rounded bg-muted" />
            </div>

            <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
          </div>

          <div className="overflow-hidden p-6">
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center gap-6"
                >
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}