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
      className="mt-12 scroll-mt-28 text-3xl font-normal tracking-tight text-[#E2E2E6] md:mt-16 md:text-[40px] md:leading-tight"
      {...omitNode(p)}
    />
  ),
  h2: (p) => (
    <h2
      className="mt-14 scroll-mt-28 border-b border-[#282A2E] pb-3 text-2xl font-medium tracking-tight text-[#E2E2E6] md:text-[32px]"
      {...omitNode(p)}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-10 scroll-mt-28 text-[22px] font-medium text-[#E2E2E6]"
      {...omitNode(p)}
    />
  ),
  p: (p) => (
    <p
      className="mt-5 break-words text-[16px] leading-[1.7] text-[#C4C6CA] md:text-[18px]"
      {...omitNode(p)}
    />
  ),
  a: (p) => (
    <a
      className="font-medium text-[#A8C7FA] underline decoration-[#004A77] decoration-2 underline-offset-4 transition-all hover:text-[#C2E7FF] hover:decoration-[#A8C7FA]"
      {...omitNode(p)}
    />
  ),
  ul: (p) => (
    <ul
      className="mt-5 list-none space-y-3 pl-2 text-[16px] leading-[1.7] text-[#C4C6CA] md:text-[18px]"
      {...omitNode(p)}
    />
  ),
  ol: (p) => (
    <ol
      className="mt-5 list-decimal space-y-3 pl-6 text-[16px] leading-[1.7] text-[#C4C6CA] marker:text-[#A8C7FA] md:text-[18px]"
      {...omitNode(p)}
    />
  ),
  li: (p) => (
    <li
      className="relative pl-6 before:absolute before:left-0 before:top-[12px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#A8C7FA] md:before:top-[14px]"
      {...omitNode(p)}
    />
  ),
  strong: (p) => (
    <strong className="font-semibold text-[#E2E2E6]" {...omitNode(p)} />
  ),
  blockquote: (p) => (
    <blockquote
      className="my-8 rounded-r-3xl border-l-[6px] border-[#A8C7FA] bg-[#111114] py-5 pl-6 pr-5 text-[17px] italic leading-relaxed text-[#C4C6CA]"
      {...omitNode(p)}
    />
  ),
  hr: () => <hr className="my-14 border-t border-[#282A2E]" />,
  pre: (p) => (
    <pre
      className="mt-8 max-w-full overflow-x-auto rounded-[24px] bg-[#111114] p-5 text-[14px] leading-relaxed scrollbar-thin scrollbar-track-[#1E1F22] scrollbar-thumb-[#44474E] md:p-6"
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
        className="break-words rounded-lg bg-[#1E1F22] px-2 py-1 text-[0.85em] font-medium text-[#A8C7FA]"
        {...omitNode(rest)}
      >
        {children}
      </code>
    );
  },
  table: (p) => (
    <div className="my-10 block w-full max-w-full overflow-x-auto rounded-[24px] border border-[#282A2E] bg-[#111114] scrollbar-thin scrollbar-track-[#1E1F22] scrollbar-thumb-[#44474E]">
      <table
        className="w-full min-w-[600px] border-collapse text-[15px] md:text-[16px]"
        {...omitNode(p)}
      />
    </div>
  ),
  thead: (p) => <thead className="bg-[#1E1F22]" {...omitNode(p)} />,
  th: (p) => (
    <th
      className="whitespace-nowrap px-6 py-4 text-left font-medium text-[#E2E2E6]"
      {...omitNode(p)}
    />
  ),
  td: (p) => (
    <td
      className="border-t border-[#282A2E] px-6 py-4 text-[#C4C6CA]"
      {...omitNode(p)}
    />
  ),
  img: (p) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-10 h-auto w-full rounded-[28px] bg-[#111114] object-cover sm:object-contain"
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
        <header className="mb-14">
          <h1 className="text-[36px] font-normal tracking-tight text-[#E2E2E6] md:text-[48px] md:leading-tight">
            {doc.meta.title}
          </h1>
          {doc.meta.description && (
            <p className="mt-5 text-[18px] leading-relaxed text-[#A8C7FA] md:text-[20px]">
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
