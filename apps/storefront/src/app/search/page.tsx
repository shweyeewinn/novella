import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResultsView from "@/features/search/SearchResultsView";
import { getAllBooks } from "@/features/books/catalogServer";

export const metadata: Metadata = {
  title: "Search results",
};

export const revalidate = 60;

export default async function SearchPage() {
  const books = await getAllBooks();
  return (
    <Suspense fallback={<p className="font-sans text-ink-muted">Loading search…</p>}>
      <SearchResultsView books={books} />
    </Suspense>
  );
}
