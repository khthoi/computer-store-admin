export const dynamic = "force-dynamic";

import { MOCK_ORDERS } from "@/src/app/(storefront)/account/orders/_mock_data";
import { OrderListPageInner } from "@/src/components/account/orders/OrderListPageInner";

export default function OrdersPage() {
  return <OrderListPageInner initialOrders={MOCK_ORDERS} />;
}
