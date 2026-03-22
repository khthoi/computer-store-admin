import type { SelectOption } from "@/src/components/ui/Select";

// ─── Domain types ──────────────────────────────────────────────────────────────

export type ReturnReason =
  | "defective"
  | "not_as_described"
  | "unsatisfied"
  | "wrong_item"
  | "other";

export type ResolutionMethod = "exchange" | "refund";

export interface ReturnableItem {
  id: string;
  name: string;
  /** Human-readable variant attributes, e.g. "16GB / 512GB / Đen" */
  variantLabel: string;
  thumbnailSrc: string;
  orderedQuantity: number;
}

export interface ReturnableOrder {
  /** e.g. "DH-20555" */
  id: string;
  /** ISO date string */
  placedAt: string;
  items: ReturnableItem[];
}

// ─── Wizard state types (shared across steps) ─────────────────────────────────

export interface SelectedItem {
  itemId: string;
  /** 1 ≤ returnQuantity ≤ orderedQuantity */
  returnQuantity: number;
}

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
  // Step 1
  selectedItems: SelectedItem[];
  // Step 2
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

// ─── Thumbnail URLs (sourced from account/orders mock data) ───────────────────

const THUMB_MOUSE =
  "https://cdn-files.hacom.vn/hacom/cdn/web/05032026/chuot-razer-deathadder-v4-pro-niko-edition-1.jpg";
const THUMB_KEYBOARD =
  "https://hanoicomputercdn.com/media/product/80947_rog_falchion_rx_low_profile_rd_01.jpg";
const THUMB_HEADSET =
  "https://hanoicomputercdn.com/media/product/91657_tai_nghe_khong_day_corsair_void_v2_carbon_1.jpg";
const THUMB_LAPTOP =
  "https://hanoicomputercdn.com/media/product/92496_laptop_acer_aspire_lite_14_al14_71p_55p9_nx_d7usv_0014.jpg";
const THUMB_MONITOR =
  "https://hanoicomputercdn.com/media/product/79001_man_hinh_dell_ultrasharp_u2424h_850x850_4.jpg";
const THUMB_CHAIR =
  "https://hanoicomputercdn.com/media/product/80829_centaur_gundam_avt_2.jpg";

/**
 * Returnable orders (status = "delivered", within 7-day return window as of
 * 2026-03-22). DH-20558 and DH-20559 are added to support submitted return
 * request demo data.
 */
export const RETURNABLE_ORDERS: ReturnableOrder[] = [
  {
    id: "DH-20555",
    placedAt: "2026-03-18",
    items: [
      {
        id: "item-22",
        name: "Chuột Logitech MX Master 3S",
        variantLabel: "Màu Graphite / Bluetooth & USB",
        thumbnailSrc: THUMB_MOUSE,
        orderedQuantity: 1,
      },
      {
        id: "item-23",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Brown Switch / RGB / Không dây",
        thumbnailSrc: THUMB_KEYBOARD,
        orderedQuantity: 1,
      },
      {
        id: "item-22c",
        name: "Tai nghe Corsair Void V2 Carbon",
        variantLabel: "Màu Đen / 2.4GHz Wireless / Surround 7.1",
        thumbnailSrc: THUMB_HEADSET,
        orderedQuantity: 2,
      },
    ],
  },
  {
    id: "DH-20557",
    placedAt: "2026-03-20",
    items: [
      {
        id: "item-r1",
        name: "Laptop Acer Aspire Lite 14 AL14-71P",
        variantLabel: "Core i5-1335U / 16GB / 512GB / Bạc",
        thumbnailSrc: THUMB_LAPTOP,
        orderedQuantity: 1,
      },
      {
        id: "item-r2",
        name: "Màn hình Dell UltraSharp U2424H",
        variantLabel: "24\" / FHD / IPS / USB-C 90W",
        thumbnailSrc: THUMB_MONITOR,
        orderedQuantity: 2,
      },
      {
        id: "item-r3",
        name: "Ghế gaming Centaur Gundam",
        variantLabel: "Màu Đen-Đỏ / Size L / Lưng lưới",
        thumbnailSrc: THUMB_CHAIR,
        orderedQuantity: 1,
      },
    ],
  },
  {
    id: "DH-20558",
    placedAt: "2026-03-10",
    items: [
      {
        id: "item-s1",
        name: "Laptop ASUS ROG Strix G16",
        variantLabel: "Core i9 / 32GB / 1TB / RTX 4070 / Đen",
        thumbnailSrc: THUMB_LAPTOP,
        orderedQuantity: 1,
      },
      {
        id: "item-s2",
        name: "Màn hình Dell UltraSharp U2424H",
        variantLabel: "24\" / FHD / IPS / USB-C 90W",
        thumbnailSrc: THUMB_MONITOR,
        orderedQuantity: 1,
      },
    ],
  },
  {
    id: "DH-20559",
    placedAt: "2026-03-12",
    items: [
      {
        id: "item-s3",
        name: "Chuột Razer DeathAdder V4 Pro",
        variantLabel: "Màu Đen / Không dây / 30000 DPI",
        thumbnailSrc: THUMB_MOUSE,
        orderedQuantity: 1,
      },
      {
        id: "item-s4",
        name: "Tai nghe Corsair Void V2 Carbon",
        variantLabel: "Màu Đen / 2.4GHz Wireless / Surround 7.1",
        thumbnailSrc: THUMB_HEADSET,
        orderedQuantity: 1,
      },
    ],
  },
];

