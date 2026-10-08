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
import { FileText } from "lucide-react";
import CodeBlock from "@/app/components/CodeBlock";

type Props = { params: Promise<{ slug?: string[] }> };

/* ─────────────────────────────────────────────────────────────
   Editorial UI · matches BlogsFeed exactly

   · Flat, high-contrast, bold typography — no soft cards.
   · Section breaks marked by `border-b-2` in the ink colour.
   · One accent: blue-700 / blue-400 — links only.
   · Motion: 300 ms cubic-bezier(0.2,0,0,1).
   · Fully responsive from 320 px up.
   ───────────────────────────────────────────────────────────── */

/* ── Ink & type ───────────────────────────────────────── */
const TEXT = "text-[#111] dark:text-[#eee]";
const TEXT_MUTED = "text-[#444] dark:text-[#ccc]";
const TEXT_SUBTLE = "text-[#555] dark:text-[#aaa]";

const ACCENT_TEXT = "text-blue-700 dark:text-blue-400";
const ACCENT_HOVER = "hover:text-blue-900 dark:hover:text-blue-300";

/* ── Rules ─────────────────────────────────────────────── */
const RULE_STRONG = "border-[#1f1f1f] dark:border-[#e3e3e3]";
const RULE_SOFT = "border-black/[0.12] dark:border-white/[0.18]";

/* ── Motion ───────────────────────────────────────────── */
const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

/* ── Shell — shared between list & article views ──────── */
const SHELL =
  "min-h-screen bg-[#FAFAFA] text-[#111] " +
  "selection:bg-[#111] selection:text-white " +
  "dark:bg-black dark:text-[#eee] " +
  "dark:selection:bg-[#eee] dark:selection:text-[#111]";

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

function omitNode<T extends object>(props: T): Omit<T, "node"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, ...rest } = props as T & { node?: unknown };
  return rest;
}

/* ─────────────────────────────────────────────────────────
   MARKDOWN COMPONENTS · editorial register
   ───────────────────────────────────────────────────────── */
