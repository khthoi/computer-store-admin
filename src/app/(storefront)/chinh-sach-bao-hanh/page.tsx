import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/src/lib/routes";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Hành | TechStore",
  description:
    "Chính sách bảo hành toàn diện tại TechStore: thời hạn bảo hành theo từng loại linh kiện, quy trình tiếp nhận và điều kiện áp dụng.",
};

const TOC = [
  { id: "tong-quan", label: "1. Tổng quan chính sách" },
  { id: "thoi-han", label: "2. Thời hạn bảo hành theo sản phẩm" },
  { id: "dieu-kien", label: "3. Điều kiện được bảo hành" },
  { id: "khong-bao-hanh", label: "4. Trường hợp không được bảo hành" },
  { id: "quy-trinh", label: "5. Quy trình tiếp nhận bảo hành" },
  { id: "thoi-gian-xu-ly", label: "6. Thời gian xử lý" },
  { id: "bao-hanh-tai-nha", label: "7. Bảo hành tại nhà" },
  { id: "lien-he", label: "8. Liên hệ bảo hành" },
];

const WARRANTY_TABLE = [
  { category: "CPU (Intel, AMD)", duration: "36 tháng", note: "Bảo hành chính hãng qua nhà phân phối" },
  { category: "Card đồ hoạ (GPU)", duration: "36 tháng", note: "Bảo hành chính hãng" },
  { category: "Bo mạch chủ", duration: "36 tháng", note: "Bảo hành chính hãng" },
  { category: "RAM", duration: "36 tháng", note: "Bảo hành chính hãng, nhiều hãng BH trọn đời" },
  { category: "Ổ cứng SSD (NVMe / SATA)", duration: "36–60 tháng", note: "Theo chính sách từng hãng" },
  { category: "Ổ cứng HDD", duration: "24 tháng", note: "Bảo hành chính hãng" },
  { category: "Nguồn điện (PSU)", duration: "36–120 tháng", note: "Dòng cao cấp BH lên đến 10 năm" },
  { category: "Vỏ case máy tính", duration: "12–24 tháng", note: "Bảo hành chính hãng" },
  { category: "Tản nhiệt CPU / AIO", duration: "24–36 tháng", note: "Bảo hành chính hãng" },
  { category: "Màn hình", duration: "24–36 tháng", note: "Bao gồm lỗi điểm chết" },
  { category: "Bàn phím / Chuột", duration: "12–24 tháng", note: "Bảo hành chính hãng" },
  { category: "Thiết bị mạng", duration: "24 tháng", note: "Bảo hành chính hãng" },
];

export default function ChinhSachBaoHanhPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Chính sách bảo hành</h1>
      <p className="text-slate-500 text-sm mb-10">
        Cập nhật lần cuối: tháng 01/2025 · Áp dụng cho tất cả sản phẩm mua tại TechStore
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
      <section id="tong-quan" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Tổng quan chính sách</h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          TechStore cam kết cung cấp dịch vụ bảo hành minh bạch, nhanh chóng và chuyên nghiệp cho
          toàn bộ sản phẩm mua tại hệ thống. Thời hạn bảo hành được tính từ ngày mua hàng ghi trên
          hoá đơn/phiếu bảo hành.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Trong thời hạn bảo hành, TechStore sẽ sửa chữa hoặc thay thế linh kiện/sản phẩm bị lỗi
          do nhà sản xuất miễn phí. Sản phẩm thay thế có chất lượng tương đương hoặc tốt hơn.
        </p>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 2 — Table */}
      <section id="thoi-han" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Thời hạn bảo hành theo sản phẩm</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-slate-700 font-semibold px-4 py-3 border border-slate-200">Loại sản phẩm</th>
                <th className="text-left text-slate-700 font-semibold px-4 py-3 border border-slate-200">Thời hạn BH</th>
                <th className="text-left text-slate-700 font-semibold px-4 py-3 border border-slate-200">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {WARRANTY_TABLE.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-3 border border-slate-200 text-slate-900 font-medium">{row.category}</td>
                  <td className="px-4 py-3 border border-slate-200 text-success-700 font-semibold">{row.duration}</td>
                  <td className="px-4 py-3 border border-slate-200 text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-500 text-xs mt-3">
          * Thời hạn bảo hành cụ thể được ghi trên phiếu bảo hành kèm theo sản phẩm.
        </p>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 3 */}
      <section id="dieu-kien" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">3. Điều kiện được bảo hành</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-success-600 shrink-0">✓</span>Sản phẩm còn trong thời hạn bảo hành theo hoá đơn mua hàng</li>
          <li className="flex gap-2"><span className="text-success-600 shrink-0">✓</span>Tem/seal bảo hành còn nguyên vẹn, chưa bị tác động</li>
          <li className="flex gap-2"><span className="text-success-600 shrink-0">✓</span>Lỗi phát sinh do nhà sản xuất (lỗi kỹ thuật, lỗi linh kiện)</li>
          <li className="flex gap-2"><span className="text-success-600 shrink-0">✓</span>Có phiếu bảo hành hoặc hoá đơn mua hàng tại TechStore</li>
          <li className="flex gap-2"><span className="text-success-600 shrink-0">✓</span>Sản phẩm không bị can thiệp sửa chữa bởi đơn vị ngoài</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 4 */}
      <section id="khong-bao-hanh" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Trường hợp không được bảo hành</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Hư hỏng do tác động vật lý: va đập, rơi vỡ, bẻ cong, ép mạnh</li>
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Hư hỏng do chất lỏng, ẩm ướt, oxi hoá</li>
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Hư hỏng do sử dụng sai nguồn điện, sét đánh</li>
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Tem/seal bảo hành bị rách, xé, tháo</li>
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Đã được sửa chữa bởi đơn vị không được uỷ quyền</li>
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Hao mòn tự nhiên theo thời gian (pin, bàn phím cơ...)</li>
          <li className="flex gap-2"><span className="text-error-500 shrink-0">✕</span>Lỗi do cài đặt phần mềm, driver không tương thích</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 5 */}
      <section id="quy-trinh" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Quy trình tiếp nhận bảo hành</h2>
        <ol className="space-y-3 text-slate-700 text-sm">
          {[
            "Liên hệ TechStore qua hotline 1800 6868 hoặc mở ticket tại tài khoản để được hướng dẫn",
            "Mang sản phẩm đến showroom gần nhất kèm phiếu bảo hành / hoá đơn",
            "Kỹ thuật viên kiểm tra, xác nhận lỗi và lập phiếu tiếp nhận bảo hành",
            "Nhận phiếu tiếp nhận có mã theo dõi — theo dõi trạng thái online hoặc qua SMS",
            "Nhận lại sản phẩm đã sửa chữa / thay thế, ký biên bản bàn giao",
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

      {/* Section 6 */}
      <section id="thoi-gian-xu-ly" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Thời gian xử lý</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span><strong>Đổi mới tại chỗ:</strong> 1–7 ngày (nếu còn hàng tồn kho)</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span><strong>Sửa chữa tại trung tâm:</strong> 5–15 ngày làm việc</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span><strong>Gửi về hãng:</strong> 15–30 ngày làm việc</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>TechStore hoàn trả chi phí vận chuyển bảo hành (chiều đi)</li>
        </ul>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 7 */}
      <section id="bao-hanh-tai-nha" className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">7. Bảo hành tại nhà</h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          Một số sản phẩm cao cấp được hỗ trợ bảo hành tại nhà (on-site warranty). Dịch vụ này
          được ghi rõ trên phiếu bảo hành hoặc trang mô tả sản phẩm. Kỹ thuật viên sẽ đến địa chỉ
          của bạn trong 1–2 ngày làm việc tại Hà Nội và TP.HCM.
        </p>
        <div className="border-t border-slate-200 my-8" />
      </section>

      {/* Section 8 */}
      <section id="lien-he" className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 mb-3">8. Liên hệ bảo hành</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Hotline bảo hành: <strong>1800 6868</strong> (miễn phí, 8:00–22:00)</li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Email: <strong>warranty@techstore.vn</strong></li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Mở ticket: <Link href={ROUTES.account.support} className="text-primary-600 hover:underline">Tài khoản → Hỗ trợ</Link></li>
          <li className="flex gap-2"><span className="text-primary-600 shrink-0">•</span>Showroom: <Link href={ROUTES.contact} className="text-primary-600 hover:underline">Xem địa chỉ showroom</Link></li>
        </ul>
      </section>
    </div>
  );
}
