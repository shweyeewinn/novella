import Link from "next/link";
import { site } from "@/config/site";

type SiteLogoProps = {
  className?: string;
  onNavigate?: () => void;
};

export default function SiteLogo({ className = "", onNavigate }: SiteLogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`shrink-0 cursor-pointer font-serif text-2xl font-bold tracking-tight text-ink transition-colors hover:text-primary sm:text-3xl lg:text-3xl xl:text-4xl ${className}`}
    >
      {site.name}
    </Link>
  );
}
