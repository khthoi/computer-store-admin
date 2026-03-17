import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { SideBanners } from "@/src/components/layout/SideBanners";

/**
 * CUSTOMER STOREFRONT — Root Layout
 *
 * Font strategy:
 *   Inter           → --font-inter  → picked up by --font-sans in globals.css
 *   JetBrains Mono  → --font-jetbrains-mono → picked up by --font-mono
 *
 * Both fonts are subset to latin and optimized via Next.js font system
 * (zero layout shift, self-hosted on the same origin).
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  // Load weight variants needed by the design system
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  // Weights used for spec labels, SKUs, monospace code
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TechStore",
    default: "TechStore — Linh Kiện Máy Tính Chính Hãng",
  },
  description:
    "Mua CPU, GPU, RAM, SSD, laptop gaming và linh kiện máy tính chính hãng. Giao hàng toàn quốc, bảo hành 24 tháng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-secondary-50">
        {/*
         * Header — sticky top bar + main header + category navbar.
         * Pass cartCount and user from your auth/cart context here
         * once those are wired up, e.g.:
         *   cartCount={session?.cartCount}
         *   user={session?.user ?? null}
         */}
        <Header cartCount={2} wishlistCount={2} compareCount={2} user={null} />

        {/*
         * 3-column grid at 2xl+ (≥ 1536 px):
         *   [240px side banner] [1fr main content] [240px side banner]
         *
         * SideBanners renders two <aside> fragments with explicit col-start-1
         * and col-start-3 so CSS Grid places them correctly despite DOM order.
         * <main> takes col-start-2 (the 1fr center column).
         *
         * Below 2xl: SideBanners children are hidden (display:none), the grid
         * declaration is inactive, and <main> fills the full viewport width.
         */}
        <div className="2xl:grid 2xl:grid-cols-[240px_1fr_240px]">
          <SideBanners />

          <main
            id="main-content"
            className="min-h-[calc(100vh-theme(spacing.40))] 2xl:col-start-2 min-w-0"
          >
            {children}
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
