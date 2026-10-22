"use client";

import { useEffect, useState } from "react";
import { getFeedbacksAction } from "../db-api-call/blogs-feedback";
import { Search, Terminal, Mail } from "lucide-react";
import { CalendarDays } from "lucide-react";

// Define the type based on your server action's return shape
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

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getFeedbacksAction();
        if (response.success) {
          setFeedbacks((response.data as unknown as Feedback[]) || []);
        } else {
          setError(response.error || "Failed to fetch logs.");
        }
      } catch {
        // Optional catch binding — no unused variable.
        setError("An unexpected error occurred while fetching logs.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter feedbacks based on search query
  const filteredFeedbacks = feedbacks.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.feedback.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      (item.github_id && item.github_id.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-white text-[#111] selection:bg-[#111] selection:text-white dark:bg-zinc-950 dark:text-[#F2F2F2] dark:selection:bg-[#F2F2F2] dark:selection:text-[#0B0B0C]">
      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        {/* ── Terminal Prompt Header ─────────────────────── */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#D6D6D0] pb-6 dark:border-[#2B2B2E]">
          <div className="flex items-center gap-2.5 text-[25px] font-bold tracking-[0.22em] text-black dark:text-white">
            <span className="text-black dark:text-white">$</span>
            <span>Feedback of blogs</span>
          </div>

          {/* ── Search Input ─────────────────────────────── */}
          <div className="relative flex w-full max-w-sm items-center gap-2 border border-[#D6D6D0] bg-white px-3 py-2 transition-colors focus-within:border-blue-800 dark:border-[#2B2B2E] dark:bg-[#121214] dark:focus-within:border-blue-400">
            <Search className="h-4 w-4 shrink-0 text-[#555] dark:text-[#A8A8A8]" />
            <input
              type="text"
              placeholder="grep 'search_term'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[14px] font-semibold text-[#111] outline-none placeholder:text-[#888] dark:text-[#F2F2F2] dark:placeholder:text-[#666]"
            />
          </div>
        </div>

        {/* ── Content States ────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-[#555] dark:text-[#A8A8A8]">
            <Terminal className="h-8 w-8 animate-pulse" />
            <p className="text-sm font-bold tracking-widest uppercase">
              Fetching logs...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
            <p className="flex items-center gap-3 text-lg font-bold text-red-800 dark:text-red-400">
              <span className="grid h-8 w-8 place-items-center rounded bg-red-800 text-white dark:bg-red-400 dark:text-red-950">
                !
              </span>
              Error executing command
            </p>
            <p className="mt-4 text-sm font-mono text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#D6D6D0] bg-[#F2F2EF] p-10 text-center dark:border-[#2B2B2E] dark:bg-[#121214]">
            <p className="text-lg font-bold text-[#111] dark:text-[#F2F2F2]">
              {searchQuery
                ? "No matching logs found."
                : "No approved feedbacks found."}
            </p>
            <p className="mt-2 text-sm text-[#555] dark:text-[#A8A8A8]">
              {searchQuery
                ? "Try adjusting your search query."
                : "Check back later or submit a new one."}
            </p>
          </div>
        ) : (
          /* ── Feedbacks List ─────────────────────────────── */
          <div className="space-y-6">
            {filteredFeedbacks.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border border-[#D6D6D0] bg-white p-6 transition-colors hover:border-[#111] dark:border-[#2B2B2E] dark:bg-[#121214] dark:hover:border-[#F2F2F2]"
              >
                {/* Card Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-[#111] dark:text-[#F2F2F2]">
                      {item.name}
                      {item.github_id && (
                        <a
                          href={`https://github.com/${item.github_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
                        >
                          @{item.github_id}
                        </a>
                      )}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#555] dark:text-[#A8A8A8]">
                      <Mail className="h-3.5 w-3.5" />
                      {item.email}
                    </p>
                  </div>

                  {/* Status / Category Tags */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded border border-emerald-600/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                    <span className="rounded border border-[#D6D6D0] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#555] dark:border-[#2B2B2E] dark:text-[#A8A8A8]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Feedback Content */}
                <div className="mt-5 border-t border-dashed border-[#D6D6D0] pt-5 dark:border-[#2B2B2E]">
                  <p className="text-base leading-relaxed text-[#1A1A1A] sm:text-[17px] dark:text-[#CFCFCF]">
                    {item.feedback}
                  </p>
                </div>

                {/* Footer / Metadata */}
                <div className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#555] dark:text-[#A8A8A8]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>Posted:</span>
                  <span>
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ FOOTER STRIP ============ */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-[#D6D6D0] pt-6 text-[11px] font-bold tracking-[0.24em] text-[#555] dark:border-[#2B2B2E] dark:text-[#A8A8A8]">
          <span>Kinshuk Jain © {new Date().getFullYear()}</span>
          <span>Built with intent</span>
        </footer>
      </main>
    </div>
  );
}
