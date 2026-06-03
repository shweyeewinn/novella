"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "novella-theme";

type Theme = "light" | "dark" | "system";

function resolveDark(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setTheme(stored);
      }
    } catch {
      /* private browsing */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle("dark", resolveDark(theme));
    };
    apply();
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  return (
    <>
      {children}
      <button
        type="button"
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 rounded-full border border-border bg-paper-muted px-3 py-2 text-xs font-medium text-ink-muted shadow-[5px_5px_15px_rgba(0,0,0,0.08)] hover:text-accent"
        onClick={() => {
          const next: Theme =
            theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
          setTheme(next);
          try {
            localStorage.setItem(STORAGE_KEY, next);
          } catch {
            /* ignore */
          }
        }}
      >
        {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Auto"}
      </button>
    </>
  );
}
