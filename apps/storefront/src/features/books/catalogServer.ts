import {
  getAllBooks as getStaticAllBooks,
  getBookById as getStaticBookById,
  getBookBySlug as getStaticBookBySlug,
  getBooksByCollection as getStaticBooksByCollection,
  getPreOrderBooks as getStaticPreOrderBooks,
  getNewReleaseBooks as getStaticNewReleaseBooks,
  getFeaturedBooks as getStaticFeaturedBooks,
  getAllAuthors as getStaticAllAuthors,
  getBooksByAuthor as getStaticBooksByAuthor,
} from "@/features/books/catalog";
import type { Book } from "@/features/books/types";
import { isStrapiEnabled } from "@/lib/strapi/client";
import {
  fetchAllBooksFromStrapi,
  fetchBookByIdFromStrapi,
  fetchBookBySlugFromStrapi,
  fetchBooksByCollectionFromStrapi,
} from "@/lib/strapi/books";

async function fromCmsOrStatic<T>(
  cms: () => Promise<T | null | undefined>,
  fallback: () => T
): Promise<T> {
  if (!isStrapiEnabled()) return fallback();
  const value = await cms();
  if (value === null || value === undefined) return fallback();
  if (Array.isArray(value) && value.length === 0) return fallback();
  return value as T;
}

export async function getAllBooks(): Promise<Book[]> {
  return fromCmsOrStatic(fetchAllBooksFromStrapi, getStaticAllBooks);
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  if (!isStrapiEnabled()) return getStaticBookBySlug(slug);
  const book = await fetchBookBySlugFromStrapi(slug);
  return book ?? getStaticBookBySlug(slug);
}

export async function getBookById(id: string): Promise<Book | undefined> {
  if (!isStrapiEnabled()) return getStaticBookById(id);
  const book = await fetchBookByIdFromStrapi(id);
  return book ?? getStaticBookById(id);
}

export async function getBooksByCollection(collection: string): Promise<Book[]> {
  if (!isStrapiEnabled()) return getStaticBooksByCollection(collection);
  const books = await fetchBooksByCollectionFromStrapi(collection);
  return books.length ? books : getStaticBooksByCollection(collection);
}

export async function getPreOrderBooks(): Promise<Book[]> {
  return getBooksByCollection("pre-order");
}

export async function getNewReleaseBooks(): Promise<Book[]> {
  return getBooksByCollection("new-releases");
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const all = await getAllBooks();
  const featured = all.filter((b) => b.featured);
  return featured.length ? featured : getStaticFeaturedBooks();
}

export async function getAllAuthors(): Promise<string[]> {
  const all = await getAllBooks();
  return [...new Set(all.map((b) => b.author))];
}

export async function getBooksByAuthor(author: string): Promise<Book[]> {
  const all = await getAllBooks();
  return all.filter((b) => b.author === author);
}
