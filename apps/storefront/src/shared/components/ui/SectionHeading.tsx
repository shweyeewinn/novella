import type { ReactNode } from "react";
import SectionViewMoreLink from "@/shared/components/ui/SectionViewMoreLink";

type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  href: string;
  linkLabel?: string;
};

/** Section title with a text “View more” (or custom label) aligned on the right. */
export default function SectionHeading({
  id,
  title,
  href,
  linkLabel = "View more",
}: SectionHeadingProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 id={id} className="min-w-0 font-serif text-2xl text-ink sm:text-3xl">
        {title}
      </h2>
      <SectionViewMoreLink variant="inline" href={href} className="shrink-0">
        {linkLabel}
      </SectionViewMoreLink>
    </div>
  );
}
