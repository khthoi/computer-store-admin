"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import {
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon,
  FunnelIcon,
  InboxIcon,
  ShoppingCartIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import {
  Badge,
  Button,
  Drawer,
  Select,
  Slider,
  Toggle,
} from "@/src/components/ui";
import { Breadcrumb, Pagination } from "@/src/components/navigation";
import {
  ProductCardList,
  CompareBar,
  type CompareProduct,
} from "@/src/components/product";

import {
  CATEGORY_CONFIGS,
  DEFAULT_CATEGORY,
  SORT_OPTIONS,
  type CategoryConfig,
  type FilterDefinition,
  type FilterState,
  type FilterValue,
} from "./_config";
import { CPU_INTEL_PRODUCTS } from "./_mock-data";

// ─── Configurable Items Per Row ─────────────────────────────────────────────
// Change this constant to adjust product columns — no UI needed.
// Accepted values: 3 | 4 | 5 | 6  (ProductCardList handles responsive breakpoints)

const ITEMS_PER_ROW = 6 as const;

// ─── Constants ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatVND(value: number): string {
  return value.toLocaleString("vi-VN") + "₫";
}

/** Check if a filter value is "active" (non-default) */
function isFilterActive(value: FilterValue | undefined): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return true;
  if (typeof value === "string") return value !== "";
  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    if (typeof value[0] === "number") return true;
    return value.length > 0;
  }
  return false;
}

/** Build active filter chips from the current filter state */
function buildActiveFilters(
  state: FilterState,
  definitions: FilterDefinition[]
): { key: string; label: string; group: string }[] {
  const chips: { key: string; label: string; group: string }[] = [];

  for (const def of definitions) {
    const val = state[def.key];
    if (!isFilterActive(val)) continue;

    switch (def.type) {
      case "dropdown": {
        // Stored as string[] (multi-select). Emit one chip per selected value.
        const arr = Array.isArray(val) ? (val as string[]) : val ? [val as string] : [];
        for (const v of arr) {
          const opt = def.options?.find((o) => o.value === v);
          if (opt) chips.push({ key: `${def.key}:${v}`, label: opt.label, group: def.label });
        }
        break;
      }
      case "checkbox": {
        const arr = val as string[];
        for (const v of arr) {
          const opt = def.options?.find((o) => o.value === v);
          if (opt)
            chips.push({
              key: `${def.key}:${v}`,
              label: opt.label,
              group: def.label,
            });
        }
        break;
      }
      case "range": {
        const [min, max] = val as [number, number];
        const label =
          def.unit === "₫"
            ? `${formatVND(min)} – ${formatVND(max)}`
            : `${min} – ${max} ${def.unit ?? ""}`;
        chips.push({ key: def.key, label, group: def.label });
        break;
      }
      case "toggle":
        chips.push({ key: def.key, label: def.label, group: "" });
        break;
      case "rating":
        chips.push({
          key: def.key,
          label: `${val}★ trở lên`,
          group: def.label,
        });
        break;
    }
  }
  return chips;
}

// ─── Sub-category Slider ─────────────────────────────────────────────────────

