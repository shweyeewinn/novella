import Link from "next/link";
import { formatPrice } from "@/features/books/catalog";
import type { Order } from "@/features/orders/types";
import {
  getOrderStatusBadgeClass,
  orderStatusHints,
  orderStatusLabels,
} from "@/features/orders/orderStatus";

function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatAddress(order: Order): string | null {
  const s = order.shipping;
  if (!s?.line1) return null;
  const parts = [
    s.fullName,
    s.line1,
    s.line2,
    [s.city, s.region].filter(Boolean).join(", "),
    s.postalCode,
    s.country,
  ].filter(Boolean);
  return parts.join(" · ");
}

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  const addressLine = formatAddress(order);

  return (
    <article className="rounded-xl border border-border bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-sm font-semibold text-ink">{order.id}</p>
          <p className="font-sans text-xs text-ink-muted">{formatOrderDate(order.createdAt)}</p>
        </div>
        <span
          className={`inline-flex rounded-full border px-3 py-1 font-sans text-xs font-semibold ${getOrderStatusBadgeClass(order.status)}`}
        >
          {orderStatusLabels[order.status]}
        </span>
      </div>

      <p className="mt-3 font-sans text-sm text-ink-muted">{orderStatusHints[order.status]}</p>

      <ul className="mt-4 space-y-2 border-t border-border pt-4 font-sans text-sm">
        {order.lineItems.map((line) => (
          <li key={`${order.id}-${line.bookId}`} className="flex justify-between gap-3">
            <span className="text-ink">
              {line.title} <span className="text-ink-muted">× {line.quantity}</span>
            </span>
            <span className="shrink-0 tabular-nums text-ink-muted">
              {formatPrice(line.unitCents * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 flex justify-between border-t border-border pt-4 font-sans text-sm">
        <span className="font-medium text-ink">Total</span>
        <span className="font-semibold tabular-nums text-ink">
          {formatPrice(order.totalCents)}
        </span>
      </p>

      {addressLine ? (
        <p className="mt-3 font-sans text-sm text-ink-muted">
          <span className="font-medium text-ink">Delivery:</span> {addressLine}
        </p>
      ) : null}

      {order.trackingNote ? (
        <p className="mt-2 font-sans text-sm text-ink">
          <span className="font-medium">Tracking:</span> {order.trackingNote}
        </p>
      ) : null}

      {order.status === "pending_payment" ? (
        <Link
          href={`/checkout/success?order=${encodeURIComponent(order.id)}&total=${order.totalCents}&email=${encodeURIComponent(order.email)}`}
          className="mt-4 inline-flex font-sans text-sm font-semibold text-primary hover:underline"
        >
          View bank transfer details →
        </Link>
      ) : null}
    </article>
  );
}
