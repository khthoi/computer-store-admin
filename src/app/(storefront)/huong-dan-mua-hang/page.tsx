import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/src/lib/routes";

export const metadata: Metadata = {
  title: "Hướng Dẫn Mua Hàng | TechStore",
  description:
    "Hướng dẫn chi tiết cách mua linh kiện máy tính tại TechStore: tìm sản phẩm, đặt hàng, thanh toán, theo dõi đơn hàng và nhận hàng.",
};

const TOC = [
  { id: "tim-kiem", label: "1. Tìm kiếm & chọn sản phẩm" },
  { id: "them-gio-hang", label: "2. Thêm vào giỏ hàng" },
  { id: "dat-hang", label: "3. Đặt hàng & nhập thông tin" },
  { id: "thanh-toan", label: "4. Phương thức thanh toán" },
  { id: "xac-nhan", label: "5. Xác nhận & theo dõi đơn" },
  { id: "giao-nhan", label: "6. Giao nhận hàng hoá" },
  { id: "kiem-tra", label: "7. Kiểm tra hàng khi nhận" },
  { id: "ho-tro", label: "8. Hỗ trợ sau mua" },
];

const PAYMENT_METHODS = [
  { method: "Thẻ ATM / Internet Banking", note: "Chấp nhận tất cả ngân hàng nội địa" },
  { method: "Thẻ Visa / Mastercard / JCB", note: "Thanh toán quốc tế, hỗ trợ 3D Secure" },
  { method: "Ví điện tử MoMo / ZaloPay / VNPay", note: "Thường có mã giảm giá đặc biệt" },
  { method: "Chuyển khoản ngân hàng", note: "Xử lý sau khi tiền về tài khoản" },
  { method: "Thanh toán khi nhận hàng (COD)", note: "Áp dụng cho đơn dưới 20 triệu VND" },
  { method: "Trả góp 0%", note: "Qua thẻ tín dụng hoặc công ty tài chính đối tác" },
];

