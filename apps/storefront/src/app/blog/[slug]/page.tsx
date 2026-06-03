import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels } from "@/features/blog/catalog";
import { getAllPosts, getPostBySlug } from "@/features/blog/catalogServer";
import BlogLabel from "@/shared/components/blog/BlogLabel";
import BlogPostMeta from "@/shared/components/blog/BlogPostMeta";
import Breadcrumbs from "@/shared/components/ui/Breadcrumbs";
import { ButtonLink } from "@/shared/components/ui/Button";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <article className="w-full space-y-10">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <header className="space-y-4 border-b border-border pb-8">
        <BlogLabel>{categoryLabels[post.category]}</BlogLabel>
        <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">{post.title}</h1>
        <BlogPostMeta post={post} showAuthor tone="default" className="mb-2 sm:mb-4" />
        <p className="font-sans text-lg leading-relaxed text-ink-muted">{post.excerpt}</p>
      </header>

      <div className="blog-prose space-y-6">
        {paragraphs.map((para) => (
          <p key={para.slice(0, 24)} className="font-sans text-base leading-[1.75] text-ink">
            {para}
          </p>
        ))}
      </div>

      <footer className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <ButtonLink variant="secondary" href="/blog">
          All posts
        </ButtonLink>
        <Link href="/shop" className="font-sans text-sm text-ink hover:underline">
          Browse the shop →
        </Link>
      </footer>
    </article>
  );
}
