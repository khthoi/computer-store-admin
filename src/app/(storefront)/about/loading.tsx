import { Skeleton } from "@/src/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
          <Skeleton variant="text" className="h-4 w-24 mb-3" />
          <Skeleton variant="text" className="h-10 w-96 mb-4" />
          <Skeleton variant="text" className="h-4 w-full max-w-lg" />
          <Skeleton variant="text" className="h-4 w-5/6 max-w-lg mt-1" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-600 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton variant="text" className="h-10 w-20 bg-primary-400" />
                <Skeleton variant="text" className="h-3 w-28 bg-primary-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
        <Skeleton variant="text" className="h-7 w-48 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
              <Skeleton variant="text" className="h-5 w-40 mb-2" />
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-5/6 mt-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-t border-slate-200 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Skeleton variant="text" className="h-7 w-56 mx-auto mb-10" />
          <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-6">
                <Skeleton variant="text" className="h-6 w-16 shrink-0" />
                <div className="flex-1">
                  <Skeleton variant="text" className="h-5 w-40 mb-1" />
                  <Skeleton variant="text" className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
