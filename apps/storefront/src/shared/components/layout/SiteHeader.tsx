import { Suspense } from "react";
import { mainNav } from "@/shared/config/nav";
import SiteSearch from "@/shared/components/search/SiteSearch";
import AccountNavLink from "./AccountNavLink";
import CartNavLink from "./CartNavLink";
import WishlistNavLink from "./WishlistNavLink";
import MainNavLink from "./MainNavLink";
import MobileNav from "./MobileNav";
import SiteLogo from "./SiteLogo";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        {/* Mobile & tablet: logo + icons, then full-width search */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <SiteLogo />
            <div className="flex shrink-0 items-center gap-3">
              <AccountNavLink />
              <WishlistNavLink />
              <CartNavLink />
              <MobileNav />
            </div>
          </div>
          <Suspense
            fallback={<div className="h-11 w-full rounded-md bg-paper-muted" aria-hidden />}
          >
            <SiteSearch compact mobile />
          </Suspense>
        </div>

        {/* Desktop: logo · space · menu · compact search · icons */}
        <div className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-5">
          <SiteLogo />

          <div className="min-w-8 flex-1" aria-hidden />

          <nav className="flex shrink-0 items-center gap-x-5 xl:gap-x-6" aria-label="Main">
            {mainNav.map((item) => (
              <MainNavLink
                key={item.href}
                href={item.href}
                label={item.label}
                className="text-base xl:text-lg"
              />
            ))}
          </nav>

          <div className="w-56 shrink-0 xl:w-64">
            <Suspense
              fallback={<div className="h-10 w-full rounded-md bg-paper-muted" aria-hidden />}
            >
              <SiteSearch compact />
            </Suspense>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <AccountNavLink />
            <WishlistNavLink />
            <CartNavLink />
          </div>
        </div>
      </div>
    </header>
  );
}
