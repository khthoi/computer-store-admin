"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  StarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Alert,
  Badge,
  Spinner,
  SpinnerOverlay,
  Avatar,
  AvatarGroup,
  Skeleton,
  Modal,
  Drawer,
  Tooltip,
  Popover,
  Accordion,
  Tabs,
  TabPanel,
  Button,
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [animatedOpen, setAnimatedOpen] = useState(false);

  // Drawer state
  const [rightDrawer, setRightDrawer]   = useState(false);
  const [leftDrawer, setLeftDrawer]     = useState(false);
  const [bottomDrawer, setBottomDrawer] = useState(false);

  // SpinnerOverlay state
  const [overlayOn, setOverlayOn] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-50">
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
          <h1 className="text-3xl font-bold text-secondary-900">Feedback &amp; Overlays</h1>
          <p className="mt-2 text-secondary-500">
            Alert · Badge · Spinner · Avatar · Skeleton · Modal · Drawer · Tooltip · Popover · Accordion · Tabs
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">

        {/* ── 1. Alert ── */}
        <Section title="Alert" description="Inline notification banners with 4 semantic variants, optional title, dismiss button, and custom icon.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <SubLabel>All 4 variants</SubLabel>
              <div className="space-y-3">
                <Alert variant="info"    title="Did you know?">Free shipping on orders over 500,000₫ to HCM City.</Alert>
                <Alert variant="success" title="Order confirmed!">Your order #DH-2024001 has been placed successfully.</Alert>
                <Alert variant="warning" title="Low stock">Only 3 units of ASUS ROG Strix B650 remaining.</Alert>
                <Alert variant="error"   title="Payment failed">Your Visa card ending in 4242 was declined. Please try another card.</Alert>
              </div>
            </Card>

            <Card>
              <SubLabel>Dismissible + no icon + no title</SubLabel>
              <div className="space-y-3">
                <Alert variant="info" dismissible title="New arrival">
                  Intel Core i9-14900KS is now in stock. Limited units available.
                </Alert>
                <Alert variant="success" dismissible>
                  Your wishlist item MSI RTX 4090 is now on sale — 15% off today only.
                </Alert>
                <Alert variant="warning" icon={false}>
                  Flash sale ends in 2 hours. Add items to cart now.
                </Alert>
                <Alert variant="error" icon={false} title="Cart expired">
                  Your reserved items were released after 30 minutes of inactivity.
                </Alert>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 2. Badge ── */}
        <Section title="Badge" description="Compact status labels with 6 color variants, 3 sizes, and optional dot prefix.">
          <Card>
            <div className="space-y-6">
              <div>
                <SubLabel>6 variants (with dot)</SubLabel>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" dot>Default</Badge>
                  <Badge variant="primary" dot>Primary</Badge>
                  <Badge variant="success" dot>In Stock</Badge>
                  <Badge variant="warning" dot>Low Stock</Badge>
                  <Badge variant="error"   dot>Out of Stock</Badge>
                  <Badge variant="info"    dot>Pre-order</Badge>
                </div>
              </div>

              <div>
                <SubLabel>3 sizes</SubLabel>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary" size="sm">Small</Badge>
                  <Badge variant="primary" size="md">Medium</Badge>
                  <Badge variant="primary" size="lg">Large</Badge>
                </div>
              </div>

              <div>
                <SubLabel>Real-world usage</SubLabel>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Đã giao hàng</Badge>
                  <Badge variant="info"    dot>Đang giao</Badge>
                  <Badge variant="warning" dot>Chờ xác nhận</Badge>
                  <Badge variant="error"   dot>Đã huỷ</Badge>
                  <Badge variant="primary" dot>Mới</Badge>
                  <Badge variant="default" dot>Hết hàng</Badge>
                </div>
              </div>

              <div>
                <SubLabel>Product / PC build context</SubLabel>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">Compatible</Badge>
                  <Badge variant="error">Incompatible</Badge>
                  <Badge variant="warning">Check required</Badge>
                  <Badge variant="info">BIOS update needed</Badge>
                  <Badge variant="primary">Best seller</Badge>
                  <Badge variant="default">Refurbished</Badge>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── 3. Spinner ── */}
        <Section title="Spinner" description="SVG loading indicator with 5 sizes, 4 color tokens, and a SpinnerOverlay for async content.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Sizes — xs · sm · md · lg · xl</SubLabel>
              <div className="flex items-center gap-5 flex-wrap">
                <Spinner size="xs" />
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>

              <div className="mt-5">
                <SubLabel>Color tokens</SubLabel>
                <div className="flex items-center gap-5">
                  <Spinner size="md" color="primary"   label="Primary" />
                  <Spinner size="md" color="secondary" label="Secondary" />
                  <span className="rounded bg-secondary-800 p-2">
                    <Spinner size="md" color="white" label="White" />
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <SubLabel>Inline with text</SubLabel>
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 text-sm text-secondary-600">
                    <Spinner size="sm" />
                    Loading product details…
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="primary" disabled>
                      <Spinner size="xs" color="white" label="Saving" />
                      Saving…
                    </Button>
                    <Button variant="secondary" disabled>
                      <Spinner size="xs" color="secondary" label="Loading" />
                      Adding to cart…
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <SubLabel>SpinnerOverlay — covers async content</SubLabel>
              <div className="space-y-3">
                <SpinnerOverlay isVisible={overlayOn} message="Processing payment…">
                  <div className="rounded-lg border border-secondary-200 p-5">
                    <h3 className="mb-3 font-semibold text-secondary-800">Order Summary</h3>
                    <div className="space-y-2 text-sm text-secondary-600">
                      <div className="flex justify-between">
                        <span>Intel Core i9-14900K × 1</span>
                        <span>13,990,000₫</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ASUS ROG Strix B760 × 1</span>
                        <span>5,490,000₫</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corsair Vengeance 32 GB × 2</span>
                        <span>3,200,000₫</span>
                      </div>
                      <div className="flex justify-between border-t border-secondary-100 pt-2 font-semibold text-secondary-800">
                        <span>Total</span>
                        <span>22,680,000₫</span>
                      </div>
                    </div>
                  </div>
                </SpinnerOverlay>
                <Button
                  variant={overlayOn ? "danger" : "primary"}
                  size="sm"
                  onClick={() => setOverlayOn(!overlayOn)}
                >
                  {overlayOn ? "Hide overlay" : "Show overlay"}
                </Button>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 4. Avatar ── */}
        <Section title="Avatar" description="User picture with initials fallback, status dot, square shape, and stacked AvatarGroup.">
          <Card>
            <div className="space-y-6">
              <div>
                <SubLabel>Sizes (initials fallback)</SubLabel>
                <div className="flex items-end gap-3 flex-wrap">
                  {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                    <Avatar key={size} name="Nguyen Van A" size={size} />
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>Status indicators</SubLabel>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1.5">
                    <Avatar name="Tran Thi B" status="online" />
                    <span className="text-xs text-secondary-500">Online</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Avatar name="Le Van C" status="away" />
                    <span className="text-xs text-secondary-500">Away</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Avatar name="Pham Thi D" status="busy" />
                    <span className="text-xs text-secondary-500">Busy</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Avatar name="Hoang Van E" status="offline" />
                    <span className="text-xs text-secondary-500">Offline</span>
                  </div>
                </div>
              </div>

              <div>
                <SubLabel>Square shape (product / brand images)</SubLabel>
                <div className="flex items-center gap-3">
                  <Avatar name="ASUS ROG" shape="square" size="lg" />
                  <Avatar name="MSI"      shape="square" size="lg" />
                  <Avatar name="Corsair"  shape="square" size="lg" />
                  <Avatar name="Samsung"  shape="square" size="lg" />
                  <Avatar name="Intel"    shape="square" size="lg" />
                  <Avatar name="AMD"      shape="square" size="lg" />
                </div>
              </div>

              <div>
                <SubLabel>AvatarGroup (stacked with +N overflow)</SubLabel>
                <div className="flex flex-wrap items-center gap-8">
                  <div>
                    <p className="mb-2 text-xs text-secondary-500">max=4</p>
                    <AvatarGroup
                      max={4}
                      avatars={[
                        { name: "Nguyen Van A" },
                        { name: "Tran Thi B" },
                        { name: "Le Van C" },
                        { name: "Pham Thi D" },
                        { name: "Hoang Van E" },
                        { name: "Vo Thi F" },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-secondary-500">max=3, size=sm</p>
                    <AvatarGroup
                      max={3}
                      size="sm"
                      avatars={[
                        { name: "Dang Van G" },
                        { name: "Bui Thi H" },
                        { name: "Do Van I" },
                        { name: "Ngo Thi J" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── 5. Skeleton ── */}
        <Section title="Skeleton" description="Shimmer loading placeholders with 5 pre-built variants and a custom rect mode.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>text (4 lines)</SubLabel>
              <Skeleton variant="text" count={4} />
            </Card>
            <Card>
              <SubLabel>avatar (3 rows)</SubLabel>
              <Skeleton variant="avatar" count={3} />
            </Card>
            <Card>
              <SubLabel>table-row (5 rows)</SubLabel>
              <Skeleton variant="table-row" count={5} />
            </Card>
            <Card>
              <SubLabel>card (1 product card)</SubLabel>
              <Skeleton variant="card" count={1} />
            </Card>
            <Card>
              <SubLabel>rect — custom sizes</SubLabel>
              <div className="space-y-3">
                <Skeleton height="h-8"  width="w-1/3" rounded="rounded-lg" />
                <Skeleton height="h-12" width="w-full" rounded="rounded-xl" />
                <Skeleton height="h-6"  width="w-2/3" />
                <div className="flex gap-2">
                  <Skeleton height="h-8" width="w-24" rounded="rounded-full" />
                  <Skeleton height="h-8" width="w-24" rounded="rounded-full" />
                  <Skeleton height="h-8" width="w-24" rounded="rounded-full" />
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 6. Modal ── */}
        <Section title="Modal" description="Accessible dialog with focus trap, scroll lock, Escape key, backdrop click, and footer slot. Supports optional Framer Motion enter/exit animation via the animated prop.">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* animated = true */}
            <Card>
              <SubLabel>animated = true</SubLabel>
              <p className="mb-4 text-sm text-secondary-500">
                Overlay fades in; panel scales from 0.95 → 1.0 on open and reverses on close.
              </p>
              <Button variant="primary" onClick={() => setAnimatedOpen(true)}>
                Open animated modal
              </Button>
            </Card>

            {/* animated = false (default) */}
            <Card>
              <SubLabel>animated = false (default)</SubLabel>
              <p className="mb-4 text-sm text-secondary-500">
                Mounts and unmounts instantly — no transition overhead.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => setModalOpen(true)}>
                  Open product modal
                </Button>
                <Button variant="danger" onClick={() => setConfirmOpen(true)}>
                  Open confirm modal
                </Button>
              </div>
            </Card>
          </div>

          <p className="mt-3 text-sm text-secondary-400">
            Press <kbd className="rounded border border-secondary-300 bg-secondary-100 px-1 py-0.5 text-xs font-mono">Esc</kbd> or click the backdrop to close.
          </p>

          {/* Animated modal */}
          <Modal
            isOpen={animatedOpen}
            onClose={() => setAnimatedOpen(false)}
            title="Intel Core i9-14900K — 24 Cores"
            size="lg"
            animated
            footer={
              <>
                <Button variant="ghost" onClick={() => setAnimatedOpen(false)}>Close</Button>
                <Button variant="primary">Add to Cart</Button>
              </>
            }
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary-100">
                  <CpuChipIcon className="w-10 h-10 text-secondary-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-900">13,990,000₫</p>
                  <p className="mt-0.5 text-sm text-secondary-500 line-through">15,490,000₫</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="success" dot>In Stock</Badge>
                    <Badge variant="primary">Best Seller</Badge>
                  </div>
                </div>
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-secondary-100">
                  {[
                    ["Cores / Threads", "24C / 32T (8P + 16E)"],
                    ["Base clock",      "3.2 GHz"],
                    ["Boost clock",     "6.0 GHz"],
                    ["TDP",             "125 W (PL1) / 253 W (PL2)"],
                    ["Cache",           "36 MB L3"],
                    ["Socket",          "LGA 1700"],
                    ["Memory support",  "DDR4-3200 / DDR5-5600"],
                  ].map(([label, val]) => (
                    <tr key={label}>
                      <td className="py-2 pr-4 font-medium text-secondary-600">{label}</td>
                      <td className="py-2 text-secondary-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Alert variant="info" icon={false}>
                Compatible with Z690, Z790, B660, and B760 motherboards with LGA 1700 socket.
              </Alert>
            </div>
          </Modal>

          {/* Product detail modal (instant) */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            closeOnBackdrop={false}
            title="Intel Core i9-14900K — 24 Cores"
            size="lg"
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Close</Button>
                <Button variant="primary">Add to Cart</Button>
              </>
            }
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary-100">
                  <CpuChipIcon className="w-10 h-10 text-secondary-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-900">13,990,000₫</p>
                  <p className="mt-0.5 text-sm text-secondary-500 line-through">15,490,000₫</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="success" dot>In Stock</Badge>
                    <Badge variant="primary">Best Seller</Badge>
                  </div>
                </div>
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-secondary-100">
                  {[
                    ["Cores / Threads", "24C / 32T (8P + 16E)"],
                    ["Base clock",      "3.2 GHz"],
                    ["Boost clock",     "6.0 GHz"],
                    ["TDP",             "125 W (PL1) / 253 W (PL2)"],
                    ["Cache",           "36 MB L3"],
                    ["Socket",          "LGA 1700"],
                    ["Memory support",  "DDR4-3200 / DDR5-5600"],
                  ].map(([label, val]) => (
                    <tr key={label}>
                      <td className="py-2 pr-4 font-medium text-secondary-600">{label}</td>
                      <td className="py-2 text-secondary-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Alert variant="info" icon={false}>
                Compatible with Z690, Z790, B660, and B760 motherboards with LGA 1700 socket.
              </Alert>
            </div>
          </Modal>

          {/* Confirm / delete modal (instant) */}
          <Modal
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Remove from cart?"
            size="sm"
            footer={
              <>
                <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => setConfirmOpen(false)}>Remove</Button>
              </>
            }
          >
            <p className="text-sm text-secondary-600">
              Are you sure you want to remove <strong>ASUS ROG Strix RTX 4090</strong> from your cart?
              This action cannot be undone.
            </p>
          </Modal>
        </Section>

        {/* ── 7. Drawer ── */}
        <Section title="Drawer" description="Slide-in panel from right, left, or bottom with overlay, focus trap, and optional footer.">
          <Card>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary"   onClick={() => setRightDrawer(true)}>Right drawer (default)</Button>
              <Button variant="secondary" onClick={() => setLeftDrawer(true)}>Left drawer</Button>
              <Button variant="secondary" onClick={() => setBottomDrawer(true)}>Bottom drawer</Button>
            </div>
          </Card>

          {/* Right — cart drawer */}
          <Drawer
            isOpen={rightDrawer}
            onClose={() => setRightDrawer(false)}
            title="Your Cart (3 items)"
            position="right"
            footer={
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold text-secondary-800">
                  <span>Total</span>
                  <span>22,680,000₫</span>
                </div>
                <Button variant="primary" className="w-full">Proceed to Checkout</Button>
              </div>
            }
          >
            <div className="space-y-4">
              {[
                { name: "Intel Core i9-14900K", price: "13,990,000₫", qty: 1 },
                { name: "ASUS ROG Strix B760-F", price: "5,490,000₫", qty: 1 },
                { name: "Corsair Vengeance DDR5-6000 32 GB", price: "3,200,000₫", qty: 2 },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3 rounded-lg border border-secondary-100 p-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-secondary-100">
                    <CpuChipIcon className="w-6 h-6 text-secondary-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-secondary-800">{item.name}</p>
                    <p className="mt-0.5 text-sm text-primary-600 font-semibold">{item.price}</p>
                    <p className="text-xs text-secondary-400">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </Drawer>

          {/* Left — navigation drawer */}
          <Drawer
            isOpen={leftDrawer}
            onClose={() => setLeftDrawer(false)}
            title="Categories"
            position="left"
          >
            <nav className="space-y-1">
              {[
                { icon: CpuChipIcon, label: "CPU / Processor", count: 124 },
                { icon: WrenchScrewdriverIcon, label: "Motherboard", count: 89 },
                { icon: ChartBarIcon, label: "GPU / Graphics", count: 67 },
                { icon: Cog6ToothIcon, label: "RAM / Memory", count: 203 },
                { icon: ShoppingCartIcon, label: "SSD / Storage", count: 156 },
                { icon: ShieldCheckIcon, label: "Power Supply", count: 44 },
              ].map(({ icon: Icon, label, count }) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
                  onClick={() => setLeftDrawer(false)}
                >
                  <Icon className="w-5 h-5 text-secondary-400 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-left">{label}</span>
                  <Badge variant="default" size="sm">{count}</Badge>
                </button>
              ))}
            </nav>
          </Drawer>

          {/* Bottom — filter drawer */}
          <Drawer
            isOpen={bottomDrawer}
            onClose={() => setBottomDrawer(false)}
            title="Filter & Sort"
            position="bottom"
            size="lg"
            footer={
              <div className="flex gap-3">
                <Button variant="ghost"   className="flex-1" onClick={() => setBottomDrawer(false)}>Reset</Button>
                <Button variant="primary" className="flex-1" onClick={() => setBottomDrawer(false)}>Apply filters</Button>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["Under 5M₫", "5M–10M₫", "10M–20M₫", "20M+"].map((range) => (
                <button
                  key={range}
                  className="rounded-lg border border-secondary-200 px-3 py-2 text-sm text-secondary-700 hover:border-primary-400 hover:bg-primary-50 transition-colors"
                >
                  {range}
                </button>
              ))}
            </div>
          </Drawer>
        </Section>

        {/* ── 8. Tooltip ── */}
        <Section title="Tooltip" description="Hover/focus hint with 8 placement options and configurable delay.">
          <Card>
            <SubLabel>Multiple placements (hover to reveal)</SubLabel>
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              {(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "right"] as const).map((p) => (
                <Tooltip key={p} content={`placement="${p}"`} placement={p} delay={0}>
                  <button className="rounded-md border border-secondary-300 bg-secondary-50 px-3 py-1.5 text-xs text-secondary-700 hover:bg-secondary-100 transition-colors">
                    {p}
                  </button>
                </Tooltip>
              ))}
            </div>

            <div className="mt-4 border-t border-secondary-100 pt-4">
              <SubLabel>Real-world usage</SubLabel>
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="Add to wishlist" placement="top">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary-300 text-secondary-500 hover:border-primary-400 hover:text-primary-600 transition-colors">
                    <StarIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </Tooltip>

                <Tooltip content="Out of stock — cannot be added to cart" placement="right">
                  <span>
                    <Button variant="primary" disabled>Add to Cart</Button>
                  </span>
                </Tooltip>

                <Tooltip
                  content="Free shipping applies to all orders over 500,000₫ within HCM City."
                  placement="bottom"
                  maxWidth="max-w-[200px]"
                >
                  <button className="inline-flex items-center gap-1 text-sm text-info-600 underline hover:text-info-800 transition-colors">
                    <InformationCircleIcon className="w-4 h-4" aria-hidden="true" />
                    Shipping info
                  </button>
                </Tooltip>

                <Tooltip content="0ms delay" placement="top" delay={0}>
                  <button className="rounded border border-secondary-300 px-2 py-1 text-xs text-secondary-600 hover:bg-secondary-50">
                    Instant tooltip
                  </button>
                </Tooltip>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── 9. Popover ── */}
        <Section title="Popover" description="Click-triggered floating panel for interactive content — filters, pickers, info cards.">
          <Card>
            <div className="flex flex-wrap items-start gap-6">
              <div>
                <SubLabel>Shipping info</SubLabel>
                <Popover
                  placement="bottom-start"
                  content={
                    <div className="w-64 p-4">
                      <p className="mb-2 text-sm font-semibold text-secondary-800">Shipping options</p>
                      <div className="space-y-2 text-sm text-secondary-600">
                        <div className="flex items-center gap-2">
                          <TruckIcon className="w-4 h-4 text-success-500 shrink-0" aria-hidden="true" />
                          <span>Standard · 3–5 days · <strong className="text-success-600">Free</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TruckIcon className="w-4 h-4 text-info-500 shrink-0" aria-hidden="true" />
                          <span>Express · 1–2 days · <strong>30,000₫</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TruckIcon className="w-4 h-4 text-warning-500 shrink-0" aria-hidden="true" />
                          <span>Same Day · today · <strong>60,000₫</strong></span>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-info-300 bg-info-50 px-3 py-1.5 text-sm text-info-700 hover:bg-info-100 transition-colors">
                    <TruckIcon className="w-4 h-4" aria-hidden="true" />
                    Shipping options
                  </button>
                </Popover>
              </div>

              <div>
                <SubLabel>Warranty info</SubLabel>
                <Popover
                  placement="bottom-start"
                  content={
                    <div className="w-64 p-4">
                      <p className="mb-2 text-sm font-semibold text-secondary-800">Warranty coverage</p>
                      <ul className="space-y-1 text-sm text-secondary-600">
                        {[
                          "36 months manufacturer warranty",
                          "Onsite repair within 24h (HCM City)",
                          "Free return within 7 days",
                          "1-to-1 replacement (30 days)",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircleIcon className="mt-0.5 w-4 h-4 shrink-0 text-success-500" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-secondary-300 bg-white px-3 py-1.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors">
                    <ShieldCheckIcon className="w-4 h-4" aria-hidden="true" />
                    Warranty
                  </button>
                </Popover>
              </div>

              <div>
                <SubLabel>Payment methods</SubLabel>
                <Popover
                  placement="bottom-end"
                  content={
                    <div className="w-56 p-4">
                      <p className="mb-2 text-sm font-semibold text-secondary-800">We accept</p>
                      <div className="space-y-1.5 text-sm text-secondary-600">
                        {["Visa / Mastercard", "JCB", "Bank transfer", "Cash on delivery", "Momo / ZaloPay", "Installment (0% interest)"].map((m) => (
                          <div key={m} className="flex items-center gap-2">
                            <CreditCardIcon className="w-4 h-4 text-secondary-400 shrink-0" aria-hidden="true" />
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-secondary-300 bg-white px-3 py-1.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors">
                    <CreditCardIcon className="w-4 h-4" aria-hidden="true" />
                    Payment
                  </button>
                </Popover>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── 10. Accordion ── */}
        <Section title="Accordion" description="Collapsible sections with CSS grid-row animation. 3 variants: bordered, ghost, separated.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Bordered (default) — single open</SubLabel>
              <Accordion
                defaultValue="shipping"
                items={[
                  {
                    value: "shipping",
                    label: "Shipping & Delivery",
                    icon: <TruckIcon />,
                    children: (
                      <p>Free standard shipping on orders over 500,000₫. Express delivery available for an additional 30,000₫. Same-day delivery in HCM City before 3 PM.</p>
                    ),
                  },
                  {
                    value: "warranty",
                    label: "Warranty Policy",
                    icon: <ShieldCheckIcon />,
                    children: (
                      <p>All products carry a minimum 12-month manufacturer warranty. Extended 36-month warranty available for select Intel and ASUS products.</p>
                    ),
                  },
                  {
                    value: "returns",
                    label: "Returns & Refunds",
                    icon: <CheckCircleIcon />,
                    children: (
                      <p>Return within 7 days of delivery for a full refund. Items must be in original packaging and unused condition. Defective products eligible for 1-to-1 exchange.</p>
                    ),
                  },
                  {
                    value: "disabled",
                    label: "Unavailable section",
                    disabled: true,
                    children: <p>You should not see this.</p>,
                  },
                ]}
              />
            </Card>

            <Card>
              <SubLabel>Separated — multiple open</SubLabel>
              <Accordion
                variant="separated"
                multiple
                defaultValue={["q1", "q3"]}
                items={[
                  {
                    value: "q1",
                    label: "Is Intel Core i9-14900K compatible with my B760 board?",
                    children: <p>Yes. The i9-14900K uses the LGA 1700 socket and is supported by Z790, Z690, B760, and B660 chipsets with a BIOS update on older boards.</p>,
                  },
                  {
                    value: "q2",
                    label: "Do I need DDR5 RAM for the i9-14900K?",
                    children: <p>No. The i9-14900K supports both DDR4 (up to 3200 MHz) and DDR5 (up to 5600 MHz) depending on your motherboard. DDR5 offers higher bandwidth for heavy workloads.</p>,
                  },
                  {
                    value: "q3",
                    label: "What cooler should I use for the i9-14900K?",
                    children: <p>We recommend a 360mm AIO liquid cooler or high-end air cooler (e.g. Noctua NH-D15, be quiet! Dark Rock Pro 4) given the 253W PL2 thermal envelope.</p>,
                  },
                ]}
              />
            </Card>

            <Card className="sm:col-span-2">
              <SubLabel>Ghost variant — FAQ style</SubLabel>
              <Accordion
                variant="ghost"
                multiple
                items={[
                  { value: "f1", label: "How do I check PC part compatibility?", children: <p>Use our Build PC tool to automatically check socket, TDP, memory type, and PCIe slot compatibility as you add components to your build.</p> },
                  { value: "f2", label: "Can I pick up my order in-store?", children: <p>Yes. Choose "In-store pickup" during checkout to collect your order from any of our 12 showrooms across Vietnam. Ready within 2 hours of order confirmation.</p> },
                  { value: "f3", label: "Do you offer 0% installment plans?", children: <p>Yes — 0% installment is available for orders over 3,000,000₫ via Visa, Mastercard, and JCB cards. Choose 3, 6, or 12-month terms at checkout.</p> },
                ]}
              />
            </Card>
          </div>
        </Section>

        {/* ── 11. Tabs ── */}
        <Section title="Tabs" description="Keyboard-navigable tab panels with line and pill variants, horizontal and vertical orientations.">
          <div className="grid gap-5">
            <Card>
              <SubLabel>Line variant — horizontal (product detail tabs)</SubLabel>
              <Tabs
                tabs={[
                  { value: "specs",    label: "Specifications" },
                  { value: "reviews",  label: "Reviews",   icon: <StarIcon /> },
                  { value: "compat",   label: "Compatibility" },
                  { value: "disabled", label: "Archived",  disabled: true },
                ]}
                defaultValue="specs"
              >
                <TabPanel value="specs" className="pt-4">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-secondary-100">
                      {[
                        ["Brand",      "Intel"],
                        ["Series",     "Core i9 14th Gen"],
                        ["Cores",      "24 (8P + 16E)"],
                        ["Boost",      "6.0 GHz"],
                        ["TDP",        "125 W"],
                        ["Socket",     "LGA 1700"],
                      ].map(([k, v]) => (
                        <tr key={k}>
                          <td className="py-2 pr-4 font-medium text-secondary-500 w-32">{k}</td>
                          <td className="py-2 text-secondary-800">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="reviews" className="pt-4">
                  <div className="space-y-3">
                    {[
                      { name: "Nguyen Van A", rating: 5, text: "Hiệu năng xuất sắc, xử lý đa nhiệm rất tốt. Nhiệt độ ổn khi dùng tản nước 360." },
                      { name: "Tran Thi B",   rating: 4, text: "CPU mạnh mẽ, nhưng cần nguồn tốt và tản nhiệt cao cấp để khai thác hết hiệu năng." },
                    ].map((r) => (
                      <div key={r.name} className="flex gap-3 rounded-lg border border-secondary-100 p-3">
                        <Avatar name={r.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-secondary-800">{r.name}</p>
                          <div className="my-0.5 flex gap-0.5">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <StarIcon key={i} className="w-3.5 h-3.5 text-warning-400" aria-hidden="true" />
                            ))}
                          </div>
                          <p className="text-sm text-secondary-600">{r.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="compat" className="pt-4">
                  <Alert variant="success" title="Compatible chipsets">
                    Z790, Z690, B760, B660 — all with LGA 1700 socket. BIOS update may be required on older B660/Z690 boards.
                  </Alert>
                </TabPanel>
              </Tabs>
            </Card>

            <Card>
              <SubLabel>Pill variant — horizontal (order filter tabs)</SubLabel>
              <Tabs
                variant="pill"
                tabs={[
                  { value: "all",       label: "All orders" },
                  { value: "pending",   label: "Pending" },
                  { value: "shipping",  label: "Shipping" },
                  { value: "delivered", label: "Delivered" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
                defaultValue="all"
              >
                {["all", "pending", "shipping", "delivered", "cancelled"].map((v) => (
                  <TabPanel key={v} value={v} className="pt-4">
                    <p className="text-sm text-secondary-500">
                      Showing {v === "all" ? "all" : v} orders — content would render here.
                    </p>
                  </TabPanel>
                ))}
              </Tabs>
            </Card>

            <Card>
              <SubLabel>Vertical line variant</SubLabel>
              <Tabs
                orientation="vertical"
                tabs={[
                  { value: "account",  label: "Account",   icon: <UserIcon /> },
                  { value: "notif",    label: "Notifications", icon: <BellIcon /> },
                  { value: "payment",  label: "Payment",   icon: <CreditCardIcon /> },
                  { value: "security", label: "Security",  icon: <ShieldCheckIcon /> },
                ]}
                defaultValue="account"
              >
                {[
                  { v: "account",  text: "Manage your profile, email, and display name." },
                  { v: "notif",    text: "Configure email, SMS, and push notification preferences." },
                  { v: "payment",  text: "Add or remove saved cards and bank accounts." },
                  { v: "security", text: "Change password and enable two-factor authentication." },
                ].map(({ v, text }) => (
                  <TabPanel key={v} value={v} className="py-2">
                    <p className="text-sm text-secondary-600">{text}</p>
                  </TabPanel>
                ))}
              </Tabs>
            </Card>
          </div>
        </Section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-secondary-200 pt-8">
          <Link
            href="/ui-demo/forms"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Form Controls
          </Link>
          <Link
            href="/ui-demo/product"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next: Product Components
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
