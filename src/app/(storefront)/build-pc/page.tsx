"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo, useCallback, useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  WrenchScrewdriverIcon,
  CpuChipIcon,
  UserGroupIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ArrowsRightLeftIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { PCPartSelector } from "@/src/components/buildpc/PCPartSelector";
import { PCBuildSummary } from "@/src/components/buildpc/PCBuildSummary";
import { CompatibilityAlert } from "@/src/components/buildpc/CompatibilityAlert";
import { PartPickerModal } from "@/src/components/buildpc/PartPickerModal";
import type { SelectedPartInfo } from "@/src/components/buildpc/PCPartSelector";
import type { BuildSlot } from "@/src/components/buildpc/PCBuildSummary";
import type { CompatibilityIssue } from "@/src/components/buildpc/CompatibilityAlert";
import type { CompatibilityStatus } from "@/src/components/buildpc/PCPartCard";
import type { PartPickerProduct } from "@/src/components/buildpc/PartPickerModal";
import { Tabs } from "@/src/components/ui/Tabs";
import { Accordion } from "@/src/components/ui/Accordion";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface MockProduct extends PartPickerProduct {
  platform?: string;
}

interface BuildState {
  id: string;
  name: string;
  selectedParts: Record<string, MockProduct | null>;
  selectedVariants: Record<string, string>;
}

interface SlotConfig {
  key: string;
  label: string;
  icon: ReactNode | string;
  required: boolean;
}

// ─── Slot configs ───────────────────────────────────────────────────────────────

const SLOT_CONFIGS: SlotConfig[] = [
  { key: "cpu", label: "CPU", icon: "/svg/computer-components-microprocessor.svg", required: true },
  { key: "gpu", label: "GPU", icon: "/svg/computer-components-graphics.svg", required: true },
  { key: "motherboard", label: "Mainboard", icon: "/svg/computer-components-motherboard.svg", required: true },
  { key: "ram", label: "RAM", icon: "/svg/computer-components-ram-memory.svg", required: true },
  { key: "storage", label: "SSD / NVMe", icon: "/svg/computer-components-ssd.svg", required: false },
  { key: "hdd", label: "HDD", icon: "/svg/computer-components-hdd.svg", required: false },
  { key: "cpu-cooler", label: "Air Cooler", icon: "/svg/computer-components-cpu-fan.svg", required: false },
  { key: "aio", label: "AIO Cooler", icon: "/svg/computer-components-AIO-cpu-fan.svg", required: false },
  { key: "psu", label: "PSU", icon: "/svg/computer-components-power-supply.svg", required: true },
  { key: "case", label: "Case", icon: "/svg/computer-components-casing-materials.svg", required: false },
  { key: "fans", label: "Fan case", icon: "/svg/computer-components-fan-case.svg", required: false },
  { key: "monitor", label: "Monitor", icon: "/svg/computer-components-monitor.svg", required: false },
  { key: "keyboard", label: "Keyboard", icon: "/svg/computer-components-keyboard.svg", required: false },
  { key: "mouse", label: "Mouse", icon: "/svg/computer-components-computer-mouse.svg", required: false },
  { key: "headphones", label: "Headphones", icon: "/svg/computer-components-earphones.svg", required: false },
  { key: "mousepad", label: "Mouse Pad", icon: "/svg/computer-components-mousepad.svg", required: false },
  { key: "speakers", label: "Speakers", icon: "/svg/computer-components-audio-2.svg", required: false },
  { key: "chair", label: "Gaming Chair", icon: "/svg/computer-components-gaming-chair.svg", required: false },
];

// ─── Mock catalog ───────────────────────────────────────────────────────────────

