import { CompareProvider } from "@/src/store/compare.store";
import type {
  CatalogueProduct,
  CompareProduct,
} from "@/src/components/compare-ui/types";
import { ComparePageClient } from "@/src/app/(storefront)/compare/ComparePageClient";

export const dynamic = "force-dynamic";

// ─── Base spec data ────────────────────────────────────────────────────────────
//
// One CompareProduct per physical product model.  Every specGroup row contains
// ONLY that product's own value, keyed by product.id.
//
// makeVariantProduct() clones these and re-keys each row for the variant's
// compound ID, then applies per-variant spec overrides (GPU, CPU, RAM, etc.).
// The resulting variant CompareProducts are what actually get loaded into
// the compare table — base products serve only as canonical spec templates.

const MOCK_PRODUCTS: CompareProduct[] = [
  // ── Dell XPS 15 9530 (2023) ────────────────────────────────────────────────
  // Base config: 32 GB DDR5 / 1 TB SSD / RTX 4060
  {
    id: "dell-xps-15-9530",
    name: "Dell XPS 15 9530 (2023)",
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
        key: "processor", label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU",       values: { "dell-xps-15-9530": "Intel Core i9-13900H" } },
          { key: "cpu_cores", label: "Số nhân",          values: { "dell-xps-15-9530": "14" },  higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa",   values: { "dell-xps-15-9530": "5.4" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory", label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "dell-xps-15-9530": "32" },          unit: "GB",     higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM",        values: { "dell-xps-15-9530": "DDR5 4800MHz" } },
          { key: "storage",  label: "Ổ cứng",          values: { "dell-xps-15-9530": "1000" },        unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display", label: "Màn hình",
        rows: [
          { key: "screen_size",   label: "Kích thước",    values: { "dell-xps-15-9530": "15.6" },           unit: "inch" },
          { key: "resolution",    label: "Độ phân giải",  values: { "dell-xps-15-9530": "3456×2160 OLED" } },
          { key: "refresh_rate",  label: "Tần số quét",   values: { "dell-xps-15-9530": "60" },             unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics", label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "dell-xps-15-9530": "NVIDIA RTX 4060" } },
          { key: "gpu_vram",  label: "VRAM",         values: { "dell-xps-15-9530": "8" }, unit: "GB", higherIsBetter: true },
        ],
      },
      {
        key: "battery", label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "dell-xps-15-9530": "86" }, unit: "Wh",   higherIsBetter: true },
          { key: "battery_life",     label: "Thời lượng pin", values: { "dell-xps-15-9530": "13" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical", label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng",    values: { "dell-xps-15-9530": "1.86" },          unit: "kg", higherIsBetter: false },
          { key: "os",     label: "Hệ điều hành",  values: { "dell-xps-15-9530": "Windows 11 Home" } },
        ],
      },
    ],
  },

  // ── Apple MacBook Pro 14" M3 Pro (2023) ────────────────────────────────────
  // Base config: 18 GB Unified / 512 GB SSD / M3 Pro GPU 18-core
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
        key: "processor", label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU",     values: { "macbook-pro-14": "Apple M3 Pro" } },
          { key: "cpu_cores", label: "Số nhân",        values: { "macbook-pro-14": "12" },  higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "macbook-pro-14": "N/A" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory", label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "macbook-pro-14": "18" },             unit: "GB",     higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM",        values: { "macbook-pro-14": "Unified Memory" } },
          { key: "storage",  label: "Ổ cứng",          values: { "macbook-pro-14": "512" },            unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display", label: "Màn hình",
        rows: [
          { key: "screen_size",  label: "Kích thước",    values: { "macbook-pro-14": "14.2" },                       unit: "inch" },
          { key: "resolution",   label: "Độ phân giải",  values: { "macbook-pro-14": "3024×1964 Liquid Retina XDR" } },
          { key: "refresh_rate", label: "Tần số quét",   values: { "macbook-pro-14": "120" },                        unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics", label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "macbook-pro-14": "Apple M3 Pro GPU 18-core" } },
          { key: "gpu_vram",  label: "VRAM",         values: { "macbook-pro-14": "18" }, unit: "GB", higherIsBetter: true },
        ],
      },
      {
        key: "battery", label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "macbook-pro-14": "70" }, unit: "Wh",   higherIsBetter: true },
          { key: "battery_life",     label: "Thời lượng pin", values: { "macbook-pro-14": "18" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical", label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng",    values: { "macbook-pro-14": "1.61" },       unit: "kg", higherIsBetter: false },
          { key: "os",     label: "Hệ điều hành",  values: { "macbook-pro-14": "macOS Sonoma" } },
        ],
      },
    ],
  },

  // ── ASUS ROG Zephyrus G14 GA402XV (2024) ──────────────────────────────────
  // Base config: 16 GB DDR5 / 512 GB SSD / RX 7600S 8 GB
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
        key: "processor", label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU",     values: { "asus-rog-g14": "AMD Ryzen 9 7940HS" } },
          { key: "cpu_cores", label: "Số nhân",        values: { "asus-rog-g14": "8" },  higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "asus-rog-g14": "5.2" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory", label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "asus-rog-g14": "16" },          unit: "GB",     higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM",        values: { "asus-rog-g14": "DDR5 4800MHz" } },
          { key: "storage",  label: "Ổ cứng",          values: { "asus-rog-g14": "512" },         unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display", label: "Màn hình",
        rows: [
          { key: "screen_size",  label: "Kích thước",    values: { "asus-rog-g14": "14" },           unit: "inch" },
          { key: "resolution",   label: "Độ phân giải",  values: { "asus-rog-g14": "2560×1600 IPS" } },
          { key: "refresh_rate", label: "Tần số quét",   values: { "asus-rog-g14": "165" },          unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics", label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "asus-rog-g14": "AMD Radeon RX 7600S" } },
          { key: "gpu_vram",  label: "VRAM",         values: { "asus-rog-g14": "8" }, unit: "GB", higherIsBetter: true },
        ],
      },
      {
        key: "battery", label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "asus-rog-g14": "73" }, unit: "Wh",   higherIsBetter: true },
          { key: "battery_life",     label: "Thời lượng pin", values: { "asus-rog-g14": "10" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical", label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng",    values: { "asus-rog-g14": "1.65" },          unit: "kg", higherIsBetter: false },
          { key: "os",     label: "Hệ điều hành",  values: { "asus-rog-g14": "Windows 11 Home" } },
        ],
      },
    ],
  },

  // ── Lenovo ThinkPad X1 Carbon Gen 11 ──────────────────────────────────────
  // Base config: 16 GB LPDDR5 / 512 GB SSD / Intel Iris Xe
  {
    id: "lenovo-thinkpad-x1",
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    slug: "lenovo-thinkpad-x1-carbon-gen11",
    category: "laptop",
    currentPrice: 48_990_000,
    originalPrice: 55_990_000,
    discountPct: 13,
    thumbnailSrc: "https://picsum.photos/seed/thinkpad/400/400",
    rating: 4.5,
    reviewCount: 178,
    specGroups: [
      {
        key: "processor", label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU",     values: { "lenovo-thinkpad-x1": "Intel Core i7-1365U" } },
          { key: "cpu_cores", label: "Số nhân",        values: { "lenovo-thinkpad-x1": "10" },  higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "lenovo-thinkpad-x1": "5.2" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory", label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "lenovo-thinkpad-x1": "16" },            unit: "GB",     higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM",        values: { "lenovo-thinkpad-x1": "LPDDR5 5200MHz" } },
          { key: "storage",  label: "Ổ cứng",          values: { "lenovo-thinkpad-x1": "512" },           unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display", label: "Màn hình",
        rows: [
          { key: "screen_size",  label: "Kích thước",    values: { "lenovo-thinkpad-x1": "14" },              unit: "inch" },
          { key: "resolution",   label: "Độ phân giải",  values: { "lenovo-thinkpad-x1": "1920×1200 IPS" } },
          { key: "refresh_rate", label: "Tần số quét",   values: { "lenovo-thinkpad-x1": "60" },             unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics", label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "lenovo-thinkpad-x1": "Intel Iris Xe Graphics" } },
          { key: "gpu_vram",  label: "VRAM",         values: { "lenovo-thinkpad-x1": "Shared" } },
        ],
      },
      {
        key: "battery", label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "lenovo-thinkpad-x1": "57" }, unit: "Wh",   higherIsBetter: true },
          { key: "battery_life",     label: "Thời lượng pin", values: { "lenovo-thinkpad-x1": "15" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical", label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng",    values: { "lenovo-thinkpad-x1": "1.12" },        unit: "kg", higherIsBetter: false },
          { key: "os",     label: "Hệ điều hành",  values: { "lenovo-thinkpad-x1": "Windows 11 Pro" } },
        ],
      },
    ],
  },

  // ── HP Spectre x360 14 2-in-1 ─────────────────────────────────────────────
  // Base config: 8 GB LPDDR5 / 256 GB SSD / Intel Iris Xe
  {
    id: "hp-spectre-x360",
    name: "HP Spectre x360 14 2-in-1 Laptop",
    brand: "HP",
    slug: "hp-spectre-x360-14",
    category: "laptop",
    currentPrice: 38_990_000,
    originalPrice: 42_990_000,
    discountPct: 10,
    thumbnailSrc: "https://picsum.photos/seed/hp-spectre/400/400",
    rating: 4.4,
    reviewCount: 95,
    specGroups: [
      {
        key: "processor", label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU",     values: { "hp-spectre-x360": "Intel Core i7-1355U" } },
          { key: "cpu_cores", label: "Số nhân",        values: { "hp-spectre-x360": "10" },  higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "hp-spectre-x360": "5.0" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory", label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "hp-spectre-x360": "8" },             unit: "GB",     higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM",        values: { "hp-spectre-x360": "LPDDR5 5200MHz" } },
          { key: "storage",  label: "Ổ cứng",          values: { "hp-spectre-x360": "256" },           unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display", label: "Màn hình",
        rows: [
          { key: "screen_size",  label: "Kích thước",    values: { "hp-spectre-x360": "13.5" },          unit: "inch" },
          { key: "resolution",   label: "Độ phân giải",  values: { "hp-spectre-x360": "2560×1700 OLED" } },
          { key: "refresh_rate", label: "Tần số quét",   values: { "hp-spectre-x360": "60" },            unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics", label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "hp-spectre-x360": "Intel Iris Xe Graphics" } },
          { key: "gpu_vram",  label: "VRAM",         values: { "hp-spectre-x360": "Shared" } },
        ],
      },
      {
        key: "battery", label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "hp-spectre-x360": "66" }, unit: "Wh",   higherIsBetter: true },
          { key: "battery_life",     label: "Thời lượng pin", values: { "hp-spectre-x360": "14" }, unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical", label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng",    values: { "hp-spectre-x360": "1.36" },          unit: "kg", higherIsBetter: false },
          { key: "os",     label: "Hệ điều hành",  values: { "hp-spectre-x360": "Windows 11 Home" } },
        ],
      },
    ],
  },

  // ── MSI Stealth 16 Studio A13VF ───────────────────────────────────────────
  // Base config: 16 GB DDR5 / 512 GB SSD / RTX 4060 8 GB
  {
    id: "msi-stealth-16",
    name: "MSI Stealth 16 Studio A13VF",
    brand: "MSI",
    slug: "msi-stealth-16",
    category: "laptop",
    currentPrice: 44_990_000,
    originalPrice: 49_990_000,
    discountPct: 10,
    thumbnailSrc: "https://picsum.photos/seed/msi-stealth/400/400",
    rating: 4.3,
    reviewCount: 63,
    specGroups: [
      {
        key: "processor", label: "Bộ xử lý",
        rows: [
          { key: "cpu_model", label: "Model CPU",     values: { "msi-stealth-16": "Intel Core i9-13900H" } },
          { key: "cpu_cores", label: "Số nhân",        values: { "msi-stealth-16": "14" },  higherIsBetter: true },
          { key: "cpu_speed", label: "Tốc độ tối đa", values: { "msi-stealth-16": "5.4" }, unit: "GHz", higherIsBetter: true },
        ],
      },
      {
        key: "memory", label: "RAM & Bộ nhớ",
        rows: [
          { key: "ram_size", label: "Dung lượng RAM", values: { "msi-stealth-16": "16" },          unit: "GB",     higherIsBetter: true },
          { key: "ram_type", label: "Loại RAM",        values: { "msi-stealth-16": "DDR5 4800MHz" } },
          { key: "storage",  label: "Ổ cứng",          values: { "msi-stealth-16": "512" },         unit: "GB SSD", higherIsBetter: true },
        ],
      },
      {
        key: "display", label: "Màn hình",
        rows: [
          { key: "screen_size",  label: "Kích thước",    values: { "msi-stealth-16": "16" },              unit: "inch" },
          { key: "resolution",   label: "Độ phân giải",  values: { "msi-stealth-16": "2560×1600 IPS" } },
          { key: "refresh_rate", label: "Tần số quét",   values: { "msi-stealth-16": "165" },            unit: "Hz", higherIsBetter: true },
        ],
      },
      {
        key: "graphics", label: "Đồ họa",
        rows: [
          { key: "gpu_model", label: "Card đồ họa", values: { "msi-stealth-16": "NVIDIA RTX 4060" } },
          { key: "gpu_vram",  label: "VRAM",         values: { "msi-stealth-16": "8" }, unit: "GB", higherIsBetter: true },
        ],
      },
      {
        key: "battery", label: "Pin & Sạc",
        rows: [
          { key: "battery_capacity", label: "Dung lượng pin", values: { "msi-stealth-16": "99" }, unit: "Wh",   higherIsBetter: true },
          { key: "battery_life",     label: "Thời lượng pin", values: { "msi-stealth-16": "8" },  unit: "giờ", higherIsBetter: true },
        ],
      },
      {
        key: "physical", label: "Kích thước & Trọng lượng",
        rows: [
          { key: "weight", label: "Khối lượng",    values: { "msi-stealth-16": "2.02" },          unit: "kg", higherIsBetter: false },
          { key: "os",     label: "Hệ điều hành",  values: { "msi-stealth-16": "Windows 11 Home" } },
        ],
      },
    ],
  },
];

