import { Spinner } from "@/src/components/ui/Spinner";

export default function ResetPasswordLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-secondary-500">Đang xác thực…</p>
      </div>
    </div>
  );
}
