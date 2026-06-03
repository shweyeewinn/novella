import type { Metadata } from "next";
import { ButtonLink } from "@/shared/components/ui/Button";

export const metadata: Metadata = {
  title: "Checkout cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="font-serif text-3xl text-ink">Checkout cancelled</h1>
      <p className="font-sans text-ink-muted">
        Your cart is still saved. You can return when you are ready.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/cart">Return to cart</ButtonLink>
        <ButtonLink variant="secondary" href="/shop">
          Continue shopping
        </ButtonLink>
      </div>
    </div>
  );
}
