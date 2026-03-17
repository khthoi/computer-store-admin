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
  MagnifyingGlassIcon,
  BookmarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PCPartSelector } from "@/src/components/buildpc/PCPartSelector";
import { PCBuildSummary } from "@/src/components/buildpc/PCBuildSummary";
import { CompatibilityAlert } from "@/src/components/buildpc/CompatibilityAlert";
import { PCPartCard } from "@/src/components/buildpc/PCPartCard";
import { Drawer } from "@/src/components/ui/Drawer";
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
  /** Socket/platform key used for compatibility checks */
  platform?: string;
}

interface SlotConfig {
  key: string;
  label: string;
  icon: ReactNode;
  required: boolean;
}

// ─── Slot configuration ─────────────────────────────────────────────────────────

const SLOT_CONFIGS: SlotConfig[] = [
  { key: "cpu",         label: "CPU",          icon: <CpuChipIcon       className="w-5 h-5" />, required: true  },
  { key: "gpu",         label: "GPU",           icon: <RectangleGroupIcon className="w-5 h-5" />, required: true  },
  { key: "motherboard", label: "Motherboard",   icon: <ServerIcon         className="w-5 h-5" />, required: true  },
  { key: "ram",         label: "RAM",           icon: <QueueListIcon      className="w-5 h-5" />, required: true  },
  { key: "storage",     label: "Storage",       icon: <CircleStackIcon    className="w-5 h-5" />, required: false },
  { key: "psu",         label: "Power Supply",  icon: <BoltIcon           className="w-5 h-5" />, required: true  },
  { key: "case",        label: "Case",          icon: <CubeIcon           className="w-5 h-5" />, required: false },
];

// ─── Mock catalog ───────────────────────────────────────────────────────────────

