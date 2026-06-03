import type { Metadata } from "next";
import { EB_Garamond, Lora } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/shared/components/layout/SiteFooter";
import SiteHeader from "@/shared/components/layout/SiteHeader";
import ScrollToTop from "@/shared/components/layout/ScrollToTop";
import { SearchProvider } from "@/shared/providers/SearchProvider";
import { site } from "@/config/site";

/** Headings — classic literary serif */
const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

/** Body — readable contemporary serif */
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  authors: [{ name: site.owner.name, url: `mailto:${site.owner.email}` }],
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-paper text-ink">
        <SearchProvider>
          <SiteHeader />
          <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 pt-6 pb-20 sm:px-6 sm:pt-10 sm:pb-28 lg:pb-32">
            {children}
          </main>
          <SiteFooter />
          <ScrollToTop />
        </SearchProvider>
      </body>
    </html>
  );
}
