"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeftIcon, PaperClipIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { ToastMessage } from "@/src/components/ui/Toast";
import { Tooltip } from "@/src/components/ui/Tooltip";
import { TicketStatusBadge } from "@/src/components/account/support/TicketStatusBadge";
import {
  TICKET_CATEGORY_LABELS,
  type SupportTicket,
  type TicketMessage,
} from "@/src/app/(storefront)/account/support/_mock_data";

// ─── Constants ────────────────────────────────────────────────────────────────

// Approx pixel height of one line at text-sm (14px) × leading-normal (1.5) + py-2.5 (20px)
const TEXTAREA_LINE_H = 21; // px per line
const TEXTAREA_PADDING_V = 20; // px (py-2.5 top + bottom)
const TEXTAREA_1_LINE = TEXTAREA_LINE_H + TEXTAREA_PADDING_V; // 41px
const TEXTAREA_5_LINES = TEXTAREA_LINE_H * 5 + TEXTAREA_PADDING_V; // 125px

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TicketDetailPageInnerProps {
  ticket: SupportTicket;
}

// ─── Sub-component: message bubble ────────────────────────────────────────────

function MessageBubble({ message }: { message: TicketMessage }) {
  const isCustomer = message.role === "customer";

  return (
    <div className={["flex gap-3", isCustomer ? "justify-end" : "justify-start"].join(" ")}>
      {/* Staff avatar */}
      {!isCustomer && (
        <div className="h-8 w-8 shrink-0 rounded-full bg-secondary-200 flex items-center justify-center mt-1">
          <UserIcon className="h-4 w-4 text-secondary-500" aria-hidden="true" />
        </div>
      )}

      {/*
        Content column:
        - max-w-[65%] is relative to the flex row (the correct containing block),
          so it correctly caps long messages at 65% of the thread width.
        - The bubble inside uses w-fit to shrink to content for short messages.
      */}
      <div
        className={[
          "flex flex-col gap-2 max-w-[65%]",
          isCustomer ? "items-end" : "items-start",
        ].join(" ")}
      >
        {/* Bubble — Tooltip shows timestamp on hover */}
        <Tooltip
          content={formatDateTime(message.sentAt)}
          placement={isCustomer ? "left" : "right"}
          delay={300}
        >
          <div
            className={[
              "w-fit break-words rounded-2xl px-4 py-3",
              isCustomer
                ? "rounded-tr-sm bg-primary-600 text-white"
                : "rounded-tl-sm bg-white border border-secondary-200",
            ].join(" ")}
          >
            <p
              className={[
                "text-sm leading-relaxed whitespace-pre-wrap",
                isCustomer ? "text-white" : "text-secondary-800",
              ].join(" ")}
            >
              {message.content}
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * TicketDetailPageInner — client root for /account/support/[ticketId].
 *
 * Chat-style message thread. Timestamps shown via Tooltip on bubble hover.
 * Reply area: [📎] [auto-resize textarea, 1–5 lines] [Gửi]
 */
export function TicketDetailPageInner({ ticket }: TicketDetailPageInnerProps) {
  const [localMessages, setLocalMessages] = useState<TicketMessage[]>(ticket.messages);
  const [localStatus, setLocalStatus] = useState(ticket.status);

  // Reply form
  const [replyContent, setReplyContent] = useState("");
  const [replyError, setReplyError] = useState<string | undefined>();
  const [isSending, setIsSending] = useState(false);

  // Resolve action
  const [isResolving, setIsResolving] = useState(false);

  // Toast
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "info";
  }>({ visible: false, message: "", type: "success" });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Textarea auto-resize ────────────────────────────────────────────────────

  const resizeTextarea = useCallback((el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, TEXTAREA_5_LINES);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > TEXTAREA_5_LINES ? "auto" : "hidden";
  }, []);

  const resetTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${TEXTAREA_1_LINE}px`;
    el.style.overflowY = "hidden";
  }, []);

  const handleReplyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReplyContent(e.target.value);
      resizeTextarea(e.target);
    },
    [resizeTextarea]
  );

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleMarkResolved = useCallback(async () => {
    setIsResolving(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      setLocalStatus("resolved");
      setToast({
        visible: true,
        message: "Yêu cầu đã được đánh dấu là đã giải quyết.",
        type: "success",
      });
    } finally {
      setIsResolving(false);
    }
  }, []);

  const handleSendReply = useCallback(async () => {
    if (!replyContent.trim()) {
      setReplyError("Vui lòng nhập nội dung trả lời.");
      return;
    }
    setReplyError(undefined);
    setIsSending(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 600));

      const newMsg: TicketMessage = {
        id: crypto.randomUUID(),
        role: "customer",
        content: replyContent.trim(),
        sentAt: new Date().toISOString(),
      };

      setLocalMessages((prev) => [...prev, newMsg]);
      setReplyContent("");
      resetTextarea();
      setToast({ visible: true, message: "Tin nhắn đã được gửi.", type: "success" });
    } finally {
      setIsSending(false);
    }
  }, [replyContent, resetTextarea]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="flex flex-col">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-secondary-100">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ChevronLeftIcon />}
            onClick={() => window.history.back()}
          >
            Hỗ trợ
          </Button>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="font-mono text-lg font-bold text-secondary-900">
                {ticket.id}
              </p>
              <p className="text-sm text-secondary-500">{ticket.subject}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <TicketStatusBadge status={localStatus} />
                <Badge variant="default" size="sm">
                  {TICKET_CATEGORY_LABELS[ticket.category]}
                </Badge>
              </div>
            </div>

            {/* Mark resolved button — only while in_progress */}
            {localStatus === "in_progress" && (
              <Button
                variant="outline"
                size="sm"
                isLoading={isResolving}
                disabled={isResolving}
                onClick={handleMarkResolved}
              >
                Đánh dấu đã giải quyết
              </Button>
            )}
          </div>
        </div>

        {/* ── Message thread ────────────────────────────────────────────────── */}
        <div className="px-6 max-h-[480px] overflow-y-auto flex flex-col gap-4 py-4">
          {localMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>

        {/* ── Reply section / resolved banner ───────────────────────────────── */}
        {localStatus === "in_progress" ? (
          <div className="px-6 py-4 border-t border-secondary-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400 mb-2">
              Trả lời
            </p>

            <div className="flex gap-2 my-auto">
              {/* Attachment icon button */}
              <Tooltip content="Đính kèm tệp" placement="top">
                <button
                  type="button"
                  aria-label="Đính kèm tệp"
                  disabled={isSending}
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </Tooltip>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="sr-only"
                tabIndex={-1}
              />

              {/* Auto-resize textarea + error */}
              <div className="flex-1 flex my-auto min-w-0">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Nhập nội dung trả lời..."
                  value={replyContent}
                  disabled={isSending}
                  onChange={handleReplyChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                  aria-invalid={replyError ? true : undefined}
                  style={{
                    height: `${TEXTAREA_1_LINE}px`,
                    overflowY: "hidden",
                  }}
                  className={[
                    "w-full rounded border bg-white px-3 py-2.5 text-sm",
                    "text-secondary-700 placeholder:text-secondary-400",
                    "resize-none transition-colors duration-150",
                    "focus:outline-none focus:ring-2",
                    "disabled:cursor-not-allowed disabled:bg-secondary-100 disabled:text-secondary-400",
                    replyError
                      ? "border-error-400 focus:border-error-500 focus:ring-error-500/15"
                      : "border-secondary-300 focus:border-primary-500 focus:ring-primary-500/15",
                  ].join(" ")}
                />
                {replyError && (
                  <p role="alert" className="mt-1 text-xs text-error-600">
                    {replyError}
                  </p>
                )}
              </div>

              {/* Send button */}
              <Button
                variant="primary"
                size="md"
                isLoading={isSending}
                disabled={isSending}
                onClick={handleSendReply}
                className="shrink-0 my-auto"
              >
                Gửi
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-4 text-center text-sm text-secondary-400 border-t border-secondary-100">
            Yêu cầu này đã được giải quyết.
          </div>
        )}
      </div>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      <ToastMessage
        isVisible={toast.visible}
        type={toast.type}
        message={toast.message}
        position="bottom-right"
        duration={4000}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
