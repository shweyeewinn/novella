import Link from "next/link";
import type { Book } from "@/features/books/types";
import { formatPrice } from "@/features/books/catalog";
import BookCover from "./BookCover";
import FormatBadge from "./FormatBadge";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col gap-3">
      <Link href={`/books/${book.slug}`} className="relative block">
        <BookCover book={book} />
        <div className="absolute right-2 top-2">
          <FormatBadge format={book.format} />
        </div>
      </Link>
      <div className="space-y-1">
        <Link href={`/books/${book.slug}`}>
          <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-accent line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="font-sans text-sm text-sage">{book.author}</p>
        <p className="font-sans text-sm font-semibold tabular-nums text-ink">
          {formatPrice(book.priceCents)}
        </p>
      </div>
    </article>
  );
}