// ─── Variant product builder ──────────────────────────────────────────────────

interface SpecOverride {
  groupKey: string;
  rowKey: string;
  value: string;
}

/**
 * Clones a base CompareProduct into a variant-specific entry.
 *
 * - id         →  "base-id__variant-value"   (compound key used system-wide)
 * - name       →  "Base Name · Variant Label"
 * - specGroups are re-keyed: every row's values map gains an entry for the
 *   variant ID, so CompareTable can look it up via product.id.
 * - specOverrides replace individual row values (CPU model, GPU, RAM, etc.)
 *   to make each variant's specs genuinely distinct.
 */
function makeVariantProduct(
  base: CompareProduct,
  variantValue: string,
  variantLabel: string,
  prices: { currentPrice: number; originalPrice?: number },
  specOverrides: SpecOverride[] = []
): CompareProduct {
  const variantId = `${base.id}__${variantValue}`;
  return {
    ...base,
    id: variantId,
    name: `${base.name} · ${variantLabel}`,
    currentPrice: prices.currentPrice,
    originalPrice: prices.originalPrice ?? base.originalPrice,
    discountPct: 0,
    specGroups: base.specGroups.map((group) => ({
      ...group,
      rows: group.rows.map((row) => {
        const override = specOverrides.find(
          (o) => o.groupKey === group.key && o.rowKey === row.key
        );
        return {
          ...row,
          values: {
            ...row.values,
            // The variant ID is the lookup key CompareTable uses.
            // Use the override when provided; otherwise inherit the base value.
            [variantId]: override?.value ?? row.values[base.id] ?? "",
          },
        };
      }),
    })),
  };
}

