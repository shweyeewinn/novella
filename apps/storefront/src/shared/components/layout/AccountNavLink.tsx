"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import UserIcon from "@/shared/components/icons/UserIcon";
import { headerIconButtonClass } from "@/shared/components/layout/headerIconStyles";

const menuItemClass =
  "block cursor-pointer px-4 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-paper-muted hover:text-primary";

type SessionUser = { id: string; email: string; name: string };

export default function AccountNavLink() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { user: SessionUser | null }) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    window.location.href = "/";
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className={`${headerIconButtonClass} ${user ? "text-primary" : "text-ink hover:text-primary"}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={user ? `Account menu, signed in as ${user.name}` : "Account menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <UserIcon className="h-6 w-6" />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-[11rem] overflow-hidden rounded-md border border-border bg-paper py-1 shadow-[0_8px_24px_rgba(61,44,31,0.08)]"
        >
          {user ? (
            <>
              <p className="border-b border-border px-4 py-2.5 font-sans text-xs text-ink-muted">
                {user.name}
              </p>
              <Link
                href="/account"
                role="menuitem"
                className={menuItemClass}
                onClick={() => setOpen(false)}
              >
                My account
              </Link>
              <button
                type="button"
                role="menuitem"
                className={`${menuItemClass} w-full border-t border-border text-left`}
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                role="menuitem"
                className={menuItemClass}
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                role="menuitem"
                className={`${menuItemClass} border-t border-border`}
                onClick={() => setOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
