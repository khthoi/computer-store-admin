import { MOCK_PROFILE } from "./_mock_data";
import { ProfilePageInner } from "@/src/components/account/profile/ProfilePageInner";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return <ProfilePageInner profile={MOCK_PROFILE} />;
}
