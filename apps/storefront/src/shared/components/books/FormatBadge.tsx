import type { BookFormat } from "@/features/books/types";

export default function FormatBadge({ format }: { format: BookFormat }) {
  return (
    <span
      className={`rounded-sm px-2 py-0.5 font-sans text-xs font-medium uppercase tracking-wide ${
        format === "digital"
          ? "bg-sage/25 text-ink"
          : "bg-paper text-ink-muted ring-1 ring-border"
      }`}
    >
      {format === "digital" ? "Digital" : "Physical"}
    </span>
  );
}
