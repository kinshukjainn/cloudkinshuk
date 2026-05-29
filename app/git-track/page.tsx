"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";

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
  { id: "all", label: "All Types" },
  { id: "feat", label: "Features" },
  { id: "fix", label: "Bug Fixes" },
  { id: "chore", label: "Chores" },
  { id: "docs", label: "Documentation" },
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
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getCommitTitle = (message: string) => message.split("\n")[0];

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

        if (data.length === 0) {
          break;
        }

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

  const lastChangeDate =
    commits.length > 0
      ? new Date(commits[0].commit.author.date).toUTCString()
      : "N/A";

  return (
    <div className="min-h-screen bg-white text-black  text-[14px] sm:text-[15px] p-2 sm:p-4 selection:bg-[#cceeff]">
      <div className="max-w-7xl mx-auto">
        {/* ── TOP HEADER (Breadcrumbs & Links) ── */}
        <div className="mb-1">
          <h1 className="text-[20px] sm:text-[24px] font-semibold m-0 p-0">
            <a href="#" className="text-[#0000ee] hover:underline no-underline">
              Git
            </a>{" "}
            /{" "}
            <a href="#" className="text-[#0000ee] hover:underline no-underline">
              {GITHUB_CONFIG.repository}.git
            </a>{" "}
            / commits
          </h1>
        </div>

        <div className="text-[13px] sm:text-[14px] mb-3">
          summary |{" "}
          <Link href="/git-track/tree">
            <span className="text-[#0000ee] px-2 py-0 bg-yellow-200 border border-black  hover:underline cursor-pointer font-semibold ">
              view Tree
            </span>
          </Link>
        </div>

        {/* ── META INFO TABLE ── */}
        <div className="bg-[#f4f4f4] border-t border-b border-[#cccccc] py-3 px-2 sm:px-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-1 sm:gap-x-4 text-[13px] sm:text-[14px]">
            <div className="text-[#555555]">description</div>
            <div>{GITHUB_CONFIG.repository} git repo</div>

            <div className="text-[#555555]">last change</div>
            <div>{lastChangeDate}</div>

            <div className="text-[#555555]">URL</div>
            <div>
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                className="text-black hover:underline break-all"
              >
                https://github.com/{GITHUB_CONFIG.username}/
                {GITHUB_CONFIG.repository}.git
              </a>
            </div>

            {/* Classic-style Filters Toggle */}
            <div className="text-[#555555] mt-2 sm:mt-0">filters</div>
            <div className="mt-2 sm:mt-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-[#0000ee] hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                [
                {showFilters
                  ? "hide search & filters"
                  : "show search & filters"}
                ]
              </button>
            </div>
          </div>
        </div>

        {/* ── FILTERS BLOCK ── */}
        {showFilters && (
          <div className="bg-[#ffffee] border border-[#ddddcc] p-3 mb-4 text-[13px]">
            <div className="flex flex-wrap gap-4 items-end">
              <label className="flex flex-col gap-1">
                <span>Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-[#999] px-1 py-0.5 w-48"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span>Author:</span>
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="border border-[#999] px-1 py-0.5"
                >
                  <option value="all">all</option>
                  {uniqueAuthors.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span>Type:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border border-[#999] px-1 py-0.5"
                >
                  {COMMIT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setAuthorFilter("all");
                  setTypeFilter("all");
                }}
                className="bg-[#e0e0e0] border border-[#999] px-2 py-0.5 hover:bg-[#ccc] cursor-pointer"
              >
                clear
              </button>
            </div>
          </div>
        )}

        {/* ── SECTION HEADER ── */}
        <div className="bg-[#e8e8e8] border-t border-b border-[#cccccc] py-1.5 px-2 font-semibold mb-2">
          shortlog
        </div>

        {/* ── ERROR & LOADING STATES ── */}
        {loading && (
          <div className="p-4 text-[#555] ">
            Fetching repository history (page {fetchingProgress})...
          </div>
        )}

        {error && (
          <div className="p-4 text-[#cc0000] font-semibold bg-[#ffdddd] border border-[#cc0000] mb-4">
            Error: {error}
            <button
              onClick={fetchCommits}
              className="ml-4 underline text-[#0000ee] bg-transparent border-none cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && displayCommits.length === 0 && (
          <div className="p-4 text-[#555] ">
            No commits found matching the current criteria.
          </div>
        )}

        {/* ── LIST ── */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="w-full flex flex-col border-b border-[#eee]">
            {displayCommits.map((commit, index) => {
              const title = getCommitTitle(commit.commit.message);
              // Classic alternating row colors
              const rowClass = index % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]";

              return (
                <div
                  key={commit.sha}
                  className={`${rowClass} flex flex-col md:flex-row md:items-center py-2 px-2 hover:bg-[#eef3f8] transition-colors gap-1 md:gap-4`}
                >
                  {/* Time & Author (Stacked on mobile, row on desktop) */}
                  <div className="flex flex-row md:flex-row gap-2 md:gap-4 shrink-0 text-[#444]  text-[13px] md:w-[220px]">
                    <span className="w-[85px] shrink-0">
                      {timeAgo(commit.commit.author.date)}
                    </span>
                    <span className="truncate w-[120px]">
                      {commit.commit.author.name}
                    </span>
                  </div>

                  {/* Message & Tag */}
                  <div className="flex-1 min-w-0 font-semibold text-black flex items-center flex-wrap gap-2 text-[14px]">
                    <span className="break-words">{title}</span>
                    {/* Fake branch tag exactly like the image */}
                    {index === 0 && (
                      <span className="bg-[#ccffcc] border border-[#00cc00] text-black text-[11px] font-normal px-1 py-0 leading-tight">
                        master
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="shrink-0 text-[12px] md:text-[13px] text-[#0000ee] mt-1 md:mt-0 md:text-right">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline no-underline"
                    >
                      commit
                    </a>{" "}
                    |{" "}
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline no-underline"
                    >
                      commitdiff
                    </a>{" "}
                    |{" "}
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline no-underline"
                    >
                      tree
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Indicator */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="mt-2 px-2 text-[#0000ee] text-[13px] font-semibold cursor-pointer hover:underline">
            ...
          </div>
        )}
      </div>
    </div>
  );
}
