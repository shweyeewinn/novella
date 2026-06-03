import { isShippingComplete } from "@/lib/auth/shipping";
import { updateUserShipping } from "@/lib/auth/repository";
import { getSessionUserId } from "@/lib/auth/session";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";
import type { ShippingAddress } from "@/types/auth";

export async function PATCH(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) return jsonError("Not signed in", 401);

  const shipping = await parseJsonBody<ShippingAddress>(request);
  if (!shipping || !isShippingComplete(shipping)) {
    return jsonError("Complete delivery address is required", 400);
  }

  const user = await updateUserShipping(userId, shipping);
  if (!user) return jsonError("Account not found", 404);

  return jsonOk({ user });
}