// ─── Stable base-product lookup ───────────────────────────────────────────────

const base = (id: string): CompareProduct => {
  const p = MOCK_PRODUCTS.find((m) => m.id === id);
  if (!p) throw new Error(`Base product "${id}" not found`);
  return p;
};

// ─── Variant-specific CompareProducts ────────────────────────────────────────
//
// Named constants (not array indices) so INITIAL_VARIANTS references are safe
// regardless of insertion order.
//
// Upgrade variants deliberately differ in GPU model, VRAM, CPU, and RAM so
// the compare table shows genuinely distinct configurations side-by-side.

// ── Dell XPS 15 9530 ─────────────────────────────────────────────────────────
//   V1: 32 GB / 1 TB / RTX 4060 8 GB  (base spec — no overrides needed)
//   V2: 64 GB / 2 TB / RTX 4070 12 GB (higher RAM, storage, and GPU tier)
const dellXps32 = makeVariantProduct(
  base("dell-xps-15-9530"),
  "32gb-1tb", "32GB RAM / 1TB SSD",
  { currentPrice: 52_990_000, originalPrice: 62_990_000 }
);
const dellXps64 = makeVariantProduct(
  base("dell-xps-15-9530"),
  "64gb-2tb", "64GB RAM / 2TB SSD",
  { currentPrice: 65_990_000, originalPrice: 72_990_000 },
  [
    { groupKey: "memory",   rowKey: "ram_size",  value: "64" },
    { groupKey: "memory",   rowKey: "storage",   value: "2000" },
    { groupKey: "graphics", rowKey: "gpu_model", value: "NVIDIA RTX 4070" },
    { groupKey: "graphics", rowKey: "gpu_vram",  value: "12" },
  ]
);

