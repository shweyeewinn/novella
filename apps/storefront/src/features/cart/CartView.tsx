"use client";

import Link from "next/link";
import { formatPrice } from "@/features/books/catalog";
import { useCartLines } from "@/features/cart/useCartLines";
import { useCartStore } from "@/features/cart/store";
import BookCover from "@/shared/components/books/BookCover";
import FormatBadge from "@/shared/components/books/FormatBadge";
import { ButtonLink } from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/ui/EmptyState";

export default function CartView() {
  const { lines, subtotalCents, hasUnknownItems } = useCartLines();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const hasPhysical = lines.some((l) => l.book.format === "physical");
  const hasDigital = lines.some((l) => l.book.format === "digital");

  if (lines.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Your cart</h1>
        <EmptyState
          title="Your cart is empty"
          description="Browse the shop and add a book you love."
          action={{ href: "/shop", label: "Browse the shop" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Your cart</h1>
      {hasUnknownItems ? (
        <p className="rounded-md border border-border bg-paper-muted px-4 py-2 font-sans text-sm text-ink-muted">
          Some items were removed because they are no longer available.
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(320px,100%)] lg:gap-10">
        <ul className="min-w-0 divide-y divide-border">
          {lines.map(({ book, quantity, lineTotalCents }) => (
            <li
              key={book.id}
              className="flex flex-col gap-4 py-6 first:pt-0 min-[400px]:flex-row"
            >
              <Link href={`/books/${book.slug}`} className="shrink-0 self-start">
                <BookCover book={book} size="sm" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <Link
                      href={`/books/${book.slug}`}
                      className="cursor-pointer font-serif text-lg text-ink hover:text-primary"
                    >
                      {book.title}
                    </Link>
                    <p className="font-sans text-sm text-ink-muted">{book.author}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <FormatBadge format={book.format} />
                      <span className="font-sans text-sm text-ink-muted">
                        {formatPrice(book.priceCents)} each
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-sm font-semibold tabular-nums text-ink">
                    {formatPrice(lineTotalCents)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="cursor-pointer px-3 py-1.5 text-ink-muted hover:text-ink"
                      onClick={() => setQuantity(book.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center font-sans text-sm tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="cursor-pointer px-3 py-1.5 text-ink-muted hover:text-ink"
                      onClick={() => setQuantity(book.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer font-sans text-sm text-ink-muted hover:text-ink"
                    onClick={() => removeItem(book.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-paper-muted/60 p-6">
          <h2 className="font-serif text-lg text-ink">Summary</h2>
          <dl className="mt-4 space-y-2 font-sans text-sm">
            <div className="flex justify-between text-ink-muted">
              <dt>Subtotal</dt>
              <dd className="tabular-nums text-ink">{formatPrice(subtotalCents)}</dd>
            </div>
            {hasPhysical ? (
              <div className="flex justify-between text-ink-muted">
                <dt>Shipping</dt>
                <dd>Calculated at checkout</dd>
              </div>
            ) : null}
            {hasDigital && hasPhysical ? (
              <p className="text-xs text-ink-muted">
                Digital downloads are emailed after payment.
              </p>
            ) : null}
            <div className="flex justify-between border-t border-border pt-3 font-medium text-ink">
              <dt>Estimated total</dt>
              <dd className="tabular-nums">{formatPrice(subtotalCents)}</dd>
            </div>
          </dl>
          <p className="mt-4 font-sans text-xs text-ink-muted">
            Final price is confirmed securely at checkout.
          </p>
          <ButtonLink href="/checkout" className="mt-6 w-full">
            Proceed to checkout
          </ButtonLink>
          <Link
            href="/shop"
            className="mt-4 block cursor-pointer text-center font-sans text-sm text-ink hover:underline"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
