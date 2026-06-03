type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  /** Hidden when a single page covers all results (e.g. ≤20 books at 20 per page). */
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true;
    if (p === 1 || p === totalPages) return true;
    return Math.abs(p - page) <= 1;
  });

  const withEllipsis: (number | "ellipsis")[] = [];
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const prev = pages[i - 1];
    if (prev !== undefined && p - prev > 1) withEllipsis.push("ellipsis");
    withEllipsis.push(p);
  }

  const btnClass =
    "inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border border-border bg-paper px-3 font-sans text-sm text-ink transition-colors hover:border-primary/40 hover:bg-paper-muted disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        className={btnClass}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        Previous
      </button>
      {withEllipsis.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-1 text-ink-muted" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`${btnClass} ${
              item === page ? "border-primary bg-primary/10 font-medium text-primary" : ""
            }`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}
      <button
        type="button"
        className={btnClass}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
