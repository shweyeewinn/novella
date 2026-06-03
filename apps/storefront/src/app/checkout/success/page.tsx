import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/features/books/catalog";
import { findOrderById } from "@/lib/orders/repository";
import PaymentProofUpload from "@/features/checkout/PaymentProofUpload";
import BankTransferInstructions from "@/shared/components/checkout/BankTransferInstructions";
import { ButtonLink } from "@/shared/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Order received",
};

type SearchParams = Promise<{ order?: string; total?: string; email?: string }>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const stored = params.order ? await findOrderById(params.order) : null;
  const orderId = stored?.id ?? params.order ?? "NOV-PENDING";
  const totalCents = stored?.totalCents ?? (params.total ? Number(params.total) : null);
  const email = stored?.email ?? params.email;
  const proofUploaded = Boolean(stored?.paymentProof);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="space-y-3 text-center sm:text-left">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-paper-muted text-2xl text-primary sm:mx-0"
          aria-hidden
        >
          ✓
        </div>
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Order received</h1>
        <p className="font-sans text-ink-muted">
          Thank you for ordering from {site.name}. Order{" "}
          <span className="font-medium text-ink">{orderId}</span>
          {totalCents != null && !Number.isNaN(totalCents) ? (
            <> · {formatPrice(totalCents)}</>
          ) : null}
        </p>
        {email ? (
          <p className="font-sans text-sm text-ink-muted">
            We will email <span className="font-medium text-ink">{email}</span> when we confirm your
            payment in our bank account.
          </p>
        ) : null}
        <p className="font-sans text-sm text-ink-muted">
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>{" "}
          or{" "}
          <Link href="/account" className="text-primary hover:underline">
            open My account
          </Link>{" "}
          to track this order.
        </p>
      </div>

      <BankTransferInstructions
        orderId={orderId}
        totalCents={totalCents}
        proofSection={<PaymentProofUpload orderId={orderId} alreadyUploaded={proofUploaded} />}
      />

      <ButtonLink variant="secondary" href="/shop">
        Continue shopping
      </ButtonLink>
    </div>
  );
}
