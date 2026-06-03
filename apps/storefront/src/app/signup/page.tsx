import type { Metadata } from "next";
import SignupForm from "@/features/auth/SignupForm";
import { ButtonLink } from "@/shared/components/ui/Button";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Create account</h1>
        <p className="font-sans text-sm text-ink-muted">
          Save your shipping details and see order history in one place.
        </p>
      </div>
      <SignupForm />
      <ButtonLink variant="ghost" href="/shop">
        Browse books
      </ButtonLink>
    </div>
  );
}
