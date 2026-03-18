"use client";

import { useMemo, useRef, useState } from "react";
import {
  CheckIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { Drawer } from "@/src/components/ui/Drawer";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";
import { formatVND } from "@/src/lib/format";
import { useCompare } from "@/src/store/compare.store";
import {
  CATEGORY_LABELS,
  type CatalogueProduct,
} from "@/src/components/compare-ui/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CompareProductDrawerProps {
  /** Full catalogue shown in the drawer — passed from the page */
  catalogue: CatalogueProduct[];
  /** Element to scroll into view when "Xem so sánh" is clicked */
  tableRef?: React.RefObject<HTMLElement | null>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BRANDS = ["Tất cả", "Dell", "Apple", "Asus", "MSI", "HP", "Lenovo", "Acer"];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CompareProductDrawer — right-side drawer for adding products to the
 * comparison list. Opens/closes via the CompareContext.
 */
export function CompareProductDrawer({
  catalogue,
  tableRef,
}: CompareProductDrawerProps) {
  const { state, addProduct, removeProduct, closeDrawer } = useCompare();
  const { isDrawerOpen, compareList, activeCategory } = state;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCatalogue = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const minVal = minPrice ? parseInt(minPrice, 10) : null;
    const maxVal = maxPrice ? parseInt(maxPrice, 10) : null;

    return catalogue.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q))
        return false;
      if (selectedBrand !== "Tất cả" && p.brand !== selectedBrand)
        return false;
      if (minVal !== null && p.currentPrice < minVal * 1_000_000) return false;
      if (maxVal !== null && p.currentPrice > maxVal * 1_000_000) return false;
      return true;
    });
  }, [catalogue, searchQuery, selectedBrand, minPrice, maxPrice]);

  const handleViewCompare = () => {
    closeDrawer();
    setTimeout(() => {
      if (tableRef?.current) {
        const top = tableRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  const footer = (
    <Button
      variant="primary"
      size="md"
      fullWidth
      disabled={compareList.length < 2}
      onClick={handleViewCompare}
    >
      Xem so sánh ({compareList.length}/4)
    </Button>
  );

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      position="left"
      size="xl"
      title="Chọn sản phẩm để so sánh"
      footer={footer}
    >
      {/* ── Drawer inner content (wider than xl Drawer's w-[30rem]) ── */}
      <div className="flex flex-col gap-4">
        {/* Category lock indicator */}
        {activeCategory && (
          <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2">
            <span className="text-xs text-primary-700">
              Đang lọc:{" "}
              <strong>{CATEGORY_LABELS[activeCategory]}</strong>
            </span>
            <button
              type="button"
              aria-label="Bỏ lọc theo loại sản phẩm"
              onClick={() => {
                /* clearing category requires clearing the whole list */
              }}
              className="ml-auto flex h-5 w-5 items-center justify-center rounded-full text-primary-500 hover:bg-primary-100"
            >
              <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Selected count */}
        <p className="text-sm text-secondary-500">
          Đã chọn:{" "}
          <strong className="text-secondary-800">{compareList.length}</strong>
          /4 sản phẩm
        </p>

        {/* Search */}
        <Input
          placeholder="Tìm theo tên hoặc thương hiệu…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefixIcon={<MagnifyingGlassIcon />}
          size="sm"
        />

        {/* Brand pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setSelectedBrand(brand)}
              className={[
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                selectedBrand === brand
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-secondary-200 bg-white text-secondary-600 hover:border-primary-300 hover:text-primary-600",
              ].join(" ")}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Price range */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Từ (triệu ₫)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            size="sm"
          />
          <span className="shrink-0 text-secondary-400">–</span>
          <Input
            type="number"
            placeholder="Đến (triệu ₫)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            size="sm"
          />
        </div>

        {/* Product list */}
        <div className="flex flex-col gap-1 overflow-y-auto">
          {filteredCatalogue.length === 0 ? (
            <div className="py-12 text-center text-sm text-secondary-400">
              Không tìm thấy sản phẩm
            </div>
          ) : (
            filteredCatalogue.map((p) => (
              <DrawerProductItem
                key={p.id}
                product={p}
                isAdded={compareList.some((c) => c.id === p.id)}
                isIncompatible={
                  activeCategory !== null && p.category !== activeCategory
                }
                onAdd={() =>
                  addProduct({
                    ...p,
                    originalPrice: p.originalPrice,
                    discountPct: 0,
                    specGroups: [],
                  })
                }
                onRemove={() => removeProduct(p.id)}
              />
            ))
          )}
        </div>
      </div>
    </Drawer>
  );
}

// ─── Drawer product item ───────────────────────────────────────────────────────

interface DrawerProductItemProps {
  product: CatalogueProduct;
  isAdded: boolean;
  isIncompatible: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

function DrawerProductItem({
  product,
  isAdded,
  isIncompatible,
  onAdd,
  onRemove,
}: DrawerProductItemProps) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl border p-3 transition-colors",
        isIncompatible
          ? "cursor-not-allowed opacity-50 border-secondary-100 bg-secondary-50"
          : isAdded
          ? "border-primary-200 bg-primary-50"
          : "border-secondary-200 bg-white hover:border-secondary-300 hover:bg-secondary-50",
      ].join(" ")}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.thumbnailSrc}
        alt={product.name}
        className="h-12 w-12 shrink-0 rounded-lg bg-secondary-50 object-contain p-0.5"
        loading="lazy"
        decoding="async"
      />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs font-medium text-secondary-800">
          {product.name}
        </p>
        <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
          <Badge variant="default" size="sm">
            {product.brand}
          </Badge>
          <Badge variant="info" size="sm">
            {CATEGORY_LABELS[product.category]}
          </Badge>
        </div>
        <p className="mt-1 text-sm font-semibold text-primary-700">
          {formatVND(product.currentPrice)}
        </p>
      </div>

      {/* Action button */}
      <div className="relative shrink-0">
        {isIncompatible ? (
          <div className="group relative">
            <Button variant="secondary" size="sm" disabled>
              Không cùng loại
            </Button>
          </div>
        ) : isAdded ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onRemove}
            leftIcon={<CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          >
            Đã chọn
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            leftIcon={<PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          >
            Thêm
          </Button>
        )}
      </div>
    </div>
  );
}
