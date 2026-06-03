import { findUserById } from "@/lib/auth/repository";
import { getSessionUserId } from "@/lib/auth/session";
import { jsonOk } from "@/lib/api/response";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return jsonOk({ user: null });

  const user = await findUserById(userId);
  return jsonOk({ user });
}