const MOCK_CATALOG: Record<string, MockProduct[]> = {
  cpu: [
    {
      id: "cpu-1", brand: "Intel", platform: "lga1700",
      name: "Intel Core i9-14900K",
      href: "/products/intel-core-i9-14900k",
      thumbnail: "https://hanoicomputercdn.com/media/product/77007_cpu_intel_core_i9_14900k.jpg",
      price: 12_900_000, originalPrice: 13_900_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 15,
    },
    {
      id: "cpu-2", brand: "Intel", platform: "lga1700",
      name: "Intel Core i7-14700K",
      href: "/products/intel-core-i7-14700k",
      thumbnail: "https://hanoicomputercdn.com/media/product/77008_cpu_intel_core_i7_14700k.jpg",
      price: 8_900_000, originalPrice: 9_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 23,
    },
    {
      id: "cpu-3", brand: "AMD", platform: "am5",
      name: "AMD Ryzen 9 7950X",
      href: "/products/amd-ryzen-9-7950x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67740_cpu_amd_ryzen_9_7950x_4_5_ghz_upto_5_7ghz_81mb_16_cores_32_threads_170w_socket_am5.jpg",
      price: 14_500_000, originalPrice: 15_900_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 8,
    },
    {
      id: "cpu-4", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 7 7700X (4.5 GHz Upto 5.4GHz / 40MB / 8 Cores, 16 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-7-7700x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67742_cpu_amd_ryzen_7_7700x_4_5_ghz_upto_5_4ghz_40mb_8_cores_16_threads_105w_socket_am5.jpg",
      price: 7_200_000, originalPrice: 7_800_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "limited", stockQuantity: 4,
    },
    {
      id: "cpu-5", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-6", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-7", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-8", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-9", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-10", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-11", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-12", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
    {
      id: "cpu-13", brand: "AMD", platform: "am5",
      name: "CPU AMD Ryzen 5 7600X (4.7 GHz Upto 5.3GHz / 38MB / 6 Cores, 12 Threads / 105W / Socket AM5)",
      href: "/products/amd-ryzen-5-7600x",
      thumbnail: "https://hanoicomputercdn.com/media/product/67743_cpu_amd_ryzen_5_7600x_4_7_ghz_upto_5_3ghz_38mb_6_cores_12_threads_105w_socket_am5.jpg",
      price: 5_000_000, originalPrice: 5_500_000,
      warranty: "36 tháng",
      variants: [{ value: "box", label: "Hộp (Box)" }, { value: "tray", label: "Tray (OEM)" }],
      availability: "in-stock", stockQuantity: 19,
    },
  ],
  gpu: [
    {
      id: "gpu-1", brand: "ASUS",
      name: "ASUS ROG STRIX RTX 4090 OC 24GB",
      href: "/products/asus-rog-strix-rtx-4090-oc-24gb",
      thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4090",
      price: 45_000_000, originalPrice: 48_000_000,
      warranty: "24 tháng",
      availability: "limited", stockQuantity: 3,
    },
    {
      id: "gpu-2", brand: "MSI",
      name: "MSI Gaming GeForce RTX 4080 Super 16GB",
      href: "/products/msi-gaming-geforce-rtx-4080-super-16gb",
      thumbnail: "https://placehold.co/80x80/dcfce7/15803d?text=4080",
      price: 28_000_000, originalPrice: 30_000_000,
      warranty: "24 tháng",
      availability: "in-stock", stockQuantity: 12,
    },
    {
      id: "gpu-3", brand: "Sapphire",
      name: "Sapphire Nitro+ RX 7900 XTX 24GB",
      href: "/products/sapphire-nitro-rx-7900-xtx-24gb",
      thumbnail: "https://placehold.co/80x80/fde8d8/c2410c?text=7900",
      price: 25_000_000, originalPrice: 27_000_000,
      warranty: "24 tháng",
      availability: "in-stock", stockQuantity: 9,
    },
    {
      id: "gpu-4", brand: "Gigabyte",
      name: "Gigabyte Aorus RTX 4070 Ti Super 16GB",
      href: "/products/gigabyte-aorus-rtx-4070-ti-super-16gb",
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
      href: "/products/asus-rog-maximus-z790-hero",
      thumbnail: "https://placehold.co/80x80/f1f5f9/334155?text=Z790",
      price: 18_000_000, originalPrice: 19_500_000,
      warranty: "36 tháng",
      availability: "in-stock", stockQuantity: 6,
    },
    {
      id: "mb-2", brand: "MSI", platform: "lga1700",
      name: "MSI MEG Z790 ACE",
      href: "/products/msi-meg-z790-ace",
      thumbnail: "https://placehold.co/80x80/f1f5f9/334155?text=Z790",
      price: 14_500_000, originalPrice: 15_900_000,
      warranty: "36 tháng",
      availability: "in-stock", stockQuantity: 14,
    },
    {
      id: "mb-3", brand: "ASUS", platform: "am5",
      name: "ASUS ROG Crosshair X670E Hero",
      href: "/products/asus-rog-crosshair-x670e-hero",
      thumbnail: "https://placehold.co/80x80/fee2e2/991b1b?text=X670",
      price: 16_000_000, originalPrice: 17_500_000,
      warranty: "36 tháng",
      availability: "in-stock", stockQuantity: 7,
    },
    {
      id: "mb-4", brand: "Gigabyte", platform: "am5",
      name: "Gigabyte X670E Aorus Master",
      href: "/products/gigabyte-x670e-aorus-master",
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
      href: "/products/gskill-trident-z5-ddr5-6400",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 4_800_000, originalPrice: 5_200_000,
      warranty: "36 tháng",
      variants: [{ value: "32gb", label: "32 GB (2×16 GB)" }, { value: "64gb", label: "64 GB (2×32 GB)" }],
      availability: "in-stock", stockQuantity: 20,
    },
    {
      id: "ram-2", brand: "Corsair",
      name: "Corsair Dominator Titanium DDR5-6000",
      href: "/products/corsair-dominator-titanium-ddr5-6000",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 5_200_000, originalPrice: 5_800_000,
      warranty: "36 tháng",
      variants: [{ value: "32gb", label: "32 GB (2×16 GB)" }, { value: "64gb", label: "64 GB (2×32 GB)" }],
      availability: "in-stock", stockQuantity: 11,
    },
    {
      id: "ram-3", brand: "Kingston",
      name: "Kingston Fury Beast DDR5-5600",
      href: "/products/kingston-fury-beast-ddr5-5600",
      thumbnail: "https://placehold.co/80x80/fef3c7/b45309?text=DDR5",
      price: 2_100_000, originalPrice: 2_400_000,
      warranty: "36 tháng",
      variants: [{ value: "16gb", label: "16 GB (2×8 GB)" }, { value: "32gb", label: "32 GB (2×16 GB)" }],
      availability: "in-stock", stockQuantity: 34,
    },
    {
      id: "ram-4", brand: "TeamGroup",
      name: "TeamGroup T-Force Delta DDR5-6400",
      href: "/products/teamgroup-t-force-delta-ddr5-6400",
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
      href: "/products/samsung-990-pro-nvme-pcie-4",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 3_200_000, originalPrice: 3_500_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }, { value: "4tb", label: "4 TB" }],
      availability: "in-stock", stockQuantity: 18,
    },
    {
      id: "ssd-2", brand: "Western Digital",
      name: "WD Black SN850X NVMe PCIe 4.0",
      href: "/products/wd-black-sn850x-nvme-pcie-4",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 2_900_000, originalPrice: 3_200_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }, { value: "4tb", label: "4 TB" }],
      availability: "in-stock", stockQuantity: 22,
    },
    {
      id: "ssd-3", brand: "Seagate",
      name: "Seagate FireCuda 530 NVMe PCIe 4.0",
      href: "/products/seagate-firecuda-530-nvme-pcie-4",
      thumbnail: "https://placehold.co/80x80/e0e7ff/3730a3?text=NVMe",
      price: 1_800_000, originalPrice: 1_999_000,
      warranty: "60 tháng",
      variants: [{ value: "1tb", label: "1 TB" }, { value: "2tb", label: "2 TB" }],
      availability: "limited", stockQuantity: 4,
    },
    {
      id: "ssd-4", brand: "Crucial",
      name: "Crucial T700 NVMe PCIe 5.0",
      href: "/products/crucial-t700-nvme-pcie-5",
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
      href: "/products/corsair-hx1200i-1200w-80-plus-platinum",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1200W",
      price: 5_500_000, originalPrice: 6_200_000,
      warranty: "84 tháng",
      availability: "in-stock", stockQuantity: 11,
    },
    {
      id: "psu-2", brand: "Seasonic",
      name: "Seasonic Prime TX-1000 1000W 80+ Titanium",
      href: "/products/seasonic-prime-tx-1000-1000w-80-plus-titanium",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=1000W",
      price: 6_200_000, originalPrice: 6_800_000,
      warranty: "120 tháng",
      availability: "limited", stockQuantity: 3,
    },
    {
      id: "psu-3", brand: "EVGA",
      name: "EVGA SuperNOVA 850 G6 850W 80+ Gold",
      href: "/products/evga-supernova-850-g6-850w-80-plus-gold",
      thumbnail: "https://placehold.co/80x80/fce7f3/9d174d?text=850W",
      price: 3_200_000, originalPrice: 3_600_000,
      warranty: "84 tháng",
      availability: "in-stock", stockQuantity: 16,
    },
    {
      id: "psu-4", brand: "be quiet!",
      name: "be quiet! Dark Power 13 1000W 80+ Titanium",
      href: "/products/be-quiet-dark-power-13-1000w-80-plus-titanium",
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
      href: "/products/lian-li-pc-o11-dynamic-evo-xl",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 3_800_000, originalPrice: 4_200_000,
      warranty: "24 tháng",
      availability: "in-stock",
    },
    {
      id: "case-2", brand: "Fractal Design",
      name: "Fractal Design Torrent Compact White",
      href: "/products/fractal-design-torrent-compact-white",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 3_200_000, originalPrice: 3_500_000,
      warranty: "24 tháng",
      availability: "in-stock",
    },
    {
      id: "case-3", brand: "NZXT",
      name: "NZXT H9 Elite Matte Black",
      href: "/products/nzxt-h9-elite-matte-black",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 4_800_000, originalPrice: 5_500_000,
      warranty: "24 tháng",
      availability: "limited",
    },
    {
      id: "case-4", brand: "be quiet!",
      name: "be quiet! Silent Base 802 Window Black",
      href: "/products/be-quiet-silent-base-802-window-black",
      thumbnail: "https://placehold.co/80x80/f0fdf4/15803d?text=Case",
      price: 4_100_000, originalPrice: 4_600_000,
      warranty: "24 tháng",
      availability: "in-stock",
    },
  ],
  hdd: [
    { id: "hdd-1", brand: "Seagate", name: "Seagate Barracuda 2TB 7200RPM SATA", href: "/products/seagate-barracuda-2tb", thumbnail: "https://placehold.co/100x100/e0e7ff/3730a3?text=HDD", price: 1_400_000, originalPrice: 1_600_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 28 },
    { id: "hdd-2", brand: "WD", name: "WD Blue 4TB 5400RPM SATA", href: "/products/wd-blue-4tb", thumbnail: "https://placehold.co/100x100/e0e7ff/3730a3?text=HDD", price: 2_200_000, originalPrice: 2_500_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 15 },
    { id: "hdd-3", brand: "Toshiba", name: "Toshiba X300 6TB 7200RPM SATA", href: "/products/toshiba-x300-6tb", thumbnail: "https://placehold.co/100x100/e0e7ff/3730a3?text=HDD", price: 3_100_000, originalPrice: 3_400_000, warranty: "24 tháng", availability: "limited", stockQuantity: 6 },
  ],
  "cpu-cooler": [
    { id: "cool-1", brand: "Noctua", name: "Noctua NH-D15 Dual Tower CPU Cooler", href: "/products/noctua-nh-d15", thumbnail: "https://placehold.co/100x100/fef3c7/b45309?text=Air", price: 2_800_000, originalPrice: 3_100_000, warranty: "72 tháng", availability: "in-stock", stockQuantity: 12 },
    { id: "cool-2", brand: "be quiet!", name: "be quiet! Dark Rock Pro 4 CPU Cooler", href: "/products/be-quiet-dark-rock-pro-4", thumbnail: "https://placehold.co/100x100/fef3c7/b45309?text=Air", price: 2_200_000, originalPrice: 2_500_000, warranty: "36 tháng", availability: "in-stock", stockQuantity: 9 },
    { id: "cool-3", brand: "Thermalright", name: "Thermalright Peerless Assassin 120 SE", href: "/products/thermalright-peerless-assassin-120-se", thumbnail: "https://placehold.co/100x100/fef3c7/b45309?text=Air", price: 750_000, originalPrice: 850_000, warranty: "12 tháng", availability: "in-stock", stockQuantity: 31 },
  ],
  aio: [
    { id: "aio-1", brand: "Corsair", name: "Corsair iCUE H150i Elite Capellix 360mm", href: "/products/corsair-icue-h150i-elite-capellix", thumbnail: "https://placehold.co/100x100/dbeafe/1e40af?text=AIO", price: 4_200_000, originalPrice: 4_800_000, warranty: "60 tháng", availability: "in-stock", stockQuantity: 7 },
    { id: "aio-2", brand: "NZXT", name: "NZXT Kraken Z73 360mm LCD AIO", href: "/products/nzxt-kraken-z73", thumbnail: "https://placehold.co/100x100/dbeafe/1e40af?text=AIO", price: 6_500_000, originalPrice: 7_200_000, warranty: "72 tháng", availability: "limited", stockQuantity: 3 },
    { id: "aio-3", brand: "Arctic", name: "Arctic Liquid Freezer III 360 ARGB", href: "/products/arctic-liquid-freezer-iii-360", thumbnail: "https://placehold.co/100x100/dbeafe/1e40af?text=AIO", price: 2_600_000, originalPrice: 2_900_000, warranty: "72 tháng", availability: "in-stock", stockQuantity: 14 },
  ],
  fans: [
    { id: "fan-1", brand: "be quiet!", name: "be quiet! Silent Wings 4 120mm 3-Pack", href: "/products/be-quiet-silent-wings-4-3pack", thumbnail: "https://placehold.co/100x100/f0fdf4/15803d?text=Fan", price: 1_100_000, originalPrice: 1_300_000, warranty: "36 tháng", availability: "in-stock", stockQuantity: 22 },
    { id: "fan-2", brand: "Noctua", name: "Noctua NF-A12x25 PWM 3-Pack", href: "/products/noctua-nf-a12x25-3pack", thumbnail: "https://placehold.co/100x100/f0fdf4/15803d?text=Fan", price: 1_800_000, originalPrice: 2_000_000, warranty: "72 tháng", availability: "in-stock", stockQuantity: 10 },
    { id: "fan-3", brand: "Corsair", name: "Corsair LL120 RGB 120mm 3-Pack", href: "/products/corsair-ll120-rgb-3pack", thumbnail: "https://placehold.co/100x100/f0fdf4/15803d?text=Fan", price: 1_400_000, originalPrice: 1_600_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 18 },
  ],
  monitor: [
    { id: "mon-1", brand: "LG", name: "LG 27GP850-B 27\" QHD 165Hz Nano IPS", href: "/products/lg-27gp850-b", thumbnail: "https://placehold.co/100x100/fce7f3/9d174d?text=MON", price: 8_500_000, originalPrice: 9_500_000, warranty: "36 tháng", availability: "in-stock", stockQuantity: 8 },
    { id: "mon-2", brand: "ASUS", name: "ASUS ROG Swift PG279QM 27\" QHD 240Hz IPS", href: "/products/asus-rog-swift-pg279qm", thumbnail: "https://placehold.co/100x100/fce7f3/9d174d?text=MON", price: 16_500_000, originalPrice: 18_000_000, warranty: "36 tháng", availability: "limited", stockQuantity: 4 },
    { id: "mon-3", brand: "Samsung", name: "Samsung Odyssey G7 32\" QHD 240Hz VA", href: "/products/samsung-odyssey-g7-32", thumbnail: "https://placehold.co/100x100/fce7f3/9d174d?text=MON", price: 14_200_000, originalPrice: 15_500_000, warranty: "36 tháng", availability: "in-stock", stockQuantity: 6 },
  ],
  keyboard: [
    { id: "kb-1", brand: "Keychron", name: "Keychron Q3 QMK TKL Mechanical Keyboard", href: "/products/keychron-q3-qmk", thumbnail: "https://placehold.co/100x100/fef3c7/b45309?text=KB", price: 3_200_000, originalPrice: 3_600_000, warranty: "12 tháng", variants: [{ value: "red", label: "Red Switch" }, { value: "brown", label: "Brown Switch" }, { value: "blue", label: "Blue Switch" }], availability: "in-stock", stockQuantity: 14 },
    { id: "kb-2", brand: "ASUS", name: "ASUS ROG Strix Scope RX TKL Wireless", href: "/products/asus-rog-strix-scope-rx-tkl", thumbnail: "https://placehold.co/100x100/fef3c7/b45309?text=KB", price: 4_200_000, originalPrice: 4_800_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 7 },
    { id: "kb-3", brand: "Ducky", name: "Ducky One 3 Mini 60% RGB Mechanical", href: "/products/ducky-one-3-mini", thumbnail: "https://placehold.co/100x100/fef3c7/b45309?text=KB", price: 2_800_000, originalPrice: 3_100_000, warranty: "12 tháng", variants: [{ value: "red", label: "Red Switch" }, { value: "brown", label: "Brown Switch" }], availability: "limited", stockQuantity: 5 },
  ],
  mouse: [
    { id: "ms-1", brand: "Logitech", name: "Logitech G Pro X Superlight 2 DEX", href: "/products/logitech-g-pro-x-superlight-2-dex", thumbnail: "https://placehold.co/100x100/dcfce7/15803d?text=MS", price: 4_500_000, originalPrice: 5_000_000, warranty: "24 tháng", variants: [{ value: "black", label: "Đen" }, { value: "white", label: "Trắng" }], availability: "in-stock", stockQuantity: 11 },
    { id: "ms-2", brand: "Razer", name: "Razer DeathAdder V3 Pro Wireless", href: "/products/razer-deathadder-v3-pro", thumbnail: "https://placehold.co/100x100/dcfce7/15803d?text=MS", price: 3_800_000, originalPrice: 4_200_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 16 },
    { id: "ms-3", brand: "SteelSeries", name: "SteelSeries Aerox 5 Wireless Gaming", href: "/products/steelseries-aerox-5-wireless", thumbnail: "https://placehold.co/100x100/dcfce7/15803d?text=MS", price: 2_900_000, originalPrice: 3_300_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 9 },
  ],
  headphones: [
    { id: "hp-1", brand: "Sony", name: "Sony WH-1000XM5 Noise Cancelling Wireless", href: "/products/sony-wh-1000xm5", thumbnail: "https://placehold.co/100x100/fee2e2/991b1b?text=HP", price: 8_200_000, originalPrice: 9_500_000, warranty: "12 tháng", variants: [{ value: "black", label: "Đen" }, { value: "silver", label: "Bạc" }], availability: "in-stock", stockQuantity: 13 },
    { id: "hp-2", brand: "HyperX", name: "HyperX Cloud Alpha S Gaming Headset 7.1", href: "/products/hyperx-cloud-alpha-s", thumbnail: "https://placehold.co/100x100/fee2e2/991b1b?text=HP", price: 2_400_000, originalPrice: 2_800_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 20 },
    { id: "hp-3", brand: "SteelSeries", name: "SteelSeries Arctis Nova Pro Wireless", href: "/products/steelseries-arctis-nova-pro-wireless", thumbnail: "https://placehold.co/100x100/fee2e2/991b1b?text=HP", price: 7_500_000, originalPrice: 8_500_000, warranty: "24 tháng", availability: "limited", stockQuantity: 4 },
  ],
  mousepad: [
    { id: "mp-1", brand: "SteelSeries", name: "SteelSeries QcK Heavy XXL Gaming Mousepad", href: "/products/steelseries-qck-heavy-xxl", thumbnail: "https://placehold.co/100x100/f1f5f9/334155?text=PAD", price: 750_000, originalPrice: 850_000, warranty: "12 tháng", availability: "in-stock", stockQuantity: 35 },
    { id: "mp-2", brand: "Razer", name: "Razer Gigantus V2 3XL Control Surface", href: "/products/razer-gigantus-v2-3xl", thumbnail: "https://placehold.co/100x100/f1f5f9/334155?text=PAD", price: 1_100_000, originalPrice: 1_300_000, warranty: "12 tháng", availability: "in-stock", stockQuantity: 21 },
    { id: "mp-3", brand: "Corsair", name: "Corsair MM700 RGB Extended Gaming Surface", href: "/products/corsair-mm700-rgb-extended", thumbnail: "https://placehold.co/100x100/f1f5f9/334155?text=PAD", price: 1_800_000, originalPrice: 2_100_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 12 },
  ],
  speakers: [
    { id: "sp-1", brand: "Logitech", name: "Logitech Z625 2.1 Powerful THX Sound", href: "/products/logitech-z625", thumbnail: "https://placehold.co/100x100/fce7f3/9d174d?text=SP", price: 2_800_000, originalPrice: 3_200_000, warranty: "24 tháng", availability: "in-stock", stockQuantity: 10 },
    { id: "sp-2", brand: "Creative", name: "Creative Pebble Pro 2.0 USB Bluetooth", href: "/products/creative-pebble-pro", thumbnail: "https://placehold.co/100x100/fce7f3/9d174d?text=SP", price: 1_200_000, originalPrice: 1_500_000, warranty: "12 tháng", availability: "in-stock", stockQuantity: 25 },
    { id: "sp-3", brand: "Harman Kardon", name: "Harman Kardon SoundSticks 4 Bluetooth", href: "/products/harman-kardon-soundsticks-4", thumbnail: "https://placehold.co/100x100/fce7f3/9d174d?text=SP", price: 5_500_000, originalPrice: 6_200_000, warranty: "24 tháng", availability: "limited", stockQuantity: 3 },
  ],
  chair: [
    { id: "ch-1", brand: "Secretlab", name: "Secretlab Titan Evo 2022 Gaming Chair", href: "/products/secretlab-titan-evo-2022", thumbnail: "https://placehold.co/100x100/f0fdf4/15803d?text=CH", price: 14_500_000, originalPrice: 16_000_000, warranty: "60 tháng", variants: [{ value: "regular", label: "Regular" }, { value: "xl", label: "XL" }], availability: "in-stock", stockQuantity: 5 },
    { id: "ch-2", brand: "DXRacer", name: "DXRacer Formula Series Gaming Chair", href: "/products/dxracer-formula-series", thumbnail: "https://placehold.co/100x100/f0fdf4/15803d?text=CH", price: 6_800_000, originalPrice: 7_500_000, warranty: "24 tháng", variants: [{ value: "black-red", label: "Đen/Đỏ" }, { value: "black-blue", label: "Đen/Xanh" }], availability: "in-stock", stockQuantity: 8 },
    { id: "ch-3", brand: "Herman Miller", name: "Herman Miller Aeron Ergonomic Chair Size B", href: "/products/herman-miller-aeron-size-b", thumbnail: "https://placehold.co/100x100/f0fdf4/15803d?text=CH", price: 42_000_000, originalPrice: 45_000_000, warranty: "144 tháng", availability: "limited", stockQuantity: 2 },
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
      reason: `Không tương thích socket: CPU cần socket ${cpu.platform.toUpperCase()}, mainboard đang dùng socket ${mb.platform.toUpperCase()}.`,
      severity: "error",
    });
  }

  return issues;
}

