"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useWishlistStore } from "@/features/wishlist/store";
import WishlistIcon from "@/shared/components/icons/WishlistIcon";
import {
  headerIconBadgeClass,
  headerIconButtonClass,
} from "@/shared/components/layout/headerIconStyles";

function subscribeNoop() {
  return () => {};
}

function selectWishlistCount(state: { bookIds: string[] }): number {
  return state.bookIds.length;
}

export default function WishlistNavLink() {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const count = useWishlistStore(selectWishlistCount);
  const showCount = mounted && count > 0;

  const ariaLabel =
    count > 0
      ? `Wishlist, ${count} ${count === 1 ? "book" : "books"}`
      : "Wishlist";

  return (
    <Link
      href="/wishlist"
      className={`${headerIconButtonClass} text-primary hover:text-primary-hover`}
      aria-label={ariaLabel}
    >
      <span className="relative inline-flex shrink-0">
        <WishlistIcon className="h-6 w-6" filled={showCount} />
        {showCount ? (
          <span className={headerIconBadgeClass} aria-hidden>
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
