import type { SelectOption } from "@/src/components/ui/Select";
import { MOCK_ORDERS } from "@/src/app/(storefront)/account/orders/_mock_data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TicketStatus = "in_progress" | "resolved";

export type TicketCategory =
  | "return"      // Đổi/trả hàng
  | "defective"   // Lỗi sản phẩm
  | "delivery"    // Giao hàng
  | "payment"     // Thanh toán
  | "other";      // Khác

export interface TicketAttachment {
  id: string;
  /** CDN URL — image or video */
  url: string;
  /** Display filename */
  name: string;
}

export interface TicketMessage {
  id: string;
  role: "customer" | "staff";
  content: string;
  /** ISO date string */
  sentAt: string;
  attachments?: TicketAttachment[];
}

export interface SupportTicket {
  /** e.g. "CS-10001" */
  id: string;
  subject: string;
  category: TicketCategory;
  /** Optional reference to MOCK_ORDERS.id */
  orderId?: string;
  status: TicketStatus;
  /** ISO date string */
  createdAt: string;
  /** ISO date string — equals the sentAt of the most recent message */
  updatedAt: string;
  messages: TicketMessage[];
}

// ─── Category metadata ────────────────────────────────────────────────────────

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  return:    "Đổi/trả hàng",
  defective: "Lỗi sản phẩm",
  delivery:  "Giao hàng",
  payment:   "Thanh toán",
  other:     "Khác",
};

export const TICKET_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "return",    label: "Đổi/trả hàng" },
  { value: "defective", label: "Lỗi sản phẩm" },
  { value: "delivery",  label: "Giao hàng" },
  { value: "payment",   label: "Thanh toán" },
  { value: "other",     label: "Khác" },
];

// ─── Mock tickets ─────────────────────────────────────────────────────────────
// Today = 2026-03-23

