"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CpuChipIcon,
  ServerStackIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  CommandLineIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PrinterIcon,
  TvIcon,
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  Squares2X2Icon,
  TagIcon,
  ArrowPathIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

import {
  Navbar,
  MegaMenu,
  Breadcrumb,
  Sidebar,
  Pagination,
  FilterBar,
  SearchBar,
} from "@/src/components/navigation";
import type {
  MegaMenuTrigger,
  SidebarNavItem,
  ActiveFilter,
  SearchSuggestion,
} from "@/src/components/navigation";

// ─── Local helpers ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-secondary-900 border-b border-secondary-200 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({ label, children, noPad }: { label?: string; children: ReactNode; noPad?: boolean }) {
  return (
    <div className={["rounded-xl border border-secondary-200 bg-white overflow-hidden", noPad ? "" : "p-5"].join(" ")}>
      {label && (
        <p className={["text-xs font-semibold uppercase tracking-wider text-secondary-500", noPad ? "px-5 pt-5 pb-3" : "mb-3"].join(" ")}>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs text-secondary-500 font-medium mb-1">{children}</p>;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MEGA_MENU_TRIGGERS: MegaMenuTrigger[] = [
  {
    label: "Components",
    columns: [
      {
        heading: "Processing",
        items: [
          { value: "cpu",  label: "CPUs",  href: "/products/cpu",  icon: <CpuChipIcon className="w-5 h-5" />,    description: "Intel & AMD desktop processors" },
          { value: "gpu",  label: "GPUs",  href: "/products/gpu",  icon: <ServerStackIcon className="w-5 h-5" />, description: "NVIDIA & AMD graphics cards" },
        ],
      },
      {
        heading: "Storage & Memory",
        items: [
          { value: "ram",  label: "RAM",   href: "/products/ram",  icon: <CircleStackIcon className="w-5 h-5" />, description: "DDR4 & DDR5 memory kits" },
          { value: "ssd",  label: "SSDs",  href: "/products/ssd",  icon: <ServerStackIcon className="w-5 h-5" />, description: "NVMe & SATA solid-state drives" },
          { value: "hdd",  label: "HDDs",  href: "/products/hdd",  icon: <CircleStackIcon className="w-5 h-5" />, description: "High-capacity hard disk drives" },
        ],
      },
      {
        heading: "Platform",
        items: [
          { value: "mainboard", label: "Mainboards", href: "/products/mainboard", icon: <Squares2X2Icon className="w-5 h-5" />, description: "Intel & AMD platform boards" },
          { value: "psu",       label: "PSUs",       href: "/products/psu",       icon: <ArrowPathIcon className="w-5 h-5" />,  description: "80+ Bronze to Titanium" },
          { value: "case",      label: "PC Cases",   href: "/products/case",      icon: <ComputerDesktopIcon className="w-5 h-5" />, description: "ATX, mATX & ITX enclosures" },
        ],
      },
    ],
    footer: (
      <a href="/products/components" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
        Browse all components →
      </a>
    ),
  },
  {
    label: "Peripherals",
    columns: [
      {
        heading: "Input",
        items: [
          { value: "keyboard", label: "Keyboards",  href: "/products/keyboard",  icon: <CommandLineIcon className="w-5 h-5" />,    description: "Mechanical & membrane" },
          { value: "mouse",    label: "Mice",       href: "/products/mouse",     icon: <DeviceTabletIcon className="w-5 h-5" />, description: "Gaming & productivity" },
        ],
      },
      {
        heading: "Display & Audio",
        items: [
          { value: "monitor",  label: "Monitors",  href: "/products/monitor",   icon: <TvIcon className="w-5 h-5" />,           description: "1080p, 1440p & 4K" },
          { value: "headset",  label: "Headsets",  href: "/products/headset",   icon: <SpeakerWaveIcon className="w-5 h-5" />,  description: "Wired & wireless audio" },
          { value: "webcam",   label: "Webcams",   href: "/products/webcam",    icon: <VideoCameraIcon className="w-5 h-5" />,  description: "HD & 4K streaming cams" },
        ],
      },
    ],
  },
  {
    label: "Laptops & PCs",
    columns: [
      {
        heading: "Laptops",
        items: [
          { value: "gaming-laptop",  label: "Gaming Laptops",  href: "/products/gaming-laptop",  icon: <DeviceTabletIcon className="w-5 h-5" />, description: "RTX-powered portables" },
          { value: "office-laptop",  label: "Office Laptops",  href: "/products/office-laptop",  icon: <DeviceTabletIcon className="w-5 h-5" />, description: "Thin, light, all-day battery" },
        ],
      },
      {
        heading: "Desktop PCs",
        items: [
          { value: "gaming-pc",   label: "Gaming PCs",    href: "/products/gaming-pc",   icon: <ComputerDesktopIcon className="w-5 h-5" />, description: "Configured gaming rigs" },
          { value: "workstation", label: "Workstations",  href: "/products/workstation", icon: <PrinterIcon className="w-5 h-5" />,         description: "Content creation builds" },
        ],
      },
    ],
    footer: (
      <a href="/products/laptops-pcs" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
        View all systems →
      </a>
    ),
  },
];

const SIDEBAR_ITEMS: SidebarNavItem[] = [
  {
    value: "all",
    label: "All Categories",
    href: "/products",
    icon: <Squares2X2Icon className="w-5 h-5" />,
  },
  {
    value: "components",
    label: "Components",
    icon: <CpuChipIcon className="w-5 h-5" />,
    children: [
      { value: "cpu", label: "CPUs", href: "/products/cpu", active: true },
      { value: "gpu", label: "GPUs", href: "/products/gpu" },
      { value: "ram", label: "RAM",  href: "/products/ram" },
      { value: "ssd", label: "SSDs", href: "/products/ssd" },
      { value: "mainboard", label: "Mainboards", href: "/products/mainboard" },
      { value: "psu", label: "PSUs", href: "/products/psu" },
    ],
  },
  {
    value: "peripherals",
    label: "Peripherals",
    icon: <CommandLineIcon className="w-5 h-5" />,
    children: [
      { value: "keyboard", label: "Keyboards", href: "/products/keyboard" },
      { value: "mouse",    label: "Mice",      href: "/products/mouse" },
      { value: "monitor",  label: "Monitors",  href: "/products/monitor" },
      { value: "headset",  label: "Headsets",  href: "/products/headset" },
    ],
  },
  {
    value: "laptops",
    label: "Laptops",
    href: "/products/laptops",
    icon: <DeviceTabletIcon className="w-5 h-5" />,
    badge: "Sale",
  },
  {
    value: "deals",
    label: "Deals & Promos",
    href: "/products/deals",
    icon: <TagIcon className="w-5 h-5" />,
    badge: "12",
  },
  {
    value: "orders",
    label: "Order History",
    href: "/orders",
    icon: <ShoppingBagIcon className="w-5 h-5" />,
  },
  {
    value: "wishlist",
    label: "Wishlist",
    href: "/wishlist",
    icon: <HeartIcon className="w-5 h-5" />,
    disabled: true,
  },
];

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  { key: "s1", label: "Intel Core i9-14900K",     sublabel: "CPU",       href: "/products/cpu/i9-14900k" },
  { key: "s2", label: "Intel Core i7-14700K",     sublabel: "CPU",       href: "/products/cpu/i7-14700k" },
  { key: "s3", label: "Intel Arc A770",            sublabel: "GPU",       href: "/products/gpu/arc-a770" },
  { key: "s4", label: "Intel NUC",                 sublabel: "Mini PC",   href: "/products/mini-pc/nuc" },
];

const INITIAL_FILTERS: ActiveFilter[] = [
  { key: "brand-intel",    label: "Intel",       group: "Brand" },
  { key: "brand-asus",     label: "ASUS",        group: "Brand" },
  { key: "price-range",    label: "5M – 15M₫",  group: "Price" },
  { key: "stock-instock",  label: "In stock",    group: "Availability" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NavigationDemoPage() {
  // ── Navbar ────────────────────────────────────────────────────────────────
  const [navLoggedIn, setNavLoggedIn] = useState(true);
  const [cartCount, setCartCount] = useState(3);

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ── Pagination ────────────────────────────────────────────────────────────
  const [page1, setPage1] = useState(5);
  const [page2, setPage2] = useState(1);
  const [page2Size, setPage2Size] = useState(20);
  const [page3, setPage3] = useState(12);

  // ── FilterBar ─────────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<ActiveFilter[]>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState("popular");

  function removeFilter(key: string) {
    setFilters((prev) => prev.filter((f) => f.key !== key));
  }

  function addFilter(filter: ActiveFilter) {
    if (!filters.find((f) => f.key === filter.key)) {
      setFilters((prev) => [...prev, filter]);
    }
  }

  // ── SearchBar ─────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "RTX 4090", "Corsair 32GB DDR5", "Samsung 990 Pro",
  ]);

  const activeSuggestions =
    searchQuery.trim().length > 0
      ? SEARCH_SUGGESTIONS.filter((s) =>
          s.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  function handleSubmit(q: string) {
    setSubmittedQuery(q);
    if (q && !recentSearches.includes(q)) {
      setRecentSearches((prev) => [q, ...prev].slice(0, 5));
    }
  }

  function clearRecent(term: string) {
    setRecentSearches((prev) => prev.filter((t) => t !== term));
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-secondary-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/ui-demo"
            className="flex items-center gap-1.5 text-sm text-secondary-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            UI Demo
          </Link>
          <span className="text-secondary-300">/</span>
          <h1 className="text-xl font-bold text-secondary-900">Navigation Components</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-14">

        {/* ── 1. Navbar ── */}
        <Section title="1. Navbar">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <button
              type="button"
              onClick={() => setNavLoggedIn((v) => !v)}
              className={[
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                navLoggedIn
                  ? "border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100"
                  : "border-secondary-300 text-secondary-600 hover:bg-secondary-50",
              ].join(" ")}
            >
              {navLoggedIn ? "Logged in" : "Guest"}
            </button>
            <button
              type="button"
              onClick={() => setCartCount((v) => (v + 1) % 6)}
              className="rounded-lg border border-secondary-300 px-3 py-1.5 text-xs font-medium text-secondary-600 hover:bg-secondary-50 transition-colors"
            >
              Cart: {cartCount} (cycle)
            </button>
          </div>

          <Card label="With search slot + user menu" noPad>
            <Navbar
              logo={
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-600 text-white text-sm font-bold">
                    PC
                  </div>
                  <span className="font-bold text-secondary-900">TechStore</span>
                </div>
              }
              links={[
                { href: "/",         label: "Home",     active: true },
                { href: "/products", label: "Products" },
                { href: "/build-pc", label: "Build PC" },
                { href: "/deals",    label: "Deals" },
              ]}
              cartCount={cartCount}
              onCartClick={() => alert("Cart clicked")}
              user={navLoggedIn ? { name: "Nguyễn Văn An", email: "an.nguyen@email.com" } : null}
              userMenuItems={[
                { label: "My Orders",    href: "/orders" },
                { label: "Account",      href: "/account" },
                { label: "Wishlist",     href: "/wishlist" },
                { label: "Sign Out",     onClick: () => setNavLoggedIn(false), isDanger: true },
              ]}
              searchSlot={
                <SearchBar
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSubmit={handleSubmit}
                  suggestions={activeSuggestions}
                  recentSearches={recentSearches}
                  onClearRecent={clearRecent}
                />
              }
              className="static border-b-0"
            />
          </Card>

          <Card label="No search slot — minimal navbar">
            <Navbar
              logo={
                <span className="font-bold text-secondary-900">TechStore</span>
              }
              links={[
                { href: "/",         label: "Home" },
                { href: "/products", label: "Products", active: true },
                { href: "/build-pc", label: "Build PC" },
              ]}
              cartCount={0}
              user={null}
              className="static border-b-0 shadow-none"
            />
          </Card>
        </Section>

        {/* ── 2. MegaMenu ── */}
        <Section title="2. MegaMenu">
          <Card label="3 triggers — Components (3 cols), Peripherals (2 cols), Laptops & PCs (2 cols)">
            <div className="flex items-center gap-2 py-1">
              <MegaMenu triggers={MEGA_MENU_TRIGGERS} />
            </div>
            <p className="mt-3 text-xs text-secondary-400">
              Click a trigger to open the dropdown. Click outside or press Escape to close.
            </p>
          </Card>
        </Section>

        {/* ── 3. Breadcrumb ── */}
        <Section title="3. Breadcrumb">
          <div className="grid grid-cols-1 gap-4">
            <Card label="showHome — product detail page">
              <Breadcrumb
                showHome
                items={[
                  { label: "Components",  href: "/products/components" },
                  { label: "CPUs",        href: "/products/components/cpu" },
                  { label: "Intel Core i9-14900K" },
                ]}
              />
            </Card>

            <Card label="maxItems={4} — collapsed middle crumbs">
              <div className="flex flex-col gap-3">
                <SubLabel>Deep path (7 crumbs) collapsed to 4 visible:</SubLabel>
                <Breadcrumb
                  showHome
                  maxItems={4}
                  items={[
                    { label: "Products",      href: "/products" },
                    { label: "Components",    href: "/products/components" },
                    { label: "CPUs",          href: "/products/components/cpu" },
                    { label: "Intel",         href: "/products/components/cpu/intel" },
                    { label: "Core i9 Series",href: "/products/components/cpu/intel/i9" },
                    { label: "Intel Core i9-14900K" },
                  ]}
                />
                <SubLabel>Same path, maxItems={5}:</SubLabel>
                <Breadcrumb
                  showHome
                  maxItems={5}
                  items={[
                    { label: "Products",      href: "/products" },
                    { label: "Components",    href: "/products/components" },
                    { label: "CPUs",          href: "/products/components/cpu" },
                    { label: "Intel",         href: "/products/components/cpu/intel" },
                    { label: "Core i9 Series",href: "/products/components/cpu/intel/i9" },
                    { label: "Intel Core i9-14900K" },
                  ]}
                />
              </div>
            </Card>

            <Card label="Custom separator — slash">
              <Breadcrumb
                showHome
                separator={<span className="text-secondary-300 text-sm px-0.5">/</span>}
                items={[
                  { label: "Deals & Promotions", href: "/deals" },
                  { label: "Summer Sale",         href: "/deals/summer-sale" },
                  { label: "Gaming Gear" },
                ]}
              />
            </Card>

            <Card label="Order history context — no showHome">
              <Breadcrumb
                items={[
                  { label: "My Account",    href: "/account" },
                  { label: "Orders",        href: "/orders" },
                  { label: "#DH-2024-0847" },
                ]}
              />
            </Card>
          </div>
        </Section>

        {/* ── 4. Sidebar ── */}
        <Section title="4. Sidebar">
          <Card label="Collapsible category sidebar — CPU active, Components expanded">
            <div className="flex items-center gap-3 mb-3">
              <button
                type="button"
                onClick={() => setSidebarCollapsed((v) => !v)}
                className="rounded-lg border border-secondary-300 px-3 py-1.5 text-xs font-medium text-secondary-700 hover:bg-secondary-50 transition-colors"
              >
                {sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              </button>
              <span className="text-xs text-secondary-500">
                Collapsed state: <span className="font-medium">{sidebarCollapsed ? "yes" : "no"}</span>
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-secondary-200" style={{ height: 460 }}>
              <Sidebar
                items={SIDEBAR_ITEMS}
                collapsible
                collapsed={sidebarCollapsed}
                onCollapsedChange={setSidebarCollapsed}
                header={
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="text-sm font-semibold text-secondary-900">Categories</span>
                  </div>
                }
                footer={
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-4 h-4 text-secondary-400 shrink-0" />
                    <span className="text-xs text-secondary-500">TechStore.vn</span>
                  </div>
                }
              />
            </div>
          </Card>
        </Section>

        {/* ── 5. Pagination ── */}
        <Section title="5. Pagination">
          <div className="grid grid-cols-1 gap-4">
            <Card label="Basic — 20 total pages, current page 5">
              <Pagination
                page={page1}
                totalPages={20}
                onPageChange={setPage1}
              />
            </Card>

            <Card label="With page size selector + jump-to input">
              <Pagination
                page={page2}
                totalPages={Math.ceil(248 / page2Size)}
                onPageChange={setPage2}
                showPageSize
                pageSize={page2Size}
                pageSizeOptions={[10, 20, 50, 100]}
                onPageSizeChange={(s) => { setPage2Size(s); setPage2(1); }}
                showJumpTo
              />
              <p className="mt-2 text-xs text-secondary-500">
                248 products · {page2Size} per page · page {page2} of {Math.ceil(248 / page2Size)}
              </p>
            </Card>

            <Card label="Many pages — siblingCount controls visible buttons">
              <div className="flex flex-col gap-4">
                <div>
                  <SubLabel>siblingCount=7 (default), 50 total pages:</SubLabel>
                  <Pagination page={page3} totalPages={50} onPageChange={setPage3} siblingCount={7} />
                </div>
                <div>
                  <SubLabel>siblingCount=5, same page:</SubLabel>
                  <Pagination page={page3} totalPages={50} onPageChange={setPage3} siblingCount={5} />
                </div>
                <div>
                  <SubLabel>Single page — returns null (nothing rendered):</SubLabel>
                  <div className="h-9 flex items-center">
                    <Pagination page={1} totalPages={1} onPageChange={() => {}} />
                    <span className="text-xs text-secondary-400 italic">
                      (Pagination returns null when totalPages ≤ 1)
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 6. FilterBar ── */}
        <Section title="6. FilterBar">
          <Card label="Active filter chips — click × to remove, or add more">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="text-xs text-secondary-500 self-center">Add filter:</span>
              {[
                { key: "brand-msi",   label: "MSI",      group: "Brand" },
                { key: "cat-cpu",     label: "CPU",      group: "Category" },
                { key: "cat-gpu",     label: "GPU",      group: "Category" },
                { key: "stock-sale",  label: "On sale",  group: "Availability" },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => addFilter(f)}
                  disabled={!!filters.find((x) => x.key === f.key)}
                  className="rounded-full border border-dashed border-secondary-300 px-3 py-1 text-xs text-secondary-500 hover:border-primary-400 hover:text-primary-600 disabled:pointer-events-none disabled:opacity-40 transition-colors"
                >
                  + {f.group}: {f.label}
                </button>
              ))}
            </div>

            <FilterBar
              filters={filters}
              onRemove={removeFilter}
              onClearAll={() => setFilters([])}
              actions={
                <div className="flex items-center gap-2">
                  <span className="text-xs text-secondary-500">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded border border-secondary-200 bg-white py-1 pl-2 pr-6 text-xs text-secondary-700 focus:outline-none focus:ring-1 focus:ring-primary-400"
                  >
                    <option value="popular">Most popular</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top rated</option>
                  </select>
                  <ChevronUpDownIcon className="w-4 h-4 text-secondary-400 -ml-5 pointer-events-none" />
                </div>
              }
            />

            {filters.length === 0 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-secondary-500 italic">No active filters.</span>
                <button
                  type="button"
                  onClick={() => setFilters(INITIAL_FILTERS)}
                  className="text-xs text-primary-600 hover:underline"
                >
                  Reset to defaults
                </button>
              </div>
            )}
          </Card>
        </Section>

        {/* ── 7. SearchBar ── */}
        <Section title="7. SearchBar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card label="With suggestions + recent searches">
              <div className="space-y-3">
                <SearchBar
                  placeholder="Search for Intel products…"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSubmit={handleSubmit}
                  suggestions={activeSuggestions}
                  recentSearches={recentSearches}
                  onClearRecent={clearRecent}
                />
                <div className="text-xs text-secondary-500 space-y-0.5">
                  <p>Try typing <strong className="text-secondary-700">"intel"</strong> to see suggestions.</p>
                  <p>Click a suggestion or press Enter to submit and add to recents.</p>
                  {submittedQuery && (
                    <p className="text-primary-600 font-medium">Last submitted: "{submittedQuery}"</p>
                  )}
                </div>
              </div>
            </Card>

            <Card label="Uncontrolled with static recent searches">
              <SearchBar
                placeholder="Search products, brands…"
                recentSearches={["ASUS ROG Strix", "Corsair Vengeance", "Samsung SSD"]}
                onSubmit={(q) => alert(`Search: ${q}`)}
              />
              <p className="mt-2 text-xs text-secondary-400">
                Focus the input to see recent searches. Keyboard arrow-key navigation is supported.
              </p>
            </Card>
          </div>
        </Section>

      </main>

      {/* Navigation footer */}
      <footer className="border-t border-secondary-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/ui-demo/admin"
            className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Admin Components
          </Link>
          <Link
            href="/ui-demo"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Back to UI Demo Index
            <ArrowLeftIcon className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
