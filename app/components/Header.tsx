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
  Menu,
  X,
} from "lucide-react";
import { PiGithubLogoBold } from "react-icons/pi";
import { GiCoffeeMug } from "react-icons/gi";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Measure drawer content height for smooth animation
  useEffect(() => {
    if (!drawerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (drawerRef.current) {
        setDrawerHeight(drawerRef.current.scrollHeight);
      }
    });
    observer.observe(drawerRef.current);
    return () => observer.disconnect();
  }, [isOpen]); // Added isOpen to dependency array to recalculate if content shifts

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

  return (
    <>
      <header
        ref={menuRef}
        className="fixed top-0 left-0 right-0 z-50 bg-black text-white "
      >
        {/* Scaled padding: px-4 (phones) -> sm:px-6 (tablets) -> lg:px-8 (laptops) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center h-14 gap-2 md:gap-4 lg:gap-8">
            {/* ── Logo Section ── */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 min-w-0 max-w-[65%] sm:max-w-none"
            >
              <div className="rounded-full bg-white p-0.5 shrink-0 flex items-center justify-center">
                <Image
                  src="/corelogo.png"
                  alt="Cloudkinshuk logo"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              <span className="font-bold title-font text-white leading-none text-base sm:text-2xl lg:text-3xl truncate">
                Cloudkinshuk <span className="text-yellow-500">.in</span>
              </span>
            </Link>

            {/* ── Desktop Nav (Tablets & Up) ── */}
            {/* Hidden on phones, visible on md and up. Uses smaller gaps/text on tablets, scales up on lg screens */}
            <nav className="hidden md:flex items-center md:gap-1 lg:gap-2 flex-1 justify-center min-w-0 overflow-hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-1.5 md:px-2 lg:px-3 py-1.5 rounded-2xl whitespace-nowrap transition-colors
                    md:text-sm lg:text-base font-medium
                    ${
                      isActive(item.href)
                        ? "text-white bg-blue-800 "
                        : "text-gray-200 hover:text-white hover:bg-[#252525]"
                    }
                  `}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* ── Right Action Cluster ── */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
              {/* Sponsor Button: text hidden on smaller tablets to save space, visible on laptops (lg) */}
              <a
                href="https://brewrepo.cloudkinshuk.in"
                className="hidden md:flex items-center gap-1.5 font-bold text-black px-3 py-1.5 lg:px-4 bg-yellow-200 hover:bg-yellow-300 transition-colors rounded-full text-sm shrink-0"
              >
                <GiCoffeeMug className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                <span className="hidden lg:inline-block">Sponsor me</span>
              </a>

              {/* GitHub Icon: Hidden on mobile, visible on tablets/desktops */}
              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                aria-label="GitHub"
                className="hidden md:flex items-center text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-[#252525]"
              >
                <Github className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>

              {/* Mobile Menu Toggle (Visible below md) */}
              <button
                className="md:hidden cursor-pointer flex items-center rounded-full justify-center p-2 bg-[#eeeeee] text-[#333333] hover:bg-[#dddddd] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
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

        {/* ── Mobile Drawer (< md) ── */}
        <div
          id="mobile-menu"
          className="md:hidden overflow-hidden bg-black transition-[max-height] duration-300 ease-in-out absolute w-full top-14 left-0 z-40 shadow-2xl"
          style={{ maxHeight: isOpen ? `${drawerHeight}px` : "0px" }}
          aria-hidden={!isOpen}
        >
          {/* Added max-h-[calc(100vh-3.5rem)] and overflow-y-auto for landscape phone views */}
          <div
            ref={drawerRef}
            className="px-4 py-3 space-y-1 max-h-[calc(100vh-3.5rem)] overflow-y-auto"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors
                  ${
                    isActive(item.href)
                      ? "bg-green-500/10 text-green-400"
                      : "text-gray-300 hover:bg-[#252525] hover:text-white"
                  }
                `}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Mobile Actions Divider */}
            <div className="pt-4 mt-4 border-t border-[#333333] flex flex-col gap-3 pb-2">
              <a
                href="https://brewrepo.cloudkinshuk.in"
                className="flex items-center justify-center gap-2 py-3 bg-yellow-200 hover:bg-yellow-300 text-black rounded-full font-bold text-sm transition-colors"
                tabIndex={isOpen ? 0 : -1}
              >
                <GiCoffeeMug className="w-5 h-5 shrink-0" />
                Sponsor Cloudkinshuk
              </a>
              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                className="flex items-center justify-center gap-2 py-3 bg-[#252525] hover:bg-[#333333] text-white rounded-full font-bold text-sm transition-colors border border-[#444]"
                tabIndex={isOpen ? 0 : -1}
              >
                <Github className="w-5 h-5 shrink-0" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Spacer ── */}
      <div className="h-14" aria-hidden="true" />

      {/* ── Mobile Backdrop ── */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
