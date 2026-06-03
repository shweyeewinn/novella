"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categoryLabels, type ShopFilters } from "@/features/books/catalog";
import type { BookCategory } from "@/features/books/types";
import { shopQueryString } from "./getShopPageData";

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md border bg-paper px-3 py-2 font-sans text-sm transition-colors ${
        checked
          ? "border-primary/40 bg-primary/5 text-ink"
          : "border-border text-ink-muted"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-primary"
      />
      {label}
    </label>
  );
}

type ShopFiltersProps = {
  filters: ShopFilters;
};

export default function ShopFilters({ filters }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushFilters = (next: ShopFilters) => {
    const categories =
      next.categories.length > 0 ? next.categories.join(",") : null;
    const href = `/shop${shopQueryString(searchParams, {
      formats: null,
      categories,
      category: null,
      sort: next.sort === "newest" ? null : next.sort,
      page: null,
    })}`;
    router.push(href);
  };

  const toggleCategory = (category: BookCategory) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((x) => x !== category)
      : [...filters.categories, category];
    pushFilters({ ...filters, categories });
  };

  const clearFilters = () => pushFilters({ ...filters, categories: [] });

  const hasActiveFilters = filters.categories.length > 0;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-paper-muted/40 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as BookCategory[]).map((cat) => (
                <FilterCheckbox
                  key={cat}
                  label={categoryLabels[cat]}
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="cursor-pointer rounded-md px-3 py-2 font-sans text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          ) : null}
          <select
            value={filters.sort}
            onChange={(e) =>
              pushFilters({
                ...filters,
                sort: e.target.value as ShopFilters["sort"],
              })
            }
            className="cursor-pointer rounded-md border border-border bg-paper px-3 py-2 font-sans text-sm text-ink"
            aria-label="Sort books"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
