import { Skeleton } from "@/src/components/ui/Skeleton";

export default function CareersLoading() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
          <Skeleton variant="text" className="h-4 w-24 mb-3" />
          <Skeleton variant="text" className="h-10 w-80 mb-4" />
          <Skeleton variant="text" className="h-4 w-full max-w-lg" />
          <Skeleton variant="text" className="h-4 w-4/5 max-w-lg mt-1" />
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
        <Skeleton variant="text" className="h-7 w-56 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <Skeleton variant="text" className="h-5 w-40 mb-2" />
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Job listings */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Skeleton variant="text" className="h-7 w-56 mb-8" />
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-6">
                <Skeleton variant="text" className="h-6 w-72 mb-1" />
                <Skeleton variant="text" className="h-4 w-48 mb-3" />
                <Skeleton variant="text" className="h-4 w-full mb-1" />
                <Skeleton variant="text" className="h-4 w-3/4 mb-3" />
                <Skeleton variant="text" className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
