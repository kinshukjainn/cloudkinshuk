"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import {
  GitCommit,
  GitBranch,
  Terminal,
  Search,
  Filter,
  ExternalLink,
  Github,
  Clock,
  User,
  AlertCircle,
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
    <div className="min-h-screen bg-[#161923] text-zinc-300 selection:bg-green-700/30 selection:text-green-200 ">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        {/* ── CLI HEADER ── */}
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3 mb-2 text-sm sm:text-base  bg-black/50 p-4 rounded-md border border-zinc-800 shadow-sm overflow-x-auto whitespace-nowrap">
            <Terminal className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-zinc-400">
              <span className="text-green-400 font-medium">
                {GITHUB_CONFIG.username}
              </span>
              @<span className="text-blue-400">dev</span>:
              <span className="text-zinc-300">
                ~/projects/{GITHUB_CONFIG.repository}
              </span>
              $
            </span>
            <span className="text-white font-medium ml-1">
              git log --oneline
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-medium text-white flex items-center gap-2">
                <GitBranch className="w-6 h-6 text-green-500" />
                {GITHUB_CONFIG.repository}.git
              </h1>
              <p className="text-xs  text-zinc-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Last updated: {lastChangeDate}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-zinc-900 border border-zinc-800 rounded-md text-sm font-medium text-white transition-colors"
              >
                <Github className="w-4 h-4" /> Repository
              </a>
              <Link
                href="/git-track/tree"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b1f2b] border border-zinc-800 hover:border-zinc-600 rounded-md text-sm font-medium text-zinc-200 transition-colors"
              >
                <GitCommit className="w-4 h-4" /> View Tree
              </Link>
            </div>
          </div>
        </div>

        {/* ── CONTROLS & FILTERS ── */}
        <div className="mb-6 flex justify-between items-center bg-[#1b1f2b] p-3 rounded-md border border-zinc-800">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm  text-zinc-400 hover:text-green-400 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "[-]" : "[+]"} filters
          </button>
          <span className="text-xs  text-zinc-500">
            {displayCommits.length} commits found
          </span>
        </div>

        {showFilters && (
          <div className="bg-[#1b1f2b] border border-zinc-800 rounded-md p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Grep Message
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commits..."
                className="w-full bg-[#161923] border border-zinc-700 text-sm text-zinc-200 px-3 py-2 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all  placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Author
              </label>
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="w-full bg-[#161923] border border-zinc-700 text-sm text-zinc-200 px-3 py-2 rounded-md focus:outline-none focus:border-green-500 transition-all  appearance-none"
              >
                <option value="all">-- All Authors --</option>
                {uniqueAuthors.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5" /> Type
              </label>
              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-[#161923] border border-zinc-700 text-sm text-zinc-200 px-3 py-2 rounded-md focus:outline-none focus:border-green-500 transition-all  appearance-none"
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
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-sm font-medium text-zinc-300 transition-colors"
                  title="Clear Filters"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STATUS STATES ── */}
        {loading && (
          <div className="p-8 border border-zinc-800 border-dashed rounded-md flex flex-col items-center justify-center text-zinc-500 space-y-3">
            <Terminal className="w-8 h-8 animate-pulse text-zinc-600" />
            <p className=" text-sm">Fetching block {fetchingProgress}...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-400  text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>ERR: {error}</span>
            </div>
            <button
              onClick={fetchCommits}
              className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap"
            >
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && displayCommits.length === 0 && (
          <div className="p-8 border border-zinc-800 rounded-md text-center bg-[#1b1f2b]">
            <p className=" text-sm text-zinc-500">
              0 results returned from query.
            </p>
          </div>
        )}

        {/* ── COMMIT LOG (GRAPH/TIMELINE STYLE) ── */}
        {!loading && !error && displayCommits.length > 0 && (
          <div className="relative border border-zinc-800 rounded-md bg-[#1b1f2b] overflow-hidden">
            {displayCommits.map((commit, index) => {
              const title = getCommitTitle(commit.commit.message);
              const shortSha = commit.sha.substring(0, 7);

              return (
                <div
                  key={commit.sha}
                  className="group relative flex flex-col sm:flex-row sm:items-center py-4 px-4 sm:px-6 border-b border-zinc-800/50 last:border-0 hover:bg-[#222736] transition-colors gap-3 sm:gap-6"
                >
                  {/* Left Column: SHA & Date */}
                  <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center shrink-0 sm:w-32 gap-2 sm:gap-1">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-sm text-green-400 hover:text-green-300 hover:underline"
                    >
                      {shortSha}
                    </a>
                    <span
                      className="text-xs  text-zinc-500"
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
                      <span className="text-sm font-semibold text-zinc-200 break-words leading-snug">
                        {title}
                      </span>
                      {index === 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-green-900/30 border border-green-700 text-green-400 text-[10px]  font-medium uppercase tracking-wider">
                          HEAD {GITHUB_CONFIG.branch}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs ">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        {commit.commit.author.name}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions (Hidden on mobile, inline on desktop) */}
                  <div className="hidden sm:flex shrink-0 gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs  text-zinc-500 hover:text-white flex items-center gap-1"
                    >
                      [diff] <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs  text-zinc-500 hover:text-white flex items-center gap-1"
                    >
                      [tree] <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && displayCommits.length > 0 && (
          <div className="mt-6 text-center">
            <span className="text-xs  text-zinc-600 bg-[#1b1f2b] px-3 py-1.5 rounded-full border border-zinc-800">
              -- END OF LOG --
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
