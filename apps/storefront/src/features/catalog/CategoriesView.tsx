import { browseCategories } from "@/features/catalog/browseCategories";
import CategorySection from "@/shared/components/catalog/CategorySection";

export default function CategoriesView() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Categories</h1>
        <p className="max-w-2xl font-sans text-ink-muted">
          Each topic opens into smaller shelves—pick a sub-category or view everything in that
          section.
        </p>
      </header>

      <div className="flex flex-col gap-8 sm:gap-10">
        {browseCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
