import { Skeleton } from "@/src/components/ui/Skeleton";

export default function SupportTechnicalLoading() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton variant="text" className="h-4 w-32 mb-2" />
          <Skeleton variant="text" className="h-9 w-80 mb-2" />
          <Skeleton variant="text" className="h-4 w-96" />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center gap-2">
              <Skeleton variant="rectangular" className="h-8 w-8 rounded" />
              <Skeleton variant="text" className="h-4 w-16" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {Array.from({ length: 3 }).map((_, s) => (
              <div key={s}>
                <Skeleton variant="text" className="h-6 w-48 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <Skeleton variant="text" className="h-5 w-40" />
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-3/4" />
              <Skeleton variant="text" className="h-4 w-full" />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
              <Skeleton variant="text" className="h-5 w-36" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="text" className="h-4 w-40" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
