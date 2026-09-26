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
  /** icon container — idle (round, blends into background) */
  tint: string;
  /** tile background — selected */
  soft: string;
  /** icon container — selected (squircle, on top of selected tile) */
  solid: string;
}

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
    group flex items-center gap-2.5 rounded-full p-3 pr-3
    transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
    active:scale-[0.96] active:rounded-[20px]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] focus-visible:ring-offset-0
    ${
      active
        ? `${soft} text-white dark:text-[#1F1F1F]`
        : "bg-[#F0F4F9] hover:bg-[#E4E9F0] text-[#1F1F1F] dark:bg-[#282A2C] dark:hover:bg-[#303134] dark:text-[#E3E3E3]"
    }
  `;

  const content = (
    <>
      {/* Shape morph: circle → squircle when selected */}
      <span
        className={`
          grid h-10 w-10 shrink-0 place-items-center
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${active ? `rounded-xl ${solid}` : `rounded-full ${tint}`}
        `}
      >
        {icon}
      </span>
      <span
        className={`
          truncate text-[15px] font-semibold leading-none
          ${
            active
              ? "text-white dark:text-[#1F1F1F]"
              : "text-[#1F1F1F] dark:text-[#E3E3E3]"
          }
        `}
      >
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
        icon: <FileText className="h-5 w-5 shrink-0" aria-hidden="true" />,
        tint: "bg-transparent text-[#1F1F1F] dark:text-[#E3E3E3]",
        soft: "bg-[#1F1F1F] dark:bg-[#E3E3E3]",
        solid: "bg-transparent text-white dark:text-[#1F1F1F]",
      },
      {
        href: "/git-track",
        label: "Commits",
        icon: (
          <PiGithubLogoBold className="h-5 w-5 shrink-0" aria-hidden="true" />
        ),
        tint: "bg-transparent text-[#1F1F1F] dark:text-[#E3E3E3]",
        soft: "bg-[#1F1F1F] dark:bg-[#E3E3E3]",
        solid: "bg-transparent text-white dark:text-[#1F1F1F]",
      },
    ],
    [],
  );

  const actionTiles: NavItem[] = useMemo(
    () => [
      {
        href: "https://brewrepo.cloudkinshuk.in",
        label: "Sponsor",
        icon: <GiCoffeeMug className="h-5 w-5 shrink-0" aria-hidden="true" />,
        tint: "bg-transparent text-[#1F1F1F] dark:text-[#E3E3E3]",
        soft: "bg-[#1F1F1F] dark:bg-[#E3E3E3]",
        solid: "bg-transparent text-white dark:text-[#1F1F1F]",
      },
      {
        href: "https://github.com/kinshukjainn/cloudkinshuk",
        label: "GitHub",
        icon: <Github className="h-5 w-5 shrink-0" aria-hidden="true" />,
        tint: "bg-transparent text-[#1F1F1F] dark:text-[#E3E3E3]",
        soft: "bg-[#1F1F1F] dark:bg-[#E3E3E3]",
        solid: "bg-transparent text-white dark:text-[#1F1F1F]",
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
              className="
                group flex min-w-0 items-center gap-2.5 rounded-full
                py-3 pl-2 pr-4
                bg-white dark:bg-[#1E1F20]

                shadow-[0_1px_3px_rgba(0,0,0,0.10),0_8px_24px_-14px_rgba(0,0,0,0.45)]
                dark:shadow-[0_1px_3px_rgba(0,0,0,0.65),0_8px_24px_-14px_rgba(0,0,0,0.95)]
                transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                hover:shadow-[0_1px_3px_rgba(0,0,0,0.14),0_14px_32px_-14px_rgba(0,0,0,0.55)]
                dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.7),0_14px_32px_-14px_rgba(255,255,255,0.35)]
                active:scale-[0.97] active:rounded-[22px]
                lg:max-w-[230px]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] focus-visible:ring-offset-0
              "
            >
              <span
                className="
                  relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden
                  rounded-full bg-[#F0F4F9] dark:bg-[#282A2C]
                "
              >
                <Image
                  src="/corelogo.png"
                  alt=""
                  width={20}
                  height={20}
                  className="
                    h-5 w-5 object-contain transition-transform duration-500
                    ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    group-hover:rotate-[10deg] group-hover:scale-110
                  "
                />
              </span>
              <span className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#1F1F1F] dark:text-[#E3E3E3]">
                Cloudkinshuk
              </span>
            </Link>

            {/* ── Desktop nav (absolutely centred) ───────────── */}
            <nav
              aria-label="Primary"
              className="
                absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2
                items-center gap-1 rounded-full p-1 lg:flex
                bg-white dark:bg-[#1E1F20]
                shadow-[0_1px_3px_rgba(0,0,0,0.10),0_8px_24px_-14px_rgba(0,0,0,0.45)]
                dark:shadow-[0_1px_3px_rgba(0,0,0,0.65),0_8px_24px_-14px_rgba(0,0,0,0.95)]
              "
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
                      py-1.5 px-4 text-sm font-semibold
                      transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                      active:scale-[0.95] active:rounded-[20px]
                      focus-visible:outline-none focus-visible:ring-offset-0
                      ${
                        active
                          ? `${item.soft} text-white dark:text-[#1F1F1F]`
                          : `text-[#1F1F1F] dark:text-[#E3E3E3] hover:bg-black/[0.06] dark:hover:bg-white/[0.10]`
                      }
                    `}
                  >
                    <span
                      className={`
                        grid h-10 w-10 shrink-0 place-items-center
                        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        ${
                          active
                            ? `rounded-xl ${item.solid}`
                            : `rounded-full ${item.tint}`
                        }
                      `}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={active ? "text-white dark:text-[#1F1F1F]" : ""}
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
                className="
                  hidden items-center gap-2 rounded-full lg:inline-flex
                  bg-[#1F1F1F] px-4 py-2.5 text-sm font-semibold text-white
                  shadow-[0_1px_3px_rgba(0,0,0,0.16),0_8px_20px_-10px_rgba(0,0,0,0.9)]
                  transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                  hover:brightness-125
                  hover:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_12px_28px_-10px_rgba(0,0,0,1)]
                  active:scale-[0.95] active:rounded-[18px]
                  dark:bg-[#E3E3E3] dark:text-[#1F1F1F]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_20px_-10px_rgba(255,255,255,0.55)]
                  dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.7),0_12px_28px_-10px_rgba(255,255,255,0.75)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] focus-visible:ring-offset-0
                "
              >
                <GiCoffeeMug className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Sponsor</span>
              </a>

              {/* Icon cluster */}
              <div
                className="
                  flex items-center gap-0.5 rounded-full py-1.5 px-3
                  bg-white dark:bg-[#1E1F20]

                  shadow-[0_1px_3px_rgba(0,0,0,0.10),0_8px_24px_-14px_rgba(0,0,0,0.45)]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.65),0_8px_24px_-14px_rgba(0,0,0,0.95)]
                "
              >
                {/* GitHub — hidden on tiny screens */}
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="
                    hidden h-12 w-12 place-items-center rounded-full sm:grid
                    text-[#1F1F1F] dark:text-[#E3E3E3]
                    hover:bg-black/[0.06] dark:hover:bg-white/[0.10]
                    transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                    active:scale-90 active:rounded-[10px]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] focus-visible:ring-offset-0
                  "
                >
                  <Github className="h-[23px] w-[23px]" aria-hidden="true" />
                </a>

                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    isDark ? "Switch to light theme" : "Switch to dark theme"
                  }
                  className="
                    grid h-12 w-12 place-items-center rounded-full
                    text-[#1F1F1F] dark:text-[#E3E3E3]
                    hover:bg-black/[0.06] dark:hover:bg-white/[0.10]
                    transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                    active:scale-90 active:rounded-[10px]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] focus-visible:ring-offset-0
                  "
                >
                  {mounted ? (
                    <span className="relative grid h-[18px] w-[18px] place-items-center">
                      <Sun
                        aria-hidden="true"
                        className={`
                          absolute h-[23px] w-[23px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
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
                          absolute h-[23px] w-[23px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
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
                  className="
                    grid h-9 w-9 place-items-center rounded-full lg:hidden
                    text-[#1F1F1F] dark:text-[#E3E3E3]
                    hover:bg-black/[0.06] dark:hover:bg-white/[0.10]
                    transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                    active:scale-90 active:rounded-[10px]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] focus-visible:ring-offset-0
                  "
                >
                  <span className="relative grid h-5 w-5 place-items-center">
                    <Menu
                      aria-hidden="true"
                      className={`
                        absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
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
                        absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
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
            rounded-[38px] p-2.5 sm:inset-x-5 lg:hidden
            bg-white dark:bg-[#1E1F20]

            shadow-[0_1px_3px_rgba(0,0,0,0.10),0_8px_24px_-14px_rgba(0,0,0,0.45)]
            dark:shadow-[0_1px_3px_rgba(0,0,0,0.65),0_8px_24px_-14px_rgba(0,0,0,0.95)]
            transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
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
