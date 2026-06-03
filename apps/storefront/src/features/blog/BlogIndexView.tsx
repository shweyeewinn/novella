import Link from "next/link";
import { BLOG_SECTION_MAX_POSTS, categoryLabels } from "@/features/blog/catalog";
import type { BlogCategory, BlogPost } from "@/features/blog/types";
import BlogCard from "@/shared/components/blog/BlogCard";
import BlogFeaturedCard from "@/shared/components/blog/BlogFeaturedCard";
import BlogHero from "@/shared/components/blog/BlogHero";

const categoryOrder: BlogCategory[] = ["reading", "authors", "publishing", "community"];

function groupPostsByCategory(posts: BlogPost[]): { category: BlogCategory; posts: BlogPost[] }[] {
  return categoryOrder
    .map((category) => ({
      category,
      posts: posts.filter((p) => p.category === category),
    }))
    .filter((group) => group.posts.length > 0);
}

type BlogIndexViewProps = {
  featured: BlogPost | undefined;
  posts: BlogPost[];
};

export default function BlogIndexView({ featured, posts }: BlogIndexViewProps) {
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const groups = groupPostsByCategory(rest);

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      <BlogHero />

      {featured ? <BlogFeaturedCard post={featured} /> : null}

      {groups.length > 1 ? (
        <nav className="flex flex-wrap gap-2" aria-label="Browse by topic">
          {groups.map(({ category }) => (
            <a
              key={category}
              href={`#blog-${category}`}
              className="rounded-full border border-border px-3 py-1 font-sans text-sm text-ink-muted transition-colors hover:border-primary/30 hover:text-ink"
            >
              {categoryLabels[category]}
            </a>
          ))}
        </nav>
      ) : null}

      {groups.map(({ category, posts: sectionPosts }) => (
        <section key={category} id={`blog-${category}`} className="space-y-6">
          <h2 className="font-serif text-2xl text-ink">{categoryLabels[category]}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectionPosts.slice(0, BLOG_SECTION_MAX_POSTS).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}

      <p className="font-sans text-sm text-ink-muted">
        <Link href="/shop" className="text-primary hover:underline">
          Browse the shop
        </Link>{" "}
        for new titles and pre-orders.
      </p>
    </div>
  );
}
