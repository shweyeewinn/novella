"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  bookId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (bookId: string, quantity?: number) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (bookId, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.bookId === bookId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.bookId === bookId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { bookId, quantity }] };
        });
      },
      setQuantity: (bookId, quantity) => {
        if (quantity < 1) {
          get().removeItem(bookId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.bookId === bookId ? { ...i, quantity } : i)),
        }));
      },
      removeItem: (bookId) => {
        set((state) => ({
          items: state.items.filter((i) => i.bookId !== bookId),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "novella-cart" }
  )
);
