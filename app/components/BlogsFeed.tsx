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

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 dark:focus-visible:ring-blue-400/40";

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
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        {/* ── Header ───────────────────────────────────── */}
        <header className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 rounded-md border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>{totalArticles} Articles</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Blogs, Notes &{" "}
              <span className="text-zinc-400 dark:text-zinc-500">Thoughts</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Read my latest project descriptions, technical notes, and updates.
            </p>
          </div>
        </header>

        {/* ── Search ───────────────────────────────────── */}
        <div className="mb-12">
          <div
            className={`group flex items-center overflow-hidden rounded-md border-2 border-zinc-300 bg-white shadow-sm transition-colors focus-within:border-blue-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-blue-400 dark:hover:border-zinc-600 ${FOCUS}`}
          >
            <div className="flex items-center justify-center pl-4 pr-3 text-zinc-500 dark:text-zinc-400">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="blog-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, keywords, titles…"
              aria-label="Search articles"
              className="w-full bg-transparent py-3.5 pr-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className={`mr-2 flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 ${FOCUS}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          {search && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {totalResults === 0
                ? "// no results"
                : `// ${totalResults} result${totalResults === 1 ? "" : "s"}`}
            </p>
          )}
        </div>

        {/* ── Feed ─────────────────────────────────────── */}
        <div className="space-y-12">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title}>
                {/* Section header — bordered strip (Fluent style) */}
                <div className="mb-5 flex items-center justify-between gap-4 rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                    {section.title}
                  </h2>
                  <span className="rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
                    {String(section.items.length).padStart(2, "0")}{" "}
                    {section.items.length === 1 ? "entry" : "entries"}
                  </span>
                </div>

                {/* Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.items.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/blogs/${item.slug}`}
                      className={`group relative flex flex-col rounded-md border border-zinc-300 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-blue-400 dark:hover:bg-zinc-900/40 ${FOCUS}`}
                    >
                      {/* Top: index + arrow */}
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-md border border-zinc-300 bg-zinc-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 text-zinc-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700 dark:text-zinc-500 dark:group-hover:text-blue-400"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-semibold leading-7 tracking-tight text-zinc-900 dark:text-zinc-50">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-6 line-clamp-3 flex-1 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        {item.description}
                      </p>

                      {/* Divider then action */}
                      <div className="mt-auto flex items-center gap-2 border-t border-zinc-200 pt-4 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                        <span className="transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400">
                          Read article
                        </span>
                        <span className="inline-block h-px w-8 bg-zinc-400 transition-all duration-200 group-hover:w-12 group-hover:bg-blue-700 dark:bg-zinc-600 dark:group-hover:bg-blue-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          ) : (
            /* Empty state */
            <div className="rounded-md border-2 border-dashed border-zinc-300 py-20 text-center dark:border-zinc-700">
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                no matching articles
              </p>
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Nothing matched &ldquo;{search}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className={`mt-6 rounded-md border-2 border-zinc-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:border-blue-700 hover:bg-zinc-50 hover:text-blue-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-400 dark:hover:bg-zinc-900 dark:hover:text-blue-400 ${FOCUS}`}
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
