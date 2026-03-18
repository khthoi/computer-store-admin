"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WishlistShareBarProps {
  productId: string;
  productName: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WishlistShareBar({
  productId: _productId,
  productName: _productName,
}: WishlistShareBarProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleWishlist = useCallback(() => {
    const next = !isWishlisted;
    setIsWishlisted(next);
    showToast(
      next
        ? "Đã thêm vào danh sách yêu thích"
        : "Đã bỏ khỏi danh sách yêu thích"
    );
  }, [isWishlisted, showToast]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Đã sao chép liên kết!");
    } catch {
      showToast("Không thể sao chép liên kết");
    }
  }, [showToast]);

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {/* Wishlist button */}
        <button
          type="button"
          aria-label="Thêm vào danh sách yêu thích"
          aria-pressed={isWishlisted}
          onClick={handleWishlist}
          className={[
            "flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors",
            isWishlisted
              ? "text-error-500 hover:bg-error-50"
              : "text-secondary-600 hover:text-error-500 hover:bg-secondary-100",
          ].join(" ")}
        >
          <motion.span
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <HeartIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </motion.span>
          Yêu thích
        </button>

        {/* Share button */}
        <button
          type="button"
          aria-label="Chia sẻ sản phẩm"
          onClick={handleShare}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 transition-colors"
        >
          <ShareIcon className="w-5 h-5" aria-hidden="true" />
          Chia sẻ
        </button>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="absolute bottom-full left-0 mb-2 z-20 whitespace-nowrap rounded-lg bg-secondary-900 px-3 py-2 text-xs text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
