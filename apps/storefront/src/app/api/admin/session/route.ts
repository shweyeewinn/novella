import { isAdminConfigured, setAdminCookie } from "@/lib/admin/session";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";

type Body = { secret?: string };

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return jsonError("ADMIN_SECRET is not configured", 503);
  }

  const body = await parseJsonBody<Body>(request);
  const secret = body?.secret?.trim();
  const adminSecret = process.env.ADMIN_SECRET?.trim();

  if (!secret || secret !== adminSecret) {
    return jsonError("Invalid admin secret", 401);
  }

  await setAdminCookie();
  return jsonOk({ message: "Signed in" });
}
