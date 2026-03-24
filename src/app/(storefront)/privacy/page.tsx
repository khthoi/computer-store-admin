import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Chính sách bảo mật của TechStore — cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi mua sắm linh kiện máy tính.",
};

const TOC = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "thong-tin-thu-thap", label: "Thông tin chúng tôi thu thập" },
  { id: "su-dung-thong-tin", label: "Cách chúng tôi sử dụng thông tin" },
  { id: "chia-se-thong-tin", label: "Chia sẻ thông tin" },
  { id: "cookie-theo-doi", label: "Cookie và công nghệ theo dõi" },
  { id: "bao-mat-du-lieu", label: "Bảo mật dữ liệu" },
  { id: "quyen-nguoi-dung", label: "Quyền của người dùng" },
  { id: "thay-doi-chinh-sach", label: "Thay đổi chính sách" },
  { id: "lien-he", label: "Liên hệ" },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Page header ── */}
      <h1 className="text-3xl font-bold text-secondary-900 mb-2">
        Chính sách bảo mật
      </h1>
      <p className="text-sm text-secondary-400 mb-10">
        Cập nhật lần cuối: 01 tháng 01, 2026
      </p>

      {/* ── Table of contents ── */}
      <nav aria-label="Mục lục" className="mb-10 rounded-lg border border-secondary-200 bg-white p-5">
        <p className="mb-3 text-sm font-semibold text-secondary-700">Mục lục</p>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-primary-600">
          {TOC.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── 1. Giới thiệu ── */}
      <h2 id="gioi-thieu" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        1. Giới thiệu
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật
        này giải thích rõ ràng loại thông tin chúng tôi thu thập, mục đích sử dụng, cách thức chia
        sẻ và các biện pháp bảo vệ chúng tôi áp dụng khi bạn mua sắm tại{" "}
        <span className="font-medium text-secondary-800">techstore.vn</span>.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Chính sách này tuân thủ Luật An toàn thông tin mạng 2015, Nghị định 13/2023/NĐ-CP về bảo
        vệ dữ liệu cá nhân và các quy định pháp luật hiện hành của Việt Nam. Bằng việc sử dụng
        dịch vụ của chúng tôi, bạn đồng ý với các điều khoản trong chính sách này.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 2. Thông tin thu thập ── */}
      <h2 id="thong-tin-thu-thap" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        2. Thông tin chúng tôi thu thập
      </h2>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        2.1 Thông tin bạn cung cấp trực tiếp
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Khi bạn tạo tài khoản, đặt hàng hoặc liên hệ hỗ trợ, chúng tôi thu thập:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Họ và tên đầy đủ</li>
        <li>Địa chỉ email và số điện thoại</li>
        <li>Địa chỉ giao hàng và xuất hóa đơn</li>
        <li>Thông tin thanh toán (chỉ lưu token mã hóa, không lưu số thẻ đầy đủ)</li>
        <li>Lịch sử đơn hàng, sản phẩm đã xem và danh sách yêu thích</li>
        <li>Nội dung đánh giá sản phẩm và ticket hỗ trợ</li>
      </ul>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        2.2 Thông tin thu thập tự động
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Khi bạn truy cập website, hệ thống tự động ghi lại địa chỉ IP, loại trình duyệt, hệ điều
        hành, trang bạn đã xem, thời gian truy cập và các sự kiện tương tác (click, tìm kiếm, thêm
        vào giỏ hàng). Dữ liệu này được thu thập thông qua cookie và các công nghệ tương tự.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 3. Sử dụng thông tin ── */}
      <h2 id="su-dung-thong-tin" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        3. Cách chúng tôi sử dụng thông tin
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore sử dụng thông tin thu thập được cho các mục đích sau:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Xử lý và quản lý đơn hàng, thanh toán và vận chuyển</li>
        <li>Gửi thông báo trạng thái đơn hàng, cập nhật bảo hành và hóa đơn điện tử</li>
        <li>Cá nhân hóa trải nghiệm mua sắm: đề xuất sản phẩm phù hợp theo lịch sử xem và mua</li>
        <li>Phân tích hành vi người dùng để cải thiện hiệu năng website và danh mục sản phẩm</li>
        <li>Phát hiện và ngăn chặn gian lận, lạm dụng tài khoản</li>
        <li>Gửi thông tin khuyến mãi, Flash Sale và ưu đãi đặc biệt (nếu bạn đã đăng ký nhận)</li>
        <li>Tuân thủ nghĩa vụ pháp lý và yêu cầu của cơ quan nhà nước có thẩm quyền</li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Chúng tôi chỉ sử dụng thông tin đúng với mục đích đã được tuyên bố. Nếu cần sử dụng cho
        mục đích khác, TechStore sẽ xin phép bạn trước.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 4. Chia sẻ thông tin ── */}
      <h2 id="chia-se-thong-tin" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        4. Chia sẻ thông tin
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore không bán thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ chia sẻ thông
        tin trong các trường hợp sau:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>
          <span className="font-medium text-secondary-700">Đối tác vận chuyển</span> (GHN, GHTK,
          J&T Express): tên, số điện thoại và địa chỉ giao hàng để thực hiện vận chuyển
        </li>
        <li>
          <span className="font-medium text-secondary-700">Cổng thanh toán</span> (VNPay, MoMo,
          ZaloPay): thông tin giao dịch được mã hóa để xử lý thanh toán
        </li>
        <li>
          <span className="font-medium text-secondary-700">Trung tâm bảo hành ủy quyền</span>:
          thông tin đơn hàng và thông tin liên lạc khi có yêu cầu bảo hành
        </li>
        <li>
          <span className="font-medium text-secondary-700">Cơ quan nhà nước</span>: khi có yêu
          cầu pháp lý hợp lệ hoặc lệnh của tòa án
        </li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Tất cả đối tác của TechStore đều cam kết bảo mật thông tin theo tiêu chuẩn không thấp hơn
        tiêu chuẩn của chúng tôi và chỉ sử dụng thông tin cho đúng mục đích được ủy quyền.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 5. Cookie ── */}
      <h2 id="cookie-theo-doi" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        5. Cookie và công nghệ theo dõi
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore sử dụng cookie và các công nghệ lưu trữ tương tự (localStorage, sessionStorage)
        để duy trì phiên đăng nhập, lưu giỏ hàng, ghi nhớ tùy chọn và phân tích hành vi sử dụng.
      </p>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        Các loại cookie chúng tôi sử dụng
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>
          <span className="font-medium text-secondary-700">Cookie thiết yếu:</span> cần thiết để
          website hoạt động — duy trì phiên đăng nhập, giỏ hàng và bảo mật
        </li>
        <li>
          <span className="font-medium text-secondary-700">Cookie phân tích:</span> thu thập dữ
          liệu ẩn danh về cách người dùng tương tác với website (Google Analytics)
        </li>
        <li>
          <span className="font-medium text-secondary-700">Cookie cá nhân hóa:</span> ghi nhớ ngôn
          ngữ, bộ lọc và tùy chọn hiển thị sản phẩm
        </li>
        <li>
          <span className="font-medium text-secondary-700">Cookie quảng cáo:</span> hiển thị quảng
          cáo có liên quan trên các nền tảng đối tác (chỉ khi bạn cho phép)
        </li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Bạn có thể quản lý hoặc tắt cookie thông qua cài đặt trình duyệt. Lưu ý rằng việc tắt
        cookie thiết yếu có thể ảnh hưởng đến trải nghiệm sử dụng website.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 6. Bảo mật dữ liệu ── */}
      <h2 id="bao-mat-du-lieu" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        6. Bảo mật dữ liệu
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin
        của bạn khỏi truy cập trái phép, mất mát, tiết lộ hoặc phá hủy:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Mã hóa dữ liệu truyền tải bằng giao thức TLS 1.3</li>
        <li>Mật khẩu được băm bằng thuật toán bcrypt — không ai có thể đọc mật khẩu của bạn</li>
        <li>Thông tin thẻ thanh toán được xử lý bởi cổng thanh toán đạt chuẩn PCI DSS</li>
        <li>Kiểm tra bảo mật định kỳ và vá lỗ hổng theo khuyến nghị của OWASP</li>
        <li>Phân quyền truy cập nghiêm ngặt trong nội bộ — chỉ nhân viên cần thiết mới được phép xem dữ liệu khách hàng</li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Mặc dù chúng tôi nỗ lực cao nhất, không có hệ thống nào đảm bảo an toàn tuyệt đối. Nếu
        phát hiện sự cố bảo mật ảnh hưởng đến dữ liệu của bạn, TechStore sẽ thông báo trong vòng
        72 giờ theo quy định pháp luật.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 7. Quyền người dùng ── */}
      <h2 id="quyen-nguoi-dung" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        7. Quyền của người dùng
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Bạn có các quyền sau đây đối với dữ liệu cá nhân của mình:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>
          <span className="font-medium text-secondary-700">Quyền truy cập:</span> yêu cầu bản sao
          toàn bộ dữ liệu cá nhân chúng tôi đang lưu giữ về bạn
        </li>
        <li>
          <span className="font-medium text-secondary-700">Quyền chỉnh sửa:</span> cập nhật thông
          tin không chính xác hoặc không đầy đủ trực tiếp trong trang tài khoản
        </li>
        <li>
          <span className="font-medium text-secondary-700">Quyền xóa:</span> yêu cầu xóa tài khoản
          và dữ liệu cá nhân (trừ dữ liệu cần thiết cho nghĩa vụ pháp lý hoặc giải quyết tranh chấp)
        </li>
        <li>
          <span className="font-medium text-secondary-700">Quyền phản đối:</span> từ chối nhận
          email marketing bất kỳ lúc nào qua link hủy đăng ký trong email hoặc cài đặt tài khoản
        </li>
        <li>
          <span className="font-medium text-secondary-700">Quyền di chuyển dữ liệu:</span> xuất
          lịch sử đơn hàng và dữ liệu tài khoản dưới dạng file có cấu trúc (JSON/CSV)
        </li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Để thực hiện bất kỳ quyền nào trên, vui lòng liên hệ qua email{" "}
        <span className="font-medium text-secondary-800">privacy@techstore.vn</span>. Chúng tôi sẽ
        phản hồi trong vòng 30 ngày làm việc.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 8. Thay đổi chính sách ── */}
      <h2 id="thay-doi-chinh-sach" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        8. Thay đổi chính sách
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore có thể cập nhật Chính sách bảo mật này theo thời gian để phản ánh thay đổi về
        dịch vụ, công nghệ hoặc quy định pháp luật. Mọi thay đổi sẽ được đăng tải tại{" "}
        <span className="font-medium text-secondary-800">techstore.vn/privacy</span> kèm ngày cập
        nhật mới nhất.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Đối với các thay đổi quan trọng liên quan đến cách thu thập hoặc sử dụng dữ liệu, chúng
        tôi sẽ thông báo qua email ít nhất 7 ngày trước khi có hiệu lực và yêu cầu xác nhận đồng
        ý nếu cần thiết theo quy định pháp luật.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 9. Liên hệ ── */}
      <h2 id="lien-he" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        9. Liên hệ
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Nếu bạn có câu hỏi, khiếu nại hoặc muốn thực hiện các quyền về dữ liệu cá nhân, vui lòng
        liên hệ Bộ phận Bảo vệ Dữ liệu của TechStore:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Email bảo mật: <span className="font-medium text-secondary-800">privacy@techstore.vn</span></li>
        <li>Email hỗ trợ chung: <span className="font-medium text-secondary-800">support@techstore.vn</span></li>
        <li>Điện thoại: <span className="font-medium text-secondary-800">1900 1234</span> (8:00–22:00 hàng ngày)</li>
        <li>Địa chỉ: 123 Đường Công Nghệ, Quận Cầu Giấy, Hà Nội</li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Trong trường hợp không hài lòng với cách TechStore xử lý khiếu nại, bạn có quyền gửi
        phản ánh đến Cục An toàn thông tin — Bộ Thông tin và Truyền thông Việt Nam.
      </p>

    </div>
  );
}
