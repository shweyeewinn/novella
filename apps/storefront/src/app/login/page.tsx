import type { Metadata } from "next";
import LoginForm from "@/features/auth/LoginForm";
import { ButtonLink } from "@/shared/components/ui/Button";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Log in</h1>
        <p className="font-sans text-sm text-ink-muted">
          View orders, track status, and manage your delivery address.
        </p>
      </div>
      <LoginForm />
      <ButtonLink variant="ghost" href="/shop">
        Continue browsing
      </ButtonLink>
    </div>
  );
}
