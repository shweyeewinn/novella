import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex cursor-pointer items-center justify-center rounded-md font-sans text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: `${base} bg-primary px-6 py-3 text-on-primary hover:bg-primary-hover active:bg-primary-hover`,
  secondary: `${base} border border-border bg-paper px-6 py-3 text-ink hover:border-primary/25 hover:bg-paper-muted`,
  ghost: `${base} px-3 py-2 text-ink-muted hover:text-ink`,
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button type="button" className={`${variants[variant]} ${className}`} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${variants[variant]} ${className}`} {...props} />;
}
