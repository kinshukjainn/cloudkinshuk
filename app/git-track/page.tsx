"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

/* ────────────────────────────────────────────────────────────
   Theme tokens — monochrome, borderless (matches header/home)
   ──────────────────────────────────────────────────────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const SUBTLE = "bg-[#F0F4F9] dark:bg-[#282A2C]";
const SOLID = "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] " +
  "focus-visible:ring-offset-0";

/* ────────────────────────────────────────────────────────────
   Framer Motion curves + springs (Material 3 Expressive)
   ──────────────────────────────────────────────────────────── */
const easeOut = [0.16, 1, 0.3, 1] as const;
const easeEmphasized = [0.2, 0, 0, 1] as const;

const shapeSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.7,
};

/* ────────────────────────────────────────────────────────────
   Shape library — one shape per commit type. Keeps the whole
   UI monochrome while still visually differentiating types.
   ──────────────────────────────────────────────────────────── */
type Shape = {
  borderRadius: string;
  rotate: number;
  scaleX: number;
  scaleY: number;
};

const SHAPES: Shape[] = [
  { borderRadius: "50%", rotate: 0, scaleX: 1, scaleY: 1 }, // 0 · circle   (all)
  { borderRadius: "32%", rotate: 0, scaleX: 1, scaleY: 1 }, // 1 · squircle (feat)
  { borderRadius: "16%", rotate: 45, scaleX: 1, scaleY: 1 }, // 2 · diamond  (fix)
  { borderRadius: "50% 4% 50% 4%", rotate: 0, scaleX: 1, scaleY: 1 }, // 3 · leaf (chore)
  { borderRadius: "50%", rotate: 0, scaleX: 1.7, scaleY: 0.8 }, // 4 · pill     (docs)
  { borderRadius: "14%", rotate: 0, scaleX: 1, scaleY: 1 }, // 5 · square   (refactor)
];

const COMMIT_TYPES = [
  { id: "all", label: "All", shapeIndex: 0 },
  { id: "feat", label: "Features", shapeIndex: 1 },
  { id: "fix", label: "Fixes", shapeIndex: 2 },
  { id: "chore", label: "Chores", shapeIndex: 3 },
  { id: "docs", label: "Docs", shapeIndex: 4 },
  { id: "refactor", label: "Refactors", shapeIndex: 5 },
];

function commitTypeShapeIndex(message: string): number {
  const msg = message.toLowerCase();
  if (msg.startsWith("feat")) return 1;
  if (msg.startsWith("fix")) return 2;
  if (msg.startsWith("chore")) return 3;
  if (msg.startsWith("docs")) return 4;
  if (msg.startsWith("refactor")) return 5;
  return 0;
}

/* ────────────────────────────────────────────────────────────
   ShapeDot — the atomic shape indicator used across the UI
   ──────────────────────────────────────────────────────────── */
interface ShapeDotProps {
  shapeIndex: number;
  active: boolean;
  size?: number;
  animate?: boolean;
}

const ShapeDot: React.FC<ShapeDotProps> = ({
  shapeIndex,
  active,
  size = 14,
  animate = true,
}) => {
  const reduceMotion = useReducedMotion();
  const shape = SHAPES[shapeIndex % SHAPES.length];
  const target = active
    ? shape
    : { borderRadius: "50%", rotate: 0, scaleX: 1, scaleY: 1 };

  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={
        animate && !reduceMotion
          ? {
              borderRadius: target.borderRadius,
              rotate: target.rotate,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
            }
          : undefined
      }
      transition={shapeSpring}
      style={{
        width: size,
        height: size,
        borderRadius: target.borderRadius,
        transform: `rotate(${target.rotate}deg) scale(${target.scaleX}, ${target.scaleY})`,
      }}
      className={`block shrink-0 ${active ? SOLID : SUBTLE}`}
    />
  );
};

/* ────────────────────────────────────────────────────────────
   FilterChip — shape-morphing, monochrome filter pill
   ──────────────────────────────────────────────────────────── */
