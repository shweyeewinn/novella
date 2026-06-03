import Link from "next/link";
import type { ComponentProps } from "react";

type SectionViewMoreLinkProps = ComponentProps<typeof Link> & {
  /** `inline` — text link beside section titles; `button` — solid shelf CTA below content. */
  variant?: "inline" | "button";
};

const variantClass = {
  inline:
    "font-sans text-base font-semibold text-primary transition-colors hover:text-primary-hover hover:underline sm:text-lg",
  button:
    "min-w-[10rem] justify-center rounded-2xl bg-primary px-8 py-3 text-center font-serif font-medium tracking-wide text-on-primary hover:bg-primary-hover",
} as const;

/** Section shelf link — inline text beside headings, or solid button when centered below content. */
export default function SectionViewMoreLink({
  className = "",
  children = "View more",
  variant = "button",
  ...props
}: SectionViewMoreLinkProps) {
  return (
    <Link
      className={`inline-flex cursor-pointer items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
