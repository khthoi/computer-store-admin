import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// ─── Token data (mirrors globals.css @theme + design-tokens.ts) ───────────────

const COLOR_SCALES = [
  {
    name: "Primary",
    description: "Brand Blue — CTAs, links, focus rings",
    token: "primary",
    shades: [
      { shade: "50",  hex: "#eff6ff", dark: false },
      { shade: "100", hex: "#dbeafe", dark: false },
      { shade: "200", hex: "#bfdbfe", dark: false },
      { shade: "300", hex: "#93c5fd", dark: false },
      { shade: "400", hex: "#60a5fa", dark: false },
      { shade: "500", hex: "#3b82f6", dark: true  },
      { shade: "600", hex: "#2563eb", dark: true  },
      { shade: "700", hex: "#1d4ed8", dark: true  },
      { shade: "800", hex: "#1e40af", dark: true  },
      { shade: "900", hex: "#1e3a8f", dark: true  },
      { shade: "950", hex: "#172554", dark: true  },
    ],
  },
  {
    name: "Secondary",
    description: "Slate — text hierarchy, borders, surfaces",
    token: "secondary",
    shades: [
      { shade: "50",  hex: "#f8fafc", dark: false },
      { shade: "100", hex: "#f1f5f9", dark: false },
      { shade: "200", hex: "#e2e8f0", dark: false },
      { shade: "300", hex: "#cbd5e1", dark: false },
      { shade: "400", hex: "#94a3b8", dark: false },
      { shade: "500", hex: "#64748b", dark: true  },
      { shade: "600", hex: "#475569", dark: true  },
      { shade: "700", hex: "#334155", dark: true  },
      { shade: "800", hex: "#1e293b", dark: true  },
      { shade: "900", hex: "#0f172a", dark: true  },
      { shade: "950", hex: "#020617", dark: true  },
    ],
  },
  {
    name: "Accent",
    description: "Violet — premium badges, featured labels",
    token: "accent",
    shades: [
      { shade: "50",  hex: "#f5f3ff", dark: false },
      { shade: "100", hex: "#ede9fe", dark: false },
      { shade: "200", hex: "#ddd6fe", dark: false },
      { shade: "300", hex: "#c4b5fd", dark: false },
      { shade: "400", hex: "#a78bfa", dark: false },
      { shade: "500", hex: "#8b5cf6", dark: true  },
      { shade: "600", hex: "#7c3aed", dark: true  },
      { shade: "700", hex: "#6d28d9", dark: true  },
      { shade: "800", hex: "#5b21b6", dark: true  },
      { shade: "900", hex: "#4c1d95", dark: true  },
      { shade: "950", hex: "#2e1065", dark: true  },
    ],
  },
  {
    name: "Success",
    description: "Green — in stock, order complete, confirmations",
    token: "success",
    shades: [
      { shade: "50",  hex: "#f0fdf4", dark: false },
      { shade: "100", hex: "#dcfce7", dark: false },
      { shade: "200", hex: "#bbf7d0", dark: false },
      { shade: "300", hex: "#86efac", dark: false },
      { shade: "400", hex: "#4ade80", dark: false },
      { shade: "500", hex: "#22c55e", dark: true  },
      { shade: "600", hex: "#16a34a", dark: true  },
      { shade: "700", hex: "#15803d", dark: true  },
      { shade: "800", hex: "#166534", dark: true  },
      { shade: "900", hex: "#14532d", dark: true  },
      { shade: "950", hex: "#052e16", dark: true  },
    ],
  },
  {
    name: "Warning",
    description: "Amber — low stock, pending, caution states",
    token: "warning",
    shades: [
      { shade: "50",  hex: "#fffbeb", dark: false },
      { shade: "100", hex: "#fef3c7", dark: false },
      { shade: "200", hex: "#fde68a", dark: false },
      { shade: "300", hex: "#fcd34d", dark: false },
      { shade: "400", hex: "#fbbf24", dark: false },
      { shade: "500", hex: "#f59e0b", dark: false },
      { shade: "600", hex: "#d97706", dark: true  },
      { shade: "700", hex: "#b45309", dark: true  },
      { shade: "800", hex: "#92400e", dark: true  },
      { shade: "900", hex: "#78350f", dark: true  },
      { shade: "950", hex: "#451a03", dark: true  },
    ],
  },
  {
    name: "Error",
    description: "Red — out of stock, errors, destructive actions",
    token: "error",
    shades: [
      { shade: "50",  hex: "#fef2f2", dark: false },
      { shade: "100", hex: "#fee2e2", dark: false },
      { shade: "200", hex: "#fecaca", dark: false },
      { shade: "300", hex: "#fca5a5", dark: false },
      { shade: "400", hex: "#f87171", dark: false },
      { shade: "500", hex: "#ef4444", dark: true  },
      { shade: "600", hex: "#dc2626", dark: true  },
      { shade: "700", hex: "#b91c1c", dark: true  },
      { shade: "800", hex: "#991b1b", dark: true  },
      { shade: "900", hex: "#7f1d1d", dark: true  },
      { shade: "950", hex: "#450a0a", dark: true  },
    ],
  },
  {
    name: "Info",
    description: "Cyan — informational banners, tooltips, help",
    token: "info",
    shades: [
      { shade: "50",  hex: "#ecfeff", dark: false },
      { shade: "100", hex: "#cffafe", dark: false },
      { shade: "200", hex: "#a5f3fc", dark: false },
      { shade: "300", hex: "#67e8f9", dark: false },
      { shade: "400", hex: "#22d3ee", dark: false },
      { shade: "500", hex: "#06b6d4", dark: true  },
      { shade: "600", hex: "#0891b2", dark: true  },
      { shade: "700", hex: "#0e7490", dark: true  },
      { shade: "800", hex: "#155e75", dark: true  },
      { shade: "900", hex: "#164e63", dark: true  },
      { shade: "950", hex: "#083344", dark: true  },
    ],
  },
] as const;

