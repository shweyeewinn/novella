"use client";

import { useRef, useState } from "react";
import type { Book } from "@/features/books/types";
import { isInStock } from "@/features/books/catalog";
import { useCartStore } from "@/features/cart/store";
import { useWishlistStore } from "@/features/wishlist/store";
import { Button } from "@/shared/components/ui/Button";
import CartIcon from "@/shared/components/icons/CartIcon";
import RemoveIcon from "@/shared/components/icons/RemoveIcon";
import WishlistIcon from "@/shared/components/icons/WishlistIcon";

const CART_MESSAGE_MS = 3000;

const wishlistButtonBase =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border p-2.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed";

type BookCardActionsProps = {
  book: Book;
  /** On wishlist page: show remove control instead of heart toggle */
  variant?: "default" | "wishlist";
};

export default function BookCardActions({ book, variant = "default" }: BookCardActionsProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const removeFromWishlist = useWishlistStore((s) => s.remove);
  const inWishlist = useWishlistStore((s) => s.has(book.id));
  const isWishlistPage = variant === "wishlist";
  const [cartMessage, setCartMessage] = useState(false);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inStock = isInStock(book);

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem(book.id, 1);
    setCartMessage(true);
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = setTimeout(() => {
      setCartMessage(false);
      messageTimeoutRef.current = null;
    }, CART_MESSAGE_MS);
  };

  return (
    <div className="mt-3 space-y-2 border-t border-border/70 pt-3">
      <div className="flex items-stretch gap-2">
        <Button
          variant="primary"
          disabled={!inStock}
          onClick={handleAddToCart}
          className="min-h-0 flex-1 gap-2 px-4 py-2.5 text-xs sm:text-sm"
          aria-label={inStock ? `Add ${book.title} to cart` : `${book.title} is out of stock`}
        >
          <CartIcon className="h-4 w-4 shrink-0" />
          <span className="sm:hidden">{inStock ? "Add" : "N/A"}</span>
          <span className="hidden sm:inline">{inStock ? "Add to cart" : "Out of stock"}</span>
        </Button>
        {isWishlistPage ? (
          <button
            type="button"
            className={`${wishlistButtonBase} border-border bg-paper text-ink-muted hover:border-ink/25 hover:bg-paper-muted hover:text-ink`}
            onClick={() => removeFromWishlist(book.id)}
            aria-label={`Remove ${book.title} from wishlist`}
          >
            <RemoveIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            className={`${wishlistButtonBase} ${
              inWishlist
                ? "border-primary bg-primary/10 text-primary hover:border-primary-hover hover:bg-primary/15"
                : "border-border bg-paper text-ink hover:border-primary/40 hover:bg-paper-muted hover:text-primary"
            }`}
            onClick={() => toggleWishlist(book.id)}
            aria-label={
              inWishlist ? `Remove ${book.title} from wishlist` : `Save ${book.title} to wishlist`
            }
            aria-pressed={inWishlist}
          >
            <WishlistIcon className="h-5 w-5" filled={inWishlist} />
          </button>
        )}
      </div>
      {cartMessage ? (
        <p
          className="font-sans text-xs leading-snug text-primary"
          role="status"
          aria-live="polite"
        >
          The book is added to your cart.
        </p>
      ) : null}
    </div>
  );
}
