import Link from "next/link";
import {
  BLOG_SECTION_MAX_POSTS,
  getAllPosts,
  getFeaturedPost,
  categoryLabels,
} from "@/features/blog/catalog";
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

export default function BlogIndexView() {
  const featured = getFeaturedPost();
  const posts = getAllPosts().filter((p) => p.slug !== featured?.slug);
  const groups = groupPostsByCategory(posts);

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      <BlogHero />

      {featured ? <BlogFeaturedCard post={featured} /> : null}

      {groups.length > 1 ? (
        <nav className="flex flex-wrap gap-2" aria-label="Browse by topic">
          {groups.map(({ category }) => (
            <Link
              key={category}
              href={`#posts-${category}`}
              className="cursor-pointer rounded-md border border-border bg-paper-muted/80 px-3 py-1.5 font-sans text-sm text-ink-muted transition-colors hover:border-primary/30 hover:text-primary"
            >
              {categoryLabels[category]}
            </Link>
          ))}
        </nav>
      ) : null}

      <div className="space-y-12 sm:space-y-14">
        {groups.map(({ category, posts: groupPosts }) => {
          const visiblePosts = groupPosts.slice(0, BLOG_SECTION_MAX_POSTS);
          const totalInCategory = groupPosts.length;
          const countLabel =
            totalInCategory > BLOG_SECTION_MAX_POSTS
              ? `Showing ${BLOG_SECTION_MAX_POSTS} of ${totalInCategory} articles`
              : `${totalInCategory} ${totalInCategory === 1 ? "article" : "articles"}`;

          return (
            <section
              key={category}
              id={`posts-${category}`}
              className="scroll-mt-24 space-y-6"
              aria-labelledby={`heading-${category}`}
            >
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                <h2
                  id={`heading-${category}`}
                  className="font-serif text-2xl font-bold text-ink sm:text-3xl"
                >
                  {categoryLabels[category]}
                </h2>
                <p className="font-sans text-sm text-ink-muted">{countLabel}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                {visiblePosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
