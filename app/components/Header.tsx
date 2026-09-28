"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FileText, Github, Sun, Moon } from "lucide-react";
import { PiGithubLogoBold } from "react-icons/pi";
import { GiCoffeeMug } from "react-icons/gi";
import { useMounted } from "./hooks/useMounted";
import "./header.css";
import "./ThemeTransions.css";

/* ── Ripple helper ────────────────────────────────────────── */
function spawnRipple(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const size = Math.max(rect.width, rect.height) * 2.2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.className = "ck-ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), {
    once: true,
  });
}

/* ── Material You circular reveal ───────────────────────────
   next-themes applies its class inside a useEffect that fires
   AFTER startViewTransition would capture the "new" snapshot.
   So we write the class synchronously on <html> inside the
   callback, then call setTheme() to keep state in sync. */

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithVT = {
  startViewTransition?: (cb: () => void | Promise<void>) => ViewTransitionLike;
};

function getVTDocument(): DocumentWithVT {
  // Cast through `unknown` — the native `Document.startViewTransition`
  // signature differs across TS lib versions, so we sidestep the
  // structural check entirely.
  return document as unknown as DocumentWithVT;
}

function applyThemeToDom(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

function runThemeTransition(
  origin: { x: number; y: number },
  nextTheme: "light" | "dark",
  syncState: () => void,
) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = getVTDocument();

  if (reduced || typeof doc.startViewTransition !== "function") {
    applyThemeToDom(nextTheme);
    syncState();
    return;
  }

  const endRadius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );

  const transition = doc.startViewTransition(() => {
    applyThemeToDom(nextTheme);
    syncState();
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${endRadius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: 640,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      /* A newer transition superseded this one — safe to ignore. */
    });
}

/* ── Primary navigation model ─────────────────────────────────
   One source of truth for both the desktop pill nav and the
   mobile bottom dock. `short` is the dock label so the pill
   stays compact on narrow screens. */
type NavEntry = {
  href: string;
  label: string;
  short: string;
  Icon: React.ElementType;
};

const NAV_ENTRIES: NavEntry[] = [
  { href: "/blogs", label: "Blogs", short: "Blogs", Icon: FileText },
  {
    href: "/git-track",
    label: "Commits",
    short: "Commits",
    Icon: PiGithubLogoBold,
  },
  {
    href: "/git-tree",
    label: "Project Tree",
    short: "Tree",
    Icon: PiGithubLogoBold,
  },
];

/* ── Header ───────────────────────────────────────────────── */
const Header: React.FC = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState<boolean>(false);
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

  /* Theme toggle — Material You circular reveal from the button center. */
  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const next: "light" | "dark" =
        resolvedTheme === "dark" ? "light" : "dark";

      runThemeTransition(origin, next, () => setTheme(next));
    },
    [resolvedTheme, setTheme],
  );

  return (
    <>
      <header className={`ck-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="ck-header__inner">
          <div className="ck-header__row">
            {/* ── Brand chip ─────────────────────────────────── */}
            <Link
              href="/"
              aria-label="Cloudkinshuk — Home"
              onPointerDown={spawnRipple}
              className="ck-brand"
            >
              <span className="ck-brand__mark">
                <Image
                  src="/corelogo.png"
                  alt=""
                  width={20}
                  height={20}
                  className="ck-brand__logo"
                  priority
                />
              </span>
              <span className="ck-brand__name">Cloudkinshuk</span>
            </Link>

            {/* ── Desktop nav ────────────────────────────────── */}
            <nav aria-label="Primary" className="ck-nav">
              {NAV_ENTRIES.map(({ href, label, Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onPointerDown={spawnRipple}
                    className={`ck-nav__item${active ? " is-active" : ""}`}
                  >
                    <span className="ck-nav__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="ck-nav__label">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right action cluster ───────────────────────── */}
            <div className="ck-actions">
              {/* Sponsor — full CTA on desktop */}
              <a
                href="https://brewrepo.cloudkinshuk.in"
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={spawnRipple}
                className="ck-cta"
              >
                <GiCoffeeMug aria-hidden="true" />
                <span>Sponsor</span>
              </a>

              {/* Icon cluster — the only actions on small screens */}
              <div className="ck-cluster">
                {/* Sponsor — icon form, mirrors the desktop CTA */}
                <a
                  href="https://brewrepo.cloudkinshuk.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sponsor this project"
                  onPointerDown={spawnRipple}
                  className="ck-iconbtn ck-iconbtn--sponsor"
                >
                  <GiCoffeeMug aria-hidden="true" />
                </a>

                {/* GitHub — always available */}
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  onPointerDown={spawnRipple}
                  className="ck-iconbtn ck-iconbtn--github"
                >
                  <Github aria-hidden="true" />
                </a>

                {/* Theme toggle — origin of the circular reveal */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  onPointerDown={spawnRipple}
                  aria-label={
                    isDark ? "Switch to light theme" : "Switch to dark theme"
                  }
                  className="ck-iconbtn"
                >
                  {mounted ? (
                    <span className="ck-iconbtn__stack">
                      <Sun
                        aria-hidden="true"
                        className={isDark ? "is-shown" : "is-hidden--reverse"}
                      />
                      <Moon
                        aria-hidden="true"
                        className={isDark ? "is-hidden" : "is-shown"}
                      />
                    </span>
                  ) : (
                    <span className="ck-iconbtn__stack" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile bottom dock (replaces the old drawer) ───── */}
        <nav aria-label="Mobile" className="ck-dock">
          {NAV_ENTRIES.map(({ href, short, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onPointerDown={spawnRipple}
                className={`ck-dock__item${active ? " is-active" : ""}`}
              >
                <span className="ck-dock__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="ck-dock__label">{short}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="ck-spacer" aria-hidden="true" />
    </>
  );
};

export default Header;
