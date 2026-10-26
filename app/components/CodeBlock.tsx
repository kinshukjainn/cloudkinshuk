"use client";

import { isValidElement, useRef, useState, type ReactNode } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

/* ─────────────────────────────────────────────────────────────
   CodeBlock — forced dark theme with readable syntax colors
   ───────────────────────────────────────────────────────────── */

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d0a869] focus-visible:ring-offset-0";

const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const LANGUAGE_DOTS: Record<string, string> = {
  js: "#d4a94e",
  javascript: "#d4a94e",
  mjs: "#d4a94e",
  cjs: "#d4a94e",
  ts: "#6b8dd6",
  typescript: "#6b8dd6",
  jsx: "#7fb8c4",
  tsx: "#7fb8c4",
  py: "#7d9b6a",
  python: "#7d9b6a",
  html: "#c47a4a",
  css: "#c47a8a",
  scss: "#c47a8a",
  sass: "#c47a8a",
  json: "#d4a94e",
  yaml: "#c47a7a",
  yml: "#c47a7a",
  bash: "#8b867c",
  shell: "#8b867c",
  sh: "#8b867c",
  zsh: "#8b867c",
  md: "#8b867c",
  markdown: "#8b867c",
  rust: "#c47a4a",
  rs: "#c47a4a",
  go: "#7fb8c4",
  sql: "#8a8ac4",
  graphql: "#c47ac4",
  gql: "#c47ac4",
};

function dotColor(language: string | null): string {
  if (!language) return "#8b867c";
  return LANGUAGE_DOTS[language.toLowerCase()] ?? "#8b867c";
}

type CodeBlockProps = {
  children: ReactNode;
};

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
    <div className="my-8 overflow-hidden border border-[#272521] bg-[#171715]">
      {/* 
        CRITICAL FIX: Overrides the default `hljs` light theme 
        so syntax highlighting is visible on the dark background.
      */}
      <style>{`
        .hljs {
          color: #e2ddd2 !important;
          background: transparent !important;
        }
        .hljs-keyword, .hljs-selector-tag, .hljs-literal, .hljs-section, .hljs-link {
          color: #d0a869 !important;
        }
        .hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string {
          color: #7d9b6a !important;
        }
        .hljs-comment, .hljs-quote, .hljs-deletion {
          color: #8b867c !important;
          font-style: italic;
        }
        .hljs-number, .hljs-built_in, .hljs-builtin-name, .hljs-template-variable, .hljs-variable, .hljs-title, .hljs-type {
          color: #c47a4a !important;
        }
        .hljs-function, .hljs-params, .hljs-class, .hljs-title.class_ {
          color: #7fb8c4 !important;
        }
      `}</style>

      {/* ── Chrome bar ─────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-[#272521] bg-[#0d0d0c] px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: dotColor(language) }}
          />
          <span className="truncate font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#8b867c]">
            {language ?? "code"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          aria-live="polite"
          className={[
            "inline-flex shrink-0 items-center gap-1.5 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors",
            FOCUS,
            copied ? "text-[#7d9b6a]" : "text-[#8b867c] hover:text-[#d0a869]",
          ].join(" ")}
        >
          <span className="relative grid h-3.5 w-3.5 place-items-center">
            <IoCheckmark
              aria-hidden="true"
              className={`absolute inset-0 m-auto h-3.5 w-3.5 transition-all duration-300 ${SPRING} ${
                copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
            <IoCopyOutline
              aria-hidden="true"
              className={`absolute inset-0 m-auto h-3.5 w-3.5 transition-all duration-300 ${SPRING} ${
                copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          </span>
          <span>{copied ? "copied" : "copy"}</span>
        </button>
      </div>

      {/* ── Code area ──────────────────────────────────────── */}
      <pre
        ref={preRef}
        className="m-0 overflow-x-auto px-5 py-4 monofont text-[13.5px] leading-[1.75] text-[#e2ddd2] [scrollbar-width:thin] [scrollbar-color:#272521_transparent]"
      >
        {children}
      </pre>
    </div>
  );
}
