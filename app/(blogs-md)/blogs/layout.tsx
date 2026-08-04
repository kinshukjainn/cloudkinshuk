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
      className="min-h-screen bg-black text-zinc-300 selection:bg-blue-500/30 selection:text-blue-100"
      style={
        {
          "--header-h": HEADER_HEIGHT,
          paddingTop: "var(--header-h)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col md:flex-row md:gap-6 lg:gap-8 lg:px-6">
        <MobileDocsNav />

        <aside
          className="sticky hidden h-[calc(100vh-var(--header-h))] w-[260px] shrink-0 overflow-y-auto py-8 pr-6 md:block lg:w-[280px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500"
          style={{ top: "var(--header-h)" }}
        >
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1 px-5 pb-24 pt-8 sm:px-8 md:px-0 md:pt-10">
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
      {/* Sticky Mobile Header - Clean and sharp */}
      <div
        className="sticky z-40 flex items-center justify-between  bg-black px-4 py-3 backdrop-blur-md md:hidden"
        style={{ top: "var(--header-h)" }}
      >
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-white"
            stroke="currentColor"
            strokeWidth="5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
            />
          </svg>
          <span className="text-[24px] font-bold tracking-tight text-white">
            Documentation
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white active:bg-zinc-700"
          aria-label="Open navigation menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Overlay - Pragmatic side sheet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          style={{ top: "var(--header-h)" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content - Flush edges, squared off */}
          <div className="relative flex w-[80vw] max-w-[320px] flex-col border-r border-zinc-700 bg-black shadow-2xl transition-transform duration-300 animate-in slide-in-from-left">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <span className="text-xl font-bold tracking-wider text-white">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600">
              <Sidebar onNavigate={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
