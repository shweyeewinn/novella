import { updateUserName } from "@/lib/auth/repository";
import { getSessionUserId } from "@/lib/auth/session";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";

type ProfileBody = { name?: string };

export async function PATCH(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) return jsonError("Not signed in", 401);

  const body = await parseJsonBody<ProfileBody>(request);
  if (!body?.name?.trim()) return jsonError("Name is required", 400);

  const user = await updateUserName(userId, body.name);
  if (!user) return jsonError("Account not found", 404);

  return jsonOk({ user });
}
