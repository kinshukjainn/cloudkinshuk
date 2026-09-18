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
}

/* ── Material 3 Expressive · Pixel UI design tokens ─────── */
const M3 = {
  surface:
    "bg-white/40 dark:bg-[#1E1F20]/40 backdrop-blur-xs backdrop-saturate-[100%] " +
    "border border-[#DDE3EA] dark:border-[#303134] " +
    "shadow-[0_1px_2px_rgba(11,87,208,0.06),0_10px_28px_-10px_rgba(11,87,208,0.18)] " +
    "dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_10px_28px_-10px_rgba(0,0,0,0.75)]",
  onSurface: "text-[#1F1F1F] dark:text-[#E3E3E3]",
  onSurfaceVariant: "text-[#444746] dark:text-[#C4C7C5]",
  primaryFill: "bg-[#0B57D0] text-white dark:bg-[#A8C7FA] dark:text-[#062E6F]",
  primaryContainer:
    "bg-[#D3E3FD] text-[#041E49] dark:bg-[#0842A0] dark:text-[#D3E3FD]",
  stateLayer: "hover:bg-[#0B57D0]/[0.08] dark:hover:bg-[#A8C7FA]/[0.14]",
  ease: "ease-[cubic-bezier(0.2,0,0,1)]",
  spring: "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
  focus:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B57D0] dark:focus-visible:ring-[#A8C7FA] focus-visible:ring-offset-0",
};

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
      },
      {
        href: "/git-track",
        label: "Commits",
        icon: (
          <PiGithubLogoBold className="h-4 w-4 shrink-0" aria-hidden="true" />
        ),
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
      <header
        ref={menuRef}
        className="fixed inset-x-0 top-0 z-50 bg-transparent"
      >
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
          <div className="relative flex items-center justify-between gap-2">
            {/* ── Brand chip ─────────────────────────────────── */}
            <Link
              href="/"
              aria-label="Cloudkinshuk — Home"
              className={`
                group flex min-w-0 items-center gap-2.5
                rounded-full py-1.5 pl-1.5 pr-4 ${M3.surface}
                transition-all duration-300 ${M3.ease}
                hover:shadow-[0_1px_2px_rgba(11,87,208,0.1),0_14px_34px_-12px_rgba(11,87,208,0.32)]
                dark:hover:shadow-[0_1px_2px_rgba(0,0,0,0.6),0_14px_34px_-12px_rgba(0,0,0,0.9)]
                active:scale-[0.97]
                lg:max-w-[220px]
                ${M3.focus}
              `}
            >
              <span className="relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#EAF1FB] ring-1 ring-inset ring-[#0B57D0]/10 dark:bg-[#131314] dark:ring-[#A8C7FA]/15">
                <Image
                  src="/corelogo.png"
                  alt=""
                  width={20}
                  height={20}
                  className={`h-5 w-5 object-contain transition-transform duration-500 ${M3.spring} group-hover:rotate-[10deg] group-hover:scale-110`}
                />
              </span>
              <span
                className={`truncate text-[15px] font-semibold tracking-[-0.01em] ${M3.onSurface}`}
              >
                Cloudkinshuk
              </span>
            </Link>

            {/* ── Desktop nav (absolutely centered) ──────────── */}
            <nav
              aria-label="Primary"
              className={`
                absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2
                items-center gap-1 rounded-full p-1.5 lg:flex
                ${M3.surface}
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
                      relative flex items-center gap-2 rounded-full px-4 py-2
                      text-sm font-medium transition-all duration-300 ${M3.ease}
                      active:scale-[0.95] active:rounded-xl ${M3.focus}
                      ${
                        active
                          ? `${M3.primaryContainer} shadow-[0_1px_3px_rgba(11,87,208,0.22)]`
                          : `${M3.onSurfaceVariant} ${M3.stateLayer} hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]`
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
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
                  hidden lg:inline-flex items-center gap-2 rounded-full px-4 py-2.5
                  text-sm font-semibold ${M3.primaryFill}
                  transition-all duration-300 ${M3.ease}
                  hover:shadow-[0_8px_24px_-6px_rgba(11,87,208,0.55)]
                  dark:hover:shadow-[0_8px_24px_-6px_rgba(168,199,250,0.45)]
                  hover:brightness-110 active:scale-[0.95] active:rounded-2xl
                  ${M3.focus}
                `}
              >
                <GiCoffeeMug className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Sponsor</span>
              </a>

              {/* Icon cluster */}
              <div
                className={`flex items-center gap-0.5 rounded-full p-1.5 ${M3.surface}`}
              >
                {/* GitHub — hidden on tiny screens */}
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className={`
                    hidden sm:grid h-9 w-9 place-items-center rounded-full
                    ${M3.onSurfaceVariant} ${M3.stateLayer}
                    hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                    transition-all duration-300 ${M3.ease}
                    active:scale-90 active:rounded-xl ${M3.focus}
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
                    ${M3.onSurfaceVariant} ${M3.stateLayer}
                    hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                    transition-all duration-300 ${M3.ease}
                    active:scale-90 active:rounded-xl ${M3.focus}
                  `}
                >
                  {mounted ? (
                    <span className="relative grid h-[18px] w-[18px] place-items-center">
                      <Sun
                        aria-hidden="true"
                        className={`
                          absolute h-[18px] w-[18px] transition-all duration-500 ${M3.spring}
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
                          absolute h-[18px] w-[18px] transition-all duration-500 ${M3.spring}
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
                    lg:hidden grid h-9 w-9 place-items-center rounded-full
                    ${M3.onSurfaceVariant} ${M3.stateLayer}
                    hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                    transition-all duration-300 ${M3.ease}
                    active:scale-90 active:rounded-xl ${M3.focus}
                  `}
                >
                  <span className="relative grid h-5 w-5 place-items-center">
                    <Menu
                      aria-hidden="true"
                      className={`
                        absolute h-5 w-5 transition-all duration-300 ${M3.ease}
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
                        absolute h-5 w-5 transition-all duration-300 ${M3.ease}
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

        {/* ── Mobile drawer — M3 large sheet ──────────────── */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`
            lg:hidden absolute inset-x-3 top-full mt-2 origin-top
            max-h-[80vh] overflow-y-auto overflow-x-hidden
            rounded-[48px] ${M3.surface}
            transition-all duration-300 ${M3.ease}
            ${
              isOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-3 scale-[0.96] opacity-0"
            }
          `}
        >
          <div className="space-y-5 p-4">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex items-center gap-3 rounded-full px-3 py-3
                      text-base font-semibold transition-all duration-300 ${M3.ease}
                      active:scale-[0.97] active:rounded-4xl ${M3.focus}
                      ${
                        active
                          ? M3.primaryContainer
                          : `${M3.onSurfaceVariant} ${M3.stateLayer}`
                      }
                    `}
                  >
                    <span
                      className={`
                        grid h-9 w-9 shrink-0 place-items-center rounded-full
                        transition-colors duration-300 ${M3.ease}
                        ${
                          active
                            ? "bg-white/70 dark:bg-black/25"
                            : "bg-[#0B57D0]/[0.09] dark:bg-[#A8C7FA]/[0.14]"
                        }
                      `}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div
              className="h-px w-full bg-[#0B57D0]/10 dark:bg-[#A8C7FA]/12"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-2.5">
              <a
                href="https://brewrepo.cloudkinshuk.in"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isOpen ? 0 : -1}
                className={`
                  flex items-center justify-center gap-2 rounded-full py-3.5
                  text-sm font-semibold ${M3.primaryFill}
                  transition-all duration-300 ${M3.ease}
                  active:scale-[0.97] active:rounded-2xl ${M3.focus}
                `}
              >
                <GiCoffeeMug className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Sponsor</span>
              </a>

              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isOpen ? 0 : -1}
                className={`
                  flex items-center justify-center gap-2 rounded-full py-3.5
                  text-sm font-semibold ${M3.primaryContainer}
                  transition-all duration-300 ${M3.ease}
                  active:scale-[0.97] active:rounded-2xl ${M3.focus}
                `}
              >
                <Github className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Spacer so content clears the fixed header ───── */}
      <div className="h-20 sm:h-24" aria-hidden="true" />
    </>
  );
};

export default Header;
