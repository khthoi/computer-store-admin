import { useMemo } from "react";
import type { CartItem, CouponCode } from "@/src/store/cart.store";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartPriceSummary {
  subtotal: number;
  savings: number;
  couponDiscount: number;
  shippingFee: number;
  total: number;
  billableCount: number;
  hasOOS: boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useCartPriceSummary — shared price calculation for /cart and /checkout.
 *
 * - When `selectedIds` is non-empty, only those items are included.
 * - When `selectedIds` is empty, all items are included.
 * - OOS items are always excluded from the price total.
 * - `shippingFee` is added to the final total (pass 0 for free shipping).
 */
export function useCartPriceSummary(
  items: CartItem[],
  selectedIds: Set<string>,
  appliedCoupon: CouponCode | null,
  shippingFee: number
): CartPriceSummary {
  return useMemo(() => {
    const relevant =
      selectedIds.size > 0
        ? items.filter((i) => selectedIds.has(i.id))
        : items;

    const billable = relevant.filter((i) => i.stockStatus !== "out-of-stock");

    const sub = billable.reduce(
      (sum, i) => sum + i.currentPrice * i.quantity,
      0
    );

    const saved = billable.reduce((sum, i) => {
      const delta = (i.originalPrice - i.currentPrice) * i.quantity;
      return sum + (delta > 0 ? delta : 0);
    }, 0);

    let couponDisc = 0;
    if (appliedCoupon) {
      couponDisc =
        appliedCoupon.type === "percent"
          ? Math.round((sub * appliedCoupon.value) / 100)
          : Math.min(appliedCoupon.value, sub);
    }

    return {
      subtotal: sub,
      savings: saved,
      couponDiscount: couponDisc,
      shippingFee,
      total: Math.max(0, sub - couponDisc + shippingFee),
      billableCount: billable.length,
      hasOOS: relevant.some((i) => i.stockStatus === "out-of-stock"),
    };
  }, [items, selectedIds, appliedCoupon, shippingFee]);
}
