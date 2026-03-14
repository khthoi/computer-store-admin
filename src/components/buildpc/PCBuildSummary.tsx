"use client";

import { useCallback, type ReactNode } from "react";
import {
  ShoppingCartIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { formatVND } from "@/src/lib/format";
import type { CompatibilityStatus } from "./PCPartCard";
import type { CompatibilityIssue } from "./CompatibilityAlert";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BuildSlot {
  /** Machine-readable category (e.g. "cpu") */
  category: string;
  /** Human-readable label (e.g. "CPU") */
  categoryLabel: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Selected part — null/undefined means slot is empty */
  part?: {
    id: string;
    name: string;
    brand: string;
    thumbnail: string;
    price: number;
    compatibilityStatus?: CompatibilityStatus;
  } | null;
}

export interface PCBuildSummaryProps {
  /** All component slots in the build */
  slots: BuildSlot[];
  /**
   * List of detected compatibility issues to show in the summary header.
   * Pass an empty array for a clean build.
   */
  compatibilityIssues?: CompatibilityIssue[];
  /** Called when the user clicks "Add All to Cart" */
  onAddAllToCart?: () => void;
  /** Called when the user removes a part via the trash icon */
  onRemovePart?: (category: string) => void;
  /** Shows loading spinner on the CTA button */
  isAddingToCart?: boolean;
  /**
   * Optional name for the build (e.g. "Gaming Build #1").
   * Shown as the card heading.
   */
  buildName?: string;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const COMPAT_ICON: Record<CompatibilityStatus, ReactNode> = {
  compatible:   <CheckCircleIcon   className="w-4 h-4 text-success-500 shrink-0" aria-hidden="true" />,
  incompatible: <XCircleIcon       className="w-4 h-4 text-error-500 shrink-0" aria-hidden="true" />,
  warning:      <ExclamationCircleIcon className="w-4 h-4 text-warning-500 shrink-0" aria-hidden="true" />,
  unchecked:    null,
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PCBuildSummary — itemized bill-of-materials for the current PC build.
 * Shows all selected parts with prices, detects compatibility status,
 * calculates the total, and provides an "Add All to Cart" CTA.
 *
 * ```tsx
 * <PCBuildSummary
 *   buildName="Gaming Build"
 *   slots={buildSlots}
 *   compatibilityIssues={issues}
 *   onAddAllToCart={handleAddAllToCart}
 *   onRemovePart={(cat) => removePart(cat)}
 *   isAddingToCart={isLoading}
 * />
 * ```
 */
export function PCBuildSummary({
  slots,
  compatibilityIssues = [],
  onAddAllToCart,
  onRemovePart,
  isAddingToCart = false,
  buildName,
  className = "",
}: PCBuildSummaryProps) {
  const handleRemove = useCallback(
    (category: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemovePart?.(category);
    },
    [onRemovePart]
  );

  const selectedSlots = slots.filter((s) => s.part != null);
  const totalCost = selectedSlots.reduce((sum, s) => sum + (s.part?.price ?? 0), 0);
  const selectedCount = selectedSlots.length;
  const totalSlots = slots.length;

  const errorCount   = compatibilityIssues.filter((i) => i.severity === "error").length;
  const warningCount = compatibilityIssues.filter((i) => i.severity === "warning").length;
  const isClean      = compatibilityIssues.length === 0;
  const canAddToCart = selectedCount > 0 && errorCount === 0 && !isAddingToCart;

  return (
    <aside
      aria-label="PC build summary"
      className={[
        "flex flex-col rounded-xl border border-secondary-200 bg-white overflow-hidden shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-secondary-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-secondary-900">
            {buildName ?? "Build Summary"}
          </h2>
          <p className="mt-0.5 text-xs text-secondary-500">
            {selectedCount} of {totalSlots} components selected
          </p>
        </div>

        {/* Compatibility health indicator */}
        {selectedCount > 0 && (
          <div>
            {isClean ? (
              <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-700">
                <CheckBadgeIcon className="w-4 h-4" aria-hidden="true" />
                Compatible
              </span>
            ) : errorCount > 0 ? (
              <span className="flex items-center gap-1.5 rounded-full bg-error-50 px-3 py-1 text-xs font-semibold text-error-700">
                <XCircleIcon className="w-4 h-4" aria-hidden="true" />
                {errorCount} error{errorCount !== 1 ? "s" : ""}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700">
                <ExclamationTriangleIcon className="w-4 h-4" aria-hidden="true" />
                {warningCount} warning{warningCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Parts list ── */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">Selected PC components</caption>
          <thead className="bg-secondary-50">
            <tr className="border-b border-secondary-200">
              <th scope="col" className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-secondary-500">
                Component
              </th>
              <th scope="col" className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-secondary-500">
                Price
              </th>
              {onRemovePart && (
                <th scope="col" className="w-10 px-3 py-2.5">
                  <span className="sr-only">Remove</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {slots.map((slot) => {
              const hasPart = slot.part != null;
              const compatIcon = hasPart && slot.part?.compatibilityStatus
                ? COMPAT_ICON[slot.part.compatibilityStatus]
                : null;

              return (
                <tr
                  key={slot.category}
                  className={[
                    "transition-colors",
                    hasPart ? "hover:bg-secondary-50/60" : "",
                  ].join(" ")}
                >
                  {/* Category + part info */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* Category icon */}
                      {slot.icon && (
                        <span className="shrink-0 w-4 h-4 text-secondary-400" aria-hidden="true">
                          {slot.icon}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary-400">
                          {slot.categoryLabel}
                        </p>
                        {hasPart ? (
                          <div className="flex items-center gap-1.5 min-w-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={slot.part!.thumbnail}
                              alt={slot.part!.name}
                              className="h-7 w-7 shrink-0 rounded border border-secondary-100 object-contain bg-secondary-50 p-0.5"
                              loading="lazy"
                            />
                            <p className="truncate text-sm font-medium text-secondary-800">
                              {slot.part!.name}
                            </p>
                            {compatIcon}
                          </div>
                        ) : (
                          <p className="text-sm italic text-secondary-400">
                            Not selected
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-3 py-3 text-right">
                    {hasPart ? (
                      <span className="whitespace-nowrap text-sm font-semibold text-secondary-800">
                        {formatVND(slot.part!.price)}
                      </span>
                    ) : (
                      <span className="text-sm text-secondary-300">—</span>
                    )}
                  </td>

                  {/* Remove button */}
                  {onRemovePart && (
                    <td className="px-3 py-3">
                      {hasPart && (
                        <button
                          type="button"
                          aria-label={`Remove ${slot.categoryLabel}`}
                          onClick={handleRemove(slot.category)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-secondary-300 transition-colors hover:bg-error-50 hover:text-error-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-400"
                        >
                          <TrashIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Total + CTA ── */}
      <div className="flex flex-col gap-3 border-t border-secondary-200 px-5 py-4">
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 overflow-hidden rounded-full bg-secondary-100 h-1.5">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-500"
              style={{ width: `${(selectedCount / Math.max(1, totalSlots)) * 100}%` }}
              aria-label={`${selectedCount} of ${totalSlots} components selected`}
              role="progressbar"
              aria-valuenow={selectedCount}
              aria-valuemin={0}
              aria-valuemax={totalSlots}
            />
          </div>
          <span className="shrink-0 text-xs text-secondary-500">
            {selectedCount}/{totalSlots}
          </span>
        </div>

        {/* Total row */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary-700">
            Estimated Total
          </span>
          <span className="text-xl font-bold text-primary-700">
            {selectedCount > 0 ? formatVND(totalCost) : "—"}
          </span>
        </div>

        {/* Incompatibility notice */}
        {errorCount > 0 && (
          <p className="flex items-center gap-1.5 rounded-lg bg-error-50 px-3 py-2 text-xs font-medium text-error-700">
            <XCircleIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            Resolve {errorCount} compatibility error{errorCount !== 1 ? "s" : ""} before adding to cart.
          </p>
        )}

        {/* Add all to cart */}
        <button
          type="button"
          disabled={!canAddToCart}
          onClick={onAddAllToCart}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-150",
            canAddToCart
              ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800"
              : "cursor-not-allowed bg-secondary-100 text-secondary-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
          ].join(" ")}
        >
          {isAddingToCart ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                aria-hidden="true"
              />
              Adding to Cart…
            </>
          ) : (
            <>
              <ShoppingCartIcon className="w-4 h-4" aria-hidden="true" />
              Add All to Cart
              {selectedCount > 0 && (
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                  {selectedCount}
                </span>
              )}
            </>
          )}
        </button>

        <p className="text-center text-xs text-secondary-400">
          Parts will be added as individual items in your cart
        </p>
      </div>
    </aside>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name                  Type                     Default          Description
 * ──────────────────────────────────────────────────────────────────────────────
 * slots                 BuildSlot[]              required         All build component slots
 * compatibilityIssues   CompatibilityIssue[]     []               Detected issues (from validator)
 * onAddAllToCart        () => void               —                "Add All to Cart" callback
 * onRemovePart          (category: string)=>void —                Per-part remove callback
 * isAddingToCart        boolean                  false            Spinner on CTA button
 * buildName             string                   "Build Summary"  Card heading
 * className             string                   ""               Extra classes on root aside
 *
 * ─── BuildSlot ────────────────────────────────────────────────────────────────
 *
 * Name           Type              Required  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * category       string            yes       Machine-readable key (e.g. "cpu")
 * categoryLabel  string            yes       Display label (e.g. "CPU")
 * icon           ReactNode         no        Icon displayed in the row
 * part           object | null     no        Selected part (null = empty slot)
 */
