import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordPageInner } from "@/src/components/auth/ResetPasswordPageInner";
import { Spinner } from "@/src/components/ui/Spinner";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu",
  description: "Tạo mật khẩu mới cho tài khoản TechStore của bạn.",
};

export default function ResetPasswordPage() {
  return (
    // Suspense required because ResetPasswordPageInner uses useSearchParams()
    <Suspense
      fallback={
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-secondary-500">Đang tải…</p>
        </div>
      }
    >
      <ResetPasswordPageInner />
    </Suspense>
  );
}