interface FilterChipProps {
  label: string;
  active: boolean;
  shapeIndex: number;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active,
  shapeIndex,
  onClick,
}) => {
  const reduceMotion = useReducedMotion();
  const shape = SHAPES[shapeIndex % SHAPES.length];
  const target = active
    ? shape
    : { borderRadius: "50%", rotate: 0, scaleX: 1, scaleY: 1 };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      transition={shapeSpring}
      className={`
        group inline-flex items-center gap-2 rounded-full
        py-1.5 pl-1.5 pr-3 text-xs font-semibold
        transition-colors duration-300 ${EASE}
        ${FOCUS}
        ${
          active
            ? `${SOLID}`
            : `${SURFACE} text-[#444746] dark:text-[#C4C7C5] hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]`
        }
      `}
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                borderRadius: target.borderRadius,
                rotate: target.rotate,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
              }
        }
        transition={shapeSpring}
        style={{
          borderRadius: target.borderRadius,
          transform: `rotate(${target.rotate}deg) scale(${target.scaleX}, ${target.scaleY})`,
        }}
        className={`
          grid h-4 w-4 shrink-0 place-items-center
          ${active ? "bg-white/25 dark:bg-black/20" : SUBTLE}
        `}
      />
      <span className={active ? "text-white dark:text-[#1F1F1F]" : ""}>
        {label}
      </span>
    </motion.button>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export default function ChangelogTracker() {
  const reduceMotion = useReducedMotion();
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
        selection:bg-[#1F1F1F] selection:text-white
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#E3E3E3] dark:selection:text-[#1F1F1F]
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
                hidden shrink-0 items-center gap-1.5 rounded-full
                py-1 pl-1 pr-2.5 text-[11px] font-semibold
                sm:inline-flex ${SUBTLE}
              `}
            >
              <span
                className={`
                  grid h-5 w-5 shrink-0 place-items-center rounded-full
                  ${SOLID}
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
                  h-9 w-full rounded-full ${SUBTLE}
                  pl-9 pr-8 text-[13px] text-[#1F1F1F]
                  placeholder:text-[#747775]
                  transition-shadow duration-300 ${EASE}
                  focus:bg-white focus:outline-none
                  focus:shadow-[0_0_0_2px_rgba(31,31,31,0.35)]
                  dark:text-[#E3E3E3] dark:placeholder:text-[#8E918F]
                  dark:focus:bg-[#1E1F20]
                  dark:focus:shadow-[0_0_0_2px_rgba(227,227,227,0.35)]
                `}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18, ease: easeOut }}
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className={`
                      absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1
                      text-[#747775] dark:text-[#8E918F]
                      transition-colors duration-200 ${EASE}
                      hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]
                      ${FOCUS}
                    `}
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile spacer pushes actions right */}
            <div className="ml-auto lg:hidden" />
            <div className="hidden lg:block" />

            {/* Actions cluster */}
            <div className="flex shrink-0 items-center gap-1.5">
              {/* Filter toggle */}
              <motion.button
                type="button"
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                className={`
                  relative inline-flex h-9 items-center gap-1.5 rounded-full
                  px-3 text-[13px] font-semibold
                  transition-colors duration-300 ${EASE}
                  ${FOCUS}
                  ${
                    showFilters || activeFilterCount > 0
                      ? `${SOLID}`
                      : `${SURFACE} text-[#444746] dark:text-[#C4C7C5] hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]`
                  }
                `}
              >
                <motion.span
                  animate={
                    reduceMotion ? undefined : { rotate: showFilters ? 180 : 0 }
                  }
                  transition={shapeSpring}
                  className="grid place-items-center"
                >
                  <Filter className="h-4 w-4" aria-hidden="true" />
                </motion.span>
                <span className="hidden sm:inline">Filters</span>
                <AnimatePresence>
                  {activeFilterCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={shapeSpring}
                      className={`
                        inline-flex h-4 min-w-4 items-center justify-center
                        rounded-full px-1 text-[10px] font-bold
                        ${
                          showFilters || activeFilterCount > 0
                            ? "bg-white/25 text-white dark:bg-black/20 dark:text-[#1F1F1F]"
                            : "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]"
                        }
                      `}
                    >
                      {activeFilterCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile overflow menu */}
              <motion.button
                type="button"
                whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-label="More options"
                aria-expanded={mobileMenuOpen}
                className={`
                  inline-flex h-9 w-9 items-center justify-center rounded-full
                  transition-colors duration-300 ${EASE}
                  lg:hidden ${FOCUS}
                  ${
                    mobileMenuOpen
                      ? `${SOLID}`
                      : `${SURFACE} text-[#444746] dark:text-[#C4C7C5] hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]`
                  }
                `}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </motion.button>

              {/* Desktop: Repo */}
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  hidden h-9 items-center gap-1.5 rounded-full px-3
                  text-[13px] font-semibold lg:inline-flex
                  text-[#444746] dark:text-[#C4C7C5] ${SURFACE}
                  transition-colors duration-300 ${EASE}
                  hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]
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
                  text-[13px] font-semibold lg:inline-flex
                  ${SOLID}
                  transition-all duration-300 ${EASE}
                  hover:brightness-125
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
                  h-9 w-full rounded-full ${SUBTLE}
                  pl-9 pr-8 text-[13px] text-[#1F1F1F]
                  placeholder:text-[#747775]
                  transition-shadow duration-300 ${EASE}
                  focus:bg-white focus:outline-none
                  focus:shadow-[0_0_0_2px_rgba(31,31,31,0.35)]
                  dark:text-[#E3E3E3] dark:placeholder:text-[#8E918F]
                  dark:focus:bg-[#1E1F20]
                  dark:focus:shadow-[0_0_0_2px_rgba(227,227,227,0.35)]
                `}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18, ease: easeOut }}
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className={`
                      absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1
                      text-[#747775] dark:text-[#8E918F]
                      transition-colors duration-200 ${EASE}
                      hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]
                      ${FOCUS}
                    `}
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile overflow menu */}
          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: easeOut }}
                className="overflow-hidden lg:hidden"
              >
                <div className="flex gap-2 pb-2.5">
                  <a
                    href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex h-9 flex-1 items-center justify-center gap-1.5
                      rounded-full text-[13px] font-semibold
                      text-[#444746] dark:text-[#C4C7C5] ${SURFACE}
                      transition-colors duration-300 ${EASE}
                      hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]
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
                      rounded-full text-[13px] font-semibold
                      ${SOLID}
                      transition-all duration-300 ${EASE}
                      hover:brightness-125
                      ${FOCUS}
                    `}
                  >
                    <FileCode2 className="h-4 w-4" aria-hidden="true" />
                    View Tree
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter panel — animated expand/collapse */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: easeEmphasized }}
                className="overflow-hidden"
              >
                <div className="pb-3">
                  <div
                    className={`
                      max-h-[55vh] space-y-4 overflow-y-auto rounded-[20px]
                      ${SUBTLE} p-4
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
                            shapeIndex={t.shapeIndex}
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
                        {["all", ...uniqueAuthors].map((a, i) => (
                          <FilterChip
                            key={a}
                            label={a === "all" ? "All" : a}
                            active={authorFilter === a}
                            shapeIndex={i % SHAPES.length}
                            onClick={() => setAuthorFilter(a)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Reset */}
                    <AnimatePresence>
                      {activeFilterCount > 0 && (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.24, ease: easeOut }}
                          onClick={() => {
                            setSearchQuery("");
                            setAuthorFilter("all");
                            setTypeFilter("all");
                          }}
                          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                          className={`
                            inline-flex items-center gap-1.5 rounded-full
                            py-1.5 pl-1.5 pr-3.5 text-xs font-semibold
                            ${SURFACE} text-[#1F1F1F] dark:text-[#E3E3E3]
                            transition-colors duration-300 ${EASE}
                            hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]
                            ${FOCUS}
                          `}
                        >
                          <span
                            className={`
                              grid h-5 w-5 shrink-0 place-items-center rounded-full
                              ${SOLID}
                            `}
                          >
                            <RotateCcw className="h-3 w-3" aria-hidden="true" />
                          </span>
                          Clear all filters
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-4xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        {/* ── STATUS STATES ── */}

        {/* Loading */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className={`
                flex flex-col items-center justify-center space-y-4
                rounded-[28px] p-10 ${SURFACE}
              `}
            >
              <motion.span
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`
                  grid h-14 w-14 place-items-center rounded-[18px]
                  ${SOLID}
                  shadow-[0_2px_6px_rgba(0,0,0,0.12)]
                `}
              >
                <Clock className="h-6 w-6" aria-hidden="true" />
              </motion.span>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  Fetching commits
                </p>
                <p className="mt-0.5 text-xs text-[#747775] dark:text-[#8E918F]">
                  Page {fetchingProgress}
                </p>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {!loading && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className={`
                flex flex-col gap-4 rounded-[28px] p-5
                sm:flex-row sm:items-center sm:justify-between
                ${SURFACE}
              `}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`
                    grid h-10 w-10 shrink-0 place-items-center rounded-[14px]
                    ${SOLID}
                    shadow-[0_2px_6px_rgba(0,0,0,0.12)]
                  `}
                >
                  <AlertCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  {error}
                </span>
              </div>
              <motion.button
                type="button"
                onClick={fetchCommits}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                className={`
                  inline-flex shrink-0 items-center gap-1.5 rounded-full
                  ${SOLID} px-4 py-2 text-xs font-semibold
                  transition-all duration-300 ${EASE}
                  hover:brightness-125
                  ${FOCUS}
                `}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Retry
              </motion.button>
            </motion.div>
          )}

          {/* Empty */}
          {!loading && !error && displayCommits.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className={`rounded-[28px] p-10 text-center ${SURFACE}`}
            >
              <span
                className={`
                  mx-auto mb-3 grid h-12 w-12 place-items-center rounded-[16px]
                  ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
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
            </motion.div>
          )}
        </AnimatePresence>

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
                      ${SUBTLE}
                    `}
                  >
                    <span
                      className={`
                        grid h-4 w-4 place-items-center rounded-full
                        ${SOLID}
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

                {/* Commits in this group — staggered entrance */}
                <motion.ol
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                  className="relative space-y-2.5 pl-6"
                >
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
                    const shapeIndex = commitTypeShapeIndex(
                      commit.commit.message,
                    );

                    return (
                      <motion.li
                        key={commit.sha}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.36, ease: easeOut },
                          },
                        }}
                        className="relative"
                      >
                        {/* Timeline dot — morphs into commit type shape */}
                        <span
                          aria-hidden="true"
                          className={`
                            absolute -left-6 top-5 z-[1] grid h-4 w-4 place-items-center
                            rounded-full ring-2 ring-[#F7F9FC]
                            dark:ring-[#141414]
                          `}
                        >
                          <ShapeDot shapeIndex={shapeIndex} active size={14} />
                        </span>

                        <motion.a
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          transition={{ duration: 0.22, ease: easeOut }}
                          className={`
                            group block rounded-[24px] ${SURFACE}
                            p-4
                            transition-shadow duration-300 ${EASE}
                            hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(0,0,0,0.6)]
                            dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(255,255,255,0.3)]
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
                                    tabular-nums ${SUBTLE}
                                  `}
                                >
                                  <span
                                    className="
                                      grid h-4 w-4 place-items-center rounded-full
                                      overflow-hidden
                                    "
                                  >
                                    <ShapeDot
                                      shapeIndex={shapeIndex}
                                      active
                                      size={10}
                                    />
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
                                      ${SOLID}
                                    `}
                                  >
                                    <span
                                      className={`
                                        grid h-4 w-4 place-items-center rounded-full
                                        bg-white/25 dark:bg-black/20
                                      `}
                                    >
                                      <span className="h-1 w-1 rounded-full bg-current" />
                                    </span>
                                    <span>HEAD</span>
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
                                    ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                                  `}
                                >
                                  {commit.commit.author.name.charAt(0)}
                                </span>
                                <span className="truncate text-xs font-medium text-[#444746] dark:text-[#C4C7C5]">
                                  {commit.commit.author.name}
                                </span>
                              </div>
                            </div>

                            {/* Diff chip — morphs on hover */}
                            <span
                              className={`
                                inline-flex shrink-0 items-center gap-1.5
                                self-start rounded-full py-1.5 pl-1.5 pr-3
                                text-[11px] font-semibold
                                ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                                transition-all duration-300 ${EASE}
                              `}
                            >
                              <span
                                className={`
                                  grid h-5 w-5 shrink-0 place-items-center rounded-full
                                  transition-all duration-300 ${SPRING}
                                  group-hover:rounded-[6px]
                                  group-hover:bg-[#1F1F1F] group-hover:text-white
                                  dark:group-hover:bg-[#E3E3E3] dark:group-hover:text-[#1F1F1F]
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
                        </motion.a>
                      </motion.li>
                    );
                  })}
                </motion.ol>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
