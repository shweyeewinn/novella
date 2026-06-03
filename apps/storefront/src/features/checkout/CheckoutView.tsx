"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/features/books/catalog";
import { useCartLines } from "@/features/cart/useCartLines";
import { useCartStore } from "@/features/cart/store";
import BookCover from "@/shared/components/books/BookCover";
import FormatBadge from "@/shared/components/books/FormatBadge";
import { Button, ButtonLink } from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/ui/EmptyState";
import { site } from "@/config/site";

export default function CheckoutView() {
  const { lines, subtotalCents } = useCartLines();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [email, setEmail] = useState<string>(site.owner.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasPhysical = lines.some((l) => l.book.format === "physical");

  if (lines.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl text-ink">Checkout</h1>
        <EmptyState
          title="Nothing to checkout"
          description="Add books to your cart first."
          action={{ href: "/cart", label: "View cart" }}
        />
      </div>
    );
  }

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.bookId, quantity: i.quantity })),
          email,
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
      router.push(data.checkoutUrl ?? `/checkout/success?order=${data.orderId}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Checkout</h1>

      <ul className="divide-y divide-border rounded-lg border border-border">
        {lines.map(({ book, quantity, lineTotalCents }) => (
          <li key={book.id} className="flex gap-4 p-4">
            <BookCover book={book} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-ink">{book.title}</p>
              <p className="font-sans text-sm text-sage">{book.author}</p>
              <div className="mt-1 flex items-center gap-2">
                <FormatBadge format={book.format} />
                <span className="font-sans text-sm text-ink-muted">× {quantity}</span>
              </div>
            </div>
            <p className="font-sans text-sm font-semibold tabular-nums">
              {formatPrice(lineTotalCents)}
            </p>
          </li>
        ))}
      </ul>

      <p className="font-sans text-sm text-ink-muted">
        <Link href="/cart" className="text-accent hover:underline">
          Edit cart
        </Link>
      </p>

      <div className="space-y-2">
        <label htmlFor="email" className="font-sans text-sm font-medium text-ink">
          Email for order confirmation
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-accent focus:outline-none"
        />
      </div>

      {hasPhysical ? (
        <p className="font-sans text-sm text-ink-muted">
          Shipping address will be collected on the secure payment page (Stripe).
        </p>
      ) : null}

      <div className="rounded-lg border border-border bg-paper-muted/60 p-6">
        <div className="flex justify-between font-sans text-sm">
          <span className="text-ink-muted">Estimated total</span>
          <span className="font-semibold tabular-nums text-ink">
            {formatPrice(subtotalCents)}
          </span>
        </div>
        <p className="mt-2 font-sans text-xs text-ink-muted">
          Prices validated on the server before payment. Stripe integration will replace
          the demo redirect.
        </p>
        {error ? (
          <p className="mt-3 font-sans text-sm text-[#63202e]" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          className="mt-6 w-full"
          disabled={loading || !email}
          onClick={handlePay}
        >
          {loading ? "Redirecting to secure payment…" : "Pay securely (demo)"}
        </Button>
        <p className="mt-3 text-center font-sans text-xs text-ink-muted">
          🔒 Powered by Stripe (coming soon)
        </p>
      </div>

      <ButtonLink variant="ghost" href="/shop">
        Continue shopping
      </ButtonLink>
    </div>
  );
}
