"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { shopQueryString } from "./getShopPageData";

type ShopPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ShopPagination({ page, totalPages }: ShopPaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const hrefForPage = (p: number) =>
    `/shop${shopQueryString(searchParams, {
      page: p <= 1 ? null : String(p),
    })}`;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true;
    if (p === 1 || p === totalPages) return true;
    return Math.abs(p - page) <= 1;
  });

  const btnClass =
    "inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border border-border bg-paper px-3 font-sans text-sm text-ink transition-colors hover:border-primary/40 hover:bg-paper-muted disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefForPage(page - 1)} className={btnClass} aria-label="Previous page">
          Previous
        </Link>
      ) : (
        <span className={`${btnClass} opacity-40`} aria-disabled>
          Previous
        </span>
      )}
      {pages.map((p, index) => {
        const prev = pages[index - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis ? (
              <span className="px-1 text-ink-muted" aria-hidden>
                …
              </span>
            ) : null}
            <Link
              href={hrefForPage(p)}
              className={`${btnClass} ${p === page ? "border-primary bg-primary/10 font-medium text-primary" : ""}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Link>
          </span>
        );
      })}
      {page < totalPages ? (
        <Link href={hrefForPage(page + 1)} className={btnClass} aria-label="Next page">
          Next
        </Link>
      ) : (
        <span className={`${btnClass} opacity-40`} aria-disabled>
          Next
        </span>
      )}
    </nav>
  );
}
