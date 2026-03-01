"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  GitCommit,
  Github,
  GitBranch,
  ExternalLink,
  Clock,
  User,
  AlertTriangle,
  RefreshCw,
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
  perPage: 15,
};

// ============================================================================
// Utility Functions
// ============================================================================

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
};

// Extract just the first line of the commit message for the title
const getCommitTitle = (message: string) => {
  return message.split("\n")[0];
};

// Extract the rest of the commit message if it exists
const getCommitBody = (message: string) => {
  const parts = message.split("\n");
  if (parts.length <= 1) return null;
  return parts.slice(1).join("\n").trim();
};

// ============================================================================
// Main Component
// ============================================================================

export default function ChangelogTracker() {
  const [commits, setCommits] = useState<GithubCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/commits?sha=${GITHUB_CONFIG.branch}&per_page=${GITHUB_CONFIG.perPage}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "GitHub API rate limit exceeded. Please try again later.",
          );
        } else if (response.status === 404) {
          throw new Error(
            "Repository not found. Check the username and repo name.",
          );
        }
        throw new Error(`Failed to fetch commits (Status: ${response.status})`);
      }

      const data = await response.json();
      setCommits(data);
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

  return (
    <div className="min-h-screen pt-16 md:pt-24 bg-[#1b1b1b] text-gray-200 selection:bg-green-500 selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Block */}
        <header className="mb-10 pt-10 border-b border-[#444] pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-5xl md:text-4xl font-semibold text-white mb-3 tracking-tight">
                Logs
              </h1>
              <p className="text-lg text-gray-300 font-medium">
                Logs list of changes in project
              </p>
            </div>

            <a
              href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#282828] border border-[#444] hover:border-green-500 text-white text-sm font-medium rounded-xl transition-colors w-fit"
            >
              <Github className="w-4 h-4" />
              View on GitHub
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </a>
          </div>

          {/* Config Data List */}
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4  text-sm">
            <div className="flex flex-col gap-1">
              <dt className="text-white font-mono flex items-center font-bold  gap-1.5">
                <User className="w-3.5 h-3.5" /> Repository tracked
              </dt>
              <dd className="text-green-400 font-mono">
                {GITHUB_CONFIG.username}/{GITHUB_CONFIG.repository}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-white font-bold font-mono flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" /> Branch
              </dt>
              <dd className="text-green-400 font-mono">
                {GITHUB_CONFIG.branch}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              <dt className="text-gray-500 font-mono"></dt>
              <dd>
                <button
                  onClick={fetchCommits}
                  disabled={loading}
                  className="inline-flex items-center gap-2 text-black font-semibold  bg-green-500 p-1 rounded-xl cursor-pointer transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Sync Latest
                </button>
              </dd>
            </div>
          </dl>
        </header>

        {/* Content Area */}
        <main>
          {loading ? (
            // Loading State (Terminal Output Style)
            <div className="font-mono text-sm text-gray-200 space-y-2 p-6 bg-[#282828] border border-[#444] rounded-xl">
              <p className="text-green-500">$ fetching commits...</p>
              <p className="animate-pulse">
                establishing connection to api.github.com...
              </p>
            </div>
          ) : error ? (
            // Error State
            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-semibold mb-1">
                  ERR_FETCH_FAILED
                </h3>
                <p className="text-gray-300 text-sm">{error}</p>
                <button
                  onClick={fetchCommits}
                  className="mt-4 px-4 py-2 bg-[#282828] border border-[#444] hover:border-red-500 text-gray-300 text-sm font-medium rounded-xl transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : (
            // Commit Timeline
            <div className="relative border-l-2 border-green-500 ml-3 sm:ml-4 space-y-10 py-4">
              {commits.map((commit) => {
                const title = getCommitTitle(commit.commit.message);
                const body = getCommitBody(commit.commit.message);
                const shortSha = commit.sha.substring(0, 7);

                return (
                  <div key={commit.sha} className="relative pl-6 sm:pl-8 group">
                    {/* Timeline Dot */}
                    <div className="absolute w-3 h-3 bg-green-500 border-2 border-black group-hover:border-green-500 rounded-full -left-[7px] top-1.5 transition-colors" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        {/* Commit Title */}
                        <h3 className="text-lg font-medium text-white break-words leading-snug mb-2 group-hover:text-green-400 transition-colors">
                          <a
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {title}
                          </a>
                        </h3>

                        {/* Commit Metadata */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {commit.author?.avatar_url ? (
                              <Image
                                src={commit.author.avatar_url}
                                alt={commit.commit.author.name}
                                width={20}
                                height={20}
                                className="rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-xl bg-[#444] flex items-center justify-center">
                                <User className="w-3 h-3 text-gray-300" />
                              </div>
                            )}
                            <span className="font-medium text-gray-300">
                              {commit.commit.author.name}
                            </span>
                          </div>

                          <span className="hidden sm:inline text-[#555]">
                            •
                          </span>

                          <div className="flex items-center gap-1.5 font-mono text-xs text-gray-200">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDateTime(commit.commit.author.date)}
                          </div>
                        </div>
                      </div>

                      {/* SHA Hash Link */}
                      <a
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#282828] border border-[#444] hover:border-green-500 text-green-400 hover:text-green-300 font-mono text-sm w-max rounded-xl transition-colors"
                        title="View commit on GitHub"
                      >
                        <GitCommit className="w-3.5 h-3.5" />
                        {shortSha}
                      </a>
                    </div>

                    {/* Extended Commit Body (If it exists) */}
                    {body && (
                      <pre className="mt-3 p-3 bg-[#282828] border border-[#444] text-gray-200 text-xs sm:text-sm font-mono rounded-xl whitespace-pre-wrap overflow-x-auto">
                        {body}
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer */}
        {!loading && !error && commits.length > 0 && (
          <footer className="mt-12 pt-6 border-t border-[#444] text-center">
            <a
              href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/commits/${GITHUB_CONFIG.branch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors"
            >
              View full history on GitHub{" "}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </footer>
        )}
      </div>
    </div>
  );
}
