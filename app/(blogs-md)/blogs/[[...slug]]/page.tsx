import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createElement, isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { IoArrowBack } from "react-icons/io5";
import { getDoc, getAllSlugs } from "@/lib/blogs";
import { navigation } from "@/lib/navigation";
import BlogFeed from "@/app/components/BlogsFeed";
import CodeBlock from "@/app/components/CodeBlock";

type Props = { params: Promise<{ slug?: string[] }> };

/* ── Slug helpers ──────────────────────────────────────── */
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

/* ── Metadata ──────────────────────────────────────────── */
export function generateStaticParams() {
  const paths = getAllSlugs().map((slug) => ({ slug: [slug] }));
  paths.push({ slug: [] });
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return {};
  }
  const doc = getDoc(slug[0]);
  return { title: doc?.meta.title, description: doc?.meta.description };
}

/* ── Strip markdown `node` prop ────────────────────────── */
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
        ? "mt-8 mb-4 scroll-mt-24  text-2xl sm:text-3xl font-normal leading-tight border-b border-[#a2a9b1] pb-1 text-[#202122]"
        : Tag === "h2"
          ? "group relative mt-8 mb-3 scroll-mt-24  text-xl sm:text-2xl font-normal leading-tight border-b border-[#a2a9b1] pb-1 text-[#202122]"
          : Tag === "h3"
            ? "group relative mt-6 mb-2 scroll-mt-24 font-sans text-lg font-bold text-[#202122]"
            : "mt-5 mb-2 scroll-mt-24 font-sans text-base font-bold text-[#202122]";

    return createElement(
      Tag,
      {
        id,
        className: baseClass,
        ...omitNode(rest),
      },
      showAnchor && id ? (
        <a
          href={`#${id}`}
          aria-label={`Link to ${text}`}
          className="absolute -left-5 hidden font-sans text-sm font-normal text-[#0645ad] opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:underline lg:block"
        >
          #
        </a>
      ) : null,
      children,
    );
  };

