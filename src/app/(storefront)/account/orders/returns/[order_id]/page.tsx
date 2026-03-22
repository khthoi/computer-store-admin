import { notFound } from "next/navigation";
import { ReturnRequestDetailCard } from "@/src/components/account/returns/ReturnRequestDetailCard";
import {
  SUBMITTED_RETURN_REQUESTS,
  RETURNABLE_ORDERS,
} from "@/src/app/(storefront)/account/returns/new/_mock_data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ order_id: string }>;
}

export default async function ReturnRequestDetailPage({ params }: Props) {
  const { order_id } = await params;

  // Look up by order ID (orderId field), not by return request ID
  const request = SUBMITTED_RETURN_REQUESTS.find(
    (r) => r.orderId === order_id
  );
  if (!request) notFound();

  const order = RETURNABLE_ORDERS.find((o) => o.id === request.orderId);
  if (!order) notFound();

  return (
    <div className="rounded-2xl border border-secondary-200 bg-white">
      <ReturnRequestDetailCard request={request} order={order} />
    </div>
  );
}
