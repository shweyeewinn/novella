import type { Metadata } from "next";
import ContactForm from "@/features/contact/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-prose space-y-6">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Contact</h1>
      <p className="font-sans text-ink-muted">
        Questions about orders, digital downloads, or bulk orders? Reach out to{" "}
        {site.owner.name}.
      </p>
      <ContactForm />
    </div>
  );
}
