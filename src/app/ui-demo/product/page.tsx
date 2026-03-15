"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  StockBadge,
  RatingStars,
  PriceTag,
  SpecTable,
  VariantSelector,
  ProductCard,
  ProductCardSkeleton,
  CompareBar,
  type CompareProduct,
} from "@/src/components";

// ─── Demo helpers ─────────────────────────────────────────────────────────────

function Section({ title, description, children }: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="mb-5 border-b border-secondary-200 pb-3">
        <h2 className="text-lg font-bold text-secondary-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-secondary-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-secondary-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">
      {children}
    </p>
  );
}

// ─── Mock product data ────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "cpu-i9",
    name: "Intel Core i9-14900K 24-Core LGA1700",
    brand: "Intel",
    href: "#",
    thumbnail: "https://placehold.co/300x300/f1f5f9/64748b?text=i9-14900K",
    price: 13_990_000,
    originalPrice: 15_490_000,
    rating: 4.8,
    reviewCount: 234,
    stockStatus: "in-stock" as const,
  },
  {
    id: "gpu-rog",
    name: "ASUS ROG Strix RTX 4090 OC 24 GB GDDR6X",
    brand: "ASUS ROG",
    href: "#",
    thumbnail: "https://placehold.co/300x300/f1f5f9/64748b?text=RTX+4090",
    price: 49_990_000,
    originalPrice: 54_990_000,
    rating: 4.9,
    reviewCount: 87,
    stockStatus: "low-stock" as const,
    stockQuantity: 2,
  },
  {
    id: "mb-msi",
    name: "MSI MEG Z790 ACE MAX DDR5 Gaming",
    brand: "MSI",
    href: "#",
    thumbnail: "https://placehold.co/300x300/f1f5f9/64748b?text=Z790+ACE",
    price: 12_490_000,
    rating: 4.6,
    reviewCount: 52,
    stockStatus: "out-of-stock" as const,
  },
  {
    id: "ram-corsair",
    name: "Corsair Vengeance DDR5-6000 32 GB (2×16)",
    brand: "Corsair",
    href: "#",
    thumbnail: "https://placehold.co/300x300/f1f5f9/64748b?text=DDR5+6000",
    price: 3_290_000,
    originalPrice: 3_990_000,
    rating: 4.7,
    reviewCount: 318,
    stockStatus: "in-stock" as const,
    isWishlisted: true,
  },
];

