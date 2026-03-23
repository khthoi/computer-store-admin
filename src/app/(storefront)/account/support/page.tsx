import { SupportPageInner } from "@/src/components/account/support/SupportPageInner";
import {
  SUPPORT_TICKETS,
} from "@/src/app/(storefront)/account/support/_mock_data";
import { MOCK_ORDERS } from "@/src/app/(storefront)/account/orders/_mock_data";
import type { SelectOption } from "@/src/components/ui/Select";

export const dynamic = "force-dynamic";

/**
 * /account/support
 *
 * Server component — always fresh (force-dynamic).
 * Builds the order select options from MOCK_ORDERS and passes sorted tickets
 * to the client SupportPageInner component.
 */
export default function SupportPage() {
  const orderOptions: SelectOption[] = MOCK_ORDERS.map((o) => ({
    value: o.id,
    label: `${o.id} — ${o.items[0].name}${o.items.length > 1 ? ` +${o.items.length - 1} sản phẩm khác` : ""}`,
  }));

  const sorted = [...SUPPORT_TICKETS].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return <SupportPageInner tickets={sorted} orderOptions={orderOptions} />;
}
