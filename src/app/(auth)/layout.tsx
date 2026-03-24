import type { ReactNode } from "react";
import Link from "next/link";
import { CpuChipIcon } from "@heroicons/react/24/solid";
import { ROUTES } from "@/src/lib/routes";

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * (auth) layout — minimal branded shell for Login, Register, Forgot/Reset Password.
 *
 * Intentionally excludes the main site Header and Footer so the auth flow
 * feels focused and distraction-free.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-50">
      {/* ── Auth content — vertically centered ── */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
