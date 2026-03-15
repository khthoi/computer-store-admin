"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ChartBarIcon,
  TagIcon,
  CogIcon,
  ArrowLeftIcon,
  TrashIcon,
  ArchiveBoxIcon,
  CheckIcon,
  PencilIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

import { StatusBadge, type AdminStatus } from "@/src/components/admin/StatusBadge";
import { StatCard } from "@/src/components/admin/StatCard";
import { FilterDropdown, type FilterOption } from "@/src/components/admin/FilterDropdown";
import { ConfirmDialog } from "@/src/components/admin/ConfirmDialog";
import { FileUpload } from "@/src/components/admin/FileUpload";
import { AdminSidebar, type AdminNavItem } from "@/src/components/admin/AdminSidebar";
import { DataTable, type ColumnDef, type SortDir } from "@/src/components/admin/DataTable";
import { formatVND } from "@/src/lib/format";

// ─── Local helpers ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-secondary-900 border-b border-secondary-200 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-secondary-200 bg-white p-5 flex flex-col gap-3">
      {label && <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">{label}</p>}
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs text-secondary-500 font-medium">{children}</p>;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALL_STATUSES: AdminStatus[] = [
  "active", "inactive", "pending", "suspended",
  "draft", "published", "archived",
  "approved", "rejected", "review",
  "online", "offline",
];

const SPARKLINE_REVENUE = [120, 145, 132, 165, 158, 178, 195, 188, 210, 225, 218, 240];
const SPARKLINE_ORDERS  = [30, 42, 38, 51, 45, 60, 55, 70, 65, 80, 75, 88];
const SPARKLINE_RETURNS = [8, 10, 12, 9, 14, 11, 13, 16, 14, 18, 15, 20];
const SPARKLINE_USERS   = [200, 210, 225, 240, 235, 255, 270, 265, 280, 300, 295, 315];

interface ProductRow extends Record<string, unknown> {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  status: AdminStatus;
}

const PRODUCT_DATA: ProductRow[] = [
  { id: "P001", name: "Intel Core i9-14900K", brand: "Intel",   category: "CPU",     price: 13_990_000, stock: 24,  status: "active" },
  { id: "P002", name: "ASUS ROG Strix B760-F", brand: "ASUS",   category: "Mainboard", price: 6_490_000, stock: 12,  status: "active" },
  { id: "P003", name: "Corsair Vengeance 32GB DDR5", brand: "Corsair", category: "RAM", price: 4_290_000, stock: 48, status: "active" },
  { id: "P004", name: "Samsung 990 Pro 2TB", brand: "Samsung",  category: "SSD",     price: 5_990_000, stock: 7,   status: "active" },
  { id: "P005", name: "MSI RTX 4080 Gaming X", brand: "MSI",    category: "GPU",     price: 28_500_000, stock: 3,  status: "pending" },
  { id: "P006", name: "Gigabyte Z790 Aorus Master", brand: "Gigabyte", category: "Mainboard", price: 9_990_000, stock: 0, status: "inactive" },
  { id: "P007", name: "Intel Core i5-14600K", brand: "Intel",   category: "CPU",     price: 6_990_000, stock: 35,  status: "active" },
  { id: "P008", name: "Corsair RM1000x PSU",  brand: "Corsair", category: "PSU",     price: 4_890_000, stock: 15,  status: "draft" },
  { id: "P009", name: "ASUS ROG Strix 4090 OC", brand: "ASUS",  category: "GPU",     price: 52_000_000, stock: 1,  status: "review" },
  { id: "P010", name: "Samsung 870 EVO 1TB",  brand: "Samsung", category: "SSD",     price: 2_490_000, stock: 60,  status: "archived" },
];

const CATEGORY_OPTIONS: FilterOption[] = [
  { value: "CPU",       label: "CPU",       count: 2 },
  { value: "Mainboard", label: "Mainboard", count: 2 },
  { value: "RAM",       label: "RAM",       count: 1 },
  { value: "SSD",       label: "SSD",       count: 2 },
  { value: "GPU",       label: "GPU",       count: 2 },
  { value: "PSU",       label: "PSU",       count: 1 },
];

const BRAND_OPTIONS: FilterOption[] = [
  { value: "Intel",    label: "Intel",    count: 2 },
  { value: "ASUS",     label: "ASUS",     count: 2 },
  { value: "Corsair",  label: "Corsair",  count: 2 },
  { value: "Samsung",  label: "Samsung",  count: 2 },
  { value: "MSI",      label: "MSI",      count: 1 },
  { value: "Gigabyte", label: "Gigabyte", count: 1 },
];

