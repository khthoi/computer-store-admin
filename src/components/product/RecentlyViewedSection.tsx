"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/src/components/product/ProductCard";
import type { ProductCardProps } from "@/src/components/product/ProductCard";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RecentlyViewedSectionProps {
  currentProductId: string;
  /** Full catalog of products to look up viewed IDs against */
  allProducts: ProductCardProps[];
}

const STORAGE_KEY = "recently_viewed";
const MAX_STORED = 4;

// ─── Component ────────────────────────────────────────────────────────────────

export function RecentlyViewedSection({
  currentProductId,
  allProducts,
}: RecentlyViewedSectionProps) {
  const [viewedProducts, setViewedProducts] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    // 1. Read existing list
    let stored: string[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as string[];
    } catch {
      stored = [];
    }

    // 2. Push current product to front, deduplicate, limit
    const updated = [
      currentProductId,
      ...stored.filter((id) => id !== currentProductId),
    ].slice(0, MAX_STORED);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 3. Display previous 4 (excluding current)
    const previousIds = updated
      .filter((id) => id !== currentProductId)
      .slice(0, 4);

    const products = previousIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is ProductCardProps => p !== undefined);

    setViewedProducts(products);
  }, [currentProductId, allProducts]);

  // Hide section when fewer than 2 items
  if (viewedProducts.length < 2) return null;

  return (
    <section className="py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-secondary-900 mb-5">
          Sản phẩm đã xem
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {viewedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
