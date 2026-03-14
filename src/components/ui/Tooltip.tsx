"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right";

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Placement relative to trigger
   * @default "top"
   */
  placement?: TooltipPlacement;
  /** Delay before showing (ms)
   * @default 300
   */
  delay?: number;
  /** Maximum width of the tooltip box (Tailwind max-w-* value)
   * @default "max-w-xs"
   */
  maxWidth?: string;
  /** Disable the tooltip */
  disabled?: boolean;
  /**
   * The element that triggers the tooltip.
   * Must be a single React element (accepts ref, onMouseEnter, etc.).
   */
  children: ReactElement;
}

// ─── Placement style map ──────────────────────────────────────────────────────
// Each placement defines:
//   wrapper  — absolute position classes on the tooltip container
//   arrow    — position + rotation classes for the arrow triangle

const PLACEMENT: Record<
  TooltipPlacement,
  { wrapper: string; arrow: string }
> = {
  "top": {
    wrapper: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    arrow:   "left-1/2 top-full -translate-x-1/2 border-t-secondary-800",
  },
  "top-start": {
    wrapper: "bottom-full left-0 mb-2",
    arrow:   "left-3 top-full border-t-secondary-800",
  },
  "top-end": {
    wrapper: "bottom-full right-0 mb-2",
    arrow:   "right-3 top-full border-t-secondary-800",
  },
  "bottom": {
    wrapper: "top-full left-1/2 mt-2 -translate-x-1/2",
    arrow:   "left-1/2 bottom-full -translate-x-1/2 border-b-secondary-800",
  },
  "bottom-start": {
    wrapper: "top-full left-0 mt-2",
    arrow:   "left-3 bottom-full border-b-secondary-800",
  },
  "bottom-end": {
    wrapper: "top-full right-0 mt-2",
    arrow:   "right-3 bottom-full border-b-secondary-800",
  },
  "left": {
    wrapper: "right-full top-1/2 mr-2 -translate-y-1/2",
    arrow:   "left-full top-1/2 -translate-y-1/2 border-l-secondary-800",
  },
  "right": {
    wrapper: "left-full top-1/2 ml-2 -translate-y-1/2",
    arrow:   "right-full top-1/2 -translate-y-1/2 border-r-secondary-800",
  },
};

// Arrow border helpers: transparent borders except the directional one
// create a CSS triangle. We use inline borderColor trick via Tailwind arbitrary.
const ARROW_BORDERS: Record<string, string> = {
  "border-t-secondary-800": "border-[6px] border-transparent border-t-[color:var(--color-secondary-800)]",
  "border-b-secondary-800": "border-[6px] border-transparent border-b-[color:var(--color-secondary-800)]",
  "border-l-secondary-800": "border-[6px] border-transparent border-l-[color:var(--color-secondary-800)]",
  "border-r-secondary-800": "border-[6px] border-transparent border-r-[color:var(--color-secondary-800)]",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Tooltip — hover/focus triggered hint with placement and delay.
 *
 * Wraps a single child element. The child must accept `ref`, `onMouseEnter`,
 * `onMouseLeave`, `onFocus`, and `onBlur` props (all native HTML elements do).
 *
 * ```tsx
 * <Tooltip content="Add to wishlist" placement="top">
 *   <button aria-label="Wishlist"><HeartIcon /></button>
 * </Tooltip>
 *
 * <Tooltip content="Out of stock items cannot be added" placement="right" delay={0}>
 *   <span><Button disabled>Add to Cart</Button></span>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  placement = "top",
  delay = 300,
  maxWidth = "max-w-xs",
  disabled = false,
  children,
}: TooltipProps) {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeout(timerRef.current!);
    if (delay > 0) {
      timerRef.current = setTimeout(() => setVisible(true), delay);
    } else {
      setVisible(true);
    }
  }, [disabled, delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current!);
    setVisible(false);
  }, []);

  if (!isValidElement(children)) return children;

  const placement_ = PLACEMENT[placement];
  const arrowKey = placement_.arrow
    .split(" ")
    .find((c) => c.startsWith("border-") && c.includes("secondary"));
  const arrowClasses = arrowKey ? ARROW_BORDERS[arrowKey] ?? "" : "";

  // Inject event handlers into the child element
  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    "aria-describedby": visible ? tooltipId : undefined,
  });

  return (
    <div className="relative inline-flex">
      {trigger}

      {visible && content && (
        <div
          id={tooltipId}
          role="tooltip"
          className={[
            "pointer-events-none absolute z-50 whitespace-normal break-words rounded bg-secondary-800 px-2.5 py-1.5",
            "text-xs font-medium text-white shadow-md",
            maxWidth,
            placement_.wrapper,
          ].join(" ")}
        >
          {content}

          {/* Arrow */}
          <span
            aria-hidden="true"
            className={[
              "absolute size-0",
              placement_.arrow
                .split(" ")
                .filter((c) => !c.startsWith("border-"))
                .join(" "),
              arrowClasses,
            ].join(" ")}
          />
        </div>
      )}
    </div>
  );
}

/*
 * ─── Prop Table ───────────────────────────────────────────────────────────────
 *
 * Name       Type                Default   Description
 * ──────────────────────────────────────────────────────────────────────────────
 * content    ReactNode           required  Tooltip text/content
 * placement  TooltipPlacement    "top"     Where the tooltip appears
 * delay      number              300       Show delay in milliseconds
 * maxWidth   string              "max-w-xs" Tailwind max-w-* class
 * disabled   boolean             false     Suppress the tooltip
 * children   ReactElement        required  Trigger element (must accept event props)
 *
 * TooltipPlacement values:
 *   "top" | "top-start" | "top-end"
 *   "bottom" | "bottom-start" | "bottom-end"
 *   "left" | "right"
 */
