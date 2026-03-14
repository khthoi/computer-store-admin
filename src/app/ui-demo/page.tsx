import Link from "next/link";
import {
  SwatchIcon,
  CursorArrowRaysIcon,
  RectangleStackIcon,
  BellAlertIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
  Bars3Icon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// ─── Section registry ─────────────────────────────────────────────────────────

const SECTIONS = [
  {
    href: "/ui-demo/design",
    icon: SwatchIcon,
    title: "Design Tokens",
    description:
      "Color palette, typography scale, spacing, shadows, and border-radius reference for the entire design system.",
    count: "Colors · Fonts · Spacing · Shadows",
    accent: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    href: "/ui-demo/buttons",
    icon: CursorArrowRaysIcon,
    title: "Buttons & Actions",
    description:
      "Button variants (primary, secondary, outline, ghost, danger), sizes, loading states, and icon combos.",
    count: "Button · Badge · IconButton",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    href: "/ui-demo/forms",
    icon: RectangleStackIcon,
    title: "Form Controls",
    description:
      "Input, Textarea, Select, Checkbox, RadioGroup, Switch, FileUpload, and full form compositions.",
    count: "Input · Select · Checkbox · Radio · Switch",
    accent: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    href: "/ui-demo/feedback",
    icon: BellAlertIcon,
    title: "Feedback & Overlays",
    description:
      "Toast notifications, Modal, Drawer, Tooltip, Popover, Accordion, Alert, Spinner, and Skeleton loaders.",
    count: "Toast · Modal · Drawer · Tooltip · Alert",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    href: "/ui-demo/product",
    icon: ShoppingBagIcon,
    title: "Product Components",
    description:
      "ProductCard, ProductImageGallery, PriceTag, RatingStars, StockBadge, SpecTable, VariantSelector, CompareBar.",
    count: "ProductCard · Gallery · PriceTag · Rating",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    href: "/ui-demo/commerce",
    icon: ShoppingCartIcon,
    title: "Commerce Components",
    description:
      "CartItem, CartSummary, CouponInput, PaymentMethodPicker, OrderStatusBadge, OrderTimeline, AddressCard, CheckoutForm.",
    count: "Cart · Checkout · Orders · Address",
    accent: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    href: "/ui-demo/admin",
    icon: Cog6ToothIcon,
    title: "Admin Components",
    description:
      "DataTable with sorting/filtering/bulk actions, StatCard with sparklines, AdminSidebar, ConfirmDialog, FileUpload.",
    count: "DataTable · StatCard · AdminSidebar",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    href: "/ui-demo/navigation",
    icon: Bars3Icon,
    title: "Navigation Components",
    description:
      "MegaMenu, Breadcrumb, Sidebar, Pagination, FilterBar, and SearchBar with suggestions and keyboard navigation.",
    count: "MegaMenu · Breadcrumb · Pagination · Search",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UIDemoIndexPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* ── Hero header ── */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <SparklesIcon className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">
              Component Library
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-secondary-900">
            UI Component Showcase
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-secondary-500">
            A living reference for every component, token, and pattern used
            across the Online PC Store. Built with Next.js 16, TailwindCSS v4,
            and Heroicons.
          </p>

          {/* Meta chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Next.js 16 App Router",
              "TailwindCSS v4",
              "TypeScript Strict",
              "Heroicons",
              "53 Components",
              "6 Groups",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-secondary-200 bg-secondary-50 px-3 py-1 text-xs font-medium text-secondary-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Section grid ── */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-secondary-400">
          Demo Sections
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SECTIONS.map(({ href, icon: Icon, title, description, count, accent }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-xl border border-secondary-200 bg-white p-5 shadow-sm transition-all duration-150 hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {/* Icon */}
              <span
                className={[
                  "mb-4 flex h-10 w-10 items-center justify-center rounded-lg border",
                  accent,
                ].join(" ")}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>

              {/* Title */}
              <h3 className="text-base font-semibold text-secondary-900 group-hover:text-primary-700 transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 flex-1 text-sm text-secondary-500 leading-relaxed">
                {description}
              </p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary-400">
                  {count}
                </span>
                <ArrowRightIcon
                  className="w-4 h-4 text-secondary-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary-500"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* ── Quick-start callout ── */}
        <div className="mt-10 rounded-xl border border-primary-100 bg-primary-50 px-6 py-5">
          <p className="text-sm font-semibold text-primary-800">Quick import</p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-primary-900 px-4 py-3 text-xs text-primary-100">
            <code>{`import { Button, ProductCard, DataTable, PCBuildSummary } from "@/components";`}</code>
          </pre>
          <p className="mt-2 text-xs text-primary-600">
            All 53 components are re-exported from the single barrel file{" "}
            <code className="rounded bg-primary-100 px-1 py-0.5 font-mono text-[10px]">
              src/components/index.ts
            </code>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
