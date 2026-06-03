import Link from "next/link";
import { site } from "@/config/site";
import CartNavLink from "./CartNavLink";
import MobileNav from "./MobileNav";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight text-ink hover:text-accent"
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 font-sans text-sm font-medium text-ink-muted md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <CartNavLink />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <CartNavLink />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
