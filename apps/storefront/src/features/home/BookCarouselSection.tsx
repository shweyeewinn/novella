"use client";

import { useRef } from "react";
import type { Book } from "@/features/books/types";
import BookCard from "@/shared/components/books/BookCard";
import SectionHeading from "@/shared/components/ui/SectionHeading";
import ChevronLeftIcon from "@/shared/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/shared/components/icons/ChevronRightIcon";

const scrollBtnClass =
  "absolute top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-paper text-ink shadow-sm transition-colors hover:border-primary/40 hover:bg-paper-muted hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40";

const slideClass =
  "w-[calc((100%-3*1rem)/4)] min-w-[13rem] shrink-0 snap-start max-lg:w-[calc((100%-1rem)/2)] max-lg:min-w-[11.5rem] max-sm:w-full max-sm:min-w-full max-sm:snap-center";

type BookCarouselSectionProps = {
  sectionId: string;
  title: string;
  books: Book[];
  readMoreHref: string;
};

export default function BookCarouselSection({
  sectionId,
  title,
  books,
  readMoreHref,
}: BookCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(`[data-slide]`);
    if (!slide) return;
    const gap = 16;
    const slideWidth = slide.offsetWidth;
    const slidesPerStep =
      typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches
        ? 1
        : window.matchMedia("(max-width: 1023px)").matches
          ? 2
          : 4;
    el.scrollBy({
      left: direction * (slideWidth + gap) * slidesPerStep,
      behavior: "smooth",
    });
  };

  if (books.length === 0) return null;

  return (
    <section className="space-y-6" aria-labelledby={`section-${sectionId}`}>
      <SectionHeading id={`section-${sectionId}`} title={title} href={readMoreHref} />

      <div className="relative px-1 sm:px-12">
        <button
          type="button"
          className={`${scrollBtnClass} left-0 max-sm:left-1`}
          aria-label={`Previous books in ${title}`}
          onClick={() => scroll(-1)}
        >
          <ChevronLeftIcon />
        </button>

        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory max-sm:gap-0 [&::-webkit-scrollbar]:hidden"
        >
          {books.map((book, index) => (
            <div
              key={`${sectionId}-${book.id}-${index}`}
              data-slide
              className={`${slideClass} flex`}
            >
              <BookCard book={book} hideCoverText className="w-full" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${scrollBtnClass} right-0 max-sm:right-1`}
          aria-label={`Next books in ${title}`}
          onClick={() => scroll(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
}
