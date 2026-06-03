import type { ReactNode } from "react";
import { ButtonLink } from "./Button";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: { href: string; label: string };
  children?: ReactNode;
};

export default function EmptyState({ title, description, action, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-border bg-paper-muted/40 px-8 py-12">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <p className="max-w-md font-sans text-ink-muted">{description}</p>
      {children}
      {action ? <ButtonLink href={action.href}>{action.label}</ButtonLink> : null}
    </div>
  );
}
