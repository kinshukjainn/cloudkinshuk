import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getDoc, getAllSlugs } from "@/lib/blogs";
import { navigation } from "@/lib/navigation";
import "highlight.js/styles/github-dark.css";
import BlogFeed from "@/app/components/BlogsFeed";
import { IoArrowBack } from "react-icons/io5";

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
  h1: (p) => (
    <h1
      className="mt-12 mb-6 scroll-mt-24 text-3xl font-normal tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] md:text-[2.5rem] md:leading-[1.15]"
      {...omitNode(p)}
    />
  ),
  h2: (p) => (
    <h2
      className="mt-10 mb-4 scroll-mt-24 text-2xl font-normal tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] md:text-3xl"
      {...omitNode(p)}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 text-xl font-medium text-[#1f1f1f] dark:text-[#e3e3e3]"
      {...omitNode(p)}
    />
  ),
  p: (p) => (
    <p
      className="mt-4 mb-4 break-words text-base leading-7 text-[#444746] dark:text-[#c4c7c5]"
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="rounded text-[#0b57d0] underline decoration-[#0b57d0]/30 underline-offset-4 transition-colors hover:text-[#0842a0] hover:decoration-[#0842a0]/60 dark:text-[#a8c7fa] dark:decoration-[#a8c7fa]/30 dark:hover:text-[#d3e3fd] font-medium"
      {...omitNode(p)}
    />
  ),
  ul: (p) => (
    <ul
      className="mt-4 mb-4 list-outside list-disc space-y-2 pl-6 text-base leading-7 text-[#444746] dark:text-[#c4c7c5] marker:text-[#747775] dark:marker:text-[#8e918f]"
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="mt-4 mb-4 list-outside list-decimal space-y-2 pl-6 text-base leading-7 text-[#444746] dark:text-[#c4c7c5] marker:text-[#747775] dark:marker:text-[#8e918f]"
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1.5 leading-7" {...omitNode(p)} />,
  strong: (p) => (
    <strong
      className="font-semibold text-[#1f1f1f] dark:text-[#e3e3e3]"
      {...omitNode(p)}
    />
  ),
  blockquote: (p) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-4 border-[#0b57d0] dark:border-[#a8c7fa] bg-[#f0f4f9] dark:bg-[#1e1f21] px-5 py-4 text-base leading-7 text-[#444746] dark:text-[#c4c7c5]"
      {...omitNode(p)}
    />
  ),
  hr: () => (
    <hr className="my-10 border-t border-[#e0e3e7] dark:border-[#2d2f31]" />
  ),
  pre: (p) => (
    <pre
      className="mt-6 mb-6 max-w-full overflow-x-auto rounded-xl bg-[#f0f4f9] dark:bg-[#1e1f21] p-5 text-sm leading-6 text-[#1f1f1f] dark:text-[#e3e3e3] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#c4c7c5] dark:scrollbar-thumb-[#444746]"
      {...omitNode(p)}
    />
  ),
  code: ({ className, children, ...rest }) => {
    const isBlock = /language-/.test(className ?? "");
    if (isBlock)
      return (
        <code className={className} {...omitNode(rest)}>
          {children}
        </code>
      );
    return (
      <code
        className="break-words rounded-md bg-[#f0f4f9] dark:bg-[#1e1f21] px-1.5 py-0.5 text-[0.875em] font-mono text-[#0b57d0] dark:text-[#a8c7fa]"
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },
  table: (p) => (
    <div className="my-6 block w-full max-w-full overflow-x-auto rounded-xl border border-[#e0e3e7] dark:border-[#2d2f31] bg-white dark:bg-[#1e1f21] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#c4c7c5] dark:scrollbar-thumb-[#444746]">
      <table
        className="w-full min-w-[600px] border-collapse text-sm md:text-base"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead className="bg-[#f0f4f9] dark:bg-[#282a2c]" {...omitNode(p)} />
  ),
  th: (p) => (
    <th
      className="whitespace-nowrap border-b border-[#e0e3e7] dark:border-[#2d2f31] px-4 py-3 text-left font-medium text-[#1f1f1f] dark:text-[#e3e3e3]"
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="border-b border-[#e0e3e7] dark:border-[#2d2f31] px-4 py-3 text-[#444746] dark:text-[#c4c7c5]"
      {...omitNode(p)}
    />
  ),
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 h-auto w-full rounded-xl bg-[#f0f4f9] dark:bg-[#1e1f21] object-cover sm:object-contain"
      alt=""
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
      {/*
        Sticky back button.
        `top-20` clears the site header (adjust if your header is taller/shorter).
        `z-30` keeps it above content but below the site header.
        The white/near-white background prevents text bleeding through while scrolling.
      */}
      <div className="sticky top-20 z-30 -mx-4 mb-6 flex  px-4 py-3  sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-full border border-[#c4c7c5] bg-white/20 backdrop-blur-xs px-4 py-2 text-sm font-medium text-black shadow-sm transition-colors  dark:border-[#444444] dark:bg-black/20 dark:text-white"
        >
          <IoArrowBack className="text-base" />
          <span>Return</span>
        </Link>
      </div>

      {/* Content wrapper keeps horizontal overflow contained (code blocks, tables) */}
      <div className="overflow-hidden">
        {/* Header block */}
        {(doc.meta.title || doc.meta.description) && (
          <header className="mb-10 border-b border-[#e0e3e7] dark:border-[#2d2f31] pb-8">
            {doc.meta.title && (
              <h1 className="h-font text-[2rem] font-semibold tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] md:text-[2.75rem] md:leading-[1.15]">
                {doc.meta.title}
              </h1>
            )}
            {doc.meta.description && (
              <p className="mt-3 text-base leading-7 text-[#444746] dark:text-[#c4c7c5] md:text-lg">
                {doc.meta.description}
              </p>
            )}
          </header>
        )}

        <div className="prose-container">
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
