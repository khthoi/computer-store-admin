"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BoltIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/src/components/ui/Button";
import { Alert } from "@/src/components/ui/Alert";
import { VariantSelector } from "@/src/components/product/VariantSelector";
import { PriceTag } from "@/src/components/product/PriceTag";
import { QuantityStepper } from "@/src/components/product/QuantityStepper";
import { WishlistShareBar } from "@/src/components/product/WishlistShareBar";
import { TrustBadgesRow } from "@/src/components/product/TrustBadgesRow";
import { StickyAddToCartBar } from "@/src/components/product/StickyAddToCartBar";
import { formatVND } from "@/src/lib/format";
import type { ProductDetail, VariantGroup } from "@/src/components/product/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductHeroClientProps {
  product: ProductDetail;
  /** Slot: the rating stars button rendered in the right column */
  ratingSlot: ReactNode;
  thumbnailSrc: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computePrice(
  basePrice: number,
  variantGroups: VariantGroup[],
  selectedVariants: Record<string, string>
): number {
  let total = basePrice;
  for (const group of variantGroups) {
    const selectedValue = selectedVariants[group.key];
    if (!selectedValue) continue;
    const opt = group.options.find((o) => o.value === selectedValue);
    if (opt && typeof opt.priceDelta === "number") {
      total += opt.priceDelta;
    }
  }
  return total;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductHeroClient({
  product,
  ratingSlot,
  thumbnailSrc,
}: ProductHeroClientProps) {
  // Build default selections (first in-stock option per group)
  const buildDefaults = () => {
    const defaults: Record<string, string> = {};
    for (const group of product.variantGroups) {
      const firstInStock = group.options.find((o) => o.stock > 0);
      if (firstInStock) defaults[group.key] = firstInStock.value;
    }
    return defaults;
  };

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(buildDefaults);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartToast, setCartToast] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isOutOfStock = product.stockStatus === "out-of-stock";

  // Compute live price based on selected variants
  const computedPrice = computePrice(
    product.currentPrice,
    product.variantGroups,
    selectedVariants
  );

  const handleVariantChange = useCallback(
    (groupKey: string, value: string) => {
      setSelectedVariants((prev) => ({ ...prev, [groupKey]: value }));
    },
    []
  );

  const handleAddToCart = useCallback(async () => {
    if (isOutOfStock || isAddingToCart) return;
    setIsAddingToCart(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsAddingToCart(false);
    setCartToast(true);
    setTimeout(() => setCartToast(false), 3000);
  }, [isOutOfStock, isAddingToCart]);

  const handleBuyNow = useCallback(async () => {
    if (isOutOfStock) return;
    await handleAddToCart();
    // In a real app: redirect to checkout
  }, [isOutOfStock, handleAddToCart]);

  return (
    <>
      {/* ── Right column content ── */}
      <div className="flex flex-col gap-4">

        {/* Brand */}
        <a
          href={`/products?brand=${encodeURIComponent(product.brand)}`}
          className="inline-flex w-fit items-center rounded bg-secondary-100 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-600 hover:bg-secondary-200 transition-colors"
        >
          {product.brand}
        </a>

        {/* Product name */}
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 leading-tight">
          {product.name}
        </h1>

        {/* SKU + Rating row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-secondary-400 font-mono">
            SKU: {product.sku}
          </span>
          <span className="text-secondary-200" aria-hidden="true">|</span>
          {ratingSlot}
        </div>

        {/* Price */}
        <PriceTag
          currentPrice={computedPrice}
          originalPrice={
            computedPrice !== product.currentPrice
              ? undefined
              : product.originalPrice
          }
          discountPct={
            computedPrice !== product.currentPrice
              ? undefined
              : product.discountPct
          }
          showInstallment={!isOutOfStock}
          installmentMonths={12}
          size="lg"
        />

        {/* Stock badge rendered from server via slot — passed as prop in ProductHeroSection */}

        {/* Variant selectors */}
        {product.variantGroups.map((group) => (
          <VariantSelector
            key={group.key}
            label={group.label}
            type={group.type}
            options={group.options.map((opt) => ({
              value: opt.value,
              label: opt.label,
              stock: opt.stock,
              color: opt.color,
              priceDelta:
                typeof opt.priceDelta === "number" && opt.priceDelta > 0
                  ? `+${formatVND(opt.priceDelta)}`
                  : undefined,
            }))}
            value={selectedVariants[group.key]}
            onChange={(val) => handleVariantChange(group.key, val)}
          />
        ))}

        {/* Quantity stepper */}
        {!isOutOfStock && (
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={product.stockQuantity}
            disabled={isOutOfStock}
          />
        )}

        {/* Out of stock alert */}
        {isOutOfStock && (
          <Alert variant="warning">
            Sản phẩm tạm hết hàng. Đăng ký nhận thông báo khi có hàng.
          </Alert>
        )}

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col gap-3">
          <Button
            variant="danger"
            size="lg"
            fullWidth
            leftIcon={<BoltIcon className="w-5 h-5" />}
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className="active:scale-[0.98]"
          >
            Mua ngay
          </Button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
            disabled={isOutOfStock}
            isLoading={isAddingToCart}
            onClick={handleAddToCart}
            className="active:scale-[0.98]"
          >
            Thêm vào giỏ hàng
          </Button>
        </div>

        {/* Wishlist + Compare + Share */}
        <div className="flex items-center flex-wrap gap-1">
          <WishlistShareBar
            productId={product.id}
            productName={product.name}
          />
          {/* Compare toggle */}
          <div className="relative group/compare">
            <button
              type="button"
              aria-label="So sánh sản phẩm"
              aria-pressed={isCompared}
              onClick={() => setIsCompared((p) => !p)}
              className={[
                "flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                isCompared
                  ? "text-primary-600 bg-primary-50 hover:bg-primary-100"
                  : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-100",
              ].join(" ")}
            >
              <ArrowsRightLeftIcon className="w-5 h-5" aria-hidden="true" />
              So sánh
            </button>
            {/* Tooltip */}
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-secondary-900 px-2 py-1 text-xs text-white opacity-0 group-hover/compare:opacity-100 transition-opacity z-20">
              {isCompared ? "Đang so sánh" : "Thêm vào so sánh"}
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <TrustBadgesRow />
      </div>

      {/* Sticky add-to-cart bar (portals to fixed position) */}
      <StickyAddToCartBar
        productName={product.name}
        currentPrice={computedPrice}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt={product.name}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isAddingToCart={isAddingToCart}
        ctaRef={ctaRef}
      />

      {/* Cart success toast */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-success-600 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <CheckCircleIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
            Đã thêm vào giỏ hàng!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
