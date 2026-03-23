import type { SelectOption } from "@/src/components/ui/Select";

// ─── Domain types ──────────────────────────────────────────────────────────────

export type ReturnReason =
  | "defective"
  | "not_as_described"
  | "unsatisfied"
  | "wrong_item"
  | "other";

export type ResolutionMethod = "exchange" | "refund";

export type ReturnStatus =
  | "submitted"   // Đã gửi — awaiting review
  | "processing"  // Đang xem xét — under review
  | "approved"    // Thành công — approved, resolved
  | "rejected";   // Thất bại — rejected with reason

export interface ReturnRequestItem {
  /** Must match an OrderItem.id from the associated order */
  itemId: string;
  /** 1 ≤ returnQuantity ≤ orderedQuantity */
  returnQuantity: number;
}

export interface ReturnRequest {
  /** e.g. "YC-100001" — globally unique, never reused */
  id: string;
  /** References OrderSummary.id */
  orderId: string;
  status: ReturnStatus;
  /** ISO date string */
  submittedAt: string;
  /** ISO date string — only set when status is "approved" or "rejected" */
  resolvedAt?: string;
  items: ReturnRequestItem[];
  reason: ReturnReason;
  resolution: ResolutionMethod;
  description: string;
  /** CDN image/video URLs — no blob: URLs */
  evidenceUrls: string[];
  /** Shown to user — only set when status is "rejected" */
  rejectionReason?: string;
}

// ─── Wizard state types (shared across wizard steps) ──────────────────────────

export interface FilePreview {
  /** crypto.randomUUID() */
  id: string;
  file: File;
  /** URL.createObjectURL(file) */
  previewUrl: string;
  /** Per-file validation error, if any */
  error?: string;
}

export interface WizardState {
  selectedItems: ReturnRequestItem[];
  reason: ReturnReason | "";
  resolution: ResolutionMethod | "";
  description: string;
  files: FilePreview[];
}

export interface Step1Errors {
  items?: string;
}

export interface Step2Errors {
  reason?: string;
  resolution?: string;
  description?: string;
  files?: string;
}

// ─── Reason options ───────────────────────────────────────────────────────────

export const RETURN_REASON_OPTIONS = [
  { value: "defective",        label: "Sản phẩm lỗi" },
  { value: "not_as_described", label: "Không đúng mô tả" },
  { value: "unsatisfied",      label: "Không vừa ý" },
  { value: "wrong_item",       label: "Nhận nhầm hàng" },
  { value: "other",            label: "Khác" },
] satisfies SelectOption[];

// ─── Evidence image URLs (CDN) ────────────────────────────────────────────────

const THUMB_MOUSE =
  "https://cdn-files.hacom.vn/hacom/cdn/web/05032026/chuot-razer-deathadder-v4-pro-niko-edition-1.jpg";
const THUMB_KEYBOARD =
  "https://hanoicomputercdn.com/media/product/80947_rog_falchion_rx_low_profile_rd_01.jpg";
const THUMB_LAPTOP =
  "https://hanoicomputercdn.com/media/product/92496_laptop_acer_aspire_lite_14_al14_71p_55p9_nx_d7usv_0014.jpg";
const THUMB_MONITOR =
  "https://hanoicomputercdn.com/media/product/79001_man_hinh_dell_ultrasharp_u2424h_850x850_4.jpg";
const THUMB_HEADSET =
  "https://hanoicomputercdn.com/media/product/91657_tai_nghe_khong_day_corsair_void_v2_carbon_1.jpg";
const THUMB_CHAIR =
  "https://hanoicomputercdn.com/media/product/80829_centaur_gundam_avt_2.jpg";

// ─── Mock return requests (5 entries, one per scenario) ───────────────────────
//
// Order ID mapping (all reference orders defined in orders/_mock_data.ts):
//   YC-100001 → DH-20555  submitted  · partial return (item-22 of 3)
//   YC-100002 → DH-20556  processing · first request (item-a1, item-a2)
//   YC-100003 → DH-20556  approved   · second request (item-a3) — same order
//   YC-100004 → DH-20551  rejected   · single item (item-b1), user may retry
//   YC-100005 → DH-20553  approved   · full return (item-c1, item-c2, item-c3)

