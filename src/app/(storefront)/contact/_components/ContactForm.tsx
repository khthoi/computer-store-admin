"use client";

import { useState } from "react";
import { Input } from "@/src/components";
import { Textarea } from "@/src/components";
import { Button } from "@/src/components";
import { Select } from "@/src/components";

interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const SUBJECT_OPTIONS = [
  { value: "tu-van-san-pham", label: "Tư vấn sản phẩm / cấu hình" },
  { value: "don-hang", label: "Hỏi về đơn hàng" },
  { value: "bao-hanh", label: "Bảo hành / sửa chữa" },
  { value: "doi-tra", label: "Đổi trả hàng" },
  { value: "hop-tac", label: "Hợp tác kinh doanh" },
  { value: "khac", label: "Khác" },
];

function validate(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Vui lòng nhập họ và tên";
  if (!values.email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Email không hợp lệ";
  }
  if (values.phone && !/^(0|\+84)[0-9]{8,10}$/.test(values.phone.replace(/\s/g, ""))) {
    errors.phone = "Số điện thoại không hợp lệ";
  }
  if (!values.subject) errors.subject = "Vui lòng chọn chủ đề";
  if (!values.message.trim()) {
    errors.message = "Vui lòng nhập nội dung";
  } else if (values.message.trim().length < 20) {
    errors.message = "Nội dung quá ngắn (tối thiểu 20 ký tự)";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(field: keyof ContactFormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");
    // Simulated submission — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success-200 bg-success-50 p-8 text-center">
        <p className="text-3xl mb-3">✓</p>
        <h3 className="text-lg font-semibold text-success-800 mb-2">Gửi thành công!</h3>
        <p className="text-success-700 text-sm">
          Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong vòng 1–2 giờ làm việc.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setValues({ fullName: "", email: "", phone: "", subject: "", message: "" });
          }}
          className="mt-4 text-sm text-success-700 underline hover:no-underline"
        >
          Gửi tin nhắn khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Họ và tên *"
          placeholder="Nguyễn Văn A"
          value={values.fullName}
          onChange={handleChange("fullName")}
          errorMessage={errors.fullName}
        />
        <Input
          label="Email *"
          type="email"
          placeholder="email@example.com"
          value={values.email}
          onChange={handleChange("email")}
          errorMessage={errors.email}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Số điện thoại (tuỳ chọn)"
          placeholder="0901 234 567"
          value={values.phone}
          onChange={handleChange("phone")}
          errorMessage={errors.phone}
        />
        <Select
          label="Chủ đề *"
          options={SUBJECT_OPTIONS}
          value={values.subject}
          onChange={(v) => {
            setValues((prev) => ({ ...prev, subject: v as string }));
            if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
          }}
          placeholder="Chọn chủ đề..."
          errorMessage={errors.subject}
        />
      </div>
      <Textarea
        label="Nội dung *"
        placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
        value={values.message}
        onChange={handleChange("message")}
        errorMessage={errors.message}
        autoResize
        showCharCount
        maxCount={1000}
      />
      {status === "error" && (
        <p className="text-sm text-error-600">
          Gửi tin nhắn thất bại. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={status === "loading"}
        className="w-full"
      >
        Gửi tin nhắn
      </Button>
    </form>
  );
}
