import type { OrderStatus } from "@/src/app/(storefront)/account/orders/[orderId]/_mock_data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type { OrderStatus };

export interface OrderSummaryItem {
  id: string;
  name: string;
  thumbnailSrc: string;
  quantity: number;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  /** ISO date string — date the order was placed. */
  placedAt: string;
  items: OrderSummaryItem[];
  /** Total order value in VND. */
  total: number;
  /** Total number of items across all line-items. */
  itemCount: number;
  /** True if the user has already submitted a review for this order. */
  reviewed: boolean;
  /** How many days after delivery the return window is open. */
  returnWindowDays: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ORDERS_PER_PAGE = 5;

// ─── Mock items (reusable thumbnails) ────────────────────────────────────────

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

// ─── Mock Orders (14 entries, today = 2026-03-22) ────────────────────────────
// Tab counts: all=14, pending=2, confirmed+preparing=4, shipping=2,
//             delivered=4, cancelled=2, return=0

export const MOCK_ORDERS: OrderSummary[] = [
  // ── pending (2) ────────────────────────────────────────────────────────────
  {
    id: "DH-20601",
    status: "pending",
    placedAt: "2026-03-22",
    items: [
      {
        id: "item-1",
        name: "Laptop Dell XPS 15 9530 OLED",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
      },
    ],
    total: 28_990_000,
    itemCount: 1,
    reviewed: false,
    returnWindowDays: 7,
  },
  {
    id: "DH-20598",
    status: "pending",
    placedAt: "2026-03-21",
    items: [
      {
        id: "item-2",
        name: "Chuột Logitech MX Master 3S",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 2,
      },
      {
        id: "item-3",
        name: "Bàn phím cơ Keychron K8 Pro",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
      },
      {
        id: "item-4",
        name: "Tai nghe Sony WH-1000XM5",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
      },
    ],
    total: 13_860_000,
    itemCount: 4,
    reviewed: false,
    returnWindowDays: 7,
  },

  // ── confirmed (2) ──────────────────────────────────────────────────────────
  {
    id: "DH-20590",
    status: "confirmed",
    placedAt: "2026-03-21",
    items: [
      {
        id: "item-5",
        name: "Màn hình LG 27UK850 4K IPS",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
      },
      {
        id: "item-6",
        name: "Bàn phím cơ Keychron K8 Pro",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
      },
    ],
    total: 8_880_000,
    itemCount: 2,
    reviewed: false,
    returnWindowDays: 7,
  },
  {
    id: "DH-20585",
    status: "confirmed",
    placedAt: "2026-03-20",
    items: [
      {
        id: "item-7",
        name: "Laptop ASUS ROG Zephyrus G14",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 2,
      },
      {
        id: "item-8",
        name: "Màn hình Dell U2723D 4K",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 2,
      },
      {
        id: "item-9",
        name: "Chuột Logitech G Pro X Superlight",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
      },
      {
        id: "item-10",
        name: "Tai nghe HyperX Cloud Alpha",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
      },
    ],
    total: 63_350_000,
    itemCount: 6,
    reviewed: false,
    returnWindowDays: 7,
  },

  // ── preparing (2) ─────────────────────────────────────────────────────────
  {
    id: "DH-20575",
    status: "preparing",
    placedAt: "2026-03-19",
    items: [
      {
        id: "item-11",
        name: "Chuột Logitech MX Master 3S",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
      },
      {
        id: "item-12",
        name: "Bàn phím cơ Keychron K8 Pro",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
      },
      {
        id: "item-13",
        name: "Tai nghe Sony WH-1000XM5",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
      },
    ],
    total: 9_530_000,
    itemCount: 3,
    reviewed: false,
    returnWindowDays: 7,
  },
  {
    id: "DH-20570",
    status: "preparing",
    placedAt: "2026-03-18",
    items: [
      {
        id: "item-14",
        name: "Laptop MacBook Pro M3 14\"",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
      },
      {
        id: "item-15",
        name: "iPad Pro M4 11\"",
        thumbnailSrc: THUMB_TABLET,
        quantity: 2,
      },
      {
        id: "item-16",
        name: "Màn hình LG 27UK850 4K IPS",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
      },
      {
        id: "item-17",
        name: "Ghế gaming DXRacer Formula",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
      },
    ],
    total: 33_520_000,
    itemCount: 5,
    reviewed: false,
    returnWindowDays: 7,
  },

  // ── shipping (2) ──────────────────────────────────────────────────────────
  {
    id: "DH-20565",
    status: "shipping",
    placedAt: "2026-03-17",
    items: [
      {
        id: "item-18",
        name: "Màn hình Samsung Odyssey G7 32\"",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
      },
    ],
    total: 18_500_000,
    itemCount: 1,
    reviewed: false,
    returnWindowDays: 7,
  },
  {
    id: "DH-20483",
    status: "shipping",
    placedAt: "2026-03-20",
    items: [
      {
        id: "item-19",
        name: "Laptop ASUS ROG Zephyrus G14",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 2,
      },
      {
        id: "item-20",
        name: "iPhone 16 Pro Max 256GB",
        thumbnailSrc: THUMB_PHONE,
        quantity: 3,
      },
      {
        id: "item-21",
        name: "Tai nghe Sony WH-1000XM5",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 2,
      },
    ],
    total: 69_760_000,
    itemCount: 7,
    reviewed: false,
    returnWindowDays: 7,
  },

  // ── delivered (4) — 2 within return window, 2 outside ─────────────────────

  // Within return window: delivered 2026-03-18, window closes 2026-03-25
  {
    id: "DH-20555",
    status: "delivered",
    placedAt: "2026-03-18",
    items: [
      {
        id: "item-22",
        name: "Chuột Logitech MX Master 3S",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
      },
      {
        id: "item-23",
        name: "Bàn phím cơ Keychron K8 Pro",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
      },
    ],
    total: 7_280_000,
    itemCount: 2,
    reviewed: false,
    returnWindowDays: 7,
  },

  // Outside return window: 2026-03-10 + 7d = 2026-03-17 (already expired)
  {
    id: "DH-20391",
    status: "delivered",
    placedAt: "2026-03-10",
    items: [
      {
        id: "item-24",
        name: "Laptop Dell XPS 15 9530 OLED",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
      },
      {
        id: "item-25",
        name: "iPhone 16 Pro Max 256GB",
        thumbnailSrc: THUMB_PHONE,
        quantity: 2,
      },
      {
        id: "item-26",
        name: "Màn hình LG 27UK850 4K IPS",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
      },
      {
        id: "item-27",
        name: "iPad Pro M4 11\"",
        thumbnailSrc: THUMB_TABLET,
        quantity: 1,
      },
      {
        id: "item-28",
        name: "Ghế gaming DXRacer Formula",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
      },
    ],
    total: 24_150_000,
    itemCount: 6,
    reviewed: true,
    returnWindowDays: 7,
  },

  // Outside return window: 2026-02-28 + 7d = 2026-03-07 (expired)
  {
    id: "DH-20480",
    status: "delivered",
    placedAt: "2026-02-28",
    items: [
      {
        id: "item-29",
        name: "Tai nghe Sony WH-1000XM5",
        thumbnailSrc: THUMB_HEADSET,
        quantity: 1,
      },
    ],
    total: 2_890_000,
    itemCount: 1,
    reviewed: false,
    returnWindowDays: 7,
  },

  // Outside return window: 2026-02-15 + 7d = 2026-02-22 (expired)
  {
    id: "DH-20420",
    status: "delivered",
    placedAt: "2026-02-15",
    items: [
      {
        id: "item-30",
        name: "iPhone 16 Pro Max 256GB",
        thumbnailSrc: THUMB_PHONE,
        quantity: 2,
      },
      {
        id: "item-31",
        name: "Chuột Logitech MX Master 3S",
        thumbnailSrc: THUMB_MOUSE,
        quantity: 1,
      },
      {
        id: "item-32",
        name: "Bàn phím cơ Keychron K8 Pro",
        thumbnailSrc: THUMB_KEYBOARD,
        quantity: 1,
      },
    ],
    total: 18_520_000,
    itemCount: 4,
    reviewed: true,
    returnWindowDays: 7,
  },

  // ── cancelled (2) ─────────────────────────────────────────────────────────
  {
    id: "DH-20460",
    status: "cancelled",
    placedAt: "2026-03-05",
    items: [
      {
        id: "item-33",
        name: "Laptop ASUS ROG Zephyrus G14",
        thumbnailSrc: THUMB_LAPTOP,
        quantity: 1,
      },
      {
        id: "item-34",
        name: "Màn hình Dell U2723D 4K",
        thumbnailSrc: THUMB_MONITOR,
        quantity: 1,
      },
      {
        id: "item-35",
        name: "Ghế gaming DXRacer Formula",
        thumbnailSrc: THUMB_CHAIR,
        quantity: 1,
      },
    ],
    total: 9_070_000,
    itemCount: 3,
    reviewed: false,
    returnWindowDays: 7,
  },
  {
    id: "DH-20440",
    status: "cancelled",
    placedAt: "2026-02-20",
    items: [
      {
        id: "item-36",
        name: "iPad Pro M4 11\"",
        thumbnailSrc: THUMB_TABLET,
        quantity: 1,
      },
    ],
    total: 3_290_000,
    itemCount: 1,
    reviewed: false,
    returnWindowDays: 7,
  },
];
