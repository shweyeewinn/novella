import Image from "next/image";
import Link from "next/link";
import type { BrowseCategory, BrowseSubcategory } from "@/features/catalog/browseCategories";
import { getBookCountForCategoryHref } from "@/features/catalog/getCategoryBookCounts";

function SubcategoryTile({ sub }: { sub: BrowseSubcategory }) {
  const count = getBookCountForCategoryHref(sub.href);

  return (
    <li>
      <Link
        href={sub.href}
        className="group flex h-full min-h-[4.5rem] flex-col justify-between gap-2 rounded-xl border border-border bg-paper px-4 py-4 transition-[border-color,box-shadow,background-color] hover:border-primary/35 hover:bg-paper-muted/80 hover:shadow-[0_6px_20px_rgba(61,44,31,0.06)] sm:min-h-[5rem] sm:px-5"
      >
        <span className="font-serif text-base leading-snug text-ink transition-colors group-hover:text-primary sm:text-lg">
          {sub.title}
        </span>
        <span className="flex items-center justify-between gap-2 font-sans text-xs text-ink-muted sm:text-sm">
          {count > 0 ? (
            <span className="transition-colors group-hover:text-primary">
              {count} {count === 1 ? "book" : "books"}
            </span>
          ) : (
            <span>Browse shelf</span>
          )}
          <span
            className="text-primary opacity-70 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}

type CategorySectionProps = {
  category: BrowseCategory;
};

export default function CategorySection({ category }: CategorySectionProps) {
  const { title, href, imageSrc, hue, children } = category;
  const mainCount = getBookCountForCategoryHref(href);

  return (
    <section
      className="overflow-hidden rounded-2xl border border-border bg-paper-muted/30"
      aria-labelledby={`main-cat-${category.id}`}
    >
      <div
        className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
        style={{
          background: `linear-gradient(105deg, hsl(${hue} 32% 93%) 0%, hsl(${hue} 18% 96%) 42%, transparent 100%)`,
        }}
      >
        {imageSrc ? (
          <Link
            href={href}
            aria-label={`View all ${title}`}
            className="relative mx-auto h-28 w-24 shrink-0 sm:mx-0 sm:h-32 sm:w-28"
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="112px"
              className="object-contain transition-transform duration-300 hover:scale-[1.03]"
            />
          </Link>
        ) : null}

        <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
            <h2
              id={`main-cat-${category.id}`}
              className="font-serif text-2xl font-bold text-ink sm:text-3xl"
            >
              {title}
            </h2>
            <Link
              href={href}
              className="shrink-0 font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-hover hover:underline sm:text-base"
            >
              View all
              {mainCount > 0 ? ` (${mainCount})` : ""}
            </Link>
          </div>
          <p className="font-sans text-sm text-ink-muted">
            {children.length} {children.length === 1 ? "sub-category" : "sub-categories"}
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3 lg:gap-4">
        {children.map((sub) => (
          <SubcategoryTile key={sub.id} sub={sub} />
        ))}
      </ul>
    </section>
  );
}
