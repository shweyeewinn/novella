import { Suspense } from "react";
import BookCard from "@/shared/components/books/BookCard";
import EmptyState from "@/shared/components/ui/EmptyState";
import ShopFilters from "./ShopFilters";
import ShopPagination from "./ShopPagination";
import type { ShopPageData } from "./getShopPageData";

const shopGridClass =
  "grid w-full grid-cols-1 items-stretch gap-4 min-[420px]:grid-cols-2 md:gap-6 lg:grid-cols-4";

type ShopPageContentProps = {
  data: ShopPageData;
};

export default function ShopPageContent({ data }: ShopPageContentProps) {
  const {
    books,
    page,
    totalPages,
    totalResults,
    inventoryCount,
    filters,
    pageTitle,
    author,
    showPagination,
  } = data;

  return (
    <div className="w-full space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">{pageTitle}</h1>
        <p className="font-sans text-ink-muted">
          {author ? (
            <>
              <span className="font-medium text-ink">{totalResults}</span>{" "}
              {totalResults === 1 ? "book" : "books"} by this author
            </>
          ) : (
            <>
              <span className="font-medium text-ink">{inventoryCount}</span>{" "}
              {inventoryCount === 1 ? "book" : "books"} in inventory
              {totalResults !== inventoryCount ? (
                <>
                  {" "}
                  · <span className="font-medium text-ink">{totalResults}</span> matching
                  your filters
                </>
              ) : null}
            </>
          )}
        </p>
      </header>

      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-lg border border-border bg-paper-muted/40" />
        }
      >
        <ShopFilters filters={filters} />
      </Suspense>

      {totalResults === 0 ? (
        <EmptyState
          title="No books match these filters"
          description="Adjust your filters or browse the full catalog."
          action={{ href: "/shop", label: "View all books" }}
        />
      ) : (
        <>
          <div className={shopGridClass}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} className="h-full" />
            ))}
          </div>
          {showPagination ? (
            <Suspense fallback={null}>
              <ShopPagination page={page} totalPages={totalPages} />
            </Suspense>
          ) : null}
        </>
      )}
    </div>
  );
}
