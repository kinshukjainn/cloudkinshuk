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
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-neutral-900 dark:text-neutral-200 selection:bg-blue-200 dark:selection:bg-blue-900 selection:text-black dark:selection:text-white">
      <header className="mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
          All Blogs :
        </h1>
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl leading-relaxed">
          Read my latest project descriptions, updates, and thoughts.
        </p>

        {/* Minimalist Search Input */}
        <div className="max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search / Find Article , Keyword , Title"
            className="w-full bg-transparent border-b-2 border-neutral-400 dark:border-[#404040] focus:border-blue-600 dark:focus:border-blue-400 px-3 py-2 text-base focus:outline-none transition-colors rounded-none"
          />
        </div>
      </header>

      <div className="space-y-16">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-black dark:text-white mb-6 border-b border-neutral-300 dark:border-neutral-800 pb-2">
                {section.title}
              </h2>
              <div className="space-y-10">
                {section.items.map((item) => (
                  <article key={item.slug} className="flex flex-col gap-1.5">
                    <Link href={`/blogs/${item.slug}`}>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        {item.title}
                      </h3>
                    </Link>
                    {item.description && (
                      <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-base text-neutral-500">
            No results found matching &quot;{search}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
