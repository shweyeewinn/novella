export type BookFormat = "physical" | "digital";

export type BookCategory = "fiction" | "nonfiction" | "nature" | "literary";

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  priceCents: number;
  format: BookFormat;
  category: BookCategory;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  inventoryCount?: number;
  pages?: number;
  isbn?: string;
  publisher?: string;
  publishedYear?: number;
  coverHue: number;
  /** Jacket image under /public, e.g. /covers/pre-order/slug.png */
  coverImageSrc?: string;
  /** Home/shop collection slug, e.g. pre-order */
  collections?: string[];
  /** Pre-order titles can be ordered before stock arrives */
  preOrder?: boolean;
};

export type CartLineInput = {
  id: string;
  quantity: number;
};
