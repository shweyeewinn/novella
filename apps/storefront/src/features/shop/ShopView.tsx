"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  categoryLabels,
  defaultShopFilters,
  filterBooks,
  getAllBooks,
  type ShopFilters,
} from "@/features/books/catalog";
import type { BookCategory, BookFormat } from "@/features/books/types";
import BookCard from "@/shared/components/books/BookCard";
import EmptyState from "@/shared/components/ui/EmptyState";

const allBooks = getAllBooks();

function parseCategory(param: string | null): BookCategory | undefined {
  if (!param) return undefined;
  const cats = Object.keys(categoryLabels) as BookCategory[];
  return cats.includes(param as BookCategory) ? (param as BookCategory) : undefined;
}

export default function ShopView() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>(defaultShopFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const category = parseCategory(searchParams.get("category"));
    if (category) {
      setFilters((f) => ({
        ...f,
        categories: [category],
      }));
    }
  }, [searchParams]);

  const results = useMemo(() => filterBooks(allBooks, filters), [filters]);

  const toggleFormat = (format: BookFormat) => {
    setFilters((f) => ({
      ...f,
      formats: f.formats.includes(format)
        ? f.formats.filter((x) => x !== format)
        : [...f.formats, format],
    }));
  };

  const toggleCategory = (category: BookCategory) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(category)
        ? f.categories.filter((x) => x !== category)
        : [...f.categories, category],
    }));
  };

  const filterPanel = (
    <div className="space-y-8 font-sans text-sm">
      <div>
        <h2 className="mb-3 font-medium text-ink">Format</h2>
        <div className="space-y-2 text-ink-muted">
          {(["physical", "digital"] as const).map((format) => (
            <label key={format} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={filters.formats.includes(format)}
                onChange={() => toggleFormat(format)}
                className="accent-accent"
              />
              {format === "physical" ? "Physical" : "Digital"}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-3 font-medium text-ink">Category</h2>
        <div className="space-y-2 text-ink-muted">
          {(Object.keys(categoryLabels) as BookCategory[]).map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-accent"
              />
              {categoryLabels[cat]}
            </label>
          ))}
        </div>
      </div>
      {(filters.formats.length > 0 ||
        filters.categories.length > 0 ||
        filters.query) && (
        <button
          type="button"
          onClick={() => setFilters(defaultShopFilters)}
          className="text-accent hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Shop</h1>
        <p className="font-sans text-ink-muted">
          {results.length} {results.length === 1 ? "title" : "titles"}
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-52 shrink-0 lg:block">{filterPanel}</aside>

        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              placeholder="Search title or author…"
              value={filters.query}
              onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
              className="w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none sm:max-w-xs"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 font-sans text-sm text-ink-muted lg:hidden"
                onClick={() => setMobileFiltersOpen((o) => !o)}
              >
                Filters
              </button>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    sort: e.target.value as ShopFilters["sort"],
                  }))
                }
                className="rounded-md border border-border bg-paper px-3 py-2 font-sans text-sm text-ink"
                aria-label="Sort books"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          {mobileFiltersOpen ? (
            <div className="rounded-lg border border-border bg-paper-muted/50 p-4 lg:hidden">
              {filterPanel}
            </div>
          ) : null}

          {results.length === 0 ? (
            <EmptyState
              title="No books match your filters"
              description="Try clearing filters or searching for another author or title."
              action={{ href: "/shop", label: "View all books" }}
            />
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
