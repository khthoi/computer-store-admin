"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowPathIcon,
  StarIcon,
  ArrowUturnLeftIcon,
  XCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/src/components/ui/Button";
import { OrderStatusBadge } from "@/src/components/account/orders/OrderStatusBadge";
import { OrderCancelModal } from "@/src/components/account/orders/OrderCancelModal";
import type { OrderSummary } from "@/src/app/(storefront)/account/orders/_mock_data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true when today is within `windowDays` days of `placedAt`. */
function isWithinReturnWindow(placedAt: string, windowDays: number): boolean {
  const placed = new Date(placedAt);
  const deadline = new Date(placed);
  deadline.setDate(deadline.getDate() + windowDays);
  return new Date() <= deadline;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("vi-VN") + "₫";
}

// Shared class strings that mirror Button sm-size variants (no asChild needed)
const LINK_BTN_BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "cursor-pointer select-none h-8 px-3 text-sm";

const LINK_BTN_GHOST =
  LINK_BTN_BASE +
  " bg-transparent text-secondary-600 hover:bg-secondary-100 active:bg-secondary-200 focus-visible:ring-secondary-400";

const LINK_BTN_OUTLINE =
  LINK_BTN_BASE +
  " bg-transparent text-primary-600 border border-primary-400 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500";

const LINK_BTN_PRIMARY =
  LINK_BTN_BASE +
  " bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface OrderCardProps {
  order: OrderSummary;
  onCancelSuccess: (id: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * OrderCard — summary card for a single order shown in the orders list.
 *
 * Action buttons:
 * - canCancel  → "Hủy đơn" (pending only)
 * - canReturn  → "Đổi/Trả" (delivered + within return window)
 * - canReview  → "Đánh giá" (delivered + not yet reviewed)
 * - canReorder → "Mua lại" (delivered or cancelled)
 */
export function OrderCard({ order, onCancelSuccess }: OrderCardProps) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const canCancel = order.status === "pending";
  const canReturn =
    order.status === "delivered" &&
    isWithinReturnWindow(order.placedAt, order.returnWindowDays);
  const canReview = order.status === "delivered" && !order.reviewed;
  const canReorder =
    order.status === "delivered" || order.status === "cancelled";

  const hasActions = canCancel || canReturn || canReview || canReorder;

  const handleCancelConfirm = async (_reason: string) => {
    setIsCancelling(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 800));
      setCancelModalOpen(false);
      onCancelSuccess(order.id);
    } finally {
      setIsCancelling(false);
    }
  };

  // Show at most 3 product thumbnails; remainder shown as "+N"
  const visibleItems = order.items.slice(0, 3);
  const extraCount = order.items.length - visibleItems.length;

  return (
    <>
      <article className="rounded-xl border border-secondary-200 bg-white overflow-hidden">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-secondary-100 px-4 py-3 bg-secondary-50">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-secondary-900">
              {order.id}
            </span>
            <span className="text-xs text-secondary-400">
              {formatDate(order.placedAt)}
            </span>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="px-4 py-4 space-y-3">
          {/* Product thumbnails + total */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="relative h-14 w-14 shrink-0 rounded-lg border border-secondary-100 overflow-hidden bg-secondary-50"
                >
                  <Image
                    src={item.thumbnailSrc}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  {item.quantity > 1 && (
                    <span className="absolute bottom-0 right-0 rounded-tl bg-black/60 px-1 text-[10px] font-medium text-white leading-4">
                      ×{item.quantity}
                    </span>
                  )}
                </div>
              ))}

              {extraCount > 0 && (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-secondary-200 bg-secondary-50 text-xs font-medium text-secondary-500">
                  +{extraCount}
                </div>
              )}
            </div>

            <div className="text-right shrink-0">
              <p className="text-base font-bold text-secondary-900">
                {formatCurrency(order.total)}
              </p>
              <p className="text-xs text-secondary-400">
                {order.itemCount} sản phẩm
              </p>
            </div>
          </div>

          {/* First product name summary */}
          <p className="text-sm text-secondary-600 line-clamp-1">
            {order.items[0].name}
            {order.items.length > 1 &&
              ` và ${order.items.length - 1} sản phẩm khác`}
          </p>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-secondary-100 px-4 py-3">
          <Link
            href={`/account/orders/${order.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Xem chi tiết
            <ChevronRightIcon className="h-4 w-4" />
          </Link>

          {hasActions && (
            <div className="flex flex-wrap items-center gap-2">
              {canCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCancelModalOpen(true)}
                >
                  <XCircleIcon className="h-4 w-4" />
                  Hủy đơn
                </Button>
              )}

              {canReturn && (
                <Link
                  href={`/account/orders/${order.id}?action=return`}
                  className={LINK_BTN_GHOST}
                >
                  <ArrowUturnLeftIcon className="h-4 w-4" />
                  Đổi/Trả
                </Link>
              )}

              {canReview && (
                <Link
                  href={`/account/orders/${order.id}?action=review`}
                  className={LINK_BTN_OUTLINE}
                >
                  <StarIcon className="h-4 w-4" />
                  Đánh giá
                </Link>
              )}

              {canReorder && (
                <Link
                  href={`/account/orders/${order.id}?action=reorder`}
                  className={LINK_BTN_PRIMARY}
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  Mua lại
                </Link>
              )}
            </div>
          )}
        </div>
      </article>

      {canCancel && (
        <OrderCancelModal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          onConfirm={handleCancelConfirm}
          isLoading={isCancelling}
        />
      )}
    </>
  );
}
