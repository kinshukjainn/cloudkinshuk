import Link from "next/link";
import type { CSSProperties } from "react";

const TOKENS = {
  "--bg": "#0d0d0c",
  "--fg": "#d6d1c6",
  "--head": "#f2eee5",
  "--muted": "#8b867c",
  "--accent": "#d0a869",
  "--accent-hover": "#e8c98f",
  "--rule": "#272521",
} as CSSProperties;

export default function Header() {
  return (
    <header
      style={TOKENS}
      className="
        sticky top-0 z-50 w-full
        border-b border-[var(--rule)]
        bg-[#0d0d0c]/90
        backdrop-blur-xl
        transition-colors duration-300
      "
    >
      <div
        className="
          mx-auto flex h-[72px] w-full
          max-w-[680px] items-center
          px-5 sm:h-[80px] sm:px-8
        "
      >
        <Link
          href="/"
          aria-label="Cloudkinshuk.in - Home"
          className="
            group inline-flex items-center
            text-[28px] sm:text-[30px]
            font-semibold
            tracking-[-0.045em]
            leading-none
            text-[var(--head)]
            transition-colors
            duration-300 ease-out
            hover:text-[var(--accent-hover)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--accent)]
            focus-visible:ring-offset-4
            focus-visible:ring-offset-[var(--bg)]
            motion-reduce:transition-none
          "
        >
          <span>Cloudkinshuk</span>
          <span
            className="
              text-[var(--accent)]
              transition-colors duration-300
              group-hover:text-[var(--accent-hover)]
            "
          >
            .in
          </span>
        </Link>
      </div>
    </header>
  );
}
