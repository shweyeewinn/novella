import { mapStrapiBlogPost } from "@/lib/strapi/mappers";
import { strapiFetch, type StrapiListResponse } from "@/lib/strapi/client";
import type { StrapiBlogPost } from "@/lib/strapi/types";
import type { BlogPost } from "@/features/blog/types";

export async function fetchAllPostsFromStrapi(): Promise<BlogPost[]> {
  const res = await strapiFetch<StrapiListResponse<StrapiBlogPost>>(
    "/blog-posts?sort=publishedAt:desc&pagination[pageSize]=100"
  );
  if (!res?.data?.length) return [];
  return res.data.map(mapStrapiBlogPost);
}

export async function fetchPostBySlugFromStrapi(slug: string): Promise<BlogPost | null> {
  const res = await strapiFetch<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`
  );
  const entry = res?.data?.[0];
  return entry ? mapStrapiBlogPost(entry) : null;
}
