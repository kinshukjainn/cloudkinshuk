"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Zap,
  Lightbulb,
  SearchCode,
  Github,
  Server,
} from "lucide-react";
import { PiGithubLogoBold } from "react-icons/pi";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Header = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: "/home-blog",
        label: "Blogs",
        icon: <FileText className="w-5 h-5 md:w-4 md:h-4" />,
      },
      {
        href: "/setup",
        label: "System",
        icon: <Zap className="w-5 h-5 md:w-4 md:h-4" />,
      },
      {
        href: "/updates",
        label: "Workings",
        icon: <Lightbulb className="w-5 h-5 md:w-4 md:h-4" />,
      },
      {
        href: "/seo-insights",
        label: "Insights",
        icon: <SearchCode className="w-5 h-5 md:w-4 md:h-4" />,
      },
      {
        href: "/git-track",
        label: "Commits",
        icon: <PiGithubLogoBold className="w-5 h-5 md:w-4 md:h-4" />,
      },
    ],
    [],
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const activeItem = navItems.find((item) => isActive(item.href));
  const pageTitle = activeItem ? activeItem.label : "cloudkinshuk";

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-[100]  backdrop-blur-xs   bg-black/10  transition-all duration-300 h-14 sm:h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Logo Group */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-3 font-medium text-gray-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-xl"
            >
              <div className="rounded-full bg-white p-1">
                <Image
                  src="/corelogo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                  priority
                />
              </div>
              {/* AnimatePresence prevents "jumpy" text changes */}
              <div className="overflow-hidden">
                <span className="block text-xl sm:text-2xl font-semibold tracking-tight whitespace-nowrap">
                  {pageTitle}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center h-full flex-1 justify-center max-w-2xl">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-1 px-2 lg:px-3 h-full text-md font-normal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-xl ${
                      active ? "text-white" : "text-gray-200 hover:text-white"
                    }`}
                  >
                    <div
                      className={active ? "text-green-500" : "text-gray-200"}
                    >
                      {item.icon}
                    </div>
                    <span className="whitespace-nowrap">{item.label}</span>

                    {active && (
                      <motion.div
                        layoutId="desktop-active-nav"
                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-green-500"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <a
                href="https://brewrepo.cloudkinshuk.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-400 text-black text-xs sm:text-sm font-bold rounded-full  transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 shadow-sm"
              >
                <Server className="w-4 h-4" />
                <span className="hidden lg:inline">Buy a Server</span>
                <span className="inline lg:hidden">Buy</span>
              </a>

              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-black bg-green-500 rounded-full hover:bg-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 rounded-t-4xl backdrop-blur-xs   left-0 right-0 z-[100] bg-black/60  transform-gpu">
        <div className="flex items-center justify-around h-[68px] px-1 pb-[env(safe-area-inset-bottom)] w-full max-w-md mx-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center w-full h-full min-w-0 space-y-1 transition-colors touch-manipulation tap-highlight-transparent ${
                  active ? "text-white" : "text-gray-200"
                }`}
              >
                {/* Mobile Active Background Highlight */}
                {active && (
                  <motion.div
                    layoutId="mobile-active-bg"
                    className="absolute inset-1 sm:inset-1.5 rounded-full bg-black/70  -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div
                  className={`transition-transform duration-200 ${active ? "scale-110 text-white" : "text-gray-200"}`}
                >
                  {item.icon}
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold tracking-tight truncate w-full text-center px-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind fixed header/footer */}
      <div className="h-14 sm:h-16" />
    </>
  );
};

export default Header;
