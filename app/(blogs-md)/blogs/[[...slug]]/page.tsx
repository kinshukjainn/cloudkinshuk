import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";
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

/* ── Palette (hardcoded, matches homepage) ─────────────── */
const BG = "#0d0d0c";
const FG = "#d6d1c6";
const HEAD = "#f2eee5";
const MUTED = "#8b867c";
const ACCENT = "#d0a869";
const ACCENT_HOVER = "#e8c98f";
const RULE = "#272521";
const CODE_BG = "#171715";

const SHELL = `min-h-screen bg-[#1b1b1d] text-[${FG}] selection:bg-[${ACCENT}] selection:text-[${BG}]`;

const FOCUS = `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[${ACCENT}] focus-visible:ring-offset-4 focus-visible:ring-offset-[${BG}]`;

const LINK = `text-[${ACCENT}] underline decoration-1 underline-offset-4 transition-colors hover:text-[${ACCENT_HOVER}] ${FOCUS}`;

const MONO = ` text-[13px] font-medium  tracking-[0.16em] text-white`;

const PROSE = `my-5 break-words text-[15px] leading-7 text-[${FG}] sm:text-base sm:leading-8`;

const HEAD_ID_OFFSET = "scroll-mt-24";

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
    return { title: "Blog", description: "Our latest articles and thoughts." };
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
        ? `mt-14 mb-6 ${HEAD_ID_OFFSET}  text-3xl tracking-tight sm:text-4xl`
        : Tag === "h2"
          ? `group relative mt-14 mb-5 ${HEAD_ID_OFFSET}  text-2xl tracking-tight sm:text-[1.6rem]`
          : Tag === "h3"
            ? `group relative mt-10 mb-4 ${HEAD_ID_OFFSET}  text-xl tracking-tight`
            : `mt-8 mb-3 ${HEAD_ID_OFFSET}  text-base font-semibold`;

    return (
      <Tag
        id={id}
        className={`${baseClass} text-[${HEAD}]`}
        {...omitNode(rest)}
      >
        {showAnchor && id && (
          <a
            href={`#${id}`}
            aria-label={`Link to ${text}`}
            className={`absolute -left-6 hidden text-[${RULE}] opacity-0 transition-opacity duration-150 hover:text-[${ACCENT}] group-hover:opacity-100 lg:block`}
          >
            #
          </a>
        )}
        {children}
      </Tag>
    );
  };

/* ── Markdown components ───────────────────────────────── */
const components: Components = {
  h1: anchorHeading("h1"),
  h2: anchorHeading("h2"),
  h3: anchorHeading("h3"),
  h4: anchorHeading("h4"),
  h5: (p) => (
    <h5 className={`mt-6 mb-2 ${HEAD_ID_OFFSET} ${MONO}`} {...omitNode(p)} />
  ),
  h6: (p) => (
    <h6 className={`mt-6 mb-2 ${HEAD_ID_OFFSET} ${MONO}`} {...omitNode(p)} />
  ),

  p: (p) => <p className={PROSE} {...omitNode(p)} />,
  strong: (p) => (
    <strong className={`font-semibold text-[${HEAD}]`} {...omitNode(p)} />
  ),
  em: (p) => <em className="italic" {...omitNode(p)} />,
  del: (p) => (
    <del className={`text-[${MUTED}] line-through`} {...omitNode(p)} />
  ),
  a: (p) => <a className={LINK} {...omitNode(p)} />,

  ul: (p) => (
    <ul
      className={`my-5 list-outside list-disc space-y-2 pl-6 text-[15px] leading-7 text-[${FG}] marker:text-[${MUTED}] sm:text-base sm:leading-8`}
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className={`my-5 list-outside list-decimal space-y-2 pl-6 text-[15px] leading-7 text-[${FG}] marker:text-[${MUTED}] sm:text-base sm:leading-8`}
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-7" {...omitNode(p)} />,

  blockquote: (p) => (
    <blockquote
      className={`my-8 border-l-2 border-[${ACCENT}] py-1 pl-5 italic text-[${MUTED}] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2`}
      {...omitNode(p)}
    />
  ),
  hr: () => <hr className={`my-12 border-0 border-t border-[${RULE}]`} />,

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
        className={`break-words border border-[${RULE}] bg-[${CODE_BG}] px-1.5 py-0.5 monofont text-[0.85em] text-[${HEAD}]`}
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  table: (p) => (
    <div className="my-8 w-full overflow-x-auto">
      <table
        className="w-full min-w-[560px] border-collapse text-[0.9375rem]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead className={`border-b border-[${RULE}]`} {...omitNode(p)} />
  ),
  tbody: (p) => <tbody {...omitNode(p)} />,
  tr: (p) => (
    <tr
      className={`border-b border-[${RULE}] last:border-b-0`}
      {...omitNode(p)}
    />
  ),
  th: (p) => (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left ${MONO} text-[${HEAD}]`}
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td className={`px-4 py-3 align-top text-[${FG}]`} {...omitNode(p)} />
  ),

  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-8 h-auto w-full" alt="" {...omitNode(p)} />
  ),

  input: (p) => (
    <input
      className={`mr-2 h-4 w-4 translate-y-[2px] accent-[${ACCENT}]`}
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

    return <BlogFeed sections={sectionsData} />;
  }

  /* ── ARTICLE ───────────────────────────────────────────── */
  const doc = getDoc(slug[0]);
  if (!doc) notFound();

  const headings = extractHeadings(doc.content);
  const hasToc = headings.length > 0;

  const wordCount = doc.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const article = (
    <article
      className={`min-w-0 max-w-[680px] ${hasToc ? "mx-auto lg:mx-0" : "mx-auto"}`}
    >
      <header
        className={`mb-10 border-b border-[${RULE}] pb-8 sm:mb-12 sm:pb-10`}
      >
        <p className={MONO}>Blog post · {readTime} min read</p>

        {doc.meta.title && (
          <h1
            className={`mt-4 break-words  text-3xl font-semibold leading-[1.15] tracking-tight text-[${HEAD}] sm:text-4xl md:text-5xl`}
          >
            {doc.meta.title}
          </h1>
        )}

        {doc.meta.description && (
          <p
            className={`mt-4 max-w-2xl text-base leading-7 text-[${MUTED}] sm:text-lg sm:leading-8`}
          >
            {doc.meta.description}
          </p>
        )}
      </header>

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
  );

  return (
    <div className={SHELL}>
      <main className="mx-auto w-full max-w-[980px] px-5 py-12 sm:px-8 sm:py-16">
        {/* Back link */}
        <nav className="mb-10">
          <Link
            href="/blogs"
            className={`group inline-flex items-center gap-2 px-3 py-2 bg-blue-800 rounded-full text-[13px] text-white font-medium transition-colors hover:text-white ${FOCUS}`}
          >
            <IoArrowBack
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Back to all articles</span>
          </Link>
        </nav>

        {hasToc ? (
          <div className="lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
            <aside aria-label="Table of contents" className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <p className={`mb-3 ${MONO}`}>on this page</p>
                <ul className="space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`block leading-snug text-white transition-colors hover:text-blue-300 ${
                          h.level === 3 ? "pl-4" : ""
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

      <footer
        className={`mx-auto w-full max-w-[980px] border-t border-[${RULE}] px-5 py-6 sm:px-8`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 ${MONO}`}
        >
          <span>kinshuk jain © {new Date().getFullYear()}</span>
          <span>hand-coded · no templates</span>
        </div>
      </footer>
    </div>
  );
}
