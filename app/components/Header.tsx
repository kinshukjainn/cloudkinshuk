"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Github, Sun, Moon } from "lucide-react";
import { useMounted } from "./hooks/useMounted";
import { LuFolderTree } from "react-icons/lu";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbPencilCode } from "react-icons/tb";

/* ─────────────────────────────────────────────────────────────
   Editorial Header · matches BlogFeed / DocPage exactly

   · Flat, high-contrast, bold uppercase type — no soft cards.
   · Section rules use border-b-2 in the ink colour.
   · One accent: blue-700 / blue-400 — active nav + focus rings.
   · Fully responsive: 320 px → ultra-wide.
   · Motion: 300 ms cubic-bezier(0.2,0,0,1).
   ───────────────────────────────────────────────────────────── */

/* ── Theme-transition contract (unchanged) ─────────────────── */
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
  short: string;
  Icon: React.ElementType;
};

const NAV_ENTRIES: NavEntry[] = [
  { href: "/blogs", label: "Blogs", short: "Blogs", Icon: TbPencilCode },
  {
    href: "/git-track",
    label: "Logs",
    short: "Logs",
    Icon: MdOutlineTipsAndUpdates,
  },
  {
    href: "/git-tree",
    label: "Project Tree",
    short: "Tree",
    Icon: LuFolderTree,
  },
];

/* ── Shared tokens (match BlogsFeed) ───────────────────────── */
const TEXT = "text-[#111] dark:text-[#eee]";
const TEXT_SUBTLE = "text-[#555] dark:text-[#aaa]";
const ACCENT = "text-blue-700 dark:text-blue-400";
const RULE_INK = "border-[#1f1f1f] dark:border-[#e3e3e3]";
const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-blue-700/60 dark:focus-visible:ring-blue-400/60";

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

  /* Reserve space for the fixed mobile dock so content isn't hidden. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      document.body.style.paddingBottom = mq.matches ? "5rem" : "";
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.body.style.paddingBottom = "";
    };
  }, []);

  /* Theme toggle — circular reveal anchored at the button's centre. */
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
    <>
      {/* ═══════════════ TOP BAR ═══════════════ */}
      <header
        className={`
          sticky top-0 z-50
          border-b-2 transition-[background-color,border-color] duration-300 ${EASE}
          ${
            scrolled
              ? "border-[#1f1f1f]/15 bg-[#FAFAFA]/80 backdrop-blur-md dark:border-[#e3e3e3]/15 dark:bg-[#0a0a0a]/80"
              : "border-transparent bg-transparent"
          }
        `}
      >
        <div
          className="
            mx-auto flex h-16 max-w-3xl items-center justify-between gap-2
            px-4 sm:gap-3 sm:px-6 md:h-18
          "
        >
          {/* ── Brand ─────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Cloudkinshuk — Home"
            className={`group flex min-w-0 shrink items-center gap-2 rounded-md ${FOCUS}`}
          >
            <span
              className="
                grid h-8 w-8 shrink-0 place-items-center rounded-md
                bg-[#1f1f1f] text-white
                dark:bg-[#e3e3e3] dark:text-[#111]
              "
            >
              <Image
                src="/corelogo.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
                priority
              />
            </span>
            <span
              className={`
                truncate text-xs font-extrabold uppercase tracking-wider
                sm:text-sm ${TEXT}
              `}
            >
              Cloudkinshuk
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────── */}
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
                    group relative inline-flex items-center gap-1.5
                    rounded-md px-2.5 py-2
                    text-xs font-bold uppercase tracking-wider
                    transition-colors duration-300 ${EASE} ${FOCUS}
                    ${
                      active
                        ? ACCENT
                        : `${TEXT_SUBTLE} hover:text-[#111] dark:hover:text-[#eee]`
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{label}</span>
                  {/* Editorial underline — matches BlogFeed's section rules */}
                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none absolute inset-x-2.5 bottom-0.5 h-0.5
                      origin-left rounded-full
                      bg-blue-700 dark:bg-blue-400
                      transition-transform duration-300 ${EASE}
                      ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right action cluster ──────────────────────── */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            {/* GitHub — always visible */}
            <a
              href="https://github.com/kinshukjainn/cloudkinshuk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className={`
                grid h-9 w-9 place-items-center rounded-md ${TEXT}
                transition-colors duration-300 ${EASE} ${FOCUS}
                hover:bg-black/[0.06] dark:hover:bg-white/[0.08]
              `}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Theme toggle — origin of the circular reveal */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              className={`
                grid h-9 w-9 place-items-center rounded-md ${TEXT}
                transition-colors duration-300 ${EASE} ${FOCUS}
                hover:bg-black/[0.06] dark:hover:bg-white/[0.08]
              `}
            >
              <span className="relative block h-4 w-4" aria-hidden="true">
                <Sun
                  className={`
                    absolute inset-0 h-4 w-4 transition-all duration-300 ${EASE}
                    ${
                      isDark
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-0 opacity-0"
                    }
                  `}
                />
                <Moon
                  className={`
                    absolute inset-0 h-4 w-4 transition-all duration-300 ${EASE}
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
      </header>

      {/* ═══════════════ MOBILE BOTTOM DOCK ═══════════════ */}
      <nav
        aria-label="Mobile"
        className={`
          fixed inset-x-0 bottom-0 z-40 md:hidden
           ${RULE_INK}
          bg-[#FAFAFA]/40 backdrop-blur-md
          dark:bg-[#0a0a0a]/40
        `}
      >
        <div
          className="
            mx-auto grid max-w-md grid-cols-3
            px-2 pt-1.5
            pb-[max(env(safe-area-inset-bottom),0.375rem)]
          "
        >
          {NAV_ENTRIES.map(({ href, short, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`
                  group flex flex-col items-center gap-0.5
                  rounded-md px-2 py-1.5
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  ${active ? ACCENT : TEXT_SUBTLE}
                `}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {short}
                </span>
                <span
                  aria-hidden="true"
                  className={`
                    mt-0.5 h-0.5 w-4 rounded-full
                    bg-blue-700 dark:bg-blue-400
                    transition-transform duration-300 ${EASE}
                    ${active ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
