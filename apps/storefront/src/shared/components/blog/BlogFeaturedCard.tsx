import Link from "next/link";
import type { BlogPost } from "@/features/blog/types";
import { categoryLabels } from "@/features/blog/catalog";
import BlogLabel from "@/shared/components/blog/BlogLabel";
import BlogPostMeta from "@/shared/components/blog/BlogPostMeta";
import { ButtonLink } from "@/shared/components/ui/Button";

type BlogFeaturedCardProps = {
  post: BlogPost;
};

export default function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  return (
    <section
      className="rounded-lg border border-border bg-paper-muted/60 p-5 sm:p-8 lg:p-10"
      aria-labelledby="blog-featured-title"
    >
      <BlogLabel>Featured</BlogLabel>
      <p className="mt-2 font-sans text-sm text-ink-muted">{categoryLabels[post.category]}</p>
      <Link href={`/blog/${post.slug}`} className="mt-3 block group">
        <h2
          id="blog-featured-title"
          className="font-serif text-2xl leading-tight text-ink transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl"
        >
          {post.title}
        </h2>
      </Link>
      <p className="mt-4 font-sans leading-relaxed text-ink-muted sm:text-lg">{post.excerpt}</p>
      <BlogPostMeta post={post} showAuthor className="mt-4 mb-6 sm:mb-8" />
      <ButtonLink href={`/blog/${post.slug}`}>Read article</ButtonLink>
    </section>
  );
}
