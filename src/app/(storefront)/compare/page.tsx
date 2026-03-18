import { CompareProvider } from "@/src/store/compare.store";
import type {
  CatalogueProduct,
  CompareProduct,
} from "@/src/components/compare-ui/types";
import { ComparePageClient } from "@/src/app/(storefront)/compare/ComparePageClient";

export const dynamic = "force-dynamic";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS: CompareProduct[] = [
  {
    id: "dell-xps-15-9530",
    name: "Dell XPS 15 9530 (2023) Intel Core i9-13900H",
    brand: "Dell",
    slug: "dell-xps-15-9530",
    category: "laptop",
    currentPrice: 52_990_000,
    originalPrice: 62_990_000,
    discountPct: 16,
    thumbnailSrc: "https://picsum.photos/seed/dell-xps/400/400",
    rating: 4.7,
    reviewCount: 312,
    specGroups: [
      {
        key: "processor",
        label: "Bộ xử lý",
        rows: [
          {
            key: "cpu_model",
            label: "Model CPU",
            values: { "dell-xps-15-9530": "Intel Core i9-13900H", "macbook-pro-14": "Apple M3 Pro", "asus-rog-g14": "AMD Ryzen 9 7940HS" },
          },
          {
            key: "cpu_cores",
            label: "Số nhân",
            values: { "dell-xps-15-9530": "14", "macbook-pro-14": "12", "asus-rog-g14": "8" },
            higherIsBetter: true,
          },
          {
            key: "cpu_speed",
            label: "Tốc độ tối đa",
            values: { "dell-xps-15-9530": "5.4", "macbook-pro-14": "N/A", "asus-rog-g14": "5.2" },
            unit: "GHz",
            higherIsBetter: true,
          },
        ],
      },
      {
        key: "memory",
        label: "RAM & Bộ nhớ",
        rows: [
          {
            key: "ram_size",
            label: "Dung lượng RAM",
            values: { "dell-xps-15-9530": "32", "macbook-pro-14": "18", "asus-rog-g14": "16" },
            unit: "GB",
            higherIsBetter: true,
          },
          {
            key: "ram_type",
            label: "Loại RAM",
            values: { "dell-xps-15-9530": "DDR5 4800MHz", "macbook-pro-14": "Unified Memory", "asus-rog-g14": "DDR5 4800MHz" },
          },
          {
            key: "storage",
            label: "Ổ cứng",
            values: { "dell-xps-15-9530": "1000", "macbook-pro-14": "512", "asus-rog-g14": "512" },
            unit: "GB SSD",
            higherIsBetter: true,
          },
        ],
      },
      {
        key: "display",
        label: "Màn hình",
        rows: [
          {
            key: "screen_size",
            label: "Kích thước",
            values: { "dell-xps-15-9530": "15.6", "macbook-pro-14": "14.2", "asus-rog-g14": "14" },
            unit: "inch",
          },
          {
            key: "resolution",
            label: "Độ phân giải",
            values: { "dell-xps-15-9530": "3456×2160 OLED", "macbook-pro-14": "3024×1964 Liquid Retina XDR", "asus-rog-g14": "2560×1600 IPS" },
          },
          {
            key: "refresh_rate",
            label: "Tần số quét",
            values: { "dell-xps-15-9530": "60", "macbook-pro-14": "120", "asus-rog-g14": "165" },
            unit: "Hz",
            higherIsBetter: true,
          },
        ],
      },
      {
        key: "graphics",
        label: "Đồ họa",
        rows: [
          {
            key: "gpu_model",
            label: "Card đồ họa",
            values: { "dell-xps-15-9530": "NVIDIA RTX 4060", "macbook-pro-14": "Apple M3 Pro GPU 18-core", "asus-rog-g14": "AMD Radeon RX 7600S" },
          },
          {
            key: "gpu_vram",
            label: "VRAM",
            values: { "dell-xps-15-9530": "8", "macbook-pro-14": "18", "asus-rog-g14": "8" },
            unit: "GB",
            higherIsBetter: true,
          },
        ],
      },
      {
        key: "battery",
        label: "Pin & Sạc",
        rows: [
          {
            key: "battery_capacity",
            label: "Dung lượng pin",
            values: { "dell-xps-15-9530": "86", "macbook-pro-14": "70", "asus-rog-g14": "73" },
            unit: "Wh",
            higherIsBetter: true,
          },
          {
            key: "battery_life",
            label: "Thời lượng pin",
            values: { "dell-xps-15-9530": "13", "macbook-pro-14": "18", "asus-rog-g14": "10" },
            unit: "giờ",
            higherIsBetter: true,
          },
        ],
      },
      {
        key: "physical",
        label: "Kích thước & Trọng lượng",
        rows: [
          {
            key: "weight",
            label: "Khối lượng",
            values: { "dell-xps-15-9530": "1.86", "macbook-pro-14": "1.61", "asus-rog-g14": "1.65" },
            unit: "kg",
            higherIsBetter: false,
          },
          {
            key: "os",
            label: "Hệ điều hành",
            values: { "dell-xps-15-9530": "Windows 11 Home", "macbook-pro-14": "macOS Sonoma", "asus-rog-g14": "Windows 11 Home" },
          },
        ],
      },
    ],
  },
  {
    id: "macbook-pro-14",
    name: "Apple MacBook Pro 14\" M3 Pro (2023)",
    brand: "Apple",
    slug: "macbook-pro-14-m3",
    category: "laptop",
    currentPrice: 62_990_000,
    originalPrice: 62_990_000,
    discountPct: 0,
    thumbnailSrc: "https://picsum.photos/seed/macbook/400/400",
    rating: 4.9,
    reviewCount: 548,
    specGroups: [
      {
        key: "processor",
        label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU", values: { "macbook-pro-14": "Apple M3 Pro" } },
          { key: "cpu_cores", label: "Số nhân", values: { "macbook-pro-14": "12" }, higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "macbook-pro-14": "N/A" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory",
        label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "macbook-pro-14": "18" }, unit: "GB", higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM", values: { "macbook-pro-14": "Unified Memory" } },
          { key: "storage", label: "Ổ cứng", values: { "macbook-pro-14": "512" }, unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display",
        label: "Màn hình",
        rows: [
          { key: "screen_size", label: "Kích thước", values: { "macbook-pro-14": "14.2" }, unit: "inch" },
          { key: "resolution", label: "Độ phân giải", values: { "macbook-pro-14": "3024×1964 Liquid Retina XDR" } },
          { key: "refresh_rate", label: "Tần số quét", values: { "macbook-pro-14": "120" }, unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics",
        label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "macbook-pro-14": "Apple M3 Pro GPU 18-core" } },
          { key: "gpu_vram", label: "VRAM", values: { "macbook-pro-14": "18" }, unit: "GB", higherIsBetter: true },
        ],
      },
      {
        key: "battery",
        label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "macbook-pro-14": "70" }, unit: "Wh", higherIsBetter: true },
          { key: "battery_life", label: "Thời lượng pin", values: { "macbook-pro-14": "18" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical",
        label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng", values: { "macbook-pro-14": "1.61" }, unit: "kg", higherIsBetter: false },
          { key: "os", label: "Hệ điều hành", values: { "macbook-pro-14": "macOS Sonoma" } },
        ],
      },
    ],
  },
  {
    id: "asus-rog-g14",
    name: "ASUS ROG Zephyrus G14 GA402XV (2024)",
    brand: "Asus",
    slug: "asus-rog-zephyrus-g14-2024",
    category: "laptop",
    currentPrice: 45_990_000,
    originalPrice: 52_990_000,
    discountPct: 13,
    thumbnailSrc: "https://picsum.photos/seed/asus-rog/400/400",
    rating: 4.6,
    reviewCount: 201,
    specGroups: [
      {
        key: "processor",
        label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU", values: { "asus-rog-g14": "AMD Ryzen 9 7940HS" } },
          { key: "cpu_cores", label: "Số nhân", values: { "asus-rog-g14": "8" }, higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "asus-rog-g14": "5.2" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory",
        label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "asus-rog-g14": "16" }, unit: "GB", higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM", values: { "asus-rog-g14": "DDR5 4800MHz" } },
          { key: "storage", label: "Ổ cứng", values: { "asus-rog-g14": "512" }, unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display",
        label: "Màn hình",
        rows: [
          { key: "screen_size", label: "Kích thước", values: { "asus-rog-g14": "14" }, unit: "inch" },
          { key: "resolution", label: "Độ phân giải", values: { "asus-rog-g14": "2560×1600 IPS" } },
          { key: "refresh_rate", label: "Tần số quét", values: { "asus-rog-g14": "165" }, unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics",
        label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "asus-rog-g14": "AMD Radeon RX 7600S" } },
          { key: "gpu_vram", label: "VRAM", values: { "asus-rog-g14": "8" }, unit: "GB", higherIsBetter: true },
        ],
      },
      {
        key: "battery",
        label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "asus-rog-g14": "73" }, unit: "Wh", higherIsBetter: true },
          { key: "battery_life", label: "Thời lượng pin", values: { "asus-rog-g14": "10" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical",
        label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng", values: { "asus-rog-g14": "1.65" }, unit: "kg", higherIsBetter: false },
          { key: "os", label: "Hệ điều hành", values: { "asus-rog-g14": "Windows 11 Home" } },
        ],
      },
    ],
  },
];

