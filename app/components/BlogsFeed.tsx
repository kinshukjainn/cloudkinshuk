"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, AlertCircle } from "lucide-react";

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

  const totalArticles = sections.reduce((acc, s) => acc + s.items.length, 0);
  const totalResults = filteredSections.reduce(
    (acc, s) => acc + s.items.length,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <main className="mx-auto w-full max-w-[700px] px-6 py-16 sm:py-24">
        {/* ── Header ───────────────────────────────────── */}
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-4">
            Blogs • {totalArticles}{" "}
            {totalArticles === 1 ? "Article" : "Articles"}
          </p>

          <h1 className="text-5xl font-thin text-black tracking-tight mb-4">
            Blogs, Notes & Thoughts
          </h1>

          <p className="text-[18px] leading-8 text-gray-900">
            Read my latest project descriptions, technical notes, and updates.
          </p>
        </header>

        {/* ── Content Advisory (Professional Editorial Callout) */}
        <div className="border-l-4 border-black bg-gray-50 p-6 mb-12">
          <h2 className="flex items-center gap-2 text-lg font-medium text-black mb-2">
            <AlertCircle className="h-5 w-5" />
            Content Removed
          </h2>
          <p className="text-[17px] leading-relaxed text-gray-800">
            Some blog post has been removed as they are being updated and few
            parts will be removed. They will be available on 18th november 2026
          </p>
        </div>

        {/* ── Search ───────────────────────────────────── */}
        <div className="mb-16">
          <label
            htmlFor="blog-search"
            className="block text-base font-medium text-black mb-3"
          >
            Search your blog
          </label>

          <div className="flex items-center gap-3 bg-gray-100 px-4 py-3.5 rounded-md focus-within:ring-2 focus-within:ring-black">
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
                <div className="flex items-baseline justify-between gap-4 border-b border-gray-200 pb-3 mb-2">
                  <h2 className="text-xl font-medium text-black">
                    {section.title}
                  </h2>
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "entry" : "entries"}
                  </span>
                </div>

                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <li
                      key={item.slug}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="group block py-8 focus:outline-none"
                      >
                        <h3 className="text-[22px] font-medium text-black leading-snug mb-3 group-hover:underline decoration-2 underline-offset-4">
                          {item.title}
                        </h3>

                        <p className="text-[17px] leading-8 text-gray-800 line-clamp-2 mb-4">
                          {item.description}
                        </p>

                        <span className="inline-flex items-center gap-1.5 text-base font-medium text-black">
                          Read Article <ArrowRight className="h-4 w-4" />
                        </span>
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
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-base font-medium"
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
