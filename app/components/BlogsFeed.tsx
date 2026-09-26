"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, FileText, ArrowUpRight, X } from "lucide-react";

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
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

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

  return (
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#1F1F1F] selection:text-white
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#E3E3E3] dark:selection:text-[#1F1F1F]
      "
    >
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* ═══════════════ HEADER ═══════════════ */}
        <header className="mb-12 md:mb-16">
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
              mb-8 max-w-3xl text-sm leading-7
              text-[#444746] dark:text-[#C4C7C5]
              md:text-base
            "
          >
            Read my latest project descriptions, updates, and thoughts.
          </p>

          {/* ═══════════════ SEARCH BAR ═══════════════ */}
          <div className="max-w-xl">
            <div
              className={`
                group relative flex items-center gap-2 rounded-full
                py-1.5 pl-1.5 pr-2 ${SURFACE}
                transition-all duration-300 ${EASE}
                focus-within:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_28px_-14px_rgba(0,0,0,0.55)]
                dark:focus-within:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_12px_28px_-14px_rgba(255,255,255,0.35)]
              `}
            >
              {/* Leading icon chip — circle → squircle on focus */}
              <span
                className={`
                  grid h-10 w-10 shrink-0 place-items-center rounded-full
                  ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  transition-all duration-300 ${SPRING}
                  group-focus-within:rounded-[12px]
                `}
              >
                <Search className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>

              {/* Input */}
              <input
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

              {/* Trailing: clear button + result count */}
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

            {/* Live result hint */}
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
        </header>

        {/* ═══════════════ FEED ═══════════════ */}
        <div className="space-y-12 md:space-y-16">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title}>
                {/* Section header with icon chip */}
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

                {/* Article cards */}
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blogs/${item.slug}`}
                      className={`
                        group block ${SURFACE} rounded-[24px] p-5
                        transition-all duration-300 ${EASE}
                        hover:-translate-y-1
                        hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(0,0,0,0.6)]
                        dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(255,255,255,0.3)]
                        active:scale-[0.99] active:rounded-[20px]
                        ${FOCUS}
                      `}
                    >
                      <div className="flex items-start gap-4">
                        {/* Leading neutral chip */}
                        <span
                          className={`
                            mt-0.5 grid h-11 w-11 shrink-0 place-items-center
                            rounded-full ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                            transition-all duration-300 ${SPRING}
                            group-hover:rounded-[12px]
                          `}
                        >
                          <FileText className="h-5 w-5" aria-hidden="true" />
                        </span>

                        {/* Text block */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3
                              className="
                                text-base font-bold leading-snug tracking-tight
                                text-[#1F1F1F] dark:text-[#E3E3E3]
                                transition-colors duration-300
                                md:text-lg
                              "
                            >
                              {item.title}
                            </h3>
                            <span
                              className={`
                                mt-0.5 grid h-8 w-8 shrink-0 place-items-center
                                rounded-full text-[#1F1F1F] dark:text-[#E3E3E3]
                                transition-all duration-300 ${SPRING}
                                group-hover:rounded-[10px]
                                group-hover:bg-[#1F1F1F] group-hover:text-white
                                dark:group-hover:bg-[#E3E3E3] dark:group-hover:text-[#1F1F1F]
                              `}
                            >
                              <ArrowUpRight
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          </div>

                          {item.description && (
                            <p
                              className="
                                mt-1.5 line-clamp-2 text-sm leading-7
                                text-[#444746] dark:text-[#C4C7C5]
                              "
                            >
                              {item.description}
                            </p>
                          )}
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
                  shadow-[0_1px_3px_rgba(0,0,0,0.16),0_8px_20px_-10px_rgba(0,0,0,0.9)]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_20px_-10px_rgba(255,255,255,0.5)]
                  transition-all duration-300 ${EASE}
                  hover:brightness-125
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
