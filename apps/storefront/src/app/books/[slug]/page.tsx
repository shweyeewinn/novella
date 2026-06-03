import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryLabels,
  formatPrice,
  getAllBooks,
  getBookBySlug,
} from "@/features/books/catalog";
import AddToCartPanel from "@/features/books/AddToCartPanel";
import BookCard from "@/shared/components/books/BookCard";
import BookCover from "@/shared/components/books/BookCover";
import StarRating from "@/shared/components/books/StarRating";
import Breadcrumbs from "@/shared/components/ui/Breadcrumbs";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Not found" };
  return {
    title: book.title,
    description: book.description.slice(0, 160),
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = getAllBooks()
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: categoryLabels[book.category], href: `/shop?category=${book.category}` },
          { label: book.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <BookCover book={book} size="lg" className="mx-auto lg:mx-0" />
        <div className="space-y-6">
          <header className="space-y-2">
            <h1 className="font-serif text-3xl text-ink sm:text-4xl">{book.title}</h1>
            <p className="font-sans text-lg text-sage">by {book.author}</p>
            <StarRating rating={book.rating} reviewCount={book.reviewCount} />
          </header>
          <AddToCartPanel book={book} />
        </div>
      </div>

      <section className="max-w-prose space-y-4">
        <h2 className="font-serif text-xl text-ink">About this book</h2>
        <p className="font-sans leading-relaxed text-ink-muted">{book.description}</p>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="mb-4 font-serif text-lg text-ink">Details</h2>
        <dl className="grid gap-2 font-sans text-sm sm:grid-cols-2">
          {book.isbn ? (
            <>
              <dt className="text-ink-muted">ISBN</dt>
              <dd className="text-ink">{book.isbn}</dd>
            </>
          ) : null}
          {book.publisher ? (
            <>
              <dt className="text-ink-muted">Publisher</dt>
              <dd className="text-ink">{book.publisher}</dd>
            </>
          ) : null}
          {book.publishedYear ? (
            <>
              <dt className="text-ink-muted">Published</dt>
              <dd className="text-ink">{book.publishedYear}</dd>
            </>
          ) : null}
          {book.pages ? (
            <>
              <dt className="text-ink-muted">Pages</dt>
              <dd className="text-ink">{book.pages}</dd>
            </>
          ) : null}
          <dt className="text-ink-muted">Format</dt>
          <dd className="capitalize text-ink">{book.format}</dd>
          <dt className="text-ink-muted">Price</dt>
          <dd className="text-ink">{formatPrice(book.priceCents)}</dd>
        </dl>
      </section>

      {related.length > 0 ? (
        <section className="space-y-6 border-t border-border pt-10">
          <h2 className="font-serif text-2xl text-ink">You may also like</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
