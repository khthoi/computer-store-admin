import type { ComponentType } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"    // Chờ xác nhận — cancellable
  | "confirmed"  // Đã xác nhận
  | "preparing"  // Đang chuẩn bị
  | "shipping"   // Đang giao hàng
  | "delivered"  // Đã giao — returnable + reviewable
  | "cancelled"; // Đã hủy

export interface TimelineEvent {
  /** Which lifecycle step this event represents. "cancelled" = cancellation step. */
  status: OrderStatus;
  label: string;
  /** ISO string when this step occurred; null = not yet reached. */
  timestamp: string | null;
  /** Carrier note, cancel reason, etc. */
  note?: string;
  completed: boolean;
}

export interface OrderDetailItem {
  id: string;
  name: string;
  slug: string;
  thumbnailSrc: string;
  brand: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  originalUnitPrice?: number; // present when item was discounted
}

export interface ShippingInfo {
  recipientName: string;
  phone: string;
  /** Pre-formatted full address string. */
  address: string;
  carrierName: string;
  trackingCode: string;
  trackingUrl?: string; // external carrier tracking URL
}

export interface PaymentSummary {
  subtotal: number;
  /** Total item-level savings (original − current across all items). */
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  shippingFee: number;
  total: number;
  paymentMethod: { id: string; name: string };
}

export interface OrderDetail {
  id: string;
  status: OrderStatus;
  placedAt: string; // ISO string
  /** 5 standard lifecycle steps. Cancellation step is appended on cancel. */
  timeline: TimelineEvent[];
  shipping: ShippingInfo;
  items: OrderDetailItem[];
  payment: PaymentSummary;
  /** Days after placement that a return request is allowed. */
  returnWindowDays: number;
  cancelReason?: string; // populated when status === "cancelled"
}

// ─── Status meta ──────────────────────────────────────────────────────────────

