"use client";

import { useState, useCallback, useMemo, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  RectangleGroupIcon,
  ServerIcon,
  QueueListIcon,
  CircleStackIcon,
  BoltIcon,
  CubeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PCPartSelector } from "@/src/components/buildpc/PCPartSelector";
import { PCBuildSummary } from "@/src/components/buildpc/PCBuildSummary";
import { CompatibilityAlert } from "@/src/components/buildpc/CompatibilityAlert";
import { PartPickerModal } from "@/src/components/buildpc/PartPickerModal";
import type { SelectedPartInfo } from "@/src/components/buildpc/PCPartSelector";
import type { BuildSlot } from "@/src/components/buildpc/PCBuildSummary";
import type { CompatibilityIssue } from "@/src/components/buildpc/CompatibilityAlert";
import type { CompatibilityStatus } from "@/src/components/buildpc/PCPartCard";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface MockProduct {
  id: string;
  name: string;
  brand: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  /** Socket/platform key used for compatibility checks */
  platform?: string;
  /** Warranty duration shown as a badge (e.g. "36 tháng") */
  warranty?: string;
  /** Selectable variants shown before adding to build */
  variants?: { value: string; label: string }[];
  availability?: "in-stock" | "out-of-stock" | "limited";
  /** Remaining units shown as "Còn N sản phẩm" */
  stockQuantity?: number;
}

interface SlotConfig {
  key: string;
  label: string;
  icon: ReactNode;
  required: boolean;
}

// ─── Slot configuration ─────────────────────────────────────────────────────────

const SLOT_CONFIGS: SlotConfig[] = [
  { key: "cpu",         label: "CPU",          icon: <CpuChipIcon        className="w-5 h-5" />, required: true  },
  { key: "gpu",         label: "GPU",           icon: <RectangleGroupIcon  className="w-5 h-5" />, required: true  },
  { key: "motherboard", label: "Motherboard",   icon: <ServerIcon          className="w-5 h-5" />, required: true  },
  { key: "ram",         label: "RAM",           icon: <QueueListIcon       className="w-5 h-5" />, required: true  },
  { key: "storage",     label: "Storage",       icon: <CircleStackIcon     className="w-5 h-5" />, required: false },
  { key: "psu",         label: "Power Supply",  icon: <BoltIcon            className="w-5 h-5" />, required: true  },
  { key: "case",        label: "Case",          icon: <CubeIcon            className="w-5 h-5" />, required: false },
];

// ─── Mock catalog ───────────────────────────────────────────────────────────────

