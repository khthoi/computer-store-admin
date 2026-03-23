import { notFound } from "next/navigation";
import { ReturnRequestDetailCard } from "@/src/components/account/returns/ReturnRequestDetailCard";
import { RETURN_REQUESTS } from "@/src/app/(storefront)/account/returns/_mock_data";
import { MOCK_ORDERS } from "@/src/app/(storefront)/account/orders/_mock_data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ return_id: string }>;
}

export default async function ReturnRequestDetailPage({ params }: Props) {
  const { return_id } = await params;

  const request = RETURN_REQUESTS.find((r) => r.id === return_id);
  if (!request) notFound();

  const order = MOCK_ORDERS.find((o) => o.id === request.orderId);
  if (!order) notFound();

  return (
    <div className="rounded-2xl border border-secondary-200 bg-white">
      <ReturnRequestDetailCard request={request} order={order} />
    </div>
  );
}
