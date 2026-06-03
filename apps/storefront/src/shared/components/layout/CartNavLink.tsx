"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/features/cart/store";

export default function CartNavLink() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/cart"
      className="relative transition-colors hover:text-accent"
    >
      Cart
      {mounted && totalItems > 0 ? (
        <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 font-sans text-[10px] font-semibold text-paper">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      ) : null}
    </Link>
  );
}
