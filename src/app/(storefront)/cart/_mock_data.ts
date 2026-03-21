import type { CartItem, CouponCode } from "@/src/store/cart.store";

/**
 * Mock cart items for UI development and testing of /cart.
 *
 * Covers all meaningful combinations:
 *   • in-stock  with single variant            (laptop, monitor)
 *   • in-stock  with multiple variants         (SSD, RAM kit)
 *   • in-stock  with no variant at all         (mouse, keyboard)
 *   • in-stock  with discount                  (headset, chair)
 *   • low-stock (quantity close to limit)      (GPU)
 *   • out-of-stock  (can still be selected / removed, qty stepper disabled)
 *   • quantity > 1                             (thermal paste, SSD)
 *   • high unit price                          (workstation CPU)
 *   • low unit price                           (cable, thermal paste)
 */
export const MOCK_CART_ITEMS: CartItem[] = [
  // ── 1. Laptop — in-stock, two variants (RAM + Storage), discounted ──────────
  {
    id: "laptop-asus-rog-g16__ram-16gb__ssd-512gb",
    productId: "laptop-asus-rog-g16",
    name: "ASUS ROG Strix G16 G614JV Gaming Laptop Intel Core i7-13650HX",
    brand: "ASUS",
    thumbnailSrc: "https://hanoicomputercdn.com/media/product/53845_laptop_asus_gaming_rog_strix_g512_ial001t_den_10.jpeg",
    slug: "laptop-asus-rog-strix-g16-g614jv",
    currentPrice: 28_990_000,
    originalPrice: 32_990_000,
    discountPct: 12,
    stockStatus: "in-stock",
    stockQuantity: 8,
    quantity: 1,
    selectedVariants: { ram: "16gb", storage: "512gb" },
    variantLabel: "RAM 16GB / SSD 512GB",
  },

  // ── 2. GPU — low-stock, single variant (VRAM), no discount ─────────────────
  {
    id: "gpu-rtx4070-super__vram-12gb",
    productId: "gpu-rtx4070-super",
    name: "ASUS TUF Gaming GeForce RTX 4070 SUPER OC Edition 12GB GDDR6X",
    brand: "ASUS",
    thumbnailSrc: "https://cdn-files.hacom.vn/hacom/cdn/web/09032026/Laptop-Asus-Gaming-TUF-FA608PP-RV089W-R9-8940HX16GB-RAM512GB-SSD16-WUXGA-165hzRTX-5070-8GBWin11Xam-5.jpg",
    slug: "gpu-asus-tuf-rtx4070-super-oc",
    currentPrice: 18_500_000,
    originalPrice: 18_500_000,
    discountPct: 0,
    stockStatus: "low-stock",
    stockQuantity: 3,
    quantity: 1,
    selectedVariants: { vram: "12gb" },
    variantLabel: "VRAM 12GB",
  },

  // ── 3. Monitor — in-stock, single variant (resolution), discounted ──────────
  {
    id: "monitor-lg-27gp850__res-1440p",
    productId: "monitor-lg-27gp850",
    name: "LG UltraGear 27GP850-B 27\" QHD Nano IPS 165Hz 1ms Gaming Monitor",
    brand: "LG",
    thumbnailSrc: "https://www.lg.com/content/dam/channel/wcms/sg/images/consumer-monitors/27gp850-b_ahk_easl_sg_c/gallery/27GP850-B-UltraGear-Gaming-Monitors-DZ01.jpg",
    slug: "monitor-lg-ultragear-27gp850-b",
    currentPrice: 7_490_000,
    originalPrice: 8_990_000,
    discountPct: 17,
    stockStatus: "in-stock",
    stockQuantity: 15,
    quantity: 1,
    selectedVariants: { resolution: "1440p" },
    variantLabel: "QHD 1440p",
  },

  // ── 4. Mechanical Keyboard — in-stock, two variants (switch + layout) ───────
  {
    id: "kb-keychron-q3__switch-brown__layout-tkl",
    productId: "kb-keychron-q3",
    name: "Keychron Q3 QMK Custom Mechanical Keyboard Aluminum Frame",
    brand: "Keychron",
    thumbnailSrc: "https://www.keychron.com/cdn/shop/products/Q3-N1-Keychron-Q3-QMK-VIA-custom-mechanical-keyboard-tenkeyless-layout-full-aluminum-grey-frame-knob-for-Mac-Windows-iOS-with-hot-swappable-Gateron-G-Pro-switch-red_1800x1800.jpg?v=1659423523",
    slug: "keyboard-keychron-q3-qmk",
    currentPrice: 3_290_000,
    originalPrice: 3_290_000,
    discountPct: 0,
    stockStatus: "in-stock",
    stockQuantity: 20,
    quantity: 1,
    selectedVariants: { switch: "brown", layout: "tkl" },
    variantLabel: "Switch Brown / TKL Layout",
  },

  // ── 5. DDR5 RAM Kit — in-stock, two variants (capacity + speed), qty = 2 ───
  {
    id: "ram-corsair-dominator-ddr5__cap-32gb__speed-6000",
    productId: "ram-corsair-dominator-ddr5",
    name: "Corsair Dominator Platinum RGB DDR5 Desktop Memory Kit",
    brand: "Corsair",
    thumbnailSrc: "https://res.cloudinary.com/corsair-pwa/image/upload/f_auto,q_auto/v1/akamai/pdp/dram/dom-plat-ddr5-amd/images/domplatrgb_amd_feat.png",
    slug: "ram-corsair-dominator-ddr5-6000",
    currentPrice: 4_150_000,
    originalPrice: 4_790_000,
    discountPct: 13,
    stockStatus: "in-stock",
    stockQuantity: 12,
    quantity: 2,
    selectedVariants: { capacity: "32gb", speed: "6000mhz" },
    variantLabel: "32GB (2×16GB) / 6000MHz",
  },

  // ── 6. NVMe SSD — in-stock, two variants (capacity + interface), qty = 2 ───
  {
    id: "ssd-samsung-990pro__cap-2tb__if-pcie4",
    productId: "ssd-samsung-990pro",
    name: "Samsung 990 PRO NVMe M.2 SSD PCIe 4.0 x4 with Heatsink",
    brand: "Samsung",
    thumbnailSrc: "https://product.hstatic.net/200000309925/product/ssd-samsung-990-pro-pcie-gen-4-0_44df4b84b34f4289a2e25001fa91151c_master.png",
    slug: "ssd-samsung-990-pro-nvme",
    currentPrice: 2_890_000,
    originalPrice: 3_490_000,
    discountPct: 17,
    stockStatus: "in-stock",
    stockQuantity: 25,
    quantity: 2,
    selectedVariants: { capacity: "2tb", interface: "pcie4" },
    variantLabel: "2TB / PCIe 4.0",
  },

  // ── 7. Wireless Mouse — in-stock, single variant (color), discounted ────────
  {
    id: "mouse-logitech-g502x__color-white",
    productId: "mouse-logitech-g502x",
    name: "Logitech G502 X PLUS Wireless Gaming Mouse LIGHTSPEED HERO 25K",
    brand: "Logitech",
    thumbnailSrc: "https://www.androidauthority.com/wp-content/uploads/2024/09/Logitech-G502-X-Plus-Lightspeed.jpg",
    slug: "mouse-logitech-g502x-plus-wireless",
    currentPrice: 2_190_000,
    originalPrice: 2_790_000,
    discountPct: 22,
    stockStatus: "in-stock",
    stockQuantity: 30,
    quantity: 1,
    selectedVariants: { color: "white" },
    variantLabel: "Màu Trắng",
  },

  // ── 8. Gaming Headset — out-of-stock, single variant (connection) ───────────
  {
    id: "headset-steelseries-arctis-nova7__conn-wireless",
    productId: "headset-steelseries-arctis-nova7",
    name: "SteelSeries Arctis Nova 7 Wireless Multi-System Gaming Headset",
    brand: "SteelSeries",
    thumbnailSrc: "https://m.media-amazon.com/images/I/61+WSjGgFzL._AC_.jpg",
    slug: "headset-steelseries-arctis-nova7-wireless",
    currentPrice: 3_990_000,
    originalPrice: 4_590_000,
    discountPct: 13,
    stockStatus: "out-of-stock",
    stockQuantity: 0,
    quantity: 1,
    selectedVariants: { connection: "wireless" },
    variantLabel: "Không dây",
  },

  // ── 9. CPU Cooler — in-stock, no variants ────────────────────────────────────
  {
    id: "cooler-nzxt-kraken-360",
    productId: "cooler-nzxt-kraken-360",
    name: "NZXT Kraken 360 RGB 360mm AIO Liquid CPU Cooler with LCD Display",
    brand: "NZXT",
    thumbnailSrc: "https://m.media-amazon.com/images/I/41VBuuOSSpL._SL1000_.jpg",
    slug: "cooler-nzxt-kraken-360-rgb",
    currentPrice: 5_490_000,
    originalPrice: 5_990_000,
    discountPct: 8,
    stockStatus: "in-stock",
    stockQuantity: 7,
    quantity: 1,
    selectedVariants: {},
    variantLabel: "",
  },

  // ── 10. Workstation CPU — in-stock, no variants, high price, no discount ─────
  {
    id: "cpu-amd-threadripper-pro-7985wx",
    productId: "cpu-amd-threadripper-pro-7985wx",
    name: "AMD Ryzen Threadripper PRO 7985WX 64-Core 128-Thread 5.1GHz Processor",
    brand: "AMD",
    thumbnailSrc: "https://m.media-amazon.com/images/I/61fqEHg5ieL._AC_.jpg",
    slug: "cpu-amd-threadripper-pro-7985wx",
    currentPrice: 198_000_000,
    originalPrice: 198_000_000,
    discountPct: 0,
    stockStatus: "in-stock",
    stockQuantity: 2,
    quantity: 1,
    selectedVariants: {},
    variantLabel: "",
  },

  // ── 11. Ergonomic Chair — in-stock, two variants (color + size), discounted ──
  {
    id: "chair-herman-miller-aeron__color-graphite__size-b",
    productId: "chair-herman-miller-aeron",
    name: "Herman Miller Aeron Ergonomic Office Chair PostureFit SL",
    brand: "Herman Miller",
    thumbnailSrc: "https://m.media-amazon.com/images/I/71EN0nJUAqL.jpg",
    slug: "chair-herman-miller-aeron",
    currentPrice: 32_500_000,
    originalPrice: 38_000_000,
    discountPct: 14,
    stockStatus: "in-stock",
    stockQuantity: 4,
    quantity: 1,
    selectedVariants: { color: "graphite", size: "b" },
    variantLabel: "Graphite / Size B (Trung bình)",
  },

  // ── 12. Thermal Paste — in-stock, no variants, low price, qty = 3 ───────────
  {
    id: "thermal-noctua-nt-h2",
    productId: "thermal-noctua-nt-h2",
    name: "Noctua NT-H2 Pro-Grade Thermal Compound 3.5g",
    brand: "Noctua",
    thumbnailSrc: "https://microless.com/cdn/products/df71429f8316c7eec3561132bf8ba211-hi.jpg",
    slug: "thermal-paste-noctua-nt-h2",
    currentPrice: 185_000,
    originalPrice: 220_000,
    discountPct: 16,
    stockStatus: "in-stock",
    stockQuantity: 50,
    quantity: 3,
    selectedVariants: {},
    variantLabel: "",
  },
];

