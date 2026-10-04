"use client";

import { isValidElement, useRef, useState, type ReactNode } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

/* ─────────────────────────────────────────────────────────────
   Pixel UI · Android 17 · Surface system
   (identical token language to the home page)

   · Soft elevated surface. No hard borders, no pure black.
   · Chrome bar carries the language chip + copy action.
   · Neutral inverted fill marks the "copied" confirmation state.
   · Motion: 300 ms cubic-bezier(0.2,0,0,1) — colour, shadow, lift.
   ───────────────────────────────────────────────────────────── */

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

const NEUTRAL_SOLID =
  "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]";

const TEXT = "text-[#1F1F1F] dark:text-[#E3E3E3]";
const TEXT_SUBTLE = "text-[#747775] dark:text-[#8E918F]";

const HAIRLINE = "border-black/[0.06] dark:border-white/[0.08]";

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
        group relative my-8 overflow-hidden rounded-[24px] ${SURFACE}
        transition-shadow duration-300 ${EASE}
      `}
    >
      {/* ── Chrome bar ─────────────────────────────────────── */}
      <div
        className={`
          flex items-center justify-between gap-3
          border-b ${HAIRLINE}
          px-3 py-2 ${SUBTLE}
        `}
      >
        {/* Language indicator */}
        <span className="inline-flex min-w-0 items-center gap-2 pl-1.5">
          <span
            aria-hidden="true"
            className="
              h-1.5 w-1.5 shrink-0 rounded-full
              bg-[#1F1F1F] dark:bg-[#E3E3E3]
              opacity-55
            "
          />
          <span
            className={`
              truncate text-[11px] font-semibold uppercase tracking-[0.09em]
              ${TEXT_SUBTLE}
            `}
          >
            {language ?? "code"}
          </span>
        </span>

        {/* Copy chip */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          aria-live="polite"
          className={`
            inline-flex shrink-0 items-center gap-1.5 rounded-full
            px-3 py-1.5 text-[11px] font-semibold
            transition-all duration-300 ${EASE}
            active:scale-[0.95] active:rounded-[10px]
            ${FOCUS}
            ${
              copied
                ? NEUTRAL_SOLID
                : `bg-white dark:bg-[#1E1F20] ${TEXT}
                   shadow-[0_1px_2px_rgba(0,0,0,0.05),0_2px_8px_-4px_rgba(0,0,0,0.28)]
                   dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_2px_8px_-4px_rgba(0,0,0,0.85)]
                   hover:bg-black/[0.03] dark:hover:bg-white/[0.05]`
            }
          `}
        >
          {/* Icon swap — cross-fade + spring scale */}
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
        className={`
          m-0 overflow-x-auto
          px-5 py-5
          font-mono text-[13.5px] leading-[1.75]
          ${TEXT}
          scrollbar-thin scrollbar-track-transparent
          scrollbar-thumb-black/20 dark:scrollbar-thumb-white/20
        `}
      >
        {children}
      </pre>
    </div>
  );
}
