import Image from "next/image";
import Link from "next/link";
import type { BrowseCategory } from "@/features/catalog/browseCategories";

function CategoryPlaceholder({ title, hue }: { title: string; hue: number }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 28% 92%) 0%, hsl(${hue} 22% 78%) 100%)`,
      }}
      aria-hidden
    >
      <span className="font-serif text-center text-sm leading-snug text-ink/25 sm:text-base">
        {title}
      </span>
    </div>
  );
}

export default function CategoryBrowseCard({ category }: { category: BrowseCategory }) {
  const { title, href, imageSrc, hue } = category;

  return (
    <Link
      href={href}
      className="group flex cursor-pointer flex-col gap-3"
    >
      <div className="relative aspect-[5/6] w-full sm:aspect-[3/4] md:aspect-square">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
            loading="lazy"
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <CategoryPlaceholder title={title} hue={hue} />
        )}
      </div>
      <h3 className="line-clamp-2 min-h-[2.75rem] text-center font-serif text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:min-h-[3.25rem] sm:text-lg">
        {title}
      </h3>
    </Link>
  );
}
