"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  { src: "/image-slide/slide1.png", alt: "Banner khuyến mãi 1" },
  { src: "/image-slide/slide2.png", alt: "Banner khuyến mãi 2" },
  { src: "/image-slide/slide3.png", alt: "Banner khuyến mãi 3" },
];

const AUTO_PLAY_INTERVAL = 5000;

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Callbacks ──────────────────────────────────────────────────────────────

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Keep selectedIndex in sync with Embla
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // ── Auto-play ──────────────────────────────────────────────────────────────

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, AUTO_PLAY_INTERVAL);
  }, [emblaApi]);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoPlay();
    emblaApi.on("pointerDown", stopAutoPlay);
    emblaApi.on("pointerUp", startAutoPlay);
    return () => {
      stopAutoPlay();
      emblaApi.off("pointerDown", stopAutoPlay);
      emblaApi.off("pointerUp", startAutoPlay);
    };
  }, [emblaApi, startAutoPlay, stopAutoPlay]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      aria-label="Banner khuyến mãi"
      className="relative w-full overflow-hidden bg-secondary-900"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Viewport — Embla needs a single overflow:hidden wrapper */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {SLIDES.map((slide) => (
            <div
              key={slide.src}
              className="relative aspect-[6/2] w-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Arrow buttons ── */}
      <button
        type="button"
        aria-label="Ảnh trước"
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-secondary-800 shadow backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:h-10 sm:w-10"
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Ảnh tiếp theo"
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-secondary-800 shadow backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:h-10 sm:w-10"
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* ── Pagination dots ── */}
      <div
        aria-label="Chọn ảnh"
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ảnh ${i + 1}`}
            aria-current={i === selectedIndex}
            onClick={() => scrollTo(i)}
            className={[
              "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              i === selectedIndex
                ? "h-2.5 w-6 bg-white"
                : "h-2 w-2 bg-white/50 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
