import type { Metadata } from "next";
import { Suspense } from "react";
import ShopPageContent from "@/features/shop/ShopPageContent";
import { getShopPageData } from "@/features/shop/getShopPageData";

export const metadata: Metadata = {
  title: "Books",
};

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toURLSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, v);
    } else {
      params.set(key, value);
    }
  }
  return params;
}

async function ShopPageInner({ searchParams }: ShopPageProps) {
  const resolved = await searchParams;
  const data = getShopPageData(toURLSearchParams(resolved));
  return <ShopPageContent data={data} />;
}

export default function ShopPage(props: ShopPageProps) {
  return (
    <Suspense fallback={<p className="font-sans text-ink-muted">Loading shop…</p>}>
      <ShopPageInner {...props} />
    </Suspense>
  );
}
