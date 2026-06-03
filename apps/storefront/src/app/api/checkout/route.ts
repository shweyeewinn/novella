import { NextResponse } from "next/server";
import { getBookById } from "@/features/books/catalog";
import type { CartLineInput } from "@/features/books/types";

type CheckoutBody = {
  items?: CartLineInput[];
  email?: string;
};

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  let totalCents = 0;
  const lineItems: { id: string; title: string; quantity: number; unitCents: number }[] =
    [];

  for (const { id, quantity } of items) {
    if (!id || typeof quantity !== "number" || quantity < 1 || quantity > 99) {
      return NextResponse.json({ error: "Invalid line item" }, { status: 400 });
    }

    const book = getBookById(id);
    if (!book) {
      return NextResponse.json({ error: `Unknown book: ${id}` }, { status: 400 });
    }

    if (book.format === "physical") {
      const stock = book.inventoryCount ?? 0;
      if (quantity > stock) {
        return NextResponse.json(
          { error: `Not enough stock for “${book.title}”` },
          { status: 400 }
        );
      }
    }

    const unitCents = book.priceCents;
    totalCents += unitCents * quantity;
    lineItems.push({
      id: book.id,
      title: book.title,
      quantity,
      unitCents,
    });
  }

  const orderId = `NOV-${Date.now().toString(36).toUpperCase()}`;
  const params = new URLSearchParams({
    order: orderId,
    total: String(totalCents),
  });
  if (body.email) params.set("email", body.email);

  return NextResponse.json({
    orderId,
    totalCents,
    lineItems,
    checkoutUrl: `/checkout/success?${params.toString()}`,
  });
}
