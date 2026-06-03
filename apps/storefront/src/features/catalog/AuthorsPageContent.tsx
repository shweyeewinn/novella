import Link from "next/link";
import {
  AUTHORS_SECTION_VISIBLE_COUNT,
  getAuthorsPageData,
  getAuthorsSectionMaxHeight,
  getTitleCount,
} from "./getAuthorsPageData";

type AuthorsPageContentProps = {
  data: ReturnType<typeof getAuthorsPageData>;
};

function AuthorList({ authors, sectionLabel }: { authors: string[]; sectionLabel: string }) {
  if (authors.length === 0) return null;

  const scrollable = authors.length > AUTHORS_SECTION_VISIBLE_COUNT;
  const maxHeight = getAuthorsSectionMaxHeight();

  return (
    <div
      className={
        scrollable
          ? "overflow-y-auto overscroll-y-contain rounded-lg border border-border bg-paper-muted [scrollbar-gutter:stable]"
          : "rounded-lg border border-border bg-paper-muted"
      }
      style={scrollable ? { maxHeight } : undefined}
      {...(scrollable
        ? {
            role: "region",
            tabIndex: 0,
            "aria-label": `${sectionLabel} — ${authors.length} authors, scroll for more`,
          }
        : {})}
    >
      <ul className="divide-y divide-border">
        {authors.map((author) => {
          const count = getTitleCount(author);
          return (
            <li key={author}>
              <Link
                href={`/shop?author=${encodeURIComponent(author)}`}
                className="group flex min-h-[3.5rem] items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-paper"
              >
                <span className="font-serif text-lg text-ink transition-colors group-hover:text-primary">
                  {author}
                </span>
                <span className="shrink-0 font-sans text-sm text-ink-muted transition-colors group-hover:text-primary">
                  {count} {count === 1 ? "book" : "books"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AuthorScriptSection({
  title,
  authors,
}: {
  title: string;
  authors: string[];
}) {
  if (authors.length === 0) return null;

  const scrollable = authors.length > AUTHORS_SECTION_VISIBLE_COUNT;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        {scrollable ? (
          <p className="font-sans text-sm text-ink-muted">
            Showing {authors.length} · scroll the list for more
          </p>
        ) : (
          <p className="font-sans text-sm text-ink-muted">
            {authors.length} {authors.length === 1 ? "author" : "authors"}
          </p>
        )}
      </div>
      <AuthorList authors={authors} sectionLabel={title} />
    </section>
  );
}

export default function AuthorsPageContent({ data }: AuthorsPageContentProps) {
  const { myanmarAuthors, englishAuthors, totalAuthors } = data;

  return (
    <div className="w-full space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Authors</h1>
        <p className="font-sans text-ink-muted">
          <span className="font-medium text-ink">{totalAuthors}</span>{" "}
          {totalAuthors === 1 ? "author" : "authors"} in the catalog
        </p>
      </header>

      <div className="space-y-10">
        <AuthorScriptSection
          title="မြန်မာ အက္ခရာ (က မှ အ)"
          authors={myanmarAuthors}
        />
        <AuthorScriptSection
          title="အင်္ဂလိပ် အက္ခရာ (A မှ Z)"
          authors={englishAuthors}
        />
      </div>
    </div>
  );
}
