import type { Metadata } from "next";
import BlogIndexView from "@/features/blog/BlogIndexView";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Essays on reading, authors, and the craft of books — ${site.name}.`,
};

export default function BlogIndexPage() {
  return <BlogIndexView />;
}
