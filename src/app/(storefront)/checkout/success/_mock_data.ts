// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  name: string;
  slug: string;
  thumbnailSrc: string;
  brand: string;
  variantLabel: string;
  quantity: number;
  currentPrice: number;
  originalPrice: number;
  discountPct: number;
}

export interface MockOrder {
  id: string;
  /** ISO 8601 date-time string of when the order was placed. */
  placedAt: string;
  /** Human-readable estimated delivery range, e.g. "24–25 tháng 3, 2026". */
  estimatedDelivery: string;
  /** ISO date string for the <time dateTime> attribute. */
  estimatedDeliveryIso: string;
  recipient: {
    fullName: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
  };
  shippingMethod: {
    name: string;
    price: number;
  };
  paymentMethod: {
    /** Must match the key used in the payment icon map (cod | bank-transfer | momo | zalopay). */
    id: string;
    name: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    savings: number;
    couponCode?: string;
    couponDiscount: number;
    shippingFee: number;
    total: number;
  };
  customerEmail: string;
}

// ─── RecommendedProduct (structural — matches ProductCarousel's SlideProduct) ──
// Typed structurally to avoid importing from a client module in this data file.

export interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
  href: string;
  thumbnail: string;
  thumbnailAlt?: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
}

// ─── Mock order ───────────────────────────────────────────────────────────────

/**
 * Simulates an order submitted successfully from /checkout.
 *
 * Items: laptop (discounted) + GPU (no discount) + monitor (discounted) + SSD ×2 (discounted)
 * Pricing:
 *   Subtotal   = 28 990 000 + 18 500 000 + 7 490 000 + (2 890 000 × 2) = 60 760 000
 *   Savings    = 4 000 000 + 0 + 1 500 000 + (600 000 × 2)             =  6 700 000
 *   TECH10 10% = 60 760 000 × 10%                                       =  6 076 000
 *   Shipping   =                                                             30 000
 *   Total      = 60 760 000 − 6 076 000 + 30 000                       = 54 714 000
 */
export const MOCK_ORDER: MockOrder = {
  id: "DH-20483",
  placedAt: "2026-03-22T10:30:00.000Z",
  estimatedDelivery: "24–25 tháng 3, 2026",
  estimatedDeliveryIso: "2026-03-24",
  recipient: {
    fullName: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@example.com",
    province: "Hà Nội",
    district: "Cầu Giấy",
    ward: "Dịch Vọng",
    addressDetail: "Số 10, ngõ 5, đường Xuân Thủy",
  },
  shippingMethod: {
    name: "Giao hàng nhanh",
    price: 30_000,
  },
  paymentMethod: {
    id: "momo",
    name: "Ví MoMo",
  },
  items: [
    {
      id: "laptop-asus-rog-g16__ram-16gb__ssd-512gb",
      name: "Laptop Asus Gaming ROG Strix G615JPR-S5107W (i7 14650HX/32GB RAM/1TB SSD/16 WQXGA 240hz/RTX 5070 8GB/Win11/Xám)",
      slug: "laptop-asus-rog-strix-g16-g614jv",
      thumbnailSrc:
        "https://hanoicomputercdn.com/media/product/53845_laptop_asus_gaming_rog_strix_g512_ial001t_den_10.jpeg",
      brand: "ASUS",
      variantLabel: "RAM 16GB / SSD 512GB",
      quantity: 1,
      currentPrice: 28_990_000,
      originalPrice: 32_990_000,
      discountPct: 12,
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
      currentPrice: 18_500_000,
      originalPrice: 18_500_000,
      discountPct: 0,
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
      currentPrice: 7_490_000,
      originalPrice: 8_990_000,
      discountPct: 17,
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
      currentPrice: 2_890_000,
      originalPrice: 3_490_000,
      discountPct: 17,
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
      currentPrice: 3_290_000,
      originalPrice: 3_290_000,
      discountPct: 0,
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
      currentPrice: 2_190_000,
      originalPrice: 2_790_000,
      discountPct: 22,
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
      currentPrice: 4_150_000,
      originalPrice: 4_790_000,
      discountPct: 13,
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
      currentPrice: 5_490_000,
      originalPrice: 5_990_000,
      discountPct: 8,
    },
  ],
  // ── Pricing ──────────────────────────────────────────────────────────────
  // Subtotal  = 28 990 000 + 18 500 000 + 7 490 000 + (2 890 000 × 2)
  //           + 3 290 000 + 2 190 000 + (4 150 000 × 2) + 5 490 000 = 80 030 000
  // Savings   = 4 000 000 + 1 500 000 + 1 200 000 + 600 000 + 1 280 000 + 500 000
  //           = 9 080 000
  // TECH10    = 80 030 000 × 10% = 8 003 000
  // Total     = 80 030 000 − 8 003 000 + 30 000 = 72 057 000
  pricing: {
    subtotal: 80_030_000,
    savings: 9_080_000,
    couponCode: "TECH10",
    couponDiscount: 8_003_000,
    shippingFee: 30_000,
    total: 72_057_000,
  },
  customerEmail: "nguyenvanan@example.com",
};