export default function HuongDanMuaHangPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Hướng dẫn mua hàng</h1>
      <p className="text-slate-500 text-sm mb-10">
        Quy trình đặt hàng tại TechStore đơn giản, nhanh chóng và an toàn
      </p>

      {/* ToC */}
      <nav className="mb-10 rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold text-slate-700 mb-3">Nội dung</p>
        <ol className="space-y-1.5">
          {TOC.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Section 1 */}
      <section id="tim-kiem" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Tìm kiếm & chọn sản phẩm</h2>
        <p className="text-slate-700 mb-3 leading-relaxed">
          Bạn có thể tìm linh kiện theo nhiều cách:
        </p>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Dùng thanh tìm kiếm ở đầu trang — gõ tên CPU, GPU, RAM, bo mạch chủ...</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Duyệt theo danh mục: CPU · GPU · RAM · SSD · Mainboard · Nguồn · Case · Tản nhiệt</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Lọc theo hãng, mức giá, thông số kỹ thuật để thu hẹp kết quả</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Dùng tính năng <Link href={ROUTES.compare} className="text-primary-600 hover:underline">So sánh sản phẩm</Link> để chọn đúng linh kiện</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Dùng <Link href={ROUTES.buildPc} className="text-primary-600 hover:underline">Build PC</Link> để kiểm tra tương thích và đặt nguyên bộ</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 2 */}
      <section id="them-gio-hang" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Thêm vào giỏ hàng</h2>
        <p className="text-slate-700 mb-3 leading-relaxed">
          Khi đã tìm được sản phẩm phù hợp:
        </p>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Nhấn nút <strong>Thêm vào giỏ</strong> từ trang danh sách hoặc trang chi tiết sản phẩm</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Điều chỉnh số lượng trong giỏ hàng nếu cần</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Sản phẩm trong giỏ được lưu trữ — bạn có thể quay lại mua sau</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Dùng tính năng Wishlist để lưu sản phẩm theo dõi giá</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 3 */}
      <section id="dat-hang" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">3. Đặt hàng & nhập thông tin</h2>
        <ol className="space-y-3 text-slate-700 text-sm list-none">
          {[
            "Vào giỏ hàng, kiểm tra lại danh sách sản phẩm và tổng tiền",
            "Nhấn Tiến hành thanh toán — đăng nhập hoặc tiếp tục với tư cách khách",
            "Nhập địa chỉ giao hàng: tên người nhận, số điện thoại, địa chỉ chi tiết",
            "Chọn phương thức vận chuyển (tiêu chuẩn hoặc nhanh)",
            "Nhập mã giảm giá / điểm thưởng nếu có",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 4 — Payment table */}
      <section id="thanh-toan" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Phương thức thanh toán</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">
          TechStore hỗ trợ đa dạng hình thức thanh toán để đảm bảo sự tiện lợi:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-slate-700 font-semibold px-4 py-3 border border-slate-200">
                  Phương thức
                </th>
                <th className="text-left text-slate-700 font-semibold px-4 py-3 border border-slate-200">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_METHODS.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-3 border border-slate-200 text-slate-900 font-medium">
                    {p.method}
                  </td>
                  <td className="px-4 py-3 border border-slate-200 text-slate-600">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-500 text-xs mt-3">
          Tất cả giao dịch được mã hoá SSL 256-bit. TechStore không lưu thông tin thẻ của bạn.
        </p>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 5 */}
      <section id="xac-nhan" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Xác nhận & theo dõi đơn</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Sau khi đặt thành công, bạn nhận email xác nhận kèm mã đơn hàng</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Theo dõi trạng thái đơn tại <Link href={ROUTES.account.orders} className="text-primary-600 hover:underline">Tài khoản → Đơn hàng</Link></li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Thông báo SMS / email khi đơn được xác nhận, đang giao và đã giao</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Huỷ đơn miễn phí trong vòng 1 giờ đầu hoặc trước khi đơn được xử lý</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 6 */}
      <section id="giao-nhan" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Giao nhận hàng hoá</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span><strong>Giao hàng tiêu chuẩn:</strong> 2–5 ngày làm việc toàn quốc</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span><strong>Giao hàng nhanh:</strong> 1–2 ngày (nội thành HN, HCM)</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span><strong>Giao trong ngày:</strong> đặt trước 14:00 tại Hà Nội và TP.HCM</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Sản phẩm được đóng gói chắc chắn với xốp PE chuyên dụng</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Miễn phí giao hàng cho đơn từ 500.000 VND trở lên</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 7 */}
      <section id="kiem-tra" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">7. Kiểm tra hàng khi nhận</h2>
        <p className="text-slate-700 mb-3 leading-relaxed">
          Bạn có quyền kiểm tra hàng trước khi thanh toán (với COD). Lưu ý:
        </p>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Kiểm tra seal niêm phong hộp sản phẩm còn nguyên vẹn</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Kiểm tra số serial trên hộp khớp với phiếu bảo hành</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Nếu phát hiện hư hỏng khi vận chuyển: từ chối nhận và liên hệ ngay hotline</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Quay video unbox để có bằng chứng nếu cần khiếu nại</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 8 */}
      <section id="ho-tro" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">8. Hỗ trợ sau mua</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Xem chính sách bảo hành tại <Link href={ROUTES.chinhSachBaoHanh} className="text-primary-600 hover:underline">Chính sách bảo hành</Link></li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Xem chính sách đổi trả tại <Link href={ROUTES.chinhSachDoiTra} className="text-primary-600 hover:underline">Chính sách đổi trả</Link></li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Mở ticket hỗ trợ tại <Link href={ROUTES.account.support} className="text-primary-600 hover:underline">Tài khoản → Hỗ trợ</Link></li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Hotline: <strong>1800 6868</strong> (miễn phí, 8:00–22:00 mỗi ngày)</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-4 rounded-lg bg-primary-50 border border-primary-100 p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-primary-800 text-sm font-medium">
          Sẵn sàng bắt đầu? Khám phá hàng nghìn linh kiện chính hãng ngay hôm nay.
        </p>
        <Link
          href={ROUTES.products}
          className="shrink-0 inline-flex items-center px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
        >
          Xem sản phẩm →
        </Link>
      </div>
    </div>
  );
}
