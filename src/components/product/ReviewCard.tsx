"use client";

import { useCallback, useState } from "react";
import { HandThumbUpIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@/src/components/ui/Avatar";
import { Badge } from "@/src/components/ui/Badge";
import { Modal } from "@/src/components/ui/Modal";
import { RatingStars } from "@/src/components/product/RatingStars";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  /** Pre-masked name e.g. "Nguyễn V*** T***" */
  authorName: string;
  avatarUrl?: string;
  rating: number;
  title?: string;
  content: string;
  images?: string[];
  /** e.g. "RAM 16GB / SSD 512GB" */
  purchasedVariant?: string;
  helpfulCount: number;
  /** ISO date string */
  createdAt: string;
  isVerifiedPurchase: boolean;
}

export interface ReviewCardProps {
  review: Review;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// ─── HelpfulButton (client sub-component) ─────────────────────────────────────

function HelpfulButton({ initialCount }: { initialCount: number }) {
  const [marked, setMarked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleClick = useCallback(() => {
    if (marked) {
      setMarked(false);
      setCount((c) => c - 1);
    } else {
      setMarked(true);
      setCount((c) => c + 1);
    }
  }, [marked]);

  return (
    <button
      type="button"
      aria-label="Đánh dấu đánh giá là hữu ích"
      aria-pressed={marked}
      onClick={handleClick}
      className={[
        "flex items-center gap-1.5 text-sm transition-colors",
        marked
          ? "text-primary-600 font-medium"
          : "text-secondary-500 hover:text-primary-600",
      ].join(" ")}
    >
      {marked ? (
        <HandThumbUpSolidIcon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <HandThumbUpIcon className="w-4 h-4" aria-hidden="true" />
      )}
      <span>Hữu ích ({count})</span>
    </button>
  );
}

// ─── ReviewCard ────────────────────────────────────────────────────────────────

export function ReviewCard({ review }: ReviewCardProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Show at most 5 review images; remaining shown as +N badge
  const maxImages = 5;
  const visibleImages = review.images?.slice(0, maxImages) ?? [];
  const extraImages =
    (review.images?.length ?? 0) > maxImages
      ? (review.images?.length ?? 0) - maxImages
      : 0;

  return (
    <article className="bg-white rounded-xl border border-secondary-200 p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            src={review.avatarUrl}
            name={review.authorName}
            size="md"
            shape="circle"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary-900 truncate">
              {review.authorName}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              {review.isVerifiedPurchase && (
                <Badge variant="success" size="sm">
                  <CheckBadgeIcon className="w-3 h-3 mr-0.5" aria-hidden="true" />
                  Đã mua hàng
                </Badge>
              )}
              {review.purchasedVariant && (
                <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded-full">
                  {review.purchasedVariant}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <RatingStars value={review.rating} mode="display" size="sm" />
          <time
            dateTime={review.createdAt}
            className="text-xs text-secondary-400"
          >
            {formatDate(review.createdAt)}
          </time>
        </div>
      </div>

      {/* Review title */}
      {review.title && (
        <p className="mt-3 text-sm font-semibold text-secondary-900">
          {review.title}
        </p>
      )}

      {/* Review content */}
      <p className="mt-2 text-sm text-secondary-700 leading-relaxed whitespace-pre-line">
        {review.content}
      </p>

      {/* Review images */}
      {visibleImages.length > 0 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          {visibleImages.map((src, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Xem ảnh đánh giá ${idx + 1}`}
              onClick={() => setLightboxSrc(src)}
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Ảnh đánh giá ${idx + 1}`}
                loading="lazy"
                width={72}
                height={72}
                className="w-[72px] h-[72px] rounded-lg object-cover border border-secondary-200 hover:opacity-80 transition-opacity"
              />
            </button>
          ))}
          {extraImages > 0 && (
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-secondary-100 text-sm font-medium text-secondary-600">
              +{extraImages}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-secondary-100">
        <HelpfulButton initialCount={review.helpfulCount} />
      </div>

      {/* Image lightbox */}
      <Modal
        isOpen={lightboxSrc !== null}
        onClose={() => setLightboxSrc(null)}
        size="xl"
        hideCloseButton={false}
      >
        {lightboxSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={lightboxSrc}
            alt="Ảnh đánh giá phóng to"
            className="max-h-[70vh] w-full object-contain rounded-lg"
          />
        )}
      </Modal>
    </article>
  );
}
