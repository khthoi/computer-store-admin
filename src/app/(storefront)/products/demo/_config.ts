// ─── Filter System Types ──────────────────────────────────────────────────────

export type FilterType = "dropdown" | "checkbox" | "range" | "toggle" | "rating";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterDefinition {
  key: string;
  label: string;
  type: FilterType;
  /** For dropdown & checkbox types */
  options?: FilterOption[];
  /** For range type */
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
}

export interface SubCategory {
  id: string;
  label: string;
  image?: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
  subCategories: SubCategory[];
  filters: FilterDefinition[];
}

// ─── Filter value types ──────────────────────────────────────────────────────

export type FilterValue =
  | string           // dropdown
  | string[]         // checkbox
  | [number, number] // range
  | boolean          // toggle
  | number;          // rating (N stars & up)

export type FilterState = Record<string, FilterValue>;

// ─── Sort options ────────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: "bestselling", label: "Bán chạy" },
  { value: "price-asc", label: "Giá thấp → cao" },
  { value: "price-desc", label: "Giá cao → thấp" },
  { value: "newest", label: "Mới nhất" },
  { value: "rating", label: "Đánh giá cao" },
];

// ─── Category Configurations ─────────────────────────────────────────────────

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "cpu-intel": {
    id: "cpu-intel",
    name: "CPU Intel",
    description:
      "CPU Intel - Bộ vi xử lý Intel chính hãng cao cấp, tốc độ. Đa dạng mẫu mã từ Pentium, Core i3, i5, i7, i9 đến dòng Ultra mới nhất.",
    breadcrumb: [
      { label: "Linh Kiện Máy Tính", href: "/products/linh-kien" },
      { label: "CPU - Bộ vi xử lý", href: "/products/cpu" },
      { label: "CPU Intel" },
    ],
    subCategories: [
      { id: "all", label: "CPU Intel", image: "/icons/cpu-intel.png" },
      { id: "pentium", label: "Intel Pentium", image: "/icons/cpu-intel.png" },
      { id: "core-i3", label: "Intel Core i3", image: "/icons/cpu-intel.png" },
      { id: "core-i5", label: "Intel Core i5", image: "/icons/cpu-intel.png" },
      { id: "core-i7", label: "Intel Core i7", image: "/icons/cpu-intel.png" },
      { id: "core-i9", label: "Intel Core i9", image: "/icons/cpu-intel.png" },
      { id: "ultra-5", label: "Core Ultra 5", image: "/icons/cpu-intel.png" },
      { id: "ultra-7", label: "Core Ultra 7", image: "/icons/cpu-intel.png" },
      { id: "ultra-9", label: "Core Ultra 9", image: "/icons/cpu-intel.png" },
    ],
    filters: [
      {
        key: "series",
        label: "Dòng CPU",
        type: "dropdown",
        options: [
          { value: "core-i3", label: "Core i3" },
          { value: "core-i5", label: "Core i5" },
          { value: "core-i7", label: "Core i7" },
          { value: "core-i9", label: "Core i9" },
          { value: "core-ultra", label: "Core Ultra" },
          { value: "pentium", label: "Pentium" },
        ],
      },
      {
        key: "generation",
        label: "Thế hệ CPU",
        type: "dropdown",
        options: [
          { value: "14th", label: "Thế hệ 14 (Raptor Lake Refresh)" },
          { value: "13th", label: "Thế hệ 13 (Raptor Lake)" },
          { value: "12th", label: "Thế hệ 12 (Alder Lake)" },
          { value: "1st-ultra", label: "Thế hệ 1 Ultra (Meteor Lake)" },
        ],
      },
      {
        key: "socket",
        label: "Socket",
        type: "dropdown",
        options: [
          { value: "lga1700", label: "LGA 1700" },
          { value: "lga1200", label: "LGA 1200" },
          { value: "lga1851", label: "LGA 1851" },
        ],
      },
      {
        key: "brand",
        label: "Thương hiệu",
        type: "checkbox",
        options: [
          { value: "intel", label: "Intel", count: 48 },
          { value: "amd", label: "AMD", count: 32 },
        ],
      },
      {
        key: "cores",
        label: "Số nhân",
        type: "checkbox",
        options: [
          { value: "4", label: "4 nhân", count: 8 },
          { value: "6", label: "6 nhân", count: 15 },
          { value: "8", label: "8 nhân", count: 12 },
          { value: "12", label: "12 nhân", count: 6 },
          { value: "16", label: "16 nhân", count: 4 },
          { value: "24", label: "24 nhân", count: 3 },
        ],
      },
      {
        key: "ram",
        label: "RAM hỗ trợ",
        type: "checkbox",
        options: [
          { value: "ddr4", label: "DDR4", count: 28 },
          { value: "ddr5", label: "DDR5", count: 34 },
        ],
      },
      {
        key: "price",
        label: "Khoảng giá",
        type: "range",
        min: 0,
        max: 30_000_000,
        step: 500_000,
        unit: "₫",
      },
      {
        key: "inStock",
        label: "Còn hàng",
        type: "toggle",
      },
      {
        key: "discount",
        label: "Đang giảm giá",
        type: "toggle",
        description: "Chỉ hiển thị sản phẩm còn hàng"
      },
      {
        key: "rating",
        label: "Đánh giá",
        type: "rating",
      },
    ],
  },

  laptop: {
    id: "laptop",
    name: "Laptop",
    description: "Laptop chính hãng đa dạng từ văn phòng đến gaming cao cấp.",
    breadcrumb: [
      { label: "Laptop - Máy tính xách tay", href: "/products/laptop" },
      { label: "Tất cả Laptop" },
    ],
    subCategories: [
      { id: "all", label: "Tất cả", image: "/icons/laptop-gaming.png" },
      { id: "gaming", label: "Laptop Gaming", image: "/icons/laptop-gaming.png" },
      { id: "office", label: "Laptop Văn phòng", image: "/icons/laptop-gaming.png" },
      { id: "ultrabook", label: "Ultrabook", image: "/icons/laptop-gaming.png" },
      { id: "workstation", label: "Workstation", image: "/icons/laptop-gaming.png" },
    ],
    filters: [
      {
        key: "brand",
        label: "Thương hiệu",
        type: "checkbox",
        options: [
          { value: "asus", label: "ASUS", count: 24 },
          { value: "msi", label: "MSI", count: 18 },
          { value: "lenovo", label: "Lenovo", count: 22 },
          { value: "dell", label: "Dell", count: 16 },
          { value: "hp", label: "HP", count: 14 },
          { value: "acer", label: "Acer", count: 12 },
        ],
      },
      {
        key: "screenSize",
        label: "Kích thước màn hình",
        type: "dropdown",
        options: [
          { value: "13", label: '13.3"' },
          { value: "14", label: '14"' },
          { value: "15", label: '15.6"' },
          { value: "16", label: '16"' },
          { value: "17", label: '17.3"' },
        ],
      },
      {
        key: "resolution",
        label: "Độ phân giải",
        type: "dropdown",
        options: [
          { value: "fhd", label: "Full HD (1920×1080)" },
          { value: "2k", label: "2K (2560×1440)" },
          { value: "4k", label: "4K (3840×2160)" },
        ],
      },
      {
        key: "ram",
        label: "RAM",
        type: "checkbox",
        options: [
          { value: "8gb", label: "8 GB", count: 14 },
          { value: "16gb", label: "16 GB", count: 32 },
          { value: "32gb", label: "32 GB", count: 18 },
          { value: "64gb", label: "64 GB", count: 6 },
        ],
      },
      {
        key: "storage",
        label: "Ổ cứng",
        type: "checkbox",
        options: [
          { value: "256gb", label: "256 GB SSD", count: 8 },
          { value: "512gb", label: "512 GB SSD", count: 28 },
          { value: "1tb", label: "1 TB SSD", count: 22 },
          { value: "2tb", label: "2 TB SSD", count: 6 },
        ],
      },
      {
        key: "gpu",
        label: "GPU",
        type: "checkbox",
        options: [
          { value: "rtx4050", label: "RTX 4050", count: 10 },
          { value: "rtx4060", label: "RTX 4060", count: 14 },
          { value: "rtx4070", label: "RTX 4070", count: 8 },
          { value: "rtx4080", label: "RTX 4080", count: 4 },
          { value: "integrated", label: "Onboard", count: 20 },
        ],
      },
      {
        key: "price",
        label: "Khoảng giá",
        type: "range",
        min: 0,
        max: 80_000_000,
        step: 1_000_000,
        unit: "₫",
      },
      {
        key: "refreshRate",
        label: "Tần số quét",
        type: "range",
        min: 60,
        max: 360,
        step: 30,
        unit: "Hz",
      },
      {
        key: "panelType",
        label: "Tấm nền",
        type: "checkbox",
        options: [
          { value: "ips", label: "IPS", count: 38 },
          { value: "va", label: "VA", count: 12 },
          { value: "oled", label: "OLED", count: 8 },
        ],
      },
      {
        key: "inStock",
        label: "Còn hàng",
        type: "toggle",
      },
      {
        key: "discount",
        label: "Đang giảm giá",
        type: "toggle",
      },
      {
        key: "rating",
        label: "Đánh giá",
        type: "rating",
      },
    ],
  },

  monitor: {
    id: "monitor",
    name: "Màn hình máy tính",
    description: "Màn hình máy tính đa dạng từ gaming 240Hz đến đồ họa chuyên nghiệp.",
    breadcrumb: [
      { label: "Màn hình", href: "/products/man-hinh" },
      { label: "Tất cả màn hình" },
    ],
    subCategories: [
      { id: "all", label: "Tất cả", image: "/icons/desktop-pc.png" },
      { id: "gaming", label: "Gaming", image: "/icons/desktop-pc.png" },
      { id: "office", label: "Văn phòng", image: "/icons/desktop-pc.png" },
      { id: "design", label: "Đồ họa", image: "/icons/desktop-pc.png" },
      { id: "ultrawide", label: "Ultrawide", image: "/icons/desktop-pc.png" },
    ],
    filters: [
      {
        key: "brand",
        label: "Thương hiệu",
        type: "checkbox",
        options: [
          { value: "lg", label: "LG", count: 16 },
          { value: "samsung", label: "Samsung", count: 14 },
          { value: "dell", label: "Dell", count: 12 },
          { value: "asus", label: "ASUS", count: 18 },
          { value: "viewsonic", label: "ViewSonic", count: 10 },
        ],
      },
      {
        key: "screenSize",
        label: "Kích thước",
        type: "dropdown",
        options: [
          { value: "24", label: '24"' },
          { value: "27", label: '27"' },
          { value: "32", label: '32"' },
          { value: "34", label: '34" Ultrawide' },
          { value: "49", label: '49" Super Ultrawide' },
        ],
      },
      {
        key: "resolution",
        label: "Độ phân giải",
        type: "dropdown",
        options: [
          { value: "fhd", label: "Full HD (1080p)" },
          { value: "2k", label: "2K (1440p)" },
          { value: "4k", label: "4K (2160p)" },
        ],
      },
      {
        key: "panelType",
        label: "Tấm nền",
        type: "checkbox",
        options: [
          { value: "ips", label: "IPS", count: 28 },
          { value: "va", label: "VA", count: 14 },
          { value: "oled", label: "OLED", count: 8 },
          { value: "tn", label: "TN", count: 4 },
        ],
      },
      {
        key: "refreshRate",
        label: "Tần số quét",
        type: "range",
        min: 60,
        max: 360,
        step: 15,
        unit: "Hz",
      },
      {
        key: "price",
        label: "Khoảng giá",
        type: "range",
        min: 0,
        max: 50_000_000,
        step: 500_000,
        unit: "₫",
      },
      {
        key: "inStock",
        label: "Còn hàng",
        type: "toggle",
      },
      {
        key: "discount",
        label: "Đang giảm giá",
        type: "toggle",
      },
      {
        key: "rating",
        label: "Đánh giá",
        type: "rating",
      },
    ],
  },
};

/** Default category for the demo page */
export const DEFAULT_CATEGORY = "cpu-intel";
