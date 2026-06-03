export type StrapiMedia = {
  url?: string;
  alternativeText?: string | null;
};

export type StrapiBook = {
  bookId: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  priceCents: number;
  format: "physical" | "digital";
  category: "fiction" | "nonfiction" | "nature" | "literary";
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  inventoryCount?: number;
  pages?: number | null;
  isbn?: string | null;
  publisher?: string | null;
  publishedYear?: number | null;
  coverHue?: number;
  coverImageSrc?: string;
  cover?: StrapiMedia | null;
  collections?: string[] | null;
  preOrder?: boolean;
};

export type StrapiBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: "reading" | "authors" | "publishing" | "community";
  author: string;
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
  coverHue?: number | null;
  cover?: StrapiMedia | null;
};

export type StrapiBrowseSubcategory = {
  childId: string;
  title: string;
  href: string;
};

export type StrapiBrowseCategory = {
  categoryId: string;
  title: string;
  href: string;
  imageSrc?: string;
  hue: number;
  sortOrder?: number;
  children?: StrapiBrowseSubcategory[];
};

export type StrapiSiteSetting = {
  siteName: string;
  tagline: string;
  ownerName: string;
  ownerEmail: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  transferNote?: string | null;
};
