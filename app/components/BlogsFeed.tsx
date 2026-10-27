"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

type Article = {
  title: string;
  slug: string;
  description: string;
};

type Section = {
  title: string;
  items: Article[];
};

/* ── Design tokens (identical to homepage + header) ─────── */
const TOKENS = {
  "--bg": "#0d0d0c",
  "--fg": "#d6d1c6",
  "--head": "#f2eee5",
  "--muted": "#8b867c",
  "--accent": "#d0a869",
  "--accent-hover": "#e8c98f",
  "--rule": "#272521",
} as React.CSSProperties;

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]";

const PROSE = "text-[15px] leading-7 sm:text-base sm:leading-8";

const MONO = " text-[14px] font-semibold  tracking-[0.16em] text-white";

const RULE = "border-[var(--rule)]";

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
    <div
      style={TOKENS}
      className="min-h-screen bg-[#1B1B1D] text-[var(--fg)] selection:bg-[var(--accent)] selection:text-[var(--bg)]"
    >
      <main className="mx-auto w-full max-w-[680px] px-5 py-12 sm:px-8 sm:py-16">
        {/* ── Header ───────────────────────────────────── */}
        <header>
          <p className={MONO}>
            Blogs · {totalArticles}{" "}
            {totalArticles === 1 ? "Article" : "Articles"}
          </p>

          <h1 className="mt-3  text-[28px] leading-tight font-bold tracking-tight text-[var(--head)] sm:text-4xl">
            Blogs, Notes &{" "}
            <span className=" text-[var(--muted)]">Thoughts</span>
          </h1>

          <p className={`mt-4 ${PROSE}`}>
            Read my latest project descriptions, technical notes, and updates.
          </p>
        </header>

        {/* ── Search ───────────────────────────────────── */}
        <div className="mt-10">
          <label htmlFor="blog-search" className={MONO}>
            Search your blog
          </label>

          <div
            className={`mt-2 flex items-center gap-2 bg-[#121212] px-3 py-2 rounded-full pb-2  ${RULE}`}
          >
            <Search
              className="h-4 w-4 shrink-0 text-[var(--muted)] "
              aria-hidden="true"
            />
            <input
              id="blog-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="title, keyword…"
              aria-label="Search articles"
              className="w-full min-w-0  text-[15px] text-[var(--head)] placeholder:text-[var(--muted)] focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className={`shrink-0 text-[var(--muted)] transition-colors hover:text-[var(--accent)] ${FOCUS}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {search && (
            <p className={`mt-3 ${MONO}`}>
              {totalResults === 0
                ? "no results"
                : `${totalResults} result${totalResults === 1 ? "" : "s"}`}
            </p>
          )}
        </div>

        {/* ── Feed ─────────────────────────────────────── */}
        <div className="mt-12">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.title} className="mb-12 last:mb-0">
                <div
                  className={`mb-1 flex items-baseline justify-between gap-4 border-b pb-2 ${RULE}`}
                >
                  <h2 className=" text-xl leading-snug font-semibold text-[var(--head)]">
                    {section.title}
                  </h2>
                  <span className={`shrink-0 ${MONO}`}>
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "entry" : "entries"}
                  </span>
                </div>

                <ul>
                  {section.items.map((item) => (
                    <li
                      key={item.slug}
                      className={`border-b last:border-b-0 ${RULE}`}
                    >
                      <Link
                        href={`/blogs/${item.slug}`}
                        className={`group block py-5 ${FOCUS}`}
                      >
                        <h3 className=" text-lg leading-snug text-[var(--head)] font-semibold transition-colors group-hover:text-blue-300">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 line-clamp-2 text-[15px] leading-7 text-[var(--muted)]">
                          {item.description}
                        </p>

                        <span className="mt-2 inline-flex items-center gap-1.5 text-[15px] text-blue-500 font-medium transition-colors group-hover:text-blue-300">
                          Read
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          ) : (
            /* ── Empty state ──────────────────────────── */
            <div className="py-16 text-center">
              <p className=" text-lg text-[var(--head)]">
                No matching articles
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-7 text-[var(--muted)]">
                Nothing matched &ldquo;{search}&rdquo;. Try a different keyword.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className={`mt-5 text-[13px] text-[var(--accent)] underline decoration-1 underline-offset-4 transition-colors hover:text-[var(--accent-hover)] ${FOCUS}`}
              >
                clear filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
