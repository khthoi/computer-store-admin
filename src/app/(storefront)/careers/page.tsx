import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/src/lib/routes";

export const metadata: Metadata = {
  title: "Tuyển Dụng | TechStore",
  description:
    "Gia nhập đội ngũ TechStore — nơi bạn được làm việc với công nghệ tiên tiến, phát triển chuyên môn và đóng góp vào trải nghiệm mua sắm linh kiện máy tính hàng triệu người dùng.",
};

const BENEFITS = [
  { icon: "💰", title: "Lương cạnh tranh", description: "Review lương 2 lần/năm. Thưởng KPI, thưởng dự án." },
  { icon: "📚", title: "Học hỏi liên tục", description: "Ngân sách đào tạo cá nhân, tham gia hội thảo công nghệ." },
  { icon: "🏥", title: "Bảo hiểm sức khoẻ", description: "Gói bảo hiểm toàn diện cho nhân viên và người thân." },
  { icon: "🎮", title: "Văn hoá đam mê", description: "Không gian làm việc sáng tạo, team gaming hàng tháng." },
  { icon: "🕐", title: "Linh hoạt thời gian", description: "Remote hybrid, giờ làm linh hoạt theo khung core hours." },
  { icon: "🚀", title: "Thăng tiến nhanh", description: "Lộ trình sự nghiệp rõ ràng, cơ hội thăng tiến theo năng lực." },
];

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "internship";
  level: string;
  description: string;
  requirements: string[];
}

const JOBS: JobListing[] = [
  {
    id: "fe-001",
    title: "Frontend Engineer (React/Next.js)",
    department: "Kỹ thuật",
    location: "Hà Nội / Remote",
    type: "full-time",
    level: "Mid–Senior",
    description:
      "Xây dựng và tối ưu giao diện người dùng cho nền tảng e-commerce hàng triệu lượt truy cập mỗi tháng.",
    requirements: [
      "3+ năm kinh nghiệm React, TypeScript",
      "Kinh nghiệm với Next.js App Router",
      "Hiểu biết về Web Performance, Core Web Vitals",
      "Kinh nghiệm với TailwindCSS là lợi thế",
    ],
  },
  {
    id: "be-001",
    title: "Backend Engineer (NestJS)",
    department: "Kỹ thuật",
    location: "Hà Nội / Remote",
    type: "full-time",
    level: "Mid–Senior",
    description:
      "Thiết kế và phát triển các API RESTful cho hệ thống quản lý đơn hàng, tồn kho và thanh toán.",
    requirements: [
      "3+ năm kinh nghiệm Node.js, NestJS hoặc Express",
      "PostgreSQL, Redis",
      "Kinh nghiệm với microservices / event-driven architecture",
      "Kiến thức về bảo mật API (JWT, OAuth2)",
    ],
  },
  {
    id: "pm-001",
    title: "Product Manager",
    department: "Sản phẩm",
    location: "Hà Nội",
    type: "full-time",
    level: "Senior",
    description:
      "Dẫn dắt roadmap sản phẩm, làm việc liên chức năng với kỹ thuật, thiết kế và kinh doanh.",
    requirements: [
      "3+ năm kinh nghiệm Product Management trong e-commerce",
      "Kỹ năng phân tích dữ liệu (SQL, GA4, Mixpanel)",
      "Tư duy user-centric, kỹ năng viết PRD rõ ràng",
      "Tiếng Anh đọc/viết tốt",
    ],
  },
  {
    id: "cs-001",
    title: "Chuyên viên Tư vấn Kỹ thuật",
    department: "Chăm sóc Khách hàng",
    location: "Hà Nội / TP.HCM",
    type: "full-time",
    level: "Junior–Mid",
    description:
      "Tư vấn cấu hình PC, hỗ trợ khách hàng qua chat, phone và hệ thống ticket.",
    requirements: [
      "Kiến thức sâu về linh kiện máy tính (CPU, GPU, RAM, NVMe...)",
      "Kỹ năng giao tiếp tốt, kiên nhẫn với khách hàng",
      "Kinh nghiệm hỗ trợ kỹ thuật là lợi thế",
    ],
  },
  {
    id: "intern-001",
    title: "Frontend Intern",
    department: "Kỹ thuật",
    location: "Hà Nội",
    type: "internship",
    level: "Internship",
    description:
      "Thực tập 3–6 tháng, tham gia phát triển tính năng thực tế trên codebase production.",
    requirements: [
      "Đang học năm 3–4 ngành CNTT hoặc liên quan",
      "Biết HTML, CSS, JavaScript cơ bản",
      "Có kinh nghiệm React là lợi thế",
    ],
  },
];

const TYPE_LABELS: Record<JobListing["type"], string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  internship: "Thực tập",
};

const TYPE_COLORS: Record<JobListing["type"], string> = {
  "full-time": "bg-success-50 text-success-700",
  "part-time": "bg-warning-50 text-warning-700",
  internship: "bg-primary-50 text-primary-700",
};

export default function CareersPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
            Tuyển dụng
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Cùng nhau xây dựng tương lai công nghệ
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi đang tìm kiếm những người tài năng, đam mê công nghệ và muốn tạo ra sự khác
            biệt thực sự trong trải nghiệm mua sắm của hàng triệu người dùng.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          Tại sao chọn TechStore?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4"
            >
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-0.5">{b.title}</h3>
                <p className="text-slate-600 text-sm">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job listings */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Vị trí đang tuyển ({JOBS.length})
          </h2>
          <div className="space-y-5">
            {JOBS.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-slate-200 p-6 hover:border-primary-300 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {job.department} · {job.location} · {job.level}
                    </p>
                  </div>
                  <span
                    className={`self-start shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[job.type]}`}
                  >
                    {TYPE_LABELS[job.type]}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-3">{job.description}</p>
                <ul className="space-y-1 mb-4">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-slate-600 text-sm flex gap-2">
                      <span className="text-primary-600 mt-0.5 shrink-0">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${ROUTES.contact}?subject=Ứng tuyển: ${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Ứng tuyển ngay →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open application */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-10">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Không tìm thấy vị trí phù hợp?
          </h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            Hãy gửi CV của bạn cho chúng tôi — chúng tôi luôn chào đón những tài năng xuất sắc
            ngay cả khi chưa có vị trí mở phù hợp.
          </p>
          <Link
            href={`${ROUTES.contact}?subject=Ứng tuyển mở`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
          >
            Gửi hồ sơ ứng tuyển
          </Link>
        </div>
      </section>
    </div>
  );
}
