import { authenticateUser } from "@/lib/auth/repository";
import { setSessionCookie } from "@/lib/auth/session";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";

type LoginBody = { email?: string; password?: string };

export async function POST(request: Request) {
  const body = await parseJsonBody<LoginBody>(request);
  if (!body) return jsonError("Invalid request", 400);

  const result = await authenticateUser(body.email ?? "", body.password ?? "");
  if (!result.ok) return jsonError(result.error, 401);

  await setSessionCookie(result.user.id);
  return jsonOk({ user: result.user });
}
