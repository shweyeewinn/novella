"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { Button } from "@/shared/components/ui/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="font-sans text-ink-muted">
        Thank you. For urgent order questions, email{" "}
        <a href={`mailto:${site.owner.email}`} className="text-accent hover:underline">
          {site.owner.email}
        </a>{" "}
        directly.
      </p>
    );
  }

  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label htmlFor="name" className="font-sans text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="font-sans text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-sans text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <Button type="submit">Send message</Button>
      <p className="font-sans text-xs text-ink-muted">
        Or email{" "}
        <a href={`mailto:${site.owner.email}`} className="text-accent hover:underline">
          {site.owner.email}
        </a>
        . We aim to reply within 2 business days.
      </p>
    </form>
  );
}
