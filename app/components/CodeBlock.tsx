"use client";

import { isValidElement, useRef, useState, type ReactNode } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

/* ─────────────────────────────────────────────────────────────
   Modern CodeBlock

   · Hairline borders, refined radius, quiet surfaces.
   · Chrome bar carries a language dot + label, copy on the right.
   · Copy affordance: ghost → solid on success.
   · Motion: 200 ms cubic-bezier(0.2,0,0,1).
   ───────────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 " +
  "focus-visible:ring-offset-0";

/* ── Language dot palette ─────────────────────────────────── */
const LANGUAGE_DOTS: Record<string, string> = {
  js: "bg-yellow-400",
  javascript: "bg-yellow-400",
  mjs: "bg-yellow-400",
  cjs: "bg-yellow-400",
  ts: "bg-blue-500",
  typescript: "bg-blue-500",
  jsx: "bg-cyan-400",
  tsx: "bg-cyan-400",
  py: "bg-emerald-500",
  python: "bg-emerald-500",
  html: "bg-orange-500",
  css: "bg-pink-500",
  scss: "bg-pink-500",
  sass: "bg-pink-500",
  json: "bg-amber-500",
  yaml: "bg-rose-500",
  yml: "bg-rose-500",
  bash: "bg-zinc-400",
  shell: "bg-zinc-400",
  sh: "bg-zinc-400",
  zsh: "bg-zinc-400",
  md: "bg-zinc-400",
  markdown: "bg-zinc-400",
  rust: "bg-orange-600",
  rs: "bg-orange-600",
  go: "bg-cyan-500",
  sql: "bg-indigo-500",
  graphql: "bg-fuchsia-500",
  gql: "bg-fuchsia-500",
};

function dotClass(language: string | null): string {
  if (!language) return "bg-zinc-400 dark:bg-zinc-600";
  return (
    LANGUAGE_DOTS[language.toLowerCase()] ?? "bg-zinc-400 dark:bg-zinc-600"
  );
}

type CodeBlockProps = {
  children: ReactNode;
};

/* ── Read the language token from the wrapped <code className="…"> ── */
function extractLanguage(node: ReactNode): string | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = extractLanguage(child);
      if (found) return found;
    }
    return null;
  }
  if (isValidElement(node)) {
    const props = node.props as { className?: string };
    const match = /language-([\w-]+)/.exec(props.className ?? "");
    return match?.[1] ?? null;
  }
  return null;
}

/* ── Pull raw text out of the React tree (fallback for copy). ── */
function extractText(node: ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return "";
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const language = extractLanguage(children);

  const handleCopy = async () => {
    const raw = preRef.current?.textContent ?? extractText(children);
    const text = raw.replace(/\n$/, "");

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`
        group relative my-8 overflow-hidden rounded-xl
        border border-zinc-200 bg-white
        shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-24px_rgba(0,0,0,0.12)]
        transition-shadow duration-200 ${EASE}
        hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-24px_rgba(0,0,0,0.16)]
        dark:border-zinc-800 dark:bg-zinc-950
        dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_12px_32px_-24px_rgba(0,0,0,0.7)]
        dark:hover:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_16px_40px_-24px_rgba(0,0,0,0.85)]
      `}
    >
      {/* ── Chrome bar ─────────────────────────────────────── */}
      <div
        className="
          flex items-center justify-between gap-3
          border-b border-zinc-200 bg-zinc-50/80
          px-3 py-2
          dark:border-zinc-800 dark:bg-zinc-900/60
        "
      >
        {/* Language */}
        <div className="flex min-w-0 items-center gap-2 pl-1">
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full ${dotClass(language)}`}
          />
          <span
            className="
              truncate text-[11px] font-semibold uppercase tracking-wider
              text-zinc-500 dark:text-zinc-400
            "
          >
            {language ?? "code"}
          </span>
        </div>

        {/* Copy */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          aria-live="polite"
          className={`
            inline-flex shrink-0 items-center gap-1.5 rounded-md
            px-2.5 py-1.5 text-[11px] font-medium tracking-wide
            transition-all duration-200 ${EASE}
            active:scale-[0.96]
            ${FOCUS}
            ${
              copied
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }
          `}
        >
          <span className="relative grid h-3.5 w-3.5 place-items-center">
            <IoCheckmark
              aria-hidden="true"
              className={`
                absolute inset-0 m-auto h-3.5 w-3.5
                transition-all duration-300 ${SPRING}
                ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}
              `}
            />
            <IoCopyOutline
              aria-hidden="true"
              className={`
                absolute inset-0 m-auto h-3.5 w-3.5
                transition-all duration-300 ${SPRING}
                ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}
              `}
            />
          </span>
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* ── Code area ──────────────────────────────────────── */}
      <pre
        ref={preRef}
        className="
          m-0 overflow-x-auto
          px-5 py-5
          monofont text-[13.5px] leading-[1.75]
          text-zinc-800 dark:text-zinc-200
          scrollbar-thin scrollbar-track-transparent
          scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700
        "
      >
        {children}
      </pre>
    </div>
  );
}
