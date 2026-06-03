import type { OrderStatus } from "@/types/order";

export function needsBankCheck(status: OrderStatus): boolean {
  return status === "pending_payment" || status === "payment_review";
}

export function isInFulfillmentPipeline(status: OrderStatus): boolean {
  return status === "paid" || status === "processing" || status === "shipped";
}

const FULFILLMENT_STEPS: OrderStatus[] = ["paid", "processing", "shipped", "delivered"];

export function fulfillmentStepIndex(status: OrderStatus): number {
  const idx = FULFILLMENT_STEPS.indexOf(status);
  return idx >= 0 ? idx : -1;
}

export function nextFulfillmentStatus(
  status: OrderStatus
): { next: OrderStatus; label: string } | null {
  if (status === "paid") {
    return { next: "processing", label: "Mark preparing" };
  }
  if (status === "processing") {
    return { next: "shipped", label: "Mark shipped" };
  }
  if (status === "shipped") {
    return { next: "delivered", label: "Mark delivered" };
  }
  return null;
}