const MOCK_CATALOGUE: CatalogueProduct[] = [
  ...MOCK_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    slug: p.slug,
    category: p.category,
    currentPrice: p.currentPrice,
    originalPrice: p.originalPrice,
    thumbnailSrc: p.thumbnailSrc,
    rating: p.rating,
    reviewCount: p.reviewCount,
  })),
  {
    id: "lenovo-thinkpad-x1",
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    slug: "lenovo-thinkpad-x1-carbon-gen11",
    category: "laptop",
    currentPrice: 48_990_000,
    originalPrice: 55_990_000,
    thumbnailSrc: "https://picsum.photos/seed/thinkpad/400/400",
    rating: 4.5,
    reviewCount: 178,
  },
  {
    id: "hp-spectre-x360",
    name: "HP Spectre x360 14 2-in-1 Laptop",
    brand: "HP",
    slug: "hp-spectre-x360-14",
    category: "laptop",
    currentPrice: 38_990_000,
    originalPrice: 42_990_000,
    thumbnailSrc: "https://picsum.photos/seed/hp-spectre/400/400",
    rating: 4.4,
    reviewCount: 95,
  },
  {
    id: "msi-stealth-16",
    name: "MSI Stealth 16 Studio A13VF",
    brand: "MSI",
    slug: "msi-stealth-16",
    category: "laptop",
    currentPrice: 44_990_000,
    originalPrice: 49_990_000,
    thumbnailSrc: "https://picsum.photos/seed/msi-stealth/400/400",
    rating: 4.3,
    reviewCount: 63,
  },
];

const MOCK_SUGGESTED: CatalogueProduct[] = MOCK_CATALOGUE.slice(3);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComparePage() {
  return (
    <CompareProvider initialProducts={MOCK_PRODUCTS} productCatalogue={MOCK_PRODUCTS}>
      <ComparePageClient
        catalogue={MOCK_CATALOGUE}
        suggestedProducts={MOCK_SUGGESTED}
      />
    </CompareProvider>
  );
}