// ─── Features ──────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <CpuChipIcon className="h-6 w-6 text-primary-600" />,
    title: "Chọn linh kiện đa dạng",
    description: "Từ CPU, GPU đến màn hình, bàn phím và ghế — đầy đủ 18 loại linh kiện để xây dựng bộ PC hoàn chỉnh theo nhu cầu của bạn.",
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6 text-primary-600" />,
    title: "Kiểm tra tương thích",
    description: "Hệ thống tự động phát hiện và cảnh báo các vấn đề tương thích giữa CPU, mainboard và linh kiện khác trong cấu hình.",
  },
  {
    icon: <ArrowsRightLeftIcon className="h-6 w-6 text-primary-600" />,
    title: "Quản lý nhiều cấu hình",
    description: "Tạo và chuyển đổi giữa tối đa 5 cấu hình PC khác nhau. Mỗi cấu hình có trạng thái riêng biệt để dễ so sánh.",
  },
  {
    icon: <DocumentArrowDownIcon className="h-6 w-6 text-primary-600" />,
    title: "Xuất cấu hình",
    description: "Xuất danh sách linh kiện dưới dạng PNG, PDF hoặc Excel để lưu trữ, in ấn hoặc chia sẻ với người khác.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    value: "q1",
    label: "Làm thế nào để bắt đầu xây dựng cấu hình PC?",
    children: <p>Bắt đầu bằng cách nhấn nút &ldquo;Chọn&rdquo; bên cạnh từng loại linh kiện. Một cửa sổ sẽ xuất hiện với danh sách sản phẩm. Bạn có thể tìm kiếm, lọc theo thương hiệu và giá, sau đó chọn linh kiện phù hợp. Sau khi chọn xong, linh kiện sẽ được thêm vào cấu hình hiện tại.</p>,
  },
  {
    value: "q2",
    label: "Hệ thống kiểm tra tương thích hoạt động như thế nào?",
    children: <p>Hệ thống tự động kiểm tra tương thích socket giữa CPU và mainboard. Khi phát hiện vấn đề, một cảnh báo sẽ hiển thị bên dưới danh sách linh kiện. Bạn vẫn có thể tiếp tục chọn mua, nhưng hãy đảm bảo kiểm tra kỹ trước khi thanh toán.</p>,
  },
  {
    value: "q3",
    label: "Tôi có thể tạo và lưu nhiều cấu hình PC không?",
    children: <p>Có! Bạn có thể tạo tối đa 5 cấu hình PC khác nhau trong cùng một phiên. Nhấn nút &ldquo;+&rdquo; bên cạnh thanh tab để thêm cấu hình mới. Mỗi cấu hình có danh sách linh kiện riêng biệt và có thể chuyển đổi qua lại dễ dàng.</p>,
  },
  {
    value: "q4",
    label: "Làm sao để xuất cấu hình PC của tôi?",
    children: <p>Ở thanh tổng kết bên dưới, bạn sẽ thấy ba nút xuất: PNG (hình ảnh), PDF (tài liệu in ấn) và Excel (bảng tính). Nhấn vào nút tương ứng để tải xuống file cấu hình của bạn.</p>,
  },
  {
    value: "q5",
    label: "Tôi có thể thêm linh kiện peripherals (chuột, bàn phím, màn hình) không?",
    children: <p>Có, trang Build PC hỗ trợ đầy đủ 18 loại linh kiện bao gồm cả peripherals như màn hình, bàn phím, chuột, tai nghe, loa, lót chuột và ghế. Cuộn xuống trong danh sách linh kiện để thấy tất cả các loại.</p>,
  },
  {
    value: "q6",
    label: "Giá hiển thị có bao gồm thuế VAT không?",
    children: <p>Giá hiển thị trên trang là giá bán lẻ chưa bao gồm thuế VAT. Thuế và phí vận chuyển sẽ được tính khi bạn tiến hành thanh toán. Giá có thể thay đổi theo thời điểm.</p>,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Stable initial build — fixed ID so SSR and client hydration produce identical HTML. */
const INITIAL_BUILD: BuildState = {
  id: "build-1",
  name: "Build 1",
  selectedParts: {},
  selectedVariants: {},
};

function makeBuild(id: string, name: string): BuildState {
  return { id, name, selectedParts: {}, selectedVariants: {} };
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function BuildPCPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  // Use a stable counter ref for new builds — only incremented post-hydration.
  const buildCounterRef = useRef(2);
  const [builds, setBuilds] = useState<BuildState[]>([INITIAL_BUILD]);
  const [activeBuildId, setActiveBuildId] = useState<string>(INITIAL_BUILD.id);
  const [pickerCategory, setPickerCategory] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [exportState, setExportState] = useState<"idle" | "png" | "pdf" | "excel">("idle");

  // ── Active build ──────────────────────────────────────────────────────────
  const activeBuild = builds.find((b) => b.id === activeBuildId) ?? builds[0];

  // ── Derived state ─────────────────────────────────────────────────────────
  const compatibilityIssues = useMemo(
    () => computeCompatibility(activeBuild.selectedParts),
    [activeBuild.selectedParts]
  );

  const currentConfig = SLOT_CONFIGS.find((s) => s.key === pickerCategory);
  const currentCatalog = pickerCategory ? (MOCK_CATALOG[pickerCategory] ?? []) : [];

  const buildSlots = useMemo<BuildSlot[]>(
    () =>
      SLOT_CONFIGS.map((config) => {
        const part = activeBuild.selectedParts[config.key];
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
    [activeBuild.selectedParts, compatibilityIssues]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAddBuild = useCallback(() => {
    if (builds.length >= 5) return;
    const n = buildCounterRef.current++;
    const newBuild = makeBuild(`build-${n}`, `Build ${n}`);
    setBuilds((prev) => [...prev, newBuild]);
    setActiveBuildId(newBuild.id);
  }, [builds.length]);

  const handleResetBuild = useCallback(() => {
    setBuilds((prev) =>
      prev.map((b) =>
        b.id === activeBuildId
          ? { ...b, selectedParts: {}, selectedVariants: {} }
          : b
      )
    );
  }, [activeBuildId]);

  const openPicker = useCallback((category: string) => {
    setPickerCategory(category);
  }, []);

  const closePicker = useCallback(() => {
    setPickerCategory(null);
  }, []);

  const handlePartSelect = useCallback(
    (partId: string, variantValue?: string) => {
      if (!pickerCategory) return;
      const cat = pickerCategory;
      const part = (MOCK_CATALOG[cat] ?? []).find((p) => p.id === partId) ?? null;
      setBuilds((prev) =>
        prev.map((b) =>
          b.id === activeBuildId
            ? {
              ...b,
              selectedParts: { ...b.selectedParts, [cat]: part },
              selectedVariants: { ...b.selectedVariants, [cat]: variantValue ?? "" },
            }
            : b
        )
      );
    },
    [pickerCategory, activeBuildId]
  );

  const handleRemove = useCallback(
    (category: string) => {
      setBuilds((prev) =>
        prev.map((b) =>
          b.id === activeBuildId
            ? {
              ...b,
              selectedParts: { ...b.selectedParts, [category]: null },
              selectedVariants: { ...b.selectedVariants, [category]: "" },
            }
            : b
        )
      );
    },
    [activeBuildId]
  );

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsAddingToCart(false);
  }, []);

  const handleExportPNG = useCallback(() => {
    setExportState("png");
    alert("Đang xuất PNG...");
    setExportState("idle");
  }, []);

  const handleExportPDF = useCallback(() => {
    setExportState("pdf");
    alert("Đang xuất PDF...");
    setExportState("idle");
  }, []);

  const handleExportExcel = useCallback(() => {
    setExportState("excel");
    alert("Đang xuất Excel...");
    setExportState("idle");
  }, []);

  // ── Helper ────────────────────────────────────────────────────────────────

  function getPartInfo(key: string): SelectedPartInfo | null {
    const part = activeBuild.selectedParts[key];
    if (!part) return null;
    const hasError = compatibilityIssues.some(
      (i) => i.severity === "error" && (i.part1 === part.name || i.part2 === part.name)
    );
    const variantValue = activeBuild.selectedVariants[key];
    const variantLabel = variantValue
      ? (part.variants?.find((v) => v.value === variantValue)?.label ?? variantValue)
      : undefined;
    return {
      ...part,
      compatibilityStatus: hasError ? "incompatible" : "compatible",
      selectedVariant: variantLabel,
    };
  }

  // Suppress unused exportState lint warning — used for potential future UI
  void exportState;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-secondary-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="mt-3">
        <div className="mx-auto max-w-[1400px] px-6 py-8 bg-white rounded-lg">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            ← Trang chủ
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <WrenchScrewdriverIcon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Build PC</h1>
              <p className="mt-1 text-secondary-500">
                Tự xây dựng cấu hình PC theo nhu cầu và ngân sách của bạn
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8 flex flex-col gap-8">

        {/* ── Builds tab bar ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap">
          <Tabs
            tabs={builds.map((b) => ({ value: b.id, label: b.name }))}
            value={activeBuildId}
            onChange={setActiveBuildId}
            variant="pill"
          >
            {null}
          </Tabs>

          {/* Add build */}
          <button
            type="button"
            onClick={handleAddBuild}
            disabled={builds.length >= 5}
            className={[
              "flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              builds.length >= 5
                ? "cursor-not-allowed border-secondary-200 bg-secondary-50 text-secondary-400"
                : "border-secondary-200 bg-white text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900",
            ].join(" ")}
          >
            <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Thêm build
          </button>

          {/* Reset current build */}
          <button
            type="button"
            onClick={handleResetBuild}
            className="flex items-center gap-1.5 rounded-xl border border-secondary-200 bg-white px-3 py-2 text-xs font-medium text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <ArrowPathIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Đặt lại
          </button>

          {/* Delete build (only when more than 1 build) */}
          {builds.length > 1 && (
            <button
              type="button"
              onClick={() => {
                const remaining = builds.filter((b) => b.id !== activeBuildId);
                setBuilds(remaining);
                setActiveBuildId(remaining[remaining.length - 1].id);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-error-200 bg-white px-3 py-2 text-xs font-medium text-error-600 hover:bg-error-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500"
            >
              <TrashIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Xoá build
            </button>
          )}
        </div>

        {/* ── Part selectors ──────────────────────────────────────────────── */}
        <section>
          <div className="flex flex-col gap-2">
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
          </div>
        </section>

        {/* ── Compatibility alerts ─────────────────────────────────────────── */}
        {compatibilityIssues.length > 0 && (
          <CompatibilityAlert issues={compatibilityIssues} collapsible dismissible />
        )}

        {/* ── Build summary bar ────────────────────────────────────────────── */}
        <PCBuildSummary
          slots={buildSlots}
          compatibilityIssues={compatibilityIssues}
          onAddAllToCart={handleAddToCart}
          isAddingToCart={isAddingToCart}
          onExportPNG={handleExportPNG}
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
        />

        {/* ── Introduction section ─────────────────────────────────────────── */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Giới thiệu về Build PC</h2>
          <p className="text-secondary-500 mb-8">
            Công cụ xây dựng cấu hình PC giúp bạn lựa chọn linh kiện phù hợp, kiểm tra tương thích
            và quản lý nhiều cấu hình cùng lúc một cách dễ dàng.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  {f.icon}
                </div>
                <h3 className="mb-2 font-semibold text-secondary-900">{f.title}</h3>
                <p className="text-sm text-secondary-500">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ section ──────────────────────────────────────────────────── */}
        <section className="mt-4 mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Hỏi đáp (FAQ)</h2>
          <p className="text-secondary-500 mb-8">
            Các câu hỏi thường gặp về công cụ Build PC và quy trình mua sắm linh kiện.
          </p>
          <Accordion
            variant="ghost"
            multiple
            items={FAQ_ITEMS}
          />
        </section>

      </main>

      {/* ── Part picker modal ────────────────────────────────────────────────── */}
      <PartPickerModal
        isOpen={pickerCategory !== null}
        onClose={closePicker}
        categoryLabel={currentConfig?.label ?? "linh kiện"}
        products={currentCatalog}
        selectedId={activeBuild.selectedParts[pickerCategory ?? ""]?.id}
        selectedVariantValue={pickerCategory ? activeBuild.selectedVariants[pickerCategory] : undefined}
        onSelect={handlePartSelect}
      />
    </div>
  );
}
