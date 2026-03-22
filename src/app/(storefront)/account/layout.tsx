import type { ReactNode } from "react";
import { AccountSidebar } from "@/src/components/account/AccountSidebar";

interface AccountLayoutProps {
  children: ReactNode;
}

/**
 * Account section layout — shared sidebar (desktop) + mobile tab nav wrapper.
 * The sidebar is a server component; client interactivity lives in AccountSidebar.
 */
export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* ── Sidebar (desktop) / top nav (mobile) ── */}
          <AccountSidebar />

          {/* ── Page content ── */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