const TYPE_SCALE = [
  { name: "5xl", size: "3rem",    px: "48px", weight: "700", usage: "Hero display, marketing splash" },
  { name: "4xl", size: "2.25rem", px: "36px", weight: "700", usage: "Hero headings, page titles" },
  { name: "3xl", size: "1.875rem",px: "30px", weight: "700", usage: "Section titles, category names" },
  { name: "2xl", size: "1.5rem",  px: "24px", weight: "700", usage: "Price display, card headings" },
  { name: "xl",  size: "1.25rem", px: "20px", weight: "600", usage: "Product names, section labels" },
  { name: "lg",  size: "1.125rem",px: "18px", weight: "400", usage: "Lead paragraphs, card subheadings" },
  { name: "base",size: "1rem",    px: "16px", weight: "400", usage: "Body text, product descriptions" },
  { name: "sm",  size: "0.875rem",px: "14px", weight: "400", usage: "Secondary text, labels, table cells" },
  { name: "xs",  size: "0.75rem", px: "12px", weight: "500", usage: "Badges, captions, timestamps, meta" },
] as const;

const SPACING_SCALE = [
  { token: "1",  px: "4px",   cls: "w-1"  },
  { token: "2",  px: "8px",   cls: "w-2"  },
  { token: "3",  px: "12px",  cls: "w-3"  },
  { token: "4",  px: "16px",  cls: "w-4"  },
  { token: "5",  px: "20px",  cls: "w-5"  },
  { token: "6",  px: "24px",  cls: "w-6"  },
  { token: "8",  px: "32px",  cls: "w-8"  },
  { token: "10", px: "40px",  cls: "w-10" },
  { token: "12", px: "48px",  cls: "w-12" },
  { token: "16", px: "64px",  cls: "w-16" },
  { token: "20", px: "80px",  cls: "w-20" },
  { token: "24", px: "96px",  cls: "w-24" },
] as const;

