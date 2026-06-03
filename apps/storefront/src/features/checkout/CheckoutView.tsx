"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emptyShippingAddress, type ShippingAddress, type User } from "@/types/auth";
import { isShippingComplete, normalizeShippingAddress } from "@/lib/auth/shipping";
import { formatPrice } from "@/features/books/catalog";
import { useCartLines } from "@/features/cart/useCartLines";
import { useCartStore } from "@/features/cart/store";
import BookCover from "@/shared/components/books/BookCover";
import FormatBadge from "@/shared/components/books/FormatBadge";
import ShippingAddressForm from "@/shared/components/forms/ShippingAddressForm";
import { Button, ButtonLink } from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/ui/EmptyState";

export default function CheckoutView() {
  const { lines, subtotalCents } = useCartLines();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [user, setUser] = useState<Pick<User, "id" | "email" | "name" | "shipping"> | null>(null);
  const [email, setEmail] = useState("");
  const [shipping, setShipping] = useState<ShippingAddress>(emptyShippingAddress());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasPhysical = lines.some((l) => l.book.format === "physical");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { user: User | null }) => {
        if (data.user) {
          setUser(data.user);
          setEmail(data.user.email);
          setShipping(normalizeShippingAddress(data.user.shipping));
        }
      })
      .catch(() => {});
  }, []);

  if (lines.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Checkout</h1>
        <EmptyState
          title="Nothing to checkout"
          description="Add books to your cart first."
          action={{ href: "/cart", label: "View cart" }}
        />
      </div>
    );
  }

  async function handleConfirm() {
    const orderEmail = (user?.email ?? email).trim();
    if (!orderEmail) {
      setError("Please enter an email for order updates.");
      return;
    }
    if (hasPhysical && !isShippingComplete(shipping)) {
      setError("Please complete the delivery address for physical books.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (user && hasPhysical && isShippingComplete(shipping)) {
        await fetch("/api/account/shipping", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shipping),
        });
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.bookId, quantity: i.quantity })),
          email: orderEmail,
          shipping: hasPhysical ? shipping : null,
        }),
      });
      const data = (await res.json()) as {
        checkoutUrl?: string;
        orderId?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Checkout failed");
        return;
      }

      clearCart();
      router.push(
        data.checkoutUrl ??
          `/checkout/success?order=${encodeURIComponent(data.orderId ?? "")}`
      );
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    (user?.email ?? email.trim()) &&
    (!hasPhysical || isShippingComplete(shipping));

  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Checkout</h1>
        <p className="font-sans text-sm text-ink-muted">
          Pay by bank transfer after you confirm.
          {user ? (
            <>
              {" "}
              Signed in as{" "}
              <Link href="/account" className="font-medium text-primary hover:underline">
                {user.name}
              </Link>
              .
            </>
          ) : (
            <>
              {" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>{" "}
              to save this order to your account.
            </>
          )}
        </p>
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {lines.map(({ book, quantity, lineTotalCents }) => (
          <li
            key={book.id}
            className="flex flex-col gap-3 p-4 min-[400px]:flex-row min-[400px]:items-start"
          >
            <BookCover book={book} size="sm" className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-ink">{book.title}</p>
              <p className="font-sans text-sm text-ink-muted">{book.author}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <FormatBadge format={book.format} />
                <span className="font-sans text-sm text-ink-muted">× {quantity}</span>
              </div>
            </div>
            <p className="shrink-0 font-sans text-sm font-semibold tabular-nums min-[400px]:text-end">
              {formatPrice(lineTotalCents)}
            </p>
          </li>
        ))}
      </ul>

      <p className="font-sans text-sm text-ink-muted">
        <Link href="/cart" className="text-ink hover:underline">
          Edit cart
        </Link>
      </p>

      {hasPhysical ? (
        <section className="space-y-4 rounded-lg border border-border bg-paper-muted/40 p-5 sm:p-6">
          <h2 className="font-serif text-xl font-bold text-ink">Delivery address</h2>
          <ShippingAddressForm
            value={shipping}
            onChange={setShipping}
            idPrefix="checkout-ship"
          />
        </section>
      ) : null}

      {!user ? (
        <div className="space-y-2">
          <label htmlFor="email" className="font-sans text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      ) : null}

      <div className="rounded-lg border border-border bg-paper-muted/60 p-6">
        <div className="flex justify-between font-sans text-sm">
          <span className="text-ink-muted">Total to transfer</span>
          <span className="font-semibold tabular-nums text-ink">
            {formatPrice(subtotalCents)}
          </span>
        </div>
        {error ? (
          <p className="mt-3 font-sans text-sm text-ink" role="alert">
            {error}
          </p>
        ) : null}
        <Button className="mt-6 w-full" disabled={loading || !canSubmit} onClick={handleConfirm}>
          {loading ? "Confirming order…" : "Confirm order"}
        </Button>
      </div>

      <ButtonLink variant="ghost" href="/shop">
        Continue shopping
      </ButtonLink>
    </div>
  );
}