const MOCK_CATALOG: Record<string, MockProduct[]> = {
  cpu: [
    {
      id: "cpu-1", brand: "Intel", platform: "lga1700",
      name: "Intel Core i9-14900K",
      thumbnail: "https://placehold.co/80x80/dbeafe/1d4ed8?text=i9",
      price: 12_900_000, originalPrice: 13_900_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 15,
    },
    {
      id: "cpu-2", brand: "Intel", platform: "lga1700",
      name: "Intel Core i7-14700K",
      thumbnail: "https://placehold.co/80x80/dbeafe/1d4ed8?text=i7",
      price: 8_900_000, originalPrice: 9_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 23,
    },
    {
      id: "cpu-3", brand: "AMD", platform: "am5",
      name: "AMD Ryzen 9 7950X",
      thumbnail: "https://placehold.co/80x80/fee2e2/dc2626?text=R9",
      price: 14_500_000, originalPrice: 15_900_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 8,
    },
    {
      id: "cpu-4", brand: "AMD", platform: "am5",
      name: "AMD Ryzen 7 7700X",
      thumbnail: "https://placehold.co/80x80/fee2e2/dc2626?text=R7",
      price: 7_200_000, originalPrice: 7_800_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "limited", stockQuantity: 4,
    },
  ],
  gpu: [
    {
      id: "gpu-1", brand: "ASUS",
      name: "ASUS ROG STRIX RTX 4090 OC 24GB",
      thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4090",
      price: 45_000_000, originalPrice: 48_000_000,
      warranty: "24 tháng",
      availability: "limited", stockQuantity: 3,
    },
    {
      id: "gpu-2", brand: "MSI",
      name: "MSI Gaming GeForce RTX 4080 Super 16GB",
      thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4080",
      price: 28_000_000, originalPrice: 30_000_000,
      warranty: "24 tháng",
      availability: "in-stock", stockQuantity: 12,
    },
    {
      id: "gpu-3", brand: "Sapphire",
      name: "Sapphire Nitro+ RX 7900 XTX 24GB",
      thumbnail: "https://placehold.co/80x80/fde8d8/c2410c?text=7900",
      price: 25_000_000, originalPrice: 27_000_000,
      warranty: "24 tháng",
      availability: "in-stock", stockQuantity: 9,
    },
    {
      id: "gpu-4", brand: "Gigabyte",
      name: "Gigabyte Aorus RTX 4070 Ti Super 16GB",
      thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4070",
      price: 19_000_000, originalPrice: 21_000_000,
      warranty: "24 tháng",
      availability: "out-of-stock", stockQuantity: 0,
    },
  ],
  motherboard: [
    {
      id: "mb-1", brand: "ASUS", platform: "lga1700",
      name: "ASUS ROG Maximus Z790 Hero",
      thumbnail: "https://placehold.co/80x80/f1f5f9/334155?text=Z790",
      price: 18_000_000, originalPrice: 19_500_000,
      warranty: "36 tháng",
      availability: "in-stock", stockQuantity: 6,
    },
    {
      id: "mb-2", brand: "MSI", platform: "lga1700",
      name: "MSI MEG Z790 ACE",
      thumbnail: "https://placehold.co/80x80/f1f5f9/334155?text=Z790",
      price: 14_500_000, originalPrice: 15_900_000,
      warranty: "36 tháng",
      availability: "in-stock", stockQuantity: 14,
    },
    {
      id: "mb-3", brand: "ASUS", platform: "am5",
      name: "ASUS ROG Crosshair X670E Hero",
      thumbnail: "https://placehold.co/80x80/fee2e2/991b1b?text=X670",
      price: 16_000_000, originalPrice: 17_500_000,
      warranty: "36 tháng",
      availability: "in-stock", stockQuantity: 7,
    },
    {
      id: "mb-4", brand: "Gigabyte", platform: "am5",
      name: "Gigabyte X670E Aorus Master",
      thumbnail: "https://placehold.co/80x80/fee2e2/991b1b?text=X670",
      price: 12_000_000, originalPrice: 13_200_000,
      warranty: "36 tháng",
      availability: "limited", stockQuantity: 4,
    },
  ],
  ram: [
    {
      id: "ram-1", brand: "G.Skill",
      name: "G.Skill Trident Z5 DDR5-6400",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 4_800_000, originalPrice: 5_200_000,
      warranty: "36 tháng",
      variants: [{ value: "32gb", label: "32 GB (2×16 GB)" }, { value: "64gb", label: "64 GB (2×32 GB)" }],
      availability: "in-stock", stockQuantity: 20,
    },
    {
      id: "ram-2", brand: "Corsair",
      name: "Corsair Dominator Titanium DDR5-6000",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 5_200_000, originalPrice: 5_800_000,
      warranty: "36 tháng",
      variants: [{ value: "32gb", label: "32 GB (2×16 GB)" }, { value: "64gb", label: "64 GB (2×32 GB)" }],
      availability: "in-stock", stockQuantity: 11,
    },
    {
      id: "ram-3", brand: "Kingston",
      name: "Kingston Fury Beast DDR5-5600",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 2_100_000, originalPrice: 2_400_000,
      warranty: "36 tháng",
      variants: [{ value: "16gb", label: "16 GB (2×8 GB)" }, { value: "32gb", label: "32 GB (2×16 GB)" }],
      availability: "in-stock", stockQuantity: 34,
    },
    {
      id: "ram-4", brand: "TeamGroup",
      name: "TeamGroup T-Force Delta DDR5-6400",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 4_200_000, originalPrice: 4_600_000,
      warranty: "36 tháng",
      variants: [{ value: "32gb", label: "32 GB (2×16 GB)" }, { value: "64gb", label: "64 GB (2×32 GB)" }],
      availability: "limited", stockQuantity: 5,
    },
  ],
  storage: [
    {
      id: "ssd-1", brand: "Samsung",
      name: "Samsung 990 Pro NVMe PCIe 4.0",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 3_200_000, originalPrice: 3_500_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }, { value: "4tb", label: "4 TB" }],
      availability: "in-stock", stockQuantity: 18,
    },
    {
      id: "ssd-2", brand: "Western Digital",
      name: "WD Black SN850X NVMe PCIe 4.0",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 2_900_000, originalPrice: 3_200_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }, { value: "4tb", label: "4 TB" }],
      availability: "in-stock", stockQuantity: 22,
    },
    {
      id: "ssd-3", brand: "Seagate",
      name: "Seagate FireCuda 530 NVMe PCIe 4.0",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 1_800_000, originalPrice: 1_999_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }],
      availability: "limited", stockQuantity: 4,
    },
    {
      id: "ssd-4", brand: "Crucial",
      name: "Crucial T700 NVMe PCIe 5.0",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 4_100_000, originalPrice: 4_500_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }, { value: "4tb", label: "4 TB" }],
      availability: "in-stock", stockQuantity: 9,
    },
  ],
  psu: [
    {
      id: "psu-1", brand: "Corsair",
      name: "Corsair HX1200i 1200W 80+ Platinum",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1200W",
      price: 5_500_000, originalPrice: 6_200_000,
      warranty: "84 tháng",
      availability: "in-stock", stockQuantity: 11,
    },
    {
      id: "psu-2", brand: "Seasonic",
      name: "Seasonic Prime TX-1000 1000W 80+ Titanium",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1000W",
      price: 6_200_000, originalPrice: 6_800_000,
      warranty: "120 tháng",
      availability: "limited", stockQuantity: 3,
    },
    {
      id: "psu-3", brand: "EVGA",
      name: "EVGA SuperNOVA 850 G6 850W 80+ Gold",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=850W",
      price: 3_200_000, originalPrice: 3_600_000,
      warranty: "84 tháng",
      availability: "in-stock", stockQuantity: 16,
    },
    {
      id: "psu-4", brand: "be quiet!",
      name: "be quiet! Dark Power 13 1000W 80+ Titanium",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1000W",
      price: 5_800_000, originalPrice: 6_500_000,
      warranty: "60 tháng",
      availability: "out-of-stock", stockQuantity: 0,
    },
  ],
  case: [
    {
      id: "case-1", brand: "Lian Li",
      name: "Lian Li PC-O11 Dynamic EVO XL",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 3_800_000, originalPrice: 4_200_000,
      warranty: "24 tháng",
      availability: "in-stock",
    },
    {
      id: "case-2", brand: "Fractal Design",
      name: "Fractal Design Torrent Compact White",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 3_200_000, originalPrice: 3_500_000,
      warranty: "24 tháng",
      availability: "in-stock",
    },
    {
      id: "case-3", brand: "NZXT",
      name: "NZXT H9 Elite Matte Black",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 4_800_000, originalPrice: 5_500_000,
      warranty: "24 tháng",
      availability: "limited",
    },
    {
      id: "case-4", brand: "be quiet!",
      name: "be quiet! Silent Base 802 Window Black",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 4_100_000, originalPrice: 4_600_000,
      warranty: "24 tháng",
      availability: "in-stock",
    },
  ],
};

