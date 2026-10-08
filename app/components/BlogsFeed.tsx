"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, BookOpen, ArrowRight } from "lucide-react";

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

  // Instantly filter sections and articles as the user types
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
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] selection:bg-[#111] selection:text-white dark:bg-black dark:text-[#eee] dark:selection:bg-[#eee] dark:selection:text-[#111]">
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* ============ HEADER ============ */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#555] dark:text-[#aaa]">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>{totalArticles} Articles Published</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Blogs, Notes &{" "}
            <span className="text-blue-700 dark:text-blue-400">Thoughts</span>
          </h1>

          <p className="text-base text-[#444] dark:text-[#ccc] md:text-lg leading-relaxed">
            Read my latest project descriptions, technical notes, and updates.
          </p>
        </header>

        {/* ============ SEARCH BAR ============ */}
        <div className="mb-12">
          <div className="relative flex items-center">
            <div className="dark:bg-[#141414] bg-gray-200 px-1 py-2.5 mr-2 rounded ">
              <Search
                className="mr-3 ml-2 h-5 w-5 text-black dark:text-white"
                aria-hidden="true"
              />
            </div>
            <input
              id="blog-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, keywords, titles…"
              aria-label="Search articles"
              className="w-full dark:bg-[#141414] bg-gray-200 px-2 py-2 rounded text-base font-medium text-[#111] placeholder:text-[#777] focus:outline-none dark:text-[#eee] dark:placeholder:text-[#888] md:text-lg"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="ml-2 text-[#555] hover:text-[#111] dark:text-[#aaa] dark:hover:text-[#eee]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {search && (
            <p className="mt-2 text-xs font-bold text-[#555] dark:text-[#aaa]">
              {totalResults === 0
                ? "No matching articles found."
                : `Found ${totalResults} result${totalResults === 1 ? "" : "s"}.`}
            </p>
          )}
        </div>

        {/* ============ FEED ============ */}
        <div className="space-y-14">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title}>
                {/* Section Header */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-xl font-bold  tracking-widest text-[#1F1F1F] dark:text-[#E3E3E3]">
                      {section.title}
                    </h2>
                    <span className="text-xs font-bold text-[#555] dark:text-[#aaa]">
                      {section.items.length}{" "}
                      {section.items.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                </div>

                {/* Article Items */}
                <div className="space-y-8">
                  {section.items.map((item) => (
                    <article key={item.slug} className="group block">
                      <h3 className="text-xl font-bold text-[#111] dark:text-[#eee] group-hover:text-blue-700 dark:group-hover:text-blue-400">
                        <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                      </h3>

                      <p className="mt-2 text-base leading-relaxed text-[#444] dark:text-[#ccc]">
                        {item.description}
                      </p>

                      <div className="mt-3">
                        <Link
                          href={`/blogs/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Read Article{" "}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          ) : (
            /* ============ EMPTY STATE ============ */
            <div className="py-12 text-center">
              <h3 className="text-xl font-bold text-[#111] dark:text-[#eee]">
                No matching articles found
              </h3>
              <p className="mt-2 text-base text-[#555] dark:text-[#aaa]">
                Nothing matched your search for &ldquo;{search}&rdquo;. Try
                using different keywords.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 font-bold text-blue-700 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
              >
                Clear search filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
