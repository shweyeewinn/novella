import { getSessionUserId } from "@/lib/auth/session";
import { isShippingComplete } from "@/lib/auth/shipping";
import { getBookById } from "@/features/books/catalogServer";
import { createOrder, createOrderId } from "@/lib/orders/repository";
import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/response";
import type { ShippingAddress } from "@/types/auth";
import type { CartLineInput } from "@/features/books/types";

type CheckoutBody = {
  items?: CartLineInput[];
  email?: string;
  shipping?: ShippingAddress | null;
};

export async function POST(request: Request) {
  const body = await parseJsonBody<CheckoutBody>(request);
  if (!body) return jsonError("Invalid JSON body", 400);

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return jsonError("Cart is empty", 400);
  }

  const email = body.email?.trim();
  if (!email) {
    return jsonError("Email is required", 400);
  }

  let totalCents = 0;
  const lineItems: {
    bookId: string;
    title: string;
    quantity: number;
    unitCents: number;
  }[] = [];
  let needsShipping = false;

  for (const { id, quantity } of items) {
    if (!id || typeof quantity !== "number" || quantity < 1 || quantity > 99) {
      return jsonError("Invalid line item", 400);
    }

    const book = await getBookById(id);
    if (!book) {
      return jsonError(`Unknown book: ${id}`, 400);
    }

    if (book.format === "physical") {
      needsShipping = true;
      if (!book.preOrder) {
        const stock = book.inventoryCount ?? 0;
        if (quantity > stock) {
          return jsonError(`Not enough stock for “${book.title}”`, 400);
        }
      }
    }

    const unitCents = book.priceCents;
    totalCents += unitCents * quantity;
    lineItems.push({
      bookId: book.id,
      title: book.title,
      quantity,
      unitCents,
    });
  }

  if (needsShipping) {
    const s = body.shipping;
    if (!s || !isShippingComplete(s)) {
      return jsonError("Complete delivery address is required", 400);
    }
  }

  const userId = await getSessionUserId();
  const orderId = createOrderId();

  await createOrder(orderId, {
    userId,
    email,
    lineItems,
    totalCents,
    shipping: needsShipping ? body.shipping ?? null : null,
  });

  const params = new URLSearchParams({
    order: orderId,
    total: String(totalCents),
    email,
  });

  return jsonOk({
    orderId,
    totalCents,
    lineItems,
    checkoutUrl: `/checkout/success?${params.toString()}`,
  });
}