export const RETURN_REQUESTS: ReturnRequest[] = [
  // YC-100001 — submitted (awaiting review), 2 days ago
  {
    id: "YC-100001",
    orderId: "DH-20555",
    status: "submitted",
    submittedAt: "2026-03-21",
    items: [{ itemId: "item-22", returnQuantity: 1 }],
    reason: "defective",
    resolution: "exchange",
    description:
      "Chuột bị giật lag liên tục khi dùng kết nối Bluetooth, đã thử đổi pin và kết nối lại nhiều lần nhưng vẫn không cải thiện. Sản phẩm mua mới nhưng lỗi ngay từ đầu.",
    evidenceUrls: [THUMB_MOUSE, THUMB_KEYBOARD],
  },

  // YC-100002 — processing (under review), first request on DH-20556
  {
    id: "YC-100002",
    orderId: "DH-20556",
    status: "processing",
    submittedAt: "2026-03-20",
    items: [
      { itemId: "item-a1", returnQuantity: 1 },
      { itemId: "item-a2", returnQuantity: 1 },
    ],
    reason: "not_as_described",
    resolution: "refund",
    description:
      "Laptop được mô tả là màu Bạc nhưng thực tế nhận được màu Xanh. Màn hình cũng không đúng model — nhận được U2424HX thay vì U2424H như mô tả sản phẩm.",
    evidenceUrls: [THUMB_LAPTOP, THUMB_MONITOR],
  },

  // YC-100003 — approved, second (separate) request on DH-20556
  {
    id: "YC-100003",
    orderId: "DH-20556",
    status: "approved",
    submittedAt: "2026-03-18",
    resolvedAt: "2026-03-21",
    items: [{ itemId: "item-a3", returnQuantity: 1 }],
    reason: "defective",
    resolution: "exchange",
    description:
      "iPad bị lỗi màn hình, xuất hiện các đường kẻ ngang ngay sau khi bật lần đầu. Đã chụp ảnh và quay video để làm bằng chứng.",
    evidenceUrls: [THUMB_MONITOR, THUMB_LAPTOP],
  },

  // YC-100004 — rejected, item-b1 released → user can retry
  {
    id: "YC-100004",
    orderId: "DH-20551",
    status: "rejected",
    submittedAt: "2026-03-19",
    resolvedAt: "2026-03-21",
    items: [{ itemId: "item-b1", returnQuantity: 1 }],
    reason: "unsatisfied",
    resolution: "refund",
    description:
      "Chuột không vừa tay với tôi, cảm giác cầm nắm không thoải mái. Muốn hoàn tiền để mua sản phẩm khác phù hợp hơn.",
    evidenceUrls: [THUMB_MOUSE, THUMB_HEADSET],
    rejectionReason:
      'Yêu cầu không đáp ứng điều kiện đổi/trả — lý do "không vừa ý" không thuộc phạm vi bảo hành. Sản phẩm không có lỗi kỹ thuật.',
  },

  // YC-100005 — approved, full return of all 3 items on DH-20553
  {
    id: "YC-100005",
    orderId: "DH-20553",
    status: "approved",
    submittedAt: "2026-03-14",
    resolvedAt: "2026-03-18",
    items: [
      { itemId: "item-c1", returnQuantity: 1 },
      { itemId: "item-c2", returnQuantity: 1 },
      { itemId: "item-c3", returnQuantity: 1 },
    ],
    reason: "wrong_item",
    resolution: "exchange",
    description:
      "Nhận được toàn bộ sản phẩm sai so với đơn đặt hàng. Ghế gaming nhận được là màu Đen-Trắng trong khi đặt màu Đen-Đỏ. Tai nghe nhận nhầm model.",
    evidenceUrls: [THUMB_CHAIR, THUMB_HEADSET, THUMB_MOUSE],
  },
];
