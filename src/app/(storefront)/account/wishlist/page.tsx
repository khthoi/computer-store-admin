export const dynamic = "force-dynamic";

import { MOCK_WISHLIST } from "@/src/app/(storefront)/account/wishlist/_mock_data";
import { WishlistPageInner } from "@/src/components/account/wishlist/WishlistPageInner";

export default function WishlistPage() {
  return <WishlistPageInner initialItems={MOCK_WISHLIST} />;
}
