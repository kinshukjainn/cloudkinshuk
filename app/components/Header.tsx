"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FileText, Github, Menu, X, Sun, Moon } from "lucide-react";
import { PiGithubLogoBold } from "react-icons/pi";
import { GiCoffeeMug } from "react-icons/gi";
import { useMounted } from "./hooks/useMounted";

/* ── Types ──────────────────────────────────────────────── */
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** icon container — idle (round) */
  tint: string;
  /** tile background — selected */
  soft: string;
  /** icon container — selected (squircle) */
  solid: string;
}

/* ── Material 3 Expressive · Pixel UI tokens ────────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "border border-[#C4C7C5] dark:border-[#3C4043] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.10),0_8px_24px_-14px_rgba(0,0,0,0.45)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.65),0_8px_24px_-14px_rgba(0,0,0,0.95)]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#0B57D0] dark:focus-visible:ring-[#A8C7FA] " +
  "focus-visible:ring-offset-0";

const STATE = "hover:bg-[#0B57D0]/[0.08] dark:hover:bg-[#A8C7FA]/[0.14]";

/* ── Mobile tile ────────────────────────────────────────── */
interface MobileTileProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  tint: string;
  soft: string;
  solid: string;
  active?: boolean;
  external?: boolean;
  isOpen: boolean;
  onSelect: () => void;
}

const MobileTile: React.FC<MobileTileProps> = ({
  href,
  label,
  icon,
  tint,
  soft,
  solid,
  active = false,
  external = false,
  isOpen,
  onSelect,
}) => {
  const className = `
    group flex items-center gap-2.5 rounded-full p-1.5 pr-3
    transition-all duration-300 ${EASE}
    active:scale-[0.96] active:rounded-[20px]
    ${FOCUS}
    ${
      active
        ? soft
        : "bg-[#F0F4F9] hover:bg-[#E4E9F0] dark:bg-[#282A2C] dark:hover:bg-[#303134]"
    }
  `;

  const content = (
    <>
      {/* Shape morph: circle → squircle when selected */}
      <span
        className={`
          grid h-9 w-9 shrink-0 place-items-center
          transition-all duration-300 ${SPRING}
          ${active ? `rounded-[10px] ${solid}` : `rounded-full ${tint}`}
        `}
      >
        {icon}
      </span>
      <span className="truncate text-[13px] font-semibold leading-none text-[#1F1F1F] dark:text-[#E3E3E3]">
        {label}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isOpen ? 0 : -1}
        onClick={onSelect}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      tabIndex={isOpen ? 0 : -1}
      onClick={onSelect}
      className={className}
    >
      {content}
    </Link>
  );
};

