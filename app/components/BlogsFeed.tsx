"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";

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
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-900">
      <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20 md:py-24">
        {/* ── Header ───────────────────────────────────── */}
        <header className="mb-14 space-y-8 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 border border-zinc-200 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:text-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>{totalArticles} Articles</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Blogs, Notes &{" "}
              <span className="text-zinc-400 dark:text-zinc-500">Thoughts</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-500 dark:text-zinc-400 sm:text-xl sm:leading-9">
              Read my latest project descriptions, technical notes, and updates.
            </p>
          </div>
        </header>

        {/* ── Search ───────────────────────────────────── */}
        <div className="mb-14 sm:mb-16">
          <div className="group flex items-stretch border border-zinc-200 bg-white transition-colors focus-within:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-50">
            <div className="flex items-center justify-center border-r border-zinc-200 px-4 text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="blog-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, keywords, titles…"
              aria-label="Search articles"
              className="w-full bg-transparent px-4 py-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-500 sm:text-lg"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="flex items-center justify-center border-l border-zinc-200 px-4 text-zinc-400 transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
          {search && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:text-sm">
              {totalResults === 0
                ? "// no results"
                : `// ${totalResults} result${totalResults === 1 ? "" : "s"}`}
            </p>
          )}
        </div>

        {/* ── Feed ─────────────────────────────────────── */}
        <div className="space-y-16 sm:space-y-20">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title}>
                {/* Section header */}
                <div className="mb-7 flex items-end justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800 sm:mb-9">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-900 dark:text-zinc-50 sm:text-base">
                    {section.title}
                  </h2>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:text-sm">
                    {String(section.items.length).padStart(2, "0")}{" "}
                    {section.items.length === 1 ? "entry" : "entries"}
                  </span>
                </div>

                {/* Cards grid */}
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                  {section.items.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/blogs/${item.slug}`}
                      className="group relative flex flex-col border border-zinc-200 bg-white p-7 transition-all hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-50 dark:hover:bg-zinc-900/40 sm:p-9"
                    >
                      {/* Top: index + arrow */}
                      <div className="mb-5 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 text-zinc-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-zinc-50"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-semibold leading-8 tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl sm:leading-9">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-7 line-clamp-4 flex-1 text-base leading-8 text-zinc-500 dark:text-zinc-400 sm:text-lg sm:leading-8">
                        {item.description}
                      </p>

                      {/* Bottom action */}
                      <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-sm">
                        <span className="transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
                          Read article
                        </span>
                        <span className="inline-block h-px w-8 bg-zinc-300 transition-all duration-200 group-hover:w-12 group-hover:bg-zinc-900 dark:bg-zinc-700 dark:group-hover:bg-zinc-50" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          ) : (
            /* Empty state */
            <div className="border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-700">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:text-base">
                no matching articles
              </p>
              <p className="mt-4 text-base leading-8 text-zinc-500 dark:text-zinc-400 sm:text-lg">
                Nothing matched &ldquo;{search}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-8 border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-50 dark:hover:text-zinc-50 sm:text-sm"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