/* ── Markdown components ───────────────────────────────── */
const components: Components = {
  h1: anchorHeading("h1"),
  h2: anchorHeading("h2"),
  h3: anchorHeading("h3"),
  h4: anchorHeading("h4"),
  h5: (p) => (
    <h5
      className="mt-4 mb-2 scroll-mt-24 font-sans text-sm font-bold text-[#202122]"
      {...omitNode(p)}
    />
  ),
  h6: (p) => (
    <h6
      className="mt-4 mb-2 scroll-mt-24 font-sans text-sm font-bold italic text-[#202122]"
      {...omitNode(p)}
    />
  ),

  p: (p) => (
    <p
      className="my-3.5 break-words text-[14px] leading-[1.6] text-[#202122] sm:text-[15px]"
      {...omitNode(p)}
    />
  ),
  strong: (p) => (
    <strong className="font-bold text-[#202122]" {...omitNode(p)} />
  ),
  em: (p) => <em className="italic" {...omitNode(p)} />,
  del: (p) => <del className="text-[#202122] line-through" {...omitNode(p)} />,
  a: (p) => (
    <a
      className="text-[#0645ad] hover:text-[#0b0080] hover:underline focus-visible:outline-none"
      {...omitNode(p)}
    />
  ),

  ul: (p) => (
    <ul
      className="my-3.5 list-outside list-disc space-y-1 pl-6 text-[14px] leading-[1.6] text-[#202122] marker:text-[#202122] sm:pl-8 sm:text-[15px]"
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="my-3.5 list-outside list-decimal space-y-1 pl-6 text-[14px] leading-[1.6] text-[#202122] marker:text-[#202122] sm:pl-8 sm:text-[15px]"
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-[1.6]" {...omitNode(p)} />,

  blockquote: (p) => (
    <blockquote
      className="my-4 border-l-4 border-[#c8ccd1] bg-[#f8f9fa] px-4 py-2 italic text-[#202122] sm:mx-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1.5"
      {...omitNode(p)}
    />
  ),
  hr: () => <hr className="my-8 border-0 border-t border-[#a2a9b1]" />,

  pre: (p) => {
    const { children } = omitNode(p);
    return <CodeBlock>{children}</CodeBlock>;
  },
  code: ({ className, children, ...rest }) => {
    const isBlock =
      /language-/.test(className ?? "") || /hljs/.test(className ?? "");
    if (isBlock) {
      return (
        <code
          className={`font-mono text-[13px] ${className ?? ""}`}
          {...omitNode(rest)}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="break-words rounded-[2px] border border-[#eaecf0] bg-[#f8f9fa] px-1 py-0.5 font-mono text-[0.9em] text-[#202122]"
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  table: (p) => (
    <div className="my-5 w-full overflow-x-auto">
      <table
        className="w-full min-w-[520px] border-collapse border border-[#a2a9b1] bg-white text-[14px] sm:text-[15px]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => <thead className="bg-[#eaecf0]" {...omitNode(p)} />,
  tbody: (p) => <tbody {...omitNode(p)} />,
  tr: (p) => (
    <tr
      className="border-b border-[#a2a9b1] even:bg-[#f8f9fa]"
      {...omitNode(p)}
    />
  ),
  th: (p) => (
    <th
      className="border border-[#a2a9b1] px-3 py-2 text-left font-bold text-[#202122]"
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="border border-[#a2a9b1] px-3 py-2 align-top text-[#202122]"
      {...omitNode(p)}
    />
  ),

  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 h-auto max-w-full border border-[#c8ccd1] bg-[#f8f9fa] p-1"
      alt=""
      {...omitNode(p)}
    />
  ),

  input: (p) => (
    <input
      className="mr-2 h-3.5 w-3.5 translate-y-[2px] accent-[#3366cc]"
      {...omitNode(p)}
    />
  ),
};

/* ── PAGE ──────────────────────────────────────────────── */
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

    return createElement(BlogFeed, { sections: sectionsData });
  }

  /* ── ARTICLE ───────────────────────────────────────────── */
  const doc = getDoc(slug[0]);
  if (!doc) notFound();

  const headings = extractHeadings(doc.content);
  const hasToc = headings.length > 0;

  const wordCount = doc.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const article = (
    <article className="min-w-0 w-full max-w-[820px] bg-white">
      <header className="mb-6">
        {doc.meta.title && (
          <h1 className="break-words border-b border-[#a2a9b1] pb-1.5  text-2xl font-serif font-normal leading-tight text-[#202122] sm:text-3xl md:text-[2.1rem]">
            {doc.meta.title}
          </h1>
        )}

        <p className="mt-1.5 text-[12px] text-[#54595d] sm:text-[13px]">
          Blog post · {readTime} min read
        </p>

        {doc.meta.description && (
          <p className="mt-4 text-[14px] italic leading-[1.6] text-[#54595d] sm:text-[15px]">
            {doc.meta.description}
          </p>
        )}
      </header>

      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {createElement(
          Markdown,
          {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
            components,
          },
          doc.content,
        )}
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#202122] selection:bg-[#3366cc] selection:text-white">
      <main className="mx-auto w-full max-w-[1140px] px-4 py-6 sm:px-8 sm:py-10">
        {/* Back link */}
        <nav className="mb-6 border-b border-[#eaecf0] pb-2.5">
          <Link
            className="inline-flex items-center gap-1.5 text-[13px] bg-blue-800 py-1 px-1 font-medium text-white hover:underline focus-visible:outline-none"
            href="/blogs"
          >
            <IoArrowBack aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Back to all articles</span>
          </Link>
        </nav>

        {hasToc ? (
          <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
            <aside aria-label="Table of contents" className="hidden lg:block">
              <div className="sticky top-10 max-h-[calc(100vh-5rem)] overflow-y-auto border-r border-[#eaecf0] pr-4">
                <p className="mb-2 border-b border-[#eaecf0] pb-1 text-[13px] font-bold text-[#202122]">
                  On this page
                </p>
                <ul className="space-y-1.5 text-[13px]">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`block leading-snug text-[#0645ad] hover:underline ${
                          h.level === 3 ? "pl-3 text-[12px]" : ""
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {article}
          </div>
        ) : (
          article
        )}
      </main>

      <footer className="mx-auto mt-16 w-full max-w-[1140px] border-t border-[#a2a9b1] px-4 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[12px] text-[#54595d]">
          <span>kinshuk jain © {new Date().getFullYear()}</span>
          <span>hand-coded · no templates</span>
        </div>
      </footer>
    </div>
  );
}
