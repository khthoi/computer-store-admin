import Image from "next/image";
import Link from "next/link";

// ─── Banner data ───────────────────────────────────────────────────────────────
// Swap src paths when real assets are ready.

const MAIN_BANNER = {
  src: "/image-slide/slide01.jpg",
  alt: "Khuyến mãi tháng 3 — Giảm đến 30%",
  href: "/khuyen-mai",
};

const PROMO_BANNERS = [
  {
    src: "/image-slide/slide02.png",
    alt: "PC Gaming Chiến Đỉnh — Sale khủng",
    href: "/products/pc-gaming",
    label: "PC Gaming Sale",
  },
  {
    src: "/image-slide/slide03.png",
    alt: "CPU Intel & AMD Bán Chạy",
    href: "/products/cpu",
    label: "CPU Bán Chạy",
  },
  {
    src: "/image-slide/slide02.png",
    alt: "GPU Giảm Giá Sốc — RTX & RX",
    href: "/products/gpu",
    label: "GPU Giảm Giá",
  },
  {
    src: "/image-slide/slide03.png",
    alt: "Laptop Gaming Mới Nhất 2024",
    href: "/products/laptop-gaming",
    label: "Laptop Gaming",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * HeroBanner — static hero layout replacing the previous slider.
 *
 * Layout:
 *   ┌──────────────────────────────────┐
 *   │         Large hero banner        │  ← full width, 21:7 ratio
 *   └──────────────────────────────────┘
 *   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
 *   │ Promo │ │ Promo │ │ Promo │ │ Promo │  ← 4 equal columns
 *   └───────┘ └───────┘ └───────┘ └───────┘
 *
 * Responsive:
 *   Desktop  → 4 promos per row
 *   Tablet   → 2 promos per row
 *   Mobile   → 1 promo per row
 */
export function HeroSlider() {
  return (
    <section aria-label="Banner khuyến mãi" className="bg-secondary-50 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">

          {/* ── Large hero banner ── */}
          <Link
            href={MAIN_BANNER.href}
            className="group relative block w-full overflow-hidden rounded-xl aspect-[21/7] bg-secondary-200 shadow-sm"
          >
            <Image
              src={MAIN_BANNER.src}
              alt={MAIN_BANNER.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </Link>

          {/* ── 4 promotional banners ── */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROMO_BANNERS.map((banner) => (
              <Link
                key={banner.href + banner.label}
                href={banner.href}
                aria-label={banner.alt}
                className="group relative block overflow-hidden rounded-xl aspect-[4/3] bg-secondary-200 shadow-sm"
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
