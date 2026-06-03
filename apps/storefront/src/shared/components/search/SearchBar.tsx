"use client";

import type { ComponentProps } from "react";
import SearchIcon from "@/shared/components/icons/SearchIcon";

type SearchBarProps = Omit<ComponentProps<"input">, "type" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
  isSearching?: boolean;
  inputClassName?: string;
};

export default function SearchBar({
  value,
  onValueChange,
  isSearching = false,
  placeholder = "Search books by title or author…",
  className = "",
  inputClassName = "",
  id = "site-search",
  ...props
}: SearchBarProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        Search books
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full rounded-md border border-border bg-paper-muted py-2.5 pl-4 pr-11 font-sans text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 ${inputClassName}`.trim()}
        {...props}
      />
      <span
        className={`pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-ink-muted ${isSearching ? "opacity-50" : ""}`}
        aria-hidden
      >
        <SearchIcon className="h-5 w-5" />
      </span>
      {isSearching ? (
        <span className="sr-only" aria-live="polite">
          Searching
        </span>
      ) : null}
    </div>
  );
}
