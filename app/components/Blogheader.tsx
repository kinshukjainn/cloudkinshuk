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
    // ADJUST THE 'mt-16' value to match the height of your Parent Header
    // 'bg-white' ensures no transparency issues
    <header className="w-full  bg-gray-200 h-14 flex items-center mt-16 relative z-40">
      <div className="max-w-7xl w-full mx-auto px-4">
        {/* LOGIC A: Home Title */}
        {isHome && (
          <h1 className="text-xl font-semibold text-gray-900">Home</h1>
        )}

        {/* LOGIC B: Back Button (Scales for blog-1, blog-2, blog-99...) */}
        {isBlogPost && (
          <button
            onClick={() => router.push("/home-blog")}
            className="flex items-center cursor-pointer  justify-center p-2 -ml-2 rounded-full text-gray-900 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {/* Microsoft-style Minimalist Chevron */}
            <svg
              width="24"
              height="24"
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
            Back
          </button>
        )}
      </div>
    </header>
  );
}
