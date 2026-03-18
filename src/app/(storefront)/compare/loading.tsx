import { Skeleton } from "@/src/components/ui/Skeleton";

export default function ComparePageLoading() {
  return (
    <div className="min-h-screen">
      {/* ── CompareBar skeleton ── */}
      <div className="sticky top-16 z-30 border-b border-secondary-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-screen-xl items-center gap-3">
          {/* Mini product cards */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex h-20 w-40 shrink-0 items-center gap-2 rounded-xl border border-secondary-100 bg-secondary-50 p-2"
            >
              <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col gap-1.5">
                <Skeleton className="h-2.5 w-full rounded" />
                <Skeleton className="h-2.5 w-2/3 rounded" />
              </div>
            </div>
          ))}
          {/* Empty slot */}
          <Skeleton className="h-20 w-36 rounded-xl border-2 border-dashed border-secondary-200 bg-secondary-50" />
          {/* Clear button */}
          <Skeleton className="ml-auto h-8 w-24 rounded-lg" />
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Page header skeleton ── */}
        <div className="mb-6 flex flex-col gap-2">
          <Skeleton className="h-8 w-56 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded" />
        </div>

        {/* ── Table header: 3 product columns ── */}
        <div className="overflow-hidden rounded-xl border border-secondary-200">
          {/* Column headers */}
          <div className="flex border-b border-secondary-100">
            {/* Label column */}
            <div className="w-[200px] shrink-0 border-r border-secondary-100 bg-secondary-50 p-3" />
            {/* Product columns */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col gap-3 border-l border-secondary-100 p-4"
              >
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
                <Skeleton className="h-5 w-1/2 rounded" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
          </div>

          {/* Spec rows */}
          {/* Group header */}
          <Skeleton className="h-9 w-full rounded-none" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex border-b border-secondary-100">
              <div className="w-[200px] shrink-0 border-r border-secondary-100 px-4 py-3">
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex-1 border-l border-secondary-100 px-4 py-3">
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              ))}
            </div>
          ))}

          {/* Second group header */}
          <Skeleton className="h-9 w-full rounded-none" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex border-b border-secondary-100">
              <div className="w-[200px] shrink-0 border-r border-secondary-100 px-4 py-3">
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex-1 border-l border-secondary-100 px-4 py-3">
                  <Skeleton className="h-4 w-5/6 rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
