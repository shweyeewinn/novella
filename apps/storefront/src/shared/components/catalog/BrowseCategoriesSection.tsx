import type { BrowseCategory } from "@/features/catalog/browseCategories";
import { browseCategories as defaultCategories } from "@/features/catalog/browseCategories";
import CategoryBrowseCard from "@/shared/components/catalog/CategoryBrowseCard";
import SectionHeading from "@/shared/components/ui/SectionHeading";

type BrowseCategoriesSectionProps = {
  categories?: BrowseCategory[];
  showMoreButton?: boolean;
  moreHref?: string;
  moreLabel?: string;
};

export default function BrowseCategoriesSection({
  categories = defaultCategories,
  showMoreButton = true,
  moreHref = "/categories",
  moreLabel = "More categories",
}: BrowseCategoriesSectionProps) {
  return (
    <section className="space-y-8">
      {showMoreButton ? (
        <SectionHeading
          title="Browse by category"
          href={moreHref}
          linkLabel={moreLabel}
        />
      ) : (
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Browse by category</h2>
      )}

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6 lg:gap-8">
        {categories.map((category) => (
          <CategoryBrowseCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
