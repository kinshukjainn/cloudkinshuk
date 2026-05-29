"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { Sidebar } from "@/app/components/blogs/Sidebar";

// Height matching standard Material 3 top app bar
const HEADER_HEIGHT = "64px";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[#000000] text-[#E2E2E6] selection:bg-[#A8C7FA]/30 selection:text-[#C2E7FF]"
      style={
        {
          "--header-h": HEADER_HEIGHT,
          paddingTop: "var(--header-h)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col md:flex-row md:gap-6 lg:gap-10 lg:px-6">
        <MobileDocsNav />

        <aside
          className="sticky hidden h-[calc(100vh-var(--header-h))] w-[280px] shrink-0 overflow-y-auto py-6 pr-6 md:block lg:w-[320px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#44474E]"
          style={{ top: "var(--header-h)" }}
        >
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-24 pt-6 sm:px-6 md:px-0 md:pt-10">
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
      {/* Sticky Mobile Header - Material Surface */}
      <div
        className="sticky z-40 flex items-center justify-between border-b border-[#1E1F22] bg-[#000000]/80 px-4 py-3 backdrop-blur-2xl md:hidden"
        style={{ top: "var(--header-h)" }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#004A77] text-[#C2E7FF]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              />
            </svg>
          </span>
          <span className="text-[15px] font-medium tracking-tight text-[#E2E2E6]">
            Documentation
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E1F22] text-[#A8C7FA] transition-colors hover:bg-[#282A2E] active:scale-95"
          aria-label="Open navigation menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[22px] w-[22px]"
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

      {/* Mobile Drawer Overlay - Material M3 Slide-in */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          style={{ top: "var(--header-h)" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex w-[85vw] max-w-[360px] flex-col rounded-tr-3xl bg-[#111114] shadow-2xl transition-transform duration-300 animate-in slide-in-from-left">
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-[14px] font-medium text-[#A8C7FA]">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E1F22] text-[#C4C6CA] transition-colors hover:bg-[#282A2E] hover:text-[#E2E2E6]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[20px] w-[20px]"
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

            <div className="flex-1 overflow-y-auto px-4 pb-10">
              <Sidebar onNavigate={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
