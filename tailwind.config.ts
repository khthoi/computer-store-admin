/**
 * ONLINE PC STORE — CUSTOMER STOREFRONT
 * Tailwind CSS v4 Design System Configuration
 *
 * ─── USAGE IN TAILWIND v4 ──────────────────────────────────────────────────
 * This file is the JS/TS reference for the design system. To activate it,
 * add the following directive at the top of your globals.css:
 *
 *   @config "./tailwind.config.ts";
 *
 * Alternatively, all tokens are defined via CSS @theme in globals.css
 * (the recommended v4 approach), which takes precedence over this file.
 * ───────────────────────────────────────────────────────────────────────────
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    // ── BREAKPOINTS ──────────────────────────────────────────────────────────
    screens: {
      sm: "640px",   // Mobile landscape / small tablet
      md: "768px",   // Tablet portrait
      lg: "1024px",  // Tablet landscape / small desktop
      xl: "1280px",  // Desktop
      "2xl": "1536px", // Wide desktop
    },

    extend: {
      // ── COLOR PALETTE ───────────────────────────────────────────────────────
      colors: {
        /**
         * PRIMARY — Brand Blue
         * Used for: CTAs, links, focus rings, interactive elements
         * Example: bg-primary-600 (primary button), text-primary-600 (link)
         */
        primary: {
          50:  "#eff6ff", // Lightest tint — hover backgrounds, subtle highlights
          100: "#dbeafe", // Light tint — focus rings, selected states
          200: "#bfdbfe", // Soft blue — active pill backgrounds
          300: "#93c5fd", // Medium light — disabled button text
          400: "#60a5fa", // Medium — secondary button borders
          500: "#3b82f6", // Core brand blue — icons, accents
          600: "#2563eb", // Primary CTA background (default button)
          700: "#1d4ed8", // Hover state for primary button
          800: "#1e40af", // Active/pressed primary button
          900: "#1e3a8f", // Dark emphasis — high-contrast text on light bg
          950: "#172554", // Darkest — footer text, deep emphasis
        },

        /**
         * SECONDARY — Slate
         * Used for: text hierarchy, borders, backgrounds, neutral surfaces
         * Example: text-secondary-700 (body text), bg-secondary-50 (page bg)
         */
        secondary: {
          50:  "#f8fafc", // Page background
          100: "#f1f5f9", // Card background, section fills
          200: "#e2e8f0", // Borders, dividers
          300: "#cbd5e1", // Disabled borders, placeholder borders
          400: "#94a3b8", // Placeholder text, muted icons
          500: "#64748b", // Secondary text, meta info
          600: "#475569", // Supporting text, labels
          700: "#334155", // Body text (primary reading content)
          800: "#1e293b", // Headings, strong emphasis
          900: "#0f172a", // Page titles, highest contrast text
          950: "#020617", // Near-black — reserved for max contrast
        },

        /**
         * ACCENT — Violet
         * Used for: admin interface elements, premium badges, highlights
         * Example: bg-accent-600 (admin nav), text-accent-500 (featured label)
         */
        accent: {
          50:  "#f5f3ff", // Lightest violet — admin sidebar bg
          100: "#ede9fe", // Soft violet — admin hover states
          200: "#ddd6fe", // Light violet — admin active backgrounds
          300: "#c4b5fd", // Medium light — admin borders
          400: "#a78bfa", // Medium — admin icons
          500: "#8b5cf6", // Core violet — admin highlights
          600: "#7c3aed", // Admin primary action (button bg)
          700: "#6d28d9", // Admin hover state
          800: "#5b21b6", // Admin active/pressed
          900: "#4c1d95", // Admin dark emphasis
          950: "#2e1065", // Admin deepest accent
        },

        /**
         * SUCCESS — Green
         * Used for: in-stock status, completed orders, payment success, confirmations
         * Example: text-success-600 (in stock label), bg-success-50 (success banner)
         */
        success: {
          50:  "#f0fdf4", // Success banner background
          100: "#dcfce7", // Success badge background
          200: "#bbf7d0", // Success border
          300: "#86efac", // Success icon light
          400: "#4ade80", // Success icon
          500: "#22c55e", // Core success — status dots
          600: "#16a34a", // Success text on white
          700: "#15803d", // Success text hover
          800: "#166534", // Success strong emphasis
          900: "#14532d", // Success high contrast
          950: "#052e16", // Success deepest
        },

        /**
         * WARNING — Amber
         * Used for: low stock alerts, pending status, expiring promotions, caution
         * Example: text-warning-700 (low stock), bg-warning-50 (warning banner)
         */
        warning: {
          50:  "#fffbeb", // Warning banner background
          100: "#fef3c7", // Warning badge background
          200: "#fde68a", // Warning border
          300: "#fcd34d", // Warning icon light
          400: "#fbbf24", // Warning icon
          500: "#f59e0b", // Core warning — status dots
          600: "#d97706", // Warning text on white
          700: "#b45309", // Warning text hover
          800: "#92400e", // Warning strong emphasis
          900: "#78350f", // Warning high contrast
          950: "#451a03", // Warning deepest
        },

        /**
         * ERROR — Red
         * Used for: payment failures, out-of-stock, form validation errors, destructive actions
         * Example: text-error-600 (error message), bg-error-50 (error banner)
         */
        error: {
          50:  "#fef2f2", // Error banner background
          100: "#fee2e2", // Error badge background
          200: "#fecaca", // Error border
          300: "#fca5a5", // Error icon light
          400: "#f87171", // Error icon
          500: "#ef4444", // Core error — status dots
          600: "#dc2626", // Error text on white
          700: "#b91c1c", // Error text hover
          800: "#991b1b", // Error strong emphasis
          900: "#7f1d1d", // Error high contrast
          950: "#450a0a", // Error deepest
        },

        /**
         * INFO — Cyan
         * Used for: informational banners, tooltips, help text, neutral notifications
         * Example: text-info-600 (info message), bg-info-50 (info banner)
         */
        info: {
          50:  "#ecfeff", // Info banner background
          100: "#cffafe", // Info badge background
          200: "#a5f3fc", // Info border
          300: "#67e8f9", // Info icon light
          400: "#22d3ee", // Info icon
          500: "#06b6d4", // Core info — status dots
          600: "#0891b2", // Info text on white
          700: "#0e7490", // Info text hover
          800: "#155e75", // Info strong emphasis
          900: "#164e63", // Info high contrast
          950: "#083344", // Info deepest
        },
      },

      // ── TYPOGRAPHY ──────────────────────────────────────────────────────────
      fontFamily: {
        /**
         * sans — Customer Storefront (Inter)
         * Loaded via Next.js font optimization in layout.tsx
         * CSS var: --font-sans → set to --font-inter
         */
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],

        /**
         * mono — Specs, code, SKU numbers (JetBrains Mono)
         * CSS var: --font-mono → set to --font-jetbrains-mono
         */
        mono: ["var(--font-mono)", "JetBrains Mono", "Menlo", "monospace"],
      },

      fontSize: {
        /**
         * Type scale — 4px base unit, modular scale
         * Format: [size, { lineHeight, letterSpacing }]
         */
        xs:   ["0.75rem",  { lineHeight: "1rem",    letterSpacing: "0.025em"  }], // 12px — badges, captions, meta
        sm:   ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em"   }], // 14px — labels, helper text, secondary
        base: ["1rem",     { lineHeight: "1.5rem",  letterSpacing: "0em"      }], // 16px — body text, descriptions
        lg:   ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.005em" }], // 18px — lead paragraphs, card titles
        xl:   ["1.25rem",  { lineHeight: "1.75rem", letterSpacing: "-0.01em"  }], // 20px — product names, section labels
        "2xl":["1.5rem",   { lineHeight: "2rem",    letterSpacing: "-0.015em" }], // 24px — price display, card headings
        "3xl":["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em"  }], // 30px — page section titles
        "4xl":["2.25rem",  { lineHeight: "2.5rem",  letterSpacing: "-0.025em" }], // 36px — hero headings
        "5xl":["3rem",     { lineHeight: "1.1",     letterSpacing: "-0.03em"  }], // 48px — hero display text
      },

      fontWeight: {
        regular:  "400", // Body text, descriptions, secondary info
        medium:   "500", // Labels, nav items, table headers
        semibold: "600", // Product names, CTA labels, card titles
        bold:     "700", // Prices, primary headings, emphasis
      },

      // ── SPACING SCALE (4px base unit) ───────────────────────────────────────
      spacing: {
        /**
         * Base numeric scale — all values are multiples of 4px (0.25rem)
         * Tailwind's default scale covers most of these; extensions below
         * add semantic aliases and larger values used in layout.
         */
        "section-gap": "80px",   // Between major page sections (space-20)
        "card-padding": "24px",  // Internal card padding (space-6)
        "form-gap":     "16px",  // Between form fields (space-4)
        "sidebar-width":"280px", // Admin & filter sidebar width
      },

      // ── BORDER RADIUS ───────────────────────────────────────────────────────
      borderRadius: {
        /**
         * Usage rules:
         *   none  (0)    → Tables, full-bleed images
         *   sm    (4px)  → Tooltips, small tags
         *   DEFAULT(8px) → Buttons, input fields, dropdowns
         *   md    (12px) → Cards, panels
         *   lg    (16px) → Modals, drawers
         *   xl    (20px) → Feature cards, large panels
         *   2xl   (24px) → Hero cards, marketing blocks
         *   full  (9999px) → Badges, pills, avatars, toggle switches
         */
        none:    "0px",
        sm:      "4px",
        DEFAULT: "8px",
        md:      "12px",
        lg:      "16px",
        xl:      "20px",
        "2xl":   "24px",
        full:    "9999px",
      },

      // ── SHADOW SCALE ────────────────────────────────────────────────────────
      boxShadow: {
        /**
         * Layered shadow system — each level uses 2 shadows for depth realism.
         * Opacity values are intentionally subtle to work on both white and
         * off-white backgrounds without feeling harsh.
         */
        xs:    "0 1px 2px rgba(0,0,0,0.04)",
        sm:    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        md:    "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",
        lg:    "0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)",
        xl:    "0 20px 25px rgba(0,0,0,0.08), 0 8px 10px rgba(0,0,0,0.03)",
        "2xl": "0 25px 50px rgba(0,0,0,0.12)",
        // Semantic aliases
        card:  "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",     // Product card default
        "card-hover": "0 20px 25px rgba(0,0,0,0.08), 0 8px 10px rgba(0,0,0,0.03)", // Product card hovered
        modal: "0 25px 50px rgba(0,0,0,0.20), 0 12px 24px rgba(0,0,0,0.10)", // Modal overlay shadow
        input: "0 0 0 3px rgba(37,99,235,0.15)",                              // Input focus ring
        none:  "none",
      },
    },
  },

  plugins: [],
};

export default config;