// ── MacBook Pro 14 ───────────────────────────────────────────────────────────
//   V1: 18 GB / 512 GB / M3 Pro  18-core GPU  (base spec)
//   V2: 36 GB / 1 TB  / M3 Max  30-core GPU  (chip upgrade: M3 Pro → M3 Max,
//       more CPU cores, dedicated GPU core count, and VRAM matches RAM tier)
const mac18 = makeVariantProduct(
  base("macbook-pro-14"),
  "18gb-512gb", "18GB / 512GB SSD",
  { currentPrice: 62_990_000, originalPrice: 62_990_000 }
);
const mac36 = makeVariantProduct(
  base("macbook-pro-14"),
  "36gb-1tb", "36GB / 1TB SSD",
  { currentPrice: 79_990_000, originalPrice: 79_990_000 },
  [
    { groupKey: "processor", rowKey: "cpu_model", value: "Apple M3 Max" },
    { groupKey: "processor", rowKey: "cpu_cores", value: "14" },
    { groupKey: "memory",    rowKey: "ram_size",  value: "36" },
    { groupKey: "memory",    rowKey: "storage",   value: "1000" },
    { groupKey: "graphics",  rowKey: "gpu_model", value: "Apple M3 Max GPU 30-core" },
    { groupKey: "graphics",  rowKey: "gpu_vram",  value: "36" },
  ]
);

