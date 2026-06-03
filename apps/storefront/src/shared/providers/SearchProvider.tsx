"use client";

import {
  createContext,
  useContext,
  Suspense,
  type ReactNode,
} from "react";
import {
  useShopSearch,
  type ShopSearchState,
} from "@/shared/hooks/useShopSearch";

const SearchContext = createContext<ShopSearchState | null>(null);

function SearchProviderInner({ children }: { children: ReactNode }) {
  const search = useShopSearch();
  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}

export function SearchProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={children}>
      <SearchProviderInner>{children}</SearchProviderInner>
    </Suspense>
  );
}

export function useSearch(): ShopSearchState {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return ctx;
}

/** Safe for header/shop while SearchProvider Suspense is pending */
export function useSearchState(): ShopSearchState | null {
  return useContext(SearchContext);
}