export const SUPPORT_TICKETS: SupportTicket[] = [
  // CS-10001 — in_progress, "return", linked to DH-20601
  // 3 messages: customer → staff (with image attachment) → customer
  {
    id: "CS-10001",
    subject: "Muốn đổi trả laptop vì sản phẩm bị lỗi màn hình",
    category: "return",
    orderId: MOCK_ORDERS[0].id, // DH-20601
    status: "in_progress",
    createdAt: "2026-03-20T08:30:00.000Z",
    updatedAt: "2026-03-22T14:15:00.000Z",
    messages: [
      {
        id: "msg-1001-1",
        role: "customer",
        content:
          "Chào bộ phận hỗ trợ, tôi vừa nhận được laptop Dell XPS 15 từ đơn hàng DH-20601. Màn hình hiển thị bị đốm sáng ở góc trái, rất khó chịu khi sử dụng. Tôi muốn yêu cầu đổi trả sản phẩm. Nhờ bộ phận hỗ trợ hướng dẫn thủ tục giúp tôi với ạ.",
        sentAt: "2026-03-20T08:30:00.000Z",
      },
      {
        id: "msg-1001-2",
        role: "staff",
        content:
          "Chào bạn, cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã ghi nhận phản ánh của bạn về tình trạng màn hình. Bạn vui lòng xem qua ảnh hướng dẫn đính kèm và điền vào form đổi/trả trên trang web theo đường dẫn /account/returns. Đội ngũ kỹ thuật sẽ xem xét và liên hệ lại trong vòng 1–2 ngày làm việc.",
        sentAt: "2026-03-21T09:20:00.000Z",
        attachments: [
          {
            id: "att-1001-1",
            url: "https://hanoicomputercdn.com/media/product/79001_man_hinh_dell_ultrasharp_u2424h_850x850_4.jpg",
            name: "huong-dan-doi-tra.jpg",
          },
        ],
      },
      {
        id: "msg-1001-3",
        role: "customer",
        content:
          "Cảm ơn bạn đã phản hồi. Tôi đã xem hướng dẫn và đã điền form đổi/trả rồi. Nhờ bộ phận xử lý nhanh giúp tôi, tôi cần laptop để làm việc gấp. Cảm ơn nhiều!",
        sentAt: "2026-03-22T14:15:00.000Z",
      },
    ],
  },

  // CS-10002 — resolved, "delivery"
  // 2 messages: customer → staff (resolved)
  {
    id: "CS-10002",
    subject: "Đơn hàng chậm giao, chưa nhận được hàng sau 7 ngày",
    category: "delivery",
    orderId: undefined,
    status: "resolved",
    createdAt: "2026-03-10T10:00:00.000Z",
    updatedAt: "2026-03-13T16:45:00.000Z",
    messages: [
      {
        id: "msg-1002-1",
        role: "customer",
        content:
          "Tôi đặt hàng từ ngày 03/03 nhưng đến nay đã 7 ngày vẫn chưa nhận được. Trang theo dõi đơn hàng hiển thị trạng thái 'Đang giao' từ ngày 05/03 và không cập nhật thêm. Nhờ bộ phận kiểm tra giúp tôi với ạ.",
        sentAt: "2026-03-10T10:00:00.000Z",
      },
      {
        id: "msg-1002-2",
        role: "staff",
        content:
          "Chào bạn, xin lỗi bạn vì sự bất tiện này. Chúng tôi đã liên hệ với đối tác vận chuyển và xác nhận đơn hàng của bạn đã được giao thành công vào ngày 13/03. Nếu bạn không nhận được, vui lòng kiểm tra với người thân hoặc bảo vệ tòa nhà. Trường hợp vẫn không tìm thấy, hãy phản hồi lại để chúng tôi hỗ trợ tiếp. Cảm ơn bạn đã kiên nhẫn!",
        sentAt: "2026-03-13T16:45:00.000Z",
      },
    ],
  },

  // CS-10003 — in_progress, "defective"
  // 1 message: customer only, no attachments, awaiting first staff reply
  {
    id: "CS-10003",
    subject: "Tai nghe Sony WH-1000XM5 mất tiếng ở tai phải sau 2 tuần sử dụng",
    category: "defective",
    orderId: undefined,
    status: "in_progress",
    createdAt: "2026-03-23T07:00:00.000Z",
    updatedAt: "2026-03-23T07:00:00.000Z",
    messages: [
      {
        id: "msg-1003-1",
        role: "customer",
        content:
          "Tôi mua tai nghe Sony WH-1000XM5 được khoảng 2 tuần thì tai phải bắt đầu bị mất tiếng, đặc biệt khi xoay vị trí. Tai trái vẫn hoạt động bình thường. Sản phẩm vẫn còn bảo hành, nhờ bộ phận hỗ trợ tư vấn cách xử lý ạ.",
        sentAt: "2026-03-23T07:00:00.000Z",
      },
    ],
  },

  // CS-10004 — in_progress, "payment"
  // 2 messages: customer (with image attachment) → staff
  {
    id: "CS-10004",
    subject: "Bị trừ tiền hai lần cho cùng một đơn hàng",
    category: "payment",
    orderId: undefined,
    status: "in_progress",
    createdAt: "2026-03-18T15:30:00.000Z",
    updatedAt: "2026-03-19T10:10:00.000Z",
    messages: [
      {
        id: "msg-1004-1",
        role: "customer",
        content:
          "Tôi vừa kiểm tra lịch sử giao dịch ngân hàng và phát hiện bị trừ tiền hai lần cho cùng một đơn hàng. Đính kèm ảnh chụp màn hình lịch sử giao dịch. Mong bộ phận kiểm tra và hoàn tiền giúp tôi.",
        sentAt: "2026-03-18T15:30:00.000Z",
        attachments: [
          {
            id: "att-1004-1",
            url: "https://hanoicomputercdn.com/media/product/80947_rog_falchion_rx_low_profile_rd_01.jpg",
            name: "giao-dich-ngan-hang.jpg",
          },
        ],
      },
      {
        id: "msg-1004-2",
        role: "staff",
        content:
          "Chào bạn, chúng tôi đã nhận được phản ánh và đang xác minh với bộ phận kế toán. Quá trình hoàn tiền thường mất 3–5 ngày làm việc sau khi xác nhận. Chúng tôi sẽ thông báo kết quả sớm nhất có thể. Xin lỗi bạn vì sự bất tiện này.",
        sentAt: "2026-03-19T10:10:00.000Z",
      },
    ],
  },
];
