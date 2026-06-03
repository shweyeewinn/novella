import type { Metadata } from "next";
import { formatPrice } from "@/features/books/catalog";
import { ButtonLink } from "@/shared/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Order confirmed",
};

type SearchParams = Promise<{ order?: string; total?: string; email?: string }>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const orderId = params.order ?? "NOV-PENDING";
  const totalCents = params.total ? Number(params.total) : null;
  const email = params.email ?? site.owner.email;

  return (
    <div className="mx-auto max-w-lg space-y-8 text-center sm:text-left">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-2xl text-gold sm:mx-0"
        aria-hidden
      >
        ✓
      </div>
      <div className="space-y-3">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="font-sans text-ink-muted">
          Order <span className="font-medium text-ink">{orderId}</span>
          {totalCents != null && !Number.isNaN(totalCents) ? (
            <> · {formatPrice(totalCents)}</>
          ) : null}
        </p>
      </div>
      <div className="space-y-4 rounded-lg border border-border bg-paper-muted/50 p-6 font-sans text-sm text-ink-muted text-left">
        <p>
          <strong className="text-ink">Digital orders:</strong> Check{" "}
          <span className="text-ink">{email}</span> for download links within a few
          minutes. Links expire in 24 hours.
        </p>
        <p>
          <strong className="text-ink">Physical orders:</strong> We are preparing your
          shipment. A confirmation email is on the way.
        </p>
        <p className="text-xs">
          Fulfillment is processed on the server when payment completes (Stripe webhook
          — coming soon). This demo page confirms checkout only.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/shop">Continue shopping</ButtonLink>
        <ButtonLink variant="secondary" href={`mailto:${site.owner.email}`}>
          Contact support
        </ButtonLink>
      </div>
    </div>
  );
}
