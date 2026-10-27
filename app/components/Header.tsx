"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── Icons ─────────────────────────────────────────────── */
type IconProps = { className?: string };

function BlogIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10h6M9 13.5h6M9 17h3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeedbackIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 5.5h16v10a1 1 0 0 1-1 1H9l-4 3.5v-3.5H5a1 1 0 0 1-1-1v-10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.5h8M8 12.5h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Nav model ─────────────────────────────────────────── */
type NavEntry = {
  href: string;
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
};

const NAV: NavEntry[] = [
  { href: "/blogs", label: "Blogs", icon: BlogIcon },
  { href: "/blogs-fd", label: "Feedbacks", icon: FeedbackIcon },
];

/* ── Design tokens (match the homepage) ────────────────── */
const TOKENS = {
  "--bg": "#0d0d0c",
  "--fg": "#d6d1c6",
  "--head": "#f2eee5",
  "--muted": "#8b867c",
  "--accent": "#d0a869",
  "--accent-hover": "#e8c98f",
  "--rule": "#272521",
} as React.CSSProperties;

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]";

/* ── Header ────────────────────────────────────────────── */
export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header style={TOKENS} className="sticky top-0 z-50 w-full  bg-[#242526]">
      <div className="mx-auto flex h-14 w-full max-w-[680px] items-center gap-2 px-4 sm:h-16 sm:gap-4 sm:px-8">
        {/* Brand — serif, tilde prefix matches the homepage shell vibe */}
        <Link
          href="/"
          aria-label="Home"
          className={[
            "inline-flex shrink-0 items-baseline gap-1  text-[17px] text-[var(--head)] font-bold  transition-colors hover:text-[var(--accent-hover)] sm:text-lg",
            FOCUS,
          ].join(" ")}
        >
          <span className="hidden min-[400px]:inline">Cloudkinshuk.in</span>
          <span className="min-[400px]:hidden">Cloudkinshuk.in</span>
        </Link>

        {/* Nav — flat links, underline marks the active page */}
        <nav
          aria-label="Primary"
          className="ml-auto flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2"
        >
          {NAV.map((entry) => {
            const active = isActive(entry.href);
            const Icon = entry.icon;
            return (
              <Link
                key={entry.href}
                href={entry.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex h-9 shrink-0 items-center rounded-md gap-1.5 px-2 py-2 text-[15px] transition-colors sm:px-3",
                  FOCUS,
                  active
                    ? "text-white  bg-[#121212]  font-medium underline-offset-[6px]"
                    : "text-gray-300 hover:text-white  hover:bg-[#121212]",
                ].join(" ")}
              >
                <Icon className="h-[15px] w-[15px] shrink-0" />
                <span>{entry.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
