"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import CartNavLink from "./CartNavLink";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-md border border-border px-3 py-2 font-sans text-sm text-ink-muted"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu backdrop"
            className="fixed inset-0 z-40 bg-ink/20"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed right-0 top-0 z-50 flex h-full w-64 flex-col gap-1 border-l border-border bg-paper-muted p-6 shadow-lg">
            <p className="mb-4 font-serif text-xl text-ink">{site.name}</p>
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 font-sans text-sm font-medium text-ink-muted hover:bg-paper hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <CartNavLink />
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
