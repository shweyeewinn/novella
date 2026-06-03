import { mapStrapiBrowseCategory } from "@/lib/strapi/mappers";
import { strapiFetch, type StrapiListResponse } from "@/lib/strapi/client";
import type { StrapiBrowseCategory } from "@/lib/strapi/types";
import type { BrowseCategory } from "@/features/catalog/browseCategories";

export async function fetchBrowseCategoriesFromStrapi(): Promise<BrowseCategory[]> {
  const res = await strapiFetch<StrapiListResponse<StrapiBrowseCategory>>(
    "/browse-categories?sort=sortOrder:asc&populate=children&pagination[pageSize]=50"
  );
  if (!res?.data?.length) return [];
  return res.data.map(mapStrapiBrowseCategory);
}
