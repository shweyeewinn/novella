import { readJsonStore, writeJsonStore } from "@/lib/data/jsonStore";
import type { CreateOrderInput, Order, OrderStatus } from "@/types/order";

const STORE = "orders";

type OrdersFile = { orders: Order[] };

async function load(): Promise<Order[]> {
  const data = await readJsonStore<OrdersFile>(STORE, { orders: [] });
  return data.orders;
}

async function save(orders: Order[]) {
  await writeJsonStore<OrdersFile>(STORE, { orders });
}

export function createOrderId(): string {
  return `NOV-${Date.now().toString(36).toUpperCase()}`;
}

export async function createOrder(
  id: string,
  input: CreateOrderInput
): Promise<Order> {
  const now = new Date().toISOString();
  const order: Order = {
    id,
    ...input,
    status: "pending_payment",
    createdAt: now,
    updatedAt: now,
  };
  const orders = await load();
  await save([order, ...orders]);
  return order;
}

export async function findOrderById(id: string): Promise<Order | null> {
  const orders = await load();
  return orders.find((o) => o.id === id) ?? null;
}

export async function listOrdersForUser(
  userId: string,
  email: string
): Promise<Order[]> {
  const normalized = email.trim().toLowerCase();
  const orders = await load();
  return orders
    .filter(
      (o) =>
        o.userId === userId ||
        (normalized && o.email.trim().toLowerCase() === normalized)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  trackingNote?: string
): Promise<Order | null> {
  const orders = await load();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return null;
  orders[idx] = {
    ...orders[idx],
    status,
    trackingNote: trackingNote ?? orders[idx].trackingNote,
    updatedAt: new Date().toISOString(),
  };
  await save(orders);
  return orders[idx];
}
