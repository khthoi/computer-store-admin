"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MegaMenuItem {
  /** Unique key */
  value: string;
  /** Display label */
  label: string;
  /** Link target */
  href: string;
  /** Optional Heroicon or any ReactNode */
  icon?: ReactNode;
  /** Small descriptor shown beneath the label */
  description?: string;
}

export interface MegaMenuColumn {
  /** Column heading */
  heading: string;
  items: MegaMenuItem[];
}

export interface MegaMenuTrigger {
  /** Label shown in the nav bar */
  label: string;
  /** Columns rendered in the dropdown panel */
  columns: MegaMenuColumn[];
  /** Optional footer link/content shown at the bottom of the panel */
  footer?: ReactNode;
}

export interface MegaMenuProps {
  /** List of top-level nav triggers with their dropdown columns */
  triggers: MegaMenuTrigger[];
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * MegaMenu — multi-column dropdown navigation for product categories.
 *
 * ```tsx
 * <MegaMenu
 *   triggers={[
 *     {
 *       label: "Components",
 *       columns: [
 *         {
 *           heading: "Processing",
 *           items: [
 *             { value: "cpu", label: "CPUs", href: "/products/cpu", icon: <CpuChipIcon className="w-5 h-5" /> },
 *             { value: "gpu", label: "GPUs", href: "/products/gpu" },
 *           ],
 *         },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function MegaMenu({ triggers, className = "" }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const toggle = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  // Close on outside click
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeIndex, close]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") close();
    },
    [close]
  );

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={["relative flex items-center gap-1", className]
        .filter(Boolean)
        .join(" ")}
    >
      {triggers.map((trigger, i) => {
        const isOpen = activeIndex === i;
        return (
          <div key={trigger.label} className="relative">
            {/* Trigger button */}
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className={[
                "flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors",
                isOpen
                  ? "bg-primary-50 text-primary-700"
                  : "text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              ].join(" ")}
            >
              {trigger.label}
              <ChevronDownIcon
                className={[
                  "w-4 h-4 text-secondary-400 transition-transform duration-150",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown panel */}
            {isOpen && (
              <div
                role="region"
                aria-label={`${trigger.label} menu`}
                className="absolute left-0 top-full z-50 mt-2 min-w-[480px] rounded-lg border border-secondary-200 bg-white shadow-xl"
              >
                {/* Columns */}
                <div
                  className={[
                    "grid gap-0 p-5",
                    trigger.columns.length === 1
                      ? "grid-cols-1"
                      : trigger.columns.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3",
                  ].join(" ")}
                >
                  {trigger.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-secondary-400">
                        {col.heading}
                      </p>
                      <ul role="list" className="flex flex-col gap-0.5">
                        {col.items.map((item) => (
                          <li key={item.value}>
                            <a
                              href={item.href}
                              onClick={close}
                              className="flex items-start gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-secondary-50 group"
                            >
                              {item.icon && (
                                <span
                                  className="mt-0.5 shrink-0 w-5 h-5 text-secondary-400 group-hover:text-primary-600 transition-colors"
                                  aria-hidden="true"
                                >
                                  {item.icon}
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="block font-medium text-secondary-800 group-hover:text-primary-700">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="block text-xs text-secondary-500 mt-0.5">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {trigger.footer && (
                  <div className="border-t border-secondary-100 px-5 py-3">
                    {trigger.footer}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name      Type               Default  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * triggers  MegaMenuTrigger[]  required Top-level nav items with dropdown columns
 * className string             ""       Extra classes on the root wrapper
 *
 * ─── MegaMenuTrigger ──────────────────────────────────────────────────────────
 *
 * Name     Type              Required  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * label    string            yes       Button label in nav bar
 * columns  MegaMenuColumn[]  yes       Columns shown in dropdown panel
 * footer   ReactNode         no        Footer slot at the bottom of panel
 *
 * ─── MegaMenuColumn ───────────────────────────────────────────────────────────
 *
 * Name     Type            Required  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * heading  string          yes       Column heading (uppercase label)
 * items    MegaMenuItem[]  yes       Links in this column
 *
 * ─── MegaMenuItem ─────────────────────────────────────────────────────────────
 *
 * Name         Type       Required  Description
 * ──────────────────────────────────────────────────────────────────────────────
 * value        string     yes       Unique key
 * label        string     yes       Link label
 * href         string     yes       Link target
 * icon         ReactNode  no        Heroicon or custom icon node
 * description  string     no        Subtitle shown beneath label
 */
