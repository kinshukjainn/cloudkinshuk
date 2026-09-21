"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

/* ── Material 3 Expressive · Pixel UI tokens ────────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "border border-[#C4C7C5]/60 dark:border-[#3C4043] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#0B57D0] dark:focus-visible:ring-[#A8C7FA] " +
  "focus-visible:ring-offset-0";

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
  const reduceMotion = useReducedMotion();

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

  // Reset featured index when the recommendation context changes.
  const currentContext = `${recs.length}-${route}`;
  const [prevContext, setPrevContext] = useState(currentContext);
  if (currentContext !== prevContext) {
    setPrevContext(currentContext);
    setActive(0);
  }

  useEffect(() => {
    if (rotateMs <= 0 || paused || reduceMotion || recs.length <= 1) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % recs.length),
      rotateMs,
    );
    return () => clearInterval(id);
  }, [rotateMs, paused, reduceMotion, recs.length, active]);

  if (recs.length === 0) return null;

  const rec = recs[active];
  const maxProb = recs[0]?.probability || 1;
  const pct = Math.max(1, Math.round((rec.probability / maxProb) * 100));
  const matched = new Set(rec.reasons.matchedTopics);
  const topics = rec.post.topics.slice(0, 4);
  const total = recs.length;
  const dotCount = Math.min(recs.length, 8);
  const dotActive = active % dotCount;
  const showProgress =
    !paused && !reduceMotion && rotateMs > 0 && recs.length > 1;

  // Shared framer-motion transition curves (Material-y, matches tailwind ease)
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const easeInOut = [0.4, 0, 0.2, 1] as const;

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
      {/* ---------------------------- HEADER ---------------------------- */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Section icon — squircle in solid tonal blue */}
          <motion.span
            animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              grid h-10 w-10 shrink-0 place-items-center rounded-[14px]
              bg-[#0B57D0] text-white
              shadow-[0_2px_6px_rgba(0,0,0,0.12)]
              dark:bg-[#A8C7FA] dark:text-[#041E49]
            "
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </motion.span>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#747775] dark:text-[#8E918F]">
              For you
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3] md:text-xl">
              {heading}
            </h2>
          </div>
        </div>

        {/* Counter chip — matches site-wide chips */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            className={`
              inline-flex items-center gap-1 rounded-full
              py-1 pl-2.5 pr-3 ${SURFACE}
              font-mono text-[11px] font-semibold tabular-nums
            `}
          >
            <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-[#C4C7C5] dark:text-[#5F6368]">/</span>
            <span className="text-[#747775] dark:text-[#8E918F]">
              {String(total).padStart(2, "0")}
            </span>
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ---------------------------- CARD ---------------------------- */}
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className={`
          relative min-h-[280px] overflow-hidden rounded-[28px]
          ${SURFACE}
          transition-shadow duration-300 ${EASE}
          hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(11,87,208,0.5)]
          dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(168,199,250,0.35)]
          md:min-h-[240px]
        `}
      >
        {/* Progress bar — Pixel blue gradient */}
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[#F0F4F9] dark:bg-[#282A2C]">
          <AnimatePresence initial={false}>
            {showProgress && (
              <motion.div
                key={active}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                exit={{ opacity: 0 }}
                transition={{
                  width: {
                    duration: rotateMs / 1000,
                    ease: "linear",
                  },
                  opacity: { duration: 0.2 },
                }}
                className="
                  h-full bg-gradient-to-r
                  from-[#0B57D0] via-[#4A8FF0] to-[#A8C7FA]
                  dark:from-[#A8C7FA] dark:via-[#D3E3FD] dark:to-[#E8F0FE]
                "
              />
            )}
          </AnimatePresence>
        </div>

        {/* Card content with fade+blur slide transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="absolute inset-0"
          >
            <Link
              href={rec.post.route}
              onClick={() => onSelect?.(rec.post)}
              className={`
                group flex h-full flex-col justify-between p-5
                focus-visible:outline-2 focus-visible:outline-offset-[-2px]
                focus-visible:outline-[#0B57D0] dark:focus-visible:outline-[#A8C7FA]
                md:p-7
              `}
            >
              <div>
                {/* Rank chip — round → squircle shape morph on hover */}
                <div className="mb-3 flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.08, ease: easeOut }}
                    className="
                      inline-flex items-center gap-2 rounded-full
                      py-1 pl-1 pr-2.5 text-[10px] font-bold uppercase tracking-wide
                      bg-[#D3E3FD] ring-1 ring-inset ring-[#0B57D0]/25
                      dark:bg-[#0B57D0]/25 dark:ring-[#A8C7FA]/35
                    "
                  >
                    <span
                      className="
                        grid h-5 w-5 shrink-0 place-items-center rounded-full
                        bg-[#0B57D0] text-white
                        dark:bg-[#A8C7FA] dark:text-[#041E49]
                        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        group-hover:rounded-[6px]
                      "
                    >
                      <span className="font-mono text-[9px] font-bold tabular-nums">
                        {String(active + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="text-[#041E49] dark:text-[#D3E3FD]">
                      Rank
                    </span>
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 }}
                    className="
                      inline-flex items-center gap-1.5 text-[11px] font-bold
                      uppercase tracking-[0.14em]
                      text-[#0B57D0] dark:text-[#A8C7FA]
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        inline-block h-1.5 w-1.5 rounded-full
                        bg-[#0B57D0] dark:bg-[#A8C7FA]
                        animate-pulse
                      "
                    />
                    {pct}% match
                  </motion.span>
                </div>

                {/* Topic pills — tonal, shape morph when matched */}
                {topics.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {topics.map((t, i) => {
                      const isMatch = matched.has(t);
                      return (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.1 + i * 0.05,
                            ease: easeOut,
                          }}
                          className={`
                            inline-flex items-center rounded-full px-2.5 py-1
                            text-[10px] font-semibold uppercase tracking-wider
                            transition-colors duration-300 ${EASE}
                            ${
                              isMatch
                                ? "bg-[#0B57D0] text-white dark:bg-[#A8C7FA] dark:text-[#041E49]"
                                : "bg-[#F0F4F9] text-[#444746] ring-1 ring-inset ring-[#C4C7C5]/60 dark:bg-[#282A2C] dark:text-[#C4C7C5] dark:ring-[#3C4043]"
                            }
                          `}
                        >
                          {t}
                        </motion.span>
                      );
                    })}
                  </div>
                )}

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, ease: easeOut }}
                  className="
                    text-lg font-bold leading-snug tracking-tight
                    text-[#1F1F1F] transition-colors duration-300
                    group-hover:text-[#0B57D0]
                    dark:text-[#E3E3E3] dark:group-hover:text-[#A8C7FA]
                    md:text-2xl md:leading-[1.2]
                  "
                >
                  {rec.post.title}
                </motion.h3>

                {/* Excerpt */}
                {rec.post.excerpt && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: easeOut }}
                    className="
                      mt-2 line-clamp-2 text-sm leading-6
                      text-[#444746] dark:text-[#C4C7C5]
                      md:text-[15px] md:leading-7
                    "
                  >
                    {rec.post.excerpt}
                  </motion.p>
                )}
              </div>

              {/* Match bar + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, ease: easeOut }}
                className="mt-5 flex items-center gap-3"
              >
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#F0F4F9] dark:bg-[#282A2C]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25,
                      ease: easeOut,
                    }}
                    className="
                      h-full rounded-full bg-gradient-to-r
                      from-[#0B57D0] to-[#4A8FF0]
                      dark:from-[#A8C7FA] dark:to-[#D3E3FD]
                    "
                  />
                </div>

                {/* Arrow chip — circle → squircle on hover */}
                <span
                  className="
                    grid h-8 w-8 shrink-0 place-items-center rounded-full
                    bg-[#D3E3FD] text-[#0B57D0]
                    dark:bg-[#0B57D0]/25 dark:text-[#A8C7FA]
                    transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    group-hover:rounded-[10px]
                    group-hover:bg-[#0B57D0] group-hover:text-white
                    dark:group-hover:bg-[#A8C7FA] dark:group-hover:text-[#041E49]
                  "
                >
                  <ArrowRight
                    className="
                      h-4 w-4 transition-transform duration-300
                      group-hover:translate-x-0.5
                    "
                    aria-hidden="true"
                  />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ---------------------------- DOTS ---------------------------- */}
      {recs.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show article ${i + 1}`}
              aria-current={i === dotActive}
              onClick={() => setActive(i)}
              className={`
                group flex h-3 items-center px-0.5
                rounded-full ${FOCUS}
              `}
            >
              <span
                className={`
                  block h-1.5 rounded-full transition-all duration-300 ${EASE}
                  ${
                    i === dotActive
                      ? "w-6 bg-[#0B57D0] dark:bg-[#A8C7FA]"
                      : "w-1.5 bg-[#C4C7C5] group-hover:bg-[#747775] dark:bg-[#3C4043] dark:group-hover:bg-[#8E918F]"
                  }
                `}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
