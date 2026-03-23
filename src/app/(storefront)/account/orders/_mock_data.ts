import type { OrderStatus } from "@/src/app/(storefront)/account/orders/[orderId]/_mock_data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type { OrderStatus };

export interface OrderItem {
  /** Stable item ID — used as the key in return requests */
  id: string;
  name: string;
  /** Human-readable variant attributes, e.g. "16GB / 512GB / Đen" */
  variantLabel: string;
  thumbnailSrc: string;
  quantity: number;
  /** Unit price in VND */
  unitPrice: number;
}

/** @deprecated Use OrderItem instead */
export type OrderSummaryItem = OrderItem;

export interface OrderReview {
  /** 1–5 */
  rating: number;
  comment: string;
  variantLabel: string;
  productName: string;
  /** ISO date string */
  reviewedAt: string;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  /** ISO date string */
  placedAt: string;
  /** ISO date string — set only when delivered */
  deliveredAt?: string;
  /** Days after deliveredAt during which return is allowed (default 7) */
  returnWindowDays: number;
  /** Days after deliveredAt during which review is allowed (default 15) */
  reviewWindowDays: number;
  items: OrderItem[];
  /** Total order value in VND */
  total: number;
  /** Total number of items across all line-items */
  itemCount: number;
  review?: OrderReview;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ORDERS_PER_PAGE = 5;

// ─── Thumbnail URLs ───────────────────────────────────────────────────────────

const THUMB_LAPTOP =
  "https://hanoicomputercdn.com/media/product/92496_laptop_acer_aspire_lite_14_al14_71p_55p9_nx_d7usv_0014.jpg";
const THUMB_PHONE =
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg";
const THUMB_MONITOR =
  "https://hanoicomputercdn.com/media/product/79001_man_hinh_dell_ultrasharp_u2424h_850x850_4.jpg";
const THUMB_KEYBOARD =
  "https://hanoicomputercdn.com/media/product/80947_rog_falchion_rx_low_profile_rd_01.jpg";
const THUMB_MOUSE =
  "https://cdn-files.hacom.vn/hacom/cdn/web/05032026/chuot-razer-deathadder-v4-pro-niko-edition-1.jpg";
const THUMB_HEADSET =
  "https://hanoicomputercdn.com/media/product/91657_tai_nghe_khong_day_corsair_void_v2_carbon_1.jpg";
const THUMB_TABLET =
  "https://hanoicomputercdn.com/media/product/83272_may_tinh_bang_apple_ipad_pro_m4_256gb_11inch_wifi_bac_2024__2_.jpg";
const THUMB_CHAIR =
  "https://hanoicomputercdn.com/media/product/80829_centaur_gundam_avt_2.jpg";

// ─── Mock Orders ──────────────────────────────────────────────────────────────
// Today = 2026-03-23
//
// Return/review window scenarios (delivered orders):
//   DH-20551: −3d  → return ✓  review ✓  (has rejected return YC-100004 → eligible again)
//   DH-20552: −3d  → return ✓  review ✓  (has review)
//   DH-20553: −10d → return ✗  review ✓  (all items covered by approved YC-100005)
//   DH-20554: −20d → return ✗  review ✗
//   DH-20555: −4d  → return ✓  review ✓  (item-22 covered by YC-100001; item-23/22c eligible)
//   DH-20556: −3d  → all items covered by YC-100002 + YC-100003 → disabled button

export const MOCK_ORDERS: OrderSummary[] = [
  // ── pending (2) ────────────────────────────────────────────────────────────
  {
    id: "DH-20601",
    status: "pending",
    placedAt: "2026-03-22",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-1",
        name: "Laptop Dell XPS 15 9530 OLED",
        variantLabel: "Core i7 / 16GB / 512GB / Bạc",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 28_990_000,
      },
    ],
    total: 28_990_000,
    itemCount: 1,
  },
  {
    id: "DH-20598",
    status: "pending",
    placedAt: "2026-03-21",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-2",
        name: "Chuột Logitech MX Master 3S",
        variantLabel: "Màu Graphite / Bluetooth & USB",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 2,
        unitPrice: 1_890_000,
      },
      {
        id: "item-3",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Brown Switch / RGB / Không dây",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_490_000,
      },
      {
        id: "item-4",
        name: "Tai nghe Sony WH-1000XM5",
        variantLabel: "Màu Đen / ANC / Bluetooth",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
        unitPrice: 7_590_000,
      },
    ],
    total: 13_860_000,
    itemCount: 4,
  },

  // ── confirmed (2) ──────────────────────────────────────────────────────────
  {
    id: "DH-20590",
    status: "confirmed",
    placedAt: "2026-03-21",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-5",
        name: "Màn hình LG 27UK850 4K IPS",
        variantLabel: "27\" / 4K / IPS / USB-C",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 6_490_000,
      },
      {
        id: "item-6",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Red Switch / White Backlight / Có dây",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_390_000,
      },
    ],
    total: 8_880_000,
    itemCount: 2,
  },
  {
    id: "DH-20585",
    status: "confirmed",
    placedAt: "2026-03-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-7",
        name: "Laptop ASUS ROG Zephyrus G14",
        variantLabel: "Ryzen 9 / 32GB / 1TB / RTX 4060",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 2,
        unitPrice: 28_990_000,
      },
      {
        id: "item-8",
        name: "Màn hình Dell U2723D 4K",
        variantLabel: "27\" / 4K / IPS / USB-C 90W",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 2,
        unitPrice: 9_490_000,
      },
      {
        id: "item-9",
        name: "Chuột Logitech G Pro X Superlight",
        variantLabel: "Màu Trắng / Không dây / 25600 DPI",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 2_390_000,
      },
      {
        id: "item-10",
        name: "Tai nghe HyperX Cloud Alpha",
        variantLabel: "Màu Đen-Đỏ / Có dây / 7.1 Surround",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
        unitPrice: 1_990_000,
      },
    ],
    total: 63_350_000,
    itemCount: 6,
  },

  // ── preparing (2) ─────────────────────────────────────────────────────────
  {
    id: "DH-20575",
    status: "preparing",
    placedAt: "2026-03-19",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-11",
        name: "Chuột Logitech MX Master 3S",
        variantLabel: "Màu Trắng / Bluetooth & USB",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 1_890_000,
      },
      {
        id: "item-12",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Blue Switch / RGB / Không dây",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_490_000,
      },
      {
        id: "item-13",
        name: "Tai nghe Sony WH-1000XM5",
        variantLabel: "Màu Bạc / ANC / Bluetooth",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
        unitPrice: 7_590_000,
      },
    ],
    total: 9_530_000,
    itemCount: 3,
  },
  {
    id: "DH-20570",
    status: "preparing",
    placedAt: "2026-03-18",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-14",
        name: "Laptop MacBook Pro M3 14\"",
        variantLabel: "M3 Pro / 18GB / 512GB / Xám",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 39_990_000,
      },
      {
        id: "item-15",
        name: "iPad Pro M4 11\"",
        variantLabel: "M4 / 256GB / Wi-Fi / Bạc",
        thumbnailSrc: THUMB_TABLET,
        quantity: 2,
        unitPrice: 22_990_000,
      },
      {
        id: "item-16",
        name: "Màn hình LG 27UK850 4K IPS",
        variantLabel: "27\" / 4K / IPS / USB-C",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 6_490_000,
      },
      {
        id: "item-17",
        name: "Ghế gaming DXRacer Formula",
        variantLabel: "Màu Đen-Đỏ / Size M / Da PU",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
        unitPrice: 5_990_000,
      },
    ],
    total: 33_520_000,
    itemCount: 5,
  },

  // ── shipping (2) ──────────────────────────────────────────────────────────
  {
    id: "DH-20565",
    status: "shipping",
    placedAt: "2026-03-17",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-18",
        name: "Màn hình Samsung Odyssey G7 32\"",
        variantLabel: "32\" / QHD / VA / 240Hz / Cong",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 18_500_000,
      },
    ],
    total: 18_500_000,
    itemCount: 1,
  },
  {
    id: "DH-20483",
    status: "shipping",
    placedAt: "2026-03-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-19",
        name: "Laptop ASUS ROG Zephyrus G14",
        variantLabel: "Ryzen 9 / 16GB / 512GB / Trắng",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 2,
        unitPrice: 24_990_000,
      },
      {
        id: "item-20",
        name: "iPhone 16 Pro Max 256GB",
        variantLabel: "256GB / Titan Tự nhiên",
        thumbnailSrc: THUMB_PHONE,
        quantity: 3,
        unitPrice: 34_990_000,
      },
      {
        id: "item-21",
        name: "Tai nghe Sony WH-1000XM5",
        variantLabel: "Màu Đen / ANC / Bluetooth",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 2,
        unitPrice: 7_590_000,
      },
    ],
    total: 69_760_000,
    itemCount: 7,
  },

  // ── delivered — scenarios for return/review feature ────────────────────────

  // DH-20551: −3 days, return ✓ review ✓
  // YC-100004 rejected item-b1 → item-b1 is eligible again; item-b2/b3 never returned
  {
    id: "DH-20551",
    status: "delivered",
    placedAt: "2026-03-17",
    deliveredAt: "2026-03-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-b1",
        name: "Chuột Razer DeathAdder V4 Pro",
        variantLabel: "Màu Đen / Không dây / 30000 DPI",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 2_890_000,
      },
      {
        id: "item-b2",
        name: "Bàn phím cơ Keychron Q1 Pro",
        variantLabel: "Brown Switch / RGB / Aluminum",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 3_490_000,
      },
      {
        id: "item-b3",
        name: "Tai nghe Corsair Void V2 Carbon",
        variantLabel: "Màu Đen / 2.4GHz Wireless / 7.1 Surround",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
        unitPrice: 1_990_000,
      },
    ],
    total: 8_370_000,
    itemCount: 3,
  },

  // DH-20552: −3 days, return ✓ review ✓ (has review — "Xem đánh giá")
  {
    id: "DH-20552",
    status: "delivered",
    placedAt: "2026-03-17",
    deliveredAt: "2026-03-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-d1",
        name: "iPhone 16 Pro Max 256GB",
        variantLabel: "256GB / Titan Đen",
        thumbnailSrc: THUMB_PHONE,
        quantity: 1,
        unitPrice: 34_990_000,
      },
      {
        id: "item-d2",
        name: "Chuột Logitech MX Master 3S",
        variantLabel: "Màu Graphite / Bluetooth & USB",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 1_890_000,
      },
      {
        id: "item-d3",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Brown Switch / RGB / Không dây",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_490_000,
      },
    ],
    total: 39_370_000,
    itemCount: 3,
    review: {
      rating: 5,
      comment:
        "Điện thoại chính hãng, đóng gói cẩn thận, giao hàng đúng hẹn. Camera cực kỳ đẹp và pin trâu hơn mình nghĩ. Rất hài lòng với lần mua này!",
      variantLabel: "256GB / Titan Đen",
      productName: "iPhone 16 Pro Max 256GB",
      reviewedAt: "2026-03-22",
    },
  },

  // DH-20553: −10 days, return ✗ (expired) review ✓
  // All 3 items covered by approved YC-100005 → wizard shows empty-state
  {
    id: "DH-20553",
    status: "delivered",
    placedAt: "2026-03-10",
    deliveredAt: "2026-03-13",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-c1",
        name: "Ghế gaming Centaur Gundam",
        variantLabel: "Màu Đen-Đỏ / Size L / Lưng lưới",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
        unitPrice: 4_990_000,
      },
      {
        id: "item-c2",
        name: "Tai nghe Corsair Void V2 Carbon",
        variantLabel: "Màu Đen / 2.4GHz Wireless / 7.1 Surround",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
        unitPrice: 1_990_000,
      },
      {
        id: "item-c3",
        name: "Chuột Razer DeathAdder V4 Pro",
        variantLabel: "Màu Đen / Không dây / 30000 DPI",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 2_890_000,
      },
    ],
    total: 9_870_000,
    itemCount: 3,
  },

  // DH-20554: −20 days, both return ✗ and review ✗
  {
    id: "DH-20554",
    status: "delivered",
    placedAt: "2026-02-28",
    deliveredAt: "2026-03-03",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-e1",
        name: "Laptop Acer Aspire Lite 14",
        variantLabel: "Core i5-1335U / 16GB / 512GB / Bạc",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 14_990_000,
      },
      {
        id: "item-e2",
        name: "Màn hình Dell UltraSharp U2424H",
        variantLabel: "24\" / FHD / IPS / USB-C 90W",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 7_990_000,
      },
      {
        id: "item-e3",
        name: "Bàn phím cơ Keychron K2 Pro",
        variantLabel: "Red Switch / RGB / Compact",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_290_000,
      },
    ],
    total: 25_270_000,
    itemCount: 3,
  },

  // DH-20555: −4 days, return ✓ review ✓ (item-22 covered by YC-100001; item-23 + item-22c eligible)
  {
    id: "DH-20555",
    status: "delivered",
    placedAt: "2026-03-18",
    deliveredAt: "2026-03-19",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-22",
        name: "Chuột Logitech MX Master 3S",
        variantLabel: "Màu Graphite / Bluetooth & USB",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 1_890_000,
      },
      {
        id: "item-23",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Brown Switch / RGB / Không dây",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_490_000,
      },
      {
        id: "item-22c",
        name: "Tai nghe Corsair Void V2 Carbon",
        variantLabel: "Màu Đen / 2.4GHz Wireless / 7.1 Surround",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 2,
        unitPrice: 1_990_000,
      },
    ],
    total: 8_260_000,
    itemCount: 4,
  },

  // DH-20556: −3 days, ALL items covered (item-a1+a2 by YC-100002, item-a3 by YC-100003)
  {
    id: "DH-20556",
    status: "delivered",
    placedAt: "2026-03-17",
    deliveredAt: "2026-03-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-a1",
        name: "Laptop ASUS ROG Strix G16",
        variantLabel: "Core i9 / 32GB / 1TB / RTX 4070 / Đen",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 42_990_000,
      },
      {
        id: "item-a2",
        name: "Màn hình Dell UltraSharp U2424H",
        variantLabel: "24\" / FHD / IPS / USB-C 90W",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 7_990_000,
      },
      {
        id: "item-a3",
        name: "iPad Pro M4 11\"",
        variantLabel: "M4 / 256GB / Wi-Fi / Bạc",
        thumbnailSrc: THUMB_TABLET,
        quantity: 1,
        unitPrice: 22_990_000,
      },
    ],
    total: 73_970_000,
    itemCount: 3,
  },

  // DH-20557: pending — no deliveredAt → no action buttons
  {
    id: "DH-20557",
    status: "pending",
    placedAt: "2026-03-23",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-f1",
        name: "Laptop MacBook Air M3 13\"",
        variantLabel: "M3 / 8GB / 256GB / Midnight",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 26_990_000,
      },
      {
        id: "item-f2",
        name: "iPad Pro M4 11\"",
        variantLabel: "M4 / 512GB / Wi-Fi + Cellular / Bạc",
        thumbnailSrc: THUMB_TABLET,
        quantity: 1,
        unitPrice: 28_990_000,
      },
    ],
    total: 55_980_000,
    itemCount: 2,
  },

  // DH-20558: cancelled — no action buttons
  {
    id: "DH-20558",
    status: "cancelled",
    placedAt: "2026-03-15",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-g1",
        name: "Màn hình Samsung Odyssey G7 32\"",
        variantLabel: "32\" / QHD / VA / 240Hz / Cong",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 18_500_000,
      },
      {
        id: "item-g2",
        name: "Ghế gaming DXRacer Formula",
        variantLabel: "Màu Đen-Trắng / Size L / Da PU",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
        unitPrice: 5_990_000,
      },
    ],
    total: 24_490_000,
    itemCount: 2,
  },

  // ── Legacy delivered orders (preserved) ───────────────────────────────────

  // 10 days ago — return expired, review still allowed
  {
    id: "DH-20391",
    status: "delivered",
    placedAt: "2026-03-10",
    deliveredAt: "2026-03-12",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-24",
        name: "Laptop Dell XPS 15 9530 OLED",
        variantLabel: "Core i7 / 16GB / 512GB / Bạc",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 28_990_000,
      },
      {
        id: "item-25",
        name: "iPhone 16 Pro Max 256GB",
        variantLabel: "256GB / Titan Tự nhiên",
        thumbnailSrc: THUMB_PHONE,
        quantity: 2,
        unitPrice: 34_990_000,
      },
      {
        id: "item-26",
        name: "Màn hình LG 27UK850 4K IPS",
        variantLabel: "27\" / 4K / IPS / USB-C",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 6_490_000,
      },
      {
        id: "item-27",
        name: "iPad Pro M4 11\"",
        variantLabel: "M4 / 256GB / Wi-Fi / Bạc",
        thumbnailSrc: THUMB_TABLET,
        quantity: 1,
        unitPrice: 22_990_000,
      },
      {
        id: "item-28",
        name: "Ghế gaming DXRacer Formula",
        variantLabel: "Màu Đen-Đỏ / Size M / Da PU",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
        unitPrice: 5_990_000,
      },
    ],
    total: 24_150_000,
    itemCount: 6,
  },

  // 20 days ago — both expired
  {
    id: "DH-20480",
    status: "delivered",
    placedAt: "2026-02-28",
    deliveredAt: "2026-03-02",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-29",
        name: "Tai nghe Sony WH-1000XM5",
        variantLabel: "Màu Đen / ANC / Bluetooth",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
        unitPrice: 7_590_000,
      },
    ],
    total: 2_890_000,
    itemCount: 1,
  },

  // 2 days ago — both allowed; has review
  {
    id: "DH-20420",
    status: "delivered",
    placedAt: "2026-02-15",
    deliveredAt: "2026-03-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-30",
        name: "iPhone 16 Pro Max 256GB",
        variantLabel: "256GB / Titan Đen",
        thumbnailSrc: THUMB_PHONE,
        quantity: 2,
        unitPrice: 34_990_000,
      },
      {
        id: "item-31",
        name: "Chuột Logitech MX Master 3S",
        variantLabel: "Màu Graphite / Bluetooth & USB",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
        unitPrice: 1_890_000,
      },
      {
        id: "item-32",
        name: "Bàn phím cơ Keychron K8 Pro",
        variantLabel: "Brown Switch / RGB / Không dây",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
        unitPrice: 2_490_000,
      },
    ],
    total: 18_520_000,
    itemCount: 4,
    review: {
      rating: 5,
      comment:
        "Điện thoại chính hãng, đóng gói cẩn thận, giao hàng đúng hẹn. Camera cực kỳ đẹp và pin trâu hơn mình nghĩ. Rất hài lòng!",
      variantLabel: "256GB / Titan Đen",
      productName: "iPhone 16 Pro Max 256GB",
      reviewedAt: "2026-03-21",
    },
  },

  // ── cancelled (legacy) ────────────────────────────────────────────────────
  {
    id: "DH-20460",
    status: "cancelled",
    placedAt: "2026-03-05",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-33",
        name: "Laptop ASUS ROG Zephyrus G14",
        variantLabel: "Ryzen 9 / 32GB / 1TB / RTX 4060",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
        unitPrice: 28_990_000,
      },
      {
        id: "item-34",
        name: "Màn hình Dell U2723D 4K",
        variantLabel: "27\" / 4K / IPS / USB-C 90W",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
        unitPrice: 9_490_000,
      },
      {
        id: "item-35",
        name: "Ghế gaming DXRacer Formula",
        variantLabel: "Màu Đen-Đỏ / Size M / Da PU",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
        unitPrice: 5_990_000,
      },
    ],
    total: 9_070_000,
    itemCount: 3,
  },
  {
    id: "DH-20440",
    status: "cancelled",
    placedAt: "2026-02-20",
    returnWindowDays: 7,
    reviewWindowDays: 15,
    items: [
      {
        id: "item-36",
        name: "iPad Pro M4 11\"",
        variantLabel: "M4 / 256GB / Wi-Fi / Bạc",
        thumbnailSrc: THUMB_TABLET,
        quantity: 1,
        unitPrice: 22_990_000,
      },
    ],
    total: 3_290_000,
    itemCount: 1,
  },
];