// ─── Compatibility engine ───────────────────────────────────────────────────────

function computeCompatibility(
  parts: Record<string, MockProduct | null | undefined>
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  const cpu = parts.cpu;
  const mb  = parts.motherboard;

  if (cpu && mb && cpu.platform && mb.platform && cpu.platform !== mb.platform) {
    issues.push({
      id: "cpu-mb-socket",
      part1: cpu.name,
      part2: mb.name,
      reason: `Không tương thích socket: CPU cần socket ${cpu.platform.toUpperCase()}, mainboard đang dùng socket ${mb.platform.toUpperCase()}.`,
      severity: "error",
    });
  }

  return issues;
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function BuildPCDemoPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedParts,    setSelectedParts]    = useState<Record<string, MockProduct | null>>({});
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [pickerCategory,   setPickerCategory]   = useState<string | null>(null);
  const [isAddingToCart,   setIsAddingToCart]   = useState(false);
  const [buildSaved,       setBuildSaved]       = useState(false);

  // ── Derived state ─────────────────────────────────────────────────────────

  const compatibilityIssues = useMemo(
    () => computeCompatibility(selectedParts),
    [selectedParts]
  );

  const currentConfig  = SLOT_CONFIGS.find((s) => s.key === pickerCategory);
  const currentCatalog = pickerCategory ? (MOCK_CATALOG[pickerCategory] ?? []) : [];

  const buildSlots = useMemo<BuildSlot[]>(
    () =>
      SLOT_CONFIGS.map((config) => {
        const part = selectedParts[config.key];
        const compatibilityStatus: CompatibilityStatus | undefined = part
          ? compatibilityIssues.some(
              (i) => i.severity === "error" && (i.part1 === part.name || i.part2 === part.name)
            )
            ? "incompatible"
            : "compatible"
          : undefined;
        return {
          category:      config.key,
          categoryLabel: config.label,
          icon:          config.icon,
          part: part ? { ...part, compatibilityStatus } : null,
        };
      }),
    [selectedParts, compatibilityIssues]
  );

  const selectedCount = Object.values(selectedParts).filter(Boolean).length;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const openPicker = useCallback((category: string) => {
    setPickerCategory(category);
  }, []);

  const closePicker = useCallback(() => {
    setPickerCategory(null);
  }, []);

  const handlePartSelect = useCallback(
    (partId: string, variantValue?: string) => {
      if (!pickerCategory) return;
      const cat  = pickerCategory;
      const part = (MOCK_CATALOG[cat] ?? []).find((p) => p.id === partId) ?? null;
      setSelectedParts((prev) => ({ ...prev, [cat]: part }));
      setSelectedVariants((prev) => ({ ...prev, [cat]: variantValue ?? "" }));
      // Modal closes itself automatically after ~180 ms
    },
    [pickerCategory]
  );

  const handleRemove = useCallback((category: string) => {
    setSelectedParts((prev) => ({ ...prev, [category]: null }));
    setSelectedVariants((prev) => ({ ...prev, [category]: "" }));
  }, []);

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsAddingToCart(false);
  }, []);

  const handleSaveBuild = useCallback(() => {
    setBuildSaved(true);
    setTimeout(() => setBuildSaved(false), 2000);
  }, []);

  // ── Helper ────────────────────────────────────────────────────────────────

  function getPartInfo(key: string): SelectedPartInfo | null {
    const part = selectedParts[key];
    if (!part) return null;
    const hasError = compatibilityIssues.some(
      (i) => i.severity === "error" && (i.part1 === part.name || i.part2 === part.name)
    );
    const variantValue = selectedVariants[key];
    const variantLabel = variantValue
      ? (part.variants?.find((v) => v.value === variantValue)?.label ?? variantValue)
      : undefined;
    return {
      ...part,
      compatibilityStatus: hasError ? "incompatible" : "compatible",
      selectedVariant: variantLabel,
    };
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-secondary-50 max-w-[1400px] mx-auto flex flex-shrink-0 flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-secondary-200 bg-white w-full">
        <div className="mx-auto px-6 py-8">
          <Link
            href="/ui-demo"
            className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-secondary-500 transition-colors hover:text-secondary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" aria-hidden="true" />
            UI Demo
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <WrenchScrewdriverIcon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-secondary-900">
                Build Your PC
              </h1>
              <p className="mt-0.5 text-sm text-secondary-500">
                Select components, check compatibility, and configure your perfect build.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "PCPartSelector",
              "PCBuildSummary",
              "CompatibilityAlert",
              "PartPickerModal",
              "PartPickerProductItem",
            ].map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-secondary-200 bg-secondary-50 px-3 py-0.5 font-mono text-xs font-medium text-secondary-600"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="mx-auto px-6 py-8 w-full">
        <div className="flex flex-col gap-4">

          {/* Compatibility alert */}
          {compatibilityIssues.length > 0 && (
            <CompatibilityAlert issues={compatibilityIssues} collapsible dismissible />
          )}

          {/* Section label */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-secondary-400">
              Components
            </h2>
            <span className="text-xs text-secondary-500">
              {selectedCount} / {SLOT_CONFIGS.length} selected
            </span>
          </div>

          {/* Part selector rows */}
          {SLOT_CONFIGS.map((config) => (
            <PCPartSelector
              key={config.key}
              category={config.key}
              categoryLabel={config.label}
              icon={config.icon}
              required={config.required}
              selectedPart={getPartInfo(config.key)}
              onSelect={openPicker}
              onRemove={handleRemove}
            />
          ))}

          {/* Demo tips */}
          <div className="rounded-xl border border-primary-100 bg-primary-50 px-5 py-4">
            <p className="text-sm font-semibold text-primary-800">Demo tips</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {[
                "Select an Intel CPU + AMD motherboard (or vice versa) to trigger a socket compatibility error",
                "Use the filter sidebar in the modal to narrow by manufacturer, price range, or platform",
                "Click the × on any part row to remove it; the summary bar updates instantly",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-xs text-primary-700">
                  <CheckCircleIcon
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500"
                    aria-hidden="true"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Build summary bar */}
          <PCBuildSummary
            slots={buildSlots}
            compatibilityIssues={compatibilityIssues}
            onAddAllToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
            onExportBuild={handleSaveBuild}
            isBuildSaved={buildSaved}
          />
        </div>
      </main>

      {/* ── Part picker modal ───────────────────────────────────────────────── */}
      <PartPickerModal
        isOpen={pickerCategory !== null}
        onClose={closePicker}
        categoryLabel={currentConfig?.label ?? "linh kiện"}
        products={currentCatalog}
        selectedId={selectedParts[pickerCategory ?? ""]?.id}
        selectedVariantValue={pickerCategory ? selectedVariants[pickerCategory] : undefined}
        onSelect={handlePartSelect}
      />
    </div>
  );
}
