"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] sm:h-[80px] w-full max-w-[700px] items-center px-6 sm:px-8">
        <Link
          href="/"
          aria-label="Cloudkinshuk.in - Home"
          className="group inline-flex items-center text-[26px] font-bold tracking-tight text-black transition-colors hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
        >
          <span>Cloudkinshuk</span>
          <span className="text-gray-400 transition-colors">.in</span>
        </Link>
      </div>
    </header>
  );
}
