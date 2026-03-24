import { Skeleton } from "@/src/components/ui/Skeleton";

export default function ChinhSachDoiTraLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton variant="text" className="h-9 w-64 mb-2" />
      <Skeleton variant="text" className="h-4 w-80 mb-10" />

      {/* ToC */}
      <div className="mb-10 rounded-lg border border-slate-200 bg-white p-5 space-y-2">
        <Skeleton variant="text" className="h-4 w-16 mb-3" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="text" className="h-4 w-60" />
        ))}
      </div>

      {/* Sections */}
      {Array.from({ length: 4 }).map((_, s) => (
        <div key={s} className="mt-10 space-y-3">
          <Skeleton variant="text" className="h-6 w-72 mb-3" />
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-4/5" />
          <div className="space-y-2 pl-3 mt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="h-4 w-3/4" />
            ))}
          </div>
          <div className="border-slate-200 my-8 border-t" />
        </div>
      ))}
    </div>
  );
}
