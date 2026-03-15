import Link from "next/link";

// ─── Social icon SVGs ─────────────────────────────────────────────────────────

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// ─── Payment icon SVG (generic card shape) ────────────────────────────────────

function PaymentBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded border border-secondary-700 px-2 py-0.5 text-[10px] font-bold tracking-wide",
        color,
      ].join(" ")}
      aria-label={`Thanh toán qua ${label}`}
    >
      {label}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUPPORT_LINKS = [
  { label: "Hướng dẫn mua hàng",   href: "/huong-dan-mua-hang" },
  { label: "Chính sách bảo hành",   href: "/chinh-sach-bao-hanh" },
  { label: "Chính sách đổi trả",    href: "/chinh-sach-doi-tra" },
  { label: "Câu hỏi thường gặp",    href: "/faq" },
  { label: "Tra cứu đơn hàng",      href: "/orders/track" },
  { label: "Hỗ trợ kỹ thuật",       href: "/support/technical" },
];

const CATEGORY_LINKS = [
  { label: "Laptop",      href: "/products/laptop" },
  { label: "PC Gaming",   href: "/products/pc-gaming" },
  { label: "CPU",         href: "/products/cpu" },
  { label: "GPU",         href: "/products/gpu" },
  { label: "RAM",         href: "/products/ram" },
  { label: "SSD",         href: "/products/ssd" },
  { label: "Màn Hình",    href: "/products/man-hinh" },
  { label: "Bàn Phím",    href: "/products/ban-phim" },
  { label: "Chuột",       href: "/products/chuot" },
  { label: "Tai Nghe",    href: "/products/tai-nghe" },
];

const COMPANY_LINKS = [
  { label: "Về chúng tôi",    href: "/about" },
  { label: "Tuyển dụng",      href: "/careers" },
  { label: "Blog & Tin tức",  href: "/blog" },
  { label: "Liên hệ",         href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com", Icon: FacebookIcon,  hoverClass: "hover:text-blue-400" },
  { label: "YouTube",   href: "https://youtube.com",  Icon: YouTubeIcon,   hoverClass: "hover:text-red-400" },
  { label: "TikTok",    href: "https://tiktok.com",   Icon: TikTokIcon,    hoverClass: "hover:text-secondary-100" },
];

const PAYMENT_METHODS = [
  { label: "VISA",        color: "text-blue-400" },
  { label: "Mastercard",  color: "text-orange-400" },
  { label: "MoMo",        color: "text-pink-400" },
  { label: "VNPay",       color: "text-blue-300" },
  { label: "COD",         color: "text-green-400" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-sm text-secondary-400 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

/**
 * Footer — storefront site footer.
 *
 * Layout:
 *   - 4-column grid (desktop) / 2-col (tablet) / 1-col (mobile)
 *   - Bottom strip: copyright + payment method badges
 *
 * This is a Server Component (no interactivity needed).
 */
export function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-400">

      {/* ── Main footer grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Column 1: Store info ── */}
          <div>
            {/* Logo */}
            <Link href="/" className="mb-4 flex items-center gap-2 focus-visible:outline-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-extrabold">
                PC
              </div>
              <span className="text-base font-extrabold text-white">
                Tech<span className="text-primary-400">Store</span>
              </span>
            </Link>

            <p className="mb-5 text-sm leading-relaxed">
              Cửa hàng linh kiện máy tính & laptop chính hãng. Đa dạng sản phẩm từ CPU,
              GPU, RAM, SSD đến laptop gaming và phụ kiện công nghệ.
            </p>

            {/* Company links */}
            <FooterHeading>Công ty</FooterHeading>
            <ul className="flex flex-col gap-2">
              {COMPANY_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Column 2: Customer support ── */}
          <div>
            <FooterHeading>Hỗ trợ khách hàng</FooterHeading>
            <ul className="flex flex-col gap-2">
              {SUPPORT_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>

            {/* Hotline callout */}
            <div className="mt-6 rounded-lg border border-secondary-700 bg-secondary-800 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400 mb-1">
                Hotline hỗ trợ
              </p>
              <a
                href="tel:19001234"
                className="text-xl font-bold text-white hover:text-primary-400 transition-colors"
              >
                1900 1234
              </a>
              <p className="mt-0.5 text-xs text-secondary-500">
                Thứ 2 – Thứ 7, 8:00 – 21:00
              </p>
            </div>
          </div>

          {/* ── Column 3: Product categories ── */}
          <div>
            <FooterHeading>Danh mục sản phẩm</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
              {CATEGORY_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact & social ── */}
          <div>
            <FooterHeading>Liên hệ</FooterHeading>

            <address className="not-italic flex flex-col gap-3 text-sm mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-0.5">Địa chỉ</p>
                <p>123 Nguyễn Văn Linh, Q.7</p>
                <p>TP. Hồ Chí Minh</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-0.5">Hotline</p>
                <a href="tel:19001234" className="text-white hover:text-primary-400 transition-colors font-medium">
                  1900 1234
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-0.5">Email</p>
                <a href="mailto:support@techstore.vn" className="hover:text-white transition-colors">
                  support@techstore.vn
                </a>
              </div>
            </address>

            {/* Social */}
            <FooterHeading>Theo dõi chúng tôi</FooterHeading>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full border border-secondary-700 text-secondary-400 transition-colors hover:border-secondary-500",
                    hoverClass,
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Certificates */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary-500">
                Chứng nhận
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] text-secondary-500">
                <span className="rounded border border-secondary-700 px-2 py-0.5">DMCA Protected</span>
                <span className="rounded border border-secondary-700 px-2 py-0.5">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="border-t border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-xs text-secondary-500">
            © {new Date().getFullYear()} TechStore Vietnam. All rights reserved. &nbsp;
            <Link href="/privacy" className="hover:text-secondary-300 transition-colors">Chính sách bảo mật</Link>
            &nbsp;·&nbsp;
            <Link href="/terms" className="hover:text-secondary-300 transition-colors">Điều khoản dịch vụ</Link>
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center gap-1.5" aria-label="Phương thức thanh toán">
            {PAYMENT_METHODS.map(({ label, color }) => (
              <PaymentBadge key={label} label={label} color={color} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
