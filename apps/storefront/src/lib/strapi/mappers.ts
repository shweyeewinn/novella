import type { Book } from "@/features/books/types";
import type { BlogPost } from "@/features/blog/types";
import type { BrowseCategory } from "@/features/catalog/browseCategories";
import { strapiMediaUrl } from "@/lib/strapi/client";
import type {
  StrapiBlogPost,
  StrapiBook,
  StrapiBrowseCategory,
  StrapiSiteSetting,
} from "@/lib/strapi/types";
import { site } from "@/config/site";

export function mapStrapiBook(entry: StrapiBook): Book {
  const coverFromMedia = strapiMediaUrl(entry.cover?.url);
  return {
    id: entry.bookId,
    slug: entry.slug,
    title: entry.title,
    author: entry.author,
    description: entry.description,
    priceCents: entry.priceCents,
    format: entry.format,
    category: entry.category,
    featured: entry.featured ?? false,
    rating: Number(entry.rating ?? 0),
    reviewCount: entry.reviewCount ?? 0,
    inventoryCount: entry.inventoryCount ?? 0,
    pages: entry.pages ?? undefined,
    isbn: entry.isbn ?? undefined,
    publisher: entry.publisher ?? undefined,
    publishedYear: entry.publishedYear ?? undefined,
    coverHue: entry.coverHue ?? 200,
    coverImageSrc: coverFromMedia ?? entry.coverImageSrc,
    collections: entry.collections ?? undefined,
    preOrder: entry.preOrder ?? false,
  };
}

export function mapStrapiBlogPost(entry: StrapiBlogPost): BlogPost {
  return {
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    body: entry.body,
    category: entry.category,
    author: entry.author,
    publishedAt: entry.publishedAt,
    readingMinutes: entry.readingMinutes,
    featured: entry.featured ?? false,
    coverHue: entry.coverHue ?? undefined,
  };
}

export function mapStrapiBrowseCategory(entry: StrapiBrowseCategory): BrowseCategory {
  return {
    id: entry.categoryId,
    title: entry.title,
    href: entry.href,
    imageSrc: entry.imageSrc,
    hue: entry.hue,
    children: (entry.children ?? []).map((child) => ({
      id: child.childId,
      title: child.title,
      href: child.href,
    })),
  };
}

export function mapStrapiSiteSetting(entry: StrapiSiteSetting) {
  return {
    name: entry.siteName,
    tagline: entry.tagline,
    owner: {
      name: entry.ownerName,
      email: entry.ownerEmail,
    },
    payment: {
      bankName: entry.bankName,
      accountName: entry.accountName,
      accountNumber: entry.accountNumber,
      transferNote: entry.transferNote ?? site.payment.transferNote,
    },
  };
}
