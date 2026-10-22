"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useMounted } from "./hooks/useMounted";

/* ── Theme transition ──────────────────────────────────── */
type ThemeName = "light" | "dark";

type VTDocument = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function transitionTheme(
  origin: { x: number; y: number },
  next: ThemeName,
  commit: () => void,
) {
  const doc = document as VTDocument;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || typeof doc.startViewTransition !== "function") {
    applyTheme(next);
    commit();
    return;
  }

  const root = document.documentElement;
  root.style.setProperty("--vt-x", `${origin.x}px`);
  root.style.setProperty("--vt-y", `${origin.y}px`);

  doc.startViewTransition(() => {
    applyTheme(next);
    commit();
  });
}

/* ── Nav model ─────────────────────────────────────────── */
type NavEntry = { href: string; label: string; short: string };

const NAV: NavEntry[] = [
  { href: "/blogs", label: "Blogs", short: "Blogs" },
  { href: "/blogs-fd", label: "Feedbacks", short: "Feedbacks" },
];

/* ── Shared ────────────────────────────────────────────── */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 dark:focus-visible:ring-blue-400/40";

/* ── Cell — rounded, bordered, VSCode-docs-style ───────── */
type CellProps = {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
};

function Cell({
  children,
  active = false,
  href,
  external = false,
  onClick,
  ariaLabel,
}: CellProps) {
  const cls = [
    "inline-flex h-8 items-center justify-center whitespace-nowrap",
    "rounded-md border px-2.5",
    "text-[12px] font-bold tracking-[0.06em]",
    "transition-colors duration-150",
    FOCUS,
    active
      ? "border-blue-800 text-zinc-900 dark:border-blue-400 dark:text-white"
      : "border-zinc-200 text-zinc-600 hover:border-blue-800 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-blue-400 dark:hover:bg-white/5 dark:hover:text-white",
  ].join(" ");

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cls}
        aria-label={ariaLabel}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

/* ── Header ────────────────────────────────────────────── */
export default function Header() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const toggleTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      const next: ThemeName = resolvedTheme === "dark" ? "light" : "dark";
      transitionTheme(origin, next, () => setTheme(next));
    },
    [resolvedTheme, setTheme],
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-11 max-w-5xl items-center gap-1.5 px-3 sm:h-12 sm:px-6">
        {/* Brand */}
        <Cell href="/" active={pathname === "/"} ariaLabel="Home">
          <span className="hidden sm:inline">Cloudkinshuk</span>
          <span className="sm:hidden">CK</span>
        </Cell>

        {/* Nav — centered */}
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 justify-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-1.5">
            {NAV.map(({ href, label, short }) => (
              <Cell
                key={href}
                href={href}
                active={isActive(href)}
                ariaLabel={label}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{short}</span>
              </Cell>
            ))}
          </div>
        </nav>

        {/* Theme toggle */}
        <Cell onClick={toggleTheme} ariaLabel="Toggle theme">
          {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
        </Cell>
      </div>
    </header>
  );
}
