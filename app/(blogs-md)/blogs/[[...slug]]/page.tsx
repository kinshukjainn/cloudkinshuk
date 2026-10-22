import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { IoArrowBack } from "react-icons/io5";
import { FileText, Clock } from "lucide-react";
import { getDoc, getAllSlugs } from "@/lib/blogs";
import { navigation } from "@/lib/navigation";
import BlogFeed from "@/app/components/BlogsFeed";
import CodeBlock from "@/app/components/CodeBlock";

type Props = { params: Promise<{ slug?: string[] }> };

/* ─────────────────────────────────────────────────────────────
   Docs-style article page

   Layout:
     lg+   →  [TOC 200px]  [Article ≤720px]  (left-aligned grid)
     < lg  →  [Article full-width, centered]

   Type:     17px body / 1.75 line-height on ≥ sm
   Anchors:  Hover-revealed `#` links on H2 & H3
   Callouts: Blockquotes become tinted quote blocks
   ───────────────────────────────────────────────────────────── */

/* ── Shell ─────────────────────────────────────────────────── */
const SHELL =
  "min-h-screen bg-white text-zinc-900 " +
  "selection:bg-zinc-900 selection:text-white " +
  "dark:bg-zinc-950 dark:text-zinc-50 " +
  "dark:selection:bg-zinc-50 dark:selection:text-zinc-900";

/* ── Slug helpers ─────────────────────────────────────────── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function nodeToText(node: ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement(node)) {
    return nodeToText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function stripMarkdown(text: string): string {
  return text.replace(/[`*_~]/g, "");
}

type Heading = { level: 2 | 3; text: string; id: string };

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = stripMarkdown(match[2].trim());
    const id = slugify(text);
    if (id) headings.push({ level, text, id });
  }
  return headings;
}

/* ── Small type helpers ───────────────────────────────────── */
const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const HEAD_ID_OFFSET = "scroll-mt-24";

const ANCHOR_CLASS =
  "absolute -left-7 hidden text-zinc-300 opacity-0 transition-opacity duration-150 " +
  "hover:text-zinc-900 group-hover:opacity-100 lg:block " +
  "dark:text-zinc-600 dark:hover:text-zinc-100";

/* ── Metadata ─────────────────────────────────────────────── */
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

/* ── Strip markdown `node` prop ──────────────────────────── */
function omitNode<T extends object>(props: T): Omit<T, "node"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, ...rest } = props as T & { node?: unknown };
  return rest;
}

const anchorHeading = (Tag: "h1" | "h2" | "h3" | "h4") =>
  function HeadingWithAnchor({ children, ...rest }: { children?: ReactNode }) {
    const text = nodeToText(children);
    const id = slugify(text);
    const showAnchor = Tag === "h2" || Tag === "h3";

    const baseClass =
      Tag === "h1"
        ? `mt-14 mb-6 ${HEAD_ID_OFFSET} text-3xl font-semibold tracking-tight sm:text-4xl`
        : Tag === "h2"
          ? `group relative mt-16 mb-6 ${HEAD_ID_OFFSET} text-2xl font-semibold tracking-tight sm:text-[1.75rem]`
          : Tag === "h3"
            ? `group relative mt-10 mb-4 ${HEAD_ID_OFFSET} text-xl font-semibold tracking-tight`
            : `mt-8 mb-3 ${HEAD_ID_OFFSET} text-base font-semibold tracking-tight`;

    return (
      <Tag
        id={id}
        className={`${baseClass} text-zinc-900 dark:text-zinc-50`}
        {...omitNode(rest)}
      >
        {showAnchor && id && (
          <a
            href={`#${id}`}
            aria-label={`Link to ${text}`}
            className={ANCHOR_CLASS}
          >
            #
          </a>
        )}
        {children}
      </Tag>
    );
  };

/* ─────────────────────────────────────────────────────────
   Markdown components · docs register
   ───────────────────────────────────────────────────────── */
