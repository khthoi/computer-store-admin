// ─── Types ────────────────────────────────────────────────────────────────────

export interface WishlistVariantItem {
  /** Unique wishlist entry ID */
  id: string;
  /** Base product info */
  productId: string;
  productName: string;
  productSlug: string;
  thumbnailSrc: string;
  /** Variant-specific info */
  variantId: string;
  /** Human-readable variant label, e.g. "16GB / 512GB / Bạc" */
  variantLabel: string;
  /** Current live price */
  currentPrice: number;
  /** Price when the user wishlisted this variant (for price-change indicator) */
  addedPrice: number;
  /** Optional crossed-out original price (before promotion) */
  originalPrice?: number;
  /** False = can be added to cart; True = show "Hết hàng" overlay */
  outOfStock: boolean;
  /** ISO date string */
  addedAt: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
// Edge cases covered:
//  ✓ Two variants of the same base product (Dell XPS 15 — 16GB and 32GB)
//  ✓ Price dropped    → currentPrice < addedPrice  (show green "Giảm X%" chip)
//  ✓ Price increased  → currentPrice > addedPrice  (no chip)
//  ✓ Price unchanged  → currentPrice === addedPrice (no chip)
//  ✓ originalPrice set (discounted/promotional price)
//  ✓ Two out-of-stock items
//  ✓ One out-of-stock + price dropped (most actionable combination)

export const MOCK_WISHLIST: WishlistVariantItem[] = [
  // ── Dell XPS 15 — variant A: 16GB/512GB (price dropped, in stock) ───────────
  // Best actionable card: price dropped AND in stock
  {
    id: "wl-001",
    productId: "prod-dell-xps15",
    productName: "Laptop Acer Aspire Go AG15-72P-35X9 (NX.JRRSV.004) i3-1305U/8GB RAM/256GB SSD/15.6 inch FHD/Win 11 SL/Bạc)",
    productSlug: "laptop-dell-xps-15-9530-oled",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/92496_laptop_acer_aspire_lite_14_al14_71p_55p9_nx_d7usv_0014.jpg",
    variantId: "var-xps15-16-512",
    variantLabel: "Intel Core i7 / 16GB / 512GB SSD / Bạc",
    currentPrice: 27_490_000,
    addedPrice: 29_990_000,   // price dropped → Giảm 8%
    originalPrice: 32_000_000,
    outOfStock: false,
    addedAt: "2026-03-10",
  },

  // ── Dell XPS 15 — variant B: 32GB/1TB (price unchanged, out of stock) ───────
  // Same base product, different variant — proves variant-level design
  {
    id: "wl-002",
    productId: "prod-dell-xps15",
    productName: "Laptop Dell XPS 15 9530 OLED",
    productSlug: "laptop-dell-xps-15-9530-oled",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/92496_laptop_acer_aspire_lite_14_al14_71p_55p9_nx_d7usv_0014.jpg",
    variantId: "var-xps15-32-1tb",
    variantLabel: "Intel Core i9 / 32GB / 1TB SSD / Bạc",
    currentPrice: 41_990_000,
    addedPrice: 41_990_000,   // no change
    outOfStock: true,         // out of stock
    addedAt: "2026-03-10",
  },

  // ── iPhone 16 Pro Max — 256GB / Titan Đen (price increased) ─────────────────
  {
    id: "wl-003",
    productId: "prod-iphone16promax",
    productName: "iPhone 16 Pro Max",
    productSlug: "iphone-16-pro-max",
    thumbnailSrc:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg",
    variantId: "var-ip16pm-256-black",
    variantLabel: "256GB / Titan Đen",
    currentPrice: 34_990_000,
    addedPrice: 33_490_000,   // price increased (no chip shown)
    outOfStock: false,
    addedAt: "2026-03-05",
  },

  // ── Màn hình Dell U2724D — price dropped, out of stock ───────────────────────
  // Out-of-stock + price dropped: shows chip but CTA disabled
  {
    id: "wl-004",
    productId: "prod-dell-u2724d",
    productName: "Màn hình Dell UltraSharp U2724D 27\" 4K IPS",
    productSlug: "man-hinh-dell-ultrasharp-u2724d",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/79001_man_hinh_dell_ultrasharp_u2424h_850x850_4.jpg",
    variantId: "var-u2724d-std",
    variantLabel: "27\" / 4K IPS / 60Hz",
    currentPrice: 9_890_000,
    addedPrice: 11_490_000,   // price dropped → Giảm 13%
    outOfStock: true,         // out of stock
    addedAt: "2026-02-28",
  },

  // ── Chuột Razer DeathAdder V4 Pro — price unchanged, in stock ────────────────
  {
    id: "wl-005",
    productId: "prod-razer-deathadder-v4pro",
    productName: "Chuột Razer DeathAdder V4 Pro",
    productSlug: "chuot-razer-deathadder-v4-pro",
    thumbnailSrc:
      "https://cdn-files.hacom.vn/hacom/cdn/web/05032026/chuot-razer-deathadder-v4-pro-niko-edition-1.jpg",
    variantId: "var-dav4pro-black",
    variantLabel: "Đen / Không dây",
    currentPrice: 2_590_000,
    addedPrice: 2_590_000,    // no change
    outOfStock: false,
    addedAt: "2026-03-12",
  },

  // ── Bàn phím ROG Falchion RX — price dropped, in stock, with originalPrice ───
  {
    id: "wl-006",
    productId: "prod-rog-falchion-rx",
    productName: "Bàn phím cơ ASUS ROG Falchion RX Low Profile",
    productSlug: "ban-phim-asus-rog-falchion-rx-low-profile",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/80947_rog_falchion_rx_low_profile_rd_01.jpg",
    variantId: "var-falchion-rx-red",
    variantLabel: "Red Switch / Không dây",
    currentPrice: 2_890_000,
    addedPrice: 3_290_000,    // price dropped → Giảm 12%
    originalPrice: 3_690_000,
    outOfStock: false,
    addedAt: "2026-03-08",
  },

  // ── iPad Pro M4 11" — 256GB WiFi (price unchanged, in stock) ─────────────────
  {
    id: "wl-007",
    productId: "prod-ipad-pro-m4-11",
    productName: "iPad Pro M4 11\" WiFi",
    productSlug: "ipad-pro-m4-11-wifi",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/83272_may_tinh_bang_apple_ipad_pro_m4_256gb_11inch_wifi_bac_2024__2_.jpg",
    variantId: "var-ipadpro-m4-11-256-silver",
    variantLabel: "256GB / WiFi / Bạc",
    currentPrice: 22_990_000,
    addedPrice: 22_990_000,   // no change
    originalPrice: 24_490_000,
    outOfStock: false,
    addedAt: "2026-03-15",
  },

  // ── Ghế gaming Centaur Gundam — price increased, in stock ────────────────────
  {
    id: "wl-008",
    productId: "prod-centaur-gundam",
    productName: "Ghế Gaming Centaur Gundam Edition",
    productSlug: "ghe-gaming-centaur-gundam",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/80829_centaur_gundam_avt_2.jpg",
    variantId: "var-centaur-gundam-std",
    variantLabel: "Trắng / Xanh / Tiêu chuẩn",
    currentPrice: 5_490_000,
    addedPrice: 4_990_000,    // price increased (no chip)
    outOfStock: false,
    addedAt: "2026-03-01",
  },

  // ── Tai nghe Corsair Void V2 — price dropped, in stock ───────────────────────
  {
    id: "wl-009",
    productId: "prod-corsair-void-v2",
    productName: "Tai nghe Corsair Void V2 Carbon",
    productSlug: "tai-nghe-corsair-void-v2-carbon",
    thumbnailSrc:
      "https://hanoicomputercdn.com/media/product/91657_tai_nghe_khong_day_corsair_void_v2_carbon_1.jpg",
    variantId: "var-void-v2-carbon",
    variantLabel: "Carbon / Không dây",
    currentPrice: 1_490_000,
    addedPrice: 1_790_000,    // price dropped → Giảm 16%
    outOfStock: false,
    addedAt: "2026-03-18",
  },
];
