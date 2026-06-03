import { savePaymentProof } from "@/lib/orders/paymentProof";
import { jsonError, jsonOk } from "@/lib/api/response";

type RouteContext = { params: Promise<{ orderId: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { orderId } = await context.params;
  if (!orderId?.trim()) {
    return jsonError("Order id is required.", 400);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid upload.", 400);
  }

  const file = formData.get("proof");
  if (!file || !(file instanceof File) || file.size === 0) {
    return jsonError("Please choose an image to upload.", 400);
  }

  const result = await savePaymentProof(orderId, file);
  if (!result.ok) {
    return jsonError(result.error, 400);
  }

  return jsonOk({
    message:
      "Payment proof received. Your order is under review until we confirm the transfer in our bank account.",
  });
}
