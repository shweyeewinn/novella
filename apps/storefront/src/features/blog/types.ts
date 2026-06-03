export type BlogCategory = "reading" | "authors" | "publishing" | "community";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
  /** Accent for card gradients until cover art exists (Strapi image later) */
  coverHue?: number;
};
