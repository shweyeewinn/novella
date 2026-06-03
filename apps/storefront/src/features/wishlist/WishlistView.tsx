"use client";

import { getBookById } from "@/features/books/catalog";
import { useWishlistStore } from "@/features/wishlist/store";
import BookCard from "@/shared/components/books/BookCard";
import EmptyState from "@/shared/components/ui/EmptyState";
import { bookGridClass } from "@/shared/constants/layout";

export default function WishlistView() {
  const bookIds = useWishlistStore((s) => s.bookIds);
  const books = bookIds.map((id) => getBookById(id)).filter((b) => b !== undefined);

  if (books.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Wishlist</h1>
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart on any book in the shop to save it here."
          action={{ href: "/shop", label: "Browse the shop" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Wishlist</h1>
        <p className="font-sans text-ink-muted">
          {books.length} saved {books.length === 1 ? "title" : "titles"}
        </p>
      </header>
      <div className={bookGridClass}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} className="h-full" actionsVariant="wishlist" />
        ))}
      </div>
    </div>
  );
}
