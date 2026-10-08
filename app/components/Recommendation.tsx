"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildIndex, type BlogPost, type ScoringWeights } from "@/lib/engine";
import { blogs } from "@/lib/rec_blogs";

export interface RecommendationProps {
  currentRoute?: string;
  currentTopic?: string | string[];
  excludeSlug?: string;
  posts?: BlogPost[];
  /** Kept for API compatibility — ignored (only one card is shown). */
  count?: number;
  pool?: number;
  /** Auto-rotate interval in ms. Default 4500. Set 0 to disable. */
  rotateMs?: number;
  heading?: string;
  weights?: Partial<ScoringWeights>;
  className?: string;
  onSelect?: (post: BlogPost) => void;
}

/* ─────────────────────────────────────────────────────────────
   Editorial Recommendation · matches the rest of the site

   · Flat, high-contrast, bold uppercase type — no soft cards.
   · `border-b-2` ink rules mark section breaks.
   · One accent: blue-700 / blue-400 — matched topics + links.
   · No animation framework. CSS transitions only.
   · Fully responsive: 320 px → ultra-wide.
   ───────────────────────────────────────────────────────────── */

const TEXT = "text-[#111] dark:text-[#eee]";
const TEXT_MUTED = "text-[#444] dark:text-[#ccc]";
const TEXT_SUBTLE = "text-[#555] dark:text-[#aaa]";

const ACCENT = "text-blue-700 dark:text-blue-400";

const RULE_INK = "border-[#1f1f1f] dark:border-[#e3e3e3]";
const RULE_SOFT = "border-black/[0.12] dark:border-white/[0.18]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-blue-700/60 dark:focus-visible:ring-blue-400/60";

const CHIP_ACTIVE =
  "border-blue-700 bg-blue-700 text-white " +
  "dark:border-blue-400 dark:bg-blue-400 dark:text-[#0a0a0a]";

const CHIP_IDLE = `border-black/[0.12] ${TEXT_SUBTLE} dark:border-white/[0.18]`;

