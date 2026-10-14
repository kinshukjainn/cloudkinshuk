"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Github, Sun, Moon } from "lucide-react";
import { useMounted } from "./hooks/useMounted";
import { LuFolderTree } from "react-icons/lu";
import { TbPencilCode } from "react-icons/tb";

/* ─────────────────────────────────────────────────────────────
   Simple Header — black & white, minimal, editorial.

   · Monochrome palette only. No accent color except focus ring.
   · Flat surfaces, subtle borders, no glow / no blur tricks.
   · One breakpoint: below md → single compact row (brand + icons).
     Nav links collapse into a scrollable inline row underneath.
   · Fully responsive: 320 px → ultra-wide.
   · Motion: 200 ms cubic-bezier(0.2,0,0,1).
   ───────────────────────────────────────────────────────────── */

/* ── Theme-transition contract ─────────────────────────────── */
const VT_ORIGIN_X = "--vt-x";
const VT_ORIGIN_Y = "--vt-y";

type ThemeName = "light" | "dark";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithVT = {
  startViewTransition?: (cb: () => void | Promise<void>) => ViewTransitionLike;
};

function getVTDocument(): DocumentWithVT {
  return document as unknown as DocumentWithVT;
}

function applyThemeToDom(theme: ThemeName) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function runThemeTransition(
  origin: { x: number; y: number },
  nextTheme: ThemeName,
  syncState: () => void,
) {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = getVTDocument();

  root.style.setProperty(VT_ORIGIN_X, `${origin.x}px`);
  root.style.setProperty(VT_ORIGIN_Y, `${origin.y}px`);

  if (reduced || typeof doc.startViewTransition !== "function") {
    applyThemeToDom(nextTheme);
    syncState();
    return;
  }

  doc.startViewTransition(() => {
    applyThemeToDom(nextTheme);
    syncState();
  });
}

/* ── Nav model ─────────────────────────────────────────────── */
type NavEntry = {
  href: string;
  label: string;
  Icon: React.ElementType;
};

const NAV_ENTRIES: NavEntry[] = [
  { href: "/blogs", label: "Blogs", Icon: TbPencilCode },
  { href: "/git-tree", label: "Project Tree", Icon: LuFolderTree },
];

/* ── Shared tokens ─────────────────────────────────────────── */
const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-zinc-900/50 dark:focus-visible:ring-zinc-100/50";

const TEXT = "text-zinc-900 dark:text-zinc-100";
const TEXT_SUBTLE = "text-zinc-500 dark:text-zinc-400";

/* Simple monochrome icon button */
const ICON_BTN =
  "grid h-9 w-9 place-items-center rounded-lg " +
  "text-zinc-600 dark:text-zinc-400 " +
  "transition-colors duration-200 " +
  "hover:bg-zinc-100 hover:text-zinc-900 " +
  "dark:hover:bg-zinc-800 dark:hover:text-zinc-100 " +
  EASE +
  " " +
  FOCUS;

/* ── Header ───────────────────────────────────────────────── */
const Header: React.FC = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  const isActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(href + "/");

  /* Scroll-elevation listener (rAF-throttled) */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Theme toggle */
  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const next: ThemeName = resolvedTheme === "dark" ? "light" : "dark";
      runThemeTransition(origin, next, () => setTheme(next));
    },
    [resolvedTheme, setTheme],
  );

  return (
    <header
      className={`
        sticky top-0 z-50
        border-b transition-colors duration-200 ${EASE}
        ${
          scrolled
            ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            : "border-transparent bg-white dark:bg-zinc-950"
        }
      `}
    >
      <div
        className="
          mx-auto flex h-14 max-w-5xl items-center justify-between gap-4
          px-4 sm:h-16 sm:px-6
        "
      >
        {/* ── Brand ─────────────────────────────────────── */}
        <Link
          href="/"
          aria-label="Cloudkinshuk — Home"
          className={`
            flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg
            -ml-2 px-2 py-1.5
            transition-colors duration-200 ${EASE}
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            ${FOCUS}
          `}
        >
          <span
            className="
              grid h-7 w-7 shrink-0 place-items-center rounded-md
              bg-zinc-900 text-white
              dark:bg-zinc-100 dark:text-zinc-900
            "
          >
            <Image
              src="/corelogo.png"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
              priority
            />
          </span>
          <span
            className={`
              truncate text-sm font-semibold tracking-tight
              ${TEXT}
            `}
          >
            Cloudkinshuk
          </span>
        </Link>

        {/* ── Nav ───────────────────────────────────────── */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 md:flex"
        >
          {NAV_ENTRIES.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`
                  inline-flex items-center gap-1.5 rounded-lg
                  px-3 py-2 text-sm font-medium tracking-tight
                  transition-colors duration-200 ${EASE}
                  ${FOCUS}
                  ${
                    active
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                      : `${TEXT_SUBTLE} hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100`
                  }
                `}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Right action cluster ──────────────────────── */}
        <div className="flex shrink-0 items-center gap-1">
          <a
            href="https://github.com/kinshukjainn/cloudkinshuk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className={ICON_BTN}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            className={ICON_BTN}
          >
            <span className="relative block h-4 w-4" aria-hidden="true">
              <Sun
                className={`
                  absolute inset-0 h-4 w-4 transition-all duration-200 ${EASE}
                  ${
                    isDark
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }
                `}
              />
              <Moon
                className={`
                  absolute inset-0 h-4 w-4 transition-all duration-200 ${EASE}
                  ${
                    isDark
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }
                `}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile nav row (below brand, only < md) ───── */}
      <nav
        aria-label="Primary mobile"
        className="
          border-t border-zinc-100 md:hidden
          dark:border-zinc-900
        "
      >
        <div
          className="
            mx-auto flex max-w-5xl items-center gap-1
            overflow-x-auto px-4 py-1.5
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {NAV_ENTRIES.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`
                  inline-flex shrink-0 items-center gap-1.5 rounded-md
                  px-2.5 py-1.5 text-xs font-medium tracking-tight
                  transition-colors duration-200 ${EASE}
                  ${FOCUS}
                  ${
                    active
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                      : `${TEXT_SUBTLE} hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100`
                  }
                `}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