const SHADOW_SCALE = [
  { name: "xs",    css: "0 1px 2px rgba(0,0,0,0.04)",                                                    usage: "Subtle lift, action chips" },
  { name: "sm",    css: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",                        usage: "Input fields, small cards" },
  { name: "md",    css: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",                        usage: "Dropdowns, nav bars" },
  { name: "lg",    css: "0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)",                      usage: "Floating panels, popovers" },
  { name: "xl",    css: "0 20px 25px rgba(0,0,0,0.08), 0 8px 10px rgba(0,0,0,0.03)",                     usage: "Card hover state" },
  { name: "2xl",   css: "0 25px 50px rgba(0,0,0,0.12)",                                                  usage: "Drawers, sidebars" },
  { name: "modal", css: "0 25px 50px rgba(0,0,0,0.20), 0 12px 24px rgba(0,0,0,0.10)",                    usage: "Modal dialogs" },
] as const;

const RADIUS_SCALE = [
  { name: "none", px: "0px",    cls: "rounded-none", usage: "Tables, full-bleed images" },
  { name: "sm",   px: "4px",    cls: "rounded-sm",   usage: "Tooltips, small chips, micro-badges" },
  { name: "",     px: "8px",    cls: "rounded",      usage: "Buttons, inputs, dropdowns (default)" },
  { name: "md",   px: "12px",   cls: "rounded-md",   usage: "Cards, product panels" },
  { name: "lg",   px: "16px",   cls: "rounded-lg",   usage: "Modals, drawers, large panels" },
  { name: "xl",   px: "20px",   cls: "rounded-xl",   usage: "Feature cards, marketing blocks" },
  { name: "2xl",  px: "24px",   cls: "rounded-2xl",  usage: "Hero cards, large sections" },
  { name: "full", px: "9999px", cls: "rounded-full", usage: "Badges, pills, avatars, toggles" },
] as const;

// ─── Sub-section wrapper ──────────────────────────────────────────────────────

function Section({ title, description, children }: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-secondary-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-secondary-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignTokensPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            href="/ui-demo"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Back to showcase
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">Design Tokens</h1>
          <p className="mt-2 text-secondary-500">
            All colors, typography, spacing, shadows, and border radii defined in{" "}
            <code className="rounded bg-secondary-100 px-1.5 py-0.5 text-xs font-mono text-secondary-700">
              globals.css @theme
            </code>{" "}
            and mirrored in{" "}
            <code className="rounded bg-secondary-100 px-1.5 py-0.5 text-xs font-mono text-secondary-700">
              src/lib/design-tokens.ts
            </code>
            .
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* ── 1. Color Palette ── */}
        <Section
          title="Color Palette"
          description="7 semantic scales. Use Tailwind utilities: bg-primary-600, text-error-700, border-success-200, etc."
        >
          <div className="space-y-8">
            {COLOR_SCALES.map((scale) => (
              <div key={scale.name}>
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-secondary-800">{scale.name}</span>
                  <span className="text-xs text-secondary-400">{scale.description}</span>
                </div>
                <div className="flex overflow-hidden rounded-xl border border-secondary-200 shadow-sm">
                  {scale.shades.map((s) => (
                    <div
                      key={s.shade}
                      className="flex-1 group relative"
                      style={{ backgroundColor: s.hex }}
                    >
                      {/* Hover tooltip */}
                      <div
                        className={[
                          "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                          "bg-black/20",
                        ].join(" ")}
                      >
                        <span
                          className="text-[10px] font-bold leading-none"
                          style={{ color: s.dark ? "#fff" : "#000" }}
                        >
                          {s.shade}
                        </span>
                        <span
                          className="mt-1 text-[9px] font-mono leading-none"
                          style={{ color: s.dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)" }}
                        >
                          {s.hex}
                        </span>
                      </div>
                      {/* Default label */}
                      <div className="h-14 flex items-end justify-center pb-1.5 group-hover:invisible">
                        <span
                          className="text-[9px] font-semibold"
                          style={{ color: s.dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)" }}
                        >
                          {s.shade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Token class samples */}
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["50", "100", "500", "600", "700", "900"].map((shade) => (
                    <code
                      key={shade}
                      className="rounded bg-secondary-100 px-1.5 py-0.5 text-[10px] font-mono text-secondary-600"
                    >
                      {`bg-${scale.token}-${shade}`}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 2. Typography Scale ── */}
        <Section
          title="Typography Scale"
          description="Font: Inter (storefront) — 9 size steps from text-xs (12px) to text-5xl (48px)."
        >
          <div className="overflow-hidden rounded-xl border border-secondary-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-secondary-200">
                <tr>
                  {["Class", "Size", "px", "Weight", "Sample", "Usage"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {TYPE_SCALE.map((row) => (
                  <tr key={row.name} className="hover:bg-secondary-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <code className="rounded bg-primary-50 px-1.5 py-0.5 text-xs font-mono text-primary-700">
                        text-{row.name}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-secondary-500">{row.size}</td>
                    <td className="px-4 py-3 text-xs font-mono text-secondary-500">{row.px}</td>
                    <td className="px-4 py-3 text-xs text-secondary-500">{row.weight}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-secondary-900 leading-tight"
                        style={{ fontSize: row.size, fontWeight: Number(row.weight), lineHeight: 1.2 }}
                      >
                        PC Store
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-secondary-400">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Font weight reference */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { weight: "400", name: "Regular", cls: "font-normal" },
              { weight: "500", name: "Medium",  cls: "font-medium" },
              { weight: "600", name: "Semibold",cls: "font-semibold" },
              { weight: "700", name: "Bold",    cls: "font-bold" },
            ].map((w) => (
              <div
                key={w.weight}
                className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-white px-4 py-5 text-center shadow-sm"
              >
                <span
                  className="text-2xl text-secondary-900"
                  style={{ fontWeight: Number(w.weight) }}
                >
                  Ag
                </span>
                <span className="mt-2 text-xs font-semibold text-secondary-700">{w.name}</span>
                <code className="mt-1 rounded bg-secondary-100 px-1.5 py-0.5 text-[10px] font-mono text-secondary-500">
                  {w.cls}
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 3. Spacing Scale ── */}
        <Section
          title="Spacing Scale"
          description="4px base unit. Use p-4, m-6, gap-3, w-10, h-12, etc. — all generated from --spacing-* tokens."
        >
          <div className="overflow-hidden rounded-xl border border-secondary-200 bg-white shadow-sm">
            <div className="divide-y divide-secondary-100">
              {SPACING_SCALE.map((row) => (
                <div key={row.token} className="flex items-center gap-4 px-5 py-3">
                  <code className="w-16 shrink-0 rounded bg-primary-50 px-1.5 py-0.5 text-center text-xs font-mono text-primary-700">
                    p-{row.token}
                  </code>
                  <span className="w-10 shrink-0 text-xs font-mono text-secondary-400">{row.px}</span>
                  <div className="flex-1">
                    <div
                      className="h-4 rounded bg-primary-400"
                      style={{ width: row.px }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 4. Shadow Scale ── */}
        <Section
          title="Shadow Scale"
          description="7 elevation levels from shadow-xs (barely visible) to shadow-modal (dialog-level depth)."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SHADOW_SCALE.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-8"
                style={{ boxShadow: s.css }}
              >
                <span className="text-sm font-semibold text-secondary-800">
                  shadow-{s.name}
                </span>
                <span className="mt-1 text-center text-xs text-secondary-400">{s.usage}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 5. Border Radius ── */}
        <Section
          title="Border Radius"
          description="8 radius steps. Default (8px) for inputs/buttons; rounded-md (12px) for cards; rounded-full for badges."
        >
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {RADIUS_SCALE.map((r) => (
              <div key={r.cls} className="flex flex-col items-center gap-3 rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
                <div
                  className="h-16 w-16 border-2 border-primary-400 bg-primary-50"
                  style={{ borderRadius: r.px }}
                />
                <div className="text-center">
                  <code className="rounded bg-secondary-100 px-1.5 py-0.5 text-xs font-mono text-secondary-700">
                    {r.cls}
                  </code>
                  <p className="mt-1 text-xs font-semibold text-secondary-600">
                    {r.px}
                    {r.name && ` · rounded-${r.name}`}
                  </p>
                  <p className="mt-0.5 text-[10px] text-secondary-400">{r.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 6. Semantic CSS Vars ── */}
        <Section
          title="Semantic Variables"
          description="Named :root vars that map tokens to intent. Used in @layer components — change theme in one place."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { var: "--page-bg",          value: "#f8fafc",  usage: "Page background" },
              { var: "--surface",          value: "#ffffff",  usage: "Card / panel surface" },
              { var: "--text-primary",     value: "#0f172a",  usage: "Headings, max emphasis" },
              { var: "--text-body",        value: "#334155",  usage: "Body text" },
              { var: "--text-muted",       value: "#64748b",  usage: "Secondary text, labels" },
              { var: "--text-link",        value: "#2563eb",  usage: "Anchor / link color" },
              { var: "--border",           value: "#e2e8f0",  usage: "Dividers, card borders" },
              { var: "--price-color",      value: "#2563eb",  usage: "Price display" },
              { var: "--btn-primary-bg",   value: "#2563eb",  usage: "Primary CTA button" },
              { var: "--input-border",     value: "#cbd5e1",  usage: "Input default border" },
              { var: "--card-radius",      value: "12px",     usage: "Product card radius" },
              { var: "--nav-height",       value: "64px",     usage: "Sticky nav height" },
            ].map((v) => (
              <div
                key={v.var}
                className="flex items-start gap-3 rounded-lg border border-secondary-200 bg-white px-4 py-3 shadow-sm"
              >
                <div
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-secondary-200"
                  style={{ backgroundColor: v.value.startsWith("#") ? v.value : "#e2e8f0" }}
                />
                <div className="min-w-0">
                  <code className="block text-[11px] font-mono text-primary-700 truncate">{v.var}</code>
                  <code className="block text-[10px] font-mono text-secondary-400">{v.value}</code>
                  <p className="mt-0.5 text-[10px] text-secondary-500">{v.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-secondary-200 pt-8">
          <Link
            href="/ui-demo"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Back to showcase
          </Link>
          <Link
            href="/ui-demo/buttons"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next: Buttons &amp; Actions
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
