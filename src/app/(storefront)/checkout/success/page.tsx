export const dynamic = "force-dynamic";

import { SuccessPageInner } from "@/src/components/checkout/success/SuccessPageInner";
import { MOCK_ORDER, MOCK_RECOMMENDED_PRODUCTS } from "./_mock_data";

/**
 * /checkout/success — Order Confirmation page.
 *
 * Server component (no "use client").
 * Data is prop-drilled one level deep into SuccessPageInner (client boundary).
 * No provider/context needed — data is static mock for this demo.
 */
export default function CheckoutSuccessPage() {
  return (
    <SuccessPageInner
      order={MOCK_ORDER}
      recommendedProducts={MOCK_RECOMMENDED_PRODUCTS}
    />
  );
}
