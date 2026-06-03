import type { ReactNode } from "react";

type BlogLabelProps = {
  children: ReactNode;
  /** Slightly larger kicker for the page masthead (e.g. The Novella Journal). */
  variant?: "default" | "hero" | "onDark";
  className?: string;
};

const variantClass: Record<NonNullable<BlogLabelProps["variant"]>, string> = {
  default: "font-sans text-sm font-semibold uppercase tracking-wide text-primary sm:text-base",
  hero: "font-sans text-base font-semibold uppercase tracking-wide text-primary sm:text-lg",
  onDark: "font-sans text-sm font-semibold uppercase tracking-wide text-gold sm:text-base",
};

export default function BlogLabel({
  children,
  variant = "default",
  className = "",
}: BlogLabelProps) {
  return <p className={`${variantClass[variant]} ${className}`.trim()}>{children}</p>;
}
