"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

import { SidebarMegaMenu } from "@/src/components/navigation";
import { STORE_MEGA_MENU } from "@/src/navigation/megamenu.config";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="border-b border-secondary-200 pb-2">
        <h2 className="text-lg font-semibold text-secondary-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-secondary-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function PropRow({ name, type, defaultVal, desc }: { name: string; type: string; defaultVal?: string; desc: string }) {
  return (
    <tr className="border-b border-secondary-100">
      <td className="py-2 pr-4 font-mono text-xs text-primary-700">{name}</td>
      <td className="py-2 pr-4 font-mono text-xs text-secondary-500">{type}</td>
      <td className="py-2 pr-4 text-xs text-secondary-400">{defaultVal ?? "—"}</td>
      <td className="py-2 text-xs text-secondary-700">{desc}</td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MegaMenuDemoPage() {
  const [activeId, setActiveId] = useState("laptop-gaming");
  const [height, setHeight] = useState(480);

  // Subset of categories for a smaller demo
  const topCategories = STORE_MEGA_MENU.slice(0, 10);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Page header */}
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
          <h1 className="text-xl font-bold text-secondary-900">SidebarMegaMenu</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-14">

        {/* ── 1. Full demo ── */}
        <Section
          title="Full Store Navigation"
          subtitle="18 categories — hover a category in the left sidebar to reveal its panel. Includes multi-column sections, badges, child arrows, and brand grids."
        >
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-secondary-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-secondary-600">Height:</span>
              {([400, 480, 560] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHeight(h)}
                  className={[
                    "rounded border px-3 py-1 text-xs font-medium transition-colors",
                    height === h
                      ? "border-primary-500 bg-primary-600 text-white"
                      : "border-secondary-200 text-secondary-600 hover:border-secondary-400",
                  ].join(" ")}
                >
                  {h}px
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-secondary-600">Jump to category:</span>
              <select
                value={activeId}
                onChange={(e) => setActiveId(e.target.value)}
                className="rounded border border-secondary-200 bg-white py-1 pl-2 pr-6 text-xs text-secondary-700 focus:outline-none focus:ring-1 focus:ring-primary-400"
              >
                {STORE_MEGA_MENU.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <SidebarMegaMenu
            categories={STORE_MEGA_MENU}
            defaultActiveId={activeId}
            height={height}
          />
        </Section>

        {/* ── 2. Compact version ── */}
        <Section
          title="Compact — First 10 Categories"
          subtitle="Same component with a subset of categories and 400px height. Suitable for embedding in a dropdown or modal."
        >
          <SidebarMegaMenu
            categories={topCategories}
            defaultActiveId="linh-kien"
            height={400}
          />
        </Section>

        {/* ── 3. Embedded in a simulated Navbar ── */}
        <Section
          title="Embedded in a Navbar Dropdown"
          subtitle='Click "Danh mục sản phẩm" to open the mega menu as a dropdown panel below the navbar.'
        >
          <NavbarWithMegaMenuDemo />
        </Section>

        {/* ── 4. Data structure ── */}
        <Section title="Data Structure" subtitle="How menu data is configured via megamenu.config.ts">
          <div className="rounded-xl border border-secondary-200 bg-white p-5 overflow-x-auto">
            <pre className="text-xs text-secondary-700 leading-relaxed whitespace-pre">{DATA_STRUCTURE_EXAMPLE}</pre>
          </div>
        </Section>

        {/* ── 5. Prop table ── */}
        <Section title="SidebarMegaMenu Props">
          <div className="rounded-xl border border-secondary-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary-50 border-b border-secondary-200">
                <tr>
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-secondary-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100 px-4">
                <tr className="border-b border-secondary-100">
                  <td className="px-4 py-2 font-mono text-xs text-primary-700">categories</td>
                  <td className="px-4 py-2 font-mono text-xs text-secondary-500">SidebarMenuCategory[]</td>
                  <td className="px-4 py-2 text-xs text-secondary-400">required</td>
                  <td className="px-4 py-2 text-xs text-secondary-700">Full navigation tree — left sidebar items + their panels</td>
                </tr>
                <tr className="border-b border-secondary-100">
                  <td className="px-4 py-2 font-mono text-xs text-primary-700">defaultActiveId</td>
                  <td className="px-4 py-2 font-mono text-xs text-secondary-500">string</td>
                  <td className="px-4 py-2 text-xs text-secondary-400">first category</td>
                  <td className="px-4 py-2 text-xs text-secondary-700">Category id whose panel is pre-opened</td>
                </tr>
                <tr className="border-b border-secondary-100">
                  <td className="px-4 py-2 font-mono text-xs text-primary-700">height</td>
                  <td className="px-4 py-2 font-mono text-xs text-secondary-500">number</td>
                  <td className="px-4 py-2 text-xs text-secondary-400">480</td>
                  <td className="px-4 py-2 text-xs text-secondary-700">Fixed pixel height of the component container</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-primary-700">className</td>
                  <td className="px-4 py-2 font-mono text-xs text-secondary-500">string</td>
                  <td className="px-4 py-2 text-xs text-secondary-400">""</td>
                  <td className="px-4 py-2 text-xs text-secondary-700">Extra Tailwind classes applied to the root wrapper</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-secondary-200 bg-white overflow-hidden mt-4">
            <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-2">SidebarMenuCategory</p>
            <table className="w-full text-sm">
              <thead className="bg-secondary-50 border-b border-secondary-200">
                <tr>
                  {["Field", "Type", "Required", "Description"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-secondary-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {[
                  ["id",      "string",                      "yes", "Unique identifier used as key and for defaultActiveId"],
                  ["label",   "string",                      "yes", "Display text in the left sidebar"],
                  ["icon",    "ReactNode",                   "no",  "Heroicon or custom icon (w-4 h-4)"],
                  ["badge",   "string",                      "no",  "Small badge after label — 'Hot' renders in red, others in primary"],
                  ["href",    "string",                      "no",  "Direct link for categories that have no panel"],
                  ["panel",   "SidebarMenuPanel",            "no",  "Panel definition; omit for direct-link categories"],
                ].map(([f, t, r, d]) => (
                  <tr key={f} className="border-b border-secondary-100">
                    <td className="px-4 py-2 font-mono text-xs text-primary-700">{f}</td>
                    <td className="px-4 py-2 font-mono text-xs text-secondary-500">{t}</td>
                    <td className="px-4 py-2 text-xs text-secondary-400">{r}</td>
                    <td className="px-4 py-2 text-xs text-secondary-700">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </main>

      {/* Footer nav */}
      <footer className="border-t border-secondary-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/ui-demo/navigation"
            className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Navigation Components
          </Link>
          <Link
            href="/ui-demo"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            UI Demo Index
            <ArrowLeftIcon className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

// ─── Navbar + MegaMenu dropdown demo ─────────────────────────────────────────

function NavbarWithMegaMenuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-secondary-200 overflow-hidden">
      {/* Simulated navbar */}
      <div className="flex items-center gap-4 border-b border-secondary-200 bg-white px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-600 text-white text-sm font-bold">
            PC
          </div>
          <span className="font-bold text-secondary-900">TechStore.vn</span>
        </div>

        {/* Mega menu trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={[
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              open
                ? "bg-primary-600 text-white"
                : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200",
            ].join(" ")}
          >
            <ComputerDesktopIcon className="w-4 h-4" aria-hidden="true" />
            Danh mục sản phẩm
            <CpuChipIcon
              className={["w-4 h-4 transition-transform duration-150", open ? "rotate-180" : ""].join(" ")}
              aria-hidden="true"
            />
          </button>

          {/* Dropdown panel */}
          {open && (
            <div
              className="absolute left-0 top-full z-50 mt-1 w-[900px] rounded-xl shadow-2xl"
              onMouseLeave={() => setOpen(false)}
            >
              <SidebarMegaMenu
                categories={STORE_MEGA_MENU}
                defaultActiveId="laptop-gaming"
                height={460}
                className="shadow-none border-secondary-300"
              />
            </div>
          )}
        </div>

        {/* Other nav items */}
        <nav className="hidden sm:flex items-center gap-1 ml-2">
          {["Khuyến Mãi", "Build PC", "Tin Tức", "Liên Hệ"].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded px-3 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Cart */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Page content mock */}
      {!open && (
        <div className="bg-secondary-50 px-6 py-8 text-center text-sm text-secondary-400">
          ↑ Click "Danh mục sản phẩm" to open the mega menu dropdown
        </div>
      )}
      {open && <div className="h-[460px] bg-secondary-50" />}
    </div>
  );
}

// ─── Data structure example ───────────────────────────────────────────────────

const DATA_STRUCTURE_EXAMPLE = `// src/navigation/megamenu.config.ts

import type { SidebarMenuCategory } from "@/src/components/navigation/MegaMenu";

export const STORE_MEGA_MENU: SidebarMenuCategory[] = [
  {
    id: "laptop-gaming",           // unique key
    label: "Laptop Gaming, Đồ Họa",
    badge: "Hot",                  // "Hot" renders red; other strings render primary-blue

    panel: {
      // Each element = one visual column (left → right)
      columns: [
        // Column 1 — stacked sections
        [
          {
            heading: "Laptop Gaming",
            headingBadge: "Hot",          // optional badge on the heading
            headingHref: "/products/...", // makes the heading a clickable link
            items: [
              { label: "Laptop Gaming Asus",  href: "/products/...", hasChildren: true },
              { label: "Laptop Gaming Acer",  href: "/products/..." },
              { label: "RTX 50 Series",       href: "/products/...", badge: "Hot" },
            ],
          },
          {
            heading: "Đế Tản Nhiệt",
            items: [{ label: "Xem tất cả", href: "/products/..." }],
          },
        ],
        // Column 2
        [
          {
            heading: "Laptop Theo Cấu Hình",
            items: [/* ... */],
          },
        ],
        // … more columns
      ],

      // Optional: brands grid appended as the last column
      brands: [
        { name: "ASUS",   href: "/brands/asus" },
        { name: "MSI",    href: "/brands/msi" },
        { name: "Lenovo", href: "/brands/lenovo",  logoSrc: "/logos/lenovo.svg" },
      ],
    },
  },

  // Category with no panel — direct link
  { id: "sua-chua", label: "Dịch Vụ Sửa Chữa", href: "/services" },
];`;
