"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  CartItem,
  CartSummary,
  CouponInput,
  OrderStatusBadge,
  OrderTimeline,
  PaymentMethodPicker,
  AddressCard,
  type AppliedCoupon,
  type PaymentMethodId,
  type AddressData,
  type OrderStatus,
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

// ─── Mock data ────────────────────────────────────────────────────────────────

interface CartItemState {
  id: string;
  productId: string;
  name: string;
  brand: string;
  thumbnail: string;
  variant?: string;
  unitPrice: number;
  quantity: number;
  maxQuantity: number;
}

const INITIAL_CART: CartItemState[] = [
  {
    id: "ci-1",
    productId: "p-001",
    name: "Intel Core i9-14900K 24-Core LGA1700",
    brand: "Intel",
    thumbnail: "https://placehold.co/80x80/f1f5f9/64748b?text=i9",
    variant: "Boxed · LGA1700",
    unitPrice: 13_990_000,
    quantity: 1,
    maxQuantity: 10,
  },
  {
    id: "ci-2",
    productId: "p-002",
    name: "ASUS ROG Strix B760-F Gaming Wi-Fi DDR5",
    brand: "ASUS ROG",
    thumbnail: "https://placehold.co/80x80/f1f5f9/64748b?text=B760",
    variant: "ATX · DDR5 · Wi-Fi 6E",
    unitPrice: 5_490_000,
    quantity: 1,
    maxQuantity: 5,
  },
  {
    id: "ci-3",
    productId: "p-003",
    name: "Corsair Vengeance DDR5-6000 32 GB (2×16 GB)",
    brand: "Corsair",
    thumbnail: "https://placehold.co/80x80/f1f5f9/64748b?text=DDR5",
    variant: "32 GB · DDR5-6000 · CL30",
    unitPrice: 3_290_000,
    quantity: 2,
    maxQuantity: 2,
  },
];

const ADDRESSES: AddressData[] = [
  {
    id: "addr-1",
    fullName: "Nguyễn Văn An",
    phone: "0901 234 567",
    addressLine: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Trần Thị Bình",
    phone: "0912 345 678",
    addressLine: "456 Lê Lợi",
    ward: "Phường Phạm Ngũ Lão",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
  },
  {
    id: "addr-3",
    fullName: "Lê Văn Cường",
    phone: "0987 654 321",
    addressLine: "789 Trần Hưng Đạo",
    ward: "Phường Cầu Ông Lãnh",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
  },
];

// Valid coupon codes for demo
const VALID_COUPONS: Record<string, AppliedCoupon> = {
  "SUMMER20": { code: "SUMMER20", discountAmount: 3_000_000, description: "20% off orders over 10M₫" },
  "TECHSALE": { code: "TECHSALE", discountAmount: 1_500_000, description: "1.5M₫ off any PC component" },
  "NEWUSER":  { code: "NEWUSER",  discountAmount: 500_000,   description: "500k₫ for new members" },
};

