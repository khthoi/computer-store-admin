import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/src/lib/routes";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | TechStore",
  description:
    "Tìm hiểu về TechStore — hành trình từ cửa hàng nhỏ đến hệ thống bán lẻ linh kiện máy tính hàng đầu Việt Nam, sứ mệnh và đội ngũ của chúng tôi.",
};

const STATS = [
  { value: "2015", label: "Năm thành lập" },
  { value: "50.000+", label: "Khách hàng tin dùng" },
  { value: "10.000+", label: "Sản phẩm chính hãng" },
  { value: "98%", label: "Tỷ lệ hài lòng" },
];

const VALUES = [
  {
    title: "Chính hãng 100%",
    description:
      "Toàn bộ sản phẩm được nhập khẩu trực tiếp từ nhà sản xuất hoặc nhà phân phối uỷ quyền. Chúng tôi cam kết không bán hàng giả, hàng nhái.",
    icon: "✓",
  },
  {
    title: "Tư vấn tận tâm",
    description:
      "Đội ngũ kỹ thuật viên có chuyên môn sâu sẵn sàng hỗ trợ bạn chọn cấu hình phù hợp nhu cầu và ngân sách — từ máy văn phòng đến PC gaming cao cấp.",
    icon: "💬",
  },
  {
    title: "Bảo hành minh bạch",
    description:
      "Chính sách bảo hành rõ ràng theo từng sản phẩm. Quy trình tiếp nhận nhanh, linh kiện thay thế chính hãng, cập nhật trạng thái theo thời gian thực.",
    icon: "🛡",
  },
  {
    title: "Giao hàng toàn quốc",
    description:
      "Hợp tác với các đối tác vận chuyển uy tín. Đóng gói chắc chắn với vật liệu chống sốc chuyên dụng, bảo đảm linh kiện đến tay bạn an toàn.",
    icon: "🚚",
  },
];

const MILESTONES = [
  {
    year: "2015",
    title: "Khởi nghiệp",
    description: "Mở cửa hàng đầu tiên tại Hà Nội với 200 SKU linh kiện máy tính.",
  },
  {
    year: "2017",
    title: "Mở rộng ra miền Nam",
    description: "Khai trương chi nhánh TP.HCM và ra mắt website thương mại điện tử.",
  },
  {
    year: "2019",
    title: "10.000 khách hàng",
    description: "Đạt mốc 10.000 khách hàng trung thành. Ra mắt chương trình tích điểm.",
  },
  {
    year: "2021",
    title: "Nền tảng Build PC",
    description: "Giới thiệu công cụ Build PC trực tuyến kiểm tra tương thích tự động.",
  },
  {
    year: "2023",
    title: "50.000 khách hàng",
    description: "Vượt mốc 50.000 khách hàng. Mở thêm trung tâm bảo hành tại Đà Nẵng.",
  },
  {
    year: "2025",
    title: "Nâng cấp toàn diện",
    description: "Ra mắt nền tảng mua sắm mới, tích hợp AI tư vấn cấu hình cá nhân hoá.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
            Về chúng tôi
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            TechStore — Nơi công nghệ gặp gỡ đam mê
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Từ năm 2015, chúng tôi đã đồng hành cùng hàng chục nghìn người dùng Việt Nam trong hành
            trình xây dựng hệ thống máy tính chất lượng, đáng tin cậy và phù hợp với ngân sách.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-600">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-primary-100 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Sứ mệnh của chúng tôi</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto text-center">
            Chúng tôi tin rằng mọi người đều xứng đáng sở hữu thiết bị công nghệ chất lượng cao với
            mức giá công bằng. TechStore cam kết cung cấp linh kiện máy tính chính hãng, dịch vụ tư
            vấn chuyên nghiệp và trải nghiệm mua sắm tối giản — để bạn có thể tập trung vào điều
            quan trọng: sáng tạo, làm việc và khám phá.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-xl border border-slate-200 p-6 flex gap-4"
            >
              <span className="text-2xl mt-0.5 shrink-0">{v.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">
            Hành trình phát triển
          </h2>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 hidden sm:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="sm:flex gap-6 items-start">
                  <div className="shrink-0 sm:w-20 text-right hidden sm:block">
                    <span className="inline-block bg-primary-50 text-primary-700 text-sm font-bold px-2 py-0.5 rounded">
                      {m.year}
                    </span>
                  </div>
                  <div className="relative sm:pl-6">
                    <div className="absolute -left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-600 hidden sm:block" />
                    <span className="sm:hidden inline-block bg-primary-50 text-primary-700 text-xs font-bold px-2 py-0.5 rounded mb-1">
                      {m.year}
                    </span>
                    <h3 className="font-semibold text-slate-900">{m.title}</h3>
                    <p className="text-slate-600 text-sm mt-0.5">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Sẵn sàng nâng cấp hệ thống?</h2>
        <p className="text-slate-600 mb-6">
          Khám phá hàng nghìn linh kiện chính hãng hoặc để đội ngũ chúng tôi tư vấn cấu hình phù hợp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={ROUTES.products}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
          >
            Xem sản phẩm
          </Link>
          <Link
            href={ROUTES.contact}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-medium transition-colors"
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </section>
    </div>
  );
}
