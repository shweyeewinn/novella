import {
  categoryLabels,
  countInStockBooks,
  defaultShopFilters,
  filterBooks,
  getAllBooks,
  getBooksByCollection,
  getInStockBooks,
  type ShopFilters,
} from "@/features/books/catalog";
import type { Book, BookCategory } from "@/features/books/types";

export const SHOP_PAGE_SIZE = 20;

export type ShopPageData = {
  books: Book[];
  page: number;
  totalPages: number;
  totalResults: number;
  inventoryCount: number;
  collection: string | null;
  author: string | null;
  filters: ShopFilters;
  pageTitle: string;
  showPagination: boolean;
};

function parseCategory(param: string | null): BookCategory | undefined {
  if (!param) return undefined;
  const cats = Object.keys(categoryLabels) as BookCategory[];
  return cats.includes(param as BookCategory) ? (param as BookCategory) : undefined;
}

function parseListParam(value: string | null): string[] {
  if (!value?.trim()) return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export function parseShopFilters(params: URLSearchParams): ShopFilters {
  const categoryFromUrl = parseCategory(params.get("category"));
  const categoriesFromList = parseListParam(params.get("categories")).filter((c) =>
    (Object.keys(categoryLabels) as BookCategory[]).includes(c as BookCategory)
  ) as BookCategory[];

  const sort = params.get("sort");
  const validSorts = ["newest", "price-asc", "price-desc", "title"] as const;
  const sortValue = validSorts.includes(sort as (typeof validSorts)[number])
    ? (sort as ShopFilters["sort"])
    : "newest";

  const authorParam = params.get("author")?.trim() || null;
  const qParam = params.get("q")?.trim() ?? "";

  return {
    query: authorParam ? "" : qParam,
    author: authorParam,
    formats: [],
    categories: categoriesFromList.length
      ? categoriesFromList
      : categoryFromUrl
        ? [categoryFromUrl]
        : [],
    sort: sortValue,
  };
}

export function getShopPageData(params: URLSearchParams): ShopPageData {
  const collection = params.get("collection");
  const pageParam = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);
  const filters = parseShopFilters(params);

  const base = collection ? getBooksByCollection(collection) : getAllBooks();
  const catalog = getInStockBooks(base);
  const inventoryCount = countInStockBooks(catalog);
  const results = filterBooks(catalog, filters);

  const totalPages = Math.max(1, Math.ceil(results.length / SHOP_PAGE_SIZE));
  const page = Math.min(pageParam, totalPages);
  const start = (page - 1) * SHOP_PAGE_SIZE;
  const books = results.slice(start, start + SHOP_PAGE_SIZE);

  const author = filters.author;
  const pageTitle = author
    ? author
    : collection === "pre-order"
      ? "Pre-Orders"
      : collection
        ? collection.replace(/-/g, " ")
        : "Books";

  return {
    books,
    page,
    totalPages,
    totalResults: results.length,
    inventoryCount,
    collection,
    author,
    filters,
    pageTitle,
    showPagination: results.length > SHOP_PAGE_SIZE,
  };
}

export function shopQueryString(
  params: URLSearchParams,
  updates: Record<string, string | null | undefined>
): string {
  const next = new URLSearchParams(params.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === "") next.delete(key);
    else next.set(key, value);
  }
  const q = next.toString();
  return q ? `?${q}` : "";
}
