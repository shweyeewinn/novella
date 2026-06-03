import { upsertUserByEmail } from "@/lib/auth/repository";
import { isAdminConfigured, setAdminCookie } from "@/lib/admin/session";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";

type CreateUserBody = {
  secret?: string;
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return jsonError("ADMIN_SECRET is not configured", 503);
  }

  const body = await parseJsonBody<CreateUserBody>(request);
  if (!body) return jsonError("Invalid request", 400);

  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!body.secret || body.secret !== adminSecret) {
    return jsonError("Unauthorized", 401);
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";
  if (!name || !email || password.length < 6) {
    return jsonError("name, email, and password (6+ chars) are required", 400);
  }

  const user = await upsertUserByEmail({ name, email, password });
  await setAdminCookie();

  return jsonOk({
    user: { id: user.id, email: user.email, name: user.name },
    message: "User saved. Password was set or updated.",
  });
}
