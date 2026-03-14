"use client";

import {
  ReactPortal,
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DrawerPosition = "left" | "right" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl";

export interface DrawerProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when the drawer requests to close */
  onClose: () => void;
  /** Slide-in direction
   * @default "right"
   */
  position?: DrawerPosition;
  /** Panel width (left/right) or height (bottom)
   * @default "md"
   */
  size?: DrawerSize;
  /** Drawer heading */
  title?: string;
  /** Close when clicking the overlay
   * @default true
   */
  closeOnBackdrop?: boolean;
  /** Close on Escape key
   * @default true
   */
  closeOnEscape?: boolean;
  /** Footer slot */
  footer?: ReactNode;
  children: ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
  'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
}

// ─── Style maps ───────────────────────────────────────────────────────────────

// Panel size for left/right drawers
const SIDE_SIZE: Record<DrawerSize, string> = {
  sm: "w-72",
  md: "w-80",
  lg: "w-96",
  xl: "w-[30rem]",
};

// Panel height for bottom drawer
const BOTTOM_SIZE: Record<DrawerSize, string> = {
  sm: "max-h-[30vh]",
  md: "max-h-[50vh]",
  lg: "max-h-[70vh]",
  xl: "max-h-[90vh]",
};

// Slide-in/out transforms per position
const TRANSLATE_CLOSED: Record<DrawerPosition, string> = {
  left:   "-translate-x-full",
  right:  "translate-x-full",
  bottom: "translate-y-full",
};

// Panel placement classes per position
const PANEL_POSITION: Record<DrawerPosition, string> = {
  left:   "inset-y-0 left-0 flex-col",
  right:  "inset-y-0 right-0 flex-col",
  bottom: "inset-x-0 bottom-0 flex-row rounded-t-lg",
};


// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Drawer — slide-in panel from any edge, with overlay, focus trap, and portal.
 *
 * ```tsx
 * const [cartOpen, setCartOpen] = useState(false);
 *
 * <Button onClick={() => setCartOpen(true)}>Open Cart</Button>
 *
 * <Drawer
 *   isOpen={cartOpen}
 *   onClose={() => setCartOpen(false)}
 *   title="Your Cart"
 *   position="right"
 *   footer={<Button fullWidth>Checkout</Button>}
 * >
 *   <CartItem ... />
 * </Drawer>
 * ```
 */
export function Drawer({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  title,
  closeOnBackdrop = true,
  closeOnEscape = true,
  footer,
  children,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isBottom = position === "bottom";

  // ── Focus management ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const timer = setTimeout(() => {
      const focusables = panelRef.current
        ? getFocusableElements(panelRef.current)
        : [];
      focusables[0]?.focus();
    }, 20);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    previousFocusRef.current?.focus();
  }, [isOpen]);

  // ── Scroll lock ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // ── Keyboard handling ─────────────────────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (closeOnEscape && e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = getFocusableElements(panelRef.current);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [closeOnEscape, onClose]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={[
        "fixed inset-0 z-50",
        // Visibility: keep in DOM for CSS transition to work
        isOpen ? "visible" : "invisible",
      ].join(" ")}
      onKeyDown={handleKeyDown}
    >
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        className={[
          "absolute inset-0 bg-secondary-900/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={[
          "absolute flex bg-white shadow-xl transition-transform duration-300 ease-in-out",
          PANEL_POSITION[position],
          // Size: width for side drawers, height cap for bottom
          isBottom
            ? `w-full ${BOTTOM_SIZE[size]}`
            : `h-full ${SIDE_SIZE[size]}`,
          // Slide in/out
          isOpen ? "translate-x-0 translate-y-0" : TRANSLATE_CLOSED[position],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-200 px-5 py-4">
          {title ? (
            <h2
              id={titleId}
              className="text-base font-semibold text-secondary-900"
            >
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            aria-label="Close drawer"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded text-secondary-400 transition-colors hover:bg-secondary-100 hover:text-secondary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <XMarkIcon className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 border-t border-secondary-200 px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name             Type                      Default   Description
 * ──────────────────────────────────────────────────────────────────────────────
 * isOpen           boolean                   required  Controls visibility
 * onClose          () => void                required  Close callback
 * position         "left"|"right"|"bottom"   "right"   Slide-in direction
 * size             "sm"|"md"|"lg"|"xl"       "md"      Panel width/height
 * title            string                    —         Heading text
 * closeOnBackdrop  boolean                   true      Close on overlay click
 * closeOnEscape    boolean                   true      Close on Escape key
 * footer           ReactNode                 —         Bottom action area
 * children         ReactNode                 required  Drawer body content
 */
