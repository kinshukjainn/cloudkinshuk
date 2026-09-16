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
  { id: "all", label: "All" },
  { id: "feat", label: "Features" },
  { id: "fix", label: "Fixes" },
  { id: "chore", label: "Chores" },
  { id: "docs", label: "Docs" },
  { id: "refactor", label: "Refactors" },
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

// Group key for timeline: "Today", "Yesterday", "This week", "This month", then month/year
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
  const [dateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);

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
      const commitDate = new Date(commit.commit.author.date);
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

      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        startDate.setHours(0, 0, 0, 0);
        if (commitDate < startDate) return false;
      }
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999);
        if (commitDate > endDate) return false;
      }
      return true;
    });
  }, [commits, searchQuery, authorFilter, typeFilter, dateRange]);

  // Group commits by day group, preserving order
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

  return (
    <div className="min-h-screen bg-white text-[#1f1f1f] selection:bg-[#d3e3fd] selection:text-[#0842a0] dark:bg-[#1f1f1f] dark:text-[#e3e3e3] dark:selection:bg-[#004a77] dark:selection:text-[#d3e3fd]">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        {/* ── HEADER ── */}
        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-3 py-1 text-xs font-medium text-[#444746] dark:border-[#444746] dark:text-[#c4c7c5]">
              <GitBranch className="h-3.5 w-3.5" />
              {GITHUB_CONFIG.branch}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-3 py-1 text-xs font-medium text-[#444746] dark:border-[#444746] dark:text-[#c4c7c5]">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(
                commits[0]?.commit.author.date ?? new Date().toISOString(),
              )}
            </span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight h-font text-[#1f1f1f] dark:text-[#e3e3e3] md:text-4xl md:leading-[1.1]">
                {GITHUB_CONFIG.repository}
              </h1>
              <p className="mt-1 text-sm text-[#747775] dark:text-[#8e918f]">
                Commit history · last year · {displayCommits.length} records
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-4 py-2 text-sm font-medium text-[#444746] transition-colors hover:bg-[#f0f4f9] dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
              <Link
                href="/git-track/tree"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0b57d0] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0842a0] dark:bg-[#a8c7fa] dark:text-[#062e6f] dark:hover:bg-[#d3e3fd]"
              >
                <FileCode2 className="h-4 w-4" />
                View Tree
              </Link>
            </div>
          </div>
        </header>

        {/* ── SEARCH + FILTER TOGGLE ── */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#747775] dark:text-[#8e918f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search message or SHA"
              className="w-full rounded-full border border-[#c4c7c5] bg-transparent py-2.5 pl-11 pr-10 text-sm text-[#1f1f1f] placeholder:text-[#747775] transition-colors focus:border-[#0b57d0] focus:outline-none focus:ring-1 focus:ring-[#0b57d0] dark:border-[#444746] dark:text-[#e3e3e3] dark:placeholder:text-[#8e918f] dark:focus:border-[#a8c7fa] dark:focus:ring-[#a8c7fa]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#747775] transition-colors hover:bg-[#f0f4f9] dark:text-[#8e918f] dark:hover:bg-[#282a2c]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? "border-[#0b57d0] bg-[#d3e3fd] text-[#0842a0] dark:border-[#a8c7fa] dark:bg-[#004a77] dark:text-[#d3e3fd]"
                : "border-[#c4c7c5] text-[#444746] hover:bg-[#f0f4f9] dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0b57d0] px-1.5 text-[10px] font-semibold text-white dark:bg-[#a8c7fa] dark:text-[#062e6f]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* ── FILTER PANEL (Material 3 chips) ── */}
        {showFilters && (
          <div className="mb-6 space-y-5 rounded-2xl bg-[#f0f4f9] p-5 dark:bg-[#1e1f21]">
            {/* Type chips */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                Type
              </p>
              <div className="flex flex-wrap gap-2">
                {COMMIT_TYPES.map((t) => {
                  const isActive = typeFilter === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypeFilter(t.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "border-transparent bg-[#0b57d0] text-white dark:bg-[#a8c7fa] dark:text-[#062e6f]"
                          : "border-[#c4c7c5] bg-transparent text-[#444746] hover:bg-white dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Author chips */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                Author
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setAuthorFilter("all")}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    authorFilter === "all"
                      ? "border-transparent bg-[#0b57d0] text-white dark:bg-[#a8c7fa] dark:text-[#062e6f]"
                      : "border-[#c4c7c5] bg-transparent text-[#444746] hover:bg-white dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
                  }`}
                >
                  All
                </button>
                {uniqueAuthors.map((a) => {
                  const isActive = authorFilter === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAuthorFilter(a)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "border-transparent bg-[#0b57d0] text-white dark:bg-[#a8c7fa] dark:text-[#062e6f]"
                          : "border-[#c4c7c5] bg-transparent text-[#444746] hover:bg-white dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
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
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#0b57d0] transition-colors hover:bg-white dark:text-[#a8c7fa] dark:hover:bg-[#282a2c]"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* ── STATUS STATES ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl bg-[#f0f4f9] p-10 dark:bg-[#1e1f21]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d3e3fd] text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]">
              <Clock className="h-5 w-5 animate-pulse" />
            </span>
            <p className="text-sm font-medium text-[#444746] dark:text-[#c4c7c5]">
              Fetching commits — page {fetchingProgress}
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col gap-4 rounded-2xl bg-[#fce8e6] p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-[#3a1a1a]">
            <div className="flex items-center gap-3 text-sm font-medium text-[#8c1d18] dark:text-[#f2b8b5]">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={fetchCommits}
              className="whitespace-nowrap rounded-full bg-[#8c1d18] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#6d1410] dark:bg-[#f2b8b5] dark:text-[#601410] dark:hover:bg-[#f9dedc]"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && displayCommits.length === 0 && (
          <div className="rounded-2xl bg-[#f0f4f9] p-10 text-center dark:bg-[#1e1f21]">
            <p className="text-sm font-medium text-[#747775] dark:text-[#8e918f]">
              No matching commits.
            </p>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="space-y-8">
            {grouped.map(([group, items]) => (
              <section key={group}>
                {/* Sticky group header */}
                <div className="sticky top-0 z-[5] -mx-1 mb-3 bg-white/80 px-1 py-2 backdrop-blur dark:bg-[#1f1f1f]/80">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xs font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                      {group}
                    </h2>
                    <span className="h-px flex-1 bg-[#e0e3e7] dark:bg-[#2d2f31]" />
                    <span className="text-[11px] font-medium tabular-nums text-[#747775] dark:text-[#8e918f]">
                      {items.length}
                    </span>
                  </div>
                </div>

                {/* Commits in this group */}
                <ol className="relative space-y-2 pl-6">
                  {/* Vertical timeline line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-2 bottom-2 w-px bg-[#e0e3e7] dark:bg-[#2d2f31]"
                  />

                  {items.map((commit) => {
                    const title = getCommitTitle(commit.commit.message);
                    const shortSha = commit.sha.substring(0, 7);
                    const isHead = commits[0]?.sha === commit.sha;

                    return (
                      <li key={commit.sha} className="relative">
                        {/* Timeline dot */}
                        <span
                          aria-hidden="true"
                          className={`absolute -left-6 top-4 z-[1] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white dark:border-[#1f1f1f] ${
                            isHead
                              ? "bg-[#0b57d0] dark:bg-[#a8c7fa]"
                              : "bg-[#c4c7c5] dark:bg-[#444746]"
                          }`}
                        />

                        <a
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-2xl bg-[#f0f4f9] px-4 py-3.5 transition-colors hover:bg-[#e8eef7] dark:bg-[#1e1f21] dark:hover:bg-[#232527]"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <div className="min-w-0 flex-1">
                              {/* Meta row */}
                              <div className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-medium tabular-nums text-[#0b57d0] dark:bg-[#282a2c] dark:text-[#a8c7fa]">
                                  {shortSha}
                                </span>
                                {isHead && (
                                  <span className="rounded-full bg-[#0b57d0] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white dark:bg-[#a8c7fa] dark:text-[#062e6f]">
                                    HEAD
                                  </span>
                                )}
                                <span className="text-[11px] text-[#747775] dark:text-[#8e918f]">
                                  {timeAgo(commit.commit.author.date)}
                                </span>
                              </div>

                              {/* Title */}
                              <p className="line-clamp-2 text-sm font-medium leading-snug text-[#1f1f1f] transition-colors group-hover:text-[#0b57d0] dark:text-[#e3e3e3] dark:group-hover:text-[#a8c7fa]">
                                {title}
                              </p>

                              {/* Author */}
                              <div className="mt-2 flex items-center gap-2 text-xs text-[#747775] dark:text-[#8e918f]">
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#d3e3fd] text-[9px] font-semibold uppercase text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]">
                                  {commit.commit.author.name.charAt(0)}
                                </span>
                                <span className="truncate">
                                  {commit.commit.author.name}
                                </span>
                              </div>
                            </div>

                            {/* Diff link */}
                            <span className="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-[#c4c7c5] px-3 py-1 text-[11px] font-medium text-[#444746] transition-colors group-hover:border-[#0b57d0] group-hover:bg-white group-hover:text-[#0b57d0] dark:border-[#444746] dark:text-[#c4c7c5] dark:group-hover:border-[#a8c7fa] dark:group-hover:bg-[#282a2c] dark:group-hover:text-[#a8c7fa]">
                              Diff
                              <ExternalLink className="h-3 w-3" />
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