const COMPARE_POOL: CompareProduct[] = [
  { id: "cpu-i9",  name: "Intel Core i9-14900K",         thumbnail: "https://placehold.co/80x80/f1f5f9/64748b?text=i9",  price: 13_990_000 },
  { id: "cpu-amd", name: "AMD Ryzen 9 7950X3D",           thumbnail: "https://placehold.co/80x80/f1f5f9/64748b?text=R9",  price: 18_500_000 },
  { id: "cpu-i7",  name: "Intel Core i7-14700K",          thumbnail: "https://placehold.co/80x80/f1f5f9/64748b?text=i7",  price: 9_490_000  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDemoPage() {
  // RatingStars input
  const [userRating, setUserRating] = useState(0);

  // VariantSelector
  const [ram, setRam]       = useState("16gb");
  const [storage, setStorage] = useState("512ssd");
  const [laptopColor, setLaptopColor] = useState("black");

  // CompareBar
  const [compareList, setCompareList] = useState<CompareProduct[]>([COMPARE_POOL[0]]);

  function addToCompare(product: CompareProduct) {
    if (compareList.length >= 3 || compareList.find((p) => p.id === product.id)) return;
    setCompareList((prev) => [...prev, product]);
  }

  function removeFromCompare(id: string) {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-secondary-50 pb-32">
      {/* Header */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/ui-demo"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Back to showcase
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">Product Components</h1>
          <p className="mt-2 text-secondary-500">
            StockBadge · RatingStars · PriceTag · SpecTable · VariantSelector · ProductCard · ProductCardSkeleton · CompareBar
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">

        {/* ── 1. StockBadge ── */}
        <Section title="StockBadge" description="Availability indicator with icon, 3 statuses, and a quantity hint for low-stock.">
          <Card>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <SubLabel>All 3 statuses</SubLabel>
                <div className="flex flex-col gap-3">
                  <StockBadge status="in-stock" />
                  <StockBadge status="low-stock" quantity={3} />
                  <StockBadge status="out-of-stock" />
                </div>
              </div>

              <div>
                <SubLabel>Sizes — sm · md</SubLabel>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] text-secondary-400 uppercase tracking-wide">sm</p>
                    <StockBadge status="in-stock"     size="sm" />
                    <StockBadge status="low-stock"    size="sm" quantity={5} />
                    <StockBadge status="out-of-stock" size="sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] text-secondary-400 uppercase tracking-wide">md (default)</p>
                    <StockBadge status="in-stock"     size="md" />
                    <StockBadge status="low-stock"    size="md" quantity={5} />
                    <StockBadge status="out-of-stock" size="md" />
                  </div>
                </div>
              </div>

              <div>
                <SubLabel>In context</SubLabel>
                <div className="space-y-3 text-sm">
                  {[
                    { name: "Core i9-14900K",  status: "in-stock"     as const, qty: undefined },
                    { name: "RTX 4090 ROG",    status: "low-stock"    as const, qty: 2 },
                    { name: "Z790 ACE MAX",    status: "out-of-stock" as const, qty: undefined },
                  ].map(({ name, status, qty }) => (
                    <div key={name} className="flex items-center justify-between rounded-lg border border-secondary-100 px-3 py-2">
                      <span className="font-medium text-secondary-700">{name}</span>
                      <StockBadge status={status} quantity={qty} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── 2. RatingStars ── */}
        <Section title="RatingStars" description="Read-only display with 0.5-step half-stars, interactive input mode, 3 sizes.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Display mode — half-star precision</SubLabel>
              <div className="space-y-3">
                {[5, 4.5, 4, 3.5, 3, 2, 1, 0].map((val) => (
                  <div key={val} className="flex items-center gap-3">
                    <span className="w-6 text-right text-sm tabular-nums text-secondary-500">{val}</span>
                    <RatingStars value={val} count={val === 4.8 ? 234 : undefined} />
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SubLabel>With review counts</SubLabel>
              <div className="space-y-3">
                {[
                  { val: 4.8, count: 234,  label: "Intel Core i9-14900K" },
                  { val: 4.9, count: 87,   label: "ASUS RTX 4090 ROG" },
                  { val: 4.6, count: 1204, label: "Samsung 990 Pro SSD" },
                  { val: 3.8, count: 29,   label: "Generic PSU 650W" },
                ].map(({ val, count, label }) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-secondary-100 px-3 py-2">
                    <span className="text-sm text-secondary-700 truncate max-w-[150px]">{label}</span>
                    <RatingStars value={val} count={count} size="sm" />
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-secondary-100 pt-4">
                <SubLabel>Interactive input mode</SubLabel>
                <div className="space-y-3">
                  <RatingStars mode="input" value={userRating} onChange={setUserRating} size="lg" />
                  <p className="text-sm text-secondary-500">
                    {userRating === 0
                      ? "Click a star to rate this product"
                      : `You rated: ${userRating} star${userRating !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-secondary-100 pt-4">
                <SubLabel>Sizes — sm · md · lg</SubLabel>
                <div className="space-y-2">
                  <RatingStars value={4.5} size="sm" count={128} />
                  <RatingStars value={4.5} size="md" count={128} />
                  <RatingStars value={4.5} size="lg" count={128} />
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 3. PriceTag ── */}
        <Section title="PriceTag" description="VND-formatted price with auto-calculated discount badge, strikethrough, and installment hint.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Basic pricing scenarios</SubLabel>
              <div className="space-y-4">
                <div>
                  <p className="mb-1.5 text-xs text-secondary-400">No discount</p>
                  <PriceTag currentPrice={3_290_000} />
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-secondary-400">With original price (auto discount %)</p>
                  <PriceTag currentPrice={13_990_000} originalPrice={15_490_000} />
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-secondary-400">Explicit discount override</p>
                  <PriceTag currentPrice={49_990_000} originalPrice={54_990_000} discountPct={15} />
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-secondary-400">With installment hint</p>
                  <PriceTag
                    currentPrice={49_990_000}
                    originalPrice={54_990_000}
                    showInstallment
                    installmentMonths={12}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <SubLabel>Sizes — sm · md · lg</SubLabel>
              <div className="space-y-5">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size}>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-400">{size}</p>
                    <PriceTag
                      currentPrice={13_990_000}
                      originalPrice={15_490_000}
                      size={size}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-secondary-100 pt-4">
                <SubLabel>Full installment (24 months)</SubLabel>
                <PriceTag
                  currentPrice={49_990_000}
                  originalPrice={54_990_000}
                  size="lg"
                  showInstallment
                  installmentMonths={24}
                />
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 4. SpecTable ── */}
        <Section title="SpecTable" description="Two-column spec display and three-column side-by-side comparison with diff highlighting.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Single product</SubLabel>
              <SpecTable
                caption="Intel Core i9-14900K Specifications"
                specs={[
                  { label: "Brand",        value: "Intel" },
                  { label: "Series",       value: "Core i9 (14th Gen)" },
                  { label: "Cores",        value: "24 (8P + 16E)" },
                  { label: "Base clock",   value: "3.2 GHz" },
                  { label: "Boost clock",  value: "6.0 GHz" },
                  { label: "TDP",          value: "125 W (PL1)" },
                  { label: "L3 cache",     value: "36 MB" },
                  { label: "Socket",       value: "LGA 1700" },
                  { label: "Memory",       value: "DDR4-3200 / DDR5-5600" },
                ]}
              />
            </Card>

            <Card>
              <SubLabel>Comparison mode (diffs highlighted in amber)</SubLabel>
              <SpecTable
                specs={[
                  { label: "Model",         value: "Core i9-14900K" },
                  { label: "Cores",         value: "24 (8P + 16E)" },
                  { label: "Base clock",    value: "3.2 GHz" },
                  { label: "Boost clock",   value: "6.0 GHz" },
                  { label: "TDP",           value: "125 W" },
                  { label: "L3 cache",      value: "36 MB" },
                  { label: "Socket",        value: "LGA 1700" },
                  { label: "Price",         value: "13,990,000₫" },
                ]}
                compareSpecs={[
                  { label: "Model",         value: "Ryzen 9 7950X3D" },
                  { label: "Cores",         value: "16 (unified)" },
                  { label: "Base clock",    value: "4.2 GHz" },
                  { label: "Boost clock",   value: "5.7 GHz" },
                  { label: "TDP",           value: "120 W" },
                  { label: "L3 cache",      value: "128 MB (3D V-Cache)" },
                  { label: "Socket",        value: "AM5" },
                  { label: "Price",         value: "18,500,000₫" },
                ]}
                highlightDiffs
              />
            </Card>
          </div>
        </Section>

        {/* ── 5. VariantSelector ── */}
        <Section title="VariantSelector" description="RAM / storage / color option chips with stock-awareness — out-of-stock options are disabled with strikethrough.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Button type — RAM options</SubLabel>
              <VariantSelector
                label="RAM"
                type="button"
                value={ram}
                onChange={setRam}
                options={[
                  { value: "8gb",  label: "8 GB",   stock: 15 },
                  { value: "16gb", label: "16 GB",  stock: 8  },
                  { value: "32gb", label: "32 GB",  stock: 3  },
                  { value: "64gb", label: "64 GB",  stock: 0  },
                ]}
              />

              <div className="mt-5">
                <VariantSelector
                  label="Storage"
                  type="button"
                  value={storage}
                  onChange={setStorage}
                  options={[
                    { value: "256ssd",  label: "256 GB SSD",  stock: 20, priceDelta: "Base" },
                    { value: "512ssd",  label: "512 GB SSD",  stock: 12, priceDelta: "+500k" },
                    { value: "1tssd",   label: "1 TB SSD",    stock: 5,  priceDelta: "+1.2M" },
                    { value: "2tssd",   label: "2 TB SSD",    stock: 0,  priceDelta: "+2.8M" },
                  ]}
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Color swatches</SubLabel>
              <VariantSelector
                label="Color"
                type="color"
                value={laptopColor}
                onChange={setLaptopColor}
                options={[
                  { value: "black",   label: "Midnight Black",  color: "#1c1c1c", stock: 7  },
                  { value: "silver",  label: "Stellar Silver",  color: "#c0c0c0", stock: 4  },
                  { value: "white",   label: "Arctic White",    color: "#f0f0f0", stock: 0  },
                  { value: "red",     label: "ROG Red",         color: "#cc0000", stock: 2  },
                  { value: "blue",    label: "Phantom Blue",    color: "#1a3a6b", stock: 6  },
                  { value: "titanium",label: "Titanium Gray",   color: "#6b7280", stock: 3  },
                ]}
              />

              <div className="mt-4 rounded-lg border border-secondary-100 bg-secondary-50 px-3 py-2 text-sm text-secondary-600">
                Selected: <span className="font-medium text-secondary-800">
                  {laptopColor
                    ? ["black","silver","white","red","blue","titanium"].find(v => v === laptopColor) === "black" ? "Midnight Black"
                    : laptopColor === "silver" ? "Stellar Silver"
                    : laptopColor === "white" ? "Arctic White"
                    : laptopColor === "red" ? "ROG Red"
                    : laptopColor === "blue" ? "Phantom Blue"
                    : "Titanium Gray"
                    : "None"}
                </span>
              </div>

              <div className="mt-5 border-t border-secondary-100 pt-4">
                <SubLabel>RAM + price delta</SubLabel>
                <VariantSelector
                  label="Configuration"
                  type="button"
                  options={[
                    { value: "base",  label: "16 GB / 512 GB", stock: 10, priceDelta: "Base" },
                    { value: "mid",   label: "32 GB / 1 TB",   stock: 5,  priceDelta: "+3.2M" },
                    { value: "high",  label: "64 GB / 2 TB",   stock: 2,  priceDelta: "+7.5M" },
                    { value: "ultra", label: "128 GB / 4 TB",  stock: 0,  priceDelta: "+18M" },
                  ]}
                  value="base"
                />
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 6. ProductCard ── */}
        <Section title="ProductCard" description="Full product card with hover zoom, wishlist toggle, stock badge, and add-to-cart feedback.">
          <div>
            <SubLabel>
              Grid — in-stock · low-stock · out-of-stock · wishlisted
            </SubLabel>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  {...p}
                  onAddToCart={(id) => console.log("Add to cart:", id)}
                  onWishlistToggle={(id, w) => console.log("Wishlist:", id, w)}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* ── 7. ProductCardSkeleton ── */}
        <Section title="ProductCardSkeleton" description="Animated shimmer placeholder matching the ProductCard layout exactly.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ProductCardSkeleton count={4} />
          </div>
        </Section>

        {/* ── 8. CompareBar ── */}
        <Section title="CompareBar" description="Sticky bottom bar showing comparison slots. Add products below — the bar appears and enables 'Compare Now' at 2+.">
          <Card>
            <SubLabel>Add products to comparison (max 3)</SubLabel>
            <div className="flex flex-wrap gap-3">
              {COMPARE_POOL.map((p) => {
                const inList = compareList.some((c) => c.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => addToCompare(p)}
                    disabled={inList || compareList.length >= 3}
                    className={[
                      "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
                      inList
                        ? "border-primary-300 bg-primary-50 text-primary-700 cursor-default"
                        : compareList.length >= 3
                        ? "border-secondary-200 bg-secondary-50 text-secondary-400 cursor-not-allowed"
                        : "border-secondary-300 bg-white text-secondary-700 hover:border-primary-400 hover:bg-primary-50",
                    ].join(" ")}
                  >
                    <PlusIcon className="w-4 h-4" aria-hidden="true" />
                    {p.name}
                    {inList && <span className="text-xs text-primary-500">(added)</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg bg-secondary-50 p-3 text-sm text-secondary-500">
              {compareList.length === 0
                ? "No products selected — add products above to see the bar."
                : compareList.length === 1
                ? "Add 1 more product to enable comparison."
                : `${compareList.length} products selected — Compare Now is enabled.`}
            </div>
          </Card>

          {/* Live CompareBar — rendered inside the page flow for demo visibility */}
          <div className="mt-4 rounded-xl border border-secondary-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-secondary-100 bg-secondary-50 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">
                CompareBar preview (normally sticky to bottom of viewport)
              </p>
            </div>
            <div className="relative">
              <div className="border-t border-secondary-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
                <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
                  <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-secondary-700">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
                    </svg>
                    <span className="hidden sm:inline">Compare</span>
                    <span className="text-secondary-400">({compareList.length}/3)</span>
                  </div>

                  <div className="flex flex-1 items-center gap-3 overflow-x-auto">
                    {compareList.map((product) => (
                      <div key={product.id} className="relative flex shrink-0 items-center gap-2 rounded-lg border border-secondary-200 bg-secondary-50 pl-2 pr-7 py-1.5 max-w-[200px]">
                        <img src={product.thumbnail} alt={product.name} className="h-10 w-10 shrink-0 rounded object-contain" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-secondary-800 max-w-[120px]">{product.name}</p>
                          <p className="text-xs font-semibold text-primary-700">{product.price.toLocaleString("vi-VN")}₫</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-secondary-400 hover:bg-secondary-200 hover:text-secondary-700"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {Array.from({ length: 3 - compareList.length }, (_, i) => (
                      <div key={i} className="flex h-14 w-[160px] shrink-0 items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-secondary-200 text-xs text-secondary-400">
                        <PlusIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        Add product
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={compareList.length < 2}
                    className={[
                      "shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
                      compareList.length >= 2
                        ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                        : "cursor-not-allowed bg-secondary-100 text-secondary-400",
                    ].join(" ")}
                  >
                    Compare Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-secondary-200 pt-8">
          <Link
            href="/ui-demo/feedback"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Feedback &amp; Overlays
          </Link>
          <Link
            href="/ui-demo/commerce"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next: Commerce Components
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
