import BlogLabel from "@/shared/components/blog/BlogLabel";

export default function BlogHero() {
  return (
    <header className="space-y-4 border-b border-border pb-8 sm:pb-10">
      <BlogLabel variant="hero">The Novella Journal</BlogLabel>
      <h1 className="font-serif text-4xl tracking-tight text-ink sm:text-5xl">Blog</h1>
      <p className="max-w-2xl font-sans text-base leading-relaxed text-ink-muted sm:text-lg">
        Essays for readers and collectors—the same calm, paper-toned care we bring to the shop.
      </p>
    </header>
  );
}
