"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminNavItem {
  value: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
  disabled?: boolean;
  children?: AdminNavItem[];
  /**
   * If provided, the item is only visible to users whose role is in this array.
   * An empty array (or omitting the prop) shows the item to all roles.
   */
  requiredRoles?: string[];
}

export interface AdminSidebarProps {
  items: AdminNavItem[];
  /** Current authenticated user's role (used for visibility checks) */
  userRole?: string;
  /**
   * Allow collapsing to an icon-only rail.
   * @default true
   */
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Logo/branding area */
  header?: ReactNode;
  /** User info / sign-out area */
  footer?: ReactNode;
  className?: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface SidebarCtx {
  collapsed: boolean;
  userRole: string;
}

const Ctx = createContext<SidebarCtx>({ collapsed: false, userRole: "" });

// ─── Role check ───────────────────────────────────────────────────────────────

function isAllowed(item: AdminNavItem, userRole: string): boolean {
  if (!item.requiredRoles || item.requiredRoles.length === 0) return true;
  return item.requiredRoles.includes(userRole);
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({ item, depth = 0 }: { item: AdminNavItem; depth?: number }) {
  const { collapsed, userRole } = useContext(Ctx);
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(() => !!item.children?.some((c) => c.active));

  const visibleChildren = item.children?.filter((c) => isAllowed(c, userRole));

  const pl = depth === 0 ? "pl-3" : depth === 1 ? "pl-8" : "pl-12";

  const baseClass = [
    "group flex w-full items-center gap-3 rounded-lg py-2 pr-3 text-sm font-medium transition-colors duration-150",
    pl,
    item.active
      ? "bg-primary-900/60 text-white"
      : "text-secondary-300 hover:bg-secondary-700/60 hover:text-white",
    item.disabled ? "pointer-events-none opacity-40" : "",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {item.icon && (
        <span
          className={[
            "shrink-0 w-5 h-5 transition-colors",
            item.active
              ? "text-white"
              : "text-secondary-400 group-hover:text-secondary-200",
          ].join(" ")}
          aria-hidden="true"
        >
          {item.icon}
        </span>
      )}

      {!(collapsed && depth === 0) && (
        <>
          <span className="flex-1 truncate">{item.label}</span>

          {item.badge && (
            <span className="shrink-0 rounded-full bg-primary-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {item.badge}
            </span>
          )}

          {hasChildren && (
            <ChevronRightIcon
              className={[
                "w-4 h-4 shrink-0 text-secondary-500 transition-transform duration-150",
                open ? "rotate-90" : "",
              ].join(" ")}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </>
  );

  return (
    <li>
      {item.href && !hasChildren ? (
        <a
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={baseClass}
          title={collapsed && depth === 0 ? item.label : undefined}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          disabled={item.disabled}
          aria-expanded={hasChildren ? open : undefined}
          onClick={hasChildren ? () => setOpen((v) => !v) : undefined}
          className={baseClass}
          title={collapsed && depth === 0 ? item.label : undefined}
        >
          {content}
        </button>
      )}

      {hasChildren && !collapsed && open && visibleChildren && visibleChildren.length > 0 && (
        <ul role="list" className="mt-0.5 flex flex-col gap-0.5">
          {visibleChildren.map((child) => (
            <NavItem key={child.value} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

// ─── AdminSidebar ─────────────────────────────────────────────────────────────

/**
 * AdminSidebar — collapsible admin navigation with role-based item visibility.
 *
 * ```tsx
 * <AdminSidebar
 *   userRole="admin"
 *   collapsible
 *   header={<AdminLogo />}
 *   items={[
 *     {
 *       value: "dashboard",
 *       label: "Dashboard",
 *       href: "/admin",
 *       icon: <HomeIcon className="w-5 h-5" />,
 *       active: true,
 *     },
 *     {
 *       value: "users",
 *       label: "Users",
 *       icon: <UsersIcon className="w-5 h-5" />,
 *       requiredRoles: ["super-admin", "admin"],
 *       children: [
 *         { value: "all-users",  label: "All Users",  href: "/admin/users" },
 *         { value: "roles",      label: "Roles",      href: "/admin/roles", requiredRoles: ["super-admin"] },
 *       ],
 *     },
 *   ]}
 *   footer={<AdminUserInfo />}
 * />
 * ```
 */
export function AdminSidebar({
  items,
  userRole = "",
  collapsible = true,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  header,
  footer,
  className = "",
}: AdminSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const toggleCollapse = useCallback(() => {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }, [collapsed, isControlled, onCollapsedChange]);

  const visibleItems = items.filter((item) => isAllowed(item, userRole));

  return (
    <Ctx.Provider value={{ collapsed, userRole }}>
      <aside
        className={[
          "flex flex-col bg-secondary-900 text-white transition-all duration-200",
          collapsed ? "w-16" : "w-64",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Header */}
        {(header || collapsible) && (
          <div
            className={[
              "flex shrink-0 items-center border-b border-secondary-700/60 px-3 py-4",
              collapsed ? "justify-center" : "justify-between",
            ].join(" ")}
          >
            {!collapsed && header && (
              <div className="min-w-0 flex-1">{header}</div>
            )}
            {collapsible && (
              <button
                type="button"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                onClick={toggleCollapse}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-secondary-400 transition-colors hover:bg-secondary-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                {collapsed ? (
                  <Bars3Icon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex-1 overflow-y-auto px-2 py-3"
        >
          <ul role="list" className="flex flex-col gap-0.5">
            {visibleItems.map((item) => (
              <NavItem key={item.value} item={item} depth={0} />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {footer && !collapsed && (
          <div className="shrink-0 border-t border-secondary-700/60 p-3">
            {footer}
          </div>
        )}
      </aside>
    </Ctx.Provider>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name               Type               Default  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * items              AdminNavItem[]      required Navigation tree
 * userRole           string             ""       Current user's role for visibility
 * collapsible        boolean            true     Show collapse toggle button
 * collapsed          boolean            —        Controlled collapsed state
 * onCollapsedChange  (v: boolean)=>void —        Callback when collapsed changes
 * header             ReactNode          —        Logo/branding slot
 * footer             ReactNode          —        User info / sign-out slot
 * className          string             ""       Extra classes on <aside>
 *
 * ─── AdminNavItem ─────────────────────────────────────────────────────────────
 *
 * Name           Type              Required  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * value          string            yes       Unique identifier
 * label          string            yes       Display label
 * href           string            no        Link URL
 * icon           ReactNode         no        Heroicon or custom icon (w-5 h-5)
 * active         boolean           no        Highlight as current route
 * badge          ReactNode         no        Badge label (count, "New")
 * disabled       boolean           no        Prevent interaction
 * children       AdminNavItem[]    no        Nested items
 * requiredRoles  string[]          no        Roles that can see this item
 */