const SIDEBAR_ITEMS: AdminNavItem[] = [
  {
    value: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: <HomeIcon className="w-5 h-5" />,
    active: true,
  },
  {
    value: "products",
    label: "Products",
    icon: <CubeIcon className="w-5 h-5" />,
    badge: "New",
    children: [
      { value: "all-products", label: "All Products", href: "/admin/products" },
      { value: "categories",   label: "Categories",   href: "/admin/products/categories" },
      { value: "brands",       label: "Brands",       href: "/admin/products/brands" },
    ],
  },
  {
    value: "orders",
    label: "Orders",
    icon: <ShoppingBagIcon className="w-5 h-5" />,
    badge: 12,
    children: [
      { value: "all-orders",   label: "All Orders",    href: "/admin/orders" },
      { value: "pending",      label: "Pending",       href: "/admin/orders/pending" },
      { value: "returns",      label: "Returns",       href: "/admin/orders/returns" },
    ],
  },
  {
    value: "promotions",
    label: "Promotions",
    href: "/admin/promotions",
    icon: <TagIcon className="w-5 h-5" />,
  },
  {
    value: "reports",
    label: "Reports",
    href: "/admin/reports",
    icon: <ChartBarIcon className="w-5 h-5" />,
    requiredRoles: ["admin", "super-admin"],
  },
  {
    value: "users",
    label: "Users",
    icon: <UsersIcon className="w-5 h-5" />,
    requiredRoles: ["admin", "super-admin"],
    children: [
      { value: "all-users",  label: "All Users",  href: "/admin/users" },
      { value: "roles",      label: "Roles",      href: "/admin/users/roles", requiredRoles: ["super-admin"] },
    ],
  },
  {
    value: "store",
    label: "Store Settings",
    href: "/admin/store",
    icon: <BuildingStorefrontIcon className="w-5 h-5" />,
    requiredRoles: ["super-admin"],
  },
  {
    value: "settings",
    label: "Settings",
    href: "/admin/settings",
    icon: <CogIcon className="w-5 h-5" />,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDemoPage() {
  // ── FilterDropdown ────────────────────────────────────────────────────────
  const [catFilter,   setCatFilter]   = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  // ── ConfirmDialog ─────────────────────────────────────────────────────────
  type DialogVariant = "danger" | "warning" | "info";
  const [dialogOpen,    setDialogOpen]    = useState(false);
  const [dialogVariant, setDialogVariant] = useState<DialogVariant>("danger");
  const [dialogPhrase,  setDialogPhrase]  = useState(false);
  const [confirming,    setConfirming]    = useState(false);
  const [lastConfirmed, setLastConfirmed] = useState<string | null>(null);

  function openDialog(variant: DialogVariant, withPhrase: boolean) {
    setDialogVariant(variant);
    setDialogPhrase(withPhrase);
    setDialogOpen(true);
    setLastConfirmed(null);
  }

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setDialogOpen(false);
      setLastConfirmed(`Confirmed: ${dialogVariant}${dialogPhrase ? " (phrase)" : ""}`);
    }, 1200);
  }

  // ── FileUpload ────────────────────────────────────────────────────────────
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // ── AdminSidebar ──────────────────────────────────────────────────────────
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarRole,      setSidebarRole]      = useState("admin");

  // ── DataTable ─────────────────────────────────────────────────────────────
  const [search,    setSearch]    = useState("");
  const [sortKey,   setSortKey]   = useState("name");
  const [sortDir,   setSortDir]   = useState<SortDir>("asc");
  const [page,      setPage]      = useState(1);
  const [pageSize,  setPageSize]  = useState(5);
  const [tableLoading, setTableLoading] = useState(false);
  const [catTableFilter, setCatTableFilter] = useState<string[]>([]);

  function handleSortChange(key: string, dir: SortDir) {
    setSortKey(key);
    setSortDir(dir);
    setPage(1);
  }

  // Filter + sort + paginate locally for demo
  const filtered = PRODUCT_DATA.filter((p) => {
    const matchSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchCat = catTableFilter.length
      ? catTableFilter.includes(p.category)
      : true;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    const aVal = a[sortKey as keyof ProductRow];
    const bVal = b[sortKey as keyof ProductRow];
    const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalRows   = filtered.length;
  const tableData   = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: ColumnDef<ProductRow>[] = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      render: (v, row) => (
        <div>
          <p className="font-medium text-secondary-900 truncate max-w-[200px]">{v as string}</p>
          <p className="text-xs text-secondary-500">{row.brand}</p>
        </div>
      ),
    },
    { key: "category", header: "Category", sortable: true },
    {
      key: "price",
      header: "Price",
      sortable: true,
      align: "right",
      render: (v) => (
        <span className="font-medium text-secondary-900">{formatVND(v as number)}</span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      align: "center",
      render: (v) => {
        const qty = v as number;
        return (
          <span className={qty === 0 ? "text-error-600 font-medium" : qty <= 5 ? "text-warning-600 font-medium" : "text-secondary-700"}>
            {qty === 0 ? "Out of stock" : qty}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (v) => <StatusBadge status={v as AdminStatus} size="sm" />,
    },
    {
      key: "id",
      header: "Actions",
      align: "right",
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label={`Edit ${row.name}`}
            className="p-1.5 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${row.name}`}
            className="p-1.5 text-secondary-500 hover:text-error-600 hover:bg-error-50 rounded transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  function simulateLoading() {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 1500);
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-secondary-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/ui-demo"
            className="flex items-center gap-1.5 text-sm text-secondary-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            UI Demo
          </Link>
          <span className="text-secondary-300">/</span>
          <h1 className="text-xl font-bold text-secondary-900">Admin Components</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-14">

        {/* ── 1. StatusBadge ── */}
        <Section title="1. StatusBadge">
          <Card label="All 12 statuses — default size (md)">
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card label="Size: sm">
              <div className="flex flex-wrap gap-2">
                {(["active", "pending", "review", "rejected", "offline"] as AdminStatus[]).map((s) => (
                  <StatusBadge key={s} status={s} size="sm" />
                ))}
              </div>
            </Card>
            <Card label="Size: md (default)">
              <div className="flex flex-wrap gap-2">
                {(["active", "pending", "review", "rejected", "offline"] as AdminStatus[]).map((s) => (
                  <StatusBadge key={s} status={s} size="md" />
                ))}
              </div>
            </Card>
            <Card label="Size: lg">
              <div className="flex flex-wrap gap-2">
                {(["active", "pending", "review", "rejected", "offline"] as AdminStatus[]).map((s) => (
                  <StatusBadge key={s} status={s} size="lg" />
                ))}
              </div>
            </Card>
          </div>

          <Card label="iconless prop">
            <div className="flex flex-wrap gap-2">
              {(["active", "draft", "published", "archived", "suspended", "approved"] as AdminStatus[]).map((s) => (
                <StatusBadge key={s} status={s} iconless />
              ))}
            </div>
          </Card>
        </Section>

        {/* ── 2. StatCard ── */}
        <Section title="2. StatCard">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Monthly Revenue"
              value="1,248,000,000₫"
              changePercent={18.4}
              changeLabel="vs last month"
              icon={<ChartBarIcon className="w-5 h-5" />}
              variant="primary"
              sparklineData={SPARKLINE_REVENUE}
            />
            <StatCard
              title="Orders"
              value="1,847"
              changePercent={12.1}
              changeLabel="vs last month"
              icon={<ShoppingBagIcon className="w-5 h-5" />}
              variant="success"
              sparklineData={SPARKLINE_ORDERS}
            />
            <StatCard
              title="Returns"
              value="143"
              changePercent={-5.2}
              changeLabel="vs last month"
              icon={<ArchiveBoxIcon className="w-5 h-5" />}
              variant="warning"
              sparklineData={SPARKLINE_RETURNS}
            />
            <StatCard
              title="New Customers"
              value="315"
              changePercent={8.9}
              changeLabel="vs last month"
              icon={<UsersIcon className="w-5 h-5" />}
              variant="default"
              sparklineData={SPARKLINE_USERS}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Active Products"
              value="2,481"
              changePercent={3.2}
              changeLabel="this week"
              variant="default"
            />
            <StatCard
              title="Avg. Order Value"
              value="8,540,000₫"
              changePercent={-1.8}
              changeLabel="vs last week"
              variant="error"
            />
            <StatCard
              title="Loading state"
              value="—"
              isLoading
              variant="default"
            />
          </div>
        </Section>

        {/* ── 3. FilterDropdown ── */}
        <Section title="3. FilterDropdown">
          <Card label="Multi-select filter dropdowns with counts">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex flex-col gap-1">
                <SubLabel>Category (searchable)</SubLabel>
                <FilterDropdown
                  label="Category"
                  options={CATEGORY_OPTIONS}
                  selected={catFilter}
                  onChange={setCatFilter}
                  searchable
                />
              </div>
              <div className="flex flex-col gap-1">
                <SubLabel>Brand</SubLabel>
                <FilterDropdown
                  label="Brand"
                  options={BRAND_OPTIONS}
                  selected={brandFilter}
                  onChange={setBrandFilter}
                />
              </div>
            </div>

            {(catFilter.length > 0 || brandFilter.length > 0) && (
              <div className="rounded-lg bg-secondary-50 border border-secondary-200 p-3 text-sm text-secondary-700">
                <p className="font-medium mb-1">Selected filters:</p>
                {catFilter.length > 0 && (
                  <p>Category: <span className="text-primary-700 font-medium">{catFilter.join(", ")}</span></p>
                )}
                {brandFilter.length > 0 && (
                  <p>Brand: <span className="text-primary-700 font-medium">{brandFilter.join(", ")}</span></p>
                )}
              </div>
            )}
          </Card>
        </Section>

        {/* ── 4. ConfirmDialog ── */}
        <Section title="4. ConfirmDialog">
          <Card label="Variants and requiredPhrase guard">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openDialog("danger", false)}
                className="rounded-lg border border-error-300 bg-error-50 px-4 py-2 text-sm font-medium text-error-700 hover:bg-error-100 transition-colors"
              >
                Open Danger Dialog
              </button>
              <button
                type="button"
                onClick={() => openDialog("warning", false)}
                className="rounded-lg border border-warning-300 bg-warning-50 px-4 py-2 text-sm font-medium text-warning-700 hover:bg-warning-100 transition-colors"
              >
                Open Warning Dialog
              </button>
              <button
                type="button"
                onClick={() => openDialog("info", false)}
                className="rounded-lg border border-primary-300 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
              >
                Open Info Dialog
              </button>
              <button
                type="button"
                onClick={() => openDialog("danger", true)}
                className="rounded-lg border border-error-400 bg-error-600 px-4 py-2 text-sm font-medium text-white hover:bg-error-700 transition-colors"
              >
                Delete with Phrase Guard
              </button>
            </div>

            {lastConfirmed && (
              <div className="flex items-center gap-2 rounded-lg bg-success-50 border border-success-200 px-3 py-2 text-sm text-success-700">
                <CheckIcon className="w-4 h-4 shrink-0" />
                {lastConfirmed}
              </div>
            )}
          </Card>

          {/* Dialogs */}
          <ConfirmDialog
            isOpen={dialogOpen && !dialogPhrase}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleConfirm}
            variant={dialogVariant}
            title={
              dialogVariant === "danger"  ? "Delete product?" :
              dialogVariant === "warning" ? "Unpublish product?" :
              "Restore archived items"
            }
            description={
              dialogVariant === "danger"  ? "This will permanently delete the Intel Core i9-14900K and remove all associated data. This action cannot be undone." :
              dialogVariant === "warning" ? "Unpublishing will remove this product from the storefront immediately. Customers with it in their cart will see it as unavailable." :
              "This will restore 12 archived products and make them available for publishing again."
            }
            confirmLabel={
              dialogVariant === "danger"  ? "Delete product" :
              dialogVariant === "warning" ? "Unpublish" :
              "Restore items"
            }
            isConfirming={confirming}
          />

          <ConfirmDialog
            isOpen={dialogOpen && dialogPhrase}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleConfirm}
            variant="danger"
            title="Permanently delete product line?"
            description="You are about to permanently delete the ASUS ROG Strix product line (14 products). All inventory, images, and order history will be erased."
            confirmLabel="Delete everything"
            requiredPhrase="delete ASUS ROG Strix"
            isConfirming={confirming}
          />
        </Section>

        {/* ── 5. FileUpload ── */}
        <Section title="5. FileUpload">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card label="Single image upload">
              <FileUpload
                accept={["image/jpeg", "image/png", "image/webp"]}
                multiple={false}
                maxFileSizeBytes={5 * 1024 * 1024}
                hint="JPG, PNG, WebP — max 5 MB"
                value={uploadedFiles.slice(0, 1).map((f) => ({ id: f.name, file: f }))}
                onChange={(files) => setUploadedFiles(files)}
              />
            </Card>

            <Card label="Multiple product images (max 6, 2 MB each)">
              <FileUpload
                accept={["image/jpeg", "image/png", "image/webp", "image/gif"]}
                multiple
                maxFiles={6}
                maxFileSizeBytes={2 * 1024 * 1024}
                hint="Up to 6 images — JPG, PNG, WebP, GIF — max 2 MB each"
                value={uploadedFiles.map((f) => ({ id: f.name, file: f }))}
                onChange={setUploadedFiles}
              />
            </Card>
          </div>

          {uploadedFiles.length > 0 && (
            <Card label={`${uploadedFiles.length} file(s) selected`}>
              <ul className="flex flex-col gap-1 text-sm text-secondary-700">
                {uploadedFiles.map((f, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="truncate">{f.name}</span>
                    <span className="text-xs text-secondary-500 ml-4 shrink-0">
                      {(f.size / 1024).toFixed(1)} KB
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </Section>

        {/* ── 6. AdminSidebar ── */}
        <Section title="6. AdminSidebar">
          <Card label="Interactive sidebar — collapse toggle + role-based visibility">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <SubLabel>Viewing as role:</SubLabel>
              {(["staff", "admin", "super-admin"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSidebarRole(role)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    sidebarRole === role
                      ? "border-primary-600 bg-primary-600 text-white"
                      : "border-secondary-300 text-secondary-600 hover:border-secondary-500",
                  ].join(" ")}
                >
                  {role}
                </button>
              ))}
            </div>
            <p className="text-xs text-secondary-500 mb-3">
              <ShieldCheckIcon className="w-3.5 h-3.5 inline mr-1" />
              <strong>staff</strong>: hides Reports, Users, Store Settings &amp; user Roles. &nbsp;
              <strong>admin</strong>: hides Store Settings &amp; user Roles. &nbsp;
              <strong>super-admin</strong>: sees everything.
            </p>

            <div className="overflow-hidden rounded-xl border border-secondary-200" style={{ height: 460 }}>
              <AdminSidebar
                items={SIDEBAR_ITEMS}
                userRole={sidebarRole}
                collapsed={sidebarCollapsed}
                onCollapsedChange={setSidebarCollapsed}
                collapsible
                header={
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary-600 text-white text-xs font-bold">
                      PC
                    </div>
                    <span className="truncate text-sm font-semibold text-white">PC Store Admin</span>
                  </div>
                }
                footer={
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">
                      {sidebarRole === "super-admin" ? "SA" : sidebarRole === "admin" ? "AD" : "ST"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">
                        {sidebarRole === "super-admin" ? "Nguyễn Văn A" : sidebarRole === "admin" ? "Trần Thị B" : "Lê Văn C"}
                      </p>
                      <p className="truncate text-[10px] text-secondary-400">{sidebarRole}</p>
                    </div>
                  </div>
                }
              />
            </div>
          </Card>
        </Section>

        {/* ── 7. DataTable ── */}
        <Section title="7. DataTable">
          <Card label="Product management table — sort, search, filter, bulk actions, pagination">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <button
                type="button"
                onClick={simulateLoading}
                className="flex items-center gap-1.5 rounded-lg border border-secondary-300 px-3 py-1.5 text-xs font-medium text-secondary-700 hover:bg-secondary-50 transition-colors"
              >
                Simulate loading
              </button>
              <span className="text-xs text-secondary-500">
                {totalRows} products matching filters
              </span>
            </div>

            <DataTable<ProductRow>
              data={tableData}
              columns={columns}
              keyField="id"
              selectable
              bulkActions={[
                {
                  id: "publish",
                  label: "Publish",
                  icon: <CheckIcon className="w-3.5 h-3.5" />,
                  onClick: (keys) => alert(`Publish: ${keys.join(", ")}`),
                },
                {
                  id: "archive",
                  label: "Archive",
                  icon: <ArchiveBoxIcon className="w-3.5 h-3.5" />,
                  onClick: (keys) => alert(`Archive: ${keys.join(", ")}`),
                },
                {
                  id: "delete",
                  label: "Delete",
                  icon: <TrashIcon className="w-3.5 h-3.5" />,
                  isDanger: true,
                  onClick: (keys) => alert(`Delete: ${keys.join(", ")}`),
                },
              ]}
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={handleSortChange}
              searchQuery={search}
              onSearchChange={(q) => { setSearch(q); setPage(1); }}
              searchPlaceholder="Search products…"
              toolbarActions={
                <FilterDropdown
                  label="Category"
                  options={CATEGORY_OPTIONS}
                  selected={catTableFilter}
                  onChange={(v) => { setCatTableFilter(v); setPage(1); }}
                  searchable
                />
              }
              page={page}
              pageSize={pageSize}
              totalRows={totalRows}
              pageSizeOptions={[5, 10, 25]}
              onPageChange={setPage}
              onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
              isLoading={tableLoading}
              emptyMessage="No products match your search or filters."
            />
          </Card>
        </Section>

      </main>

      {/* Navigation footer */}
      <footer className="border-t border-secondary-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/ui-demo/commerce"
            className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Commerce Components
          </Link>
          <Link
            href="/ui-demo/navigation"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Navigation Components
            <ArrowLeftIcon className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