// ─── Return status & submitted request types ──────────────────────────────────

export type ReturnStatus =
  | "submitted"   // Đã gửi — awaiting review
  | "processing"  // Đang xem xét — under review
  | "approved"    // Thành công — approved, resolved
  | "rejected";   // Thất bại — rejected

export interface SubmittedReturnRequest {
  /** e.g. "YC-100001" */
  id: string;
  /** Links to ReturnableOrder.id */
  orderId: string;
  status: ReturnStatus;
  /** ISO date string */
  submittedAt: string;
  /** ISO date string — only set when status is "approved" or "rejected" */
  resolvedAt?: string;
  selectedItems: SelectedItem[];
  reason: ReturnReason;
  resolution: ResolutionMethod;
  description: string;
  /** Public image/video URLs — NOT blob URLs */
  evidenceUrls: string[];
  /** Explanation shown to the user — only set when status is "rejected" */
  rejectionReason?: string;
}

// ─── Evidence image URLs (reusing CDN images from mock data) ─────────────────

const EVIDENCE_MOUSE_1 = THUMB_MOUSE;
const EVIDENCE_KEYBOARD_1 = THUMB_KEYBOARD;
const EVIDENCE_LAPTOP_1 = THUMB_LAPTOP;
const EVIDENCE_MONITOR_1 = THUMB_MONITOR;
const EVIDENCE_HEADSET_1 = THUMB_HEADSET;
const EVIDENCE_CHAIR_1 = THUMB_CHAIR;

// ─── Submitted return requests (4 entries, one per status) ───────────────────

export const SUBMITTED_RETURN_REQUESTS: SubmittedReturnRequest[] = [
  // YC-100001 — submitted (awaiting review), 1 day ago
  {
    id: "YC-100001",
    orderId: "DH-20555",
    status: "submitted",
    submittedAt: "2026-03-21",
    selectedItems: [
      { itemId: "item-22", returnQuantity: 1 },
    ],
    reason: "defective",
    resolution: "exchange",
    description:
      "Chuột bị giật lag liên tục khi dùng kết nối Bluetooth, đã thử đổi pin và kết nối lại nhưng vẫn không cải thiện. Sản phẩm mua mới nhưng lỗi ngay từ đầu.",
    evidenceUrls: [EVIDENCE_MOUSE_1, EVIDENCE_KEYBOARD_1],
  },

  // YC-100002 — processing (under review), 3 days ago
  {
    id: "YC-100002",
    orderId: "DH-20557",
    status: "processing",
    submittedAt: "2026-03-19",
    selectedItems: [
      { itemId: "item-r1", returnQuantity: 1 },
      { itemId: "item-r2", returnQuantity: 1 },
    ],
    reason: "not_as_described",
    resolution: "refund",
    description:
      "Laptop được mô tả là màu Bạc nhưng thực tế nhận được màu Xanh. Màn hình Dell cũng không đúng model — nhận được U2424HX thay vì U2424H như mô tả sản phẩm.",
    evidenceUrls: [EVIDENCE_LAPTOP_1, EVIDENCE_MONITOR_1],
  },

  // YC-100003 — approved (resolved), 7 days ago
  {
    id: "YC-100003",
    orderId: "DH-20558",
    status: "approved",
    submittedAt: "2026-03-15",
    resolvedAt: "2026-03-19",
    selectedItems: [
      { itemId: "item-s1", returnQuantity: 1 },
    ],
    reason: "defective",
    resolution: "exchange",
    description:
      "Laptop bị lỗi màn hình, xuất hiện các đường kẻ ngang ngay sau khi bật lần đầu. Đã chụp ảnh và quay video để làm bằng chứng.",
    evidenceUrls: [EVIDENCE_LAPTOP_1, EVIDENCE_MONITOR_1],
  },

  // YC-100004 — rejected, 5 days ago
  {
    id: "YC-100004",
    orderId: "DH-20559",
    status: "rejected",
    submittedAt: "2026-03-17",
    resolvedAt: "2026-03-20",
    selectedItems: [
      { itemId: "item-s3", returnQuantity: 1 },
    ],
    reason: "unsatisfied",
    resolution: "refund",
    description:
      "Chuột không vừa tay với tôi, cảm giác cầm nắm không thoải mái. Muốn hoàn tiền để mua sản phẩm khác phù hợp hơn.",
    evidenceUrls: [EVIDENCE_HEADSET_1, EVIDENCE_CHAIR_1],
    rejectionReason:
      "Yêu cầu không đáp ứng điều kiện đổi/trả — lý do \"không vừa ý\" không thuộc phạm vi bảo hành. Sản phẩm không có lỗi kỹ thuật.",
  },
];
