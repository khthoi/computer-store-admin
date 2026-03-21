import { CartProvider } from "@/src/store/cart.store";
import { CheckoutProvider } from "@/src/store/checkout.store";
import { CheckoutPageInner } from "@/src/components/checkout/CheckoutPageInner";
import { MOCK_CART_ITEMS, MOCK_COUPONS } from "@/src/app/(storefront)/cart/_mock_data";
import {
  MOCK_SHIPPING_METHODS,
  MOCK_PAYMENT_METHODS,
  MOCK_SAVED_ADDRESSES,
  MOCK_APPLIED_COUPON,
} from "./_mock_data";

/**
 * /checkout — Shopping Checkout page.
 *
 * Server component (no "use client").
 * CartProvider re-initialises the existing cart state so coupon carry-over works.
 * CheckoutProvider owns step, form, shipping/payment selections.
 * All interactivity lives inside CheckoutPageInner (client boundary).
 */
export default function CheckoutPage() {
  return (
    <CartProvider initialItems={MOCK_CART_ITEMS} coupons={MOCK_COUPONS} initialAppliedCoupon={MOCK_APPLIED_COUPON}>
      <CheckoutProvider
        shippingMethods={MOCK_SHIPPING_METHODS}
        paymentMethods={MOCK_PAYMENT_METHODS}
        savedAddresses={MOCK_SAVED_ADDRESSES}
      >
        <CheckoutPageInner />
      </CheckoutProvider>
    </CartProvider>
  );
}
