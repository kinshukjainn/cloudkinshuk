"use client";

import { useState } from "react";
import Link from "next/link";

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

  return (
    <div className="flex flex-col space-y-12">
      <header className="border-b border-neutral-300 dark:border-neutral-800 pb-8 space-y-6">
        <div>
          <h1 className="text-4xl h-font font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Blogs / Article
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Read my latest projects descriptions, updates, and thoughts.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles and projects..."
            className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 py-3 pl-10 pr-4 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-800 transition-all"
          />
        </div>
      </header>

      <div className="flex flex-col gap-12">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <section key={section.title} className="flex flex-col  gap-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 h-font dark:text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                {section.title}
              </h2>
              <div className="flex flex-col gap-10">
                {section.items.map((item) => (
                  <article
                    key={item.slug}
                    className="group flex flex-col gap-2  border-l-2 dark:border-[#333333]  p-3   border-gray-400  "
                  >
                    <Link href={`/blogs/${item.slug}`} className="">
                      <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white h-font group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    {item.description && (
                      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline underline-offset-4 w-fit mt-1"
                    >
                      Read more →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
            No articles found matching &quot;{search}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
