import { ProductHeroSection } from "@/src/components/product/ProductHeroSection";
import { ProductTabsSection } from "@/src/components/product/ProductTabsSection";
import { RelatedProductsSection } from "@/src/components/product/RelatedProductsSection";
import { RecentlyViewedSection } from "@/src/components/product/RecentlyViewedSection";
import type { ProductDetail } from "@/src/components/product/types";
import type { ProductCardProps } from "@/src/components/product/ProductCard";

// No ISR — always fresh data
export const dynamic = "force-dynamic";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCT: ProductDetail = {
  id: "dell-xps-15-9530",
  name: "Dell XPS 15 9530 - Laptop Cao Cấp Dành Cho Sáng Tạo Nội Dung",
  brand: "Dell",
  sku: "DELL-XPS15-9530-2024",
  slug: "dell-xps-15-9530",
  currentPrice: 28_990_000,
  originalPrice: 37_490_000,
  discountPct: 23,
  rating: 4.5,
  reviewCount: 128,
  stockStatus: "out-of-stock",
  stockQuantity: 0,

  images: [
    {
      key: "front",
      src: "https://cdn-files.hacom.vn/hacom/cdn/web/19112025/laptop-dell-xps-13-9350-pp9h1-ltdl0646_0001_dell-2.jpg",
      alt: "Dell XPS 15 9530 - Mặt trước",
      thumbnailSrc:
        "https://cdn-files.hacom.vn/hacom/cdn/web/19112025/laptop-dell-xps-13-9350-pp9h1-ltdl0646_0001_dell-2.jpg",
    },
    {
      key: "side",
      src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      alt: "Dell XPS 15 9530 - Cạnh bên",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&q=70",
    },
    {
      key: "keyboard",
      src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      alt: "Dell XPS 15 9530 - Bàn phím",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=120&q=70",
    },
    {
      key: "display",
      src: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80",
      alt: "Dell XPS 15 9530 - Màn hình",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=120&q=70",
    },
    {
      key: "ports",
      src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      alt: "Dell XPS 15 9530 - Cổng kết nối",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=120&q=70",
    },
  ],

  variantGroups: [
    {
      key: "ram",
      label: "Cấu hình RAM",
      type: "button",
      options: [
        { value: "16gb", label: "16GB", stock: 5, priceDelta: 0 },
        { value: "32gb", label: "32GB", stock: 3, priceDelta: 4_000_000 },
        { value: "64gb", label: "64GB", stock: 0, priceDelta: 9_000_000 },
      ],
    },
    {
      key: "ssd",
      label: "Dung lượng SSD",
      type: "button",
      options: [
        { value: "512gb", label: "512GB", stock: 5, priceDelta: 0 },
        { value: "1tb", label: "1TB", stock: 4, priceDelta: 2_500_000 },
        { value: "2tb", label: "2TB", stock: 2, priceDelta: 5_500_000 },
      ],
    },
  ],

  specGroups: [
    {
      heading: "Bộ xử lý",
      rows: [
        { label: "CPU", value: "Intel Core i7-13700H" },
        { label: "Số nhân / luồng", value: "14 nhân (6P + 8E) / 20 luồng" },
        { label: "Tốc độ cơ bản", value: "2.4 GHz" },
        { label: "Turbo Boost tối đa", value: "5.0 GHz" },
        { label: "Cache", value: "24MB Intel Smart Cache" },
      ],
    },
    {
      heading: "Màn hình",
      rows: [
        { label: "Kích thước", value: '15.6"' },
        { label: "Độ phân giải", value: "3456 × 2160 (3.5K OLED)" },
        { label: "Tần số quét", value: "120Hz" },
        { label: "Công nghệ", value: "OLED, cảm ứng, chống chói" },
        { label: "Độ sáng", value: "400 nits" },
        { label: "DCI-P3", value: "100%" },
      ],
    },
    {
      heading: "Bộ nhớ & Lưu trữ",
      rows: [
        { label: "RAM", value: "16GB DDR5 4800MHz" },
        { label: "Khe mở rộng RAM", value: "2 khe SODIMM (tối đa 64GB)" },
        { label: "SSD", value: "512GB PCIe Gen4 NVMe" },
        { label: "Khe M.2", value: "1 khe M.2 2280" },
      ],
    },
    {
      heading: "Đồ họa",
      rows: [
        { label: "GPU tích hợp", value: "Intel Iris Xe Graphics" },
        { label: "GPU rời", value: "NVIDIA GeForce RTX 4060 8GB GDDR6" },
        { label: "TGP", value: "80W (115W với Dynamic Boost)" },
      ],
    },
    {
      heading: "Kết nối",
      rows: [
        {
          label: "Cổng",
          value: "2× Thunderbolt 4, 1× USB-A 3.2 Gen2, 1× SD Card, 1× 3.5mm",
        },
        { label: "Wi-Fi", value: "Wi-Fi 6E (Intel AX211)" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Webcam", value: "720p HD với IR (Windows Hello)" },
      ],
    },
    {
      heading: "Pin & Nguồn",
      rows: [
        { label: "Pin", value: "86Whr (tích hợp, không tháo rời)" },
        { label: "Thời lượng pin", value: "Lên đến 13 giờ" },
        { label: "Sạc", value: "130W USB-C" },
        { label: "Hỗ trợ sạc nhanh", value: "Có (80% trong 1 giờ)" },
      ],
    },
  ],

  descriptionHtml: `
    <h2>Dell XPS 15 9530 — Định nghĩa lại laptop cao cấp</h2>
    <p>
      Dell XPS 15 9530 là đỉnh cao của dòng laptop XPS, kết hợp hoàn hảo giữa
      hiệu năng mạnh mẽ và thiết kế sang trọng. Với màn hình OLED 3.5K 120Hz,
      mọi hình ảnh đều hiển thị sắc nét và sống động đến từng chi tiết.
    </p>
    <h3>Thiết kế đẳng cấp</h3>
    <p>
      Vỏ máy làm từ nhôm CNC nguyên khối và sợi carbon, chỉ nặng
      <strong>1.86kg</strong> nhưng cực kỳ bền chắc. Màn hình tràn viền
      InfinityEdge với tỷ lệ màn hình/thân máy lên đến <strong>93.7%</strong>.
    </p>
    <h3>Hiệu năng vượt trội</h3>
    <ul>
      <li>CPU Intel Core i7-13700H thế hệ 13 với 14 nhân xử lý đa nhiệm mượt mà</li>
      <li>GPU NVIDIA RTX 4060 xử lý đồ họa nặng, render video, AI tăng tốc</li>
      <li>RAM DDR5 4800MHz — nhanh hơn 50% so với DDR4 thế hệ trước</li>
      <li>SSD PCIe Gen4 đọc dữ liệu lên đến 7,000 MB/s</li>
    </ul>
    <h3>Màn hình OLED — Trải nghiệm thị giác đỉnh cao</h3>
    <p>
      Tấm nền OLED 3.5K (3456×2160) với tần số quét 120Hz cho chuyển động mượt
      tuyệt đối. Độ phủ màu <strong>100% DCI-P3</strong> và độ sáng 400 nits đảm
      bảo màu sắc trung thực, lý tưởng cho nhiếp ảnh, thiết kế đồ họa và video.
    </p>
    <h3>Kết nối hiện đại</h3>
    <p>
      Trang bị 2 cổng Thunderbolt 4 hỗ trợ sạc, truyền dữ liệu 40Gbps, và kết
      nối màn hình ngoài 8K. Wi-Fi 6E giúp tốc độ mạng không dây vượt trội.
    </p>
    <h3>Pin lâu, sạc nhanh</h3>
    <p>
      Pin 86Whr cho thời lượng lên đến <strong>13 giờ</strong> sử dụng thực tế.
      Hỗ trợ sạc nhanh USB-C 130W, từ 0 lên 80% chỉ trong 60 phút.
    </p>
  `,

  reviews: [
    {
      // ── rv-001: 5 stars · single seller response ──────────────────────────
      id: "rv-001",
      authorName: "Nguyễn V*** T***",
      rating: 5,
      title: "Laptop hoàn hảo cho công việc sáng tạo!",
      content:
        "Mình dùng laptop này để edit video 4K và design. Màn hình OLED thực sự rất đẹp, màu sắc cực kỳ chính xác. Hiệu năng mạnh, không bị giật lag dù chạy nhiều ứng dụng nặng cùng lúc. Pin dùng được cả ngày làm việc. Rất hài lòng với sản phẩm!",
      images: [
        "https://hanoicomputercdn.com/media/product/91358_laptop_asus_gaming_rog_strix_g615jpr_s5107w_0010_layer_2.jpg",
        "https://hanoicomputercdn.com/media/product/91358_laptop_asus_gaming_rog_strix_g615jpr_s5107w_0009_layer_3.jpg",
      ],
      purchasedVariant: "RAM 16GB / SSD 512GB",
      helpfulCount: 24,
      createdAt: "2024-11-15T08:30:00Z",
      isVerifiedPurchase: true,
      responses: [
        {
          id: "resp-001-1",
          authorName: "TechStore Official",
          role: "seller",
          content:
            "Cảm ơn bạn rất nhiều vì đánh giá tuyệt vời! Chúng tôi rất vui khi Dell XPS 15 đáp ứng tốt nhu cầu sáng tạo của bạn. Nếu cần hỗ trợ kỹ thuật hoặc tư vấn nâng cấp, đừng ngần ngại liên hệ với chúng tôi nhé!",
          createdAt: "2024-11-16T09:00:00Z",
        },
      ],
    },
    {
      // ── rv-002: 4 stars · no response (common case) ───────────────────────
      id: "rv-002",
      authorName: "Trần T*** M***",
      rating: 4,
      title: "Tốt nhưng nóng khi load nặng",
      content:
        "Laptop nhìn chung rất ổn. Thiết kế sang trọng, màn hình đẹp. Tuy nhiên khi render video hoặc gaming thì máy hơi nóng và quạt chạy khá to. Nếu chỉ làm việc văn phòng, lập trình thì hoàn toàn silent. Xứng đáng với tầm giá.",
      images: [],
      purchasedVariant: "RAM 32GB / SSD 1TB",
      helpfulCount: 11,
      createdAt: "2024-10-22T14:15:00Z",
      isVerifiedPurchase: true,
      // No responses — intentional: demonstrates the "no response" case
    },
    {
      // ── rv-003: 3 stars · two responses (seller + follow-up from support) ─
      id: "rv-003",
      authorName: "Lê H*** A***",
      rating: 3,
      title: "Màn hình rất đẹp nhưng giá hơi cao",
      content:
        "Phần màn hình OLED là điểm sáng lớn nhất của máy, thực sự rất đẹp. Nhưng với mức giá này mình kỳ vọng thêm cổng kết nối và RAM cần tháo lắp được dễ dàng hơn. Bàn phím gõ dễ chịu. Giao hàng nhanh, đóng gói cẩn thận.",
      images: [
        "https://hanoicomputercdn.com/media/product/91358_laptop_asus_gaming_rog_strix_g615jpr_s5107w_0005_layer_7.jpg",
      ],
      purchasedVariant: "RAM 16GB / SSD 512GB",
      helpfulCount: 7,
      createdAt: "2024-09-10T10:00:00Z",
      isVerifiedPurchase: true,
      responses: [
        {
          id: "resp-003-1",
          authorName: "TechStore Official",
          role: "seller",
          content:
            "Cảm ơn bạn đã chia sẻ phản hồi chi tiết! Chúng tôi ghi nhận góp ý về cổng kết nối và thiết kế RAM. Dell XPS 15 sử dụng RAM hàn liền để tối ưu độ mỏng và hiệu suất — đây là đánh đổi về thiết kế. Chúng tôi sẽ chuyển phản hồi này đến đội ngũ sản phẩm.",
          createdAt: "2024-09-11T10:30:00Z",
        },
        {
          id: "resp-003-2",
          authorName: "Nguyễn Hỗ Trợ",
          role: "support",
          content:
            "Bạn ơi, nếu cần tư vấn thêm về cấu hình phù hợp hoặc muốn xem các dòng máy có khả năng nâng cấp RAM, đội CSKH sẵn sàng hỗ trợ qua chat hoặc hotline 1800-xxxx (miễn phí). Chúc bạn sử dụng vui!",
          createdAt: "2024-09-11T14:05:00Z",
        },
      ],
    },
  ],

  ratingDistribution: { 5: 89, 4: 23, 3: 10, 2: 4, 1: 2 },

  relatedProducts: [
    {
      id: "asus-zenbook-pro-15",
      name: "ASUS ZenBook Pro 15 OLED UM535Q",
      brand: "ASUS",
      href: "/products/asus-zenbook-pro-15",
      thumbnail:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=75",
      price: 26_990_000,
      originalPrice: 31_990_000,
      rating: 4.3,
      reviewCount: 89,
      stockStatus: "in-stock",
      productCode: "UM535QE-KY222W",
    },
    {
      id: "hp-spectre-x360",
      name: "HP Spectre x360 14-eu0013dx",
      brand: "HP",
      href: "/products/hp-spectre-x360",
      thumbnail:
        "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=75",
      price: 31_990_000,
      originalPrice: 38_500_000,
      rating: 4.6,
      reviewCount: 142,
      stockStatus: "low-stock",
      stockQuantity: 5,
      productCode: "14-EU0013DX",
    },
    {
      id: "dell-xps-13-plus",
      name: "Dell XPS 13 Plus 9320 - Core i7-1360P",
      brand: "Dell",
      href: "/products/dell-xps-13-plus",
      thumbnail:
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=75",
      price: 22_490_000,
      originalPrice: 27_990_000,
      rating: 4.4,
      reviewCount: 67,
      stockStatus: "in-stock",
      productCode: "XPS9320-7572SLV",
      badge: "Mới",
    },
    {
      id: "lenovo-thinkpad-x1-carbon",
      name: "Lenovo ThinkPad X1 Carbon Gen 11",
      brand: "Lenovo",
      href: "/products/lenovo-thinkpad-x1-carbon",
      thumbnail:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=75",
      price: 34_990_000,
      originalPrice: 42_000_000,
      rating: 4.7,
      reviewCount: 203,
      stockStatus: "in-stock",
      productCode: "21HM0067VN",
    },
    {
      id: "macbook-pro-14",
      name: "Apple MacBook Pro 14 M3 Pro 18GB/512GB",
      brand: "Apple",
      href: "/products/macbook-pro-14-m3",
      thumbnail:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=75",
      price: 54_990_000,
      rating: 4.9,
      reviewCount: 512,
      stockStatus: "in-stock",
      badge: "Bán chạy",
      productCode: "MRX43SA/A",
    },
    {
      id: "asus-rog-zephyrus-g15",
      name: "ASUS ROG Zephyrus G15 GA503RM-HQ074W",
      brand: "ASUS",
      href: "/products/asus-rog-zephyrus-g15",
      thumbnail:
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=75",
      price: 29_990_000,
      originalPrice: 35_990_000,
      rating: 4.5,
      reviewCount: 175,
      stockStatus: "in-stock",
      productCode: "GA503RM-HQ074W",
    },
  ],
};

// ─── Mock recently viewed ─────────────────────────────────────────────────────

const MOCK_RECENTLY_VIEWED: ProductCardProps[] = [
  {
    id: "macbook-pro-14",
    name: "Apple MacBook Pro 14 M3 Pro 18GB/512GB",
    brand: "Apple",
    href: "/products/macbook-pro-14-m3",
    thumbnail:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=75",
    price: 54_990_000,
    rating: 4.9,
    reviewCount: 512,
    stockStatus: "in-stock",
    badge: "Bán chạy",
    productCode: "MRX43SA/A",
  },
  {
    id: "lenovo-thinkpad-x1-carbon",
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    href: "/products/lenovo-thinkpad-x1-carbon",
    thumbnail:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=75",
    price: 34_990_000,
    originalPrice: 42_000_000,
    rating: 4.7,
    reviewCount: 203,
    stockStatus: "in-stock",
    productCode: "21HM0067VN",
  },
  {
    id: "asus-rog-zephyrus-g15",
    name: "ASUS ROG Zephyrus G15 GA503RM-HQ074W",
    brand: "ASUS",
    href: "/products/asus-rog-zephyrus-g15",
    thumbnail:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=75",
    price: 29_990_000,
    originalPrice: 35_990_000,
    rating: 4.5,
    reviewCount: 175,
    stockStatus: "in-stock",
    productCode: "GA503RM-HQ074W",
  },
  {
    id: "hp-spectre-x360",
    name: "HP Spectre x360 14-eu0013dx",
    brand: "HP",
    href: "/products/hp-spectre-x360",
    thumbnail:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=75",
    price: 31_990_000,
    originalPrice: 38_500_000,
    rating: 4.6,
    reviewCount: 142,
    stockStatus: "low-stock",
    stockQuantity: 5,
    productCode: "14-EU0013DX",
  },
  {
    id: "asus-zenbook-pro-15",
    name: "ASUS ZenBook Pro 15 OLED UM535Q",
    brand: "ASUS",
    href: "/products/asus-zenbook-pro-15",
    thumbnail:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=75",
    price: 26_990_000,
    originalPrice: 31_990_000,
    rating: 4.3,
    reviewCount: 89,
    stockStatus: "in-stock",
    productCode: "UM535QE-KY222W",
  },
  {
    id: "dell-xps-13-plus",
    name: "Dell XPS 13 Plus 9320 - Core i7-1360P",
    brand: "Dell",
    href: "/products/dell-xps-13-plus",
    thumbnail:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=75",
    price: 22_490_000,
    originalPrice: 27_990_000,
    rating: 4.4,
    reviewCount: 67,
    stockStatus: "in-stock",
    productCode: "XPS9320-7572SLV",
    badge: "Mới",
  },
  {
    id: "dell-xps-15-9530",
    name: "Dell XPS 15 9530 - Laptop Cao Cấp Dành Cho Sáng Tạo Nội Dung",
    brand: "Dell",
    thumbnail:
      "https://cdn-files.hacom.vn/hacom/cdn/web/19112025/laptop-dell-xps-13-9350-pp9h1-ltdl0646_0001_dell-2.jpg",
    price: 28_990_000,
    originalPrice: 37_490_000,
    rating: 4.5,
    reviewCount: 128,
    stockStatus: "out-of-stock",
    stockQuantity: 0,
    productCode: "DELL-XPS15-9530-2024",
    badge: "Mới",
    href: "/products/dell-xps-15-9530",
  }
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailDemoPage() {
  return (
    <main className="min-h-screen bg-secondary-50 pb-24 lg:pb-0 max-w-[1430px] mx-auto flex flex-col">
      {/* Hero — 2-column image + info */}
      <ProductHeroSection product={MOCK_PRODUCT} />

      {/* Full-width tabs: description / specs / reviews / policies */}
      <ProductTabsSection product={MOCK_PRODUCT} />

      {/* Related products carousel */}
      <RelatedProductsSection products={MOCK_PRODUCT.relatedProducts} />

      {/* Recently viewed carousel */}
      <RecentlyViewedSection products={MOCK_RECENTLY_VIEWED} />
    </main>
  );
}
