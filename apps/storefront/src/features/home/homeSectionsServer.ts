import { homeBookSections } from "@/features/home/homeSections";
import {
  getAllBooks,
  getBooksByCollection,
  getNewReleaseBooks,
  getPreOrderBooks,
} from "@/features/books/catalogServer";
import type { Book } from "@/features/books/types";

const BOOKS_PER_SECTION = 20;

async function booksForSection(sectionId: string): Promise<Book[]> {
  if (sectionId === "pre-order") {
    return getPreOrderBooks();
  }

  if (sectionId === "new-releases") {
    return getNewReleaseBooks();
  }

  const collectionBooks = await getBooksByCollection(sectionId);
  if (collectionBooks.length > 0) {
    return collectionBooks;
  }

  const pool = (await getAllBooks()).filter((b) => !b.collections?.length);
  if (pool.length === 0) return [];
  const start = homeBookSections.findIndex((s) => s.id === sectionId) % pool.length;
  return Array.from({ length: BOOKS_PER_SECTION }, (_, i) => pool[(start + i) % pool.length]);
}

export async function getBooksForHomeSection(sectionIndex: number): Promise<Book[]> {
  const section = homeBookSections[sectionIndex];
  if (!section) return [];
  return booksForSection(section.id);
}

export { homeBookSections };