/**
 * A trimmed subset (3 items) for testing the near-empty cart state:
 * one in-stock with variants, one low-stock, one out-of-stock.
 */
export const MOCK_CART_SPARSE: CartItem[] = [
  MOCK_CART_ITEMS[0]!, // laptop — in-stock, with variants
  MOCK_CART_ITEMS[1]!, // GPU    — low-stock
  MOCK_CART_ITEMS[7]!, // headset — out-of-stock
];

/**
 * Single-item cart for testing the near-empty + summary edge case.
 */
export const MOCK_CART_SINGLE: CartItem[] = [MOCK_CART_ITEMS[2]!]; // monitor

/**
 * Empty cart — use this to test the CartEmptyState rendering.
 */
export const MOCK_CART_EMPTY: CartItem[] = [];

// ─── Coupon codes ─────────────────────────────────────────────────────────────

/**
 * Mock coupon codes for the demo cart.
 *
 * Types covered:
 *   • percent  — discount is a % of the billable subtotal
 *   • fixed    — flat VND amount subtracted from the subtotal
 *
 * Optional minOrder: minimum billable subtotal (VND) required to redeem.
 *
 * Test codes:
 *   SUMMER25   — 25% off, no minimum
 *   TECH10     — 10% off, no minimum
 *   VIP15      — 15% off, min 10 000 000₫
 *   SAVE500K   — 500 000₫ off, no minimum
 *   MEGA1M     — 1 000 000₫ off, min 50 000 000₫
 */
export const MOCK_COUPONS: CouponCode[] = [
  {
    code: "SUMMER25",
    type: "percent",
    value: 25,
  },
  {
    code: "TECH10",
    type: "percent",
    value: 10,
  },
  {
    code: "VIP15",
    type: "percent",
    value: 15,
    minOrder: 10_000_000,
  },
  {
    code: "SAVE500K",
    type: "fixed",
    value: 500_000,
  },
  {
    code: "MEGA1M",
    type: "fixed",
    value: 1_000_000,
    minOrder: 50_000_000,
  },
];
