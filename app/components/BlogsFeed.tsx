"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, FileText, X, Pencil } from "lucide-react";

type Article = {
  title: string;
  slug: string;
  description: string;
};

type Section = {
  title: string;
  items: Article[];
};

/* ── Surface tokens (mirrors header + home page) ────────── */
const SURFACE = "bg-white dark:bg-[#1E1F20] " + "shadow-sm dark:shadow-none";

const SUBTLE = "bg-[#F0F4F9] dark:bg-[#282A2C]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] " +
  "focus-visible:ring-offset-0";

/* ── Neutral inverted tokens (same as header + home) ────── */
const SOLID = "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]";

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

  const totalResults = filteredSections.reduce(
    (acc, s) => acc + s.items.length,
    0,
  );

  const hasContent = search.length > 0;

  return (
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#1F1F1F] selection:text-white
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#E3E3E3] dark:selection:text-[#1F1F1F]
      "
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* ═══════════════ HEADER ═══════════════ */}
        <header className="mb-6 md:mb-8">
          {/* Status chip */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-full
                py-1.5 pl-1.5 pr-3.5 ${SURFACE}
              `}
            >
              <span
                className={`
                  grid h-6 w-6 shrink-0 place-items-center rounded-full
                  ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  transition-all duration-300 ${SPRING}
                `}
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                {sections.reduce((acc, s) => acc + s.items.length, 0)} Articles
              </span>
            </span>
          </div>

          <h1
            className="
              h-font mb-4 text-3xl font-bold tracking-tight
              text-[#1F1F1F] dark:text-[#E3E3E3]
              sm:text-4xl md:text-5xl md:leading-[1.1]
            "
          >
            Blogs, Project Descriptions,{" "}
            <span className="text-[#0B57D0] dark:text-[#A8C7FA]">Thoughts</span>
          </h1>
          <p
            className="
              max-w-3xl text-sm leading-7
              text-[#444746] dark:text-[#C4C7C5]
              md:text-base
            "
          >
            Read my latest project descriptions, updates, and thoughts.
          </p>
        </header>

        {/* ═══════════════ STICKY SEARCH ═══════════════ */}
        <div role="search" className="sticky top-20 z-40 sm:top-24">
          <div className="max-w-xl">
            <div
              data-has-content={hasContent ? "true" : undefined}
              className={`
                group relative flex items-center gap-3 overflow-hidden
                rounded-full py-1.5 pl-1.5 pr-1.5 ${SURFACE}
                transition-all duration-500 ${EASE}
                max-md:w-[62px]
                max-md:focus-within:w-full
                max-md:data-[has-content=true]:w-full
                md:w-full
              `}
            >
              <label
                htmlFor="blog-search"
                className={`
                  grid h-10 w-10 shrink-0 cursor-text place-items-center
                  rounded-full ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  transition-all duration-300 ${SPRING}
                  group-focus-within:rounded-[12px]
                `}
              >
                <Search className="h-[22px] w-[22px]" aria-hidden="true" />
              </label>

              <input
                id="blog-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, keywords, titles…"
                aria-label="Search articles"
                className="
                  min-w-0 flex-1 bg-transparent py-2 text-sm font-medium
                  text-[#1F1F1F] outline-none
                  placeholder:text-[#747775]
                  dark:text-[#E3E3E3] dark:placeholder:text-[#8E918F]
                  sm:text-base
                "
              />

              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className={`
                    grid h-8 w-8 shrink-0 place-items-center rounded-full
                    text-[#1F1F1F] dark:text-[#E3E3E3]
                    hover:bg-black/[0.06] dark:hover:bg-white/[0.10]
                    transition-all duration-300 ${EASE}
                    active:scale-90 active:rounded-[10px]
                    ${FOCUS}
                  `}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <span
                  className={`
                    hidden shrink-0 items-center gap-1.5 rounded-full
                    ${SUBTLE} px-3 py-1.5 text-[11px] font-semibold
                    text-[#444746] dark:text-[#C4C7C5]
                    sm:inline-flex
                  `}
                >
                  <kbd className="font-sans text-[10px] tracking-wider">
                    Type to filter
                  </kbd>
                </span>
              )}
            </div>

            {search && (
              <p
                className="
                  mt-3 pl-2 text-xs font-medium
                  text-[#747775] dark:text-[#8E918F]
                "
              >
                {totalResults === 0
                  ? "No matching results"
                  : `${totalResults} result${totalResults === 1 ? "" : "s"} found`}
              </p>
            )}
          </div>
        </div>

        {/* ═══════════════ FEED ═══════════════ */}
        <div className="mt-8 space-y-12 md:mt-10 md:space-y-16">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title}>
                {/* Section header */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`
                      grid h-10 w-10 shrink-0 place-items-center rounded-[14px]
                      ${SOLID}
                      shadow-[0_2px_6px_rgba(0,0,0,0.12)]
                      transition-transform duration-300 ${SPRING}
                    `}
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2
                      className="
                        h-font truncate text-xl font-bold tracking-tight
                        text-[#1F1F1F] dark:text-[#E3E3E3]
                        md:text-2xl
                      "
                    >
                      {section.title}
                    </h2>
                    <p className="text-[11px] font-medium text-[#747775] dark:text-[#8E918F]">
                      {section.items.length}{" "}
                      {section.items.length === 1 ? "article" : "articles"}
                    </p>
                  </div>
                </div>

                {/* ═══════════════ REDESIGNED ARTICLE CARDS (Material/Pixel UI) ═══════════════ */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blogs/${item.slug}`}
                      className={`
                        group relative flex flex-col items-center justify-between
                        overflow-hidden rounded-[32px] p-8 text-center
                        ${SURFACE}
                        
                        transition-all duration-300 ${EASE}
                        hover:-translate-y-1 hover:shadow-md
                        active:scale-[0.98]
                        ${FOCUS}
                      `}
                    >
                      {/* Blue Accent Bar (Matches Image) */}
                      <div className="absolute left-1 top-1/2 h-16 w-1.5 -translate-y-1/2 rounded-full dark:bg-blue-500 bg-[#531313]" />

                      {/* Text Content */}
                      <div className="flex w-full flex-col items-center">
                        <h3 className="mb-3 text-xl font-bold h-font tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3]">
                          {item.title}
                        </h3>
                        <p className="mb-8 line-clamp-4 max-w-sm text-md font-normal leading-relaxed text-[#444746] dark:text-[#C4C7C5]">
                          {item.description}
                        </p>
                      </div>

                      {/* Buttons (Matches Image Exactly - No Glow) */}
                      <div className="mt-auto flex items-center justify-center gap-1">
                        {/* Pencil Icon Button */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-l-2xl rounded-r-md bg-[#531313] dark:bg-blue-500 dark:text-black text-gray-100 transition-colors duration-200  active:scale-95">
                          <Pencil className="h-5 w-5" aria-hidden="true" />
                        </div>
                        {/* Read Button */}
                        <div className="flex h-12 items-center justify-center rounded-r-2xl dark:bg-blue-500 dark:text-black rounded-l-md bg-[#531313] px-8 text-base font-bold text-gray-100 transition-colors duration-200  active:scale-95">
                          Read
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          ) : (
            /* ═══════════════ EMPTY STATE ═══════════════ */
            <div
              className={`
                ${SURFACE} rounded-[28px] p-10 text-center
                sm:p-14
              `}
            >
              <span
                className={`
                  mx-auto mb-4 grid h-14 w-14 place-items-center rounded-[18px]
                  ${SOLID}
                `}
              >
                <Search className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3
                className="
                  h-font text-lg font-bold tracking-tight
                  text-[#1F1F1F] dark:text-[#E3E3E3]
                "
              >
                No results found
              </h3>
              <p
                className="
                  mx-auto mt-2 max-w-sm text-sm leading-7
                  text-[#444746] dark:text-[#C4C7C5]
                "
              >
                Nothing matches{" "}
                <span className="font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  &ldquo;{search}&rdquo;
                </span>
                . Try a different keyword.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className={`
                  mt-6 inline-flex items-center gap-2 rounded-full
                  ${SOLID} px-4 py-2.5 text-sm font-semibold
                  shadow-sm
                  transition-all duration-300 ${EASE}
                  hover:brightness-110
                  active:scale-[0.95] active:rounded-[18px]
                  ${FOCUS}
                `}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