/* ── Header ─────────────────────────────────────────────── */
const Header: React.FC = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLElement>(null);
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: "/blogs",
        label: "Blogs",
        icon: <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />,
        tint: "bg-[#D3E3FD] text-[#0B57D0] dark:bg-[#0B57D0]/25 dark:text-[#A8C7FA]",
        soft: "bg-[#D3E3FD] ring-1 ring-inset ring-[#0B57D0]/25 dark:bg-[#0B57D0]/25 dark:ring-[#A8C7FA]/35",
        solid: "bg-[#0B57D0] text-white dark:bg-[#A8C7FA] dark:text-[#041E49]",
      },
      {
        href: "/git-track",
        label: "Commits",
        icon: (
          <PiGithubLogoBold className="h-4 w-4 shrink-0" aria-hidden="true" />
        ),
        tint: "bg-[#C8F0D4] text-[#146C2E] dark:bg-[#146C2E]/35 dark:text-[#6DD58C]",
        soft: "bg-[#C8F0D4] ring-1 ring-inset ring-[#146C2E]/25 dark:bg-[#146C2E]/35 dark:ring-[#6DD58C]/35",
        solid: "bg-[#146C2E] text-white dark:bg-[#6DD58C] dark:text-[#072711]",
      },
    ],
    [],
  );

  const actionTiles: NavItem[] = useMemo(
    () => [
      {
        href: "https://brewrepo.cloudkinshuk.in",
        label: "Sponsor",
        icon: <GiCoffeeMug className="h-4 w-4 shrink-0" aria-hidden="true" />,
        tint: "bg-[#FFE8B8] text-[#7A4E00] dark:bg-[#F9AB00]/20 dark:text-[#FDD663]",
        soft: "bg-[#FFE8B8] ring-1 ring-inset ring-[#F9AB00]/30 dark:bg-[#F9AB00]/20 dark:ring-[#FDD663]/35",
        solid:
          "bg-[#F9AB00] text-[#2A1800] dark:bg-[#FDD663] dark:text-[#2A1800]",
      },
      {
        href: "https://github.com/kinshukjainn/cloudkinshuk",
        label: "GitHub",
        icon: <Github className="h-4 w-4 shrink-0" aria-hidden="true" />,
        tint: "bg-[#EADDFF] text-[#6750A4] dark:bg-[#D0BCFF]/20 dark:text-[#D0BCFF]",
        soft: "bg-[#EADDFF] ring-1 ring-inset ring-[#6750A4]/30 dark:bg-[#D0BCFF]/20 dark:ring-[#D0BCFF]/35",
        solid: "bg-[#6750A4] text-white dark:bg-[#D0BCFF] dark:text-[#21005D]",
      },
    ],
    [],
  );

  const isActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(href + "/");

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen]);

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /* Auto-close drawer when crossing to desktop breakpoint */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handle = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header ref={menuRef} className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
          <div className="relative flex items-center justify-between gap-2">
            {/* ── Brand chip ─────────────────────────────────── */}
            <Link
              href="/"
              aria-label="Cloudkinshuk — Home"
              className={`
                group flex min-w-0 items-center gap-2.5 rounded-full
                py-2 pl-2 pr-4 ${SURFACE}
                transition-all duration-300 ${EASE}
                hover:shadow-[0_1px_3px_rgba(0,0,0,0.14),0_14px_32px_-14px_rgba(11,87,208,0.55)]
                dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.7),0_14px_32px_-14px_rgba(168,199,250,0.35)]
                active:scale-[0.97] active:rounded-[22px]
                lg:max-w-[230px] ${FOCUS}
              `}
            >
              <span
                className="
                  relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden
                  rounded-full bg-[#D3E3FD]
                  ring-1 ring-inset ring-[#0B57D0]/20
                  dark:bg-[#0842A0] dark:ring-[#A8C7FA]/25
                "
              >
                <Image
                  src="/corelogo.png"
                  alt=""
                  width={20}
                  height={20}
                  className={`
                    h-5 w-5 object-contain transition-transform duration-500
                    ${SPRING}
                    group-hover:rotate-[10deg] group-hover:scale-110
                  `}
                />
              </span>
              <span className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#1F1F1F] dark:text-[#E3E3E3]">
                Cloudkinshuk
              </span>
            </Link>

            {/* ── Desktop nav (absolutely centred) ───────────── */}
            <nav
              aria-label="Primary"
              className={`
                absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2
                items-center gap-1 rounded-full p-1.5 lg:flex ${SURFACE}
              `}
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      group relative flex items-center gap-2 rounded-full
                      py-1.5 pl-1.5 pr-4 text-sm font-semibold
                      transition-all duration-300 ${EASE}
                      active:scale-[0.95] active:rounded-[20px] ${FOCUS}
                      ${
                        active
                          ? item.soft
                          : `text-[#444746] dark:text-[#C4C7C5] ${STATE} hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]`
                      }
                    `}
                  >
                    <span
                      className={`
                        grid h-6 w-6 shrink-0 place-items-center
                        transition-all duration-300 ${SPRING}
                        ${
                          active
                            ? `rounded-[7px] ${item.solid}`
                            : `rounded-full ${active ? "" : "bg-transparent"}`
                        }
                      `}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={
                        active ? "text-[#1F1F1F] dark:text-[#E3E3E3]" : ""
                      }
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right action cluster ───────────────────────── */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Sponsor — filled primary */}
              <a
                href="https://brewrepo.cloudkinshuk.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  hidden items-center gap-2 rounded-full lg:inline-flex
                  bg-[#0B57D0] px-4 py-2.5 text-sm font-semibold text-white
                  shadow-[0_1px_3px_rgba(0,0,0,0.16),0_8px_20px_-10px_rgba(11,87,208,0.9)]
                  transition-all duration-300 ${EASE}
                  hover:brightness-110
                  hover:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_12px_28px_-10px_rgba(11,87,208,1)]
                  active:scale-[0.95] active:rounded-[18px]
                  dark:bg-[#A8C7FA] dark:text-[#041E49]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_20px_-10px_rgba(168,199,250,0.75)]
                  dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.7),0_12px_28px_-10px_rgba(168,199,250,0.95)]
                  ${FOCUS}
                `}
              >
                <GiCoffeeMug className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Sponsor</span>
              </a>

              {/* Icon cluster */}
              <div
                className={`flex items-center gap-0.5 rounded-full p-1.5 ${SURFACE}`}
              >
                {/* GitHub — hidden on tiny screens */}
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className={`
                    hidden h-9 w-9 place-items-center rounded-full sm:grid
                    text-[#444746] dark:text-[#C4C7C5] ${STATE}
                    hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                    transition-all duration-300 ${EASE}
                    active:scale-90 active:rounded-[10px] ${FOCUS}
                  `}
                >
                  <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>

                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    isDark ? "Switch to light theme" : "Switch to dark theme"
                  }
                  className={`
                    grid h-9 w-9 place-items-center rounded-full
                    text-[#444746] dark:text-[#C4C7C5] ${STATE}
                    hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                    transition-all duration-300 ${EASE}
                    active:scale-90 active:rounded-[10px] ${FOCUS}
                  `}
                >
                  {mounted ? (
                    <span className="relative grid h-[18px] w-[18px] place-items-center">
                      <Sun
                        aria-hidden="true"
                        className={`
                          absolute h-[18px] w-[18px] transition-all duration-500 ${SPRING}
                          ${
                            isDark
                              ? "rotate-0 scale-100 opacity-100"
                              : "-rotate-90 scale-0 opacity-0"
                          }
                        `}
                      />
                      <Moon
                        aria-hidden="true"
                        className={`
                          absolute h-[18px] w-[18px] transition-all duration-500 ${SPRING}
                          ${
                            isDark
                              ? "rotate-90 scale-0 opacity-0"
                              : "rotate-0 scale-100 opacity-100"
                          }
                        `}
                      />
                    </span>
                  ) : (
                    <span className="h-[18px] w-[18px]" aria-hidden="true" />
                  )}
                </button>

                {/* Mobile menu toggle — only below lg */}
                <button
                  type="button"
                  onClick={() => setIsOpen((p) => !p)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  className={`
                    grid h-9 w-9 place-items-center rounded-full lg:hidden
                    text-[#444746] dark:text-[#C4C7C5] ${STATE}
                    hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                    transition-all duration-300 ${EASE}
                    active:scale-90 active:rounded-[10px] ${FOCUS}
                  `}
                >
                  <span className="relative grid h-5 w-5 place-items-center">
                    <Menu
                      aria-hidden="true"
                      className={`
                        absolute h-5 w-5 transition-all duration-300 ${EASE}
                        ${
                          isOpen
                            ? "rotate-90 scale-50 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                        }
                      `}
                    />
                    <X
                      aria-hidden="true"
                      className={`
                        absolute h-5 w-5 transition-all duration-300 ${EASE}
                        ${
                          isOpen
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-50 opacity-0"
                        }
                      `}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer — compact tile grid ───────────── */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`
            absolute inset-x-3 top-full mt-2 origin-top overflow-hidden
            rounded-[28px] p-2.5 sm:inset-x-5 lg:hidden ${SURFACE}
            transition-all duration-300 ${EASE}
            ${
              isOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible pointer-events-none -translate-y-3 scale-[0.96] opacity-0"
            }
          `}
        >
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <MobileTile
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                tint={item.tint}
                soft={item.soft}
                solid={item.solid}
                active={isActive(item.href)}
                isOpen={isOpen}
                onSelect={() => setIsOpen(false)}
              />
            ))}

            {actionTiles.map((item) => (
              <MobileTile
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                tint={item.tint}
                soft={item.soft}
                solid={item.solid}
                external
                isOpen={isOpen}
                onSelect={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── Spacer so content clears the fixed header ───── */}
      <div className="h-20 sm:h-24" aria-hidden="true" />
    </>
  );
};

export default Header;