export default function Recommendation({
  currentRoute,
  currentTopic,
  excludeSlug,
  posts = blogs,
  pool = 12,
  rotateMs = 4500,
  heading = "Recommended for you",
  weights,
  className = "",
  onSelect,
}: RecommendationProps) {
  const pathname = usePathname();
  const route = currentRoute ?? pathname ?? "";

  const index = useMemo(() => buildIndex(posts), [posts]);

  const recs = useMemo(
    () =>
      index.recommend({
        currentRoute: route,
        currentTopic,
        exclude: excludeSlug ? [excludeSlug] : [],
        limit: pool,
        weights,
      }),
    [index, route, currentTopic, excludeSlug, pool, weights],
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Reset featured index when the recommendation context changes. */
  const currentContext = `${recs.length}-${route}`;
  const [prevContext, setPrevContext] = useState(currentContext);
  if (currentContext !== prevContext) {
    setPrevContext(currentContext);
    setActive(0);
  }

  /* Auto-rotate (paused on hover / focus). */
  useEffect(() => {
    if (rotateMs <= 0 || paused || recs.length <= 1) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % recs.length),
      rotateMs,
    );
    return () => clearInterval(id);
  }, [rotateMs, paused, recs.length, active]);

  if (recs.length === 0) return null;

  const rec = recs[active];
  const maxProb = recs[0]?.probability || 1;
  const pct = Math.max(1, Math.round((rec.probability / maxProb) * 100));
  const matched = new Set(rec.reasons.matchedTopics);
  const topics = rec.post.topics.slice(0, 4);
  const total = recs.length;
  const dotCount = Math.min(recs.length, 8);
  const dotActive = active % dotCount;

  return (
    <section
      className={`w-full ${className}`.trim()}
      aria-label={heading}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {/* ═══════════ HEADER ═══════════ */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Sparkles
            className={`h-4 w-4 shrink-0 ${ACCENT}`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p
              className={`text-[10px] font-bold uppercase tracking-widest ${TEXT_SUBTLE}`}
            >
              For you
            </p>
            <h2
              className={`
                truncate text-sm font-extrabold uppercase tracking-widest
                sm:text-base ${TEXT}
              `}
            >
              {heading}
            </h2>
          </div>
        </div>

        <span
          className={`
            shrink-0 font-mono text-[11px] font-bold uppercase
            tracking-wider tabular-nums ${TEXT_SUBTLE}
          `}
        >
          {String(active + 1).padStart(2, "0")}
          <span className="mx-0.5 opacity-50">/</span>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className={`border-b-2 ${RULE_INK}`} />

      {/* ═══════════ CARD ═══════════ */}
      <article className="pt-5">
        <Link
          href={rec.post.route}
          onClick={() => onSelect?.(rec.post)}
          className={`
            group block rounded-lg border ${RULE_SOFT}
            p-5 transition-colors duration-300 ${EASE} ${FOCUS}
            hover:border-[#1f1f1f] dark:hover:border-[#e3e3e3]
            md:p-6
          `}
        >
          {/* Rank + match row */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-md border
                px-1.5 py-0.5 text-[10px] font-bold uppercase
                tracking-wider ${CHIP_IDLE}
              `}
            >
              <span className="font-mono tabular-nums">
                {String(active + 1).padStart(2, "0")}
              </span>
              Rank
            </span>
            <span
              className={`
                text-[10px] font-bold uppercase tracking-widest ${TEXT_SUBTLE}
              `}
            >
              {pct}% match
            </span>
          </div>

          {/* Topic chips */}
          {topics.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {topics.map((t) => {
                const isMatch = matched.has(t);
                return (
                  <span
                    key={t}
                    className={`
                      inline-flex items-center rounded-md border px-2 py-0.5
                      text-[10px] font-bold uppercase tracking-wider
                      transition-colors duration-300 ${EASE}
                      ${isMatch ? CHIP_ACTIVE : CHIP_IDLE}
                    `}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          )}

          {/* Title */}
          <h3
            className={`
              text-lg font-extrabold tracking-tight md:text-2xl ${TEXT}
              transition-colors duration-300 ${EASE}
              group-hover:text-blue-700 dark:group-hover:text-blue-400
            `}
          >
            {rec.post.title}
          </h3>

          {/* Excerpt */}
          {rec.post.excerpt && (
            <p
              className={`
                mt-2 line-clamp-2 text-sm leading-relaxed md:text-base
                ${TEXT_MUTED}
              `}
            >
              {rec.post.excerpt}
            </p>
          )}

          {/* Match bar + CTA */}
          <div className="mt-4 flex items-center gap-4">
            <div
              className={`
                h-1 w-full max-w-[180px] overflow-hidden rounded-full
                bg-black/[0.08] dark:bg-white/[0.12]
              `}
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-blue-700 dark:bg-blue-400"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className={`
                ml-auto inline-flex shrink-0 items-center gap-1.5
                text-[11px] font-bold uppercase tracking-wider ${ACCENT}
                transition-colors duration-300 ${EASE}
                group-hover:underline group-hover:decoration-2
                group-hover:underline-offset-4
              `}
            >
              Read
              <ArrowRight
                className={`
                  h-3.5 w-3.5 transition-transform duration-300 ${EASE}
                  group-hover:translate-x-0.5
                `}
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      </article>

      {/* ═══════════ PAGINATION DOTS ═══════════ */}
      {recs.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: dotCount }).map((_, i) => {
            const isActive = i === dotActive;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Show article ${i + 1}`}
                aria-current={isActive}
                onClick={() => setActive(i)}
                className={`
                  rounded-full transition-all duration-300 ${EASE} ${FOCUS}
                  ${
                    isActive
                      ? "h-1.5 w-6 bg-[#1f1f1f] dark:bg-[#e3e3e3]"
                      : `h-1.5 w-1.5 bg-[#c4c7c5] hover:bg-[#747775] dark:bg-[#3c4043] dark:hover:bg-[#8e918f]`
                  }
                `}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
