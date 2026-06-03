"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/features/books/catalog";
import { getOrderStatusBadgeClass, orderStatusLabels } from "@/features/orders/orderStatus";
import {
  fulfillmentStepIndex,
  isInFulfillmentPipeline,
  needsBankCheck,
  nextFulfillmentStatus,
} from "@/features/admin/orderFulfillment";
import type { Order, OrderStatus } from "@/types/order";
import { Button } from "@/shared/components/ui/Button";

type Filter = "needs_review" | "fulfillment" | "all";

const FULFILLMENT_STEP_LABELS = ["Payment confirmed", "Preparing", "Shipped", "Delivered"] as const;

function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function filterOrders(orders: Order[], filter: Filter): Order[] {
  if (filter === "all") return orders;
  if (filter === "needs_review") {
    return orders.filter((o) => needsBankCheck(o.status));
  }
  return orders.filter((o) => isInFulfillmentPipeline(o.status));
}

type AdminOrdersViewProps = {
  initialOrders: Order[];
};

function FulfillmentProgress({ status }: { status: OrderStatus }) {
  const current = fulfillmentStepIndex(status);
  if (current < 0) return null;

  return (
    <ol className="mt-3 flex flex-wrap gap-2 font-sans text-xs" aria-label="Fulfillment progress">
      {FULFILLMENT_STEP_LABELS.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li
            key={label}
            className={`rounded-full border px-2.5 py-1 ${
              done
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : active
                  ? "border-primary bg-primary/10 font-semibold text-ink"
                  : "border-border text-ink-muted"
            }`}
          >
            {label}
          </li>
        );
      })}
    </ol>
  );
}

export default function AdminOrdersView({ initialOrders }: AdminOrdersViewProps) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<Filter>("needs_review");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const visible = useMemo(() => filterOrders(orders, filter), [orders, filter]);

  const filterHint: Record<Filter, string> = {
    needs_review: "Confirm payments after matching transfers in your bank account.",
    fulfillment: "Move orders through preparing → shipped → delivered after payment is confirmed.",
    all: "All orders — payment review and fulfillment.",
  };

  const emptyMessage: Record<Filter, string> = {
    needs_review: "No orders awaiting bank verification.",
    fulfillment: "No orders ready for fulfillment. Confirm payment first.",
    all: "No orders yet.",
  };

  async function updateStatus(orderId: string, status: OrderStatus) {
    setBusyId(orderId);
    setMessage(null);

    const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = (await res.json()) as { order?: Order; error?: string };
    setBusyId(null);

    if (!res.ok || !data.order) {
      setMessage(data.error ?? "Update failed");
      return;
    }

    setOrders((prev) => prev.map((o) => (o.id === data.order!.id ? data.order! : o)));
    setMessage(`Order ${orderId} → ${orderStatusLabels[status]}`);
    router.refresh();
  }

  const filterButtonClass = (active: boolean) =>
    `rounded-md border px-3 py-1.5 ${
      active ? "border-primary bg-primary/10 text-ink" : "border-border text-ink-muted"
    }`;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="font-sans text-sm text-ink-muted">{filterHint[filter]}</p>
        <div className="flex flex-wrap gap-2 font-sans text-sm">
          <button
            type="button"
            onClick={() => setFilter("needs_review")}
            className={filterButtonClass(filter === "needs_review")}
          >
            Needs bank check
          </button>
          <button
            type="button"
            onClick={() => setFilter("fulfillment")}
            className={filterButtonClass(filter === "fulfillment")}
          >
            Fulfillment
          </button>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={filterButtonClass(filter === "all")}
          >
            All orders
          </button>
        </div>
      </div>

      {message ? (
        <p className="font-sans text-sm text-ink" role="status">
          {message}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <p className="rounded-xl border border-border bg-paper-muted/50 px-5 py-8 text-center font-sans text-sm text-ink-muted">
          {emptyMessage[filter]}
        </p>
      ) : (
        <ul className="space-y-4">
          {visible.map((order) => {
            const fulfillmentAction = nextFulfillmentStatus(order.status);
            const showProgress = isInFulfillmentPipeline(order.status);

            return (
              <li key={order.id} className="rounded-xl border border-border bg-paper p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">{order.id}</p>
                    <p className="font-sans text-xs text-ink-muted">
                      {formatOrderDate(order.createdAt)} · {order.email}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 font-sans text-xs font-semibold ${getOrderStatusBadgeClass(order.status)}`}
                  >
                    {orderStatusLabels[order.status]}
                  </span>
                </div>

                {showProgress ? <FulfillmentProgress status={order.status} /> : null}

                <p className="mt-2 font-serif text-lg text-primary">
                  {formatPrice(order.totalCents)}
                </p>

                <ul className="mt-3 space-y-1 font-sans text-sm text-ink-muted">
                  {order.lineItems.map((line) => (
                    <li key={line.bookId}>
                      {line.title} × {line.quantity}
                    </li>
                  ))}
                </ul>

                {needsBankCheck(order.status) ? (
                  <>
                    {order.paymentProof ? (
                      <p className="mt-3 font-sans text-sm">
                        <a
                          href={`/api/admin/orders/${encodeURIComponent(order.id)}/payment-proof`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-primary hover:underline"
                        >
                          View payment screenshot →
                        </a>
                        <span className="text-ink-muted">
                          {" "}
                          · uploaded {formatOrderDate(order.paymentProof.uploadedAt)}
                        </span>
                      </p>
                    ) : (
                      <p className="mt-3 font-sans text-sm text-ink-muted">No proof uploaded yet</p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        disabled={busyId === order.id}
                        onClick={() => updateStatus(order.id, "paid")}
                      >
                        {busyId === order.id ? "Saving…" : "Confirm payment"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={busyId === order.id}
                        onClick={() => updateStatus(order.id, "cancelled")}
                      >
                        Cancel order
                      </Button>
                    </div>
                  </>
                ) : null}

                {fulfillmentAction ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      disabled={busyId === order.id}
                      onClick={() => updateStatus(order.id, fulfillmentAction.next)}
                    >
                      {busyId === order.id ? "Saving…" : fulfillmentAction.label}
                    </Button>
                  </div>
                ) : null}

                {order.status === "delivered" ? (
                  <p className="mt-4 font-sans text-sm text-ink-muted">Fulfillment complete.</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
