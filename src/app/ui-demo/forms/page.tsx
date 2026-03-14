"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  UserIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
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

// ─── Mock data ────────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  { value: "cpu",   label: "CPU / Processor" },
  { value: "gpu",   label: "GPU / Graphics Card" },
  { value: "mb",    label: "Motherboard" },
  { value: "ram",   label: "RAM" },
  { value: "ssd",   label: "SSD / Storage" },
  { value: "psu",   label: "Power Supply" },
  { value: "case",  label: "PC Case" },
  { value: "cool",  label: "Cooling" },
];

const GROUPED_BRAND_OPTIONS = [
  {
    label: "Intel / AMD",
    options: [
      { value: "intel", label: "Intel" },
      { value: "amd",   label: "AMD" },
    ],
  },
  {
    label: "GPU Partners",
    options: [
      { value: "asus",     label: "ASUS ROG" },
      { value: "msi",      label: "MSI Gaming" },
      { value: "gigabyte", label: "Gigabyte AORUS" },
      { value: "evga",     label: "EVGA" },
    ],
  },
  {
    label: "Memory & Storage",
    options: [
      { value: "corsair",  label: "Corsair" },
      { value: "gskill",   label: "G.Skill" },
      { value: "samsung",  label: "Samsung" },
      { value: "wd",       label: "Western Digital" },
    ],
  },
];

