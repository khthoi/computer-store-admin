// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductCardSkeletonProps {
  /**
   * Number of skeleton cards to render side by side.
   * @default 1
   */
  count?: number;
  className?: string;
}

// ─── Shimmer primitive ────────────────────────────────────────────────────────

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={["rounded bg-secondary-200 animate-pulse", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}

// ─── Single skeleton card ─────────────────────────────────────────────────────

function SingleSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-secondary-200 bg-white"
      aria-hidden="true"
    >
      {/* Thumbnail */}
      <Shimmer className="aspect-square w-full rounded-none" />

      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Brand badge */}
        <Shimmer className="h-4 w-14 rounded" />

        {/* Product name — two lines */}
        <div className="flex flex-col gap-1.5">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-3/4" />
        </div>

        {/* Description */}
        <Shimmer className="h-3 w-2/3" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-8" />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1 mt-auto">
          <Shimmer className="h-5 w-28" />
          <Shimmer className="h-3 w-20" />
        </div>

        {/* Stock badge */}
        <Shimmer className="h-4 w-16 rounded-full" />

        {/* Action row — two icon buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-secondary-100 mt-1">
          <Shimmer className="h-9 w-9 rounded-lg" />
          <Shimmer className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProductCardSkeleton — loading placeholder matching the ProductCard layout.
 *
 * ```tsx
 * // Single placeholder
 * <ProductCardSkeleton />
 *
 * // Grid of 5 placeholders
 * <div className="grid grid-cols-5 gap-3">
 *   <ProductCardSkeleton count={5} />
 * </div>
 * ```
 */
export function ProductCardSkeleton({
  count = 1,
  className = "",
}: ProductCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          role="status"
          aria-busy="true"
          aria-label="Loading product"
          className={className}
        >
          <SingleSkeleton />
          <span className="sr-only">Đang tải…</span>
        </div>
      ))}
    </>
  );
}
