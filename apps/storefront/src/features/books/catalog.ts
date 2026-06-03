import { mockBooks } from "./mockBooks";
import type { Book, BookCategory, BookFormat } from "./types";

export function getAllBooks(): Book[] {
  return mockBooks;
}

export function getBookBySlug(slug: string): Book | undefined {
  return mockBooks.find((b) => b.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return mockBooks.find((b) => b.id === id);
}

export function getFeaturedBooks(): Book[] {
  return mockBooks.filter((b) => b.featured);
}

export const categoryLabels: Record<BookCategory, string> = {
  fiction: "Fiction",
  nonfiction: "Nonfiction",
  nature: "Nature & Lifestyle",
  literary: "Literary",
};

export type ShopFilters = {
  query: string;
  formats: BookFormat[];
  categories: BookCategory[];
  sort: "newest" | "price-asc" | "price-desc" | "title";
};

export const defaultShopFilters: ShopFilters = {
  query: "",
  formats: [],
  categories: [],
  sort: "newest",
};

export function filterBooks(books: Book[], filters: ShopFilters): Book[] {
  let result = [...books];

  const q = filters.query.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }

  if (filters.formats.length > 0) {
    result = result.filter((b) => filters.formats.includes(b.format));
  }

  if (filters.categories.length > 0) {
    result = result.filter((b) => filters.categories.includes(b.category));
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case "price-desc":
      result.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case "title":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      result.sort((a, b) => (b.publishedYear ?? 0) - (a.publishedYear ?? 0));
  }

  return result;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function isInStock(book: Book): boolean {
  if (book.format === "digital") return true;
  return (book.inventoryCount ?? 0) > 0;
}
