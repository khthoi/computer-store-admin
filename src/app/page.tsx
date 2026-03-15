/**
 * TechStore — Homepage
 *
 * The Header and Footer are rendered by layout.tsx (sticky header + site-wide footer).
 * This page provides the storefront homepage body content.
 */

import Link from "next/link";
import {
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

import { HeroSlider } from "@/src/components/home/HeroSlider";
import { CategorySlider } from "@/src/components/home/CategorySlider";
import type { ProductCardProps } from "@/src/components/product/ProductCard";
import { ProductCarousel } from "@/src/components/product/ProductCarousel";
import { ProductCardSkeleton } from "@/src/components/product/ProductCardSkeleton";

// ─── Trust badges ─────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: TruckIcon,        title: "Miễn phí giao hàng", desc: "Đơn từ 500.000₫ toàn quốc" },
  { icon: ShieldCheckIcon,  title: "Bảo hành chính hãng", desc: "24 – 36 tháng theo hãng" },
  { icon: ArrowPathIcon,    title: "Đổi trả 30 ngày",     desc: "Hoàn tiền 100% nếu lỗi" },
  { icon: PhoneIcon,        title: "Hỗ trợ 7/7",          desc: "Hotline 1900 1234" },
];

function TrustBadges() {
  return (
    <section aria-label="Cam kết dịch vụ" className="bg-white border-b border-secondary-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-secondary-100">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
              <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-secondary-900 truncate">{title}</p>
                <p className="hidden sm:block text-xs text-secondary-500 truncate">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mock datasets ─────────────────────────────────────────────────────────────
// Prices are raw VND integers so ProductCard / PriceTag can format them.

type MockProduct = Omit<ProductCardProps, "onAddToCart" | "onCompare" | "onWishlistToggle">;

const LAPTOP_GAMING_PRODUCTS: MockProduct[] = [
  {
    id: "rog-strix-g16-2024",
    name: "ASUS ROG Strix G16 (2024)",
    brand: "ASUS",
    href: "/products/rog-strix-g16-2024",
    thumbnail: "/icons/laptop-gaming.png",
    badge: "Hot",
    productCode: "LG01001",
    price: 42_990_000,
    originalPrice: 47_000_000,
    rating: 4.8,
    reviewCount: 124,
    stockStatus: "in-stock",
    variants: [
      {
        key: "ram",
        label: "RAM",
        options: [
          { value: "16gb", label: "16 GB", stock: 10 },
          { value: "32gb", label: "32 GB", stock: 5, priceDelta: "+3.500.000₫" },
        ],
      },
      {
        key: "storage",
        label: "Bộ nhớ",
        options: [
          { value: "1tb", label: "1 TB SSD", stock: 8 },
          { value: "2tb", label: "2 TB SSD", stock: 3, priceDelta: "+2.500.000₫" },
        ],
      },
    ],
  },
  {
    id: "msi-katana-15-b13vgk",
    name: "MSI Katana 15 B13VGK",
    brand: "MSI",
    href: "/products/msi-katana-15-b13vgk",
    thumbnail: "/icons/laptop-gaming.png",
    badge: "Sale",
    productCode: "LG01002",
    price: 27_490_000,
    originalPrice: 30_000_000,
    rating: 4.6,
    reviewCount: 89,
    stockStatus: "in-stock",
    variants: [
      {
        key: "ram",
        label: "RAM",
        options: [
          { value: "16gb", label: "16 GB", stock: 12 },
          { value: "32gb", label: "32 GB", stock: 4, priceDelta: "+3.000.000₫" },
        ],
      },
    ],
  },
  {
    id: "acer-predator-helios-16",
    name: "Acer Predator Helios 16",
    brand: "Acer",
    href: "/products/acer-predator-helios-16",
    thumbnail: "/icons/laptop-gaming.png",
    productCode: "LG01003",
    price: 56_990_000,
    rating: 4.7,
    reviewCount: 56,
    stockStatus: "in-stock",
  },
  {
    id: "lenovo-legion-5-pro-gen9",
    name: "Lenovo Legion 5 Pro Gen 9",
    brand: "Lenovo",
    href: "/products/lenovo-legion-5-pro-gen9",
    thumbnail: "/icons/laptop-gaming.png",
    badge: "New",
    productCode: "LG01004",
    price: 33_990_000,
    originalPrice: 36_500_000,
    rating: 4.7,
    reviewCount: 73,
    stockStatus: "in-stock",
    variants: [
      {
        key: "storage",
        label: "Bộ nhớ",
        options: [
          { value: "512gb", label: "512 GB", stock: 7 },
          { value: "1tb",   label: "1 TB",   stock: 3, priceDelta: "+1.500.000₫" },
        ],
      },
    ],
  },
  {
    id: "hp-omen-16-2024",
    name: "HP OMEN 16 (2024)",
    brand: "HP",
    href: "/products/hp-omen-16-2024",
    thumbnail: "/icons/laptop-gaming.png",
    productCode: "LG01005",
    price: 31_490_000,
    rating: 4.5,
    reviewCount: 41,
    stockStatus: "low-stock",
    stockQuantity: 3,
  },
];

const CPU_GPU_PRODUCTS: MockProduct[] = [
  {
    id: "intel-core-i7-14700k",
    name: "CPU Intel Core i5-12400 - CPU tương thích (Upto 4.4Ghz, 6 nhân 12 luồng, 18MB Cache, 65W) - Socket Intel LGA 1700)",
    brand: "Intel",
    href: "/products/intel-core-i7-14700k",
    thumbnail: "/icons/cpu-intel.png",
    badge: "Hot",
    productCode: "CPU02001",
    price: 11_490_000,
    originalPrice: 12_500_000,
    rating: 4.9,
    reviewCount: 312,
    stockStatus: "in-stock",
    variants: [
      {
        key: "bundle",
        label: "Gói",
        options: [
          { value: "cpu-only",    label: "CPU only",           stock: 20 },
          { value: "with-cooler", label: "+ Tản nhiệt",        stock: 8, priceDelta: "+890.000₫" },
          { value: "with-board",  label: "+ Mainboard Z790",   stock: 4, priceDelta: "+4.500.000₫" },
        ],
      },
    ],
  },
  {
    id: "amd-ryzen-7-7800x3d",
    name: "AMD Ryzen 7 7800X3D",
    brand: "AMD",
    href: "/products/amd-ryzen-7-7800x3d",
    thumbnail: "/icons/cpu-amd.jpg",
    productCode: "CPU02002",
    price: 10_990_000,
    rating: 4.9,
    reviewCount: 278,
    stockStatus: "in-stock",
  },
  {
    id: "nvidia-rtx-4070-super",
    name: "NVIDIA GeForce RTX 4070 Super",
    brand: "NVIDIA",
    href: "/products/nvidia-rtx-4070-super",
    thumbnail: "/icons/nvidia.png",
    badge: "Sale",
    productCode: "GPU03001",
    price: 18_990_000,
    originalPrice: 21_000_000,
    rating: 4.8,
    reviewCount: 195,
    stockStatus: "in-stock",
    variants: [
      {
        key: "model",
        label: "Model",
        options: [
          { value: "msi",   label: "MSI Gaming X",  stock: 6 },
          { value: "asus",  label: "ASUS TUF OC",   stock: 4, priceDelta: "+400.000₫" },
          { value: "gigabyte", label: "Gigabyte OC", stock: 3 },
        ],
      },
    ],
  },
  {
    id: "amd-radeon-rx-7900-xtx",
    name: "AMD Radeon RX 7900 XTX",
    brand: "AMD",
    href: "/products/amd-radeon-rx-7900-xtx",
    thumbnail: "/icons/amd.png",
    productCode: "GPU03002",
    price: 22_490_000,
    rating: 4.7,
    reviewCount: 88,
    stockStatus: "in-stock",
  },
  {
    id: "intel-core-i9-14900ks",
    name: "Intel Core i9-14900KS",
    brand: "Intel",
    href: "/products/intel-core-i9-14900ks",
    thumbnail: "/icons/cpu-intel.png",
    badge: "New",
    productCode: "CPU02003",
    price: 17_990_000,
    rating: 4.8,
    reviewCount: 64,
    stockStatus: "in-stock",
  },
];

// ─── Product section ──────────────────────────────────────────────────────────

function ProductSection({
  title,
  href = "/products",
  products,
}: {
  title: string;
  href?: string;
  products: MockProduct[];
}) {
  return (
    <section aria-labelledby={`ps-${title}`} className="py-6 bg-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 id={`ps-${title}`} className="text-lg font-bold text-secondary-900">
            {title}
          </h2>
          <Link
            href={href}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}

// ─── Flash sale section — skeleton placeholder ────────────────────────────────

function FlashSaleSection() {
  return (
    <section aria-labelledby="ps-flash" className="py-6 bg-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="ps-flash" className="text-lg font-bold text-secondary-900">
            Flash Sale — Giảm đến 20% 🔥
          </h2>
          <Link
            href="/khuyen-mai"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <ProductCardSkeleton count={5} />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBadges />
      <CategorySlider />
      <FlashSaleSection />
      <ProductSection
        title="Laptop Gaming Mới Nhất"
        href="/products/laptop-gaming"
        products={LAPTOP_GAMING_PRODUCTS}
      />
      <ProductSection
        title="CPU & GPU Bán Chạy"
        href="/products/linh-kien"
        products={CPU_GPU_PRODUCTS}
      />
    </>
  );
}
