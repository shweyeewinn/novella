"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const baseClass =
  "whitespace-nowrap font-sans text-sm font-medium transition-colors cursor-pointer";

type MainNavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export default function MainNavLink({ href, label, className = "", onNavigate }: MainNavLinkProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`${baseClass} ${
        active ? "font-semibold text-primary" : "text-ink-muted hover:text-primary"
      } ${className}`}
    >
      {label}
    </Link>
  );
}
