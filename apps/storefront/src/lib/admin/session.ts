import { cookies } from "next/headers";

const COOKIE_NAME = "novella_admin";

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET?.trim());
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return false;
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === secret;
}

export async function setAdminCookie() {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return;
  const jar = await cookies();
  jar.set(COOKIE_NAME, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}
