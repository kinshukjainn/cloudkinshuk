"use client";

import React, { useMemo, useState } from "react";
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

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: "/home-blog",
        label: "Blogs",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        href: "/setup",
        label: "System",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        href: "/updates",
        label: "Workings",
        icon: <Lightbulb className="w-4 h-4" />,
      },
      {
        href: "/seo-insights",
        label: "Insights",
        icon: <SearchCode className="w-4 h-4" />,
      },
      {
        href: "/git-track",
        label: "Commits",
        icon: <PiGithubLogoBold className="w-4 h-4" />,
      },
    ],
    [],
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Close mobile menu when a route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#111111] text-gray-300 border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <div className="bg-white p-1 rounded-full">
                  <Image
                    src="/corelogo.png"
                    alt="Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">
                  Cloudkinshuk.in
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${
                      active
                        ? "text-white bg-[#202020] p-1.5 border font-semibold border-[#444444] rounded-xs"
                        : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <a
                  href="https://brewrepo.cloudkinshuk.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-black p-1 bg-[#ff9100] rounded-full transition-colors"
                >
                  <Server className="w-4 h-4" />
                  Buy a Server
                </a>
                <span className="text-gray-700">|</span>
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>

              {/* Hamburger Menu Button */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-sm text-gray-400 hover:text-white hover:bg-[#222222] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="block w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#333333] bg-[#111111]">
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-2 py-1 text-base font-medium rounded-sm transition-colors ${
                      active
                        ? "bg-[#252525] border border-[#444444] text-white"
                        : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-[#333333] space-y-1">
                <a
                  href="https://brewrepo.cloudkinshuk.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-1 text-base font-medium text-gray-400 hover:bg-[#1a1a1a] hover:text-white rounded-sm transition-colors"
                >
                  <Server className="w-5 h-5" />
                  Buy a Server
                </a>
                <a
                  href="https://github.com/kinshukjainn/cloudkinshuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-1 text-base font-medium text-gray-400 hover:bg-[#1a1a1a] hover:text-white rounded-sm transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View Source on GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-14 sm:h-16" />
    </>
  );
};

export default Header;
