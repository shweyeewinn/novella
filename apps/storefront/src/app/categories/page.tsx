import type { Metadata } from "next";
import CategoriesView from "@/features/catalog/CategoriesView";
import { getBrowseCategories } from "@/features/catalog/browseCategoriesServer";

export const metadata: Metadata = {
  title: "Categories",
};

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await getBrowseCategories();
  return <CategoriesView categories={categories} />;
}
