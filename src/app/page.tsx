/**
 * TechStore — Homepage
 *
 * The Header and Footer are rendered by layout.tsx (sticky header + site-wide footer).
 * This page provides the storefront homepage body content.
 */

import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  PhoneIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

import { HeroSlider } from "@/src/components/home/HeroSlider";
import { CategorySlider } from "@/src/components/home/CategorySlider";

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

// ─── Product card ─────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  specs: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating?: number;
}

function ProductCard({ product }: { product: Product }) {
  const { name, specs, price, originalPrice, image, badge, rating } = product;

  return (
    <div className="group relative flex flex-col rounded-xl border border-secondary-200 bg-white overflow-hidden transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-secondary-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-2 top-2 rounded bg-error-500 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="line-clamp-2 text-sm font-medium leading-snug text-secondary-900">
          {name}
        </p>
        <p className="line-clamp-1 text-xs text-secondary-500">{specs}</p>

        {/* Price row */}
        <div className="mt-auto pt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-sm font-bold text-primary-600">{price}</span>
          {originalPrice && (
            <span className="text-xs text-secondary-400 line-through">{originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1">
            <StarIcon className="h-3 w-3 text-warning-400" aria-hidden="true" />
            <span className="text-xs font-medium text-secondary-600">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Mock datasets ─────────────────────────────────────────────────────────────

const LAPTOP_GAMING_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ASUS ROG Strix G16 (2024)",
    specs: "Core i9-14900HX · RTX 4070 · 16GB · 1TB",
    price: "42.990.000₫",
    originalPrice: "47.000.000₫",
    image: "/icons/laptop-gaming.png",
    badge: "Hot",
    rating: 4.8,
  },
  {
    id: 2,
    name: "MSI Katana 15 B13VGK",
    specs: "Core i7-13620H · RTX 4070 · 16GB · 1TB",
    price: "27.490.000₫",
    originalPrice: "30.000.000₫",
    image: "/icons/laptop-gaming.png",
    badge: "Sale",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Acer Predator Helios 16",
    specs: "Core i9-14900HX · RTX 4080 · 32GB · 2TB",
    price: "56.990.000₫",
    image: "/icons/laptop-gaming.png",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Lenovo Legion 5 Pro Gen 9",
    specs: "Ryzen 7 7745HX · RTX 4060 · 16GB · 512GB",
    price: "33.990.000₫",
    originalPrice: "36.500.000₫",
    image: "/icons/laptop-gaming.png",
    badge: "New",
    rating: 4.7,
  },
  {
    id: 5,
    name: "HP OMEN 16 (2024)",
    specs: "Core i7-14700HX · RTX 4060 · 16GB · 1TB",
    price: "31.490.000₫",
    image: "/icons/laptop-gaming.png",
    rating: 4.5,
  },
];

const CPU_GPU_PRODUCTS: Product[] = [
  {
    id: 6,
    name: "Intel Core i7-14700K",
    specs: "20 Cores · 28 Threads · LGA1700 · 125W",
    price: "11.490.000₫",
    originalPrice: "12.500.000₫",
    image: "/icons/cpu-intel.png",
    badge: "Hot",
    rating: 4.9,
  },
  {
    id: 7,
    name: "AMD Ryzen 7 7800X3D",
    specs: "8 Cores · 16 Threads · AM5 · 3D V-Cache",
    price: "10.990.000₫",
    image: "/icons/cpu-amd.jpg",
    rating: 4.9,
  },
  {
    id: 8,
    name: "NVIDIA GeForce RTX 4070 Super",
    specs: "12GB GDDR6X · PCIe 4.0 · DLSS 3.5",
    price: "18.990.000₫",
    originalPrice: "21.000.000₫",
    image: "/icons/nvidia.png",
    badge: "Sale",
    rating: 4.8,
  },
  {
    id: 9,
    name: "AMD Radeon RX 7900 XTX",
    specs: "24GB GDDR6 · PCIe 4.0 · 355W",
    price: "22.490.000₫",
    image: "/icons/amd.png",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Intel Core i9-14900KS",
    specs: "24 Cores · 32 Threads · LGA1700 · 150W",
    price: "17.990.000₫",
    image: "/icons/cpu-intel.png",
    badge: "New",
    rating: 4.8,
  },
];

// ─── Product section — with real cards ───────────────────────────────────────

function ProductSection({
  title,
  href = "/products",
  products,
}: {
  title: string;
  href?: string;
  products: Product[];
}) {
  return (
    <section aria-labelledby={`ps-${title}`} className="py-6 bg-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 id={`ps-${title}`} className="text-lg font-bold text-secondary-900">{title}</h2>
          <Link href={href} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Flash sale section — skeleton preserved ──────────────────────────────────

function FlashSaleSection() {
  return (
    <section aria-labelledby="ps-flash" className="py-6 bg-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="ps-flash" className="text-lg font-bold text-secondary-900">
            Flash Sale — Giảm đến 20% 🔥
          </h2>
          <Link href="/khuyen-mai" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="rounded-xl border border-secondary-200 bg-white p-3 flex flex-col gap-2">
              <div className="aspect-square w-full rounded-lg bg-secondary-100 animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-secondary-100 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-secondary-100 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-primary-100 animate-pulse" />
            </div>
          ))}
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
