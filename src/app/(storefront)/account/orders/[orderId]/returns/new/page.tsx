import { notFound } from "next/navigation";
import { ReturnRequestPageInner } from "@/src/components/account/returns/ReturnRequestPageInner";
import { RETURNABLE_ORDERS } from "@/src/app/(storefront)/account/returns/new/_mock_data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function ReturnRequestNewPage({ params }: Props) {
  const { orderId } = await params;

  const order = RETURNABLE_ORDERS.find((o) => o.id === orderId);
  if (!order) notFound();

  return <ReturnRequestPageInner order={order} />;
}
