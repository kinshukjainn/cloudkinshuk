"use client";

import { useRef, useState, type ReactNode } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

type CodeBlockProps = {
  children: ReactNode;
};

export default function CodeBlock({ children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const raw = preRef.current?.textContent ?? "";
    const text = raw.replace(/\n$/, "");

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / non-secure contexts
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
    <div className="group relative my-6">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Code copied" : "Copy code"}
        aria-live="polite"
        className="absolute right-3 top-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-full border border-[#d0d7de] bg-white/80 px-2.5 text-xs font-medium text-[#57606a] opacity-100 shadow-sm backdrop-blur-xs transition-all duration-200  focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57d0]/40 md:opacity-0 md:group-hover:opacity-100 dark:border-[#30363d] dark:bg-[#252525]/80 dark:text-white  "
      >
        {copied ? (
          <>
            <IoCheckmark className="text-sm text-blue-500" />
            <span className="text-blue-500">Copied</span>
          </>
        ) : (
          <>
            <IoCopyOutline className="text-sm" />
            <span>Copy</span>
          </>
        )}
      </button>

      <pre
        ref={preRef}
        className="m-0 overflow-x-auto rounded-xl border border-[#d0d7de] bg-[#f6f8fa] p-5 font-mono text-[13.5px] leading-6 text-[#24292f] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#c4c7c5] dark:border-[#30363d] dark:bg-[#121212] dark:text-[#c9d1d9] dark:scrollbar-thumb-[#444746]"
      >
        {children}
      </pre>
    </div>
  );
}
