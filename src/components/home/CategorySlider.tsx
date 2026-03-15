"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// ─── Category data ─────────────────────────────────────────────────────────────

interface Category {
  label: string;
  href: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { label: "CPU Intel",    href: "/products/cpu-intel",    icon: "/icons/cpu-intel.png" },
  { label: "CPU AMD",      href: "/products/cpu-amd",      icon: "/icons/cpu-amd.jpg"   },
  { label: "GPU NVIDIA",   href: "/products/gpu-nvidia",   icon: "/icons/nvidia.png"    },
  { label: "GPU AMD",      href: "/products/gpu-amd",      icon: "/icons/amd.png"       },
  { label: "RAM",          href: "/products/ram",          icon: "/icons/ram-pc.jpg"    },
  { label: "SSD NVMe",     href: "/products/ssd-nvme",     icon: "/icons/ssd-nvme.jpg"  },
  { label: "SSD SATA",     href: "/products/ssd-sata",     icon: "/icons/ssd-sata.jpg"  },
  { label: "HDD",          href: "/products/hdd",          icon: "/icons/hdd.jpg"       },
  { label: "Bàn phím",     href: "/products/ban-phim",     icon: "/icons/keyboard.jpg"  },
  { label: "Chuột",        href: "/products/chuot",        icon: "/icons/mouse.png"     },
  { label: "Màn hình",     href: "/products/man-hinh",     icon: "/icons/monitor.jpg"   },
];

// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * CategorySlider — horizontal carousel of product categories.
 *
 * Visible items per breakpoint (controlled via CSS flex-basis):
 *   Mobile  → 3   (basis-[calc(100%/3)])
 *   Tablet  → 5   (sm:basis-[calc(100%/5)])
 *   Desktop → 8   (lg:basis-[calc(100%/8)])
 *
 * Embla handles touch-swipe and arrow navigation.
 * slidesToScroll: 1 — advances one item at a time (per spec).
 */
export function CategorySlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    // With loop: true these are always true, but we track them for future
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section aria-labelledby="quick-cat-heading" className="py-6 bg-white border-b border-secondary-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header row ── */}
        <div className="mb-4 flex items-center justify-between">
          <h2 id="quick-cat-heading" className="text-lg font-bold text-secondary-900">
            Danh mục nổi bật
          </h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Danh mục trước"
              onClick={scrollPrev}
              disabled={!canScrollPrev && false}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary-200 bg-white text-secondary-600 transition hover:border-primary-300 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-40"
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Danh mục tiếp theo"
              onClick={scrollNext}
              disabled={!canScrollNext && false}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary-200 bg-white text-secondary-600 transition hover:border-primary-300 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-40"
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Carousel viewport ── */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y gap-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.href}
                /*
                 * flex-basis controls how many items are visible:
                 *   mobile  → 3 items  (100% / 3 ≈ 33.33%)
                 *   tablet  → 5 items  (100% / 5 = 20%)
                 *   desktop → 8 items  (100% / 8 = 12.5%)
                 *
                 * gap-3 (12px) is subtracted via calc to prevent overflow.
                 */
                className="min-w-0 shrink-0 grow-0 basis-[calc(100%/3-10px)] sm:basis-[calc(100%/5-10px)] lg:basis-[calc(100%/8-11px)]"
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl p-3 text-center transition-all duration-200 hover:bg-black/5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  {/* Icon container — fixed square */}
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-lg bg-secondary-50 shrink-0">
                    <Image
                      src={cat.icon}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] sm:text-xs font-semibold leading-tight text-secondary-700 group-hover:text-primary-700 transition-colors">
                    {cat.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
