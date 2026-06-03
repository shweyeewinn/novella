import { getAllAuthors, getBooksByAuthor } from "@/features/books/catalogServer";
import { partitionAndSortAuthors } from "./sortAuthors";

/** Visible rows per script section before the list scrolls internally. */
export const AUTHORS_SECTION_VISIBLE_COUNT = 20;

const AUTHOR_ROW_HEIGHT = "3.5rem";

export type AuthorsPageData = {
  myanmarAuthors: string[];
  englishAuthors: string[];
  totalAuthors: number;
  titleCountByAuthor: Record<string, number>;
};

export function getAuthorsSectionMaxHeight(): string {
  return `calc(${AUTHOR_ROW_HEIGHT} * ${AUTHORS_SECTION_VISIBLE_COUNT})`;
}

export async function getAuthorsPageData(): Promise<AuthorsPageData> {
  const authors = await getAllAuthors();
  const { myanmar, english, flat } = partitionAndSortAuthors(authors);

  const titleCountByAuthor: Record<string, number> = {};
  for (const author of flat) {
    const books = await getBooksByAuthor(author);
    titleCountByAuthor[author] = books.length;
  }

  return {
    myanmarAuthors: myanmar,
    englishAuthors: english,
    totalAuthors: flat.length,
    titleCountByAuthor,
  };
}
