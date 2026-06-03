import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AccountView from "@/features/account/AccountView";
import { findUserById } from "@/lib/auth/repository";
import { getSessionUserId } from "@/lib/auth/session";
import { listOrdersForUser } from "@/lib/orders/repository";

export const metadata: Metadata = {
  title: "My account",
};

export default async function AccountPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");

  const user = await findUserById(userId);
  if (!user) redirect("/login");

  const orders = await listOrdersForUser(user.id, user.email);

  return <AccountView user={user} orders={orders} />;
}
