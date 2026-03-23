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
    // Added 'fixed top-0 left-0' and 'backdrop-blur-sm' for a modern feel
    <header className="fixed top-16 left-0 w-full px-3 sm:px-4 md:px-6 py-2 z-40">
      <div className="max-w-6xl mx-auto flex items-center">
        {/* LOGIC A: Home Label with Background */}
        {isHome && (
          <h1 className="text-base text-white rounded-sm sm:text-lg md:text-xl font-semibold bg-black  px-2 py-1 ">
            Home
          </h1>
        )}

        {/* LOGIC B: Back Button with Background */}
        {isBlogPost && (
          <button
            onClick={() => router.push("/home-blog")}
            className="flex items-center gap-1 sm:gap-1.5 bg-black backdrop-blur-xs px-4 py-2.5 text-white"
            aria-label="Back to home"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm sm:text-base text-white font-medium pr-1">
              Back
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
