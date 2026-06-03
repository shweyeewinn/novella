import { getAllBooks, getBooksByCollection } from "@/features/books/catalog";
import type { BookCategory } from "@/features/books/types";

/** Book count for a shop link (`?collection=` or `?category=`). */
export function getBookCountForCategoryHref(href: string): number {
  const query = href.includes("?") ? href.slice(href.indexOf("?") + 1) : "";
  const params = new URLSearchParams(query);
  const collection = params.get("collection");
  if (collection) return getBooksByCollection(collection).length;

  const category = params.get("category");
  if (category) {
    return getAllBooks().filter((b) => b.category === (category as BookCategory)).length;
  }

  return 0;
}
