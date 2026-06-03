import { requireAdminApi } from "@/lib/admin/requireAdminApi";
import { listAllOrders } from "@/lib/orders/repository";
import { jsonOk } from "@/lib/api/response";

export async function GET(request: Request) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  const orders = await listAllOrders();
  return jsonOk({ orders });
}