function SubCategorySlider({
  categories,
  activeId,
  onSelect,
}: {
  categories: CategoryConfig["subCategories"];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {categories.map((cat) => {
        const active = cat.id === activeId;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={[
              "flex flex-col items-center gap-2 rounded-xl border px-4 py-3 text-center transition-all duration-200 shrink-0 min-w-[100px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
              active
                ? "border-primary-300 bg-primary-50 shadow-sm"
                : "border-secondary-200 bg-white hover:border-primary-200 hover:bg-primary-50/50",
            ].join(" ")}
          >
            {cat.image && (
              <div className="relative h-14 w-14">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
            )}
            <span
              className={[
                "text-xs font-medium leading-tight",
                active ? "text-primary-700" : "text-secondary-700",
              ].join(" ")}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Horizontal Filter Bar ──────────────────────────────────────────────────

function HorizontalFilterBar({
  config,
  filters,
  onChange,
}: {
  config: CategoryConfig;
  filters: FilterState;
  onChange: (key: string, value: FilterValue | undefined) => void;
}) {
  return (
    <div className="rounded-xl border border-secondary-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-secondary-100">
        <FunnelIcon className="w-4 h-4 text-secondary-500" />
        <span className="text-sm font-semibold text-secondary-800">
          Bộ lọc tìm kiếm
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {config.filters.map((def) => (
          <HorizontalFilterItem
            key={def.key}
            def={def}
            value={filters[def.key]}
            onChange={(v) => onChange(def.key, v)}
          />
        ))}
      </div>
    </div>
  );
}

function HorizontalFilterItem({
  def,
  value,
  onChange,
}: {
  def: FilterDefinition;
  value: FilterValue | undefined;
  onChange: (v: FilterValue | undefined) => void;
}) {
  switch (def.type) {
    case "dropdown":
      return (
        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-secondary-600">
            {def.label}
          </label>
          <Select
            options={def.options ?? []}
            value={(value as string[]) ?? []}
            onChange={(v) => {
              const arr = v as string[];
              onChange(arr.length > 0 ? arr : undefined);
            }}
            multiple
            clearable
            showSelectedInTrigger={false}
            placeholder="Tất cả"
            size="sm"
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-secondary-600">
            {def.label}
          </label>
          <Select
            options={def.options ?? []}
            value={(value as string[]) ?? []}
            onChange={(v) => {
              const arr = v as string[];
              onChange(arr.length > 0 ? arr : undefined);
            }}
            placeholder="Tất cả"
            multiple
            clearable
            showSelectedInTrigger={false}
            size="sm"
          />
        </div>
      );

    case "range":
      return (
        <div className="min-w-0 col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1">
          <label className="mb-1 block text-xs font-medium text-secondary-600">
            {def.label}
          </label>
          <div className="space-y-1">
            <Slider
              min={def.min ?? 0}
              max={def.max ?? 100}
              step={def.step ?? 1}
              value={(value as [number, number]) ?? [def.min ?? 0, def.max ?? 100]}
              onChange={(v: number | [number, number]) => onChange(v as [number, number])}
              range
              size="sm"
              unit={def.unit}
              formatValue={
                def.unit === "₫"
                  ? (v: number) => formatVND(v)
                  : def.unit
                    ? (v: number) => `${v} ${def.unit}`
                    : undefined
              }
              showTooltip
            />
            <div className="flex justify-between text-[10px] text-secondary-400">
              <span>
                {def.unit === "₫"
                  ? formatVND(def.min ?? 0)
                  : `${def.min ?? 0} ${def.unit ?? ""}`}
              </span>
              <span>
                {def.unit === "₫"
                  ? formatVND(def.max ?? 100)
                  : `${def.max ?? 100} ${def.unit ?? ""}`}
              </span>
            </div>
          </div>
        </div>
      );

    case "toggle":
      return (
        <div className="flex items-end min-w-0 my-auto">
          <Toggle
            label={def.label}
            checked={(value as boolean) ?? false}
            onChange={(e) => onChange(e.target.checked || undefined)}
            size="sm"
            description={def.description}
          />
        </div>
      );

    case "rating":
      return (
        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-secondary-600">
            {def.label}
          </label>
          <Select
            options={[
              { value: "5", label: "5 sao" },
              { value: "4", label: "Từ 4 sao" },
              { value: "3", label: "Từ 3 sao" },
              { value: "2", label: "Từ 2 sao" },
              { value: "1", label: "Từ 1 sao" },
            ]}
            value={value !== undefined ? String(value) : ""}
            onChange={(v) => {
              const str = v as string;
              onChange(str ? Number(str) : undefined);
            }}
            placeholder="Tất cả"
            clearable
            size="sm"
          />
        </div>
      );

    default:
      return null;
  }
}

// ─── Active Filters Panel ───────────────────────────────────────────────────

function ActiveFiltersPanel({
  chips,
  onRemove,
  onClearAll,
  onApply,
}: {
  chips: { key: string; label: string; group: string }[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}) {
  if (chips.length === 0) return null;

  return (
    <div className="rounded-xl border border-secondary-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4 flex-wrap">
        {/* Chips */}
        <div className="flex flex-1 items-center gap-2 flex-wrap min-w-0">
          <span className="text-xs font-medium text-secondary-500 shrink-0">
            Đang lọc:
          </span>
          {chips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
            >
              {chip.group && (
                <span className="text-primary-400">{chip.group}:</span>
              )}
              {chip.label}
              <button
                type="button"
                onClick={() => onRemove(chip.key)}
                className="ml-0.5 rounded-full p-0.5 text-primary-400 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                aria-label={`Xóa bộ lọc ${chip.label}`}
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearAll}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          >
            Xóa tất cả
          </Button>
          <Button size="sm" onClick={onApply}>
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Filter Sidebar Content (Accordion) ─────────────────────────────

function MobileFilterContent({
  config,
  filters,
  onChange,
  onClear,
}: {
  config: CategoryConfig;
  filters: FilterState;
  onChange: (key: string, value: FilterValue | undefined) => void;
  onClear: () => void;
}) {
  const hasActive = config.filters.some((d) => isFilterActive(filters[d.key]));

  return (
    <div className="space-y-4">
      {hasActive && (
        <Button
          size="sm"
          variant="ghost"
          onClick={onClear}
          className="w-full text-error-600 hover:text-error-700 hover:bg-error-50"
        >
          <XMarkIcon className="w-4 h-4 mr-1" />
          Xóa tất cả bộ lọc
        </Button>
      )}

      <div className="space-y-4">
        {config.filters.map((def) => (
          <div key={def.key} className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-secondary-800">
              {def.label}
              {isFilterActive(filters[def.key]) && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              )}
            </div>
            <HorizontalFilterItem
              def={def}
              value={filters[def.key]}
              onChange={(v) => onChange(def.key, v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Product List View Card ──────────────────────────────────────────────────

function ProductListCard({
  product,
}: {
  product: (typeof CPU_INTEL_PRODUCTS)[number];
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-secondary-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-32 w-32 shrink-0 rounded-lg bg-secondary-50">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="128px"
          className="object-contain p-2"
        />
        {product.badge && (
          <Badge
            variant={
              product.badge === "Hot"
                ? "error"
                : product.badge === "New"
                  ? "info"
                  : "warning"
            }
            size="sm"
            className="absolute top-1 left-1"
          >
            {product.badge}
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          {product.rating && (
            <span className="flex items-center gap-0.5 text-xs text-warning-600">
              <StarIcon className="w-3 h-3" />
              {product.rating}
            </span>
          )}
          {product.reviewCount && (
            <span className="text-xs text-secondary-400">
              ({product.reviewCount})
            </span>
          )}
          {product.productCode && (
            <Badge variant="default" size="sm">
              Mã: {product.productCode}
            </Badge>
          )}
        </div>

        <h3 className="text-sm font-semibold text-secondary-900 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-secondary-500 line-clamp-1">
          Thương hiệu: {product.brand} | Socket: LGA 1700
        </p>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-base font-bold text-primary-600">
            {formatVND(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-secondary-400 line-through">
                {formatVND(product.originalPrice)}
              </span>
              <Badge variant="error" size="sm">
                -
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                %
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col items-end justify-between">
        <Badge
          variant={
            product.stockStatus === "in-stock"
              ? "success"
              : product.stockStatus === "low-stock"
                ? "warning"
                : "error"
          }
          size="sm"
          dot
        >
          {product.stockStatus === "in-stock"
            ? "Sẵn hàng"
            : product.stockStatus === "low-stock"
              ? `Còn ${product.stockQuantity}`
              : "Hết hàng"}
        </Badge>
        <div className="flex gap-2 mt-4">
          <Button size="sm">
            <ShoppingCartIcon className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger">
            <HeartIcon className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline">
            <ArrowsRightLeftIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100 mb-4">
        <InboxIcon className="w-10 h-10 text-secondary-400" />
      </div>
      <h3 className="text-lg font-semibold text-secondary-800 mb-1">
        Không tìm thấy sản phẩm
      </h3>
      <p className="text-sm text-secondary-500 mb-4 max-w-sm">
        Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử thay đổi
        hoặc xóa bộ lọc.
      </p>
      <Button variant="outline" onClick={onClear}>
        <XMarkIcon className="w-4 h-4 mr-1.5" />
        Xóa tất cả bộ lọc
      </Button>
    </div>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ProductCategoryDemoPage() {
  // ── State ──
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORY);
  const [activeSubCategory, setActiveSubCategory] = useState("all");
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState("bestselling");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [compareList, setCompareList] = useState<CompareProduct[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const config = CATEGORY_CONFIGS[activeCategoryId];

  // ── Category switcher (tabs at top for demo) ──
  const categoryKeys = Object.keys(CATEGORY_CONFIGS);

  // ── Filter handlers ──
  const handleFilterChange = useCallback(
    (key: string, value: FilterValue | undefined) => {
      setFilters((prev) => {
        const next = { ...prev };
        if (value === undefined) delete next[key];
        else next[key] = value;
        return next;
      });
      setPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const handleRemoveChip = useCallback(
    (chipKey: string) => {
      const [filterKey, optionValue] = chipKey.split(":");
      if (optionValue) {
        setFilters((prev) => {
          const arr = (prev[filterKey] as string[]) ?? [];
          const next = arr.filter((v) => v !== optionValue);
          const updated = { ...prev };
          if (next.length > 0) updated[filterKey] = next;
          else delete updated[filterKey];
          return updated;
        });
      } else {
        setFilters((prev) => {
          const next = { ...prev };
          delete next[filterKey];
          return next;
        });
      }
      setPage(1);
    },
    []
  );

  const handleApplyFilters = useCallback(() => {
    // In a real app, this would trigger an API call with current filters
    // For demo, just reset pagination
    setPage(1);
  }, []);

  // ── Compare handlers ──
  const handleCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === id)) return prev.filter((p) => p.id !== id);
      if (prev.length >= 3) return prev;
      const product = CPU_INTEL_PRODUCTS.find((p) => p.id === id);
      if (!product) return prev;
      return [...prev, { id, name: product.name, thumbnail: product.thumbnail, price: product.price }];
    });
  }, []);

  // ── Derived data ──
  const activeFilters = useMemo(
    () => buildActiveFilters(filters, config.filters),
    [filters, config.filters]
  );

  // Simulate filtering (in real app this goes to API)
  const filteredProducts = useMemo(() => {
    return CPU_INTEL_PRODUCTS;
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="py-6 space-y-5">
        {/* ── Category switcher (demo only) ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-secondary-500 mr-1">
            Demo danh mục:
          </span>
          {categoryKeys.map((key) => (
            <Button
              key={key}
              size="sm"
              variant={key === activeCategoryId ? "primary" : "outline"}
              onClick={() => {
                setActiveCategoryId(key);
                setActiveSubCategory("all");
                setFilters({});
                setPage(1);
              }}
            >
              {CATEGORY_CONFIGS[key].name}
            </Button>
          ))}
        </div>

        {/* ── Breadcrumb ── */}
        <Breadcrumb showHome items={config.breadcrumb} />

        {/* ── Title ── */}
        <h1 className="text-2xl font-bold text-secondary-900">{config.name}</h1>

        {/* ── Sub-category slider ── */}
        <SubCategorySlider
          categories={config.subCategories}
          activeId={activeSubCategory}
          onSelect={setActiveSubCategory}
        />

        {/* ── Description ── */}
        {config.description && (
          <p className="text-sm text-secondary-600">{config.description}</p>
        )}

        {/* ── Horizontal filter bar (below sub-categories) ── */}
        <div className="hidden lg:block">
          <HorizontalFilterBar
            config={config}
            filters={filters}
            onChange={handleFilterChange}
          />
        </div>

        {/* ── Active filter chips + Apply / Clear ── */}
        <ActiveFiltersPanel
          chips={activeFilters}
          onRemove={handleRemoveChip}
          onClearAll={handleClearFilters}
          onApply={handleApplyFilters}
        />

        {/* ── Sort & View toolbar ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4 mr-1.5" />
              Bộ lọc
              {activeFilters.length > 0 && (
                <Badge variant="primary" size="sm" className="ml-1.5">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>

            <span className="text-sm text-secondary-500">
              <span className="font-semibold text-secondary-800">
                {filteredProducts.length}
              </span>{" "}
              sản phẩm
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="w-44">
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(v) => setSortBy(v as string)}
                size="sm"
                placeholder="Sắp xếp"
              />
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex items-center border border-secondary-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={[
                  "flex items-center justify-center w-9 h-9 transition-colors",
                  viewMode === "grid"
                    ? "bg-primary-50 text-primary-600"
                    : "text-secondary-400 hover:text-secondary-600",
                ].join(" ")}
                aria-label="Xem dạng lưới"
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={[
                  "flex items-center justify-center w-9 h-9 border-l border-secondary-200 transition-colors",
                  viewMode === "list"
                    ? "bg-primary-50 text-primary-600"
                    : "text-secondary-400 hover:text-secondary-600",
                ].join(" ")}
                aria-label="Xem dạng danh sách"
              >
                <ListBulletIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Product listing (full-width, no sidebar) ── */}
        <div className="min-w-0">
          {paginatedProducts.length === 0 ? (
            <EmptyState onClear={handleClearFilters} />
          ) : viewMode === "grid" ? (
            <ProductCardList
              products={paginatedProducts}
              itemsPerRow={ITEMS_PER_ROW}
              onCompare={handleCompare}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedProducts.map((product) => (
                <ProductListCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                pageSize={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        position="left"
        size="lg"
        title="Bộ lọc sản phẩm"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                handleClearFilters();
                setMobileFilterOpen(false);
              }}
            >
              Xóa tất cả
            </Button>
            <Button
              className="flex-1"
              onClick={() => setMobileFilterOpen(false)}
            >
              Xem {filteredProducts.length} sản phẩm
            </Button>
          </div>
        }
      >
        <MobileFilterContent
          config={config}
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </Drawer>

      {/* ── Compare Bar ── */}
      <CompareBar
        products={compareList}
        onRemove={(id) =>
          setCompareList((prev) => prev.filter((p) => p.id !== id))
        }
        onCompare={() => {
          /* navigate to compare page */
        }}
        isOpen={compareList.length > 0}
      />
    </>
  );
}
