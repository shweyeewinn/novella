import type { Metadata } from "next";
import AuthorsPageContent from "@/features/catalog/AuthorsPageContent";
import { getAuthorsPageData } from "@/features/catalog/getAuthorsPageData";

export const metadata: Metadata = {
  title: "Authors",
};

export default function AuthorsPage() {
  const data = getAuthorsPageData();
  return <AuthorsPageContent data={data} />;
}
