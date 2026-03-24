import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng dịch vụ của TechStore — quy định về đặt hàng, thanh toán, vận chuyển, đổi trả và bảo hành sản phẩm linh kiện máy tính.",
};

const TOC = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "dieu-kien-su-dung", label: "Điều kiện sử dụng dịch vụ" },
  { id: "dat-hang-thanh-toan", label: "Đặt hàng và thanh toán" },
  { id: "van-chuyen-giao-hang", label: "Vận chuyển và giao hàng" },
  { id: "doi-tra-bao-hanh", label: "Chính sách đổi trả và bảo hành" },
  { id: "so-huu-tri-tue", label: "Quyền sở hữu trí tuệ" },
  { id: "gioi-han-trach-nhiem", label: "Giới hạn trách nhiệm" },
  { id: "thay-doi-dieu-khoan", label: "Thay đổi điều khoản" },
  { id: "lien-he", label: "Liên hệ" },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Page header ── */}
      <h1 className="text-3xl font-bold text-secondary-900 mb-2">
        Điều khoản sử dụng
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
        Chào mừng bạn đến với TechStore — nền tảng thương mại điện tử chuyên cung cấp linh kiện
        máy tính, laptop gaming, màn hình và các thiết bị ngoại vi chính hãng tại Việt Nam. Các
        điều khoản sử dụng dưới đây ("Điều khoản") điều chỉnh quyền và nghĩa vụ giữa bạn ("Người
        dùng") và TechStore khi bạn truy cập hoặc sử dụng website{" "}
        <span className="font-medium text-secondary-800">techstore.vn</span> cùng các dịch vụ liên
        quan.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Bằng việc đăng ký tài khoản, đặt hàng hoặc tiếp tục duyệt website, bạn xác nhận đã đọc,
        hiểu và đồng ý chịu ràng buộc bởi toàn bộ Điều khoản này. Nếu bạn không đồng ý với bất kỳ
        điều khoản nào, vui lòng ngừng sử dụng dịch vụ của chúng tôi.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 2. Điều kiện sử dụng ── */}
      <h2 id="dieu-kien-su-dung" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        2. Điều kiện sử dụng dịch vụ
      </h2>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        2.1 Điều kiện tham gia
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Để sử dụng đầy đủ các tính năng của TechStore, bạn phải đủ 18 tuổi hoặc có sự đồng ý của
        cha mẹ/người giám hộ hợp pháp. TechStore có quyền từ chối cung cấp dịch vụ, đóng tài
        khoản hoặc hủy đơn hàng nếu phát hiện hành vi gian lận, vi phạm pháp luật hoặc lạm dụng
        hệ thống.
      </p>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        2.2 Tài khoản người dùng
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Bạn có trách nhiệm bảo mật thông tin đăng nhập tài khoản, bao gồm mật khẩu và các thông
        tin xác thực khác. Mọi hoạt động phát sinh từ tài khoản của bạn đều được xem là do bạn
        thực hiện. Vui lòng thông báo ngay cho TechStore nếu phát hiện bất kỳ hành vi truy cập
        trái phép nào.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc bạn không tuân
        thủ nghĩa vụ bảo mật tài khoản. Chúng tôi khuyến nghị sử dụng mật khẩu mạnh và bật xác
        thực hai yếu tố khi có thể.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 3. Đặt hàng và thanh toán ── */}
      <h2 id="dat-hang-thanh-toan" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        3. Đặt hàng và thanh toán
      </h2>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        3.1 Xác nhận đơn hàng
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Khi bạn đặt hàng trên TechStore, chúng tôi sẽ gửi email xác nhận đơn hàng đến địa chỉ
        email đã đăng ký. Email xác nhận không đồng nghĩa với việc đơn hàng đã được chấp thuận
        hoàn toàn — TechStore có quyền hủy đơn nếu sản phẩm hết hàng, thông tin thanh toán không
        hợp lệ hoặc có dấu hiệu gian lận.
      </p>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        3.2 Phương thức thanh toán
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore hỗ trợ các phương thức thanh toán sau:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Thẻ tín dụng / ghi nợ (Visa, Mastercard, JCB) qua cổng thanh toán VNPay</li>
        <li>Chuyển khoản ngân hàng trực tiếp</li>
        <li>Ví điện tử: MoMo, ZaloPay, VNPay QR</li>
        <li>Thanh toán khi nhận hàng (COD) — áp dụng với đơn hàng dưới 20.000.000 VNĐ</li>
        <li>Trả góp 0% lãi suất qua thẻ tín dụng (áp dụng cho đơn từ 3.000.000 VNĐ)</li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Giá hiển thị trên website đã bao gồm thuế VAT 10%. TechStore có quyền điều chỉnh giá bán
        mà không cần thông báo trước; tuy nhiên, giá tại thời điểm xác nhận đơn hàng sẽ được giữ
        nguyên cho đơn đó.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 4. Vận chuyển và giao hàng ── */}
      <h2 id="van-chuyen-giao-hang" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        4. Vận chuyển và giao hàng
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore hợp tác với các đối tác vận chuyển uy tín bao gồm Giao Hàng Nhanh (GHN), Giao
        Hàng Tiết Kiệm (GHTK) và J&T Express để đảm bảo đơn hàng đến tay bạn an toàn và đúng hạn.
      </p>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        4.1 Thời gian giao hàng dự kiến
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Nội thành Hà Nội và TP. Hồ Chí Minh: 1–2 ngày làm việc</li>
        <li>Các tỉnh thành khác: 2–5 ngày làm việc</li>
        <li>Khu vực miền núi, hải đảo: 5–10 ngày làm việc</li>
      </ul>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Thời gian giao hàng có thể bị ảnh hưởng bởi các yếu tố ngoài tầm kiểm soát của TechStore
        như thiên tai, dịch bệnh hoặc tình trạng quá tải của đơn vị vận chuyển vào các dịp lễ,
        Tết. Chúng tôi sẽ thông báo kịp thời nếu có sự chậm trễ đáng kể.
      </p>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        4.2 Phí vận chuyển
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Đơn hàng từ 500.000 VNĐ trở lên được miễn phí vận chuyển toàn quốc. Đối với đơn hàng
        dưới mức này, phí vận chuyển sẽ được tính theo khu vực địa lý và trọng lượng sản phẩm,
        hiển thị rõ ràng trong bước thanh toán trước khi bạn xác nhận đơn.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 5. Đổi trả và bảo hành ── */}
      <h2 id="doi-tra-bao-hanh" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        5. Chính sách đổi trả và bảo hành
      </h2>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        5.1 Điều kiện đổi trả
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore chấp nhận yêu cầu đổi/trả hàng trong vòng <strong>30 ngày</strong> kể từ ngày
        nhận hàng, với điều kiện:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Sản phẩm còn nguyên seal, chưa qua sử dụng và đầy đủ phụ kiện đi kèm</li>
        <li>Hộp đựng và bao bì còn nguyên vẹn, không bị rách hoặc hư hỏng</li>
        <li>Có hóa đơn mua hàng hoặc email xác nhận đơn hàng từ TechStore</li>
        <li>Sản phẩm không thuộc danh mục không hỗ trợ đổi trả (phần mềm, sản phẩm đã kích hoạt)</li>
      </ul>
      <h3 className="text-base font-semibold text-secondary-800 mt-6 mb-2">
        5.2 Bảo hành chính hãng
      </h3>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Tất cả sản phẩm bán tại TechStore đều được bảo hành chính hãng theo quy định của nhà sản
        xuất, tối thiểu 12 tháng. Một số dòng sản phẩm cao cấp như CPU Intel/AMD, GPU NVIDIA/AMD
        và RAM được bảo hành lên đến 36 tháng. Thời hạn bảo hành cụ thể được ghi rõ trên trang
        sản phẩm.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Bảo hành không áp dụng trong các trường hợp: sản phẩm bị hư hỏng do tai nạn, nước, điện
        áp không ổn định, hoặc tự ý tháo lắp và sửa chữa ngoài trung tâm bảo hành ủy quyền.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 6. Sở hữu trí tuệ ── */}
      <h2 id="so-huu-tri-tue" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        6. Quyền sở hữu trí tuệ
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Toàn bộ nội dung trên website TechStore — bao gồm logo, hình ảnh sản phẩm, mô tả kỹ
        thuật, thiết kế giao diện, bài viết đánh giá và mã nguồn — là tài sản trí tuệ thuộc sở
        hữu của TechStore hoặc được cấp phép sử dụng hợp pháp từ các đối tác.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Bạn không được sao chép, phân phối lại, chỉnh sửa hoặc tạo ra các sản phẩm phái sinh từ
        bất kỳ nội dung nào của TechStore mà không có sự cho phép bằng văn bản. Việc sử dụng nội
        dung cho mục đích cá nhân, phi thương mại được cho phép với điều kiện ghi rõ nguồn gốc.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 7. Giới hạn trách nhiệm ── */}
      <h2 id="gioi-han-trach-nhiem" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        7. Giới hạn trách nhiệm
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả
        nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ, kể cả khi đã được thông báo
        về khả năng xảy ra các thiệt hại đó. Giới hạn trách nhiệm tối đa của TechStore trong mọi
        trường hợp không vượt quá giá trị đơn hàng liên quan.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore không bảo đảm rằng website sẽ hoạt động liên tục, không gián đoạn hoặc không có
        lỗi. Chúng tôi có quyền tạm ngừng dịch vụ để bảo trì, nâng cấp hệ thống và sẽ thông báo
        trước khi có thể.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 8. Thay đổi điều khoản ── */}
      <h2 id="thay-doi-dieu-khoan" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        8. Thay đổi điều khoản
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        TechStore có quyền sửa đổi, bổ sung hoặc thay thế bất kỳ phần nào của Điều khoản này vào
        bất kỳ lúc nào. Phiên bản mới nhất sẽ luôn được đăng tải tại{" "}
        <span className="font-medium text-secondary-800">techstore.vn/terms</span> kèm theo ngày
        cập nhật. Việc bạn tiếp tục sử dụng dịch vụ sau khi điều khoản được cập nhật đồng nghĩa
        với việc bạn chấp nhận các thay đổi đó.
      </p>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Đối với các thay đổi quan trọng ảnh hưởng đến quyền lợi của người dùng, TechStore sẽ gửi
        thông báo qua email đến địa chỉ đã đăng ký ít nhất 7 ngày trước khi có hiệu lực.
      </p>

      <hr className="border-secondary-200 my-8" />

      {/* ── 9. Liên hệ ── */}
      <h2 id="lien-he" className="text-xl font-semibold text-secondary-900 mt-10 mb-3">
        9. Liên hệ
      </h2>
      <p className="text-sm text-secondary-600 leading-relaxed mb-3">
        Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi
        qua các kênh sau:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-600 mb-3">
        <li>Email: <span className="font-medium text-secondary-800">support@techstore.vn</span></li>
        <li>Điện thoại: <span className="font-medium text-secondary-800">1900 1234</span> (8:00–22:00 hàng ngày)</li>
        <li>Địa chỉ: 123 Đường Công Nghệ, Quận Cầu Giấy, Hà Nội</li>
        <li>Ticket hỗ trợ: <span className="font-medium text-secondary-800">techstore.vn/account/support</span></li>
      </ul>

    </div>
  );
}
