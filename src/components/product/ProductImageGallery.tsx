"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryMedia {
  /** Unique key */
  key: string;
  /** Image or video source URL */
  src: string;
  alt: string;
  /** Thumbnail URL (falls back to src) */
  thumbnailSrc?: string;
  type?: "image" | "video";
}

export interface ProductImageGalleryProps {
  items: GalleryMedia[];
  /** Initial active index
   * @default 0
   */
  defaultIndex?: number;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FOCUSABLE =
  'button:not([disabled]),[tabindex]:not([tabindex="-1"])';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: GalleryMedia[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const item = items[activeIndex];

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  useEffect(() => {
    const els = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [];
    els[0]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft") onNavigate(clamp(activeIndex - 1, 0, items.length - 1));
      if (e.key === "ArrowRight") onNavigate(clamp(activeIndex + 1, 0, items.length - 1));
    },
    [activeIndex, items.length, onClose, onNavigate]
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/90 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close lightbox"
          onClick={onClose}
          className="absolute -right-4 -top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Media */}
        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            className="max-h-[80vh] max-w-full rounded-lg"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
          />
        )}

        {/* Prev */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              disabled={activeIndex === 0}
              onClick={() => onNavigate(activeIndex - 1)}
              className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              disabled={activeIndex === items.length - 1}
              onClick={() => onNavigate(activeIndex + 1)}
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Counter */}
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
          {activeIndex + 1} / {items.length}
        </p>
      </div>
    </div>,
    document.body
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProductImageGallery — main image + thumbnail strip with zoom on hover
 * and lightbox on click. Supports image and video media.
 *
 * ```tsx
 * <ProductImageGallery
 *   items={[
 *     { key: "front", src: "/images/product-front.jpg", alt: "Front view" },
 *     { key: "back",  src: "/images/product-back.jpg",  alt: "Back view" },
 *     { key: "video", src: "/videos/overview.mp4", alt: "Overview", type: "video" },
 *   ]}
 * />
 * ```
 */
export function ProductImageGallery({
  items,
  defaultIndex = 0,
  className = "",
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(
    clamp(defaultIndex, 0, items.length - 1)
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const activeItem = items[activeIndex];

  const handleThumbnailKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
      if (e.key === "ArrowRight") setActiveIndex(clamp(idx + 1, 0, items.length - 1));
      if (e.key === "ArrowLeft") setActiveIndex(clamp(idx - 1, 0, items.length - 1));
    },
    [items.length]
  );

  // Reset loaded state when active image changes
  useEffect(() => { setImgLoaded(false); }, [activeIndex]);

  return (
    <div className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}>
      {/* ── Main image ── */}
      <div
        className="group relative aspect-square overflow-hidden rounded-xl border border-secondary-200 bg-secondary-50 cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label={`Open ${activeItem.alt} in lightbox`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightboxOpen(true);
          }
        }}
      >
        {/* Skeleton shimmer while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-secondary-200" aria-hidden="true" />
        )}

        {activeItem.type === "video" ? (
          <div className="flex h-full w-full items-center justify-center">
            <video
              src={activeItem.src}
              className="h-full w-full object-contain"
              muted
              playsInline
              onLoadedData={() => setImgLoaded(true)}
            />
            <PlayIcon className="absolute w-12 h-12 text-white drop-shadow-lg" aria-hidden="true" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            onLoad={() => setImgLoaded(true)}
            className={[
              "h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-110",
              imgLoaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        )}

        {/* Zoom hint icon */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-secondary-500 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100"
        >
          <MagnifyingGlassPlusIcon className="w-4 h-4" />
        </span>
      </div>

      {/* ── Thumbnail strip ── */}
      {items.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={item.alt}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleThumbnailKeyDown(e, idx)}
                className={[
                  "relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-secondary-50 transition-all duration-150",
                  isActive
                    ? "border-primary-500 shadow-sm"
                    : "border-secondary-200 hover:border-secondary-400",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                ].join(" ")}
              >
                {item.type === "video" ? (
                  <>
                    <video src={item.src} className="h-full w-full object-cover" muted />
                    <PlayIcon
                      className="absolute w-5 h-5 text-white drop-shadow"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnailSrc ?? item.src}
                    alt=""
                    className="h-full w-full object-contain p-1"
                    loading="lazy"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox
          items={items}
          activeIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name          Type            Default  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * items         GalleryMedia[]  required Media items to display
 * defaultIndex  number          0        Initially selected item index
 * className     string          ""       Extra classes on root div
 *
 * ─── GalleryMedia ─────────────────────────────────────────────────────────────
 *
 * Name          Type              Required  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * key           string            yes       Unique identifier
 * src           string            yes       Full-size media URL
 * alt           string            yes       Alt / accessible label
 * thumbnailSrc  string            no        Thumbnail URL (falls back to src)
 * type          "image"|"video"   no        Media type (default "image")
 */
