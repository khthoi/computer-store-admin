"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "warning" | "error" | "info";
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface ToastMessageProps {
  /** Controls visibility — parent is responsible for toggling */
  isVisible: boolean;
  /** Visual variant — controls color and icon @default "success" */
  type?: ToastType;
  /** Message text */
  message: string;
  /** Viewport corner placement @default "top-right" */
  position?: ToastPosition;
  /**
   * Auto-dismiss duration in milliseconds.
   * Pass `0` to disable auto-dismiss.
   * @default 3500
   */
  duration?: number;
  /**
   * Called when the auto-dismiss timer fires or the close button is clicked.
   * The parent should set `isVisible` to `false` in this handler.
   */
  onClose?: () => void;
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const POSITION_CLASS: Record<ToastPosition, string> = {
  "top-right":    "top-6 right-6",
  "top-left":     "top-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "bottom-left":  "bottom-6 left-6",
};

const TYPE_BG: Record<ToastType, string> = {
  success: "bg-success-600",
  error:   "bg-error-600",
  warning: "bg-warning-500",
  info:    "bg-primary-600",
};

const TYPE_ICON: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon      className="h-5 w-5 shrink-0" aria-hidden="true" />,
  error:   <ExclamationCircleIcon   className="h-5 w-5 shrink-0" aria-hidden="true" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />,
  info:    <InformationCircleIcon   className="h-5 w-5 shrink-0" aria-hidden="true" />,
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ToastMessage — a fixed-position notification with auto-dismiss and Framer Motion transitions.
 *
 * Renders via `createPortal` so it is never clipped by parent containers.
 * The parent controls visibility via `isVisible`; `onClose` is called when the
 * timer fires or the user clicks the × button.
 *
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <ToastMessage
 *   isVisible={visible}
 *   type="success"
 *   message="Đã thêm vào giỏ hàng!"
 *   position="top-right"
 *   duration={3000}
 *   onClose={() => setVisible(false)}
 * />
 * ```
 */
export function ToastMessage({
  isVisible,
  type = "success",
  message,
  position = "top-right",
  duration = 3500,
  onClose,
}: ToastMessageProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Freeze the last visible content so the exit animation doesn't flash empty text
  const [displayType, setDisplayType] = useState<ToastType>(type);
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => { setIsMounted(true); }, []);

  // Update display values only when becoming visible (captures the new toast's data)
  useEffect(() => {
    if (isVisible) {
      setDisplayType(type);
      setDisplayMessage(message);
    }
  }, [isVisible, type, message]);

  // Auto-dismiss timer — resets whenever isVisible flips to true
  useEffect(() => {
    if (!isVisible || !duration || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isMounted) return null;

  const isTop = position.startsWith("top");
  const yOffset = isTop ? -16 : 16;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,       scale: 1    }}
          exit={{    opacity: 0, y: yOffset, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className={[
            "fixed z-[70] flex items-center gap-2.5 rounded-xl px-4 py-3",
            "text-sm font-medium text-white shadow-xl pointer-events-auto",
            POSITION_CLASS[position],
            TYPE_BG[displayType],
          ].join(" ")}
        >
          {TYPE_ICON[displayType]}

          <span>{displayMessage}</span>

          {onClose && (
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={onClose}
              className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
