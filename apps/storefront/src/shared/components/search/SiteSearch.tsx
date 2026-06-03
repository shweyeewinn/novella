"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SEARCH_PATH } from "@/shared/hooks/useShopSearch";
import { useSearchState } from "@/shared/providers/SearchProvider";
import SearchBar from "./SearchBar";

export default function SiteSearch({
  compact = false,
  mobile = false,
}: {
  compact?: boolean;
  /** Larger touch target and full width in the mobile header row */
  mobile?: boolean;
}) {
  const search = useSearchState();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlQuery = pathname === SEARCH_PATH ? (searchParams.get("q") ?? "") : "";

  if (!search) {
    return (
      <SearchBar
        id="header-search"
        value={urlQuery}
        onValueChange={() => {}}
        isSearching={false}
        placeholder={compact ? "Search books…" : undefined}
        className={compact || mobile ? "w-full" : "max-w-md"}
        inputClassName={mobile ? "min-h-11 py-3 text-base" : undefined}
      />
    );
  }

  const { input, setInput, isSearching } = search;

  return (
    <SearchBar
      id="header-search"
      value={input}
      onValueChange={setInput}
      isSearching={isSearching}
      placeholder={compact ? "Search books…" : undefined}
      className={compact || mobile ? "w-full" : "max-w-md"}
      inputClassName={mobile ? "min-h-11 py-3 text-base" : undefined}
    />
  );
}
