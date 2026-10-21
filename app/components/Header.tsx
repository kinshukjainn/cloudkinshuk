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
  { href: "/git-tree", label: "Project Tree", short: "Tree" },
];

/* ── Cell — flat, one right divider, active = bright text ─ */
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
    "inline-flex items-center justify-center whitespace-nowrap",
    "px-3 sm:px-4",
    "text-xs font-semibold tracking-tight sm:text-sm",
    "border-r border-zinc-200 dark:border-zinc-800",
    "transition-colors duration-150",
    active
      ? "text-zinc-900 dark:text-white"
      : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-white/5",
    "focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
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

/* ── Group — one leading left border, no top/bottom ────── */
function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex border-l border-zinc-200 dark:border-zinc-800">
      {children}
    </div>
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
      <div className="mx-auto flex h-12 max-w-5xl items-stretch px-3 sm:h-14 sm:px-6">
        {/* Left — title pushed aside */}
        <div className="flex shrink-0">
          <Group>
            <Cell href="/" active={pathname === "/"} ariaLabel="Home">
              <span className="hidden sm:inline">Cloudkinshuk</span>
              <span className="sm:hidden">CK</span>
            </Cell>
          </Group>
        </div>

        {/* Center — routes */}
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 justify-center"
        >
          <div className="flex max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Group>
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
            </Group>
          </div>
        </nav>

        {/* Right — GitHub + theme */}
        <div className="flex shrink-0">
          <Group>
            <Cell
              href="https://github.com/kinshukjainn/cloudkinshuk"
              external
              ariaLabel="GitHub repository"
            >
              <span className="hidden md:inline">GitHub</span>
              <span className="md:hidden">GH</span>
            </Cell>
            <Cell onClick={toggleTheme} ariaLabel="Toggle theme">
              <span className="hidden md:inline">
                {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
              </span>
              <span className="md:hidden">
                {mounted ? (isDark ? "L" : "D") : "T"}
              </span>
            </Cell>
          </Group>
        </div>
      </div>
    </header>
  );
}
