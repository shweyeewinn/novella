import Link from "next/link";
import { formatPrice } from "@/features/books/catalog";
import { site } from "@/config/site";

type BankTransferInstructionsProps = {
  orderId: string;
  totalCents: number | null;
  className?: string;
};

export default function BankTransferInstructions({
  orderId,
  totalCents,
  className = "",
}: BankTransferInstructionsProps) {
  const { payment, facebook } = site;

  return (
    <div
      className={`space-y-6 rounded-2xl border border-border bg-paper-muted/60 p-6 text-left sm:p-8 ${className}`.trim()}
    >
      <div className="space-y-2">
        <h2 className="font-serif text-xl text-ink sm:text-2xl">Pay by bank transfer</h2>
        <p className="font-sans text-sm leading-relaxed text-ink-muted">
          Transfer the order total to the account below. Your order stays{" "}
          <span className="font-medium text-ink">pending</span> until we verify payment.
        </p>
      </div>

      <dl className="space-y-3 rounded-xl border border-border bg-paper px-5 py-4 font-sans text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <dt className="text-ink-muted">Bank</dt>
          <dd className="font-medium text-ink">{payment.bankName}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <dt className="text-ink-muted">Account name</dt>
          <dd className="font-medium text-ink">{payment.accountName}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <dt className="text-ink-muted">Account number</dt>
          <dd className="font-mono text-base font-semibold tracking-wide text-ink">
            {payment.accountNumber}
          </dd>
        </div>
        {totalCents != null && !Number.isNaN(totalCents) ? (
          <div className="flex flex-col gap-1 border-t border-border pt-3 sm:flex-row sm:justify-between">
            <dt className="text-ink-muted">Amount to transfer</dt>
            <dd className="font-serif text-lg font-semibold tabular-nums text-primary">
              {formatPrice(totalCents)}
            </dd>
          </div>
        ) : null}
        <div className="flex flex-col gap-1 border-t border-border pt-3 sm:flex-row sm:justify-between">
          <dt className="text-ink-muted">Reference</dt>
          <dd className="font-mono font-medium text-ink">{orderId}</dd>
        </div>
      </dl>

      {payment.transferNote ? (
        <p className="font-sans text-xs text-ink-muted">{payment.transferNote}</p>
      ) : null}

      <div className="space-y-3 rounded-xl border border-primary/25 bg-paper px-5 py-4">
        <h3 className="font-serif text-lg text-ink">After you pay</h3>
        <ol className="list-decimal space-y-2 pl-5 font-sans text-sm leading-relaxed text-ink-muted">
          <li>Take a screenshot or photo of your transfer receipt.</li>
          <li>
            Send it to us on{" "}
            <span className="font-medium text-ink">Messenger</span> ({facebook.pageName}{" "}
            Facebook Page) and include your order number{" "}
            <span className="font-mono text-ink">{orderId}</span>.
          </li>
          <li>
            We will confirm your payment, complete the order, and follow up about shipping.
          </li>
        </ol>
        <Link
          href={facebook.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-hover hover:underline"
        >
          Open {facebook.pageName} on Messenger →
        </Link>
      </div>
    </div>
  );
}
