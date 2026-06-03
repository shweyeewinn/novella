import { readFile } from "fs/promises";
import { requireAdminApi } from "@/lib/admin/requireAdminApi";
import { findOrderById } from "@/lib/orders/repository";
import { paymentProofAbsolutePath } from "@/lib/orders/paymentProofPath";
import { jsonError } from "@/lib/api/response";

type RouteContext = { params: Promise<{ orderId: string }> };

export async function GET(request: Request, context: RouteContext) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  const { orderId } = await context.params;
  const order = await findOrderById(orderId);
  if (!order?.paymentProof) {
    return jsonError("No payment proof for this order", 404);
  }

  try {
    const bytes = await readFile(paymentProofAbsolutePath(order.paymentProof.filename));
    return new Response(bytes, {
      headers: {
        "Content-Type": order.paymentProof.mimeType,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return jsonError("Payment proof file not found", 404);
  }
}
