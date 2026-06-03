import { requireAdminApi } from "@/lib/admin/requireAdminApi";
import { updateOrderStatus } from "@/lib/orders/repository";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";
import type { OrderStatus } from "@/types/order";

const VALID_STATUSES: OrderStatus[] = [
  "pending_payment",
  "payment_review",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

type Body = { status?: OrderStatus; trackingNote?: string };

type RouteContext = { params: Promise<{ orderId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  const { orderId } = await context.params;
  const body = await parseJsonBody<Body>(request);
  if (!body?.status || !VALID_STATUSES.includes(body.status)) {
    return jsonError("Valid status is required", 400);
  }

  const order = await updateOrderStatus(
    orderId,
    body.status,
    body.trackingNote?.trim() || undefined
  );
  if (!order) {
    return jsonError("Order not found", 404);
  }

  return jsonOk({ order });
}
