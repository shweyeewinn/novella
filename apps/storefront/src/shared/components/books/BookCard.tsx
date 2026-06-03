import Link from "next/link";
import type { Book } from "@/features/books/types";
import { formatPrice } from "@/features/books/catalog";
import BookCardActions from "./BookCardActions";
import BookCover from "./BookCover";
import StarRating from "./StarRating";

type BookCardProps = {
  book: Book;
  /** Hide title/author on the cover image (shown below the card instead). */
  hideCoverText?: boolean;
  className?: string;
  /** Wishlist page: remove icon instead of heart on card actions */
  actionsVariant?: "default" | "wishlist";
};

export default function BookCard({
  book,
  hideCoverText = false,
  className = "",
  actionsVariant = "default",
}: BookCardProps) {
  return (
    <article className={`group flex h-full flex-col gap-3 ${className}`}>
      <Link
        href={`/books/${book.slug}`}
        className="relative block cursor-pointer bg-transparent transition-opacity hover:opacity-90"
      >
        <BookCover
          book={book}
          className="mx-auto w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[280px]"
          showLabel={!hideCoverText}
        />
      </Link>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 px-0.5">
        <Link href={`/books/${book.slug}`} className="cursor-pointer">
          <h3 className="line-clamp-2 min-h-[2.75rem] font-serif text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:min-h-[3.25rem] sm:text-lg">
            {book.title}
          </h3>
        </Link>
        <p className="line-clamp-2 min-h-[2.5rem] font-sans text-sm leading-snug text-ink-muted">
          {book.author}
        </p>
        <StarRating rating={book.rating} reviewCount={book.reviewCount} />
        <p className="font-sans text-sm font-semibold tabular-nums text-ink">
          {formatPrice(book.priceCents)}
        </p>
        <div className="mt-auto pt-1">
          <BookCardActions book={book} variant={actionsVariant} />
        </div>
      </div>
    </article>
  );
}
