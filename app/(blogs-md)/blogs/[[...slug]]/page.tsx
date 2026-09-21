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

/* ── Material 3 Expressive · Pixel UI tokens ────────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "border border-[#C4C7C5]/60 dark:border-[#3C4043] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#0B57D0] dark:focus-visible:ring-[#A8C7FA] " +
  "focus-visible:ring-offset-0";

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
      className="
        mt-14 mb-6 scroll-mt-24 text-3xl font-bold tracking-tight
        text-[#1F1F1F] dark:text-[#E3E3E3]
        md:text-[2.75rem] md:leading-[1.1]
      "
      {...omitNode(p)}
    />
  ),
  h2: (p) => {
    const { children, ...rest } = omitNode(p);
    return (
      <h2
        className="
          mt-14 mb-5 flex scroll-mt-24 items-center gap-3
          text-2xl font-bold tracking-tight
          text-[#1F1F1F] dark:text-[#E3E3E3]
          md:text-[1.75rem] md:leading-tight
        "
        {...rest}
      >
        <span
          aria-hidden="true"
          className="
            inline-block h-6 w-1.5 shrink-0 rounded-full
            bg-[#0B57D0] dark:bg-[#A8C7FA]
          "
        />
        <span>{children}</span>
      </h2>
    );
  },
  h3: (p) => (
    <h3
      className="
        mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight
        text-[#1F1F1F] dark:text-[#E3E3E3] md:text-[1.25rem]
      "
      {...omitNode(p)}
    />
  ),
  h4: (p) => (
    <h4
      className="
        mt-8 mb-2 scroll-mt-24 text-base font-semibold tracking-tight
        text-[#1F1F1F] dark:text-[#E3E3E3]
      "
      {...omitNode(p)}
    />
  ),
  h5: (p) => (
    <h5
      className="
        mt-6 mb-2 scroll-mt-24 text-sm font-semibold uppercase tracking-wide
        text-[#444746] dark:text-[#C4C7C5]
      "
      {...omitNode(p)}
    />
  ),
  h6: (p) => (
    <h6
      className="
        mt-6 mb-2 scroll-mt-24 text-xs font-semibold uppercase tracking-wider
        text-[#747775] dark:text-[#8E918F]
      "
      {...omitNode(p)}
    />
  ),

  /* ----------------------------------- Text ----------------------------------- */
  p: (p) => (
    <p
      className="
        my-5 break-words text-[1.0625rem] leading-[1.8]
        text-[#444746] dark:text-[#C4C7C5]
      "
      {...omitNode(p)}
    />
  ),
  strong: (p) => (
    <strong
      className="font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]"
      {...omitNode(p)}
    />
  ),
  em: (p) => (
    <em
      className="italic text-[#444746] dark:text-[#C4C7C5]"
      {...omitNode(p)}
    />
  ),
  del: (p) => (
    <del
      className="
        text-[#747775] line-through decoration-[#9AA0A6]/70
        dark:text-[#8E918F] dark:decoration-[#5F6368]
      "
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="
        font-semibold text-[#0B57D0] dark:text-[#A8C7FA]
        underline decoration-[#0B57D0]/30 decoration-1 underline-offset-[3px]
        transition-colors duration-200
        hover:text-[#0842A0] hover:decoration-[#0842A0]/70
        dark:hover:text-[#D3E3FD] dark:hover:decoration-[#D3E3FD]/70
      "
      {...omitNode(p)}
    />
  ),

  /* ---------------------------------- Lists ---------------------------------- */
  ul: (p) => (
    <ul
      className="
        my-5 list-outside list-disc space-y-2 pl-6
        text-[1.0625rem] leading-[1.8]
        text-[#444746] marker:text-[#0B57D0]/70
        dark:text-[#C4C7C5] dark:marker:text-[#A8C7FA]/70
      "
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="
        my-5 list-outside list-decimal space-y-2 pl-6
        text-[1.0625rem] leading-[1.8]
        text-[#444746] marker:font-semibold marker:text-[#0B57D0]/70
        dark:text-[#C4C7C5] dark:marker:text-[#A8C7FA]/70
      "
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-[1.8]" {...omitNode(p)} />,

  /* ------------------------------ Blockquotes / HR ---------------------------- */
  blockquote: (p) => (
    <blockquote
      className="
        my-8 rounded-[20px] border border-[#0B57D0]/20 bg-[#D3E3FD]/40
        px-5 py-4 text-[1.0625rem] leading-[1.8] text-[#1F1F1F]
        dark:border-[#A8C7FA]/25 dark:bg-[#0B57D0]/15 dark:text-[#E3E3E3]
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2
      "
      {...omitNode(p)}
    />
  ),
  hr: () => (
    <hr
      className="
        my-12 h-px border-0
        bg-gradient-to-r from-transparent via-[#C4C7C5] to-transparent
        dark:via-[#3C4043]
      "
    />
  ),

  /* ---------------------------------- Code ---------------------------------- */
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
        className="
          break-words rounded-md border border-[#0B57D0]/20
          bg-[#D3E3FD]/50 px-1.5 py-0.5 font-mono text-[0.85em] font-semibold
          text-[#0B57D0]
          dark:border-[#A8C7FA]/25 dark:bg-[#0B57D0]/20 dark:text-[#A8C7FA]
        "
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },

  /* ---------------------------------- Tables -------------------------------- */
  table: (p) => (
    <div
      className={`
        my-8 block w-full max-w-full overflow-x-auto rounded-[20px]
        ${SURFACE}
        scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-[#C4C7C5] dark:scrollbar-thumb-[#3C4043]
      `}
    >
      <table
        className="w-full min-w-[600px] border-collapse text-[0.9375rem]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead className="bg-[#F0F4F9] dark:bg-[#282A2C]" {...omitNode(p)} />
  ),
  tbody: (p) => (
    <tbody
      className="
        [&>tr:nth-child(even)]:bg-[#F0F4F9]/60
        [&>tr:hover]:bg-[#D3E3FD]/40
        dark:[&>tr:nth-child(even)]:bg-[#282A2C]/50
        dark:[&>tr:hover]:bg-[#0B57D0]/15
      "
      {...omitNode(p)}
    />
  ),
  th: (p) => (
    <th
      className="
        whitespace-nowrap border-b border-[#C4C7C5]/60 px-4 py-3
        text-left text-xs font-bold uppercase tracking-wider
        text-[#444746]
        dark:border-[#3C4043] dark:text-[#C4C7C5]
      "
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="
        border-b border-[#C4C7C5]/40 px-4 py-3 align-top
        text-[#444746]
        dark:border-[#3C4043]/60 dark:text-[#C4C7C5]
      "
      {...omitNode(p)}
    />
  ),

  /* ---------------------------------- Media --------------------------------- */
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="
        my-8 h-auto w-full rounded-[20px] bg-[#F0F4F9] object-cover
        shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)]
        ring-1 ring-[#C4C7C5]/60
        dark:bg-[#1E1F20] dark:ring-[#3C4043]
        dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]
        sm:object-contain
      "
      alt=""
      {...omitNode(p)}
    />
  ),

  /* ------------------------------ Task list input --------------------------- */
  input: (p) => (
    <input
      className="
        mr-2 h-4 w-4 translate-y-[2px]
        accent-[#0B57D0] dark:accent-[#A8C7FA]
      "
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
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#D3E3FD] selection:text-[#041E49]
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#0842A0] dark:selection:text-[#D3E3FD]
      "
    >
      <article className="min-w-0 max-w-full">
        {/* ── Sticky return chip ───────────────────────────── */}
        <div className="sticky top-20 z-30 -mx-4 mb-6 flex px-4 py-3 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
          <Link
            href="/blogs"
            className={`
              group inline-flex items-center gap-2 rounded-full
              py-1.5 pl-1.5 pr-4 text-sm font-semibold
              text-[#1F1F1F] dark:text-[#E3E3E3] ${SURFACE}
              transition-all duration-300 ${EASE}
              hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_28px_-14px_rgba(11,87,208,0.5)]
              dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_12px_28px_-14px_rgba(168,199,250,0.4)]
              active:scale-[0.96] active:rounded-[18px]
              ${FOCUS}
            `}
          >
            {/* Circle → squircle shape morph on hover */}
            <span
              className="
                grid h-7 w-7 shrink-0 place-items-center rounded-full
                bg-[#D3E3FD] text-[#0B57D0]
                dark:bg-[#0B57D0]/25 dark:text-[#A8C7FA]
                transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                group-hover:rounded-[8px]
              "
            >
              <IoArrowBack className="text-base" aria-hidden="true" />
            </span>
            <span>Return</span>
          </Link>
        </div>

        {/* ── Content wrapper keeps horizontal overflow contained ── */}
        <div className="overflow-hidden">
          {(doc.meta.title || doc.meta.description) && (
            <header className="mb-12 border-b border-[#C4C7C5]/50 pb-8 dark:border-[#3C4043]">
              {/* Article chip */}
              <span
                className={`
                  mb-4 inline-flex items-center gap-1.5 rounded-full
                  py-1.5 pl-1.5 pr-3.5 text-[11px] font-bold uppercase tracking-wide
                  bg-[#D3E3FD] ring-1 ring-inset ring-[#0B57D0]/25
                  dark:bg-[#0B57D0]/25 dark:ring-[#A8C7FA]/35
                `}
              >
                <span
                  className="
                    grid h-6 w-6 shrink-0 place-items-center rounded-full
                    bg-[#0B57D0] text-white
                    dark:bg-[#A8C7FA] dark:text-[#041E49]
                  "
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-[#041E49] dark:text-[#D3E3FD]">
                  Article
                </span>
              </span>

              {doc.meta.title && (
                <h1
                  className="
                    h-font text-[2rem] font-bold tracking-tight
                    text-[#1F1F1F] dark:text-[#E3E3E3]
                    md:text-[2.75rem] md:leading-[1.15]
                  "
                >
                  {doc.meta.title}
                </h1>
              )}
              {doc.meta.description && (
                <p
                  className="
                    mt-3 text-base leading-7 text-[#444746] dark:text-[#C4C7C5]
                    md:text-lg
                  "
                >
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
    </div>
  );
}
