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

  // Shared framer-motion transition curves (Material-y)
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
        <div className="flex items-center gap-2.5">
          <motion.span
            animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#d3e3fd] text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </motion.span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#747775] dark:text-[#8e918f]">
              For you
            </p>
            <h2 className="text-sm font-semibold text-[#1f1f1f] dark:text-[#e3e3e3]">
              {heading}
            </h2>
          </div>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            className="font-mono text-[11px] font-medium tabular-nums text-[#747775] dark:text-[#8e918f]"
          >
            <span className="text-[#1f1f1f] dark:text-[#e3e3e3]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="mx-0.5 text-[#c4c7c5] dark:text-[#444746]">/</span>
            {String(total).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ---------------------------- CARD ---------------------------- */}
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#e0e3e7] bg-gradient-to-br from-[#f8fafd] to-[#eef3fb] shadow-sm transition-shadow hover:shadow-lg hover:shadow-[#0b57d0]/5 dark:border-[#2d2f31] dark:from-[#1a1d20] dark:to-[#1e1f21] dark:hover:shadow-[#a8c7fa]/5 md:min-h-[240px]"
      >
        {/* Progress bar */}
        <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-[#e0e3e7]/70 dark:bg-[#2d2f31]/70">
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
                className="h-full bg-gradient-to-r from-[#0b57d0] via-[#4a8ff0] to-[#a8c7fa] dark:from-[#a8c7fa] dark:via-[#d3e3fd] dark:to-[#e8f0fe]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Card content with fade+blur slide transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{
              opacity: 0,
              y: 16,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -16,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="absolute inset-0"
          >
            <Link
              href={rec.post.route}
              onClick={() => onSelect?.(rec.post)}
              className="group flex h-full flex-col justify-between p-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0b57d0] md:p-7"
            >
              <div>
                {/* Rank + match percentage */}
                <div className="mb-3 flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.08, ease: easeOut }}
                    className="inline-flex items-center rounded-full bg-[#d3e3fd] px-2.5 py-1 font-mono text-[10px] font-semibold tabular-nums text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]"
                  >
                    #{String(active + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 }}
                    className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0b57d0] dark:text-[#a8c7fa]"
                  >
                    {pct}% match
                  </motion.span>
                </div>

                {/* Topic pills */}
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
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                            isMatch
                              ? "bg-[#0b57d0] text-white dark:bg-[#a8c7fa] dark:text-[#04234d]"
                              : "bg-white/80 text-[#747775] ring-1 ring-[#e0e3e7] dark:bg-[#282a2c]/80 dark:text-[#8e918f] dark:ring-[#2d2f31]"
                          }`}
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
                  className="text-lg font-semibold leading-snug tracking-tight text-[#1f1f1f] transition-colors group-hover:text-[#0b57d0] dark:text-[#e3e3e3] dark:group-hover:text-[#a8c7fa] md:text-2xl md:leading-[1.2]"
                >
                  {rec.post.title}
                </motion.h3>

                {/* Excerpt */}
                {rec.post.excerpt && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: easeOut }}
                    className="mt-2 line-clamp-2 text-sm leading-6 text-[#444746] dark:text-[#c4c7c5] md:text-[15px] md:leading-7"
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
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e0e3e7] dark:bg-[#2d2f31]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25,
                      ease: easeOut,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0b57d0] to-[#4a8ff0] dark:from-[#a8c7fa] dark:to-[#d3e3fd]"
                  />
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#0b57d0] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#a8c7fa]" />
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
              className="group flex h-3 items-center px-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === dotActive
                    ? "w-6 bg-[#0b57d0] dark:bg-[#a8c7fa]"
                    : "w-1.5 bg-[#c4c7c5] group-hover:bg-[#747775] dark:bg-[#444746] dark:group-hover:bg-[#8e918f]"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
