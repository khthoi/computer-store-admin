import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPageInner } from "@/src/components/auth/LoginPageInner";
import { LoginSkeleton } from "./loading";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản TechStore của bạn.",
};

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect } = await searchParams;
  const redirectTo = redirect ?? "/";

  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginPageInner redirectTo={redirectTo} />
    </Suspense>
  );
}