const ALL_ORDER_STATUSES: OrderStatus[] = [
  "pending", "confirmed", "packing", "shipping", "delivered", "cancelled", "returning",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommerceDemoPage() {
  // Cart
  const [cartItems, setCartItems] = useState<CartItemState[]>(INITIAL_CART);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  function handleQuantityChange(id: string, qty: number) {
    setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: qty } : item));
  }
  function handleRemove(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = appliedCoupon?.discountAmount ?? 0;
  const shipping = subtotal >= 500_000 ? 0 : 30_000;
  const total = Math.max(0, subtotal - discount + shipping);

  async function handleApplyCoupon(code: string): Promise<string | void> {
    await new Promise((r) => setTimeout(r, 600)); // simulate API delay
    const coupon = VALID_COUPONS[code];
    if (!coupon) return "Invalid or expired coupon code. Try: SUMMER20, TECHSALE, or NEWUSER";
    setAppliedCoupon(coupon);
  }

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(null);

  // Address
  const [addresses, setAddresses] = useState<AddressData[]>(ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<string>("addr-1");

  function handleSetDefault(id: string) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  // Order Timeline — let user step through stages
  const timelineStages = [1, 2, 3, 4, 5];
  const [timelineStage, setTimelineStage] = useState(3);

  const timelineSteps = [
    {
      id: "placed",
      label: "Order Placed",
      description: "Order #DH-2024001 received.",
      timestamp: "2024-03-10T09:15:00+07:00",
      state: timelineStage > 1 ? "completed" : timelineStage === 1 ? "current" : "pending",
    },
    {
      id: "confirmed",
      label: "Order Confirmed",
      description: "Payment verified — processing started.",
      timestamp: "2024-03-10T10:30:00+07:00",
      state: timelineStage > 2 ? "completed" : timelineStage === 2 ? "current" : "pending",
    },
    {
      id: "packing",
      label: "Packing",
      description: "Items picked and packed at our HCM warehouse.",
      timestamp: "2024-03-11T08:00:00+07:00",
      state: timelineStage > 3 ? "completed" : timelineStage === 3 ? "current" : "pending",
    },
    {
      id: "shipping",
      label: "Out for Delivery",
      description: "Package handed to Giao Hàng Nhanh.",
      timestamp: timelineStage > 3 ? "2024-03-12T07:30:00+07:00" : undefined,
      state: timelineStage > 4 ? "completed" : timelineStage === 4 ? "current" : "pending",
    },
    {
      id: "delivered",
      label: "Delivered",
      description: "Package received by recipient.",
      timestamp: timelineStage === 5 ? "2024-03-12T14:20:00+07:00" : undefined,
      state: timelineStage === 5 ? "current" : "pending",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/ui-demo"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Back to showcase
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">Commerce Components</h1>
          <p className="mt-2 text-secondary-500">
            CartItem · CartSummary · CouponInput · OrderStatusBadge · OrderTimeline · PaymentMethodPicker · AddressCard
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">

        {/* ── 1. OrderStatusBadge ── */}
        <Section title="OrderStatusBadge" description="Color-coded badge covering all 7 order lifecycle states. 3 size variants.">
          <Card>
            <div className="space-y-5">
              <div>
                <SubLabel>All 7 statuses — md (default)</SubLabel>
                <div className="flex flex-wrap gap-2">
                  {ALL_ORDER_STATUSES.map((s) => (
                    <OrderStatusBadge key={s} status={s} />
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>Sizes — sm · md · lg</SubLabel>
                <div className="space-y-2">
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <div key={size} className="flex flex-wrap items-center gap-2">
                      <span className="w-6 text-[10px] text-secondary-400">{size}</span>
                      {(["pending", "shipping", "delivered", "cancelled"] as const).map((s) => (
                        <OrderStatusBadge key={s} status={s} size={size} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>In an order list</SubLabel>
                <div className="divide-y divide-secondary-100 rounded-lg border border-secondary-200 overflow-hidden">
                  {[
                    { id: "#DH-2024001", product: "Intel Core i9-14900K + ROG B760", total: "22,680,000₫", status: "delivered"  as const },
                    { id: "#DH-2024002", product: "ASUS ROG Strix RTX 4090 OC",     total: "49,990,000₫", status: "shipping"   as const },
                    { id: "#DH-2024003", product: "Corsair iCUE H150i Elite Capellix", total: "3,890,000₫", status: "packing"    as const },
                    { id: "#DH-2024004", product: "Samsung 990 Pro SSD 2 TB",       total: "4,590,000₫", status: "confirmed"  as const },
                    { id: "#DH-2024005", product: "Gigabyte AORUS 750W PSU",        total: "2,290,000₫", status: "cancelled"  as const },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between bg-white px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-secondary-800">{order.id}</p>
                        <p className="truncate text-xs text-secondary-500 max-w-xs">{order.product}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="hidden text-sm font-medium text-secondary-700 sm:block">{order.total}</span>
                        <OrderStatusBadge status={order.status} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── 2. OrderTimeline ── */}
        <Section title="OrderTimeline" description="Vertical lifecycle steps with completed check, animated pulsing current dot, and vi-VN formatted timestamps.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Interactive — step through the order</SubLabel>
              <div className="mb-4 flex flex-wrap gap-2">
                {timelineStages.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTimelineStage(s)}
                    className={[
                      "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                      timelineStage === s
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-secondary-200 bg-white text-secondary-600 hover:border-secondary-300",
                    ].join(" ")}
                  >
                    Stage {s}
                  </button>
                ))}
              </div>
              <OrderTimeline steps={timelineSteps as unknown as Parameters<typeof OrderTimeline>[0]["steps"]} />
            </Card>

            <Card>
              <SubLabel>Cancelled order</SubLabel>
              <OrderTimeline
                steps={[
                  { id: "placed",    label: "Order Placed",    timestamp: "2024-03-08T14:00:00+07:00", state: "completed", description: "Order #DH-2024005 received." },
                  { id: "confirmed", label: "Order Confirmed", timestamp: "2024-03-08T15:30:00+07:00", state: "completed" },
                  { id: "cancelled", label: "Order Cancelled", timestamp: "2024-03-09T09:00:00+07:00", state: "current",   description: "Cancelled by customer. Refund will be processed in 3–5 days." },
                  { id: "refunded",  label: "Refund Issued",   state: "pending" },
                ]}
              />
            </Card>
          </div>
        </Section>

        {/* ── 3. CartItem ── */}
        <Section title="CartItem" description="Line item with thumbnail, variant label, quantity stepper, and remove button. Live cart state below.">
          <div className="space-y-3">
            {cartItems.length === 0 ? (
              <Card>
                <p className="py-6 text-center text-sm text-secondary-400">
                  Cart is empty — all items removed.
                </p>
              </Card>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  href="#"
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            )}

            {cartItems.length < INITIAL_CART.length && (
              <button
                onClick={() => setCartItems(INITIAL_CART)}
                className="text-sm text-primary-600 hover:underline"
              >
                ← Restore all items
              </button>
            )}

            <Card className="mt-1">
              <SubLabel>Out-of-stock state</SubLabel>
              <CartItem
                id="ci-oos"
                productId="p-oos"
                name="MSI MEG Z790 ACE MAX DDR5 ATX Motherboard"
                brand="MSI"
                thumbnail="https://placehold.co/80x80/f1f5f9/64748b?text=Z790"
                variant="ATX · DDR5 · Intel Z790"
                unitPrice={12_490_000}
                quantity={1}
                maxQuantity={0}
                onQuantityChange={() => {}}
                onRemove={() => {}}
              />
            </Card>
          </div>
        </Section>

        {/* ── 4. CouponInput + CartSummary ── */}
        <Section title="CouponInput + CartSummary" description="Coupon field with async validation wired into the order summary panel. Try: SUMMER20, TECHSALE, or NEWUSER.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-4">
              <Card>
                <SubLabel>CouponInput — standalone</SubLabel>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs text-secondary-400">Empty state</p>
                    <CouponInput
                      appliedCoupon={appliedCoupon}
                      onApply={handleApplyCoupon}
                      onRemove={() => setAppliedCoupon(null)}
                    />
                    {!appliedCoupon && (
                      <p className="mt-2 text-xs text-secondary-400">
                        Valid codes: <code className="rounded bg-secondary-100 px-1">SUMMER20</code>,{" "}
                        <code className="rounded bg-secondary-100 px-1">TECHSALE</code>,{" "}
                        <code className="rounded bg-secondary-100 px-1">NEWUSER</code>
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card>
                <SubLabel>Applied state (pre-set)</SubLabel>
                <CouponInput
                  appliedCoupon={{ code: "FLASH50", discountAmount: 5_000_000, description: "Flash sale — 50% off GPUs" }}
                  onApply={async () => {}}
                  onRemove={() => {}}
                />
              </Card>
            </div>

            <CartSummary
              itemCount={cartItems.reduce((n, i) => n + i.quantity, 0)}
              subtotal={subtotal}
              discountAmount={discount}
              discountLabel={appliedCoupon?.code}
              shippingFee={shipping}
              total={total}
              onCheckout={() => alert("Proceeding to checkout…")}
              couponSlot={
                <CouponInput
                  appliedCoupon={appliedCoupon}
                  onApply={handleApplyCoupon}
                  onRemove={() => setAppliedCoupon(null)}
                />
              }
            />
          </div>
        </Section>

        {/* ── 5. PaymentMethodPicker ── */}
        <Section title="PaymentMethodPicker" description="Radio-group payment selector with 4 default methods, badges, descriptions, and a disabled state example.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Default methods (live selection)</SubLabel>
              <PaymentMethodPicker
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
              {paymentMethod && (
                <p className="mt-3 text-sm text-secondary-500">
                  Selected: <span className="font-semibold text-secondary-700">{paymentMethod}</span>
                </p>
              )}
            </Card>

            <Card>
              <SubLabel>With a disabled method</SubLabel>
              <PaymentMethodPicker
                value="cod"
                onChange={() => {}}
                methods={[
                  {
                    id: "cod",
                    label: "Cash on Delivery",
                    description: "Pay in cash when your order arrives.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                    ),
                    badge: "Popular",
                  },
                  {
                    id: "bank-transfer",
                    label: "Bank Transfer",
                    description: "Transfer to our bank account.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                      </svg>
                    ),
                  },
                  {
                    id: "installment",
                    label: "Installment Plan",
                    description: "Not available for orders under 3,000,000₫.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    ),
                    badge: "0% interest",
                    disabled: true,
                  },
                ]}
              />
            </Card>
          </div>
        </Section>

        {/* ── 6. AddressCard ── */}
        <Section title="AddressCard" description="Saved address with edit / delete / set-default actions. Selectable mode for the checkout address picker.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <SubLabel>
                Management mode (edit · delete · set default)
              </SubLabel>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={(id) => alert(`Edit address: ${id}`)}
                    onDelete={(id) => setAddresses((prev) => prev.filter((a) => a.id !== id))}
                    onSetDefault={handleSetDefault}
                  />
                ))}
                {addresses.length === 0 && (
                  <div className="rounded-xl border-2 border-dashed border-secondary-200 py-8 text-center text-sm text-secondary-400">
                    All addresses deleted.{" "}
                    <button className="text-primary-600 hover:underline" onClick={() => setAddresses(ADDRESSES)}>
                      Restore
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <SubLabel>
                Selectable mode (checkout address picker)
              </SubLabel>
              <div
                role="radiogroup"
                aria-label="Delivery address"
                className="space-y-3"
              >
                {ADDRESSES.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    selectable
                    selected={selectedAddress === addr.id}
                    onSelect={setSelectedAddress}
                  />
                ))}
              </div>
              {selectedAddress && (
                <p className="mt-3 text-sm text-secondary-500">
                  Delivering to:{" "}
                  <span className="font-semibold text-secondary-700">
                    {ADDRESSES.find((a) => a.id === selectedAddress)?.fullName}
                  </span>
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-secondary-200 pt-8">
          <Link
            href="/ui-demo/product"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Product Components
          </Link>
          <Link
            href="/ui-demo/admin"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next: Admin Components
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
