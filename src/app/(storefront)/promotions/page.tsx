import { PromotionsPageInner } from "@/src/components/promotions/PromotionsPageInner";
import { FLASH_SALE, DEAL_GROUPS, DEAL_CATEGORY_META } from "./_mock_data";

export const dynamic = "force-dynamic";

/**
 * /promotions
 *
 * Server component — always fresh (force-dynamic).
 * Passes flash sale event and deal groups to the client inner component.
 */
export default function PromotionsPage() {
  return (
    <PromotionsPageInner
      flashSale={FLASH_SALE}
      dealGroups={DEAL_GROUPS}
      categoryMeta={DEAL_CATEGORY_META}
    />
  );
}
