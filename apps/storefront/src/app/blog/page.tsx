import type { Metadata } from "next";
import BlogIndexView from "@/features/blog/BlogIndexView";
import { getAllPosts, getFeaturedPost } from "@/features/blog/catalogServer";
import { getSiteConfig } from "@/lib/site/siteServer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: "Blog",
    description: `Essays on reading, authors, and the craft of books — ${site.name}.`,
  };
}

export default async function BlogIndexPage() {
  const [featured, posts] = await Promise.all([getFeaturedPost(), getAllPosts()]);
  return <BlogIndexView featured={featured} posts={posts} />;
}
