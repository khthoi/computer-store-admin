import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@computer-store/ui";
import { ROUTES } from "@/src/lib/routes";

export const metadata: Metadata = {
  title: "Câu Hỏi Thường Gặp (FAQ) | TechStore",
  description:
    "Giải đáp các câu hỏi thường gặp về đặt hàng, thanh toán, giao hàng, bảo hành, đổi trả và tài khoản tại TechStore.",
};

const FAQ_SECTIONS = [
  {
    title: "Đặt hàng & Thanh toán",
    items: [
      {
        value: "order-1",
        label: "Làm thế nào để đặt hàng tại TechStore?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Bạn có thể đặt hàng bằng cách: tìm sản phẩm → thêm vào giỏ hàng → nhấn &ldquo;Tiến hành thanh
            toán&rdquo; → điền thông tin giao hàng → chọn phương thức thanh toán → xác nhận đơn. Xem
            hướng dẫn chi tiết tại{" "}
            <Link href={ROUTES.huongDanMuaHang} className="text-primary-600 hover:underline">
              Hướng dẫn mua hàng
            </Link>
            .
          </p>
        ),
      },
      {
        value: "order-2",
        label: "TechStore hỗ trợ những phương thức thanh toán nào?",
        children: (
          <ul className="text-slate-700 text-sm space-y-1">
            <li>• Thẻ ATM / Internet Banking (tất cả ngân hàng nội địa)</li>
            <li>• Thẻ Visa / Mastercard / JCB</li>
            <li>• Ví điện tử: MoMo, ZaloPay, VNPay</li>
            <li>• Thanh toán khi nhận hàng (COD) — áp dụng đơn dưới 20 triệu VND</li>
            <li>• Trả góp 0% qua thẻ tín dụng hoặc công ty tài chính đối tác</li>
          </ul>
        ),
      },
      {
        value: "order-3",
        label: "Tôi có thể huỷ đơn hàng sau khi đặt không?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Bạn có thể huỷ đơn miễn phí trong vòng 1 giờ sau khi đặt hoặc trước khi đơn được xác
            nhận xử lý. Sau khoảng thời gian đó, nếu đơn đang được chuẩn bị hoặc đã giao cho
            shipper, bạn cần đợi nhận hàng rồi thực hiện trả hàng theo chính sách đổi trả.
          </p>
        ),
      },
      {
        value: "order-4",
        label: "Đơn hàng của tôi có được xuất hoá đơn VAT không?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Có. Bạn có thể yêu cầu xuất hoá đơn VAT khi đặt hàng bằng cách tích chọn &ldquo;Xuất hoá đơn
            VAT&rdquo; và điền thông tin doanh nghiệp. Hoá đơn điện tử sẽ được gửi qua email trong vòng
            1–3 ngày làm việc sau khi đơn hoàn thành.
          </p>
        ),
      },
    ],
  },
  {
    title: "Giao hàng & Vận chuyển",
    items: [
      {
        value: "ship-1",
        label: "Thời gian giao hàng là bao lâu?",
        children: (
          <ul className="text-slate-700 text-sm space-y-1">
            <li>• <strong>Nội thành Hà Nội / TP.HCM:</strong> giao trong ngày (đặt trước 14:00) hoặc 1–2 ngày</li>
            <li>• <strong>Các tỉnh thành khác:</strong> 2–5 ngày làm việc</li>
            <li>• <strong>Vùng sâu, vùng xa:</strong> 5–7 ngày làm việc</li>
          </ul>
        ),
      },
      {
        value: "ship-2",
        label: "Phí giao hàng được tính như thế nào?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Miễn phí giao hàng cho đơn từ 500.000 VND trở lên. Đơn dưới 500.000 VND phí ship dao
            động 20.000–40.000 VND tuỳ khoảng cách. Phí giao hàng nhanh (same-day) là 30.000–50.000
            VND tại Hà Nội và TP.HCM.
          </p>
        ),
      },
      {
        value: "ship-3",
        label: "Tôi có thể theo dõi đơn hàng ở đâu?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Đăng nhập vào tài khoản, vào{" "}
            <Link href={ROUTES.account.orders} className="text-primary-600 hover:underline">
              Tài khoản → Đơn hàng
            </Link>{" "}
            để xem trạng thái thời gian thực. Bạn cũng nhận thông báo qua SMS và email khi đơn được
            xác nhận, đang giao và đã giao.
          </p>
        ),
      },
    ],
  },
  {
    title: "Bảo hành & Đổi trả",
    items: [
      {
        value: "warranty-1",
        label: "Thời hạn bảo hành của sản phẩm là bao lâu?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Thời hạn bảo hành phụ thuộc vào từng loại sản phẩm — thường từ 12 đến 60 tháng. Xem chi
            tiết tại{" "}
            <Link href={ROUTES.chinhSachBaoHanh} className="text-primary-600 hover:underline">
              Chính sách bảo hành
            </Link>
            . Thời hạn cụ thể cũng được ghi trên phiếu bảo hành kèm theo sản phẩm.
          </p>
        ),
      },
      {
        value: "warranty-2",
        label: "Tôi muốn đổi trả sản phẩm, cần làm gì?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Liên hệ hotline 1800 6868 hoặc mở yêu cầu tại{" "}
            <Link href={ROUTES.account.returns} className="text-primary-600 hover:underline">
              Tài khoản → Đơn trả hàng
            </Link>{" "}
            trong thời hạn đổi trả. Cung cấp mã đơn hàng và mô tả vấn đề. Xem đầy đủ tại{" "}
            <Link href={ROUTES.chinhSachDoiTra} className="text-primary-600 hover:underline">
              Chính sách đổi trả
            </Link>
            .
          </p>
        ),
      },
      {
        value: "warranty-3",
        label: "Sản phẩm lỗi ngay sau khi nhận, tôi được hỗ trợ như thế nào?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Nếu sản phẩm bị lỗi kỹ thuật trong 30 ngày đầu, bạn được đổi mới 100% mà không cần
            chứng minh thêm. Liên hệ ngay hotline 1800 6868 để được hỗ trợ ưu tiên.
          </p>
        ),
      },
    ],
  },
  {
    title: "Tài khoản & Điểm thưởng",
    items: [
      {
        value: "account-1",
        label: "Làm thế nào để tạo tài khoản tại TechStore?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Nhấn nút &ldquo;Đăng ký&rdquo; ở góc trên bên phải hoặc vào{" "}
            <Link href={ROUTES.register} className="text-primary-600 hover:underline">
              trang đăng ký
            </Link>
            . Điền email, mật khẩu và xác minh email. Bạn cũng có thể đăng nhập nhanh qua Google,
            Facebook hoặc Zalo.
          </p>
        ),
      },
      {
        value: "account-2",
        label: "Chương trình điểm thưởng hoạt động như thế nào?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Mỗi 1.000 VND mua hàng bạn nhận 1 điểm thưởng. 100 điểm = 1.000 VND khấu trừ vào đơn
            hàng tiếp theo. Điểm có hiệu lực trong 12 tháng. Xem số dư và lịch sử điểm tại{" "}
            <Link href={ROUTES.account.points} className="text-primary-600 hover:underline">
              Tài khoản → Điểm thưởng
            </Link>
            .
          </p>
        ),
      },
      {
        value: "account-3",
        label: "Tôi quên mật khẩu, phải làm gì?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Vào trang{" "}
            <Link href={ROUTES.forgotPassword} className="text-primary-600 hover:underline">
              Quên mật khẩu
            </Link>
            , nhập địa chỉ email đã đăng ký. Bạn sẽ nhận link đặt lại mật khẩu trong vòng vài
            phút. Kiểm tra cả hộp thư Spam nếu không thấy email.
          </p>
        ),
      },
    ],
  },
  {
    title: "Sản phẩm & Kỹ thuật",
    items: [
      {
        value: "product-1",
        label: "Làm sao biết linh kiện có tương thích với nhau không?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Dùng công cụ{" "}
            <Link href={ROUTES.buildPc} className="text-primary-600 hover:underline">
              Build PC
            </Link>{" "}
            — hệ thống tự động kiểm tra tương thích giữa CPU, bo mạch chủ, RAM, nguồn và case. Bạn
            cũng có thể liên hệ kỹ thuật viên TechStore để được tư vấn trực tiếp.
          </p>
        ),
      },
      {
        value: "product-2",
        label: "Sản phẩm trên website có sẵn hàng không?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Trang sản phẩm hiển thị số lượng tồn kho theo thời gian thực. Sản phẩm gắn nhãn &ldquo;Hết
            hàng&rdquo; hiện không có sẵn — bạn có thể thêm vào Wishlist để nhận thông báo khi có hàng
            trở lại.
          </p>
        ),
      },
      {
        value: "product-3",
        label: "Hỗ trợ kỹ thuật sau mua ở đâu?",
        children: (
          <p className="text-slate-700 text-sm leading-relaxed">
            Bạn có thể tìm hướng dẫn tại{" "}
            <Link href={ROUTES.supportTechnical} className="text-primary-600 hover:underline">
              Hỗ trợ kỹ thuật
            </Link>
            , mở ticket tại{" "}
            <Link href={ROUTES.account.support} className="text-primary-600 hover:underline">
              Tài khoản → Hỗ trợ
            </Link>{" "}
            hoặc liên hệ hotline 1800 6868.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Câu hỏi thường gặp</h1>
      <p className="text-slate-500 text-sm mb-10">
        Không tìm thấy câu trả lời?{" "}
        <Link href={ROUTES.contact} className="text-primary-600 hover:underline">
          Liên hệ chúng tôi
        </Link>
      </p>

      {/* FAQ sections */}
      <div className="space-y-8">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {section.title}
            </h2>
            <Accordion
              items={section.items}
              variant="bordered"
              multiple
            />
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-12 rounded-xl bg-primary-50 border border-primary-100 p-6 text-center">
        <h3 className="font-semibold text-primary-900 mb-2">Vẫn còn thắc mắc?</h3>
        <p className="text-primary-700 text-sm mb-4">
          Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={ROUTES.contact}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
          >
            Gửi tin nhắn
          </Link>
          <a
            href="tel:18006868"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-primary-300 hover:border-primary-400 bg-white text-primary-700 text-sm font-medium transition-colors"
          >
            Gọi 1800 6868
          </a>
        </div>
      </div>
    </div>
  );
}
