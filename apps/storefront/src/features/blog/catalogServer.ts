import {
  getAllPosts as getStaticAllPosts,
  getPostBySlug as getStaticPostBySlug,
  getFeaturedPost as getStaticFeaturedPost,
} from "@/features/blog/catalog";
import type { BlogPost } from "@/features/blog/types";
import { isStrapiEnabled } from "@/lib/strapi/client";
import { fetchAllPostsFromStrapi, fetchPostBySlugFromStrapi } from "@/lib/strapi/blog";

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isStrapiEnabled()) return getStaticAllPosts();
  const posts = await fetchAllPostsFromStrapi();
  return posts.length ? posts : getStaticAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isStrapiEnabled()) return getStaticPostBySlug(slug);
  const post = await fetchPostBySlugFromStrapi(slug);
  return post ?? getStaticPostBySlug(slug);
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? getStaticFeaturedPost();
}
