"use client";

import { useMemo, useState, useDeferredValue } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  // State for immediate input feedback
  const [query, setQuery] = useState("");
  // Deferred value for heavy filtering without blocking the main thread
  const deferredQuery = useDeferredValue(query);

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const q = deferredQuery.trim().toLowerCase();

  const sections = useMemo(() => {
    if (!q) return navigation;
    return navigation
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => i.title.toLowerCase().includes(q)),
      }))
      .filter((s) => s.items.length > 0);
  }, [q]);

  const toggle = (title: string) =>
    setCollapsed((c) => ({ ...c, [title]: !c[title] }));

  const isActive = (slug: string) => {
    const href = `/blogs/${slug}`;
    return (
      pathname === href || (slug === "introduction" && pathname === "/blogs")
    );
  };

  return (
    <nav className="flex flex-col gap-8 text-sm">
      {/* Search - Pragmatic and sharp */}
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs..."
          className="w-full rounded-none bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 py-2.5 pl-9 pr-3 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500"
        />
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        {sections.map((section) => {
          const open = q ? true : !collapsed[section.title];
          return (
            <div key={section.title} className="flex flex-col gap-2">
              <button
                onClick={() => toggle(section.title)}
                className="group flex w-full items-center justify-between px-3 py-1 text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {section.title}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 ${
                    open ? "rotate-0" : "-rotate-90"
                  } text-neutral-400 dark:text-neutral-500`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Strict block/hidden layout - no smooth expanding transitions */}
              <div className={open ? "block" : "hidden"}>
                <ul className="flex flex-col">
                  {section.items.map((item) => {
                    const active = isActive(item.slug);
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/blogs/${item.slug}`}
                          aria-current={active ? "page" : undefined}
                          onClick={onNavigate}
                          className={`block w-full border-l-2 px-3 py-2 text-sm ${
                            active
                              ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold"
                              : "border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100"
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}

        {sections.length === 0 && (
          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-4 text-center rounded-none">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              No results found.
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}
