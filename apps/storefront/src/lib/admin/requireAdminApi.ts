import { jsonError } from "@/lib/api/response";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/session";

export async function requireAdminApi(request: Request) {
  if (!isAdminConfigured()) {
    return jsonError("ADMIN_SECRET is not configured", 503);
  }
  if (await isAdminAuthenticated()) {
    return null;
  }

  const secret = process.env.ADMIN_SECRET?.trim();
  const headerSecret = request.headers.get("x-admin-secret")?.trim();
  if (secret && headerSecret === secret) {
    return null;
  }

  return jsonError("Unauthorized", 401);
}