// ── ASUS ROG Zephyrus G14 ────────────────────────────────────────────────────
//   V1: 16 GB / 512 GB / RX 7600S 8 GB   (base spec)
//   V2: 32 GB / 1 TB  / RX 7700S 12 GB  (higher RAM, storage, and GPU tier)
const asus16 = makeVariantProduct(
  base("asus-rog-g14"),
  "16gb-512gb", "16GB RAM / 512GB SSD",
  { currentPrice: 45_990_000, originalPrice: 52_990_000 }
);
const asus32 = makeVariantProduct(
  base("asus-rog-g14"),
  "32gb-1tb", "32GB RAM / 1TB SSD",
  { currentPrice: 52_990_000, originalPrice: 59_990_000 },
  [
    { groupKey: "memory",   rowKey: "ram_size",  value: "32" },
    { groupKey: "memory",   rowKey: "storage",   value: "1000" },
    { groupKey: "graphics", rowKey: "gpu_model", value: "AMD Radeon RX 7700S" },
    { groupKey: "graphics", rowKey: "gpu_vram",  value: "12" },
  ]
);

// ── Lenovo ThinkPad X1 Carbon Gen 11 ─────────────────────────────────────────
//   V1: 16 GB / 512 GB / Iris Xe  (base spec — thin-and-light, no dGPU)
//   V2: 32 GB / 1 TB  / Iris Xe  (RAM/storage upgrade, same integrated GPU)
const lenovo16 = makeVariantProduct(
  base("lenovo-thinkpad-x1"),
  "16gb-512gb", "16GB RAM / 512GB SSD",
  { currentPrice: 48_990_000, originalPrice: 55_990_000 }
);
const lenovo32 = makeVariantProduct(
  base("lenovo-thinkpad-x1"),
  "32gb-1tb", "32GB RAM / 1TB SSD",
  { currentPrice: 58_990_000, originalPrice: 65_990_000 },
  [
    { groupKey: "memory", rowKey: "ram_size", value: "32" },
    { groupKey: "memory", rowKey: "storage",  value: "1000" },
  ]
);

