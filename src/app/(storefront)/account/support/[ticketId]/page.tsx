import { notFound } from "next/navigation";
import { TicketDetailPageInner } from "@/src/components/account/support/TicketDetailPageInner";
import { SUPPORT_TICKETS } from "@/src/app/(storefront)/account/support/_mock_data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ ticketId: string }>;
}

/**
 * /account/support/[ticketId]
 *
 * Server component — always fresh (force-dynamic).
 * Looks up the ticket by ID; renders 404 if not found.
 */
export default async function SupportTicketDetailPage({ params }: Props) {
  const { ticketId } = await params;

  const ticket = SUPPORT_TICKETS.find((t) => t.id === ticketId);
  if (!ticket) notFound();

  return (
    <div className="rounded-2xl border border-secondary-200 bg-white">
      <TicketDetailPageInner ticket={ticket} />
    </div>
  );
}
