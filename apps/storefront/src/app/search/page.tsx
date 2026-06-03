import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResultsView from "@/features/search/SearchResultsView";

export const metadata: Metadata = {
  title: "Search results",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="font-sans text-ink-muted">Loading search…</p>}>
      <SearchResultsView />
    </Suspense>
  );
}
