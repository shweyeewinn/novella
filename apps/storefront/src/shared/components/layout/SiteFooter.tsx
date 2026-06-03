import Link from "next/link";
import { site } from "@/config/site";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-paper-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <nav className="flex flex-wrap gap-6 font-sans text-sm text-ink-muted">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-sm text-ink">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-sm text-ink-muted">
            {site.owner.name} ·{" "}
            <a
              href={`mailto:${site.owner.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {site.owner.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