// ── HP Spectre x360 14 ───────────────────────────────────────────────────────
//   V1:  8 GB / 256 GB / Iris Xe  (entry config)
//   V2: 16 GB / 512 GB / Iris Xe  (RAM/storage upgrade, same integrated GPU)
const hp8 = makeVariantProduct(
  base("hp-spectre-x360"),
  "8gb-256gb", "8GB RAM / 256GB SSD",
  { currentPrice: 38_990_000, originalPrice: 42_990_000 }
);
const hp16 = makeVariantProduct(
  base("hp-spectre-x360"),
  "16gb-512gb", "16GB RAM / 512GB SSD",
  { currentPrice: 45_990_000, originalPrice: 50_990_000 },
  [
    { groupKey: "memory", rowKey: "ram_size", value: "16" },
    { groupKey: "memory", rowKey: "storage",  value: "512" },
  ]
);

// ── MSI Stealth 16 Studio A13VF ──────────────────────────────────────────────
//   V1: 16 GB / 512 GB / RTX 4060 8 GB   (base spec)
//   V2: 32 GB / 1 TB  / RTX 4070 8 GB   (RAM/storage upgrade, same GPU)
const msi16 = makeVariantProduct(
  base("msi-stealth-16"),
  "16gb-512gb", "16GB RAM / 512GB SSD",
  { currentPrice: 44_990_000, originalPrice: 49_990_000 }
);
const msi32 = makeVariantProduct(
  base("msi-stealth-16"),
  "32gb-1tb", "32GB RAM / 1TB SSD",
  { currentPrice: 52_990_000, originalPrice: 57_990_000 },
  [
    { groupKey: "memory", rowKey: "ram_size", value: "32" },
    { groupKey: "memory", rowKey: "storage",  value: "1000" },
  ]
);

const MOCK_VARIANT_PRODUCTS: CompareProduct[] = [
  dellXps32, dellXps64,
  mac18,     mac36,
  asus16,    asus32,
  lenovo16,  lenovo32,
  hp8,       hp16,
  msi16,     msi32,
];

// ─── Catalogue (drawer list) ──────────────────────────────────────────────────
//
// CatalogueProduct entries are lightweight — they carry price overrides per
// variant so DrawerProductItem reflects variant-specific pricing before the
// product is added to the compare list.

