import type { Metadata } from "next";
import { Suspense } from "react";
import ShopView from "@/features/shop/ShopView";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<p className="font-sans text-ink-muted">Loading shop…</p>}>
      <ShopView />
    </Suspense>
  );
}
