import { formatPostDate } from "@/features/blog/catalog";
import type { BlogPost } from "@/features/blog/types";

type BlogPostMetaProps = {
  post: BlogPost;
  showAuthor?: boolean;
  className?: string;
  /** Light text for featured panel on dark/gradient backgrounds */
  tone?: "default" | "muted" | "onDark";
};

const toneClass = {
  default: "text-ink-muted",
  muted: "text-ink-muted/80",
  onDark: "text-paper/75",
} as const;

export default function BlogPostMeta({
  post,
  showAuthor = false,
  className = "",
  tone = "muted",
}: BlogPostMetaProps) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm ${toneClass[tone]} ${className}`.trim()}
    >
      {showAuthor ? (
        <>
          <span className={tone === "onDark" ? "font-medium text-paper" : "font-medium text-ink"}>
            {post.author}
          </span>
          <span aria-hidden className="opacity-60">
            ·
          </span>
        </>
      ) : null}
      <span>{formatPostDate(post.publishedAt)}</span>
      <span aria-hidden className="opacity-60">
        ·
      </span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}
