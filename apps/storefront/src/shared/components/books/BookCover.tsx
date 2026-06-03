import type { Book } from "@/features/books/types";

type BookCoverProps = {
  book: Pick<Book, "title" | "author" | "coverHue">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "aspect-[2/3] w-20",
  md: "aspect-[2/3] w-full",
  lg: "aspect-[2/3] w-full max-w-sm",
};

export default function BookCover({ book, size = "md", className = "" }: BookCoverProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.08)] dark:shadow-[5px_5px_20px_rgba(0,0,0,0.35)] ${sizeClasses[size]} ${className}`}
      style={{
        background: `linear-gradient(145deg, hsl(${book.coverHue} 35% 28%), hsl(${book.coverHue} 25% 18%))`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
        <p className="font-serif text-xs leading-snug text-paper/95 sm:text-sm">
          {book.title}
        </p>
        <p className="mt-1 font-sans text-[10px] text-paper/70 sm:text-xs">{book.author}</p>
      </div>
    </div>
  );
}
