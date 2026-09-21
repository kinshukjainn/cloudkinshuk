"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import {
  GitBranch,
  Search,
  Filter,
  ExternalLink,
  Github,
  Clock,
  AlertCircle,
  FileCode2,
  X,
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}

interface CommitData {
  message: string;
  author: CommitAuthor;
}

interface GithubCommit {
  sha: string;
  html_url: string;
  commit: CommitData;
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

// ============================================================================
// Configuration
// ============================================================================

const GITHUB_CONFIG = {
  username: "kinshukjainn",
  repository: "cloudkinshuk",
  branch: "main",
  perPage: 100,
  maxPages: 20,
};

const COMMIT_TYPES = [
  { id: "all", label: "All", tint: "neutral" as const },
  { id: "feat", label: "Features", tint: "green" as const },
  { id: "fix", label: "Fixes", tint: "rose" as const },
  { id: "chore", label: "Chores", tint: "amber" as const },
  { id: "docs", label: "Docs", tint: "cyan" as const },
  { id: "refactor", label: "Refactors", tint: "purple" as const },
];

// ============================================================================
// Utility Functions
// ============================================================================

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getCommitTitle = (message: string) => message.split("\n")[0];

const getDayGroup = (dateString: string): string => {
  const d = new Date(dateString);
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(startOfToday);
  startOfMonth.setDate(startOfMonth.getDate() - 30);

  if (d >= startOfToday) return "Today";
  if (d >= startOfYesterday) return "Yesterday";
  if (d >= startOfWeek) return "This week";
  if (d >= startOfMonth) return "This month";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(d);
};

/* ── Material 3 Expressive · Pixel UI tokens ────────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "border border-[#C4C7C5]/60 dark:border-[#3C4043] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const SURFACE_FLAT =
  "bg-[#F0F4F9] dark:bg-[#1E1F20] " +
  "border border-[#C4C7C5]/50 dark:border-[#3C4043]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#0B57D0] dark:focus-visible:ring-[#A8C7FA] " +
  "focus-visible:ring-offset-0";

const STATE = "hover:bg-[#0B57D0]/[0.08] dark:hover:bg-[#A8C7FA]/[0.14]";

/* ── Colour tints (Material 3 tonal palette) ────────────── */
const TINTS = {
  blue: {
    idle: "bg-[#D3E3FD] text-[#0B57D0] dark:bg-[#0B57D0]/25 dark:text-[#A8C7FA]",
    solid: "bg-[#0B57D0] text-white dark:bg-[#A8C7FA] dark:text-[#041E49]",
    soft: "bg-[#D3E3FD] ring-1 ring-inset ring-[#0B57D0]/25 dark:bg-[#0B57D0]/25 dark:ring-[#A8C7FA]/35",
    text: "text-[#0B57D0] dark:text-[#A8C7FA]",
  },
  green: {
    idle: "bg-[#C8F0D4] text-[#146C2E] dark:bg-[#146C2E]/35 dark:text-[#6DD58C]",
    solid: "bg-[#146C2E] text-white dark:bg-[#6DD58C] dark:text-[#072711]",
    soft: "bg-[#C8F0D4] ring-1 ring-inset ring-[#146C2E]/25 dark:bg-[#146C2E]/35 dark:ring-[#6DD58C]/35",
    text: "text-[#146C2E] dark:text-[#6DD58C]",
  },
  amber: {
    idle: "bg-[#FFE8B8] text-[#7A4E00] dark:bg-[#F9AB00]/20 dark:text-[#FDD663]",
    solid: "bg-[#F9AB00] text-[#2A1800] dark:bg-[#FDD663] dark:text-[#2A1800]",
    soft: "bg-[#FFE8B8] ring-1 ring-inset ring-[#F9AB00]/30 dark:bg-[#F9AB00]/20 dark:ring-[#FDD663]/35",
    text: "text-[#7A4E00] dark:text-[#FDD663]",
  },
  purple: {
    idle: "bg-[#EADDFF] text-[#6750A4] dark:bg-[#D0BCFF]/25 dark:text-[#D0BCFF]",
    solid: "bg-[#6750A4] text-white dark:bg-[#D0BCFF] dark:text-[#21005D]",
    soft: "bg-[#EADDFF] ring-1 ring-inset ring-[#6750A4]/25 dark:bg-[#D0BCFF]/25 dark:ring-[#D0BCFF]/35",
    text: "text-[#6750A4] dark:text-[#D0BCFF]",
  },
  cyan: {
    idle: "bg-[#C2E7FF] text-[#00639B] dark:bg-[#004A77] dark:text-[#7FCFFF]",
    solid: "bg-[#00639B] text-white dark:bg-[#7FCFFF] dark:text-[#00344F]",
    soft: "bg-[#C2E7FF] ring-1 ring-inset ring-[#00639B]/25 dark:bg-[#004A77] dark:ring-[#7FCFFF]/35",
    text: "text-[#00639B] dark:text-[#7FCFFF]",
  },
  rose: {
    idle: "bg-[#FFDAD6] text-[#B3261E] dark:bg-[#8C1D18]/40 dark:text-[#F2B8B5]",
    solid: "bg-[#B3261E] text-white dark:bg-[#F2B8B5] dark:text-[#410E0B]",
    soft: "bg-[#FFDAD6] ring-1 ring-inset ring-[#B3261E]/25 dark:bg-[#8C1D18]/40 dark:ring-[#F2B8B5]/35",
    text: "text-[#B3261E] dark:text-[#F2B8B5]",
  },
  neutral: {
    idle: "bg-[#E3E3E3] text-[#1F1F1F] dark:bg-[#C4C7C5]/20 dark:text-[#E3E3E3]",
    solid: "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]",
    soft: "bg-[#E3E3E3] ring-1 ring-inset ring-[#1F1F1F]/15 dark:bg-[#C4C7C5]/20 dark:ring-[#E3E3E3]/25",
    text: "text-[#1F1F1F] dark:text-[#E3E3E3]",
  },
} as const;

type TintKey = keyof typeof TINTS;

/* ── Commit type → tint mapping ─────────────────────────── */
function commitTypeTint(message: string): TintKey {
  const msg = message.toLowerCase();
  if (msg.startsWith("feat")) return "green";
  if (msg.startsWith("fix")) return "rose";
  if (msg.startsWith("chore")) return "amber";
  if (msg.startsWith("docs")) return "cyan";
  if (msg.startsWith("refactor")) return "purple";
  return "blue";
}

/* ── Filter chip ────────────────────────────────────────── */
interface FilterChipProps {
  label: string;
  active: boolean;
  tint: TintKey;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active,
  tint,
  onClick,
}) => {
  const t = TINTS[tint];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        group inline-flex items-center gap-1.5 rounded-full
        py-1.5 pl-1.5 pr-3 text-xs font-semibold
        transition-all duration-300 ${EASE}
        active:scale-[0.95] active:rounded-[14px]
        ${FOCUS}
        ${
          active
            ? t.soft
            : `${SURFACE} text-[#444746] dark:text-[#C4C7C5] ${STATE} hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]`
        }
      `}
    >
      <span
        className={`
          grid h-5 w-5 shrink-0 place-items-center rounded-full
          transition-all duration-300 ${SPRING}
          ${active ? `rounded-[6px] ${t.solid}` : t.idle}
        `}
      >
        {active ? (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
        )}
      </span>
      <span className={active ? "text-[#1F1F1F] dark:text-[#E3E3E3]" : ""}>
        {label}
      </span>
    </button>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export default function ChangelogTracker() {
  const [commits, setCommits] = useState<GithubCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchingProgress, setFetchingProgress] = useState<number>(0);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchCommits = async () => {
    setLoading(true);
    setError(null);
    setFetchingProgress(0);

    try {
      let allCommits: GithubCommit[] = [];
      let page = 1;
      let shouldFetchMore = true;

      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      while (shouldFetchMore && page <= GITHUB_CONFIG.maxPages) {
        setFetchingProgress(page);

        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/commits?sha=${GITHUB_CONFIG.branch}&per_page=${GITHUB_CONFIG.perPage}&page=${page}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          if (response.status === 403)
            throw new Error("GitHub API rate limit exceeded.");
          if (response.status === 404) throw new Error("Repository not found.");
          throw new Error(
            `Failed to fetch commits (Status: ${response.status})`,
          );
        }

        const data: GithubCommit[] = await response.json();

        if (data.length === 0) break;

        allCommits = [...allCommits, ...data];

        const oldestDateInBatch = new Date(
          data[data.length - 1].commit.author.date,
        );

        if (oldestDateInBatch < oneYearAgo) {
          shouldFetchMore = false;
        } else {
          page++;
        }
      }

      setCommits(allCommits);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  // --------------------------------------------------------------------------
  // Data Processing & Filtering
  // --------------------------------------------------------------------------

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(commits.map((c) => c.commit.author.name)));
  }, [commits]);

  const displayCommits = useMemo(() => {
    return commits.filter((commit) => {
      const msg = commit.commit.message.toLowerCase();
      const authorName = commit.commit.author.name;
      const sha = commit.sha.toLowerCase();

      if (
        searchQuery &&
        !msg.includes(searchQuery.toLowerCase()) &&
        !sha.includes(searchQuery.toLowerCase())
      )
        return false;
      if (authorFilter !== "all" && authorName !== authorFilter) return false;
      if (
        typeFilter !== "all" &&
        !(msg.startsWith(`${typeFilter}:`) || msg.startsWith(`${typeFilter}(`))
      )
        return false;

      return true;
    });
  }, [commits, searchQuery, authorFilter, typeFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, GithubCommit[]>();
    for (const c of displayCommits) {
      const key = getDayGroup(c.commit.author.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries());
  }, [displayCommits]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (authorFilter !== "all" ? 1 : 0) +
    (typeFilter !== "all" ? 1 : 0);

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  return (
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#D3E3FD] selection:text-[#041E49]
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#0842A0] dark:selection:text-[#D3E3FD]
      "
    >
      {/* ═══════════════════════════════════════════════════════════
          STICKY HEADER
      ═══════════════════════════════════════════════════════════ */}
      <header
        className={`
          sticky top-16 z-30 mx-auto w-[calc(100%-1.5rem)] max-w-4xl
          rounded-[28px] ${SURFACE}
        `}
      >
        <div className="px-4 sm:px-6 md:px-8">
          {/* Row 1 — identity + actions */}
          <div className="flex h-14 items-center gap-2">
            {/* Branch chip */}
            <span
              className={`
                hidden shrink-0 items-center gap-1 rounded-full
                py-1 pl-1 pr-2.5 text-[11px] font-semibold
                sm:inline-flex
                ${TINTS.cyan.soft}
              `}
            >
              <span
                className={`
                  grid h-5 w-5 shrink-0 place-items-center rounded-full
                  ${TINTS.cyan.solid}
                `}
              >
                <GitBranch className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
                {GITHUB_CONFIG.branch}
              </span>
            </span>

            {/* Repo name */}
            <h1 className="truncate text-sm font-semibold tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3] md:text-[15px]">
              {GITHUB_CONFIG.repository}
            </h1>

            {/* Record count */}
            <span className="hidden shrink-0 text-xs tabular-nums text-[#747775] dark:text-[#8E918F] md:inline">
              · {displayCommits.length} records
            </span>

            {/* Desktop inline search */}
            <div className="relative ml-auto hidden w-full max-w-xs lg:block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#747775] dark:text-[#8E918F]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commits…"
                className={`
                  h-9 w-full rounded-full border border-[#C4C7C5]/60
                  bg-[#F0F4F9] pl-9 pr-8 text-[13px] text-[#1F1F1F]
                  placeholder:text-[#747775]
                  transition-all duration-200 ${EASE}
                  focus:border-[#0B57D0] focus:bg-white focus:outline-none
                  focus:ring-2 focus:ring-[#0B57D0]/20
                  dark:border-[#3C4043] dark:bg-[#282A2C] dark:text-[#E3E3E3]
                  dark:placeholder:text-[#8E918F]
                  dark:focus:border-[#A8C7FA] dark:focus:bg-[#1E1F20]
                  dark:focus:ring-[#A8C7FA]/20
                `}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className={`
                    absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1
                    text-[#747775] dark:text-[#8E918F]
                    transition-all duration-200 ${EASE}
                    hover:bg-[#0B57D0]/10 hover:text-[#0B57D0]
                    dark:hover:bg-[#A8C7FA]/15 dark:hover:text-[#A8C7FA]
                    ${FOCUS}
                  `}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Mobile spacer pushes actions right */}
            <div className="ml-auto lg:hidden" />
            <div className="hidden lg:block" />

            {/* Actions cluster */}
            <div className="flex shrink-0 items-center gap-1.5">
              {/* Filter toggle */}
              <button
                type="button"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                className={`
                  relative inline-flex h-9 items-center gap-1.5 rounded-full
                  px-3 text-[13px] font-semibold
                  transition-all duration-300 ${EASE}
                  active:scale-[0.95] active:rounded-[14px]
                  ${FOCUS}
                  ${
                    showFilters || activeFilterCount > 0
                      ? "bg-[#0B57D0] text-white shadow-[0_1px_3px_rgba(0,0,0,0.16),0_6px_16px_-8px_rgba(11,87,208,0.9)] dark:bg-[#A8C7FA] dark:text-[#041E49] dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_6px_16px_-8px_rgba(168,199,250,0.7)]"
                      : `${SURFACE} text-[#444746] dark:text-[#C4C7C5] ${STATE} hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]`
                  }
                `}
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span
                    className="
                      inline-flex h-4 min-w-4 items-center justify-center rounded-full
                      bg-white px-1 text-[10px] font-bold text-[#0B57D0]
                      dark:bg-[#041E49] dark:text-[#A8C7FA]
                    "
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Mobile overflow menu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-label="More options"
                aria-expanded={mobileMenuOpen}
                className={`
                  inline-flex h-9 w-9 items-center justify-center rounded-full
                  transition-all duration-300 ${EASE}
                  active:scale-90 active:rounded-[10px] lg:hidden
                  ${FOCUS}
                  ${
                    mobileMenuOpen
                      ? "bg-[#0B57D0] text-white dark:bg-[#A8C7FA] dark:text-[#041E49]"
                      : `${SURFACE} text-[#444746] dark:text-[#C4C7C5] ${STATE} hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]`
                  }
                `}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>

              {/* Desktop: Repo */}
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  hidden h-9 items-center gap-1.5 rounded-full px-3
                  text-[13px] font-semibold lg:inline-flex
                  text-[#444746] dark:text-[#C4C7C5] ${SURFACE} ${STATE}
                  transition-all duration-300 ${EASE}
                  hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                  active:scale-[0.95] active:rounded-[14px]
                  ${FOCUS}
                `}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">Repo</span>
              </a>

              {/* Desktop: View Tree */}
              <Link
                href="/git-track/tree"
                className={`
                  hidden h-9 items-center gap-1.5 rounded-full px-3
                  text-[13px] font-semibold text-white lg:inline-flex
                  bg-[#0B57D0]
                  shadow-[0_1px_3px_rgba(0,0,0,0.16),0_6px_16px_-8px_rgba(11,87,208,0.9)]
                  transition-all duration-300 ${EASE}
                  hover:brightness-110
                  active:scale-[0.95] active:rounded-[14px]
                  dark:bg-[#A8C7FA] dark:text-[#041E49]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_6px_16px_-8px_rgba(168,199,250,0.7)]
                  ${FOCUS}
                `}
              >
                <FileCode2 className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">Tree</span>
              </Link>
            </div>
          </div>

          {/* Row 2 — mobile search */}
          <div className="pb-2.5 lg:hidden">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#747775] dark:text-[#8E918F]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commits…"
                className={`
                  h-9 w-full rounded-full border border-[#C4C7C5]/60
                  bg-[#F0F4F9] pl-9 pr-8 text-[13px] text-[#1F1F1F]
                  placeholder:text-[#747775]
                  transition-all duration-200 ${EASE}
                  focus:border-[#0B57D0] focus:bg-white focus:outline-none
                  focus:ring-2 focus:ring-[#0B57D0]/20
                  dark:border-[#3C4043] dark:bg-[#282A2C] dark:text-[#E3E3E3]
                  dark:placeholder:text-[#8E918F]
                  dark:focus:border-[#A8C7FA] dark:focus:bg-[#1E1F20]
                  dark:focus:ring-[#A8C7FA]/20
                `}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className={`
                    absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1
                    text-[#747775] dark:text-[#8E918F]
                    transition-all duration-200 ${EASE}
                    hover:bg-[#0B57D0]/10 hover:text-[#0B57D0]
                    dark:hover:bg-[#A8C7FA]/15 dark:hover:text-[#A8C7FA]
                    ${FOCUS}
                  `}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile overflow menu (Repo + Tree) */}
          {mobileMenuOpen && (
            <div className="flex gap-2 pb-2.5 lg:hidden">
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex h-9 flex-1 items-center justify-center gap-1.5
                  rounded-full text-[13px] font-semibold
                  text-[#444746] dark:text-[#C4C7C5] ${SURFACE} ${STATE}
                  transition-all duration-300 ${EASE}
                  hover:text-[#0B57D0] dark:hover:text-[#A8C7FA]
                  active:scale-[0.97] active:rounded-[14px]
                  ${FOCUS}
                `}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Repository
              </a>
              <Link
                href="/git-track/tree"
                className={`
                  inline-flex h-9 flex-1 items-center justify-center gap-1.5
                  rounded-full text-[13px] font-semibold text-white
                  bg-[#0B57D0]
                  shadow-[0_1px_3px_rgba(0,0,0,0.16),0_6px_16px_-8px_rgba(11,87,208,0.9)]
                  transition-all duration-300 ${EASE}
                  hover:brightness-110
                  active:scale-[0.97] active:rounded-[14px]
                  dark:bg-[#A8C7FA] dark:text-[#041E49]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_6px_16px_-8px_rgba(168,199,250,0.7)]
                  ${FOCUS}
                `}
              >
                <FileCode2 className="h-4 w-4" aria-hidden="true" />
                View Tree
              </Link>
            </div>
          )}

          {/* Filter panel (integrated in the sticky header) */}
          {showFilters && (
            <div className="pb-3">
              <div
                className={`
                  max-h-[55vh] space-y-4 overflow-y-auto rounded-[20px]
                  ${SURFACE_FLAT} p-4
                `}
              >
                {/* Type chips */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#747775] dark:text-[#8E918F]">
                    Type
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMIT_TYPES.map((t) => (
                      <FilterChip
                        key={t.id}
                        label={t.label}
                        active={typeFilter === t.id}
                        tint={t.tint}
                        onClick={() => setTypeFilter(t.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Author chips */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#747775] dark:text-[#8E918F]">
                    Author
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["all", ...uniqueAuthors].map((a) => (
                      <FilterChip
                        key={a}
                        label={a === "all" ? "All" : a}
                        active={authorFilter === a}
                        tint="blue"
                        onClick={() => setAuthorFilter(a)}
                      />
                    ))}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setAuthorFilter("all");
                      setTypeFilter("all");
                    }}
                    className={`
                      inline-flex items-center gap-1.5 rounded-full
                      py-1.5 pl-1.5 pr-3.5 text-xs font-semibold
                      ${TINTS.rose.soft} text-[#1F1F1F] dark:text-[#E3E3E3]
                      transition-all duration-300 ${EASE}
                      active:scale-[0.95] active:rounded-[14px]
                      ${FOCUS}
                    `}
                  >
                    <span
                      className={`
                        grid h-5 w-5 shrink-0 place-items-center rounded-full
                        ${TINTS.rose.solid}
                      `}
                    >
                      <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    </span>
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-4xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        {/* ── STATUS STATES ── */}

        {/* Loading */}
        {loading && (
          <div
            className={`
              flex flex-col items-center justify-center space-y-4
              rounded-[28px] p-10 ${SURFACE}
            `}
          >
            <span
              className={`
                grid h-14 w-14 place-items-center rounded-[18px]
                ${TINTS.amber.solid}
                shadow-[0_2px_6px_rgba(0,0,0,0.12)]
                transition-transform duration-300 ${SPRING}
              `}
            >
              <Clock className="h-6 w-6 animate-pulse" aria-hidden="true" />
            </span>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                Fetching commits
              </p>
              <p className="mt-0.5 text-xs text-[#747775] dark:text-[#8E918F]">
                Page {fetchingProgress}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className={`
              flex flex-col gap-4 rounded-[28px] p-5
              sm:flex-row sm:items-center sm:justify-between
              ${TINTS.rose.soft}
            `}
          >
            <div className="flex items-center gap-3">
              <span
                className={`
                  grid h-10 w-10 shrink-0 place-items-center rounded-[14px]
                  ${TINTS.rose.solid}
                  shadow-[0_2px_6px_rgba(0,0,0,0.12)]
                `}
              >
                <AlertCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                {error}
              </span>
            </div>
            <button
              type="button"
              onClick={fetchCommits}
              className={`
                inline-flex shrink-0 items-center gap-1.5 rounded-full
                bg-[#B3261E] px-4 py-2 text-xs font-semibold text-white
                shadow-[0_1px_3px_rgba(0,0,0,0.16),0_6px_16px_-8px_rgba(179,38,30,0.8)]
                transition-all duration-300 ${EASE}
                hover:brightness-110
                active:scale-[0.95] active:rounded-[14px]
                dark:bg-[#F2B8B5] dark:text-[#410E0B]
                dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_6px_16px_-8px_rgba(242,184,181,0.6)]
                ${FOCUS}
              `}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && displayCommits.length === 0 && (
          <div
            className={`
              rounded-[28px] p-10 text-center ${SURFACE}
            `}
          >
            <span
              className={`
                mx-auto mb-3 grid h-12 w-12 place-items-center rounded-[16px]
                ${TINTS.neutral.idle}
              `}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
              No matching commits
            </p>
            <p className="mt-0.5 text-xs text-[#747775] dark:text-[#8E918F]">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="space-y-8">
            {grouped.map(([group, items]) => (
              <section key={group}>
                {/* Group header */}
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={`
                      inline-flex items-center gap-1.5 rounded-full
                      py-1 pl-1 pr-2.5 text-[10px] font-bold uppercase tracking-wider
                      ${TINTS.blue.soft}
                    `}
                  >
                    <span
                      className={`
                        grid h-4 w-4 place-items-center rounded-full
                        ${TINTS.blue.solid}
                      `}
                    >
                      <span className="h-1 w-1 rounded-full bg-current" />
                    </span>
                    <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
                      {group}
                    </span>
                  </span>
                  <span className="h-px flex-1 bg-[#C4C7C5]/40 dark:bg-[#3C4043]" />
                  <span className="text-[11px] font-semibold tabular-nums text-[#747775] dark:text-[#8E918F]">
                    {items.length}
                  </span>
                </div>

                {/* Commits in this group */}
                <ol className="relative space-y-2.5 pl-6">
                  <span
                    aria-hidden="true"
                    className="
                      absolute left-[7px] top-2 bottom-2 w-px
                      bg-[#C4C7C5]/50 dark:bg-[#3C4043]
                    "
                  />

                  {items.map((commit) => {
                    const title = getCommitTitle(commit.commit.message);
                    const shortSha = commit.sha.substring(0, 7);
                    const isHead = commits[0]?.sha === commit.sha;
                    const tint = commitTypeTint(commit.commit.message);
                    const t = TINTS[tint];

                    return (
                      <li key={commit.sha} className="relative">
                        {/* Timeline dot */}
                        <span
                          aria-hidden="true"
                          className={`
                            absolute -left-6 top-5 z-[1] grid h-4 w-4 place-items-center
                            rounded-full border-2 border-[#F7F9FC] dark:border-[#141414]
                            ${isHead ? t.solid : `${TINTS.neutral.idle}`}
                          `}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        </span>

                        <a
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            group block rounded-[24px] ${SURFACE}
                            p-4
                            transition-all duration-300 ${EASE}
                            hover:-translate-y-0.5
                            hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(11,87,208,0.5)]
                            dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(168,199,250,0.35)]
                            ${FOCUS}
                          `}
                        >
                          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <div className="min-w-0 flex-1">
                              {/* Meta row */}
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span
                                  className={`
                                    inline-flex items-center gap-1.5 rounded-full
                                    py-1 pl-1 pr-2.5 text-[10px] font-bold
                                    tabular-nums ${t.soft}
                                  `}
                                >
                                  <span
                                    className={`
                                      grid h-4 w-4 place-items-center rounded-full
                                      ${t.solid}
                                    `}
                                  >
                                    <span className="h-1 w-1 rounded-full bg-current" />
                                  </span>
                                  <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
                                    {shortSha}
                                  </span>
                                </span>
                                {isHead && (
                                  <span
                                    className={`
                                      inline-flex items-center gap-1.5 rounded-full
                                      py-1 pl-1 pr-2.5 text-[10px] font-bold uppercase tracking-wider
                                      ${TINTS.blue.soft}
                                    `}
                                  >
                                    <span
                                      className={`
                                        grid h-4 w-4 place-items-center rounded-full
                                        ${TINTS.blue.solid}
                                      `}
                                    >
                                      <span className="h-1 w-1 rounded-full bg-current" />
                                    </span>
                                    <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
                                      HEAD
                                    </span>
                                  </span>
                                )}
                                <span className="text-[11px] font-medium text-[#747775] dark:text-[#8E918F]">
                                  {timeAgo(commit.commit.author.date)}
                                </span>
                              </div>

                              {/* Commit title */}
                              <p
                                className="
                                  line-clamp-2 text-sm font-semibold leading-snug
                                  text-[#1F1F1F] dark:text-[#E3E3E3]
                                  transition-colors duration-200 ${EASE}
                                  group-hover:text-[#0B57D0] dark:group-hover:text-[#A8C7FA]
                                "
                              >
                                {title}
                              </p>

                              {/* Author row */}
                              <div className="mt-2.5 flex items-center gap-2">
                                <span
                                  className={`
                                    grid h-5 w-5 shrink-0 place-items-center rounded-full
                                    text-[9px] font-bold uppercase
                                    ${TINTS.purple.idle}
                                  `}
                                >
                                  {commit.commit.author.name.charAt(0)}
                                </span>
                                <span className="truncate text-xs font-medium text-[#444746] dark:text-[#C4C7C5]">
                                  {commit.commit.author.name}
                                </span>
                              </div>
                            </div>

                            {/* Diff chip */}
                            <span
                              className={`
                                inline-flex shrink-0 items-center gap-1.5
                                self-start rounded-full py-1.5 pl-1.5 pr-3
                                text-[11px] font-semibold
                                ${t.soft}
                                transition-all duration-300 ${EASE}
                                group-hover:rounded-[12px]
                                text-[#1F1F1F] dark:text-[#E3E3E3]
                              `}
                            >
                              <span
                                className={`
                                  grid h-5 w-5 shrink-0 place-items-center rounded-full
                                  transition-all duration-300 ${SPRING}
                                  group-hover:rounded-[6px]
                                  ${t.solid}
                                `}
                              >
                                <ExternalLink
                                  className="h-3 w-3"
                                  aria-hidden="true"
                                />
                              </span>
                              Diff
                            </span>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
