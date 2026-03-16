"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FileText,
  Zap,
  Lightbulb,
  SearchCode,
  Github,
  Server,
  Menu,
  X,
} from "lucide-react";
import { PiGithubLogoBold } from "react-icons/pi";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(
    () => [
      {
        href: "/home-blog",
        label: "Blogs",
        icon: <FileText className="w-4 h-4 shrink-0" />,
      },
      {
        href: "/setup",
        label: "System",
        icon: <Zap className="w-4 h-4 shrink-0" />,
      },
      {
        href: "/updates",
        label: "Workings",
        icon: <Lightbulb className="w-4 h-4 shrink-0" />,
      },
      {
        href: "/seo-insights",
        label: "Insights",
        icon: <SearchCode className="w-4 h-4 shrink-0" />,
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

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        ref={menuRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white text-[#333333] border-b border-[#cccccc] "
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* ── Main bar ── */}
          <div className="flex items-center justify-between h-14">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:underline shrink-0 min-w-0"
            >
              <div className="border border-[#cccccc] p-0.5 shrink-0 bg-[#eeeeee]">
                <Image
                  src="/corelogo.png"
                  alt="Cloudkinshuk logo"
                  width={20}
                  height={20}
                  className="sm:w-6 sm:h-6"
                />
              </div>
              <span className="font-bold text-[#006600] leading-none text-lg sm:text-xl">
                Cloudkinshuk.in
              </span>
            </Link>

            {/* ── Desktop nav (≥ md) ── */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-1.5 text-sm font-bold px-2 py-1 border
                    ${
                      isActive(item.href)
                        ? "bg-[#006600] text-white border-[#004400]"
                        : "bg-transparent text-[#333333] border-transparent hover:bg-[#eeeeee] hover:border-[#cccccc]"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* ── Right cluster ── */}
            <div className="flex items-center gap-3 shrink-0">
              {/* "Buy a Server" — visible ≥ md */}
              <a
                href="https://brewrepo.cloudkinshuk.in"
                className="hidden md:flex items-center gap-1.5 text-sm font-bold text-white px-3 py-1 bg-[#006600] border-b-2 border-[#004400] hover:bg-[#008800] active:border-b-0 active:mt-[2px] whitespace-nowrap"
              >
                <Server className="w-4 h-4 shrink-0" />
                <span>Buy a Server</span>
              </a>

              {/* GitHub icon — visible ≥ md */}
              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                aria-label="GitHub"
                className="hidden md:flex items-center text-[#333333] hover:text-[#006600] border border-transparent hover:border-[#cccccc] hover:bg-[#eeeeee] p-1"
              >
                <Github className="w-5 h-5" />
              </a>

              {/* Mobile menu toggle (< md) */}
              <button
                className="md:hidden flex items-center justify-center p-1 border border-[#cccccc] bg-[#eeeeee] text-[#333333] hover:bg-[#dddddd]"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer (< md) ── */}
        <div
          className={`
            md:hidden overflow-hidden bg-[#f9f9f9] border-t border-[#cccccc]
            ${isOpen ? "block" : "hidden"}
          `}
        >
          <div className="px-4 py-3 space-y-2">
            {/* Nav links */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 border text-sm font-bold
                  ${
                    isActive(item.href)
                      ? "bg-[#006600] text-white border-[#004400]"
                      : "bg-white text-[#333333] border-[#cccccc] hover:bg-[#eeeeee]"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Divider + action buttons */}
            <div className="pt-3 mt-3 border-t border-[#cccccc] flex flex-col gap-2">
              <a
                href="https://brewrepo.cloudkinshuk.in"
                className="flex items-center justify-center gap-2 py-2 bg-[#006600] text-white font-bold text-sm border-b-2 border-[#004400] active:border-b-0 active:mt-[2px]"
              >
                <Server className="w-4 h-4 shrink-0" />
                Buy a Server
              </a>
              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                className="flex items-center justify-center gap-2 py-2 bg-[#eeeeee] text-[#333333] font-bold text-sm border border-[#cccccc] hover:bg-[#dddddd]"
              >
                <Github className="w-4 h-4 shrink-0" />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Spacer — matches header height ── */}
      <div className="h-14" />

      {/* ── Mobile backdrop ── */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
