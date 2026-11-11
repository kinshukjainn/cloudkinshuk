"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className=" top-0 z-50 w-full  bg-[#ff9100] backdrop-blur-sm">
      <div className="mx-auto flex h-max sm:h-max  w-full max-w-[700px] items-center px-6 sm:px-8">
        <div className="flex flex-1 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Cloudkinshuk.in - Home"
            className="group inline-flex items-center text-[36px] font-bold headerheading tracking-tight text-black transition-colors hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            <span>Cloudkinshuk</span>
            <span className="text-black transition-colors">.in</span>
          </Link>

          <Link
            href="/blogs"
            aria-label="Cloudkinshuk.in - Home"
            className="group inline-flex items-center text-[18px] font-normal tracking-tight text-gray-800 transition-colors "
          >
            <span>Blogs</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
