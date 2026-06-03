import { browseCategories as staticCategories } from "@/features/catalog/browseCategories";
import type { BrowseCategory } from "@/features/catalog/browseCategories";
import { isStrapiEnabled } from "@/lib/strapi/client";
import { fetchBrowseCategoriesFromStrapi } from "@/lib/strapi/categories";

export async function getBrowseCategories(): Promise<BrowseCategory[]> {
  if (!isStrapiEnabled()) return staticCategories;
  const categories = await fetchBrowseCategoriesFromStrapi();
  return categories.length ? categories : staticCategories;
}
