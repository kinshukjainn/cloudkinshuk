"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Zap, Lightbulb, SearchCode, Github } from "lucide-react";

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
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Top Header (Floating Pill Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#141414] backdrop-blur-md mx-2 mt-2 rounded-full  border border-[#444444] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo Group */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg sm:text-xl text-slate-200 hover:text-white transition-colors"
            >
              <Image
                src="/corelogo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="hidden sm:inline tracking-tight">
                CLOUDKINSHUK
              </span>
              <span className="sm:hidden text-base tracking-tight">
                Cloudkinshuk
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
                    className={`relative flex items-center gap-2 px-4 h-full text-sm font-medium transition-colors ${
                      active ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>

                    {/* Desktop Active Indicator */}
                    {active && (
                      <motion.div
                        layoutId="desktop-active-nav"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
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
              <a
                href="https://github.com/kinshukjainn/cloudkinshuk"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-black bg-white rounded-full hover:bg-slate-200 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414] border border-[#444444]    rounded-t-3xl ">
        <div className="flex items-center justify-around h-17 py-1 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  active ? "text-white" : "text-white "
                }`}
              >
                {/* Mobile Active Background Highlight */}
                {active && (
                  <motion.div
                    layoutId="mobile-active-bg"
                    className="absolute inset-1 rounded-full bg-blue-800 -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="hover:text-blue-400">{item.icon}</div>
                <span className="text-xs font-bold tracking-wide">
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
