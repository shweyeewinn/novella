"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/auth";
import { isShippingComplete, normalizeShippingAddress } from "@/lib/auth/shipping";
import OrderCard from "@/features/account/OrderCard";
import { Button, ButtonLink } from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/ui/EmptyState";
import ShippingAddressForm from "@/shared/components/forms/ShippingAddressForm";
import { site } from "@/config/site";
import type { Order } from "@/types/order";

export default function AccountView({
  user: initialUser,
  orders = [],
}: {
  user: User;
  orders?: Order[];
}) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [name, setName] = useState(user.name);
  const [shipping, setShipping] = useState(() => normalizeShippingAddress(user.shipping));
  const [profileSaved, setProfileSaved] = useState(false);
  const [shippingSaved, setShippingSaved] = useState(false);

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = (await res.json()) as { user?: User; error?: string };
    if (res.ok && data.user) {
      setUser(data.user);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    }
  }

  async function handleShippingSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isShippingComplete(shipping)) return;
    const res = await fetch("/api/account/shipping", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shipping),
    });
    const data = (await res.json()) as { user?: User; error?: string };
    if (res.ok && data.user) {
      setUser(data.user);
      setShipping(data.user.shipping);
      setShippingSaved(true);
      setTimeout(() => setShippingSaved(false), 2500);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">My account</h1>
          <p className="font-sans text-ink-muted">{user.email}</p>
        </div>
        <Button type="button" onClick={handleLogout}>
          Log out
        </Button>
      </header>

      <section className="space-y-4" aria-labelledby="account-orders">
        <h2 id="account-orders" className="font-serif text-2xl font-bold text-ink">
          Orders
        </h2>
        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="When you confirm checkout, your orders and status will appear here."
            action={{ href: "/shop", label: "Browse the shop" }}
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      <section
        className="space-y-4 rounded-xl border border-border bg-paper-muted/40 p-5 sm:p-6"
        aria-labelledby="account-shipping"
      >
        <div className="space-y-1">
          <h2 id="account-shipping" className="font-serif text-2xl font-bold text-ink">
            Delivery address
          </h2>
          <p className="font-sans text-sm text-ink-muted">
            Saved for checkout. Update anytime before your next order ships.
          </p>
        </div>
        <form onSubmit={handleShippingSave} className="space-y-4">
          <ShippingAddressForm
            value={shipping}
            onChange={setShipping}
            idPrefix="account-ship"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={!isShippingComplete(shipping)}>
              Save address
            </Button>
            {shippingSaved ? (
              <span className="font-sans text-sm text-primary">Address saved.</span>
            ) : null}
          </div>
        </form>
      </section>

      <section
        className="space-y-4 rounded-xl border border-border p-5 sm:p-6"
        aria-labelledby="account-profile"
      >
        <h2 id="account-profile" className="font-serif text-2xl font-bold text-ink">
          Profile
        </h2>
        <form onSubmit={handleProfileSave} className="max-w-md space-y-4">
          <div className="space-y-2">
            <label htmlFor="profile-name" className="font-sans text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="profile-email" className="font-sans text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={user.email}
              disabled
              className="w-full cursor-not-allowed rounded-md border border-border bg-paper-muted px-4 py-2.5 font-sans text-sm text-ink-muted"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">Save profile</Button>
            {profileSaved ? (
              <span className="font-sans text-sm text-primary">Profile saved.</span>
            ) : null}
          </div>
        </form>
      </section>

      <p className="font-sans text-sm text-ink-muted">
        Need help with an order?{" "}
        <a href={`mailto:${site.owner.email}`} className="text-primary hover:underline">
          {site.owner.email}
        </a>
        .
      </p>

      <ButtonLink variant="ghost" href="/shop">
        Continue shopping
      </ButtonLink>
    </div>
  );
}
