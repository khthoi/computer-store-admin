import { notFound } from "next/navigation";
import { ReturnRequestPageInner } from "@/src/components/account/returns/ReturnRequestPageInner";
import { MOCK_ORDERS } from "@/src/app/(storefront)/account/orders/_mock_data";
import { RETURN_REQUESTS } from "@/src/app/(storefront)/account/returns/_mock_data";
import { getEligibleItems } from "@/src/lib/returns/eligibility";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function ReturnRequestNewPage({ params }: Props) {
  const { orderId } = await params;

  const order = MOCK_ORDERS.find((o) => o.id === orderId);
  if (!order || order.status !== "delivered") notFound();

  const existingRequests = RETURN_REQUESTS.filter(
    (r) => r.orderId === orderId
  );

  const eligibleItems = getEligibleItems(order.items, existingRequests);

  if (eligibleItems.length === 0) {
    return (
      <div className="rounded-2xl border border-secondary-200 bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-secondary-700">
          Tất cả sản phẩm trong đơn hàng này đã được yêu cầu đổi/trả.
        </p>
        <p className="mt-1 text-xs text-secondary-400">
          Vui lòng kiểm tra trạng thái yêu cầu hiện tại trong trang{" "}
          <a
            href="/account/returns"
            className="text-primary-600 underline underline-offset-2 hover:text-primary-700"
          >
            Đổi/Trả hàng
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <ReturnRequestPageInner order={order} eligibleItems={eligibleItems} />
  );
}
