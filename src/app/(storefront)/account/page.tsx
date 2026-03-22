import { redirect } from "next/navigation";

/** /account → redirect to /account/profile */
export default function AccountIndexPage() {
  redirect("/account/profile");
}
