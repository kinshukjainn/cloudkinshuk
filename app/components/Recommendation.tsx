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

/* ── Surface tokens (mirrors header + home page) ────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const SUBTLE = "bg-[#F0F4F9] dark:bg-[#282A2C]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] " +
  "focus-visible:ring-offset-0";

/* ── Neutral inverted tokens (same as home + header) ────── */
const SOLID = "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]";

/* Pixel / Material Expressive motion curves */
const easeOut = [0.16, 1, 0.3, 1] as const;
const easeEmphasized = [0.2, 0, 0, 1] as const;

/* ────────────────────────────────────────────────────────────
   Material 3 "Expressive" shape library for the active dot.
   Each shape is defined with just 4 animated properties so the
   shared layout indicator can morph fluidly between them.
   ──────────────────────────────────────────────────────────── */
type DotShape = {
  borderRadius: string;
  rotate: number;
  scaleX: number;
  scaleY: number;
};

const DOT_SHAPES: DotShape[] = [
  // 0 · Circle — the timeless M3 base
  { borderRadius: "50%", rotate: 0, scaleX: 1, scaleY: 1 },
  // 1 · Squircle — the Material 3 signature shape
  { borderRadius: "32%", rotate: 0, scaleX: 1.05, scaleY: 1.05 },
  // 2 · Diamond — rotated soft square
  { borderRadius: "16%", rotate: 45, scaleX: 1, scaleY: 1 },
  // 3 · Leaf — opposing rounded corners, pointed tips
  { borderRadius: "50% 4% 50% 4%", rotate: 0, scaleX: 1.1, scaleY: 1.1 },
  // 4 · Pill — stretched horizontally
  { borderRadius: "50%", rotate: 0, scaleX: 1.65, scaleY: 0.85 },
  // 5 · Flower — petal form via rotated asymmetric radii
  { borderRadius: "50% 22% 50% 22%", rotate: 45, scaleX: 1.1, scaleY: 1.1 },
  // 6 · Blob — organic, hand-shaped
  { borderRadius: "58% 42% 55% 45%", rotate: 0, scaleX: 1.05, scaleY: 1.05 },
  // 7 · Rounded square — quiet counterpart to the circle
  { borderRadius: "14%", rotate: 0, scaleX: 1, scaleY: 1 },
];

/* Shared spring configs — high stiffness, moderate damping = snappy but soft */
const layoutSpring = {
  type: "spring" as const,
  stiffness: 480,
  damping: 38,
  mass: 0.8,
};

const shapeSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 26,
  mass: 0.7,
};

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
          {/* Section icon — solid inverted squircle, gentle idle rotation */}
          <motion.span
            animate={reduceMotion ? undefined : { rotate: [0, 6, -6, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
              grid h-10 w-10 shrink-0 place-items-center rounded-[14px]
              ${SOLID}
              shadow-[0_2px_6px_rgba(0,0,0,0.12)]
            `}
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

        {/* Counter chip — monochrome, subtle slide */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: easeOut }}
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
        transition={{ duration: 0.32, ease: easeOut }}
        className={`
          relative min-h-[280px] overflow-hidden rounded-[28px]
          ${SURFACE}
          transition-shadow duration-300 ${EASE}
          hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(0,0,0,0.6)]
          dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(255,255,255,0.3)]
          md:min-h-[240px]
        `}
      >
        {/* Progress bar — solid neutral fill */}
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[#F0F4F9] dark:bg-[#282A2C]">
          <AnimatePresence initial={false}>
            {showProgress && (
              <motion.div
                key={active}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  scaleX: {
                    duration: rotateMs / 1000,
                    ease: "linear",
                  },
                  opacity: { duration: 0.25, ease: easeOut },
                }}
                style={{ transformOrigin: "left center" }}
                className="h-full w-full bg-[#1F1F1F] dark:bg-[#E3E3E3]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Card content — Pixel-style fade + subtle blur + rise */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.42, ease: easeEmphasized }}
            className="absolute inset-0"
          >
            <Link
              href={rec.post.route}
              onClick={() => onSelect?.(rec.post)}
              className={`
                group flex h-full flex-col justify-between p-5
                focus-visible:outline-2 focus-visible:outline-offset-[-2px]
                focus-visible:outline-[#1F1F1F] dark:focus-visible:outline-[#E3E3E3]
                md:p-7
              `}
            >
              <div>
                {/* Rank chip + match % — subtle stagger-in */}
                <div className="mb-3 flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.86, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.06, duration: 0.32, ease: easeOut }}
                    className={`
                      inline-flex items-center gap-2 rounded-full
                      py-1 pl-1 pr-2.5 text-[10px] font-bold uppercase tracking-wide
                      ${SUBTLE}
                    `}
                  >
                    <span
                      className={`
                        grid h-5 w-5 shrink-0 place-items-center rounded-full
                        ${SOLID}
                        transition-all duration-300 ${SPRING}
                        group-hover:rounded-[6px]
                      `}
                    >
                      <span className="font-mono text-[9px] font-bold tabular-nums">
                        {String(active + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
                      Rank
                    </span>
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.32, ease: easeOut }}
                    className="
                      inline-flex items-center gap-1.5 text-[11px] font-bold
                      uppercase tracking-[0.14em]
                      text-[#1F1F1F] dark:text-[#E3E3E3]
                    "
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={
                        reduceMotion
                          ? undefined
                          : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }
                      }
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        inline-block h-1.5 w-1.5 rounded-full
                        bg-[#1F1F1F] dark:bg-[#E3E3E3]
                      "
                    />
                    {pct}% match
                  </motion.span>
                </div>

                {/* Topic pills — matched = filled inverted, others = subtle */}
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
                            delay: 0.08 + i * 0.045,
                            duration: 0.32,
                            ease: easeOut,
                          }}
                          className={`
                            inline-flex items-center rounded-full px-2.5 py-1
                            text-[10px] font-semibold uppercase tracking-wider
                            transition-colors duration-300 ${EASE}
                            ${
                              isMatch
                                ? `${SOLID}`
                                : "bg-[#F0F4F9] text-[#444746] dark:bg-[#282A2C] dark:text-[#C4C7C5]"
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
                  transition={{ delay: 0.14, duration: 0.36, ease: easeOut }}
                  className="
                    text-lg font-bold leading-snug tracking-tight
                    text-[#1F1F1F] transition-colors duration-300
                    dark:text-[#E3E3E3]
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
                    transition={{
                      delay: 0.18,
                      duration: 0.36,
                      ease: easeOut,
                    }}
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

              {/* Match bar + arrow CTA */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.36, ease: easeOut }}
                className="mt-5 flex items-center gap-3"
              >
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#F0F4F9] dark:bg-[#282A2C]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: pct / 100 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.25,
                      ease: easeEmphasized,
                    }}
                    style={{ transformOrigin: "left center" }}
                    className="h-full w-full rounded-full bg-[#1F1F1F] dark:bg-[#E3E3E3]"
                  />
                </div>

                {/* Arrow chip — circle → squircle, inverted fill on hover */}
                <span
                  className={`
                    grid h-8 w-8 shrink-0 place-items-center rounded-full
                    ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                    transition-all duration-300 ${SPRING}
                    group-hover:rounded-[10px]
                    group-hover:bg-[#1F1F1F] group-hover:text-white
                    dark:group-hover:bg-[#E3E3E3] dark:group-hover:text-[#1F1F1F]
                  `}
                >
                  <ArrowRight
                    className={`
                      h-4 w-4 transition-transform duration-300 ${EASE}
                      group-hover:translate-x-0.5
                    `}
                    aria-hidden="true"
                  />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ---------------------------- DOTS ----------------------------
          M3 "Expressive" shape-morphing page indicator:
          · A single shared layout indicator slides between positions
          · At each position it morphs into a distinct shape
          · Springs tuned so movement + morph feel simultaneous
          -------------------------------------------------------------- */}
      {recs.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: dotCount }).map((_, i) => {
            const isActive = i === dotActive;
            const shape = DOT_SHAPES[i % DOT_SHAPES.length];
            return (
              <button
                key={i}
                type="button"
                aria-label={`Show article ${i + 1}`}
                aria-current={isActive}
                onClick={() => setActive(i)}
                className={`
                  group relative grid h-7 w-7 place-items-center rounded-full
                  ${FOCUS}
                `}
              >
                {/* Inactive base dot — soft gray, grows + darkens on hover */}
                <motion.span
                  className="
                    block h-1.5 w-1.5 rounded-full
                    bg-[#C4C7C5] dark:bg-[#3C4043]
                    transition-colors duration-300
                    group-hover:bg-[#747775] dark:group-hover:bg-[#8E918F]
                  "
                  animate={{
                    opacity: isActive ? 0 : 1,
                    scale: isActive ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.28, ease: easeOut }}
                />

                {/* Active shared indicator — morphs shape as it slides.
                    Outer wrapper handles layout movement (uniform size).
                    Inner span handles shape morph (border-radius / rotate /
                    scaleX / scaleY) so the two animations don't fight. */}
                {isActive && (
                  <motion.span
                    layoutId="recommendation-dot-indicator"
                    transition={{ layout: layoutSpring }}
                    className="
                      pointer-events-none absolute inset-0 z-10
                      grid place-items-center
                    "
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        borderRadius: shape.borderRadius,
                        rotate: shape.rotate,
                        scaleX: shape.scaleX,
                        scaleY: shape.scaleY,
                      }}
                      transition={{
                        borderRadius: shapeSpring,
                        rotate: shapeSpring,
                        scaleX: shapeSpring,
                        scaleY: shapeSpring,
                      }}
                      className="
                        block h-4 w-4
                        bg-[#1F1F1F] dark:bg-[#E3E3E3]
                      "
                    />
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
