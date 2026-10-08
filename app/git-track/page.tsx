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

/* ─────────────────────────────────────────────────────────────
   Editorial Changelog · matches BlogFeed / DocPage / Header

   · Flat, high-contrast, bold uppercase type — no soft cards.
   · `border-b-2` ink rules mark every section.
   · One accent: blue-700 / blue-400 — active + focus only.
   · Fully responsive: 320 px → ultra-wide.
   · Motion: 300 ms cubic-bezier(0.2,0,0,1) — colour, lift.
   ───────────────────────────────────────────────────────────── */

/* ── Types ─────────────────────────────────────────────── */
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
  author: { login: string; avatar_url: string } | null;
}

/* ── Config ────────────────────────────────────────────── */
const GITHUB_CONFIG = {
  username: "kinshukjainn",
  repository: "cloudkinshuk",
  branch: "main",
  perPage: 100,
  maxPages: 20,
};

/* ── Utilities ─────────────────────────────────────────── */
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

/* ── Design tokens ────────────────────────────────────── */
const SHELL =
  "min-h-screen bg-[#FAFAFA] text-[#111] " +
  "selection:bg-[#111] selection:text-white " +
  "dark:bg-[#0a0a0a] dark:text-[#eee] " +
  "dark:selection:bg-[#eee] dark:selection:text-[#111]";

const TEXT = "text-[#111] dark:text-[#eee]";
const TEXT_SUBTLE = "text-[#555] dark:text-[#aaa]";

const RULE_INK = "border-[#1f1f1f] dark:border-[#e3e3e3]";
const RULE_SOFT = "border-black/[0.12] dark:border-white/[0.18]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-blue-700/60 dark:focus-visible:ring-blue-400/60";

/* ── Motion curves ────────────────────────────────────── */
const easeOut = [0.16, 1, 0.3, 1] as const;
const easeEmphasized = [0.2, 0, 0, 1] as const;

/* ── Commit type classifier ──────────────────────────── */
const COMMIT_TYPES = [
  { id: "all", label: "All" },
  { id: "feat", label: "Features" },
  { id: "fix", label: "Fixes" },
  { id: "chore", label: "Chores" },
  { id: "docs", label: "Docs" },
  { id: "refactor", label: "Refactors" },
];

function commitTypeId(message: string): string {
  const msg = message.toLowerCase();
  if (msg.startsWith("feat")) return "feat";
  if (msg.startsWith("fix")) return "fix";
  if (msg.startsWith("chore")) return "chore";
  if (msg.startsWith("docs")) return "docs";
  if (msg.startsWith("refactor")) return "refactor";
  return "other";
}

function commitTypeLabel(message: string): string {
  const id = commitTypeId(message);
  return id === "other" ? "commit" : id;
}

/* ============================================================================
   Main Component
   ============================================================================ */

