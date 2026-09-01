"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import {
  GitCommit,
  GitBranch,
  Search,
  Filter,
  ExternalLink,
  Github,
  Clock,
  User,
  AlertCircle,
  FileCode2,
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
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-300 selection:bg-blue-200 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100">
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
        {/* ── DASHBOARD HEADER ── */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-300 dark:border-neutral-800 pb-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                {GITHUB_CONFIG.repository} / Commits
              </h1>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Last updated: {lastChangeDate}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm font-semibold text-neutral-900 dark:text-neutral-100 rounded-md"
              >
                <Github className="w-4 h-4" /> Repository
              </a>
              <Link
                href="/git-track/tree"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 border border-blue-600 dark:border-blue-700 text-sm font-semibold text-white rounded-md"
              >
                <FileCode2 className="w-4 h-4" /> View Tree
              </Link>
            </div>
          </div>
        </div>

        {/* ── CONTROLS & FILTERS ── */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 cursor-pointer dark:border-neutral-800 px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 border border-neutral-200 rounded dark:border-neutral-800 px-3 py-1 bg-neutral-50 dark:bg-neutral-900/50 ">
            {displayCommits.length} Records
          </span>
        </div>

        {/* Strict block layout for filters, no smooth expanding */}
        <div className={showFilters ? "block" : "hidden"}>
          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-md">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-widest flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Message or SHA..."
                className="w-full bg-white dark:bg-black text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-widest flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Author
              </label>
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="w-full bg-white dark:bg-black text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500"
              >
                <option value="all">All Authors</option>
                {uniqueAuthors.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-widest flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5" /> Type
              </label>
              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-white dark:bg-black text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500"
                >
                  {COMMIT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setAuthorFilter("all");
                    setTypeFilter("all");
                  }}
                  className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-sm font-semibold text-neutral-900 dark:text-neutral-100 rounded-md"
                  title="Clear Filters"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATUS STATES ── */}
        {loading && (
          <div className="p-8 border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 rounded-md flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <Clock className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
            <p className="text-sm font-medium">
              Fetching records... (Page {fetchingProgress})
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-400 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Error: {error}</span>
            </div>
            <button
              onClick={fetchCommits}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white text-sm font-bold rounded-md whitespace-nowrap"
            >
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && displayCommits.length === 0 && (
          <div className="p-8 border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 rounded-md text-center">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              No matching records found.
            </p>
          </div>
        )}

        {/* ── COMMIT LOG (DATA TABLE STYLE) ── */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 rounded-md">
            {displayCommits.map((commit, index) => {
              const title = getCommitTitle(commit.commit.message);
              const shortSha = commit.sha.substring(0, 7);

              return (
                <div
                  key={commit.sha}
                  className="flex flex-col sm:flex-row sm:items-center py-4 px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800/80 last:border-0 hover:bg-white dark:hover:bg-neutral-900 gap-3 sm:gap-6"
                >
                  {/* Left Column: SHA & Date */}
                  <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center shrink-0 sm:w-32 gap-2 sm:gap-1">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {shortSha}
                    </a>
                    <span
                      className="text-xs font-medium text-neutral-500 dark:text-neutral-500"
                      title={new Date(
                        commit.commit.author.date,
                      ).toLocaleString()}
                    >
                      {timeAgo(commit.commit.author.date)}
                    </span>
                  </div>

                  {/* Main Content: Message & Author */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 break-words leading-snug">
                        {title}
                      </span>
                      {index === 0 && (
                        <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
                          HEAD {GITHUB_CONFIG.branch}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {commit.commit.author.name}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions (Links) */}
                  <div className="hidden sm:flex shrink-0 gap-4">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 uppercase tracking-widest"
                    >
                      Diff <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
