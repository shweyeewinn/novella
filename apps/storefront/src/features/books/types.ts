export type BookFormat = "physical" | "digital";

export type BookCategory =
  | "fiction"
  | "nonfiction"
  | "nature"
  | "literary";

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
};

export type CartLineInput = {
  id: string;
  quantity: number;
};
