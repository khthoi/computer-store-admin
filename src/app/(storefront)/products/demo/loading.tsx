import { Skeleton } from "@/src/components/ui";
import { ProductCardSkeleton } from "@/src/components/product";

export default function ProductsDemoLoading() {
  return (
    <div className="py-6 space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-64" />

      {/* Title */}
      <Skeleton className="h-8 w-48" />

      {/* Sub-categories */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0">
            <Skeleton className="h-20 w-20 rounded-lg" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-full max-w-xl" />

      {/* Filter bar */}
      <div className="flex gap-3">
        <Skeleton className="h-9 w-28 rounded-lg" />
        <Skeleton className="h-9 w-28 rounded-lg" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>

      {/* Layout: sidebar + grid */}
      <div className="flex gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-[260px] shrink-0 space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="flex-1">
          <ProductCardSkeleton itemsPerView={6} />
        </div>
      </div>
    </div>
  );
}