export interface StatusMeta {
  label: string;
  /** Tailwind classes for the badge container (bg + border). */
  containerClass: string;
  /** Tailwind text color class for label. */
  textClass: string;
  /** Tailwind icon color class. */
  iconClass: string;
  /** Tailwind color class for the timeline pulsing ring. */
  ringClass: string;
  /** Tailwind color class for completed connecting lines. */
  completedLineClass: string;
  /** Tailwind color class for completed circle background. */
  completedCircleClass: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

/**
 * Single source of truth for status label, colors, and icon.
 * Imported by OrderStatusBadge and OrderTimeline — never duplicated.
 */
export function getStatusMeta(status: OrderStatus): StatusMeta {
  switch (status) {
    case "pending":
      return {
        label: "Chờ xác nhận",
        containerClass: "bg-warning-50 border border-warning-200",
        textClass: "text-warning-700",
        iconClass: "text-warning-600",
        ringClass: "bg-warning-400",
        completedLineClass: "bg-warning-300",
        completedCircleClass: "bg-warning-500",
        Icon: ClockIcon,
      };
    case "confirmed":
      return {
        label: "Đã xác nhận",
        containerClass: "bg-info-50 border border-info-200",
        textClass: "text-info-700",
        iconClass: "text-info-600",
        ringClass: "bg-info-400",
        completedLineClass: "bg-info-300",
        completedCircleClass: "bg-info-500",
        Icon: CheckCircleIcon,
      };
    case "preparing":
      return {
        label: "Đang chuẩn bị",
        containerClass: "bg-secondary-100 border border-secondary-200",
        textClass: "text-secondary-700",
        iconClass: "text-secondary-500",
        ringClass: "bg-secondary-400",
        completedLineClass: "bg-secondary-300",
        completedCircleClass: "bg-secondary-500",
        Icon: ArchiveBoxIcon,
      };
    case "shipping":
      return {
        label: "Đang giao hàng",
        containerClass: "bg-primary-50 border border-primary-200",
        textClass: "text-primary-700",
        iconClass: "text-primary-600",
        ringClass: "bg-primary-400",
        completedLineClass: "bg-primary-300",
        completedCircleClass: "bg-primary-500",
        Icon: TruckIcon,
      };
    case "delivered":
      return {
        label: "Đã giao hàng",
        containerClass: "bg-success-50 border border-success-200",
        textClass: "text-success-700",
        iconClass: "text-success-600",
        ringClass: "bg-success-400",
        completedLineClass: "bg-success-300",
        completedCircleClass: "bg-success-500",
        Icon: CheckBadgeIcon,
      };
    case "cancelled":
      return {
        label: "Đã hủy",
        containerClass: "bg-error-50 border border-error-200",
        textClass: "text-error-700",
        iconClass: "text-error-600",
        ringClass: "bg-error-400",
        completedLineClass: "bg-error-300",
        completedCircleClass: "bg-error-500",
        Icon: XCircleIcon,
      };
  }
}

// ─── Shared timeline builder ───────────────────────────────────────────────────

/**
 * Builds the 5-step standard lifecycle timeline.
 * Each step up to and including `currentStatus` is marked completed.
 */
function buildTimeline(
  currentStatus: OrderStatus,
  timestamps: Partial<Record<OrderStatus, string>>
): TimelineEvent[] {
  const STEPS: { status: OrderStatus; label: string }[] = [
    { status: "pending",   label: "Đặt hàng thành công" },
    { status: "confirmed", label: "Đã xác nhận đơn hàng" },
    { status: "preparing", label: "Đang chuẩn bị hàng" },
    { status: "shipping",  label: "Đang giao hàng" },
    { status: "delivered", label: "Giao hàng thành công" },
  ];

  const ORDER: OrderStatus[] = ["pending", "confirmed", "preparing", "shipping", "delivered"];
  const currentIdx = ORDER.indexOf(currentStatus === "cancelled" ? "pending" : currentStatus);

  return STEPS.map((step, i) => ({
    status: step.status,
    label: step.label,
    timestamp: timestamps[step.status] ?? null,
    completed: i <= currentIdx,
  }));
}

// ─── Mock: "Chờ xác nhận" (pending — cancel button visible) ─────────────────
//
// Same items & pricing as the shipping mock.
// Only the "pending" step is completed; remaining steps have no timestamp.

export const MOCK_ORDER_PENDING: OrderDetail = {
  id: "DH-20512",
  status: "pending",
  placedAt: "2026-03-22T09:15:00.000Z",
  returnWindowDays: 7,
  timeline: buildTimeline("pending", {
    pending: "2026-03-22T09:15:00.000Z",
  }),
  shipping: {
    recipientName: "Nguyễn Văn An",
    phone: "0901 234 567",
    address: "Số 10, ngõ 5, đường Xuân Thủy, Dịch Vọng, Cầu Giấy, Hà Nội",
    carrierName: "GHN Express",
    trackingCode: "GHN20512VNA",
  },
  items: [
    {
      id: "laptop-asus-rog-g16__ram-16gb__ssd-512gb",
      name: "ASUS ROG Strix G16 G614JV Gaming Laptop Intel Core i7-13650HX",
      slug: "laptop-asus-rog-strix-g16-g614jv",
      thumbnailSrc:
        "https://hanoicomputercdn.com/media/product/53845_laptop_asus_gaming_rog_strix_g512_ial001t_den_10.jpeg",
      brand: "ASUS",
      variantLabel: "RAM 16GB / SSD 512GB",
      quantity: 1,
      unitPrice: 28_990_000,
      subtotal: 28_990_000,
      originalUnitPrice: 32_990_000,
    },
    {
      id: "gpu-rtx4070-super__vram-12gb",
      name: "ASUS TUF Gaming GeForce RTX 4070 SUPER OC Edition 12GB GDDR6X",
      slug: "gpu-asus-tuf-rtx4070-super-oc",
      thumbnailSrc:
        "https://cdn-files.hacom.vn/hacom/cdn/web/09032026/Laptop-Asus-Gaming-TUF-FA608PP-RV089W-R9-8940HX16GB-RAM512GB-SSD16-WUXGA-165hzRTX-5070-8GBWin11Xam-5.jpg",
      brand: "ASUS",
      variantLabel: "VRAM 12GB",
      quantity: 1,
      unitPrice: 18_500_000,
      subtotal: 18_500_000,
    },
    {
      id: "monitor-lg-27gp850__res-1440p",
      name: 'LG UltraGear 27GP850-B 27" QHD Nano IPS 165Hz 1ms Gaming Monitor',
      slug: "monitor-lg-ultragear-27gp850-b",
      thumbnailSrc:
        "https://www.lg.com/content/dam/channel/wcms/sg/images/consumer-monitors/27gp850-b_ahk_easl_sg_c/gallery/27GP850-B-UltraGear-Gaming-Monitors-DZ01.jpg",
      brand: "LG",
      variantLabel: "QHD 1440p",
      quantity: 1,
      unitPrice: 7_490_000,
      subtotal: 7_490_000,
      originalUnitPrice: 8_990_000,
    },
    {
      id: "ssd-samsung-990pro__cap-2tb__if-pcie4",
      name: "Samsung 990 PRO NVMe M.2 SSD PCIe 4.0 x4 with Heatsink",
      slug: "ssd-samsung-990-pro-nvme",
      thumbnailSrc:
        "https://product.hstatic.net/200000309925/product/ssd-samsung-990-pro-pcie-gen-4-0_44df4b84b34f4289a2e25001fa91151c_master.png",
      brand: "Samsung",
      variantLabel: "2TB / PCIe 4.0",
      quantity: 2,
      unitPrice: 2_890_000,
      subtotal: 5_780_000,
      originalUnitPrice: 3_490_000,
    },
    {
      id: "kb-keychron-q3__switch-brown__layout-tkl",
      name: "Keychron Q3 QMK Custom Mechanical Keyboard Aluminum Frame",
      slug: "keyboard-keychron-q3-qmk",
      thumbnailSrc:
        "https://www.keychron.com/cdn/shop/products/Q3-N1-Keychron-Q3-QMK-VIA-custom-mechanical-keyboard-tenkeyless-layout-full-aluminum-grey-frame-knob-for-Mac-Windows-iOS-with-hot-swappable-Gateron-G-Pro-switch-red_1800x1800.jpg?v=1659423523",
      brand: "Keychron",
      variantLabel: "Switch Brown / TKL Layout",
      quantity: 1,
      unitPrice: 3_290_000,
      subtotal: 3_290_000,
    },
    {
      id: "mouse-logitech-g502x__color-white",
      name: "Logitech G502 X PLUS Wireless Gaming Mouse LIGHTSPEED HERO 25K",
      slug: "mouse-logitech-g502x-plus-wireless",
      thumbnailSrc:
        "https://www.androidauthority.com/wp-content/uploads/2024/09/Logitech-G502-X-Plus-Lightspeed.jpg",
      brand: "Logitech",
      variantLabel: "Màu Trắng",
      quantity: 1,
      unitPrice: 2_190_000,
      subtotal: 2_190_000,
      originalUnitPrice: 2_790_000,
    },
    {
      id: "cooler-nzxt-kraken-360",
      name: "NZXT Kraken 360 RGB 360mm AIO Liquid CPU Cooler with LCD Display",
      slug: "cooler-nzxt-kraken-360-rgb",
      thumbnailSrc:
        "https://m.media-amazon.com/images/I/41VBuuOSSpL._SL1000_.jpg",
      brand: "NZXT",
      variantLabel: "",
      quantity: 1,
      unitPrice: 5_490_000,
      subtotal: 5_490_000,
      originalUnitPrice: 5_990_000,
    },
  ],
  payment: {
    subtotal: 71_730_000,
    discount: 7_800_000,
    couponCode: "GAMING200K",
    couponDiscount: 2_000_000,
    shippingFee: 30_000,
    total: 69_760_000,
    paymentMethod: { id: "momo", name: "Ví MoMo" },
  },
};

// ─── Mock: "Đang giao hàng" (shipping, 7 items) ───────────────────────────────
//
// Subtotal = 28 990 000 + 18 500 000 + 7 490 000 + 5 780 000
//          + 3 290 000 + 2 190 000 + 5 490 000
//          = 71 730 000
// Savings  = 4 000 000 + 0 + 1 500 000 + 1 200 000 + 0 + 600 000 + 500 000
//          = 7 800 000
// Coupon GAMING200K = 2 000 000
// Shipping = 30 000
// Total    = 71 730 000 − 2 000 000 + 30 000 = 69 760 000

export const MOCK_ORDER_SHIPPING: OrderDetail = {
  id: "DH-20483",
  status: "shipping",
  placedAt: "2026-03-20T10:30:00.000Z",
  returnWindowDays: 7,
  timeline: buildTimeline("shipping", {
    pending:   "2026-03-20T10:30:00.000Z",
    confirmed: "2026-03-20T11:05:00.000Z",
    preparing: "2026-03-21T08:20:00.000Z",
    shipping:  "2026-03-22T07:45:00.000Z",
  }),
  shipping: {
    recipientName: "Nguyễn Văn An",
    phone: "0901 234 567",
    address: "Số 10, ngõ 5, đường Xuân Thủy, Dịch Vọng, Cầu Giấy, Hà Nội",
    carrierName: "GHN Express",
    trackingCode: "GHN20483VNA",
    trackingUrl: "https://ghn.vn/tracking/GHN20483VNA",
  },
  items: [
    {
      id: "laptop-asus-rog-g16__ram-16gb__ssd-512gb",
      name: "ASUS ROG Strix G16 G614JV Gaming Laptop Intel Core i7-13650HX",
      slug: "laptop-asus-rog-strix-g16-g614jv",
      thumbnailSrc:
        "https://hanoicomputercdn.com/media/product/53845_laptop_asus_gaming_rog_strix_g512_ial001t_den_10.jpeg",
      brand: "ASUS",
      variantLabel: "RAM 16GB / SSD 512GB",
      quantity: 1,
      unitPrice: 28_990_000,
      subtotal: 28_990_000,
      originalUnitPrice: 32_990_000,
    },
    {
      id: "gpu-rtx4070-super__vram-12gb",
      name: "ASUS TUF Gaming GeForce RTX 4070 SUPER OC Edition 12GB GDDR6X",
      slug: "gpu-asus-tuf-rtx4070-super-oc",
      thumbnailSrc:
        "https://cdn-files.hacom.vn/hacom/cdn/web/09032026/Laptop-Asus-Gaming-TUF-FA608PP-RV089W-R9-8940HX16GB-RAM512GB-SSD16-WUXGA-165hzRTX-5070-8GBWin11Xam-5.jpg",
      brand: "ASUS",
      variantLabel: "VRAM 12GB",
      quantity: 1,
      unitPrice: 18_500_000,
      subtotal: 18_500_000,
    },
    {
      id: "monitor-lg-27gp850__res-1440p",
      name: 'LG UltraGear 27GP850-B 27" QHD Nano IPS 165Hz 1ms Gaming Monitor',
      slug: "monitor-lg-ultragear-27gp850-b",
      thumbnailSrc:
        "https://www.lg.com/content/dam/channel/wcms/sg/images/consumer-monitors/27gp850-b_ahk_easl_sg_c/gallery/27GP850-B-UltraGear-Gaming-Monitors-DZ01.jpg",
      brand: "LG",
      variantLabel: "QHD 1440p",
      quantity: 1,
      unitPrice: 7_490_000,
      subtotal: 7_490_000,
      originalUnitPrice: 8_990_000,
    },
    {
      id: "ssd-samsung-990pro__cap-2tb__if-pcie4",
      name: "Samsung 990 PRO NVMe M.2 SSD PCIe 4.0 x4 with Heatsink",
      slug: "ssd-samsung-990-pro-nvme",
      thumbnailSrc:
        "https://product.hstatic.net/200000309925/product/ssd-samsung-990-pro-pcie-gen-4-0_44df4b84b34f4289a2e25001fa91151c_master.png",
      brand: "Samsung",
      variantLabel: "2TB / PCIe 4.0",
      quantity: 2,
      unitPrice: 2_890_000,
      subtotal: 5_780_000,
      originalUnitPrice: 3_490_000,
    },
    {
      id: "kb-keychron-q3__switch-brown__layout-tkl",
      name: "Keychron Q3 QMK Custom Mechanical Keyboard Aluminum Frame",
      slug: "keyboard-keychron-q3-qmk",
      thumbnailSrc:
        "https://www.keychron.com/cdn/shop/products/Q3-N1-Keychron-Q3-QMK-VIA-custom-mechanical-keyboard-tenkeyless-layout-full-aluminum-grey-frame-knob-for-Mac-Windows-iOS-with-hot-swappable-Gateron-G-Pro-switch-red_1800x1800.jpg?v=1659423523",
      brand: "Keychron",
      variantLabel: "Switch Brown / TKL Layout",
      quantity: 1,
      unitPrice: 3_290_000,
      subtotal: 3_290_000,
    },
    {
      id: "mouse-logitech-g502x__color-white",
      name: "Logitech G502 X PLUS Wireless Gaming Mouse LIGHTSPEED HERO 25K",
      slug: "mouse-logitech-g502x-plus-wireless",
      thumbnailSrc:
        "https://www.androidauthority.com/wp-content/uploads/2024/09/Logitech-G502-X-Plus-Lightspeed.jpg",
      brand: "Logitech",
      variantLabel: "Màu Trắng",
      quantity: 1,
      unitPrice: 2_190_000,
      subtotal: 2_190_000,
      originalUnitPrice: 2_790_000,
    },
    {
      id: "cooler-nzxt-kraken-360",
      name: "NZXT Kraken 360 RGB 360mm AIO Liquid CPU Cooler with LCD Display",
      slug: "cooler-nzxt-kraken-360-rgb",
      thumbnailSrc:
        "https://m.media-amazon.com/images/I/41VBuuOSSpL._SL1000_.jpg",
      brand: "NZXT",
      variantLabel: "",
      quantity: 1,
      unitPrice: 5_490_000,
      subtotal: 5_490_000,
      originalUnitPrice: 5_990_000,
    },
  ],
  payment: {
    subtotal: 71_730_000,
    discount: 7_800_000,
    couponCode: "GAMING200K",
    couponDiscount: 2_000_000,
    shippingFee: 30_000,
    total: 69_760_000,
    paymentMethod: { id: "momo", name: "Ví MoMo" },
  },
};

// ─── Mock: "Đã giao hàng" (delivered, 6 items, within return window) ──────────
//
// Subtotal = 3 290 000 + 2 190 000 + 8 300 000 + 5 490 000 + 3 990 000 + 1 390 000
//          = 24 650 000
// Savings  = 0 + 600 000 + 1 280 000 + 500 000 + 600 000 + 0
//          = 2 980 000
// Coupon SAVE500K = 500 000
// Shipping = 0 (free)
// Total    = 24 650 000 − 500 000 = 24 150 000

export const MOCK_ORDER_DELIVERED: OrderDetail = {
  id: "DH-20391",
  status: "delivered",
  // Placed 3 days ago — within 7-day return window
  placedAt: "2026-03-19T09:00:00.000Z",
  returnWindowDays: 7,
  timeline: buildTimeline("delivered", {
    pending:   "2026-03-19T09:00:00.000Z",
    confirmed: "2026-03-19T09:45:00.000Z",
    preparing: "2026-03-20T08:10:00.000Z",
    shipping:  "2026-03-21T07:30:00.000Z",
    delivered: "2026-03-21T16:20:00.000Z",
  }),
  shipping: {
    recipientName: "Nguyễn Văn An",
    phone: "0901 234 567",
    address: "123 Lê Lợi, tầng 5, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    carrierName: "GHTK",
    trackingCode: "GHTK20391VNA",
    trackingUrl: "https://ghtk.vn/tracking/GHTK20391VNA",
  },
  items: [
    {
      id: "kb-keychron-q3__switch-brown__layout-tkl",
      name: "Keychron Q3 QMK Custom Mechanical Keyboard Aluminum Frame",
      slug: "keyboard-keychron-q3-qmk",
      thumbnailSrc:
        "https://www.keychron.com/cdn/shop/products/Q3-N1-Keychron-Q3-QMK-VIA-custom-mechanical-keyboard-tenkeyless-layout-full-aluminum-grey-frame-knob-for-Mac-Windows-iOS-with-hot-swappable-Gateron-G-Pro-switch-red_1800x1800.jpg?v=1659423523",
      brand: "Keychron",
      variantLabel: "Switch Brown / TKL Layout",
      quantity: 1,
      unitPrice: 3_290_000,
      subtotal: 3_290_000,
    },
    {
      id: "mouse-logitech-g502x__color-white",
      name: "Logitech G502 X PLUS Wireless Gaming Mouse LIGHTSPEED HERO 25K",
      slug: "mouse-logitech-g502x-plus-wireless",
      thumbnailSrc:
        "https://www.androidauthority.com/wp-content/uploads/2024/09/Logitech-G502-X-Plus-Lightspeed.jpg",
      brand: "Logitech",
      variantLabel: "Màu Trắng",
      quantity: 1,
      unitPrice: 2_190_000,
      subtotal: 2_190_000,
      originalUnitPrice: 2_790_000,
    },
    {
      id: "ram-corsair-dominator-ddr5__cap-32gb__speed-6000",
      name: "Corsair Dominator Platinum RGB DDR5 Desktop Memory Kit",
      slug: "ram-corsair-dominator-ddr5-6000",
      thumbnailSrc:
        "https://res.cloudinary.com/corsair-pwa/image/upload/f_auto,q_auto/v1/akamai/pdp/dram/dom-plat-ddr5-amd/images/domplatrgb_amd_feat.png",
      brand: "Corsair",
      variantLabel: "32GB (2×16GB) / 6000MHz",
      quantity: 2,
      unitPrice: 4_150_000,
      subtotal: 8_300_000,
      originalUnitPrice: 4_790_000,
    },
    {
      id: "cooler-nzxt-kraken-360",
      name: "NZXT Kraken 360 RGB 360mm AIO Liquid CPU Cooler with LCD Display",
      slug: "cooler-nzxt-kraken-360-rgb",
      thumbnailSrc:
        "https://m.media-amazon.com/images/I/41VBuuOSSpL._SL1000_.jpg",
      brand: "NZXT",
      variantLabel: "",
      quantity: 1,
      unitPrice: 5_490_000,
      subtotal: 5_490_000,
      originalUnitPrice: 5_990_000,
    },
    {
      id: "headset-steelseries-arctis-nova7",
      name: "SteelSeries Arctis Nova 7 Wireless Multi-System Gaming Headset",
      slug: "headset-steelseries-arctis-nova7-wireless",
      thumbnailSrc:
        "https://m.media-amazon.com/images/I/61+WSjGgFzL._AC_.jpg",
      brand: "SteelSeries",
      variantLabel: "Màu Đen",
      quantity: 1,
      unitPrice: 3_990_000,
      subtotal: 3_990_000,
      originalUnitPrice: 4_590_000,
    },
    {
      id: "ssd-samsung-870qvo__cap-1tb__if-sata",
      name: "Samsung 870 QVO 1TB SATA III 2.5\" Internal SSD MZ-77Q1T0",
      slug: "ssd-samsung-870-qvo-1tb",
      thumbnailSrc:
        "https://image-us.samsung.com/SamsungUS/home/computing/memory-storage/solid-state-drives/07272020/870-QVO-1TB-MZ-77Q1T0B-1600x1200.jpg",
      brand: "Samsung",
      variantLabel: "1TB / SATA III",
      quantity: 1,
      unitPrice: 1_390_000,
      subtotal: 1_390_000,
    },
  ],
  payment: {
    subtotal: 24_650_000,
    discount: 2_980_000,
    couponCode: "SAVE500K",
    couponDiscount: 500_000,
    shippingFee: 0,
    total: 24_150_000,
    paymentMethod: { id: "bank-transfer", name: "Chuyển khoản ngân hàng" },
  },
};
