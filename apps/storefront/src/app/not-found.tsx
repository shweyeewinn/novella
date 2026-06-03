import { ButtonLink } from "@/shared/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-6 py-12 text-center sm:text-left">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Page not found</h1>
      <p className="font-sans text-ink-muted">This shelf is empty.</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink variant="secondary" href="/shop">
          Browse shop
        </ButtonLink>
      </div>
    </div>
  );
}
