"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/features/books/types";
import { formatPrice, isInStock } from "@/features/books/catalog";
import { useCartStore } from "@/features/cart/store";
import { Button, ButtonLink } from "@/shared/components/ui/Button";

export default function AddToCartPanel({ book }: { book: Book }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const inStock = isInStock(book);
  const maxQty = book.preOrder
    ? 10
    : book.format === "digital"
      ? 10
      : Math.min(Math.max(book.inventoryCount ?? 0, 1), 10);

  const handleAdd = () => {
    addItem(book.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addItem(book.id, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      <p className="font-sans text-2xl font-semibold tabular-nums text-ink">
        {formatPrice(book.priceCents)}
      </p>
      {book.preOrder ? (
        <p className="font-sans text-sm text-ink-muted">
          <span className="font-medium text-primary">Pre-order</span> — ships when stock
          arrives. You will not be charged until fulfillment is confirmed at checkout.
        </p>
      ) : book.format === "physical" && book.inventoryCount !== undefined ? (
        <p className="font-sans text-sm text-ink-muted">
          {inStock ? (
            book.inventoryCount <= 3 ? (
              <span className="font-medium text-ink">Only {book.inventoryCount} left</span>
            ) : (
              <>In stock ({book.inventoryCount} available)</>
            )
          ) : (
            <span className="text-ink-muted">Out of stock</span>
          )}
        </p>
      ) : null}
      {book.format === "digital" ? (
        <p className="font-sans text-sm text-ink-muted">
          Instant download after purchase · PDF & EPUB · Links expire in 24 hours
        </p>
      ) : (
        <p className="font-sans text-sm text-ink-muted">
          Ships in 3–5 business days · Pay by bank transfer after checkout
        </p>
      )}

      <div className="flex items-center gap-3">
        <label className="font-sans text-sm text-ink-muted" htmlFor="qty">
          Qty
        </label>
        <select
          id="qty"
          value={quantity}
          disabled={!inStock}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="rounded-md border border-border bg-paper px-3 py-2 font-sans text-sm"
        >
          {Array.from({ length: maxQty }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {justAdded ? (
        <p
          className="font-sans text-sm text-primary"
          role="status"
          aria-live="polite"
        >
          Added to cart — see the count in the header.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button disabled={!inStock} onClick={handleAdd} className="flex-1">
          {book.preOrder ? "Pre-order" : "Add to cart"}
        </Button>
        <Button
          variant="secondary"
          disabled={!inStock}
          onClick={handleBuyNow}
          className="flex-1"
        >
          Buy now
        </Button>
      </div>
      {!inStock ? (
        <ButtonLink variant="secondary" href="/shop" className="w-full sm:w-auto">
          Browse other books
        </ButtonLink>
      ) : null}
    </div>
  );
}
