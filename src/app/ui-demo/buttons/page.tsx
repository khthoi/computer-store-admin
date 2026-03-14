"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
  HeartIcon,
  TrashIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  CheckIcon,
  ShareIcon,
  StarIcon,
  BoltIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { Button, Badge } from "@/src/components";

// ─── Demo section wrapper ─────────────────────────────────────────────────────

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

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-secondary-400">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function CodeChip({ code }: { code: string }) {
  return (
    <code className="block rounded-lg bg-secondary-900 px-4 py-3 text-xs font-mono text-secondary-200">
      {code}
    </code>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ButtonsDemoPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  function simulate(id: string) {
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 2000);
  }

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
          <h1 className="text-3xl font-bold text-secondary-900">Buttons &amp; Actions</h1>
          <p className="mt-2 text-secondary-500">
            <code className="rounded bg-secondary-100 px-1.5 py-0.5 text-xs font-mono text-secondary-700">Button</code>
            {" "}and{" "}
            <code className="rounded bg-secondary-100 px-1.5 py-0.5 text-xs font-mono text-secondary-700">Badge</code>
            {" "}components — 5 variants, 4 sizes, icon slots, loading states.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">

        {/* ── 1. Variants ── */}
        <Section
          title="Button Variants"
          description="5 semantic variants covering every use case in the storefront and admin."
        >
          <div className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm space-y-5">
            <DemoRow label="primary">
              <Button variant="primary">Add to Cart</Button>
              <Button variant="primary" leftIcon={<ShoppingCartIcon />}>Add to Cart</Button>
              <Button variant="primary" rightIcon={<ArrowRightIcon />}>Checkout</Button>
            </DemoRow>
            <DemoRow label="secondary">
              <Button variant="secondary">Compare</Button>
              <Button variant="secondary" leftIcon={<HeartIcon />}>Wishlist</Button>
              <Button variant="secondary" rightIcon={<ShareIcon />}>Share</Button>
            </DemoRow>
            <DemoRow label="outline">
              <Button variant="outline">View Details</Button>
              <Button variant="outline" leftIcon={<MagnifyingGlassIcon />}>Browse</Button>
              <Button variant="outline" rightIcon={<ArrowDownTrayIcon />}>Download</Button>
            </DemoRow>
            <DemoRow label="ghost">
              <Button variant="ghost">View All</Button>
              <Button variant="ghost" leftIcon={<PencilIcon />}>Edit</Button>
              <Button variant="ghost" rightIcon={<ArrowRightIcon />}>See more</Button>
            </DemoRow>
            <DemoRow label="danger">
              <Button variant="danger">Delete Order</Button>
              <Button variant="danger" leftIcon={<TrashIcon />}>Remove</Button>
              <Button variant="danger" size="sm">Cancel</Button>
            </DemoRow>
          </div>

          <div className="mt-4 space-y-1.5">
            <CodeChip code={`<Button variant="primary" leftIcon={<ShoppingCartIcon />}>Add to Cart</Button>`} />
            <CodeChip code={`<Button variant="danger" leftIcon={<TrashIcon />}>Remove</Button>`} />
          </div>
        </Section>

        {/* ── 2. Sizes ── */}
        <Section
          title="Button Sizes"
          description="4 sizes — xs (h-7) · sm (h-8) · md (h-10, default) · lg (h-12)."
        >
          <div className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm space-y-5">
            <DemoRow label="xs">
              <Button size="xs" variant="primary">Buy Now</Button>
              <Button size="xs" variant="secondary">Compare</Button>
              <Button size="xs" variant="outline">Details</Button>
              <Button size="xs" variant="ghost">View</Button>
              <Button size="xs" variant="danger">Remove</Button>
            </DemoRow>
            <DemoRow label="sm">
              <Button size="sm" variant="primary">Buy Now</Button>
              <Button size="sm" variant="secondary">Compare</Button>
              <Button size="sm" variant="outline">Details</Button>
              <Button size="sm" variant="ghost">View</Button>
              <Button size="sm" variant="danger">Remove</Button>
            </DemoRow>
            <DemoRow label="md (default)">
              <Button size="md" variant="primary">Buy Now</Button>
              <Button size="md" variant="secondary">Compare</Button>
              <Button size="md" variant="outline">Details</Button>
              <Button size="md" variant="ghost">View</Button>
              <Button size="md" variant="danger">Remove</Button>
            </DemoRow>
            <DemoRow label="lg">
              <Button size="lg" variant="primary">Buy Now</Button>
              <Button size="lg" variant="secondary">Compare</Button>
              <Button size="lg" variant="outline">Details</Button>
              <Button size="lg" variant="ghost">View</Button>
              <Button size="lg" variant="danger">Remove</Button>
            </DemoRow>
          </div>
        </Section>

        {/* ── 3. Loading states ── */}
        <Section
          title="Loading States"
          description="Pass isLoading to swap the left icon for a spinner and set aria-busy. Click to simulate."
        >
          <div className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-4">
              {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((v) => (
                <Button
                  key={v}
                  variant={v}
                  isLoading={loadingId === v}
                  onClick={() => simulate(v)}
                >
                  {loadingId === v ? "Processing…" : v === "primary" ? "Add to Cart" : v === "danger" ? "Deleting…" : "Click me"}
                </Button>
              ))}
            </div>
            <p className="mt-4 text-xs text-secondary-400">
              Click any button above — it will enter the loading state for 2 seconds.
            </p>
          </div>
          <div className="mt-4">
            <CodeChip code={`<Button isLoading={isPending} onClick={handleAddToCart}>Add to Cart</Button>`} />
          </div>
        </Section>

        {/* ── 4. Disabled states ── */}
        <Section title="Disabled States" description="Pass disabled for pointer-events:none + 50% opacity.">
          <div className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-4">
              {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((v) => (
                <Button key={v} variant={v} disabled>
                  {v === "primary" ? "Add to Cart" : v === "danger" ? "Delete" : "Disabled"}
                </Button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 5. Full-width ── */}
        <Section title="Full Width" description="fullWidth stretches the button to 100% of its container.">
          <div className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm space-y-3 max-w-sm">
            <Button variant="primary" fullWidth leftIcon={<ShoppingCartIcon />}>
              Add All to Cart
            </Button>
            <Button variant="secondary" fullWidth>
              Save Build
            </Button>
            <Button variant="outline" fullWidth rightIcon={<ArrowRightIcon />}>
              Continue to Checkout
            </Button>
          </div>
          <div className="mt-4">
            <CodeChip code={`<Button variant="primary" fullWidth leftIcon={<ShoppingCartIcon />}>Add All to Cart</Button>`} />
          </div>
        </Section>

        {/* ── 6. Real-world combos ── */}
        <Section
          title="Real-world Examples"
          description="Buttons as they appear in the actual storefront — product cards, build pages, admin tables."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Product card actions */}
            <div className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Product Card</p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" leftIcon={<ShoppingCartIcon />} fullWidth>
                  Add to Cart
                </Button>
                <Button variant="ghost" size="sm">
                  <HeartIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Build PC CTA */}
            <div className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Build PC</p>
              <Button variant="primary" fullWidth leftIcon={<CpuChipIcon />} size="lg">
                Start Building
              </Button>
            </div>

            {/* Admin row actions */}
            <div className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Admin Table Row</p>
              <div className="flex gap-1.5">
                <Button variant="ghost" size="xs" leftIcon={<PencilIcon />}>Edit</Button>
                <Button variant="ghost" size="xs" leftIcon={<CheckIcon />}>Approve</Button>
                <Button variant="danger" size="xs" leftIcon={<TrashIcon />}>Delete</Button>
              </div>
            </div>

            {/* Checkout flow */}
            <div className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Checkout</p>
              <div className="space-y-2">
                <Button variant="primary" fullWidth size="lg" leftIcon={<BoltIcon />}>
                  Place Order — 24,990,000₫
                </Button>
                <Button variant="ghost" fullWidth size="sm">
                  ← Back to Cart
                </Button>
              </div>
            </div>

            {/* Icon-only buttons */}
            <div className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Icon-only</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { icon: <ShoppingCartIcon className="w-4 h-4" />, v: "primary" as const },
                  { icon: <HeartIcon className="w-4 h-4" />, v: "outline" as const },
                  { icon: <ShareIcon className="w-4 h-4" />, v: "secondary" as const },
                  { icon: <PlusIcon className="w-4 h-4" />, v: "ghost" as const },
                  { icon: <TrashIcon className="w-4 h-4" />, v: "danger" as const },
                ].map(({ icon, v }, i) => (
                  <Button key={i} variant={v} size="sm" aria-label={v}>
                    {icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Loading real flow */}
            <div className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Loading (click)</p>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  isLoading={loadingId === "cart-flow"}
                  onClick={() => simulate("cart-flow")}
                  leftIcon={<ShoppingCartIcon />}
                >
                  {loadingId === "cart-flow" ? "Adding…" : "Add to Cart"}
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  size="sm"
                  isLoading={loadingId === "delete-flow"}
                  onClick={() => simulate("delete-flow")}
                >
                  {loadingId === "delete-flow" ? "Removing…" : "Remove Item"}
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 7. Badge variants ── */}
        <Section
          title="Badge Variants"
          description="Compact status labels — 6 semantic variants × 3 sizes × optional dot prefix."
        >
          <div className="rounded-xl border border-secondary-200 bg-white p-6 shadow-sm space-y-6">
            {/* Variants */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Variants</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">In Stock</Badge>
                <Badge variant="warning">Low Stock</Badge>
                <Badge variant="error">Out of Stock</Badge>
                <Badge variant="info">Coming Soon</Badge>
              </div>
            </div>

            {/* With dot */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">With Dot</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" dot>Default</Badge>
                <Badge variant="primary" dot>Primary</Badge>
                <Badge variant="success" dot>In Stock</Badge>
                <Badge variant="warning" dot>Low Stock</Badge>
                <Badge variant="error" dot>Out of Stock</Badge>
                <Badge variant="info" dot>Coming Soon</Badge>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] text-secondary-400">sm</span>
                  <Badge variant="success" size="sm" dot>In Stock</Badge>
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] text-secondary-400">md (default)</span>
                  <Badge variant="success" size="md" dot>In Stock</Badge>
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] text-secondary-400">lg</span>
                  <Badge variant="success" size="lg" dot>In Stock</Badge>
                </div>
              </div>
            </div>

            {/* Real-world badge usage */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">Real-world Usage</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" dot>In Stock</Badge>
                <Badge variant="warning" dot>Only 3 left</Badge>
                <Badge variant="error">Out of Stock</Badge>
                <Badge variant="info" dot>Pre-order</Badge>
                <Badge variant="primary">NEW</Badge>
                <Badge variant="default">
                  <StarIcon className="w-3 h-3 mr-0.5" aria-hidden="true" />
                  4.8 · 142 reviews
                </Badge>
                <Badge variant="primary" dot>Featured</Badge>
                <Badge variant="warning">Flash Sale</Badge>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <CodeChip code={`<Badge variant="success" dot>In Stock</Badge>`} />
            <CodeChip code={`<Badge variant="warning" size="lg">Only 3 left</Badge>`} />
          </div>
        </Section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-secondary-200 pt-8">
          <Link
            href="/ui-demo/design"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Design Tokens
          </Link>
          <Link
            href="/ui-demo/forms"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next: Form Controls
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
