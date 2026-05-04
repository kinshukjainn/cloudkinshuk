"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiChevronLeft, FiHome } from "react-icons/fi";

export default function Blogheader() {
  const pathname = usePathname();
  const router = useRouter();

  // 1. EXACT MATCH: Only shows on the main listing page
  const isHome = pathname === "/home-blog";

  // 2. SUB-ROUTE MATCH: Shows on /home-blog/blog-1, /home-blog/blog-2, etc.
  const isBlogPost =
    pathname.startsWith("/home-blog/") && pathname !== "/home-blog";

  return (
    <header className="fixed top-16 left-0 w-full px-4 sm:px-6 md:px-8 py-3 z-40 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center">
        {/* LOGIC A: Home Label with Background */}
        {isHome && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm border border-white/10 select-none">
            <FiHome className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            <h1 className="text-sm sm:text-base text-white font-medium pr-1 tracking-wide">
              Blog Home
            </h1>
          </div>
        )}

        {/* LOGIC B: Back Button with Background */}
        {isBlogPost && (
          <button
            onClick={() => router.push("/home-blog")}
            className="pointer-events-auto group flex items-center gap-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-all duration-300 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm border border-white/10 text-white cursor-pointer"
            aria-label="Back to home"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm sm:text-base font-medium pr-1 tracking-wide">
              Back
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
