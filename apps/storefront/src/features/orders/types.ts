import type { ShippingAddress } from "@/features/auth/types";

export type OrderStatus =
  | "pending_payment"
  | "payment_review"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderLineItem = {
  bookId: string;
  title: string;
  quantity: number;
  unitCents: number;
};

export type Order = {
  id: string;
  userId: string | null;
  email: string;
  lineItems: OrderLineItem[];
  totalCents: number;
  status: OrderStatus;
  shipping: ShippingAddress | null;
  createdAt: string;
  /** Set when shop marks shipped */
  trackingNote?: string;
};
