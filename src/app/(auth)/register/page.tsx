import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterPageInner } from "@/src/components/auth/RegisterPageInner";
import { RegisterSkeleton } from "./loading";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản TechStore mới để bắt đầu mua sắm.",
};

interface RegisterPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { redirect } = await searchParams;
  const redirectTo = redirect ?? "/";

  return (
    <Suspense fallback={<RegisterSkeleton />}>
      <RegisterPageInner redirectTo={redirectTo} />
    </Suspense>
  );
}
