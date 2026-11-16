"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Blogs", href: "/blogs" },
  { name: "Random stuff", href: "/explore" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-t-[4px] border-[#333333] border-b border-[#eeeeee] bg-white">
      <div className="mx-auto flex min-h-[70px] max-w-[1024px] items-center px-5 sm:px-8">
        {/* Logo (Styled to match the VideoLAN dual-text structure) */}

        <Link
          href="/"
          aria-label="Cloudkinshuk home"
          className="flex flex-col headerheading justify-center mr-10 group"
        >
          <div className="flex items-baseline">
            <span className="text-[28px] font-light text-[#0066cc] leading-none tracking-tight group-hover:text-[#005bb5] transition-colors">
              Cloudkinshuk
            </span>
            <span className="text-[20px] font-bold text-[#0066cc] leading-none group-hover:text-[#005bb5] transition-colors">
              .in
            </span>
          </div>

          <span className="bg-[#0066cc] text-white text-[10px] font-bold tracking-[0.2em] px-1.5 py-[2px] mt-1 w-fit leading-none  group-hover:bg-[#005bb5] transition-colors">
            Developer / Engineer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[17px] transition-colors duration-200
                ${
                  isActive(link.href)
                    ? "text-[#004a99] underline font-semibold"
                    : "text-[#0066cc] hover:text-[#004a99]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="ml-auto rounded p-2 text-[#0066cc] transition-colors hover:bg-[#f5f5f5] sm:hidden"
        >
          {isOpen ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-[#eeeeee] bg-[#fdfdfd] px-5 py-2 sm:hidden">
          <div className="mx-auto flex max-w-5xl flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`border-b border-[#eeeeee] py-3 text-[17px] transition-colors duration-200 last:border-0
                  ${
                    isActive(link.href)
                      ? "text-[#004a99] font-semibold"
                      : "text-[#0066cc] hover:text-[#004a99]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
