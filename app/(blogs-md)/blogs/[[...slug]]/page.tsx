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
   Pixel UI · Android 17 · Surface system
   (identical token language to the home page)

   · Soft elevated surfaces — no hard borders, no pure black.
   · Neutral inverted fills carry selection & primary actions.
   · One accent (#0B57D0 / #A8C7FA) used only for links.
   · Motion: 300 ms cubic-bezier(0.2,0,0,1) — colour, shadow, lift.
   ───────────────────────────────────────────────────────────── */

/* ── Surfaces ─────────────────────────────────────────── */
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

/* ── Neutral tint — mirrors the header's monochrome system ── */
const NEUTRAL = {
  idle: "bg-transparent text-[#1F1F1F] dark:text-[#E3E3E3]",
  solid: "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]",
  soft: "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]",
} as const;

/* ── Type ─────────────────────────────────────────────── */
const TEXT = "text-[#1F1F1F] dark:text-[#E3E3E3]";
const TEXT_MUTED = "text-[#444746] dark:text-[#C4C7C5]";
const TEXT_SUBTLE = "text-[#747775] dark:text-[#8E918F]";

const ACCENT_TEXT = "text-[#0B57D0] dark:text-[#A8C7FA]";

/* ── Hairlines (used only inside data-dense blocks) ────── */
const RULE = "bg-black/[0.08] dark:bg-white/[0.12]";
const RULE_B = "border-black/[0.08] dark:border-white/[0.12]";
const RULE_B_SOFT = "border-black/[0.06] dark:border-white/[0.08]";

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
   MARKDOWN COMPONENTS
   ───────────────────────────────────────────────────────── */
const components: Components = {
  /* ── Headings ─────────────────────────────────────────── */
  h1: (p) => (
    <h1
      className={`mt-12 mb-6 scroll-mt-24 text-3xl font-bold tracking-tight md:text-[2.25rem] md:leading-[1.15] ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h2: (p) => {
    const { children, ...rest } = omitNode(p);
    return (
      <h2
        className={`mt-12 mb-4 flex scroll-mt-24 items-center gap-3 text-2xl font-bold tracking-tight md:text-[1.6rem] md:leading-tight ${TEXT}`}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-6 w-1 shrink-0 rounded-full ${NEUTRAL.solid}`}
        />
        <span>{children}</span>
      </h2>
    );
  },
  h3: (p) => (
    <h3
      className={`mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight md:text-[1.25rem] ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h4: (p) => (
    <h4
      className={`mt-8 mb-2 scroll-mt-24 text-base font-semibold tracking-tight ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h5: (p) => (
    <h5
      className={`mt-6 mb-2 scroll-mt-24 text-sm font-semibold uppercase tracking-wide ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  h6: (p) => (
    <h6
      className={`mt-6 mb-2 scroll-mt-24 text-xs font-semibold uppercase tracking-wider ${TEXT_SUBTLE}`}
      {...omitNode(p)}
    />
  ),

  /* ── Text ─────────────────────────────────────────────── */
  p: (p) => (
    <p
      className={`my-5 break-words text-[1.0625rem] leading-[1.8] ${TEXT_MUTED}`}
      {...omitNode(p)}
    />
  ),
  strong: (p) => (
    <strong className={`font-semibold ${TEXT}`} {...omitNode(p)} />
  ),
  em: (p) => <em className={`italic ${TEXT_MUTED}`} {...omitNode(p)} />,
  del: (p) => (
    <del
      className={`line-through decoration-2 ${TEXT_SUBTLE}`}
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className={`font-semibold ${ACCENT_TEXT} underline decoration-2 underline-offset-4 transition-colors duration-300 ${EASE} hover:opacity-80`}
      {...omitNode(p)}
    />
  ),

  /* ── Lists ────────────────────────────────────────────── */
  ul: (p) => (
    <ul
      className={`my-5 list-outside list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.8] ${TEXT_MUTED} marker:text-[#1F1F1F] dark:marker:text-[#E3E3E3]`}
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className={`my-5 list-outside list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.8] ${TEXT_MUTED} marker:font-semibold marker:text-[#1F1F1F] dark:marker:text-[#E3E3E3]`}
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-[1.8]" {...omitNode(p)} />,

  /* ── Blockquote / HR ──────────────────────────────────── */
  blockquote: (p) => (
    <blockquote
      className={`
        relative my-8 overflow-hidden rounded-[24px] ${SURFACE}
        py-5 pl-7 pr-6 text-[1.0625rem] leading-[1.8] ${TEXT}
        before:absolute before:inset-y-0 before:left-0 before:w-1
        before:bg-[#1F1F1F] before:content-['']
        dark:before:bg-[#E3E3E3]
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2
      `}
      {...omitNode(p)}
    />
  ),
  hr: () => <hr className={`my-12 h-px border-0 ${RULE}`} />,

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
        className={`break-words rounded-md ${SUBTLE} px-1.5 py-0.5 font-mono text-[0.85em] font-medium ${TEXT}`}
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  /* ── Tables ───────────────────────────────────────────── */
  table: (p) => (
    <div
      className={`
        my-8 block w-full max-w-full overflow-x-auto rounded-[24px]
        ${SURFACE}
        scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-black/20 dark:scrollbar-thumb-white/25
      `}
    >
      <table
        className="w-full min-w-[600px] border-collapse text-[0.9375rem]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => <thead className={`${SUBTLE} ${TEXT}`} {...omitNode(p)} />,
  tbody: (p) => (
    <tbody
      className={`
        ${TEXT_MUTED}
        [&>tr:hover]:bg-black/[0.04]
        dark:[&>tr:hover]:bg-white/[0.06]
      `}
      {...omitNode(p)}
    />
  ),
  th: (p) => (
    <th
      className={`whitespace-nowrap border-b ${RULE_B} px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${TEXT}`}
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className={`border-b ${RULE_B_SOFT} px-4 py-3 align-top ${TEXT_MUTED}`}
      {...omitNode(p)}
    />
  ),

  /* ── Media ────────────────────────────────────────────── */
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`my-8 h-auto w-full rounded-[24px] ${SURFACE} object-cover sm:object-contain`}
      alt=""
      {...omitNode(p)}
    />
  ),

  /* ── Task-list checkbox ───────────────────────────────── */
  input: (p) => (
    <input
      className="mr-2 h-4 w-4 translate-y-[2px] accent-[#1F1F1F] dark:accent-[#E3E3E3]"
      {...omitNode(p)}
    />
  ),
};

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */
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

  const hasHeader = Boolean(doc.meta.title || doc.meta.description);

  return (
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#1F1F1F] selection:text-white
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#E3E3E3] dark:selection:text-[#1F1F1F]
      "
    >
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        {/* ── Sticky return chip ──────────────────────────── */}
        <div className="sticky top-20 z-30 mb-8 flex md:mb-10">
          <Link
            href="/blogs"
            aria-label="Return to all articles"
            className={`
              group inline-flex items-center gap-2 rounded-full
              py-2 pl-2 pr-4 ${SURFACE}
              transition-all duration-300 ${EASE}
              hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_28px_-14px_rgba(0,0,0,0.55)]
              dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_12px_28px_-14px_rgba(255,255,255,0.35)]
              active:scale-[0.96] active:rounded-xl
              ${FOCUS}
            `}
          >
            <span
              className={`
                grid h-8 w-8 shrink-0 place-items-center rounded-full
                ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                transition-all duration-300 ${SPRING}
                group-hover:rounded-[8px]
              `}
            >
              <IoArrowBack className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
              Return
            </span>
          </Link>
        </div>

        <article className="min-w-0 max-w-full">
          {/* ── Article header ────────────────────────────── */}
          {hasHeader && (
            <header className="mb-10 space-y-4 md:mb-14">
              <span
                className={`
                  inline-flex items-center gap-1.5 rounded-full
                  py-1.5 px-2 ${SURFACE}
                `}
              >
                <span
                  className={`
                    grid h-8 w-8 shrink-0 place-items-center rounded-full
                    ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                    transition-all duration-300 ${SPRING}
                  `}
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-[13px] font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  Article
                </span>
              </span>

              {doc.meta.title && (
                <h1
                  className={`text-3xl font-bold tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]`}
                >
                  {doc.meta.title}
                </h1>
              )}

              {doc.meta.description && (
                <p className="max-w-2xl text-base leading-7 text-[#444746] dark:text-[#C4C7C5] md:text-lg">
                  {doc.meta.description}
                </p>
              )}
            </header>
          )}

          {/* ── Body ──────────────────────────────────────── */}
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

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-10 text-center text-xs text-[#747775] dark:text-[#8E918F]">
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
