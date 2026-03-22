import {
  MOCK_ORDER_PENDING,
  MOCK_ORDER_SHIPPING,
  MOCK_ORDER_DELIVERED,
} from "./_mock_data";
import { OrderDetailPageInner } from "@/src/components/account/orders/OrderDetailPageInner";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ demo?: string }>;
}

/**
 * /account/orders/[orderId]
 *
 * Server component — always fresh (force-dynamic).
 *
 * Demo switcher via ?demo query param:
 *   (none) | ?demo=pending  → pending order  (cancel button visible)
 *   ?demo=shipping          → shipping order (tracking visible)
 *   ?demo=delivered         → delivered order (review + return buttons)
 */
export default async function OrderDetailPage({ params, searchParams }: Props) {
  const { orderId } = await params;
  const { demo } = await searchParams;

  const order =
    demo === "shipping"
      ? MOCK_ORDER_SHIPPING
      : demo === "delivered"
        ? MOCK_ORDER_DELIVERED
        : MOCK_ORDER_PENDING;

  // In a real app: fetch order by orderId from the API
  void orderId;

  return <OrderDetailPageInner order={order} />;
}
