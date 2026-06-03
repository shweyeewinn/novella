import Link from "next/link";
import type { BlogPost } from "@/features/blog/types";
import { categoryLabels } from "@/features/blog/catalog";
import BlogLabel from "@/shared/components/blog/BlogLabel";
import BlogPostMeta from "@/shared/components/blog/BlogPostMeta";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-paper p-5 transition-colors hover:border-primary/30 hover:bg-paper-muted/40 sm:p-6">
      <BlogLabel>{categoryLabels[post.category]}</BlogLabel>
      <Link href={`/blog/${post.slug}`} className="mt-3 block">
        <h2 className="font-serif text-xl leading-snug text-ink transition-colors group-hover:text-primary sm:text-2xl">
          {post.title}
        </h2>
      </Link>
      <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink-muted sm:text-base">
        {post.excerpt}
      </p>
      <div className="mt-5 space-y-3 border-t border-border pt-4">
        <BlogPostMeta post={post} />
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Read article
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
