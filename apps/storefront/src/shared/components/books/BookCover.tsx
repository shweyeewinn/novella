import Image from "next/image";
import type { Book } from "@/features/books/types";

type BookCoverProps = {
  book: Pick<Book, "title" | "author" | "coverHue" | "coverImageSrc">;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** When false, cover is blank for future jacket artwork (title/author live below the card). */
  showLabel?: boolean;
};

const sizeClasses = {
  sm: "aspect-[2/3] w-24",
  md: "aspect-[2/3] w-full",
  lg: "aspect-[2/3] w-full max-w-md",
};

export default function BookCover({
  book,
  size = "md",
  className = "",
  showLabel = true,
}: BookCoverProps) {
  const hasImage = Boolean(book.coverImageSrc);

  return (
    <div
      className={`relative overflow-hidden bg-transparent ${sizeClasses[size]} ${className}`}
      aria-hidden={hasImage}
    >
      {hasImage ? (
        <Image
          src={book.coverImageSrc!}
          alt=""
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 280px"
          className="object-contain object-center"
        />
      ) : showLabel ? (
        <div className="absolute inset-0 flex flex-col justify-end rounded-sm bg-paper-muted/40 p-3 sm:p-4">
          <p className="line-clamp-3 font-serif text-xs leading-snug text-ink sm:text-sm">
            {book.title}
          </p>
          <p className="mt-1 font-sans text-[10px] text-ink-muted sm:text-xs">{book.author}</p>
        </div>
      ) : null}
    </div>
  );
}
