import type { Metadata } from "next";
import { ForgotPasswordPageInner } from "@/src/components/auth/ForgotPasswordPageInner";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Đặt lại mật khẩu tài khoản TechStore của bạn.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordPageInner />;
}
