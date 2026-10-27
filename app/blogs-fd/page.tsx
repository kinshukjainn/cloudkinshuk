"use client";

import { useEffect, useState } from "react";
import { getFeedbacksAction } from "../db-api-call/blogs-feedback";
import {
  Search,
  Mail,
  CalendarDays,
  AlertTriangle,
  Inbox,
  Github,
  X,
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────── */
type Feedback = {
  id: number;
  name: string;
  email: string;
  github_id: string | null;
  category: string;
  feedback: string;
  created_at: string | Date;
  status: string;
  reviewed_at: string | Date | null;
};

/* ── Shared styles (hardcoded hex, no CSS variables) ────── */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d0a869] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d0d0c]";

const LINK =
  "text-[#d0a869] underline decoration-1 underline-offset-4 transition-colors hover:text-[#e8c98f] " +
  FOCUS;

const MONO = " text-[15px]  tracking-[0.16em] text-white font-semibold";

const PROSE = "text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8";

const RULE = "border-[#272521]";

/* ── Helpers ────────────────────────────────────────────── */
function formatDate(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isApproved(status: string): boolean {
  return status.trim().toLowerCase() === "approved";
}

/* ── Page ───────────────────────────────────────────────── */
export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const response = await getFeedbacksAction();
        if (cancelled) return;

        if (response.success) {
          setFeedbacks((response.data as unknown as Feedback[]) || []);
        } else {
          setError(response.error || "Failed to fetch logs.");
        }
      } catch {
        if (!cancelled) {
          setError("An unexpected error occurred while fetching logs.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const query = searchQuery.toLowerCase().trim();

  const filteredFeedbacks = feedbacks.filter((item) => {
    if (!query) return true;
    return (
      item.feedback.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      (item.github_id?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <div className="min-h-screen bg-[#1B1B1D] text-[#d6d1c6] selection:bg-[#d0a869] selection:text-[#0d0d0c]">
      <main className="mx-auto w-full max-w-[680px] px-5 py-12 sm:px-8 sm:py-16">
        {/* ── Header ─────────────────────────────────────── */}
        <header>
          <p className={MONO}>
            feedbacks · {feedbacks.length}{" "}
            {feedbacks.length === 1 ? "entry" : "entries"}
          </p>

          <h1 className="mt-3  text-[28px] leading-tight font-bold tracking-tight text-[#f2eee5] sm:text-4xl">
            Comments & Thoughts on <span className=" text-blue-400">blogs</span>
          </h1>

          <p className={`mt-4 ${PROSE}`}>
            Notes, corrections, and thoughts readers have sent in.
          </p>
        </header>

        {/* ── Search ─────────────────────────────────────── */}
        <div className="mt-10">
          <label htmlFor="feedback-search" className={MONO}>
            search
          </label>

          <div
            className={`mt-2 flex items-center gap-2  bg-[#121212] px-3 py-2 rounded-full pb-2  ${RULE}`}
          >
            <Search
              className="h-4 w-4 shrink-0 text-[#8b867c]"
              aria-hidden="true"
            />
            <input
              id="feedback-search"
              type="text"
              placeholder="name, keyword, or github…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search feedback"
              className="w-full min-w-0 bg-transparent text-[15px] text-[#f2eee5] placeholder:text-[#8b867c] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className={`shrink-0 text-[#8b867c] transition-colors hover:text-[#d0a869] ${FOCUS}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {searchQuery && (
            <p className={`mt-3 ${MONO}`}>
              {filteredFeedbacks.length === 0
                ? "no results"
                : `${filteredFeedbacks.length} result${
                    filteredFeedbacks.length === 1 ? "" : "s"
                  }`}
            </p>
          )}
        </div>

        {/* ── Content states ─────────────────────────────── */}
        <div className="mt-12">
          {loading ? (
            <p className={`flex items-center gap-2 ${MONO}`}>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d0a869]"
              />
              fetching feedback…
            </p>
          ) : error ? (
            <div className="border-l-2 border-[#b4543f] pl-5">
              <p className="flex items-center gap-2  text-lg text-[#f2eee5]">
                <AlertTriangle
                  className="h-4 w-4 shrink-0 text-[#b4543f]"
                  aria-hidden="true"
                />
                Couldn&apos;t load feedback
              </p>
              <p className={`mt-2 ${PROSE}`}>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={`mt-3 text-[13px] ${LINK}`}
              >
                try again ↻
              </button>
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="py-16 text-center">
              <Inbox
                className="mx-auto h-6 w-6 text-[#8b867c]"
                aria-hidden="true"
              />
              <p className="mt-3  text-lg text-[#f2eee5]">
                {searchQuery ? "No matching feedback" : "No feedback yet"}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-7 text-[#8b867c]">
                {searchQuery
                  ? "Try a different name, keyword, or GitHub handle."
                  : "Check back later or submit a new one."}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`mt-5 inline-block text-[13px] ${LINK}`}
                >
                  clear filter
                </button>
              )}
            </div>
          ) : (
            <ul>
              {filteredFeedbacks.map((item) => {
                const approved = isApproved(item.status);
                const posted = formatDate(item.created_at);

                return (
                  <li
                    key={item.id}
                    className={`border-b py-6 first:pt-0 last:border-b-0 ${RULE}`}
                  >
                    {/* Name + category/status */}
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h2 className=" text-lg leading-snug text-[#f2eee5]">
                        {item.name}
                      </h2>

                      <p className={`flex items-center gap-2 ${MONO}`}>
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${
                              approved ? "bg-[#7d9b6a]" : "bg-[#8b867c]"
                            }`}
                          />
                          {item.status}
                        </span>
                        <span aria-hidden="true" className="opacity-50">
                          ·
                        </span>
                        <span>{item.category}</span>
                      </p>
                    </div>

                    {/* Feedback body */}
                    <p className={`mt-3 ${PROSE}`}>{item.feedback}</p>

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8b867c]">
                      <a
                        href={`mailto:${item.email}`}
                        className={`inline-flex items-center gap-1.5 transition-colors hover:text-[#d0a869] ${FOCUS}`}
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="normal-case tracking-normal">
                          {item.email}
                        </span>
                      </a>

                      {item.github_id && (
                        <a
                          href={`https://github.com/${item.github_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 transition-colors hover:text-[#d0a869] ${FOCUS}`}
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="normal-case tracking-normal">
                            {item.github_id}
                          </span>
                        </a>
                      )}

                      {posted && (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {posted}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <footer
          className={`mt-16 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t pt-5 ${RULE} ${MONO}`}
        >
          <span>kinshuk jain © {new Date().getFullYear()}</span>
          <span>hand-coded · no templates</span>
        </footer>
      </main>
    </div>
  );
}
