import { ReturnRequestList } from "@/src/components/account/returns/ReturnRequestList";
import { RETURN_REQUESTS } from "@/src/app/(storefront)/account/returns/_mock_data";
import { MOCK_ORDERS } from "@/src/app/(storefront)/account/orders/_mock_data";

export const dynamic = "force-dynamic";

export default function ReturnsPage() {
  const sorted = [...RETURN_REQUESTS].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold text-secondary-900">Yêu cầu đổi/trả</h1>
      <ReturnRequestList requests={sorted} orders={MOCK_ORDERS} />
    </div>
  );
}
