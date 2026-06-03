import { mockPosts } from "./mockPosts";
import type { BlogCategory, BlogPost } from "./types";

/** Max posts shown per category section on the blog index */
export const BLOG_SECTION_MAX_POSTS = 8;

export const categoryLabels: Record<BlogCategory, string> = {
  reading: "Reading life",
  authors: "Authors",
  publishing: "Publishing",
  community: "Community",
};

/** HSL hue for category gradients on blog cards */
export const categoryAccentHue: Record<BlogCategory, number> = {
  reading: 38,
  authors: 12,
  publishing: 220,
  community: 145,
};

export function getPostAccentHue(post: BlogPost): number {
  return post.coverHue ?? categoryAccentHue[post.category];
}

export function getAllPosts(): BlogPost[] {
  return [...mockPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return mockPosts.find((p) => p.featured) ?? getAllPosts()[0];
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}
