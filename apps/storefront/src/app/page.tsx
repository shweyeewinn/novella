import HomeContent from "@/features/home/HomeContent";
import { homeBookSections } from "@/features/home/homeSections";
import { getBooksForHomeSection } from "@/features/home/homeSectionsServer";
import { getBrowseCategories } from "@/features/catalog/browseCategoriesServer";
import { getSiteConfig } from "@/lib/site/siteServer";

export const revalidate = 60;

export default async function HomePage() {
  const site = await getSiteConfig();
  const browseCategories = await getBrowseCategories();
  const sectionBooks = await Promise.all(
    homeBookSections.map((_, index) => getBooksForHomeSection(index))
  );

  return (
    <HomeContent
      tagline={site.tagline}
      sectionBooks={sectionBooks}
      browseCategories={browseCategories}
    />
  );
}
