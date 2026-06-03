"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "./useDebouncedValue";

export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_PATH = "/search";

/**
 * Header search state synced to `/search?q=` (dedicated results page, not `/shop`).
 * Mount once via SearchProvider.
 */
export function useShopSearch(delayMs = SEARCH_DEBOUNCE_MS) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isSearchPage = pathname === SEARCH_PATH;
  const urlQuery = isSearchPage ? (searchParams.get("q") ?? "") : "";

  const [input, setInput] = useState(urlQuery);
  const debouncedQuery = useDebouncedValue(input, delayMs);
  const skipNextUrlSync = useRef(false);

  useEffect(() => {
    setInput(urlQuery);
    skipNextUrlSync.current = true;
  }, [urlQuery]);

  useEffect(() => {
    if (skipNextUrlSync.current) {
      skipNextUrlSync.current = false;
      return;
    }

    if (input.trim() !== debouncedQuery.trim()) return;

    const next = debouncedQuery.trim();
    const current = urlQuery.trim();

    if (!next) {
      if (isSearchPage && current) {
        router.replace(SEARCH_PATH, { scroll: false });
      }
      return;
    }

    if (next === current) return;

    if (!isSearchPage) {
      router.push(`${SEARCH_PATH}?q=${encodeURIComponent(next)}`, { scroll: false });
      return;
    }

    router.replace(
      `${SEARCH_PATH}?q=${encodeURIComponent(next)}`,
      { scroll: false }
    );
  }, [debouncedQuery, input, urlQuery, isSearchPage, pathname, router]);

  const isSearching = input.trim() !== debouncedQuery.trim();

  return {
    input,
    setInput,
    debouncedQuery: debouncedQuery.trim(),
    isSearching,
  };
}

export type ShopSearchState = ReturnType<typeof useShopSearch>;