const PROVINCE_OPTIONS = [
  { value: "hcm",   label: "Hồ Chí Minh" },
  { value: "hn",    label: "Hà Nội" },
  { value: "dn",    label: "Đà Nẵng" },
  { value: "ct",    label: "Cần Thơ" },
  { value: "hp",    label: "Hải Phòng" },
  { value: "bd",    label: "Bình Dương" },
  { value: "bien",  label: "Biên Hòa" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FormsPage() {
  // Input states
  const [searchVal, setSearchVal] = useState("");

  // Select states
  const [category, setCategory]   = useState("");
  const [brands, setBrands]       = useState<string[]>([]);
  const [province, setProvince]   = useState("");

  // Checkbox states
  const [terms, setTerms]         = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [allFeatures, setAllFeatures] = useState(false);
  const [someFeatures, setSomeFeatures] = useState(true);
  const [featureA, setFeatureA]   = useState(true);
  const [featureB, setFeatureB]   = useState(false);
  const [featureC, setFeatureC]   = useState(true);

  // Radio states
  const [shipping, setShipping]   = useState("standard");
  const [payment, setPayment]     = useState("");

  // Toggle states
  const [email, setEmail]         = useState(true);
  const [sms, setSms]             = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [darkMode, setDarkMode]   = useState(false);

  // Textarea state
  const [bio, setBio]             = useState("");
  const [review, setReview]       = useState("");

  // Composed form state
  const [formName, setFormName]   = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formNote, setFormNote]   = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleAllChange(checked: boolean) {
    setAllFeatures(checked);
    setFeatureA(checked);
    setFeatureB(checked);
    setFeatureC(checked);
    setSomeFeatures(false);
  }

  function handleFeatureChange(setter: (v: boolean) => void, val: boolean) {
    setter(val);
    const next = {
      a: featureA, b: featureB, c: featureC,
    };
    const count = Object.values(next).filter(Boolean).length + (val ? 1 : -1);
    setAllFeatures(count === 3);
    setSomeFeatures(count > 0 && count < 3);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formName.trim()) errs.name = "Full name is required.";
    if (!formEmail.includes("@")) errs.email = "Enter a valid email address.";
    if (!/^(0|\+84)\d{9,10}$/.test(formPhone)) errs.phone = "Enter a valid Vietnamese phone number.";
    if (!formAddress.trim()) errs.address = "Delivery address is required.";
    setFormErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
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
          <h1 className="text-3xl font-bold text-secondary-900">Form Controls</h1>
          <p className="mt-2 text-secondary-500">
            Input · Textarea · Select · Checkbox · RadioGroup · Toggle — with states, sizes, and a real-world composed form.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">

        {/* ── 1. Input ── */}
        <Section title="Input" description="Single-line text input with label, helper, prefix/suffix icons, error, and 3 sizes.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Default states</SubLabel>
              <div className="space-y-4">
                <Input label="Product name" placeholder="e.g. Intel Core i9-14900K" />
                <Input label="Email" type="email" placeholder="you@example.com" helperText="We'll send order updates here." />
                <Input label="Disabled" placeholder="Cannot edit" disabled defaultValue="ASUS ROG Strix B650" />
              </div>
            </Card>

            <Card>
              <SubLabel>With prefix / suffix icons</SubLabel>
              <div className="space-y-4">
                <Input
                  label="Search products"
                  placeholder="Search…"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  prefixIcon={<MagnifyingGlassIcon />}
                />
                <Input label="Email" type="email" placeholder="you@example.com" prefixIcon={<EnvelopeIcon />} />
                <Input label="Phone" type="tel" placeholder="0901 234 567" prefixIcon={<PhoneIcon />} />
                <Input label="Password" type="password" placeholder="••••••••" prefixIcon={<LockClosedIcon />} />
              </div>
            </Card>

            <Card>
              <SubLabel>Validation errors</SubLabel>
              <div className="space-y-4">
                <Input
                  label="Full name"
                  prefixIcon={<UserIcon />}
                  defaultValue=""
                  errorMessage="Full name is required."
                />
                <Input
                  label="Email"
                  prefixIcon={<EnvelopeIcon />}
                  defaultValue="notvalid"
                  errorMessage="Enter a valid email address."
                />
                <Input
                  label="Price (VND)"
                  prefixIcon={<CurrencyDollarIcon />}
                  defaultValue="-500"
                  errorMessage="Price must be a positive number."
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Sizes — sm · md · lg</SubLabel>
              <div className="space-y-4">
                <Input size="sm" label="Small (h-8)" placeholder="SKU-001234" />
                <Input size="md" label="Medium (h-10, default)" placeholder="Intel Core i9-14900K" />
                <Input size="lg" label="Large (h-12)" placeholder="Search all products…" prefixIcon={<MagnifyingGlassIcon />} />
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 2. Textarea ── */}
        <Section title="Textarea" description="Multi-line input with auto-resize, character counter, and validation.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>With character counter</SubLabel>
              <div className="space-y-4">
                <Textarea
                  label="Short bio"
                  placeholder="Tell customers about yourself…"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={160}
                  showCharCount
                  helperText="Shown on your public profile."
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Auto-resize</SubLabel>
              <div className="space-y-4">
                <Textarea
                  label="Order note"
                  placeholder="Any special delivery instructions…"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  autoResize
                  helperText="Grows as you type — no manual resize."
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Validation error</SubLabel>
              <Textarea
                label="Return reason"
                defaultValue="Bad"
                errorMessage="Please describe the issue in at least 20 characters."
              />
            </Card>

            <Card>
              <SubLabel>Disabled</SubLabel>
              <Textarea
                label="Internal note"
                defaultValue="Customer VIP — priority fulfillment required."
                disabled
              />
            </Card>
          </div>
        </Section>

        {/* ── 3. Select ── */}
        <Section title="Select" description="Custom dropdown with single, searchable, multi-select, grouped options, and clearable.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Single select</SubLabel>
              <Select
                label="Category"
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={(v) => setCategory(v as string)}
                placeholder="Choose a category…"
                helperText="Determines which filters are shown."
              />
            </Card>

            <Card>
              <SubLabel>Searchable + clearable</SubLabel>
              <Select
                label="Province / City"
                options={PROVINCE_OPTIONS}
                value={province}
                onChange={(v) => setProvince(v as string)}
                searchable
                clearable
                placeholder="Search province…"
                helperText="Type to filter delivery regions."
              />
            </Card>

            <Card>
              <SubLabel>Multi-select with groups</SubLabel>
              <Select
                label="Brands"
                options={GROUPED_BRAND_OPTIONS}
                value={brands}
                onChange={(v) => setBrands(v as string[])}
                multiple
                searchable
                clearable
                placeholder="Select brands…"
                helperText={brands.length > 0 ? `${brands.length} brand${brands.length > 1 ? "s" : ""} selected` : "Filter by manufacturer."}
              />
            </Card>

            <Card>
              <SubLabel>Error + disabled</SubLabel>
              <div className="space-y-4">
                <Select
                  label="Payment method"
                  options={[
                    { value: "cod",  label: "Cash on Delivery" },
                    { value: "bank", label: "Bank Transfer" },
                    { value: "card", label: "Credit / Debit Card" },
                  ]}
                  placeholder="Select payment…"
                  errorMessage="Please select a payment method."
                />
                <Select
                  label="Warehouse"
                  options={[{ value: "hcm", label: "HCM Warehouse" }]}
                  value="hcm"
                  disabled
                  helperText="Assigned automatically."
                />
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 4. Checkbox ── */}
        <Section title="Checkbox" description="Controlled, uncontrolled, indeterminate state, descriptions, error, and 3 sizes.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Basic + with description</SubLabel>
              <div className="space-y-4">
                <Checkbox
                  label="I agree to the Terms of Service"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                <Checkbox
                  label="Subscribe to newsletter"
                  description="Receive weekly deals and new product alerts."
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
                <Checkbox
                  label="Disabled (checked)"
                  description="This option cannot be changed."
                  checked
                  disabled
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Indeterminate (select-all pattern)</SubLabel>
              <div className="space-y-3">
                <Checkbox
                  label="All features"
                  description="Toggle all options at once."
                  checked={allFeatures}
                  indeterminate={someFeatures && !allFeatures}
                  onChange={(e) => handleAllChange(e.target.checked)}
                />
                <div className="ml-6 space-y-2.5 border-l-2 border-secondary-100 pl-4">
                  <Checkbox label="Express shipping" checked={featureA}
                    onChange={(e) => handleFeatureChange(setFeatureA, e.target.checked)} />
                  <Checkbox label="Gift wrapping" checked={featureB}
                    onChange={(e) => handleFeatureChange(setFeatureB, e.target.checked)} />
                  <Checkbox label="Extended warranty" checked={featureC}
                    onChange={(e) => handleFeatureChange(setFeatureC, e.target.checked)} />
                </div>
              </div>
            </Card>

            <Card>
              <SubLabel>Error state</SubLabel>
              <div className="space-y-4">
                <Checkbox
                  label="Accept terms & conditions"
                  errorMessage="You must accept the terms to continue."
                />
                <Checkbox
                  label="Confirm age (18+)"
                  errorMessage="You must be 18 or older to purchase."
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Sizes — sm · md · lg</SubLabel>
              <div className="space-y-4">
                <Checkbox size="sm" label="Small checkbox" description="For dense lists and tables." defaultChecked />
                <Checkbox size="md" label="Medium checkbox (default)" description="Standard form use." defaultChecked />
                <Checkbox size="lg" label="Large checkbox" description="Prominent choices." defaultChecked />
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 5. RadioGroup ── */}
        <Section title="RadioGroup" description="Grouped radio buttons with vertical/horizontal layout and group-level validation.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Vertical (default)</SubLabel>
              <RadioGroup legend="Shipping method" helperText="Delivery to HCM City.">
                {[
                  { value: "standard", label: "Standard",  desc: "3–5 business days · Free" },
                  { value: "express",  label: "Express",   desc: "1–2 business days · 30,000₫" },
                  { value: "same_day", label: "Same Day",  desc: "Before 10 PM today · 60,000₫" },
                ].map((opt) => (
                  <Radio
                    key={opt.value}
                    name="shipping"
                    value={opt.value}
                    label={opt.label}
                    description={opt.desc}
                    checked={shipping === opt.value}
                    onChange={() => setShipping(opt.value)}
                  />
                ))}
              </RadioGroup>
            </Card>

            <Card>
              <SubLabel>Horizontal layout</SubLabel>
              <div className="space-y-5">
                <RadioGroup legend="Order type" direction="horizontal">
                  {["All", "Online", "In-store"].map((v) => (
                    <Radio key={v} name="order_type" value={v.toLowerCase()} label={v} defaultChecked={v === "All"} />
                  ))}
                </RadioGroup>

                <RadioGroup legend="Time range" direction="horizontal">
                  {["Today", "This week", "This month", "Custom"].map((v) => (
                    <Radio key={v} name="time_range" value={v.toLowerCase().replace(" ", "_")} label={v} defaultChecked={v === "Today"} />
                  ))}
                </RadioGroup>
              </div>
            </Card>

            <Card>
              <SubLabel>Validation error</SubLabel>
              <RadioGroup
                legend="Payment method"
                errorMessage="Please select a payment method to continue."
              >
                {[
                  { value: "cod",  label: "Cash on Delivery",  desc: "Pay when your order arrives." },
                  { value: "bank", label: "Bank Transfer",       desc: "Transfer to our bank account." },
                  { value: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard accepted." },
                ].map((opt) => (
                  <Radio
                    key={opt.value}
                    name="payment_err"
                    value={opt.value}
                    label={opt.label}
                    description={opt.desc}
                    checked={payment === opt.value}
                    onChange={() => setPayment(opt.value)}
                  />
                ))}
              </RadioGroup>
            </Card>

            <Card>
              <SubLabel>Sizes — sm · md · lg</SubLabel>
              <div className="space-y-5">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size}>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-secondary-400">{size}</p>
                    <div className="flex gap-4">
                      <Radio name={`size-demo-${size}`} size={size} value="yes" label="Yes" defaultChecked />
                      <Radio name={`size-demo-${size}`} size={size} value="no"  label="No" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 6. Toggle ── */}
        <Section title="Toggle" description="On/off switch with label, description, labelLeft, sizes, and disabled.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <SubLabel>Notification preferences</SubLabel>
              <div className="space-y-4">
                <Toggle
                  label="Email notifications"
                  description="Order confirmations, shipping updates, and promotions."
                  checked={email}
                  onChange={(e) => setEmail(e.target.checked)}
                />
                <Toggle
                  label="SMS notifications"
                  description="OTP codes and delivery alerts via text message."
                  checked={sms}
                  onChange={(e) => setSms(e.target.checked)}
                />
                <Toggle
                  label="Push notifications"
                  description="Receive alerts in your browser."
                  checked={pushNotif}
                  onChange={(e) => setPushNotif(e.target.checked)}
                />
                <Toggle
                  label="Marketing emails"
                  description="Weekly deals and new arrivals."
                  disabled
                  defaultChecked={false}
                />
              </div>
            </Card>

            <Card>
              <SubLabel>Label position + sizes</SubLabel>
              <div className="space-y-5">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-secondary-400">labelLeft</p>
                  <div className="space-y-3">
                    <Toggle label="Dark mode" labelLeft checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                    <Toggle label="Compact view" labelLeft defaultChecked />
                    <Toggle label="Auto-apply coupons" labelLeft disabled />
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-secondary-400">Sizes</p>
                  <div className="space-y-3">
                    <Toggle size="sm" label="Small toggle" defaultChecked />
                    <Toggle size="md" label="Medium toggle (default)" defaultChecked />
                    <Toggle size="lg" label="Large toggle" defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── 7. Composed: Checkout address form ── */}
        <Section
          title="Composed Form — Checkout Address"
          description="A real-world form combining Input, Select, Textarea, Checkbox, and RadioGroup with client-side validation."
        >
          {submitted ? (
            <Card>
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-100">
                  <svg className="h-7 w-7 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900">Form submitted!</h3>
                <p className="text-sm text-secondary-500">
                  All fields validated successfully. In a real app this would submit to the API.
                </p>
                <Button variant="secondary" size="sm" onClick={() => { setSubmitted(false); setFormName(""); setFormEmail(""); setFormPhone(""); setFormAddress(""); setFormNote(""); }}>
                  Reset form
                </Button>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <Card>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    placeholder="Nguyễn Văn A"
                    prefixIcon={<UserIcon />}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    errorMessage={formErrors.name}
                    required
                  />
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    prefixIcon={<EnvelopeIcon />}
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    errorMessage={formErrors.email}
                    required
                  />
                  <Input
                    label="Phone number"
                    type="tel"
                    placeholder="0901 234 567"
                    prefixIcon={<PhoneIcon />}
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    errorMessage={formErrors.phone}
                    helperText="Vietnamese format: 09x or +84x"
                    required
                  />
                  <Select
                    label="Province / City"
                    options={PROVINCE_OPTIONS}
                    value={province}
                    onChange={(v) => setProvince(v as string)}
                    searchable
                    clearable
                    placeholder="Select your province…"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Street address"
                      placeholder="123 Nguyễn Huệ, Quận 1"
                      prefixIcon={<MapPinIcon />}
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      errorMessage={formErrors.address}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Textarea
                      label="Order note (optional)"
                      placeholder="Any special delivery instructions…"
                      value={formNote}
                      onChange={(e) => setFormNote(e.target.value)}
                      autoResize
                      maxCount={300}
                      showCharCount
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-secondary-100 pt-5">
                  <RadioGroup legend="Shipping method">
                    {[
                      { value: "standard", label: "Standard Delivery",  desc: "3–5 business days · Free" },
                      { value: "express",  label: "Express Delivery",   desc: "1–2 business days · 30,000₫" },
                    ].map((opt) => (
                      <Radio
                        key={opt.value}
                        name="checkout_shipping"
                        value={opt.value}
                        label={opt.label}
                        description={opt.desc}
                        checked={shipping === opt.value}
                        onChange={() => setShipping(opt.value)}
                      />
                    ))}
                  </RadioGroup>

                  <div className="space-y-3 border-t border-secondary-100 pt-4">
                    <Checkbox
                      label="Subscribe to promotions"
                      description="Get weekly deals and exclusive offers."
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                    />
                    <Checkbox
                      label="I agree to the Terms of Service and Privacy Policy"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      errorMessage={!terms && Object.keys(formErrors).length > 0 ? "You must accept the terms to continue." : undefined}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-secondary-100 pt-5">
                  <Button variant="secondary" type="button" onClick={() => setFormErrors({})}>
                    Clear errors
                  </Button>
                  <Button variant="primary" type="submit">
                    Confirm Order
                  </Button>
                </div>
              </Card>
            </form>
          )}
        </Section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-secondary-200 pt-8">
          <Link
            href="/ui-demo/buttons"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            Buttons &amp; Actions
          </Link>
          <Link
            href="/ui-demo/feedback"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next: Feedback &amp; Overlays
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
