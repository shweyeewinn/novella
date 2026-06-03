import type { BookFormat } from "@/features/books/types";

export default function FormatBadge({ format }: { format: BookFormat }) {
  return (
    <span className="rounded-sm border border-border bg-paper px-2 py-0.5 font-sans text-xs font-medium uppercase tracking-wide text-ink-muted">
      {format === "digital" ? "Digital" : "Physical"}
    </span>
  );
}
