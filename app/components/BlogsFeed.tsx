"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, Sparkle } from "lucide-react";

/* ── TYPES ──────────────────────────────────────────────── */
type Article = {
  title: string;
  slug: string;
  description: string;
};

type Section = {
  title: string;
  items: Article[];
};

/* ── PAGE ───────────────────────────────────────────────── */
export default function BlogFeed({ sections }: { sections: Section[] }) {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase().trim();

  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      ),
    }))
    .filter((section) => section.items.length > 0);

  const totalResults = filteredSections.reduce(
    (acc, s) => acc + s.items.length,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans selection:bg-[#0066cc] selection:text-white">
      {/* ── VLC-Style Header / Top Navigation ── */}
      <header className="w-full border-t-[3px] border-[#333333] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-[#eeeeee]">
        <div className="mx-auto flex w-full max-w-[1024px] flex-col md:flex-row items-center justify-between px-6 py-3 gap-4">
          {/* Left side: Logo & Tagline */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 text-center md:text-left w-full md:w-auto">
            <Link
              href="/"
              className="flex flex-col items-center md:items-start leading-none focus:outline-none"
            >
              <h1 className="text-[34px] font-light text-[#0066cc] tracking-tight m-0 p-0">
                My writings
              </h1>
            </Link>
            <p className="text-[16px] text-[#0066cc] max-w-sm leading-snug">
              Read my latest project descriptions, technical notes, and updates.
            </p>
          </div>

          {/* Right side: Search Box (Mimicking the Donate Box layout) */}
          <div className="flex items-stretch h-8 w-full md:w-auto">
            <div className="flex items-center bg-white border border-[#cccccc] border-r-0 px-2 flex-grow md:w-64">
              <Search
                className="h-4 w-4 text-black mr-2 shrink-0"
                aria-hidden="true"
              />
              <input
                id="blog-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Title, keyword…"
                className="w-full h-full bg-transparent text-[13px] text-[#333333] placeholder:text-[#999999] focus:outline-none"
                aria-label="Search articles"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="ml-1 text-[#888888] hover:text-[#333333] focus:outline-none"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <label
              htmlFor="blog-search"
              className="bg-[#0066cc] text-white text-[13px] font-medium px-4 flex items-center justify-center cursor-pointer hover:bg-[#005bb5] transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Search your blog</span>
              <span className="sm:hidden">Search</span>
            </label>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="mx-auto w-full max-w-[1024px] px-6 py-10">
        {/* Search Results Count */}
        {search && (
          <p className="mb-8 text-[11px] font-bold text-[#888888] uppercase tracking-wide">
            {totalResults === 0
              ? "No results found"
              : `${totalResults} result${totalResults === 1 ? "" : "s"} found`}
          </p>
        )}

        {/* ── Feed ─────────────────────────────────────── */}
        <div>
          {filteredSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {filteredSections.map((section) => (
                <section key={section.title}>
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#eeeeee] pb-2 mb-4">
                    <h2 className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">
                      {section.title}
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#cccccc]">
                      {section.items.length}{" "}
                      {section.items.length === 1 ? "Article" : "Articles"}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-5">
                    {section.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blogs/${item.slug}`}
                          className="group flex flex-col focus:outline-none"
                        >
                          <div className="flex items-start gap-2.5">
                            <Sparkle
                              className="mt-1 fill-[#ff8800] h-3.5 w-3.5 shrink-0 text-[#ff8800]"
                              aria-hidden="true"
                            />
                            <div>
                              <h3 className="text-[15px] font-bold text-[#0066cc] group-hover:underline leading-tight mb-1">
                                {item.title}
                              </h3>
                              <p className="text-[12px] text-[#666666] line-clamp-2 leading-[1.5]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            /* ── Empty state ──────────────────────────── */
            <div className="py-16 text-center border border-[#eeeeee] bg-[#f9f9f9]">
              <p className="text-[15px] font-bold text-[#333333] mb-2">
                No matching articles
              </p>
              <p className="text-[13px] text-[#666666] mb-6">
                Nothing matched &ldquo;{search}&rdquo;. Try a different keyword.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center justify-center bg-[#0066cc] text-white px-6 py-2 text-[13px] font-bold hover:bg-[#005bb5]"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
