"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/features/cart/store";
import CartIcon from "@/shared/components/icons/CartIcon";
import {
  headerIconBadgeClass,
  headerIconButtonClass,
} from "@/shared/components/layout/headerIconStyles";

function subscribeNoop() {
  return () => {};
}

function selectCartItemCount(state: { items: { quantity: number }[] }): number {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

export default function CartNavLink() {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const itemCount = useCartStore(selectCartItemCount);

  const ariaLabel =
    itemCount > 0
      ? `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
      : "Cart";

  return (
    <Link
      href="/cart"
      className={`${headerIconButtonClass} text-ink hover:text-primary`}
      aria-label={ariaLabel}
    >
      <span className="relative inline-flex shrink-0">
        <CartIcon className="h-6 w-6" />
        {mounted && itemCount > 0 ? (
          <span className={headerIconBadgeClass} aria-hidden>
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
