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

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Brand badge */}
        <Shimmer className="h-5 w-16" />

        {/* Product name — two lines */}
        <div className="flex flex-col gap-1.5">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-3/4" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Shimmer className="h-4 w-24" />
          <Shimmer className="h-4 w-10" />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <Shimmer className="h-6 w-32" />
          <Shimmer className="h-4 w-24" />
        </div>

        {/* Stock badge */}
        <Shimmer className="h-5 w-20 rounded-full" />

        {/* Add to cart button */}
        <Shimmer className="mt-auto h-10 w-full rounded-lg" />
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
 * // Grid of 4 placeholders
 * <div className="grid grid-cols-4 gap-4">
 *   <ProductCardSkeleton count={4} />
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
          <span className="sr-only">Loading…</span>
        </div>
      ))}
    </>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name       Type    Default  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * count      number  1        Number of skeleton cards to render
 * className  string  ""       Extra classes applied to each wrapper div
 */
