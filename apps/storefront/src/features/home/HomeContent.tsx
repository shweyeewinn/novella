import Link from "next/link";
import { categoryLabels, getFeaturedBooks } from "@/features/books/catalog";
import type { BookCategory } from "@/features/books/types";
import BookCard from "@/shared/components/books/BookCard";
import { ButtonLink } from "@/shared/components/ui/Button";
import { site } from "@/config/site";

const categoryCards: { category: BookCategory; blurb: string }[] = [
  { category: "fiction", blurb: "Stories that stay with you" },
  { category: "nonfiction", blurb: "Ideas worth underlining" },
  { category: "literary", blurb: "Language as craft" },
  { category: "nature", blurb: "Slow walks & open sky" },
];

export default function HomeContent() {
  const featured = getFeaturedBooks();

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <section className="max-w-2xl space-y-6">
        <p className="font-sans text-sm font-medium uppercase tracking-widest text-sage">
          {site.owner.name}
        </p>
        <h1 className="font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="font-sans text-lg leading-relaxed text-ink-muted">
          Discover physical and digital books in a calm, paper-toned shop built for
          readers who linger.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/shop">Browse the shop</ButtonLink>
          <ButtonLink variant="secondary" href="/shop?featured=1">
            View featured
          </ButtonLink>
        </div>
        <ul className="flex flex-wrap gap-6 pt-2 font-sans text-xs text-ink-muted">
          <li>Secure checkout</li>
          <li>Digital delivery</li>
          <li>Physical shipping</li>
        </ul>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl text-ink">Featured</h2>
          <Link href="/shop" className="font-sans text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {featured.map((book) => (
            <div key={book.id} className="w-44 shrink-0 snap-start sm:w-auto">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-2xl text-ink">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {categoryCards.map(({ category, blurb }) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="rounded-lg border border-border bg-paper-muted/60 px-6 py-8 transition-colors hover:border-accent/40 hover:bg-paper-muted"
            >
              <h3 className="font-serif text-xl text-ink">
                {categoryLabels[category]}
              </h3>
              <p className="mt-2 font-sans text-sm text-ink-muted">{blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-xl rounded-lg border border-border bg-paper-muted/40 px-8 py-10">
        <blockquote className="font-serif text-xl leading-relaxed text-ink">
          “A bookshop should feel like a room where time slows down—and every shelf
          has one title waiting just for you.”
        </blockquote>
        <p className="mt-4 font-sans text-sm text-sage">— {site.owner.name}, curator</p>
      </section>
    </div>
  );
}