const MOCK_CATALOG: Record<string, MockProduct[]> = {
  cpu: [
    { id: "cpu-1", name: "Intel Core i9-14900K", brand: "Intel", thumbnail: "https://placehold.co/80x80/dbeafe/1d4ed8?text=i9", price: 12_900_000, platform: "lga1700" },
    { id: "cpu-2", name: "Intel Core i7-14700K", brand: "Intel", thumbnail: "https://placehold.co/80x80/dbeafe/1d4ed8?text=i7", price: 8_900_000, platform: "lga1700" },
    { id: "cpu-3", name: "AMD Ryzen 9 7950X", brand: "AMD", thumbnail: "https://placehold.co/80x80/fee2e2/dc2626?text=R9", price: 14_500_000, platform: "am5" },
    { id: "cpu-4", name: "AMD Ryzen 7 7700X", brand: "AMD", thumbnail: "https://placehold.co/80x80/fee2e2/dc2626?text=R7", price: 7_200_000, platform: "am5" },
  ],
  gpu: [
    { id: "gpu-1", name: "ASUS ROG STRIX RTX 4090 OC 24GB", brand: "ASUS", thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4090", price: 45_000_000 },
    { id: "gpu-2", name: "MSI Gaming GeForce RTX 4080 Super 16GB", brand: "MSI", thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4080", price: 28_000_000 },
    { id: "gpu-3", name: "Sapphire Nitro+ RX 7900 XTX 24GB", brand: "Sapphire", thumbnail: "https://placehold.co/80x80/fde8d8/c2410c?text=7900", price: 25_000_000 },
    { id: "gpu-4", name: "Gigabyte Aorus RTX 4070 Ti Super 16GB", brand: "Gigabyte", thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4070", price: 19_000_000 },
  ],
  motherboard: [
    { id: "mb-1", name: "ASUS ROG Maximus Z790 Hero", brand: "ASUS", thumbnail: "https://placehold.co/80x80/f1f5f9/334155?text=Z790", price: 18_000_000, platform: "lga1700" },
    { id: "mb-2", name: "MSI MEG Z790 ACE", brand: "MSI", thumbnail: "https://placehold.co/80x80/f1f5f9/334155?text=Z790", price: 14_500_000, platform: "lga1700" },
    { id: "mb-3", name: "ASUS ROG Crosshair X670E Hero", brand: "ASUS", thumbnail: "https://placehold.co/80x80/fee2e2/991b1b?text=X670", price: 16_000_000, platform: "am5" },
    { id: "mb-4", name: "Gigabyte X670E Aorus Master", brand: "Gigabyte", thumbnail: "https://placehold.co/80x80/fee2e2/991b1b?text=X670", price: 12_000_000, platform: "am5" },
  ],
  ram: [
    { id: "ram-1", name: "G.Skill Trident Z5 DDR5-6400 32GB", brand: "G.Skill", thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5", price: 4_800_000 },
    { id: "ram-2", name: "Corsair Dominator Titanium DDR5-6000 32GB", brand: "Corsair", thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5", price: 5_200_000 },
    { id: "ram-3", name: "Kingston Fury Beast DDR5-5600 16GB", brand: "Kingston", thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5", price: 2_100_000 },
    { id: "ram-4", name: "TeamGroup T-Force Delta DDR5-6400 32GB", brand: "TeamGroup", thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5", price: 4_200_000 },
  ],
  storage: [
    { id: "ssd-1", name: "Samsung 990 Pro 2TB NVMe PCIe 4.0", brand: "Samsung", thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe", price: 3_200_000 },
    { id: "ssd-2", name: "WD Black SN850X 2TB NVMe PCIe 4.0", brand: "Western Digital", thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe", price: 2_900_000 },
    { id: "ssd-3", name: "Seagate FireCuda 530 1TB NVMe PCIe 4.0", brand: "Seagate", thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe", price: 1_800_000 },
    { id: "ssd-4", name: "Crucial T700 2TB NVMe PCIe 5.0", brand: "Crucial", thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe", price: 4_100_000 },
  ],
  psu: [
    { id: "psu-1", name: "Corsair HX1200i 1200W 80+ Platinum", brand: "Corsair", thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1200W", price: 5_500_000 },
    { id: "psu-2", name: "Seasonic Prime TX-1000 1000W 80+ Titanium", brand: "Seasonic", thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1000W", price: 6_200_000 },
    { id: "psu-3", name: "EVGA SuperNOVA 850 G6 850W 80+ Gold", brand: "EVGA", thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=850W", price: 3_200_000 },
    { id: "psu-4", name: "be quiet! Dark Power 13 1000W 80+ Titanium", brand: "be quiet!", thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1000W", price: 5_800_000 },
  ],
  case: [
    { id: "case-1", name: "Lian Li PC-O11 Dynamic EVO XL", brand: "Lian Li", thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case", price: 3_800_000 },
    { id: "case-2", name: "Fractal Design Torrent Compact White", brand: "Fractal Design", thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case", price: 3_200_000 },
    { id: "case-3", name: "NZXT H9 Elite Matte Black", brand: "NZXT", thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case", price: 4_800_000 },
    { id: "case-4", name: "be quiet! Silent Base 802 Window Black", brand: "be quiet!", thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case", price: 4_100_000 },
  ],
};

// ─── Compatibility engine ───────────────────────────────────────────────────────

function computeCompatibility(
  parts: Record<string, MockProduct | null | undefined>
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  const cpu = parts.cpu;
  const mb = parts.motherboard;

  if (cpu && mb && cpu.platform && mb.platform && cpu.platform !== mb.platform) {
    issues.push({
      id: "cpu-mb-socket",
      part1: cpu.name,
      part2: mb.name,
      reason: `Socket mismatch: CPU uses ${cpu.platform.toUpperCase()} but the motherboard is ${mb.platform.toUpperCase()}.`,
      severity: "error",
    });
  }

  return issues;
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function BuildPCDemoPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedParts, setSelectedParts] = useState<Record<string, MockProduct | null>>({});
  const [pickerCategory, setPickerCategory] = useState<string | null>(null);
  // Keep drawer mounted after first open so close animation can complete
  const [pickerEverOpened, setPickerEverOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [buildSaved, setBuildSaved] = useState(false);

  // ── Derived state ─────────────────────────────────────────────────────────
  const compatibilityIssues = useMemo(
    () => computeCompatibility(selectedParts),
    [selectedParts]
  );

  const currentConfig = SLOT_CONFIGS.find((s) => s.key === pickerCategory);
  const currentCatalog = pickerCategory ? (MOCK_CATALOG[pickerCategory] ?? []) : [];

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return currentCatalog;
    return currentCatalog.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [currentCatalog, searchQuery]);

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
          category: config.key,
          categoryLabel: config.label,
          icon: config.icon,
          part: part ? { ...part, compatibilityStatus } : null,
        };
      }),
    [selectedParts, compatibilityIssues]
  );

  const selectedCount = Object.values(selectedParts).filter(Boolean).length;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const openPicker = useCallback((category: string) => {
    setPickerCategory(category);
    setPickerEverOpened(true);
    setSearchQuery("");
  }, []);

  const closePicker = useCallback(() => {
    setPickerCategory(null);
    setSearchQuery("");
  }, []);

  const handlePartSelect = useCallback(
    (partId: string) => {
      if (!pickerCategory) return;
      const cat = pickerCategory;
      const part = (MOCK_CATALOG[cat] ?? []).find((p) => p.id === partId) ?? null;
      setSelectedParts((prev) => ({ ...prev, [cat]: part }));
      // Brief delay so user sees the "Selected" feedback before drawer closes
      setTimeout(() => {
        setPickerCategory(null);
        setSearchQuery("");
      }, 180);
    },
    [pickerCategory]
  );

  const handleRemove = useCallback((category: string) => {
    setSelectedParts((prev) => ({ ...prev, [category]: null }));
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
    return { ...part, compatibilityStatus: hasError ? "incompatible" : "compatible" };
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-secondary-200 bg-white">
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
              "PCPartCard",
              "Drawer",
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
      <main className="mx-auto px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* ── Left: Part selector list ───────────────────────────────────── */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">

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
                  "Click the × button on any row or the trash icon in the summary to remove a part",
                  "The right-side drawer uses the same animated Drawer component from Feedback demo",
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
          </div>

          {/* ── Right: Sticky summary sidebar ─────────────────────────────── */}
          <aside className="w-full lg:sticky lg:top-6 lg:w-80 lg:shrink-0">
            <PCBuildSummary
              buildName="My Gaming Build"
              slots={buildSlots}
              compatibilityIssues={compatibilityIssues}
              onAddAllToCart={handleAddToCart}
              onRemovePart={handleRemove}
              isAddingToCart={isAddingToCart}
            />

            <button
              type="button"
              onClick={handleSaveBuild}
              className={[
                "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                buildSaved
                  ? "border-success-200 bg-success-50 text-success-700"
                  : "border-secondary-200 bg-white text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900",
              ].join(" ")}
            >
              {buildSaved ? (
                <>
                  <CheckCircleIcon className="h-4 w-4 text-success-500" aria-hidden="true" />
                  Build Saved!
                </>
              ) : (
                <>
                  <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
                  Save Build
                </>
              )}
            </button>
          </aside>
        </div>
      </main>

      {/* ── Part picker drawer ──────────────────────────────────────────────── */}
      {/* Mounted on first open and kept alive — isOpen drives animation only */}
      {pickerEverOpened && (
        <Drawer
          isOpen={pickerCategory !== null}
          onClose={closePicker}
          position="right"
          size="xl"
          title={currentConfig ? `Select ${currentConfig.label}` : "Select Part"}
          closeOnBackdrop
          closeOnEscape
        >
          {/* Search */}
          <div className="relative mb-5">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search by name or brand…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-secondary-200 bg-secondary-50 py-2 pl-9 pr-3 text-sm text-secondary-900 placeholder:text-secondary-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Count label */}
          {currentCatalog.length > 0 && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">
              {filteredCatalog.length} of {currentCatalog.length} products
            </p>
          )}

          {/* Product list */}
          <div className="flex flex-col gap-3">
            {filteredCatalog.length > 0 ? (
              filteredCatalog.map((product) => (
                <PCPartCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  isSelected={selectedParts[pickerCategory ?? ""]?.id === product.id}
                  onSelect={handlePartSelect}
                  compatibilityStatus="unchecked"
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <MagnifyingGlassIcon className="h-8 w-8 text-secondary-300" aria-hidden="true" />
                <p className="text-sm font-medium text-secondary-600">No products found</p>
                <p className="text-xs text-secondary-400">Try a different search term</p>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </div>
  );
}
