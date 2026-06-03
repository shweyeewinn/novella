"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShippingAddress } from "@/features/auth/types";
import type { Order, OrderLineItem, OrderStatus } from "./types";

type CreateOrderInput = {
  id: string;
  userId: string | null;
  email: string;
  lineItems: OrderLineItem[];
  totalCents: number;
  shipping: ShippingAddress | null;
};

type OrdersState = {
  orders: Order[];
  addOrder: (input: CreateOrderInput) => Order;
  getOrdersForAccount: (userId: string, email: string) => Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNote?: string) => void;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (input) => {
        const order: Order = {
          ...input,
          status: "pending_payment",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },

      getOrdersForAccount: (userId, email) => {
        const normalized = email.trim().toLowerCase();
        return get()
          .orders.filter(
            (o) =>
              o.userId === userId || (normalized && o.email.trim().toLowerCase() === normalized)
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      updateOrderStatus: (orderId, status, trackingNote) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status, trackingNote: trackingNote ?? o.trackingNote } : o
          ),
        }));
      },
    }),
    { name: "novella-orders" }
  )
);
