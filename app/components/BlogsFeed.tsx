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
    <div className="mx-auto max-w-4xl px-6 py-16 text-[#1f1f1f] selection:bg-[#d3e3fd] selection:text-[#0842a0] dark:text-[#e3e3e3] dark:selection:bg-[#004a77] dark:selection:text-[#d3e3fd] md:py-24">
      <header className="mb-16">
        <h1 className="mb-4 text-5xl font-bold h-font tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] md:text-5xl">
          Blogs, Project Descriptions, Thoughts
        </h1>
        <p className="mb-8 max-w-3xl text-base leading-7 text-[#444746] dark:text-[#c4c7c5] md:text-lg">
          Read my latest project descriptions, updates, and thoughts.
        </p>

        {/* Material 3 outlined search field */}
        <div className="max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles, keywords, titles"
            className="w-full rounded-full border border-[#c4c7c5] bg-transparent px-5 py-3 text-base text-[#1f1f1f] placeholder:text-[#747775] transition-colors focus:border-[#0b57d0] focus:outline-none focus:ring-1 focus:ring-[#0b57d0] dark:border-[#444746] dark:text-[#e3e3e3] dark:placeholder:text-[#8e918f] dark:focus:border-[#a8c7fa] dark:focus:ring-[#a8c7fa]"
          />
        </div>
      </header>

      <div className="space-y-16">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-6 border-b border-[#e0e3e7] pb-3 text-2xl h-font font-medium text-[#1f1f1f] dark:border-[#2d2f31] dark:text-[#e3e3e3]">
                {section.title}
              </h2>
              <div className="space-y-10">
                {section.items.map((item) => (
                  <article key={item.slug} className="flex flex-col gap-1.5">
                    <Link href={`/blogs/${item.slug}`}>
                      <h3 className="text-lg font-medium text-[#0b57d0] transition-colors hover:text-[#0842a0] hover:underline dark:text-[#a8c7fa] dark:hover:text-[#d3e3fd] md:text-xl">
                        {item.title}
                      </h3>
                    </Link>
                    {item.description && (
                      <p className="max-w-3xl text-base leading-7 text-[#444746] dark:text-[#c4c7c5]">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-base text-[#747775] dark:text-[#8e918f]">
            No results found matching &quot;{search}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
