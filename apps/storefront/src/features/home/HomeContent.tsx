import BookCarouselSection from "@/features/home/BookCarouselSection";
import { homeBookSections } from "@/features/home/homeSections";
import type { Book } from "@/features/books/types";
import type { BrowseCategory } from "@/features/catalog/browseCategories";
import BrowseCategoriesSection from "@/shared/components/catalog/BrowseCategoriesSection";
import { ButtonLink } from "@/shared/components/ui/Button";

type HomeContentProps = {
  tagline: string;
  sectionBooks: Book[][];
  browseCategories: BrowseCategory[];
};

export default function HomeContent({ tagline, sectionBooks, browseCategories }: HomeContentProps) {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <section className="w-full space-y-6">
        <h1 className="font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {tagline}
        </h1>
        <p className="w-full font-sans text-base leading-relaxed text-ink-muted sm:text-lg">
          Printed books only—curated in a calm, paper-toned shop for readers who linger. Secure
          checkout and shipping straight to your door.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/shop">Browse the shop</ButtonLink>
          <ButtonLink variant="secondary" href="/shop?featured=1">
            View featured
          </ButtonLink>
        </div>
      </section>

      <div className="flex flex-col gap-16 sm:gap-20">
        {homeBookSections.map((section, index) => (
          <BookCarouselSection
            key={section.id}
            sectionId={section.id}
            title={section.title}
            readMoreHref={section.readMoreHref}
            books={sectionBooks[index] ?? []}
          />
        ))}
      </div>

      <BrowseCategoriesSection categories={browseCategories} />
    </div>
  );
}
