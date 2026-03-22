import { MOCK_ADDRESSES } from "./_mock_data";
import { AddressPageInner } from "@/src/components/account/addresses/AddressPageInner";

export const dynamic = "force-dynamic";

export default function AddressesPage() {
  return <AddressPageInner initialAddresses={MOCK_ADDRESSES} />;
}