const components: Components = {
  /* ── Headings ─────────────────────────────────────────── */
  h1: (p) => (
    <h1
      className={`mt-12 mb-6 scroll-mt-24 text-3xl font-extrabold tracking-tight sm:text-4xl ${TEXT}`}
      {...omitNode(p)}
    />
  ),

  h2: (p) => (
    <h2
      className={`
        mt-14 mb-6 scroll-mt-24 border-b-2 ${RULE_STRONG} pb-3
        text-xl font-bold uppercase tracking-widest
        sm:text-2xl ${TEXT}
      `}
      {...omitNode(p)}
    />
  ),

  h3: (p) => (
    <h3
      className={`mt-10 mb-4 scroll-mt-24 text-lg font-bold tracking-tight sm:text-xl ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h4: (p) => (
    <h4
      className={`mt-8 mb-3 scroll-mt-24 text-base font-bold tracking-tight ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h5: (p) => (
    <h5
      className={`mt-6 mb-2 scroll-mt-24 text-sm font-bold uppercase tracking-wider ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h6: (p) => (
    <h6
      className={`mt-6 mb-2 scroll-mt-24 text-xs font-bold uppercase tracking-widest ${TEXT_SUBTLE}`}
      {...omitNode(p)}
    />
  ),

  /* ── Text ─────────────────────────────────────────────── */
  p: (p) => (
    <p
      className={`my-5 break-words text-base leading-relaxed md:text-lg ${TEXT_MUTED}`}
      {...omitNode(p)}
    />
  ),
  strong: (p) => <strong className={`font-bold ${TEXT}`} {...omitNode(p)} />,
  em: (p) => <em className="italic" {...omitNode(p)} />,
  del: (p) => (
    <del
      className={`line-through decoration-2 ${TEXT_SUBTLE}`}
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className={`
        font-bold underline decoration-2 underline-offset-4
        ${ACCENT_TEXT} ${ACCENT_HOVER}
        transition-colors duration-300 ${EASE}
      `}
      {...omitNode(p)}
    />
  ),

  /* ── Lists ────────────────────────────────────────────── */
  ul: (p) => (
    <ul
      className={`
        my-5 list-outside list-disc space-y-2 pl-6
        text-base leading-relaxed md:text-lg ${TEXT_MUTED}
        marker:text-[#1f1f1f] dark:marker:text-[#e3e3e3]
      `}
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className={`
        my-5 list-outside list-decimal space-y-2 pl-6
        text-base leading-relaxed md:text-lg ${TEXT_MUTED}
        marker:font-bold marker:text-[#1f1f1f] dark:marker:text-[#e3e3e3]
      `}
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-relaxed" {...omitNode(p)} />,

  /* ── Blockquote / HR ──────────────────────────────────── */
  blockquote: (p) => (
    <blockquote
      className={`
        my-8 border-l-4 ${RULE_STRONG} pl-5 sm:pl-6
        text-base leading-relaxed md:text-lg ${TEXT_MUTED}
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2
      `}
      {...omitNode(p)}
    />
  ),
  hr: () => <hr className={`my-12 border-0 border-t-2 ${RULE_STRONG}`} />,

  /* ── Code ─────────────────────────────────────────────── */
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
        className={`
          break-words rounded bg-black/[0.06] px-1.5 py-0.5
          font-mono text-[0.85em] font-semibold ${TEXT}
          dark:bg-white/[0.1]
        `}
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  /* ── Tables ───────────────────────────────────────────── */
  table: (p) => (
    <div className="my-8 w-full overflow-x-auto">
      <table
        className="w-full min-w-[600px] border-collapse text-[0.9375rem]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead className={`border-b-2 ${RULE_STRONG} ${TEXT}`} {...omitNode(p)} />
  ),
  tbody: (p) => <tbody {...omitNode(p)} />,
  th: (p) => (
    <th
      className={`
        whitespace-nowrap px-4 py-3 text-left text-xs font-bold
        uppercase tracking-wider ${TEXT}
      `}
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className={`
        border-b ${RULE_SOFT} px-4 py-3 align-top ${TEXT_MUTED}
      `}
      {...omitNode(p)}
    />
  ),

  /* ── Media ────────────────────────────────────────────── */
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`
        my-8 h-auto w-full rounded-lg border
        border-black/[0.08] dark:border-white/[0.12]
      `}
      alt=""
      {...omitNode(p)}
    />
  ),

  /* ── Task-list checkbox ───────────────────────────────── */
  input: (p) => (
    <input
      className="mr-2 h-4 w-4 translate-y-[2px] accent-[#1f1f1f] dark:accent-[#e3e3e3]"
      {...omitNode(p)}
    />
  ),
};

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */
export default async function DocPage({ params }: Props) {
  const { slug } = await params;

  /* ==========================================
     VIEW 1 · INDEX (LIST OF ALL BLOGS)
     ========================================== */
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

  /* ==========================================
     VIEW 2 · INDIVIDUAL BLOG POST
     ========================================== */
  const doc = getDoc(slug[0]);
  if (!doc) notFound();

  const hasHeader = Boolean(doc.meta.title || doc.meta.description);

  return (
    <div className={SHELL}>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-16 lg:py-20">
        {/* ── Back link — mirrors BlogsFeed's editorial nav ── */}
        <nav className="mb-10">
          <Link
            href="/blogs"
            aria-label="Return to all articles"
            className={`
              group inline-flex items-center gap-2
              text-xs font-bold uppercase tracking-wider
              ${TEXT_SUBTLE} hover:text-[#111]
              dark:hover:text-[#eee]
              transition-colors duration-300 ${EASE}
              focus-visible:outline-none focus-visible:underline
              focus-visible:decoration-2 focus-visible:underline-offset-4
            `}
          >
            <IoArrowBack
              className={`
                h-4 w-4 transition-transform duration-300 ${EASE}
                group-hover:-translate-x-0.5
              `}
              aria-hidden="true"
            />
            <span>Back to all articles</span>
          </Link>
        </nav>

        <article className="min-w-0 max-w-full">
          {/* ── Article header ─────────────────────────────── */}
          {hasHeader && (
            <header className="mb-10 space-y-4 md:mb-14">
              {/* Kicker — matches "N Articles Published" row */}
              <div
                className={`
                  flex items-center gap-2 text-xs font-bold
                  uppercase tracking-wider ${TEXT_SUBTLE}
                `}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Article</span>
              </div>

              {doc.meta.title && (
                <h1
                  className={`
                    text-3xl font-extrabold tracking-tight
                    sm:text-4xl md:text-5xl ${TEXT}
                    break-words
                  `}
                >
                  {doc.meta.title}
                </h1>
              )}

              {doc.meta.description && (
                <p
                  className={`
                    max-w-2xl text-base leading-relaxed md:text-lg
                    ${TEXT_MUTED}
                  `}
                >
                  {doc.meta.description}
                </p>
              )}

              {/* Signature rule — mirrors the section header rule */}
              <div className={`border-b-2 ${RULE_STRONG}`} />
            </header>
          )}

          {/* ── Body ───────────────────────────────────────── */}
          <div className="max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={components}
            >
              {doc.content}
            </Markdown>
          </div>
        </article>
      </main>

      {/* ── Footer — same editorial register ─────────────── */}
      <footer
        className={`
          mx-auto max-w-3xl px-4 pb-10 pt-6 text-center
          text-xs font-bold uppercase tracking-wider
          sm:px-6 ${TEXT_SUBTLE}
        `}
      >
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
