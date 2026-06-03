import type { Metadata } from "next";
import { ButtonLink } from "@/shared/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-prose space-y-6">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">About {site.name}</h1>
      <p className="font-sans leading-relaxed text-ink-muted">
        {site.name} is a curated bookshop for readers who care about how a page feels, how a cover
        rests in the hand, and how a story lingers after the last line.
      </p>
      <p className="font-sans leading-relaxed text-ink-muted">
        Founded by {site.owner.name}, the shop brings together physical editions and digital
        releases—always with calm design, honest descriptions, and secure checkout.
      </p>
      <p className="font-sans leading-relaxed text-ink-muted">
        Whether you are stocking a nightstand or downloading an EPUB for a long flight, every title
        here is chosen with the same care you would expect at a trusted independent bookstore.
      </p>
      <ButtonLink href="/shop">Browse the shop</ButtonLink>
    </article>
  );
}