// ─── Recommended products ─────────────────────────────────────────────────────

/**
 * Products shown in the "Có thể bạn cũng thích" carousel below the order details.
 * Shape matches ProductCarousel's SlideProduct (structural match, no cross-import).
 */
export const MOCK_RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    id: "kb-keychron-q3",
    name: "Keychron Q3 QMK Custom Mechanical Keyboard Aluminum Frame",
    brand: "Keychron",
    href: "/products/keyboard-keychron-q3-qmk",
    thumbnail:
      "https://www.keychron.com/cdn/shop/products/Q3-N1-Keychron-Q3-QMK-VIA-custom-mechanical-keyboard-tenkeyless-layout-full-aluminum-grey-frame-knob-for-Mac-Windows-iOS-with-hot-swappable-Gateron-G-Pro-switch-red_1800x1800.jpg?v=1659423523",
    price: 3_290_000,
    rating: 4.7,
    reviewCount: 128,
    stockStatus: "in-stock",
  },
  {
    id: "ram-corsair-dominator-ddr5",
    name: "Corsair Dominator Platinum RGB DDR5 Desktop Memory Kit",
    brand: "Corsair",
    href: "/products/ram-corsair-dominator-ddr5-6000",
    thumbnail:
      "https://res.cloudinary.com/corsair-pwa/image/upload/f_auto,q_auto/v1/akamai/pdp/dram/dom-plat-ddr5-amd/images/domplatrgb_amd_feat.png",
    price: 4_150_000,
    originalPrice: 4_790_000,
    badge: "Sale",
    rating: 4.8,
    reviewCount: 94,
    stockStatus: "in-stock",
  },
  {
    id: "mouse-logitech-g502x",
    name: "Logitech G502 X PLUS Wireless Gaming Mouse LIGHTSPEED HERO 25K",
    brand: "Logitech",
    href: "/products/mouse-logitech-g502x-plus-wireless",
    thumbnail:
      "https://www.androidauthority.com/wp-content/uploads/2024/09/Logitech-G502-X-Plus-Lightspeed.jpg",
    price: 2_190_000,
    originalPrice: 2_790_000,
    badge: "Hot",
    rating: 4.6,
    reviewCount: 213,
    stockStatus: "in-stock",
  },
  {
    id: "cooler-nzxt-kraken-360",
    name: "NZXT Kraken 360 RGB 360mm AIO Liquid CPU Cooler with LCD Display",
    brand: "NZXT",
    href: "/products/cooler-nzxt-kraken-360-rgb",
    thumbnail: "https://m.media-amazon.com/images/I/41VBuuOSSpL._SL1000_.jpg",
    price: 5_490_000,
    originalPrice: 5_990_000,
    rating: 4.5,
    reviewCount: 67,
    stockStatus: "in-stock",
  },
  {
    id: "headset-steelseries-arctis-nova7",
    name: "SteelSeries Arctis Nova 7 Wireless Multi-System Gaming Headset",
    brand: "SteelSeries",
    href: "/products/headset-steelseries-arctis-nova7-wireless",
    thumbnail: "https://m.media-amazon.com/images/I/61+WSjGgFzL._AC_.jpg",
    price: 3_990_000,
    originalPrice: 4_590_000,
    rating: 4.4,
    reviewCount: 156,
    stockStatus: "in-stock",
  },
  {
    id: "chair-herman-miller-aeron",
    name: "Herman Miller Aeron Ergonomic Office Chair PostureFit SL",
    brand: "Herman Miller",
    href: "/products/chair-herman-miller-aeron",
    thumbnail: "https://m.media-amazon.com/images/I/71EN0nJUAqL.jpg",
    price: 32_500_000,
    originalPrice: 38_000_000,
    badge: "Sale",
    rating: 4.9,
    reviewCount: 312,
    stockStatus: "in-stock",
  },
];
