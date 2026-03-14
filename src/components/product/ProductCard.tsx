"use client";

import { useCallback, useState } from "react";
import {
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { RatingStars } from "./RatingStars";
import { StockBadge, type StockStatus } from "./StockBadge";
import { PriceTag } from "./PriceTag";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  /** Product detail page URL */
  href: string;
  thumbnail: string;
  thumbnailAlt?: string;
  /** Current selling price (VND) */
  price: number;
  /** Original list price — shows strikethrough + discount badge */
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  stockStatus?: StockStatus;
  stockQuantity?: number;
  /** Show the product as wishlisted */
  isWishlisted?: boolean;
  onAddToCart?: (id: string) => void;
  onWishlistToggle?: (id: string, wishlisted: boolean) => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProductCard — thumbnail card used in product grids and search results.
 *
 * Features: hover image zoom, brand badge, rating stars, VND price with discount,
 * stock badge, add-to-cart button, wishlist heart toggle.
 *
 * ```tsx
 * <ProductCard
 *   id="cpu-i9"
 *   name="Intel Core i9-14900K"
 *   brand="Intel"
 *   href="/products/cpu-i9-14900k"
 *   thumbnail="/images/i9-14900k.jpg"
 *   price={12900000}
 *   originalPrice={15900000}
 *   rating={4.8}
 *   reviewCount={234}
 *   stockStatus="in-stock"
 *   onAddToCart={(id) => addToCart(id)}
 *   onWishlistToggle={(id, wishlisted) => toggleWishlist(id, wishlisted)}
 * />
 * ```
 */
export function ProductCard({
  id,
  name,
  brand,
  href,
  thumbnail,
  thumbnailAlt,
  price,
  originalPrice,
  rating,
  reviewCount,
  stockStatus = "in-stock",
  stockQuantity,
  isWishlisted = false,
  onAddToCart,
  onWishlistToggle,
  className = "",
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const [cartAdded, setCartAdded] = useState(false);

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = !wishlisted;
      setWishlisted(next);
      onWishlistToggle?.(id, next);
    },
    [id, wishlisted, onWishlistToggle]
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (stockStatus === "out-of-stock") return;
      onAddToCart?.(id);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 1500);
    },
    [id, stockStatus, onAddToCart]
  );

  const isOutOfStock = stockStatus === "out-of-stock";

  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-xl border border-secondary-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Image area ── */}
      <a
        href={href}
        aria-label={name}
        className="relative block aspect-square overflow-hidden bg-secondary-50"
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={thumbnailAlt ?? name}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist button — overlay */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={handleWishlist}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-secondary-400 shadow-sm backdrop-blur-sm transition-all duration-150 hover:bg-white hover:text-error-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {wishlisted ? (
            <HeartSolidIcon className="w-4 h-4 text-error-500" aria-hidden="true" />
          ) : (
            <HeartIcon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </a>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand badge */}
        <span className="inline-flex w-fit items-center rounded bg-secondary-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-600">
          {brand}
        </span>

        {/* Product name */}
        <a
          href={href}
          className="line-clamp-2 text-sm font-medium text-secondary-900 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
        >
          {name}
        </a>

        {/* Rating */}
        {rating !== undefined && (
          <RatingStars value={rating} count={reviewCount} size="sm" />
        )}

        {/* Price */}
        <PriceTag
          currentPrice={price}
          originalPrice={originalPrice}
          size="sm"
          className="mt-auto"
        />

        {/* Stock badge */}
        <StockBadge status={stockStatus} quantity={stockQuantity} size="sm" />

        {/* Add to cart */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
          className={[
            "mt-1 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150",
            isOutOfStock
              ? "cursor-not-allowed bg-secondary-100 text-secondary-400"
              : cartAdded
              ? "bg-success-600 text-white"
              : "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
          ].join(" ")}
        >
          <ShoppingCartIcon className="w-4 h-4" aria-hidden="true" />
          {isOutOfStock ? "Out of Stock" : cartAdded ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name               Type                                  Default      Description
 * ──────────────────────────────────────────────────────────────────────────────
 * id                 string                                required     Product identifier
 * name               string                                required     Product name
 * brand              string                                required     Brand label
 * href               string                                required     Detail page URL
 * thumbnail          string                                required     Image src
 * thumbnailAlt       string                                —            Image alt text
 * price              number                                required     Current price (VND)
 * originalPrice      number                                —            List price for discount
 * rating             number (0–5)                          —            Average rating
 * reviewCount        number                                —            Total review count
 * stockStatus        "in-stock"|"low-stock"|"out-of-stock" "in-stock"   Availability
 * stockQuantity      number                                —            Quantity for low-stock
 * isWishlisted       boolean                               false        Initial wishlist state
 * onAddToCart        (id: string) => void                  —            Cart button handler
 * onWishlistToggle   (id: string, wishlisted: boolean)=>void —          Wishlist toggle handler
 * className          string                                ""           Extra classes on <article>
 */
