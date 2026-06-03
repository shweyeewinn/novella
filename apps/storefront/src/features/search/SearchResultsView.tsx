"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { defaultShopFilters, filterBooks, getAllBooks } from "@/features/books/catalog";
import { useSearchState } from "@/shared/providers/SearchProvider";
import BookCard from "@/shared/components/books/BookCard";
import EmptyState from "@/shared/components/ui/EmptyState";
import { bookGridClass } from "@/shared/constants/layout";
import { ButtonLink } from "@/shared/components/ui/Button";

const allBooks = getAllBooks();

export default function SearchResultsView() {
  const searchParams = useSearchParams();
  const search = useSearchState();
  const urlQuery = searchParams.get("q") ?? "";
  const debouncedQuery = search?.debouncedQuery ?? urlQuery;
  const isSearching = search?.isSearching ?? false;

  const results = useMemo(
    () =>
      filterBooks(allBooks, {
        ...defaultShopFilters,
        query: debouncedQuery,
      }),
    [debouncedQuery]
  );

  const hasQuery = debouncedQuery.length > 0;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Search results</h1>
        {hasQuery ? (
          <p className="break-words font-sans text-ink-muted">
            {isSearching ? (
              <>Searching…</>
            ) : (
              <>
                {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;
                {debouncedQuery}&rdquo;
              </>
            )}
          </p>
        ) : (
          <p className="font-sans text-ink-muted">
            Use the search box in the header to find books by title or author.
          </p>
        )}
      </header>

      {!hasQuery ? (
        <EmptyState
          title="Search our catalog"
          description="Use the search box in the header to look up physical books by title or author."
          action={{ href: "/shop", label: "Browse all books" }}
        />
      ) : results.length === 0 ? (
        <EmptyState
          title="No books found"
          description="Try another spelling or a shorter phrase, or browse the full catalog."
          action={{ href: "/shop", label: "Browse all books" }}
        />
      ) : (
        <div className={bookGridClass}>
          {results.map((book) => (
            <BookCard key={book.id} book={book} hideCoverText className="h-full" />
          ))}
        </div>
      )}

      {hasQuery && results.length > 0 ? (
        <div className="flex justify-center pt-4">
          <ButtonLink href="/shop">Browse all books</ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
