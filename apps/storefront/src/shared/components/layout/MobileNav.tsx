"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav } from "@/shared/config/nav";
import MainNavLink from "./MainNavLink";
import SiteLogo from "./SiteLogo";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="cursor-pointer rounded-md border border-border px-3 py-2 font-sans text-sm text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu backdrop"
            className="fixed inset-0 z-40 cursor-pointer bg-ink/10"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed right-0 top-0 z-50 flex h-full w-[min(16rem,85vw)] flex-col gap-1 overflow-y-auto border-l border-border bg-paper p-6 shadow-lg">
            <div className="mb-4">
              <SiteLogo onNavigate={() => setOpen(false)} />
            </div>
            {mainNav.map((item) => (
              <MainNavLink
                key={item.href}
                href={item.href}
                label={item.label}
                className="rounded-md px-3 py-2 hover:bg-paper-muted"
                onNavigate={() => setOpen(false)}
              />
            ))}
            <Link
              href="/login"
              className="cursor-pointer rounded-md px-3 py-2 font-sans text-sm font-medium text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="cursor-pointer rounded-md px-3 py-2 font-sans text-sm font-medium text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink"
              onClick={() => setOpen(false)}
            >
              Sign up
            </Link>
          </nav>
        </>
      ) : null}
    </div>
  );
}
