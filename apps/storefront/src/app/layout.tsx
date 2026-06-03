import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/shared/components/layout/SiteFooter";
import SiteHeader from "@/shared/components/layout/SiteHeader";
import ThemeProvider from "@/shared/providers/ThemeProvider";
import { site } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  authors: [{ name: site.owner.name, url: `mailto:${site.owner.email}` }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            var t = localStorage.getItem('novella-theme');
            var dark = t === 'dark' || ((!t || t === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (dark) document.documentElement.classList.add('dark');
          } catch (e) {}
        `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
