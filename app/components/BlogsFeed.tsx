"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, Sparkle } from "lucide-react";

type Article = {
  title: string;
  slug: string;
  description: string;
};

type Section = {
  title: string;
  items: Article[];
};

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
    <div className="min-h-screen bg-yellow-100 text-black selection:bg-black selection:text-white">
      <main className="mx-auto w-full max-w-[700px] px-6 py-8 sm:py-14">
        {/* ── Header ───────────────────────────────────── */}
        <header className="mb-10">
          <h1 className="text-4xl font-thin text-black tracking-tight mb-4">
            My writings
          </h1>

          <p className="text-[18px] leading-8 text-gray-700">
            Read my latest project descriptions, technical notes, and updates.
          </p>
        </header>

        <div className="mb-12">
          <label
            htmlFor="blog-search"
            className="block text-base font-medium text-black mb-3"
          >
            Search your blog
          </label>

          <div className="flex items-center gap-3 border-b-2 border-gray-700  px-4 py-1 ">
            <Search
              className="h-5 w-5 text-gray-600 shrink-0"
              aria-hidden="true"
            />
            <input
              id="blog-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, keyword…"
              aria-label="Search articles"
              className="w-full bg-transparent text-base text-black placeholder:text-gray-500 focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 p-1 text-gray-500 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-sm"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {search && (
            <p className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
              {totalResults === 0
                ? "No results found"
                : `${totalResults} result${totalResults === 1 ? "" : "s"} found`}
            </p>
          )}
        </div>

        {/* ── Feed ─────────────────────────────────────── */}
        <div>
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title} className="mb-16 last:mb-0">
                <div className="flex items-baseline justify-between gap-1  pb-3 mb-2">
                  <h2 className="text-xl font-medium text-black">
                    {section.title}
                  </h2>
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "Article" : "Articles"}
                  </span>
                </div>

                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <li key={item.slug} className=" last:border-b-0">
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="group inline-flex items-start gap-2 py-1 text-left focus:outline-none"
                      >
                        <Sparkle
                          className="mt-1 fill-blue-800 h-4 w-4 shrink-0 text-blue-800 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                        <h3 className="mb-3 text-[18px] font-normal leading-snug text-blue-800 underline decoration-blue-800 underline-offset-4">
                          {item.title}
                        </h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          ) : (
            /* ── Empty state ──────────────────────────── */
            <div className="py-16 text-center border border-gray-200 rounded-md bg-gray-50">
              <p className="text-xl font-medium text-black mb-2">
                No matching articles
              </p>
              <p className="text-[17px] text-gray-800 mb-6">
                Nothing matched &ldquo;{search}&rdquo;. Try a different keyword.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-2 bg-[#ff9100] text-black px-6 py-1 rounded-md text-base font-medium"
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
