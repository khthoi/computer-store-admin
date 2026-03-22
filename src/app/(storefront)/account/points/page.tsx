import { MOCK_POINTS } from "./_mock_data";
import { PointsPageInner } from "@/src/components/account/points/PointsPageInner";

export const dynamic = "force-dynamic";

export default function PointsPage() {
  return <PointsPageInner data={MOCK_POINTS} />;
}
