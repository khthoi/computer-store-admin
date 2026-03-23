"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabPanel, type TabItem } from "@/src/components/ui/Tabs";
import { FlashSaleBanner } from "./FlashSaleBanner";
import { DealSection } from "./DealSection";
import type {
  FlashSaleEvent,
  DealGroup,
  DealCategoryMeta,
  DealCategory,
} from "@/src/app/(storefront)/promotions/_mock_data";

// ─── Banner data ───────────────────────────────────────────────────────────────

const HERO_BANNER = {
  src: "/image-slide/slide01.jpg",
  alt: "Tháng khuyến mãi — Giảm đến 40% toàn bộ danh mục",
  href: "/products",
};

const SUB_BANNERS = [
  {
    src: "/image-slide/slide02.png",
    alt: "PC Gaming Sale Khủng — Giảm đến 30%",
    href: "/products/pc-gaming",
    label: "PC Gaming Sale",
  },
  {
    src: "/image-slide/slide03.png",
    alt: "CPU Intel & AMD — Ưu đãi đặc biệt",
    href: "/products/cpu",
    label: "CPU Ưu Đãi",
  },
  {
    src: "/image-slide/slide02.png",
    alt: "GPU RTX & RX — Giảm giá sốc",
    href: "/products/gpu",
    label: "GPU Giảm Giá",
  },
  {
    src: "/image-slide/slide03.png",
    alt: "Laptop Gaming Mới Nhất — Giá tốt nhất",
    href: "/products/laptop-gaming",
    label: "Laptop Gaming",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PromotionsPageInnerProps {
  flashSale: FlashSaleEvent;
  dealGroups: DealGroup[];
  categoryMeta: DealCategoryMeta[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PromotionsPageInner — client root for /promotions.
 *
 * Layout sections (top to bottom):
 *  1. Hero banner + 4 sub-banners (mirrors HeroBanner on homepage)
 *  2. Flash Sale section (countdown + product carousel)
 *  3. Deals by category (line tab bar + per-category carousel)
 */
export function PromotionsPageInner({
  flashSale,
  dealGroups,
  categoryMeta,
}: PromotionsPageInnerProps) {
  const [activeCategory, setActiveCategory] = useState<DealCategory>(
    categoryMeta[0].value
  );

  const tabItems: TabItem[] = categoryMeta.map((meta) => ({
    value: meta.value,
    label: meta.label,
  }));

  return (
    <>
      {/* ── 1. Hero banners ───────────────────────────────────────────────── */}
      <section
        aria-label="Banner khuyến mãi"
        className="bg-secondary-50 py-4 max-w-[1400px] mx-auto flex items-center"
      >
        <div className="w-full 2xl:max-w-full px-4 sm:px-6 lg:px-8 2xl:px-0">
          <div className="flex flex-col gap-3">

            {/* Large hero banner */}
            <Link
              href={HERO_BANNER.href}
              className="group relative block w-full overflow-hidden rounded-xl aspect-[21/7] bg-secondary-200 shadow-sm"
            >
              <Image
                src={HERO_BANNER.src}
                alt={HERO_BANNER.alt}
                priority
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                quality={90}
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </Link>

            {/* 4 sub-banners */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SUB_BANNERS.map((banner) => (
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
                    quality={90}
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Flash Sale ─────────────────────────────────────────────────── */}
      <FlashSaleBanner flashSale={flashSale} />

      {/* ── 3. Deals by category ──────────────────────────────────────────── */}
      <section className="py-10 flex max-w-[1450px] mx-auto">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-xl font-bold text-secondary-900">
            Ưu đãi theo danh mục
          </h2>

          <Tabs
            tabs={tabItems}
            value={activeCategory}
            onChange={(v) => setActiveCategory(v as DealCategory)}
            variant="line"
          >
            {categoryMeta.map((meta) => {
              const group = dealGroups.find((g) => g.category === meta.value);
              return (
                <TabPanel key={meta.value} value={meta.value}>
                  {group && group.products.length > 0 ? (
                    <DealSection products={group.products} />
                  ) : (
                    <p className="py-12 text-center text-sm text-secondary-400">
                      Không có ưu đãi trong danh mục này.
                    </p>
                  )}
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      </section>
    </>
  );
}
