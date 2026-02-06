"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-slate-200 transition-colors"
          >
            <Image
              src="/corelogo.png"
              alt="Cloudkinshuk Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="hidden sm:inline">CLOUDKINSHUK</span>
            <span className="sm:hidden">Cloudkinshuk</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2  text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? " border-b-4 border-yellow-200 text-white"
                    : "hover:border-yellow-200  hover:border-b-4 text-slate-200 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* GitHub + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Link */}
            <a
              href="https://github.com/kinshukjainn/clkinshuk"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              className="p-2 text-white hover:text-blue-400 hover:border-b-4 hover:border-blue-400"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black ">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-2 py-1  text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "border-l-3 border-blue-800 text-white"
                    : "text-white font-semibold hover:border-l-4 hover:border-yellow-200 hover:text-blue-400 "
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
