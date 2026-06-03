import type { Metadata } from "next";
import AuthorsPageContent from "@/features/catalog/AuthorsPageContent";
import { getAuthorsPageData } from "@/features/catalog/getAuthorsPageData";

export const metadata: Metadata = {
  title: "Authors",
};

export const revalidate = 60;

export default async function AuthorsPage() {
  const data = await getAuthorsPageData();
  return <AuthorsPageContent data={data} />;
}
