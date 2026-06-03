import { getAllAuthors, getBooksByAuthor } from "@/features/books/catalog";
import { partitionAndSortAuthors } from "./sortAuthors";

/** Visible rows per script section before the list scrolls internally. */
export const AUTHORS_SECTION_VISIBLE_COUNT = 20;

const AUTHOR_ROW_HEIGHT = "3.5rem";

export type AuthorsPageData = {
  myanmarAuthors: string[];
  englishAuthors: string[];
  totalAuthors: number;
};

export function getAuthorsSectionMaxHeight(): string {
  return `calc(${AUTHOR_ROW_HEIGHT} * ${AUTHORS_SECTION_VISIBLE_COUNT})`;
}

export function getAuthorsPageData(): AuthorsPageData {
  const { myanmar, english, flat } = partitionAndSortAuthors(getAllAuthors());

  return {
    myanmarAuthors: myanmar,
    englishAuthors: english,
    totalAuthors: flat.length,
  };
}

export function getTitleCount(author: string): number {
  return getBooksByAuthor(author).length;
}
