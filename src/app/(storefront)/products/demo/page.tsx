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
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  Drawer,
  Input,
  Select,
  Toggle,
} from "@/src/components/ui";
import { Breadcrumb, FilterBar, Pagination } from "@/src/components/navigation";
import {
  ProductCard,
  CompareBar,
  ProductCardSkeleton,
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
    if (typeof value[0] === "number") return true; // range
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
        const opt = def.options?.find((o) => o.value === val);
        if (opt) chips.push({ key: def.key, label: opt.label, group: def.label });
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

// ─── Range Filter ────────────────────────────────────────────────────────────

function RangeFilter({
  def,
  value,
  onChange,
}: {
  def: FilterDefinition;
  value: [number, number] | undefined;
  onChange: (v: [number, number]) => void;
}) {
  const min = def.min ?? 0;
  const max = def.max ?? 100;
  const step = def.step ?? 1;
  const current = value ?? [min, max];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={current[0]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= min && v <= current[1]) onChange([v, current[1]]);
          }}
          size="sm"
          className="flex-1"
          aria-label={`${def.label} từ`}
        />
        <span className="text-secondary-400 text-xs shrink-0">—</span>
        <Input
          type="number"
          value={current[1]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= current[0] && v <= max) onChange([current[0], v]);
          }}
          size="sm"
          className="flex-1"
          aria-label={`${def.label} đến`}
        />
      </div>
      {/* Visual range bar */}
      <div className="relative h-1.5 rounded-full bg-secondary-200">
        <div
          className="absolute h-full rounded-full bg-primary-500"
          style={{
            left: `${((current[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((current[1] - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-secondary-400">
        <span>
          {def.unit === "₫" ? formatVND(min) : `${min} ${def.unit ?? ""}`}
        </span>
        <span>
          {def.unit === "₫" ? formatVND(max) : `${max} ${def.unit ?? ""}`}
        </span>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onChange(current)}
        className="w-full"
      >
        Áp dụng
      </Button>
    </div>
  );
}

// ─── Rating Filter ───────────────────────────────────────────────────────────

function RatingFilter({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}) {
  const levels = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-1">
      {levels.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(value === n ? undefined : n)}
          className={[
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
            value === n
              ? "bg-primary-50 text-primary-700"
              : "text-secondary-600 hover:bg-secondary-50",
          ].join(" ")}
        >
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={[
                  "w-3.5 h-3.5",
                  i < n ? "text-warning-400" : "text-secondary-200",
                ].join(" ")}
              />
            ))}
          </span>
          <span>{n === 5 ? "5 sao" : `Từ ${n} sao`}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Filter Sidebar Content ──────────────────────────────────────────────────

function FilterSidebarContent({
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

  const accordionItems = config.filters.map((def) => ({
    value: def.key,
    label: (
      <span className="flex items-center gap-2 text-sm font-medium text-secondary-800">
        {def.label}
        {isFilterActive(filters[def.key]) && (
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
        )}
      </span>
    ),
    children: renderFilterContent(def),
  }));

  function renderFilterContent(def: FilterDefinition) {
    switch (def.type) {
      case "dropdown":
        return (
          <Select
            options={def.options ?? []}
            value={(filters[def.key] as string) ?? ""}
            onChange={(v) => onChange(def.key, (v as string) || undefined)}
            placeholder="Tất cả"
            dropdownWidth="300px"
            clearable
            size="sm"
          />
        );

      case "checkbox":
        return (
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {def.options?.map((opt) => {
              const selected = (filters[def.key] as string[]) ?? [];
              const checked = selected.includes(opt.value);
              return (
                <Checkbox
                  key={opt.value}
                  label={
                    opt.count !== undefined
                      ? `${opt.label} (${opt.count})`
                      : opt.label
                  }
                  checked={checked}
                  onChange={() => {
                    const next = checked
                      ? selected.filter((v) => v !== opt.value)
                      : [...selected, opt.value];
                    onChange(def.key, next.length > 0 ? next : undefined);
                  }}
                  size="sm"
                />
              );
            })}
          </div>
        );

      case "range":
        return (
          <RangeFilter
            def={def}
            value={filters[def.key] as [number, number] | undefined}
            onChange={(v) => onChange(def.key, v)}
          />
        );

      case "toggle":
        return (
          <Toggle
            label={def.label}
            checked={(filters[def.key] as boolean) ?? false}
            onChange={(e) => onChange(def.key, e.target.checked || undefined)}
            size="sm"
          />
        );

      case "rating":
        return (
          <RatingFilter
            value={filters[def.key] as number | undefined}
            onChange={(v) => onChange(def.key, v)}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="space-y-4">
      {/* Clear all */}
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

      <Accordion
        items={accordionItems}
        multiple
        defaultValue={config.filters.slice(0, 4).map((f) => f.key)}
        variant="ghost"
      />
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
          <span className="text-lg font-bold text-error-600">
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
      // chipKey format: "filterKey" or "filterKey:optionValue"
      const [filterKey, optionValue] = chipKey.split(":");
      if (optionValue) {
        // Remove single checkbox option
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
    // For demo, just return all products (real filtering would be server-side)
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

        {/* ── Active filter chips ── */}
        {activeFilters.length > 0 && (
          <FilterBar
            filters={activeFilters}
            onRemove={handleRemoveChip}
            onClearAll={handleClearFilters}
          />
        )}

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

        {/* ── Main content: Sidebar + Products ── */}
        <div className="flex gap-6 items-start">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-32 rounded-xl border border-secondary-200 bg-white p-4 shadow-sm max-h-[calc(100vh-9rem)] overflow-y-auto">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-secondary-100">
                <FunnelIcon className="w-4 h-4 text-secondary-500" />
                <span className="text-sm font-semibold text-secondary-800">
                  Bộ lọc tìm kiếm
                </span>
              </div>
              <FilterSidebarContent
                config={config}
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* Product listing */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length === 0 ? (
              <EmptyState onClear={handleClearFilters} />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onCompare={handleCompare}
                  />
                ))}
              </div>
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
                  showPageSize
                  pageSize={ITEMS_PER_PAGE}
                  pageSizeOptions={[12, 24, 48]}
                />
              </div>
            )}
          </div>
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
        <FilterSidebarContent
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
