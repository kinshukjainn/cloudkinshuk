"use client";

import { useMemo, useState, useDeferredValue } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  // State for immediate input feedback
  const [query, setQuery] = useState("");
  // Deferred value for heavy filtering without blocking the main thread (makes typing faster)
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
    <nav className="flex flex-col sidebar-font gap-6 text-sm">
      {/* Search - Pragmatic and sharp */}
      <div className="relative px-1 md:px-0">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 md:left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white"
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
          placeholder="Search docs/blogs"
          className="w-full rounded-full  bg-[#141414] py-2 pl-10 pr-3 text-md text-white placeholder:text-zinc-500 outline-none transition-colors"
        />
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const open = q ? true : !collapsed[section.title];
          return (
            <div
              key={section.title}
              className="flex flex-col gap-1 px-1 md:px-0"
            >
              <button
                onClick={() => toggle(section.title)}
                className="group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-lg font-normal text-white transition-colors "
              >
                {section.title}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    open
                      ? "rotate-0 cursor-pointer text-green-400"
                      : "-rotate-90 cursor-pointer text-green-600 group-hover:text-green-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="flex flex-col overflow-hidden pl-2">
                  {section.items.map((item) => {
                    const active = isActive(item.slug);
                    return (
                      <li key={item.slug} className="mt-0.5">
                        <Link
                          href={`/blogs/${item.slug}`}
                          aria-current={active ? "page" : undefined}
                          onClick={onNavigate}
                          className={`block w-full rounded-full px-3 py-1.5 text-sm transition-colors ${
                            active
                              ? " font-bold text-blue-400"
                              : "text-zinc-100  hover:text-blue-400"
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
          <div className="mx-1 rounded-md  bg-black p-4 text-center md:mx-0">
            <p className="text-lg text-white">No results found.</p>
          </div>
        )}
      </div>
    </nav>
  );
}
