import Link from "next/link";
import { site } from "@/config/site";
import { footerSections } from "@/shared/config/nav";
import SiteLogo from "@/shared/components/layout/SiteLogo";
import { ButtonLink } from "@/shared/components/ui/Button";

const footerLinkClass =
  "cursor-pointer font-sans text-sm text-paper/80 transition-colors hover:text-primary";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto overflow-hidden">
      <div
        className="h-1 bg-gradient-to-r from-primary via-gold to-primary"
        aria-hidden
      />

      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-md space-y-4">
              <SiteLogo className="text-paper hover:text-primary" />
              <p className="font-sans text-base leading-relaxed text-paper/85 sm:text-lg">
                {site.tagline}
              </p>
              <p className="font-sans text-sm leading-relaxed text-paper/65">
                Printed books, calm browsing, and checkout that ships to your door.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="/shop">Browse the shop</ButtonLink>
                <ButtonLink
                  href="/blog"
                  variant="secondary"
                  className="border-paper/25 bg-transparent text-paper hover:border-primary/50 hover:bg-paper/10 hover:text-paper"
                >
                  Read the journal
                </ButtonLink>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-14">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                    {section.title}
                  </h2>
                  <ul className="space-y-2.5">
                    {section.links.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={footerLinkClass}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 font-sans text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-paper/70">
              © {year}{" "}
              <span className="font-serif font-semibold text-paper">{site.name}</span>
              {" · "}
              {site.owner.name}
            </p>
            <a
              href={`mailto:${site.owner.email}`}
              className="break-all text-paper/80 underline-offset-4 transition-colors hover:text-primary hover:underline sm:break-normal"
            >
              {site.owner.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
