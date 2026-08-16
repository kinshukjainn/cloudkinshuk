import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getDoc, getAllSlugs } from "@/lib/blogs";

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug?.[0] ?? "introduction");
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
      className="mt-10 mb-6 scroll-mt-24 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl"
      {...omitNode(p)}
    />
  ),
  h2: (p) => (
    <h2
      className="mt-10 mb-4 scroll-mt-24 border-b border-neutral-300 dark:border-neutral-800 pb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-3xl"
      {...omitNode(p)}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-8 mb-4 scroll-mt-24 text-xl font-bold text-neutral-900 dark:text-white"
      {...omitNode(p)}
    />
  ),
  p: (p) => (
    <p
      className="mt-4 mb-4 break-words text-base leading-relaxed text-neutral-900 dark:text-neutral-200"
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="text-blue-600 dark:text-blue-400 underline decoration-blue-600/40 dark:decoration-blue-400/40 underline-offset-4 transition-colors hover:text-blue-800 dark:hover:text-blue-300 hover:decoration-blue-800 dark:hover:decoration-blue-300 font-medium"
      {...omitNode(p)}
    />
  ),
  ul: (p) => (
    <ul
      className="mt-4 mb-4 list-outside list-disc space-y-2 pl-6 text-base text-neutral-700 dark:text-neutral-300 marker:text-neutral-400 dark:marker:text-neutral-600"
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="mt-4 mb-4 list-outside list-decimal space-y-2 pl-6 text-base text-neutral-700 dark:text-neutral-300 marker:text-neutral-500 dark:marker:text-neutral-500"
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-2 leading-relaxed" {...omitNode(p)} />,
  strong: (p) => (
    <strong
      className="font-bold text-neutral-900 dark:text-white"
      {...omitNode(p)}
    />
  ),
  blockquote: (p) => (
    <blockquote
      className="my-6 border-l-4 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 px-5 py-4 text-base text-neutral-600 dark:text-neutral-400"
      {...omitNode(p)}
    />
  ),
  hr: () => (
    <hr className="my-10 border-t border-neutral-300 dark:border-neutral-800" />
  ),
  pre: (p) => (
    <pre
      className="mt-6 mb-6 max-w-full overflow-x-auto rounded-none border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a] p-4 text-sm leading-normal text-neutral-800 dark:text-neutral-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700"
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
        className="break-words rounded-none bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 border border-neutral-200 dark:border-neutral-800 text-[0.875em] font-mono text-neutral-900 dark:text-neutral-200"
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },
  table: (p) => (
    <div className="my-6 block w-full max-w-full overflow-x-auto rounded-none border border-neutral-300 dark:border-neutral-800 bg-transparent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
      <table
        className="w-full min-w-[600px] border-collapse text-sm md:text-base"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => (
    <thead className="bg-neutral-50 dark:bg-neutral-900/50" {...omitNode(p)} />
  ),
  th: (p) => (
    <th
      className="whitespace-nowrap border-b border-neutral-300 dark:border-neutral-800 px-4 py-3 text-left font-bold text-neutral-900 dark:text-neutral-100"
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 text-neutral-700 dark:text-neutral-300"
      {...omitNode(p)}
    />
  ),
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 h-auto w-full rounded-none border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 object-cover sm:object-contain"
      alt=""
      {...omitNode(p)}
    />
  ),
};

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug?.[0] ?? "introduction");
  if (!doc) notFound();

  return (
    <article className="min-w-0 max-w-full overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {doc.meta.title && (
        <header className="mb-10 border-b border-neutral-300 dark:border-neutral-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            {doc.meta.title}
          </h1>
          {doc.meta.description && (
            <p className="mt-4 text-lg text-neutral-800 dark:text-neutral-400">
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
    </article>
  );
}
