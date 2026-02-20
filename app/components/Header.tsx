"use client";

import React from "react";
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

  const navItems: NavItem[] = [
    {
      href: "/home-blog",
      label: "Blogs",
      icon: <FileText className="w-5 h-5 md:w-4 md:h-4" />,
    },
    {
      href: "/setup",
      label: "Setup",
      icon: <Zap className="w-5 h-5 md:w-4 md:h-4" />,
    },
    {
      href: "/updates",
      label: "Updates",
      icon: <Lightbulb className="w-5 h-5 md:w-4 md:h-4" />,
    },
    {
      href: "/seo-insights",
      label: "SEO",
      icon: <SearchCode className="w-5 h-5 md:w-4 md:h-4" />,
    },
    {
      href: "/git-track",
      label: "Git Tracker",
      icon: <PiGithubLogoBold className="w-5 h-5 md:w-4 md:h-4" />,
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#282828] border-b border-[#444] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo Group */}
            <Link
              href="/"
              className="flex items-center gap-3 font-medium text-lg sm:text-xl text-gray-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-sm"
            >
              <Image
                src="/corelogo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                priority
              />
              <span className="hidden sm:inline text-2xl font-bold tracking-tight">
                cloudkinshuk
              </span>
              <span className="sm:hidden font-bold text-2xl tracking-tight">
                cloudkinshuk
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center h-full gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 h-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-sm ${
                      active ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <div
                      className={active ? "text-green-500" : "text-gray-400"}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>

                    {/* Desktop Active Indicator */}
                    {active && (
                      <motion.div
                        layoutId="desktop-active-nav"
                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-green-500"
                        initial={false}
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
            <div className="flex items-center gap-3">
              {/* Buy a Server Button */}
              <a
                href="https://brewrepo.cloudkinshuk.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 sm:px-2 sm:py-1.5 bg-yellow-200  text-black text-md font-bold rounded-lg   transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 shadow-sm"
                aria-label="Buy a Server"
              >
                <Server className="w-4 h-4" />
                <span className="hidden sm:inline">Buy a Server</span>
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-black bg-green-500 rounded-sm  transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#282828] border-t border-[#444] pb-[env(safe-area-inset-bottom)] transform-gpu">
        <div className="flex items-center justify-around h-[68px] px-2 w-full">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors touch-manipulation tap-highlight-transparent ${
                  active ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {/* Mobile Active Background Highlight */}
                {active && (
                  <motion.div
                    layoutId="mobile-active-bg"
                    className="absolute inset-1.5 rounded-sm bg-[#3f3f3f] border border-[#555] -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={`transition-colors ${
                    active ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
