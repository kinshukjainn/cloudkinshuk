"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion"; // Add this
import {
  Menu,
  X,
  FileText,
  Zap,
  Lightbulb,
  SearchCode,
  Github,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      href: "/home-blog",
      label: "Blogs",
      icon: <FileText className="w-4 h-4" />,
    },
    { href: "/setup", label: "Setup", icon: <Zap className="w-4 h-4" /> },
    {
      href: "/updates",
      label: "Updates",
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      href: "/seo-insights",
      label: "SEO",
      icon: <SearchCode className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Framer Motion Variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { x: -10, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md mx-2 mt-0 rounded-b-2xl border-x border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-slate-200"
          >
            <Image
              src="/corelogo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="hidden sm:inline">CLOUDKINSHUK</span>
            <span className="sm:hidden text-base">Cloudkinshuk</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-200 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/kinshukjainn/clkinshuk"
              className="p-2 text-white hover:text-blue-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white outline-none"
            >
              <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col gap-2 p-4 pb-6">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