const MOCK_CATALOGUE: CatalogueProduct[] = [
  {
    id: "dell-xps-15-9530",
    name: "Dell XPS 15 9530 (2023)",
    brand: "Dell",
    slug: "dell-xps-15-9530",
    category: "laptop",
    currentPrice: 52_990_000,
    originalPrice: 62_990_000,
    thumbnailSrc: "https://picsum.photos/seed/dell-xps/400/400",
    rating: 4.7,
    reviewCount: 312,
    variants: [
      { value: "32gb-1tb", label: "32GB RAM / 1TB SSD · RTX 4060",  currentPrice: 52_990_000, originalPrice: 62_990_000 },
      { value: "64gb-2tb", label: "64GB RAM / 2TB SSD · RTX 4070",  currentPrice: 65_990_000, originalPrice: 72_990_000 },
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
    thumbnailSrc: "https://picsum.photos/seed/macbook/400/400",
    rating: 4.9,
    reviewCount: 548,
    variants: [
      { value: "18gb-512gb", label: "18GB / 512GB · M3 Pro GPU",  currentPrice: 62_990_000, originalPrice: 62_990_000 },
      { value: "36gb-1tb",   label: "36GB / 1TB · M3 Max GPU",   currentPrice: 79_990_000, originalPrice: 79_990_000 },
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
    thumbnailSrc: "https://picsum.photos/seed/asus-rog/400/400",
    rating: 4.6,
    reviewCount: 201,
    variants: [
      { value: "16gb-512gb", label: "16GB / 512GB · RX 7600S 8GB",  currentPrice: 45_990_000, originalPrice: 52_990_000 },
      { value: "32gb-1tb",   label: "32GB / 1TB · RX 7700S 12GB",  currentPrice: 52_990_000, originalPrice: 59_990_000 },
    ],
  },
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
    variants: [
      { value: "16gb-512gb", label: "16GB / 512GB · Iris Xe",  currentPrice: 48_990_000, originalPrice: 55_990_000 },
      { value: "32gb-1tb",   label: "32GB / 1TB · Iris Xe",   currentPrice: 58_990_000, originalPrice: 65_990_000 },
    ],
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
    variants: [
      { value: "8gb-256gb",  label: "8GB / 256GB · Iris Xe",  currentPrice: 38_990_000, originalPrice: 42_990_000 },
      { value: "16gb-512gb", label: "16GB / 512GB · Iris Xe", currentPrice: 45_990_000, originalPrice: 50_990_000 },
    ],
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
    variants: [
      { value: "16gb-512gb", label: "16GB / 512GB · RTX 4060 8GB", currentPrice: 44_990_000, originalPrice: 49_990_000 },
      { value: "32gb-1tb",   label: "32GB / 1TB · RTX 4060 8GB",  currentPrice: 52_990_000, originalPrice: 57_990_000 },
    ],
  },
];

const MOCK_SUGGESTED: CatalogueProduct[] = MOCK_CATALOGUE.slice(3);

// ─── Initial comparison ────────────────────────────────────────────────────────
//
// Three specific variants are pre-selected on first load.
// Named constants ensure these stay correct if MOCK_VARIANT_PRODUCTS is reordered.

const INITIAL_VARIANTS: CompareProduct[] = [dellXps32, mac18, asus16];

// ─── Full spec catalogue ───────────────────────────────────────────────────────
//
// Passed to CompareProvider as productCatalogue.  The store's catalogueMap
// covers every possible ID (base + all compound variant IDs) so any combination
// can be enriched with full spec data automatically.

const FULL_CATALOGUE: CompareProduct[] = [
  ...MOCK_PRODUCTS,
  ...MOCK_VARIANT_PRODUCTS,
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComparePage() {
  return (
    <CompareProvider
      initialProducts={INITIAL_VARIANTS}
      productCatalogue={FULL_CATALOGUE}
    >
      <ComparePageClient
        catalogue={MOCK_CATALOGUE}
        suggestedProducts={MOCK_SUGGESTED}
      />
    </CompareProvider>
  );
}
