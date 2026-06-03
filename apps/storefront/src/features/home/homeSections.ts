import {
  getAllBooks,
  getBooksByCollection,
  getNewReleaseBooks,
  getPreOrderBooks,
} from "@/features/books/catalog";
import type { Book } from "@/features/books/types";

export type HomeBookSection = {
  id: string;
  title: string;
  readMoreHref: string;
};

export const homeBookSections: HomeBookSection[] = [
  { id: "pre-order", title: "Pre-Orders", readMoreHref: "/shop?collection=pre-order" },
  {
    id: "new-releases",
    title: "New Arrivals",
    readMoreHref: "/shop?collection=new-releases",
  },
  // Hidden for now — uncomment to restore home carousels:
  // Clearance Sales — Up to 50% off
  // {
  //   id: "clearance",
  //   title: "Clearance — Up to 50% Off",
  //   readMoreHref: "/shop?collection=clearance",
  // },
  // Highlight Books for Month
  // {
  //   id: "highlight-month",
  //   title: "This Month's Picks",
  //   readMoreHref: "/shop?collection=highlight",
  // },
  // Top Rate Books with stars
  // {
  //   id: "top-rated",
  //   title: "Highly Rated",
  //   readMoreHref: "/shop?sort=rating",
  // },
  // Editor's choices books
  // {
  //   id: "editors-choice",
  //   title: "Editor's Picks",
  //   readMoreHref: "/shop?collection=editors-choice",
  // },
  // Fiction books selection
  // { id: "fiction", title: "Fiction", readMoreHref: "/shop?category=fiction" },
  // Non-Fiction book selection
  // {
  //   id: "nonfiction",
  //   title: "Nonfiction",
  //   readMoreHref: "/shop?category=nonfiction",
  // },
  // Kids books
  // { id: "kids", title: "Children's Books", readMoreHref: "/shop?collection=kids" },
  // Recommend books for youths
  // { id: "youth", title: "Young Adult", readMoreHref: "/shop?collection=youth" },
  // Encouragement or motivation books
  // {
  //   id: "motivation",
  //   title: "Inspiration & Motivation",
  //   readMoreHref: "/shop?collection=motivation",
  // },
  // Translation books
  // {
  //   id: "translation",
  //   title: "In Translation",
  //   readMoreHref: "/shop?collection=translation",
  // },
  // Religious books
  // {
  //   id: "religious",
  //   title: "Faith & Spirituality",
  //   readMoreHref: "/shop?collection=religious",
  // },
  // Award winner's books
  // {
  //   id: "award-winners",
  //   title: "Award Winners",
  //   readMoreHref: "/shop?collection=awards",
  // },
  // Best seller book of this year
  // {
  //   id: "bestsellers",
  //   title: "Bestsellers of the Year",
  //   readMoreHref: "/shop?collection=bestsellers",
  // },
  // Books for women
  // {
  //   id: "women",
  //   title: "Women's Reading",
  //   readMoreHref: "/shop?collection=women",
  // },
];

const BOOKS_PER_SECTION = 20;

function booksForSection(sectionId: string): Book[] {
  if (sectionId === "pre-order") {
    return getPreOrderBooks();
  }

  if (sectionId === "new-releases") {
    return getNewReleaseBooks();
  }

  const collectionBooks = getBooksByCollection(sectionId);
  if (collectionBooks.length > 0) {
    return collectionBooks;
  }

  const pool = getAllBooks().filter((b) => !b.collections?.length);
  if (pool.length === 0) return [];
  const start = homeBookSections.findIndex((s) => s.id === sectionId) % pool.length;
  return Array.from({ length: BOOKS_PER_SECTION }, (_, i) => pool[(start + i) % pool.length]);
}

/** Section shelves — pre-order uses fixed catalog; others rotate demo titles until CMS. */
export function getBooksForHomeSection(sectionIndex: number): Book[] {
  const section = homeBookSections[sectionIndex];
  if (!section) return [];
  return booksForSection(section.id);
}