const components: Components = {
  /* ── Headings ─────────────────────────────────────────── */
  h1: anchorHeading("h1"),
  h2: anchorHeading("h2"),
  h3: anchorHeading("h3"),
  h4: anchorHeading("h4"),
  h5: (p) => (
    <h5
      className={`mt-6 mb-2 ${HEAD_ID_OFFSET} text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400`}
      {...omitNode(p)}
    />
  ),
  h6: (p) => (
    <h6
      className={`mt-6 mb-2 ${HEAD_ID_OFFSET} text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400`}
      {...omitNode(p)}
    />
  ),

  /* ── Text ─────────────────────────────────────────────── */
  p: (p) => (
    <p
      className="my-5 break-words text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-[17px] sm:leading-[1.75]"
      {...omitNode(p)}
    />
  ),
  strong: (p) => (
    <strong
      className="font-semibold text-zinc-900 dark:text-zinc-50"
      {...omitNode(p)}
    />
  ),
  em: (p) => <em className="italic" {...omitNode(p)} />,
  del: (p) => (
    <del
      className="line-through decoration-2 text-zinc-500 dark:text-zinc-400"
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="
        font-medium underline decoration-zinc-400 decoration-[1.5px] underline-offset-[3px]
        text-zinc-900 transition-colors duration-150 hover:decoration-zinc-900
        dark:text-zinc-100 dark:decoration-zinc-500 dark:hover:decoration-zinc-100
      "
      {...omitNode(p)}
    />
  ),

  /* ── Lists ────────────────────────────────────────────── */
  ul: (p) => (
    <ul
      className="
        my-5 list-outside list-disc space-y-2 pl-6
        text-base leading-7 text-zinc-700 sm:text-[17px] sm:leading-[1.75]
        dark:text-zinc-300 marker:text-zinc-400 dark:marker:text-zinc-500
      "
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="
        my-5 list-outside list-decimal space-y-2 pl-6
        text-base leading-7 text-zinc-700 sm:text-[17px] sm:leading-[1.75]
        dark:text-zinc-300 marker:font-medium marker:text-zinc-500 dark:marker:text-zinc-400
      "
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-7" {...omitNode(p)} />,

  /* ── Blockquote → tinted callout ───────────────────────── */
  blockquote: (p) => (
    <blockquote
      className="
        my-8 border-l-2 border-zinc-900 bg-zinc-50 py-4 pl-5 pr-4
        text-base leading-7 text-zinc-700 sm:text-[17px] sm:leading-[1.75]
        dark:border-zinc-100 dark:bg-zinc-900/50 dark:text-zinc-300
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2
      "
      {...omitNode(p)}
    />
  ),
  hr: () => (
    <hr className="my-14 border-0 border-t border-zinc-200 dark:border-zinc-800" />
  ),

  /* ── Code ─────────────────────────────────────────────── */
  pre: (p) => {
    const { children } = omitNode(p);
    return <CodeBlock>{children}</CodeBlock>;
  },
  code: ({ className, children, ...rest }) => {
    const isBlock =
      /language-/.test(className ?? "") || /hljs/.test(className ?? "");
    if (isBlock) {
      return (
        <code className={`monofont ${className ?? ""}`} {...omitNode(rest)}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="
          break-words rounded border border-zinc-200/80 bg-zinc-100 px-1.5 py-0.5
          monofont text-[0.85em] font-medium text-zinc-900
          dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-100
        "
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  /* ── Tables ───────────────────────────────────────────── */
  table: (p) => (
    <div className="my-8 w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table
        className="w-full min-w-[560px] border-collapse text-[0.9375rem]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead
      className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
      {...omitNode(p)}
    />
  ),
  tbody: (p) => <tbody {...omitNode(p)} />,
  tr: (p) => (
    <tr
      className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
      {...omitNode(p)}
    />
  ),
  th: (p) => (
    <th
      className="
        whitespace-nowrap px-4 py-3 text-left text-xs font-semibold
        uppercase tracking-wider text-zinc-900 dark:text-zinc-50
      "
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="px-4 py-3 align-top text-zinc-700 dark:text-zinc-300"
      {...omitNode(p)}
    />
  ),

  /* ── Media ────────────────────────────────────────────── */
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-8 h-auto w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
      alt=""
      {...omitNode(p)}
    />
  ),

  /* ── Task-list checkbox ───────────────────────────────── */
  input: (p) => (
    <input
      className="mr-2 h-4 w-4 translate-y-[2px] accent-zinc-900 dark:accent-zinc-100"
      {...omitNode(p)}
    />
  ),
};

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */
export default async function DocPage({ params }: Props) {
  const { slug } = await params;

  /* ── INDEX ─────────────────────────────────────────────── */
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

  /* ── ARTICLE ───────────────────────────────────────────── */
  const doc = getDoc(slug[0]);
  if (!doc) notFound();

  const headings = extractHeadings(doc.content);
  const hasToc = headings.length > 0;

  const wordCount = doc.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className={SHELL}>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
        {/* ── Back link ───────────────────────────────── */}
        <nav className="mb-10">
          <Link
            href="/blogs"
            className={`
              group inline-flex items-center gap-2
              text-xs font-semibold uppercase tracking-wider
              text-zinc-500 transition-colors duration-200 ${EASE}
              hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100
              focus-visible:outline-none focus-visible:underline
              focus-visible:decoration-2 focus-visible:underline-offset-4
            `}
          >
            <IoArrowBack
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Back to all articles</span>
          </Link>
        </nav>

        <div
          className={
            hasToc
              ? "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-20"
              : ""
          }
        >
          {/* ── TOC sidebar (desktop only) ──────────────── */}
          {hasToc && (
            <aside aria-label="Table of contents" className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <p className="mb-3 text-md font-bold  tracking-wider text-zinc-900 dark:text-zinc-100">
                  On this page
                </p>
                <ul className="space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`
                          block leading-snug text-zinc-500 transition-colors duration-150
                          hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100
                          ${h.level === 3 ? "pl-4" : ""}
                        `}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* ── Article ──────────────────────────────────── */}
          <article className="min-w-0 max-w-[720px]">
            {/* Article header */}
            <header className="mb-12 border-b border-zinc-200 pb-10 dark:border-zinc-800 sm:mb-14 sm:pb-12">
              {/* Meta row */}
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Blog Post
                </span>
                <span
                  aria-hidden="true"
                  className="h-3.5 w-px bg-zinc-300 dark:bg-zinc-700"
                />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {readTime} min read
                </span>
              </div>

              {/* Title */}
              {doc.meta.title && (
                <h1 className="break-words text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl">
                  {doc.meta.title}
                </h1>
              )}

              {/* Description */}
              {doc.meta.description && (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl sm:leading-9">
                  {doc.meta.description}
                </p>
              )}
            </header>

            {/* Body */}
            <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={components}
              >
                {doc.content}
              </Markdown>
            </div>
          </article>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="mx-auto max-w-6xl border-t border-zinc-200 px-4 py-8 text-center text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
