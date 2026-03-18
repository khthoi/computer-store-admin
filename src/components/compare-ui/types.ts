// ─── Category ─────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "laptop"
  | "pc"
  | "gpu"
  | "cpu"
  | "monitor"
  | "ram"
  | "storage";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  laptop:  "Laptop",
  pc:      "Máy tính bàn",
  gpu:     "Card đồ họa",
  cpu:     "Vi xử lý",
  monitor: "Màn hình",
  ram:     "RAM",
  storage: "Ổ lưu trữ",
};

// ─── Spec structures ──────────────────────────────────────────────────────────

export interface CompareSpecRow {
  key: string;
  label: string;
  /** productId → display value */
  values: Record<string, string>;
  /** Unit suffix shown after each value, e.g. "GB", "Hz", "W" */
  unit?: string;
  /**
   * When true, the cell with the highest numeric prefix is highlighted as
   * "best". When false, the lowest is best. When undefined, no winner shown.
   */
  higherIsBetter?: boolean;
}

export interface CompareSpecGroup {
  key: string;
  label: string;
  rows: CompareSpecRow[];
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface CompareProduct {
  id: string;
  name: string;
  brand: string;
  slug: string;
  category: ProductCategory;
  currentPrice: number;
  originalPrice: number;
  discountPct: number;
  thumbnailSrc: string;
  rating: number;
  reviewCount: number;
  specGroups: CompareSpecGroup[];
}

// ─── Drawer catalogue item ─────────────────────────────────────────────────────

/** A lightweight product entry shown in the add-product drawer. */
export interface CatalogueProduct {
  id: string;
  name: string;
  brand: string;
  slug: string;
  category: ProductCategory;
  currentPrice: number;
  originalPrice: number;
  thumbnailSrc: string;
  rating: number;
  reviewCount: number;
}
