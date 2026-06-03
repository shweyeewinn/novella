import { mapStrapiBook } from "@/lib/strapi/mappers";
import { strapiFetch, type StrapiListResponse } from "@/lib/strapi/client";
import type { StrapiBook } from "@/lib/strapi/types";
import type { Book } from "@/features/books/types";
import { strapiConfig } from "@/config/strapi";

const PAGE_SIZE = 100;

export async function fetchAllBooksFromStrapi(): Promise<Book[]> {
  const books: Book[] = [];
  let page = 1;
  let pageCount = 1;

  while (page <= pageCount) {
    const res = await strapiFetch<StrapiListResponse<StrapiBook>>(
      `/books?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&sort=publishedYear:desc&populate=cover`
    );
    if (!res?.data?.length) break;

    for (const entry of res.data) {
      books.push(mapStrapiBook(entry));
    }

    pageCount = res.meta?.pagination?.pageCount ?? 1;
    page += 1;
  }

  return books.filter((b) => Boolean(b.coverImageSrc?.trim()));
}

export async function fetchBookBySlugFromStrapi(slug: string): Promise<Book | null> {
  const res = await strapiFetch<StrapiListResponse<StrapiBook>>(
    `/books?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=cover&pagination[pageSize]=1`
  );
  const entry = res?.data?.[0];
  return entry ? mapStrapiBook(entry) : null;
}

export async function fetchBookByIdFromStrapi(bookId: string): Promise<Book | null> {
  const res = await strapiFetch<StrapiListResponse<StrapiBook>>(
    `/books?filters[bookId][$eq]=${encodeURIComponent(bookId)}&populate=cover&pagination[pageSize]=1`
  );
  const entry = res?.data?.[0];
  return entry ? mapStrapiBook(entry) : null;
}

export async function fetchBooksByCollectionFromStrapi(
  collection: string
): Promise<Book[]> {
  const all = await fetchAllBooksFromStrapi();
  return all.filter((b) => b.collections?.includes(collection));
}

export { strapiConfig };
