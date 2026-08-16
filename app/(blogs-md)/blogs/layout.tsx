"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { Sidebar } from "@/app/components/blogs/Sidebar";

// Height matching standard top app bar
const HEADER_HEIGHT = "64px";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-800 dark:text-neutral-300 selection:bg-blue-200 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100"
      style={
        {
          "--header-h": HEADER_HEIGHT,
          paddingTop: "var(--header-h)",
        } as React.CSSProperties
      }
    >
      {/* 
        Removed max-w, gap, and px. 
        This forces the layout to stretch edge-to-edge.
      */}
      <div className="flex w-full flex-col md:flex-row border-t border-neutral-200 dark:border-neutral-800">
        <MobileDocsNav />

        {/* 
          SIDEBAR
          Flush to the left edge, flush to the top.
          Added subtle background differentiation.
        */}
        <aside
          className="sticky hidden h-[calc(100vh-var(--header-h))] w-[260px] lg:w-[280px] shrink-0 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/20 p-4 md:block scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-800 hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-700"
          style={{ top: "var(--header-h)" }}
        >
          <Sidebar />
        </aside>

        {/* 
          MAIN CONTENT
          Flush to the top, removing the excessive pt-8/pt-10. 
        */}
        <main className="min-w-0 flex-1 p-6 lg:p-8 pb-24">
          <div className="mx-auto max-w-[840px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

// --- MOBILE NAVIGATION WRAPPER ---
export function MobileDocsNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sticky Mobile Header - Flat, high-contrast, no blur */}
      <div
        className="sticky z-40 flex items-center justify-between bg-neutral-50 dark:bg-[#0a0a0a] border-b border-neutral-300 dark:border-neutral-800 px-4 py-3 md:hidden rounded-none"
        style={{ top: "var(--header-h)" }}
      >
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-neutral-900 dark:text-neutral-100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
            Documentation
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-9 w-9 items-center justify-center cursor-pointer bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-500 rounded-none"
          aria-label="Open navigation menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Overlay - Absolute static (no transitions) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          style={{ top: "var(--header-h)" }}
        >
          {/* Solid Backdrop */}
          <div
            className="absolute inset-0 bg-neutral-900/80 dark:bg-black/90"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content - Flush edges, completely squared off */}
          <div className="relative flex w-[80vw] max-w-[320px] flex-col bg-white dark:bg-[#0a0a0a] border-r border-neutral-300 dark:border-neutral-800 rounded-none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
              <span className="text-sm font-bold tracking-widest uppercase text-neutral-900 dark:text-neutral-100">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center cursor-pointer bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-500 rounded-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
              <Sidebar onNavigate={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
