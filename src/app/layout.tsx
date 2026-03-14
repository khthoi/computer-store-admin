import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    template: "%s | PC Store",
    default: "PC Store — Computer & Hardware Retail",
  },
  description:
    "Shop CPUs, GPUs, motherboards, memory, storage, and complete PC builds. Fast shipping, expert support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
