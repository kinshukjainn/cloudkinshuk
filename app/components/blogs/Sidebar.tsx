"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();

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
    <nav className="flex flex-col gap-6 text-sm">
      {/* Search - Material 3 Deep Pill Shape */}
      <div className="relative group px-2 md:px-0">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-6 md:left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#C4C6CA] transition-colors group-focus-within:text-[#A8C7FA]"
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
          className="w-full rounded-full bg-[#1E1F22] py-3.5 pl-12 pr-4 text-[15px] text-[#E2E2E6] placeholder:text-[#8C8E91] outline-none transition-all focus:bg-[#282A2E] focus:ring-2 focus:ring-[#A8C7FA] shadow-sm"
        />
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const open = q ? true : !collapsed[section.title];
          return (
            <div
              key={section.title}
              className="flex flex-col gap-1 px-2 md:px-0"
            >
              <button
                onClick={() => toggle(section.title)}
                className="group flex w-full items-center justify-between px-4 py-2.5 text-[14px] font-medium tracking-wide text-[#E2E2E6] transition-colors hover:text-[#A8C7FA] active:bg-[#1E1F22] rounded-full"
              >
                {section.title}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-[18px] w-[18px] transition-transform duration-300 ease-in-out ${
                    open
                      ? "rotate-0 text-[#A8C7FA]"
                      : "-rotate-90 text-[#8C8E91] group-hover:text-[#A8C7FA]"
                  }`}
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

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="flex flex-col overflow-hidden">
                  {section.items.map((item) => {
                    const active = isActive(item.slug);
                    return (
                      <li key={item.slug} className="mt-1">
                        <Link
                          href={`/blogs/${item.slug}`}
                          aria-current={active ? "page" : undefined}
                          onClick={onNavigate}
                          className={`block w-full rounded-md px-2 py-1 text-[14px] transition-all duration-200 ${
                            active
                              ? "bg-[#004A77] font-semibold text-[#C2E7FF]"
                              : "text-[#C4C6CA] hover:bg-[#1E1F22] hover:text-[#E2E2E6]"
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
          <div className="mx-2 rounded-2xl bg-[#1E1F22] p-5 text-center md:mx-0">
            <p className="text-[14px] text-[#C4C6CA]">No results found.</p>
          </div>
        )}
      </div>
    </nav>
  );
}
