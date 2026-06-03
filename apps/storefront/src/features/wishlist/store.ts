"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  bookIds: string[];
  toggle: (bookId: string) => void;
  has: (bookId: string) => boolean;
  remove: (bookId: string) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      bookIds: [],
      toggle: (bookId) => {
        set((state) => ({
          bookIds: state.bookIds.includes(bookId)
            ? state.bookIds.filter((id) => id !== bookId)
            : [...state.bookIds, bookId],
        }));
      },
      has: (bookId) => get().bookIds.includes(bookId),
      remove: (bookId) => {
        set((state) => ({
          bookIds: state.bookIds.filter((id) => id !== bookId),
        }));
      },
    }),
    { name: "novella-wishlist" }
  )
);
