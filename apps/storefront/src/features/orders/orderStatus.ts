import type { OrderStatus } from "./types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending_payment: "Awaiting payment",
  payment_review: "Payment under review",
  paid: "Payment confirmed",
  processing: "Preparing your order",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const orderStatusHints: Record<OrderStatus, string> = {
  pending_payment:
    "Transfer the total and upload your proof. Payment is confirmed only after we verify the transfer in our bank account.",
  payment_review:
    "We received your proof. Our team will confirm payment after checking the transfer in our bank account.",
  paid: "Payment confirmed — we are getting your books ready.",
  processing: "Your order is being packed.",
  shipped: "Your parcel is on the way.",
  delivered: "Your order has been delivered.",
  cancelled: "This order was cancelled.",
};

const badgeClass: Record<OrderStatus, string> = {
  pending_payment: "bg-amber-100 text-amber-900 border-amber-200",
  payment_review: "bg-sky-100 text-sky-900 border-sky-200",
  paid: "bg-emerald-100 text-emerald-900 border-emerald-200",
  processing: "bg-paper-muted text-ink border-border",
  shipped: "bg-primary/10 text-primary border-primary/25",
  delivered: "bg-emerald-100 text-emerald-900 border-emerald-200",
  cancelled: "bg-paper-muted text-ink-muted border-border",
};

export function getOrderStatusBadgeClass(status: OrderStatus): string {
  return badgeClass[status];
}
