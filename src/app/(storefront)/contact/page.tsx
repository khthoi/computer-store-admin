import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Liên Hệ | TechStore",
  description:
    "Liên hệ với TechStore để được tư vấn sản phẩm, hỗ trợ đơn hàng và bảo hành. Chúng tôi phản hồi trong vòng 1–2 giờ làm việc.",
};

const CONTACT_CHANNELS = [
  {
    icon: "📞",
    title: "Điện thoại",
    primary: "1800 6868",
    secondary: "Miễn phí · 8:00–22:00 mỗi ngày",
  },
  {
    icon: "✉️",
    title: "Email",
    primary: "support@techstore.vn",
    secondary: "Phản hồi trong 1–2 giờ làm việc",
  },
  {
    icon: "💬",
    title: "Live Chat",
    primary: "Chat trực tiếp",
    secondary: "Hỗ trợ ngay lập tức · 8:00–22:00",
  },
  {
    icon: "📍",
    title: "Showroom",
    primary: "123 Cầu Giấy, Hà Nội",
    secondary: "T2–CN 8:00–21:00",
  },
];

const OFFICES = [
  {
    city: "Hà Nội (Trụ sở chính)",
    address: "123 Đường Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy",
    phone: "(024) 3xxx xxxx",
    hours: "T2–CN: 8:00–21:00",
  },
  {
    city: "TP. Hồ Chí Minh",
    address: "456 Đường Nguyễn Thị Minh Khai, Phường 5, Quận 3",
    phone: "(028) 3xxx xxxx",
    hours: "T2–CN: 8:00–21:00",
  },
  {
    city: "Đà Nẵng",
    address: "789 Đường Nguyễn Văn Linh, Quận Hải Châu",
    phone: "(0236) 3xxx xxxx",
    hours: "T2–CN: 8:00–21:00",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">
            Liên hệ
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Chúng tôi luôn sẵn sàng hỗ trợ</h1>
          <p className="text-slate-600">
            Chọn kênh liên lạc phù hợp hoặc để lại tin nhắn — chúng tôi sẽ phản hồi sớm nhất có thể.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CONTACT_CHANNELS.map((ch) => (
            <div
              key={ch.title}
              className="bg-white rounded-xl border border-slate-200 p-5 text-center"
            >
              <span className="text-3xl">{ch.icon}</span>
              <h3 className="font-semibold text-slate-900 mt-2 mb-0.5">{ch.title}</h3>
              <p className="text-primary-600 font-medium text-sm">{ch.primary}</p>
              <p className="text-slate-500 text-xs mt-0.5">{ch.secondary}</p>
            </div>
          ))}
        </div>

        {/* Two-column: Form + Offices */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Gửi tin nhắn</h2>
            <p className="text-slate-500 text-sm mb-6">
              Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong 1–2 giờ làm việc.
            </p>
            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 rounded-lg" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Office locations */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Địa chỉ showroom</h2>
            {OFFICES.map((o) => (
              <div key={o.city} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{o.city}</h3>
                <div className="space-y-1">
                  <p className="text-slate-600 text-sm flex gap-2">
                    <span className="shrink-0">📍</span>
                    {o.address}
                  </p>
                  <p className="text-slate-600 text-sm flex gap-2">
                    <span className="shrink-0">📞</span>
                    {o.phone}
                  </p>
                  <p className="text-slate-600 text-sm flex gap-2">
                    <span className="shrink-0">🕐</span>
                    {o.hours}
                  </p>
                </div>
              </div>
            ))}

            {/* Response time note */}
            <div className="bg-primary-50 rounded-xl border border-primary-100 p-4">
              <p className="text-primary-800 text-sm font-medium mb-1">Thời gian phản hồi</p>
              <ul className="text-primary-700 text-sm space-y-1">
                <li>• Live chat: &lt; 5 phút</li>
                <li>• Điện thoại: ngay lập tức</li>
                <li>• Email / form: 1–2 giờ làm việc</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
