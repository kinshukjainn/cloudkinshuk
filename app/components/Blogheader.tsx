"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Blogheader() {
  const pathname = usePathname();
  const router = useRouter();

  // 1. EXACT MATCH: Only shows on the main listing page
  const isHome = pathname === "/home-blog";

  // 2. SUB-ROUTE MATCH: Shows on /home-blog/blog-1, /home-blog/blog-2, etc.
  const isBlogPost =
    pathname.startsWith("/home-blog/") && pathname !== "/home-blog";

  return (
    // Pill-shaped header with responsive spacing
    <header className="w-full px-3 sm:px-4 md:px-6 mt-12  sm:mt-14 md:mt-16 relative z-40">
      <div className="max-w-6xl mx-auto   rounded h-12 sm:h-14 md:h-16 flex items-center px-4 sm:px-6 md:px-8 ">
        {isHome && (
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white truncate">
            Home
          </h1>
        )}

        {/* LOGIC B: Back Button (Scales for blog-1, blog-2, blog-99...) */}
        {isBlogPost && (
          <button
            onClick={() => router.push("/home-blog")}
            className="flex items-center gap-1 sm:gap-1.5 -ml-2 sm:-ml-3 px-2 sm:px-3 py-1.5 sm:py-2 text-white transition-all duration-200 active:scale-95 group"
            aria-label="Back to home"
          >
            {/* Microsoft-style Minimalist Chevron */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm sm:text-base md:text-lg font-medium">
              Back
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
