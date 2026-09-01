"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FileText, Github, Menu, X, Sun, Moon } from "lucide-react";
import { PiGithubLogoBold } from "react-icons/pi";
import { GiCoffeeMug } from "react-icons/gi";

const Header = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const navItems = useMemo(
    () => [
      {
        href: "/blogs",
        label: "Blogs",
        icon: <FileText className="w-4 h-4 shrink-0" />,
      },
      {
        href: "/git-track",
        label: "Commits",
        icon: <PiGithubLogoBold className="w-4 h-4 shrink-0" />,
      },
    ],
    [],
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Close menu on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        ref={menuRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo Section ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0 min-w-0">
              <Image
                src="/corelogo.png"
                alt="Cloudkinshuk logo"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
              />
              <span className="font-bold tracking-tight text-black dark:text-white text-lg sm:text-xl truncate">
                Cloudkinshuk
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 text-sm font-medium transition-colors
                    ${
                      isActive(item.href)
                        ? "text-black dark:text-white"
                        : "text-neutral-500 hover:text-black dark:hover:text-white"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* ── Right Action Cluster ── */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Sponsor Button */}
              <a
                href="https://brewrepo.cloudkinshuk.in"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity"
              >
                <GiCoffeeMug className="w-4 h-4" />
                <span>Sponsor</span>
              </a>

              <div className="hidden md:flex items-center gap-4 border-l border-neutral-200 dark:border-neutral-800 pl-4">
                {/* GitHub Icon */}
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  aria-label="GitHub"
                  className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="text-neutral-500 hover:text-black cursor-pointer  dark:hover:text-white transition-colors focus:outline-none"
                  aria-label="Toggle theme"
                >
                  {mounted ? (
                    resolvedTheme === "dark" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )
                  ) : (
                    <div className="w-5 h-5 opacity-0" />
                  )}
                </button>
              </div>

              {/* Mobile Controls */}
              <div className="flex md:hidden items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="text-neutral-500 hover:text-black cursor-pointer dark:hover:text-white transition-colors focus:outline-none"
                  aria-label="Toggle theme"
                >
                  {mounted ? (
                    resolvedTheme === "dark" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )
                  ) : (
                    <div className="w-5 h-5 opacity-0" />
                  )}
                </button>

                <button
                  className="text-neutral-500 hover:text-black cursor-pointer dark:hover:text-white transition-colors focus:outline-none"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          id="mobile-menu"
          className={`md:hidden grid transition-all duration-300 ease-in-out bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 ${
            isOpen
              ? "grid-rows-[1fr] border-opacity-100"
              : "grid-rows-[0fr] border-opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 py-6 space-y-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 text-lg font-medium transition-colors
                      ${
                        isActive(item.href)
                          ? "text-black dark:text-white"
                          : "text-neutral-500 hover:text-black dark:hover:text-white"
                      }
                    `}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
                <a
                  href="https://brewrepo.cloudkinshuk.in"
                  className="flex items-center justify-center gap-2 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium text-base hover:opacity-80 transition-opacity"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <GiCoffeeMug className="w-5 h-5 shrink-0" />
                  Sponsor
                </a>
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  className="flex items-center justify-center gap-2 py-3 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white font-medium text-base hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <Github className="w-5 h-5 shrink-0" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Spacer ── */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Header;
