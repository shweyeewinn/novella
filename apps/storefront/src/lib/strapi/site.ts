import { mapStrapiSiteSetting } from "@/lib/strapi/mappers";
import { strapiFetch, type StrapiSingleResponse } from "@/lib/strapi/client";
import type { StrapiSiteSetting } from "@/lib/strapi/types";

export async function fetchSiteSettingsFromStrapi() {
  const res = await strapiFetch<StrapiSingleResponse<StrapiSiteSetting>>("/site-setting");
  if (!res?.data) return null;
  return mapStrapiSiteSetting(res.data);
}
