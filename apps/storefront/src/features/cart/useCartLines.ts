"use client";

import { useMemo } from "react";
import { getBookById } from "@/features/books/catalog";
import type { Book } from "@/features/books/types";
import { useCartStore } from "./store";

export type CartLine = {
  book: Book;
  quantity: number;
  lineTotalCents: number;
};

export function useCartLines(): {
  lines: CartLine[];
  subtotalCents: number;
  hasUnknownItems: boolean;
} {
  const items = useCartStore((s) => s.items);

  return useMemo(() => {
    const lines: CartLine[] = [];
    let subtotalCents = 0;
    let hasUnknownItems = false;

    for (const item of items) {
      const book = getBookById(item.bookId);
      if (!book) {
        hasUnknownItems = true;
        continue;
      }
      const lineTotalCents = book.priceCents * item.quantity;
      subtotalCents += lineTotalCents;
      lines.push({ book, quantity: item.quantity, lineTotalCents });
    }

    return { lines, subtotalCents, hasUnknownItems };
  }, [items]);
}
