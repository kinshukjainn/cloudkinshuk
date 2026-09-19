import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getDoc, getAllSlugs } from "@/lib/blogs";
import { navigation } from "@/lib/navigation";
import BlogFeed from "@/app/components/BlogsFeed";
import { IoArrowBack } from "react-icons/io5";
import CodeBlock from "@/app/components/CodeBlock";

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  const paths = getAllSlugs().map((slug) => ({ slug: [slug] }));
  paths.push({ slug: [] });
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return { title: "Blog", description: "Our latest articles and thoughts." };
  }

  const doc = getDoc(slug[0]);
  return { title: doc?.meta.title, description: doc?.meta.description };
}

// Strips react-markdown's `node` prop so it isn't passed to the DOM.
function omitNode<T extends object>(props: T): Omit<T, "node"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, ...rest } = props as T & { node?: unknown };
  return rest;
}

const components: Components = {
  /* ---------------------------------- Headings --------------------------------- */
  h1: (p) => (
    <h1
      className="mt-14 mb-6 scroll-mt-24 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-[2.75rem] md:leading-[1.1]"
      {...omitNode(p)}
    />
  ),
  h2: (p) => (
    <h2
      className="mt-14 mb-5 scroll-mt-24 border-b border-zinc-200/80 pb-2.5 text-2xl font-semibold tracking-tight text-zinc-900 dark:border-zinc-800/80 dark:text-zinc-50 md:text-[1.75rem] md:leading-tight"
      {...omitNode(p)}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[1.25rem]"
      {...omitNode(p)}
    />
  ),
  h4: (p) => (
    <h4
      className="mt-8 mb-2 scroll-mt-24 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      {...omitNode(p)}
    />
  ),
  h5: (p) => (
    <h5
      className="mt-6 mb-2 scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
      {...omitNode(p)}
    />
  ),
  h6: (p) => (
    <h6
      className="mt-6 mb-2 scroll-mt-24 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
      {...omitNode(p)}
    />
  ),

  /* ----------------------------------- Text ----------------------------------- */
  p: (p) => (
    <p
      className="my-5 break-words text-[1.0625rem] leading-[1.8] text-zinc-700 dark:text-zinc-300"
      {...omitNode(p)}
    />
  ),
  strong: (p) => (
    <strong
      className="font-semibold text-zinc-900 dark:text-zinc-50"
      {...omitNode(p)}
    />
  ),
  em: (p) => (
    <em className="italic text-zinc-700 dark:text-zinc-300" {...omitNode(p)} />
  ),
  del: (p) => (
    <del
      className="text-zinc-500 line-through decoration-zinc-400/70 dark:text-zinc-500 dark:decoration-zinc-600"
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="font-medium text-blue-600 underline decoration-blue-600/30 decoration-1 underline-offset-[3px] transition-colors hover:text-blue-700 hover:decoration-blue-700/70 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:hover:decoration-blue-300/70"
      {...omitNode(p)}
    />
  ),

  /* ---------------------------------- Lists ---------------------------------- */
  ul: (p) => (
    <ul
      className="my-5 list-outside list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.8] text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600"
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="my-5 list-outside list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.8] text-zinc-700 marker:font-medium marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-500"
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-[1.8]" {...omitNode(p)} />,

  /* ------------------------------ Blockquotes / HR ---------------------------- */
  blockquote: (p) => (
    <blockquote
      className="my-8 rounded-r-xl border-l-4 border-blue-500/70 bg-blue-50/60 px-5 py-4 text-[1.0625rem] leading-[1.8] text-zinc-700 dark:border-blue-400/60 dark:bg-blue-950/20 dark:text-zinc-300 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2"
      {...omitNode(p)}
    />
  ),
  hr: () => (
    <hr className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
  ),

  /* ---------------------------------- Code ---------------------------------- */
  // Code blocks are rendered through `CodeBlock`, which owns the wrapper,
  // the copy button, and the light/dark syntax theme (driven by CSS vars).
  pre: (p) => {
    const { children } = omitNode(p);
    return <CodeBlock>{children}</CodeBlock>;
  },
  code: ({ className, children, ...rest }) => {
    const isBlock =
      /language-/.test(className ?? "") || /hljs/.test(className ?? "");
    if (isBlock)
      return (
        <code className={`font-mono ${className ?? ""}`} {...omitNode(rest)}>
          {children}
        </code>
      );
    return (
      <code
        className="break-words rounded-md border border-zinc-200/80 bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-pink-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-pink-400"
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  /* ---------------------------------- Tables -------------------------------- */
  table: (p) => (
    <div className="my-8 block w-full max-w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
      <table
        className="w-full min-w-[600px] border-collapse text-[0.9375rem]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead className="bg-zinc-50 dark:bg-zinc-900/70" {...omitNode(p)} />
  ),
  tbody: (p) => (
    <tbody
      className="[&>tr:nth-child(even)]:bg-zinc-50/60 dark:[&>tr:nth-child(even)]:bg-zinc-900/30 [&>tr:hover]:bg-zinc-100/70 dark:[&>tr:hover]:bg-zinc-900/60"
      {...omitNode(p)}
    />
  ),
  th: (p) => (
    <th
      className="whitespace-nowrap border-b border-zinc-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="border-b border-zinc-100 px-4 py-3 align-top text-zinc-700 dark:border-zinc-800/60 dark:text-zinc-300"
      {...omitNode(p)}
    />
  ),

  /* ---------------------------------- Media --------------------------------- */
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-8 h-auto w-full rounded-xl bg-zinc-100 object-cover shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800 sm:object-contain"
      alt=""
      {...omitNode(p)}
    />
  ),

  /* ------------------------------ Task list input --------------------------- */
  input: (p) => (
    <input
      className="mr-2 h-4 w-4 translate-y-[2px] accent-blue-600 dark:accent-blue-400"
      {...omitNode(p)}
    />
  ),
};

export default async function DocPage({ params }: Props) {
  const { slug } = await params;

  // ==========================================
  // VIEW 1: INDEX PAGE (LIST OF ALL BLOGS)
  // ==========================================
  if (!slug || slug.length === 0) {
    const sectionsData = navigation.map((section) => ({
      title: section.title,
      items: section.items.map((item) => {
        const doc = getDoc(item.slug);
        return {
          title: item.title,
          slug: item.slug,
          description: doc?.meta.description || "",
        };
      }),
    }));

    return <BlogFeed sections={sectionsData} />;
  }

  // ==========================================
  // VIEW 2: INDIVIDUAL BLOG POST PAGE
  // ==========================================
  const doc = getDoc(slug[0]);
  if (!doc) notFound();

  return (
    <article className="min-w-0 max-w-full bg-white dark:bg-[#1f1f1f]">
      {/* Sticky back button */}
      <div className="sticky top-20 z-30 -mx-4 mb-6 flex px-4 py-3 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition-colors hover:bg-white dark:border-zinc-700 dark:bg-black/40 dark:text-white dark:hover:bg-black/60"
        >
          <IoArrowBack className="text-base" />
          <span>Return</span>
        </Link>
      </div>

      {/* Content wrapper keeps horizontal overflow contained */}
      <div className="overflow-hidden">
        {(doc.meta.title || doc.meta.description) && (
          <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
            {doc.meta.title && (
              <h1 className="h-font text-[2rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-[2.75rem] md:leading-[1.15]">
                {doc.meta.title}
              </h1>
            )}
            {doc.meta.description && (
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400 md:text-lg">
                {doc.meta.description}
              </p>
            )}
          </header>
        )}

        <div className="prose-container max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={components}
          >
            {doc.content}
          </Markdown>
        </div>
      </div>
    </article>
  );
}
