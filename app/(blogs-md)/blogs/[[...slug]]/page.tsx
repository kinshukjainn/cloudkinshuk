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
      className="mt-8 mb-4 scroll-mt-24 text-3xl font-bold tracking-tight text-white md:text-4xl"
      {...omitNode(p)}
    />
  ),
  h2: (p) => (
    <h2
      className="mt-8 mb-4 scroll-mt-24 border-b border-zinc-700 pb-2 text-2xl font-bold tracking-tight text-white md:text-3xl"
      {...omitNode(p)}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-6 mb-3 scroll-mt-24 text-xl font-bold text-white"
      {...omitNode(p)}
    />
  ),
  p: (p) => (
    <p
      className="mt-4 mb-4 break-words text-base leading-relaxed text-gray-300"
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="text-blue-400 underline decoration-blue-400/40 underline-offset-2 transition-colors hover:text-blue-300 hover:decoration-blue-300"
      {...omitNode(p)}
    />
  ),
  ul: (p) => (
    <ul
      className="mt-4 mb-4 list-outside list-disc space-y-1 pl-6 text-base text-zinc-300 marker:text-green-500"
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="mt-4 mb-4 list-outside list-decimal space-y-2 pl-6 text-base text-zinc-300 marker:text-zinc-500"
      {...omitNode(p)}
    />
  ),
  li: (p) => <li className="pl-1 leading-relaxed" {...omitNode(p)} />,
  strong: (p) => <strong className="font-bold text-white" {...omitNode(p)} />,
  blockquote: (p) => (
    <blockquote
      className="my-6 border-l-4 border-green-500 bg-[#181818]  px-5 py-3 text-base text-zinc-300"
      {...omitNode(p)}
    />
  ),
  hr: () => <hr className="my-8 border-t border-zinc-700" />,
  pre: (p) => (
    <pre
      className="mt-6 mb-6 max-w-full overflow-x-auto rounded-md border border-zinc-700 bg-[#1e1e1e] p-4 text-sm leading-normal text-zinc-200 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-500"
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
        className="break-words rounded-md bg-[#141414] px-1.5 py-1 border border-[#444444] text-[0.875em] font-mono text-white"
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },
  table: (p) => (
    <div className="my-6 block w-full max-w-full overflow-x-auto rounded-md border border-zinc-700 bg-transparent scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
      <table
        className="w-full min-w-[600px] border-collapse text-sm md:text-base"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => <thead className="bg-zinc-800/50" {...omitNode(p)} />,
  th: (p) => (
    <th
      className="whitespace-nowrap border-b border-zinc-700 px-4 py-3 text-left font-bold text-green"
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="border-b border-zinc-800/50 px-4 py-3 text-zinc-300"
      {...omitNode(p)}
    />
  ),
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 h-auto w-full rounded-md border border-zinc-700 bg-[#1b1b1d] object-cover sm:object-contain"
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
    <article className="min-w-0 max-w-full overflow-hidden">
      {doc.meta.title && (
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {doc.meta.title}
          </h1>
          {doc.meta.description && (
            <p className="mt-4 text-lg text-zinc-400">{doc.meta.description}</p>
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
