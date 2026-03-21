import { CartProvider } from "@/src/store/cart.store";
import { CartPageInner } from "@/src/components/cart/CartEmptyState";
import { MOCK_CART_ITEMS, MOCK_COUPONS } from "./_mock_data";

/**
 * /cart — Shopping Cart page.
 *
 * This is a server component (no "use client").
 * CartProvider is the client boundary — all interactivity lives inside it.
 * CartPageInner handles hydration state, empty state, and the full cart layout.
 *
 * MOCK_CART_ITEMS is passed as initialItems so the cart renders immediately
 * when localStorage is empty (first visit / cleared storage).
 */
export default function CartPage() {
  return (
    <CartProvider initialItems={MOCK_CART_ITEMS} coupons={MOCK_COUPONS}>
      <CartPageInner />
    </CartProvider>
  );
}