export default function ChangelogTracker() {
  const reduceMotion = useReducedMotion();
  const [commits, setCommits] = useState<GithubCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchingProgress, setFetchingProgress] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ── Reserve space for the fixed mobile dock ─────────── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      document.body.style.paddingBottom = mq.matches ? "5rem" : "";
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.body.style.paddingBottom = "";
    };
  }, []);

  /* ── Fetch commits ───────────────────────────────────── */
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
          { headers: { Accept: "application/vnd.github.v3+json" } },
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

        if (oldestDateInBatch < oneYearAgo) shouldFetchMore = false;
        else page++;
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

  /* ── Data processing ─────────────────────────────────── */
  const uniqueAuthors = useMemo(
    () => Array.from(new Set(commits.map((c) => c.commit.author.name))),
    [commits],
  );

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

  const clearAll = () => {
    setSearchQuery("");
    setAuthorFilter("all");
    setTypeFilter("all");
  };

  /* ========================================================================
     RENDER
     ======================================================================== */
  return (
    <div className={SHELL}>
      {/* ═══════════════ STICKY SUB-HEADER ═══════════════ */}
      <header
        className={`
          sticky top-16 z-30
          border-b ${RULE_SOFT}
          bg-[#FAFAFA]/90 backdrop-blur-md
          dark:bg-[#0a0a0a]/90
        `}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Row 1 — identity + actions */}
          <div className="flex h-14 items-center gap-2">
            {/* Branch chip */}
            <span
              className={`
                hidden shrink-0 items-center gap-1.5 rounded-md
                border ${RULE_SOFT} px-2 py-1
                text-[10px] font-bold uppercase tracking-wider
                ${TEXT_SUBTLE} sm:inline-flex
              `}
            >
              <GitBranch className="h-3 w-3" aria-hidden="true" />
              <span>{GITHUB_CONFIG.branch}</span>
            </span>

            {/* Repo name */}
            <h1
              className={`
                truncate text-xs font-extrabold uppercase tracking-wider
                sm:text-sm ${TEXT}
              `}
            >
              {GITHUB_CONFIG.repository}
            </h1>

            {/* Record count */}
            <span
              className={`
                hidden shrink-0 text-xs font-bold tabular-nums
                ${TEXT_SUBTLE} md:inline
              `}
            >
              · {displayCommits.length} records
            </span>

            {/* Desktop inline search */}
            <div className="relative ml-auto hidden w-full max-w-xs lg:block">
              <Search
                className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${TEXT_SUBTLE}`}
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commits…"
                className={`
                  h-9 w-full rounded-md border ${RULE_SOFT}
                  bg-transparent pl-9 pr-8
                  text-[13px] font-medium ${TEXT}
                  placeholder:text-[#777] dark:placeholder:text-[#888]
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  focus:border-blue-700 dark:focus:border-blue-400
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
                      absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1
                      ${TEXT_SUBTLE} hover:${TEXT} ${FOCUS}
                      transition-colors duration-300 ${EASE}
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
                  inline-flex h-9 items-center gap-1.5 rounded-md border px-3
                  text-[11px] font-bold uppercase tracking-wider
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  ${
                    showFilters || activeFilterCount > 0
                      ? "border-blue-700 bg-blue-700 text-white dark:border-blue-400 dark:bg-blue-400 dark:text-[#0a0a0a]"
                      : `border-transparent ${TEXT_SUBTLE} hover:text-[#111] dark:hover:text-[#eee]`
                  }
                `}
              >
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Filters</span>
                <AnimatePresence>
                  {activeFilterCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      className="
                        inline-flex h-4 min-w-4 items-center justify-center
                        rounded-sm bg-white/25 px-1 text-[10px] font-bold
                        dark:bg-black/20
                      "
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
                  inline-flex h-9 w-9 items-center justify-center rounded-md border
                  transition-colors duration-300 ${EASE} ${FOCUS} lg:hidden
                  ${
                    mobileMenuOpen
                      ? "border-blue-700 bg-blue-700 text-white dark:border-blue-400 dark:bg-blue-400 dark:text-[#0a0a0a]"
                      : `border-transparent ${TEXT_SUBTLE} hover:text-[#111] dark:hover:text-[#eee]`
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
                  hidden h-9 items-center gap-1.5 rounded-md border ${RULE_SOFT}
                  px-3 text-[11px] font-bold uppercase tracking-wider
                  ${TEXT_SUBTLE} hover:${TEXT}
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  lg:inline-flex
                `}
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden xl:inline">Repo</span>
              </a>

              {/* Desktop: View Tree */}
              <Link
                href="/git-tree"
                className={`
                  hidden h-9 items-center gap-1.5 rounded-md
                  bg-[#1f1f1f] px-3
                  text-[11px] font-bold uppercase tracking-wider text-white
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  hover:bg-[#111]
                  dark:bg-[#e3e3e3] dark:text-[#111] dark:hover:bg-white
                  lg:inline-flex
                `}
              >
                <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden xl:inline">Tree</span>
              </Link>
            </div>
          </div>

          {/* Row 2 — mobile search */}
          <div className="pb-3 lg:hidden">
            <div className="relative">
              <Search
                className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${TEXT_SUBTLE}`}
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commits…"
                className={`
                  h-9 w-full rounded-md border ${RULE_SOFT}
                  bg-transparent pl-9 pr-8
                  text-[13px] font-medium ${TEXT}
                  placeholder:text-[#777] dark:placeholder:text-[#888]
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  focus:border-blue-700 dark:focus:border-blue-400
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
                      absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1
                      ${TEXT_SUBTLE} hover:${TEXT} ${FOCUS}
                      transition-colors duration-300 ${EASE}
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
                <div className="flex gap-2 pb-3">
                  <a
                    href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex h-9 flex-1 items-center justify-center gap-1.5
                      rounded-md border ${RULE_SOFT}
                      text-[11px] font-bold uppercase tracking-wider ${TEXT_SUBTLE}
                      hover:${TEXT} transition-colors duration-300 ${EASE} ${FOCUS}
                    `}
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    Repository
                  </a>
                  <Link
                    href="/git-tree"
                    className={`
                      inline-flex h-9 flex-1 items-center justify-center gap-1.5
                      rounded-md bg-[#1f1f1f] px-3
                      text-[11px] font-bold uppercase tracking-wider text-white
                      transition-colors duration-300 ${EASE} ${FOCUS}
                      hover:bg-[#111]
                      dark:bg-[#e3e3e3] dark:text-[#111] dark:hover:bg-white
                    `}
                  >
                    <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                    View Tree
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter panel */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: easeEmphasized }}
                className="overflow-hidden"
              >
                <div className={`border-t ${RULE_SOFT} py-4`}>
                  <div className="max-h-[55vh] space-y-5 overflow-y-auto">
                    {/* Type chips */}
                    <div className="space-y-2.5">
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${TEXT_SUBTLE}`}
                      >
                        Type
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {COMMIT_TYPES.map((t) => {
                          const active = typeFilter === t.id;
                          return (
                            <motion.button
                              key={t.id}
                              type="button"
                              onClick={() => setTypeFilter(t.id)}
                              aria-pressed={active}
                              whileTap={
                                reduceMotion ? undefined : { scale: 0.94 }
                              }
                              className={`
                                inline-flex items-center rounded-md border px-2.5 py-1
                                text-[11px] font-bold uppercase tracking-wider
                                transition-colors duration-300 ${EASE} ${FOCUS}
                                ${
                                  active
                                    ? "border-blue-700 bg-blue-700 text-white dark:border-blue-400 dark:bg-blue-400 dark:text-[#0a0a0a]"
                                    : `border-black/[0.12] ${TEXT_SUBTLE} hover:${TEXT} dark:border-white/[0.18]`
                                }
                              `}
                            >
                              {t.label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Author chips */}
                    <div className="space-y-2.5">
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${TEXT_SUBTLE}`}
                      >
                        Author
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["all", ...uniqueAuthors].map((a) => {
                          const active = authorFilter === a;
                          return (
                            <motion.button
                              key={a}
                              type="button"
                              onClick={() => setAuthorFilter(a)}
                              aria-pressed={active}
                              whileTap={
                                reduceMotion ? undefined : { scale: 0.94 }
                              }
                              className={`
                                inline-flex items-center rounded-md border px-2.5 py-1
                                text-[11px] font-bold uppercase tracking-wider
                                transition-colors duration-300 ${EASE} ${FOCUS}
                                ${
                                  active
                                    ? "border-blue-700 bg-blue-700 text-white dark:border-blue-400 dark:bg-blue-400 dark:text-[#0a0a0a]"
                                    : `border-black/[0.12] ${TEXT_SUBTLE} hover:${TEXT} dark:border-white/[0.18]`
                                }
                              `}
                            >
                              {a === "all" ? "All" : a}
                            </motion.button>
                          );
                        })}
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
                          onClick={clearAll}
                          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                          className={`
                            inline-flex items-center gap-1.5 rounded-md border
                            ${RULE_SOFT} px-2.5 py-1
                            text-[11px] font-bold uppercase tracking-wider ${TEXT}
                            transition-colors duration-300 ${EASE} ${FOCUS}
                            hover:border-blue-700 hover:text-blue-700
                            dark:hover:border-blue-400 dark:hover:text-blue-400
                          `}
                        >
                          <RotateCcw className="h-3 w-3" aria-hidden="true" />
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

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 lg:pt-12 lg:pb-20">
        {/* ── STATUS STATES ── */}
        <AnimatePresence mode="wait">
          {/* Loading */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className={`
                flex flex-col items-center justify-center space-y-4
                border-2 ${RULE_INK} px-6 py-14
              `}
            >
              <motion.span
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                className={`
                  grid h-12 w-12 place-items-center rounded-md
                  bg-[#1f1f1f] text-white
                  dark:bg-[#e3e3e3] dark:text-[#111]
                `}
              >
                <Clock className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <div className="text-center">
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${TEXT}`}
                >
                  Fetching commits
                </p>
                <p className={`mt-1 text-xs font-medium ${TEXT_SUBTLE}`}>
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
                flex flex-col gap-4 border-2 ${RULE_INK} px-5 py-5
                sm:flex-row sm:items-center sm:justify-between
              `}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`
                    grid h-10 w-10 shrink-0 place-items-center rounded-md
                    bg-[#1f1f1f] text-white
                    dark:bg-[#e3e3e3] dark:text-[#111]
                  `}
                >
                  <AlertCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span
                  className={`text-sm font-bold uppercase tracking-wider ${TEXT}`}
                >
                  {error}
                </span>
              </div>
              <motion.button
                type="button"
                onClick={fetchCommits}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                className={`
                  inline-flex shrink-0 items-center gap-1.5 rounded-md
                  bg-[#1f1f1f] px-4 py-2
                  text-[11px] font-bold uppercase tracking-wider text-white
                  transition-colors duration-300 ${EASE} ${FOCUS}
                  hover:bg-[#111]
                  dark:bg-[#e3e3e3] dark:text-[#111] dark:hover:bg-white
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
              className={`border-2 ${RULE_INK} px-6 py-12 text-center`}
            >
              <span
                className={`
                  mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md
                  border ${RULE_SOFT} ${TEXT}
                `}
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </span>
              <p
                className={`text-sm font-bold uppercase tracking-wider ${TEXT}`}
              >
                No matching commits
              </p>
              <p className={`mt-1.5 text-xs font-medium ${TEXT_SUBTLE}`}>
                Try adjusting your filters or search query.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TIMELINE ── */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="space-y-10">
            {grouped.map(([group, items]) => (
              <section key={group}>
                {/* Group header — mirrors BlogFeed's section rule */}
                <div className="mb-5">
                  <div
                    className={`
                      flex items-baseline justify-between
                      border-b-2 ${RULE_INK} pb-2
                    `}
                  >
                    <h2
                      className={`
                        text-sm font-extrabold uppercase tracking-widest
                        sm:text-base ${TEXT}
                      `}
                    >
                      {group}
                    </h2>
                    <span
                      className={`
                        text-[11px] font-bold uppercase tracking-wider
                        tabular-nums ${TEXT_SUBTLE}
                      `}
                    >
                      {items.length} {items.length === 1 ? "commit" : "commits"}
                    </span>
                  </div>
                </div>

                {/* Commit rows */}
                <motion.ol
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04 } },
                  }}
                  className={`border-t ${RULE_SOFT}`}
                >
                  {items.map((commit) => {
                    const title = getCommitTitle(commit.commit.message);
                    const shortSha = commit.sha.substring(0, 7);
                    const isHead = commits[0]?.sha === commit.sha;
                    const typeLabel = commitTypeLabel(commit.commit.message);

                    return (
                      <motion.li
                        key={commit.sha}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.32, ease: easeOut },
                          },
                        }}
                        className={`border-b ${RULE_SOFT}`}
                      >
                        <motion.a
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={reduceMotion ? undefined : { x: 2 }}
                          transition={{ duration: 0.22, ease: easeOut }}
                          className={`
                            group flex flex-col gap-2 py-4 sm:gap-3
                            transition-colors duration-300 ${EASE} ${FOCUS}
                            sm:flex-row sm:items-start
                          `}
                        >
                          {/* ── Left column — type + sha ── */}
                          <div className="flex shrink-0 items-center gap-2 sm:w-32 sm:flex-col sm:items-start sm:gap-1">
                            <span
                              className={`
                                inline-flex items-center rounded-md border
                                border-black/[0.12] px-1.5 py-0.5
                                text-[10px] font-bold uppercase tracking-wider
                                ${TEXT_SUBTLE}
                                dark:border-white/[0.18]
                                transition-colors duration-300 ${EASE}
                                group-hover:border-blue-700 group-hover:text-blue-700
                                dark:group-hover:border-blue-400 dark:group-hover:text-blue-400
                              `}
                            >
                              {typeLabel}
                            </span>
                            <span
                              className={`
                                text-[10px] font-bold uppercase tracking-wider
                                tabular-nums ${TEXT_SUBTLE}
                              `}
                            >
                              {shortSha}
                            </span>
                            {isHead && (
                              <span
                                className={`
                                  inline-flex items-center rounded-md
                                  bg-[#1f1f1f] px-1.5 py-0.5
                                  text-[10px] font-bold uppercase tracking-wider
                                  text-white
                                  dark:bg-[#e3e3e3] dark:text-[#111]
                                `}
                              >
                                HEAD
                              </span>
                            )}
                          </div>

                          {/* ── Middle column — title + meta ── */}
                          <div className="min-w-0 flex-1">
                            <p
                              className={`
                                line-clamp-2 text-sm font-bold leading-snug
                                ${TEXT}
                                transition-colors duration-300 ${EASE}
                                group-hover:text-blue-700
                                dark:group-hover:text-blue-400
                                sm:text-[15px]
                              `}
                            >
                              {title}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span
                                className={`
                                  flex items-center gap-1.5
                                  text-[11px] font-bold uppercase tracking-wider
                                  ${TEXT_SUBTLE}
                                `}
                              >
                                <span
                                  className={`
                                    grid h-5 w-5 place-items-center rounded-sm
                                    border ${RULE_SOFT}
                                    text-[9px] font-extrabold ${TEXT}
                                  `}
                                >
                                  {commit.commit.author.name.charAt(0)}
                                </span>
                                <span className="truncate">
                                  {commit.commit.author.name}
                                </span>
                              </span>
                              <span
                                className={`
                                  text-[11px] font-bold uppercase tracking-wider
                                  tabular-nums ${TEXT_SUBTLE}
                                `}
                              >
                                · {timeAgo(commit.commit.author.date)}
                              </span>
                            </div>
                          </div>

                          {/* ── Right column — arrow ── */}
                          <span
                            aria-hidden="true"
                            className={`
                              hidden shrink-0 items-center gap-1
                              text-[11px] font-bold uppercase tracking-wider
                              ${TEXT_SUBTLE}
                              transition-colors duration-300 ${EASE}
                              group-hover:text-blue-700
                              dark:group-hover:text-blue-400
                              sm:inline-flex
                            `}
                          >
                            Diff
                            <ExternalLink className="h-3.5 w-3.5" />
                          </span>
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
