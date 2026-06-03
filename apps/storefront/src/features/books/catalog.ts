import { mockBooks } from "./mockBooks";
import { newReleaseBooks } from "./newReleaseBooks";
import { preOrderBooks } from "./preOrderBooks";
import type { Book, BookCategory, BookFormat } from "./types";

function hasCoverImage(book: Book): boolean {
  return Boolean(book.coverImageSrc?.trim());
}

const allCatalogBooks = [...mockBooks, ...preOrderBooks, ...newReleaseBooks].filter(
  hasCoverImage
);

export function getAllBooks(): Book[] {
  return allCatalogBooks;
}

export function getPreOrderBooks(): Book[] {
  return preOrderBooks;
}

export function getNewReleaseBooks(): Book[] {
  return newReleaseBooks;
}

export function getBooksByCollection(collection: string): Book[] {
  return allCatalogBooks.filter((b) => b.collections?.includes(collection));
}

export function getBookBySlug(slug: string): Book | undefined {
  return allCatalogBooks.find((b) => b.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return allCatalogBooks.find((b) => b.id === id);
}

export function getFeaturedBooks(): Book[] {
  return allCatalogBooks.filter((b) => b.featured);
}

export function getAllAuthors(): string[] {
  return [...new Set(allCatalogBooks.map((b) => b.author))];
}

export function getBooksByAuthor(author: string): Book[] {
  return allCatalogBooks.filter((b) => b.author === author);
}

export const categoryLabels: Record<BookCategory, string> = {
  fiction: "Fiction",
  nonfiction: "Nonfiction",
  nature: "Nature & Lifestyle",
  literary: "Literary",
};

export function getAllCategories(): BookCategory[] {
  return Object.keys(categoryLabels) as BookCategory[];
}

export type ShopFilters = {
  query: string;
  /** Exact author name from /shop?author= (e.g. Authors page links) */
  author: string | null;
  formats: BookFormat[];
  categories: BookCategory[];
  sort: "newest" | "price-asc" | "price-desc" | "title";
};

export const defaultShopFilters: ShopFilters = {
  query: "",
  author: null,
  formats: [],
  categories: [],
  sort: "newest",
};

export function filterBooks(books: Book[], filters: ShopFilters): Book[] {
  let result = [...books];

  const author = filters.author?.trim();
  if (author) {
    result = result.filter((b) => b.author === author);
  } else {
    const q = filters.query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }
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
  if (book.preOrder) return true;
  if (book.format === "digital") return true;
  return (book.inventoryCount ?? 0) > 0;
}

/** Titles available to order (physical stock, digital, or pre-order). */
export function getInStockBooks(books: Book[] = allCatalogBooks): Book[] {
  return books.filter(isInStock);
}

export function countInStockBooks(books: Book[] = allCatalogBooks): number {
  return getInStockBooks(books).length;
}
