"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildIndex, type BlogPost, type ScoringWeights } from "@/lib/engine";
import { blogs } from "@/lib/rec_blogs";

export interface RecommendationProps {
  /** Override the detected route. Defaults to the current pathname. */
  currentRoute?: string;
  /** Current topic(s) to bias recommendations toward. */
  currentTopic?: string | string[];
  /** Slug or route of the post being viewed, so it's never recommended. */
  excludeSlug?: string;
  /** Posts to draw from. Defaults to the shared blog registry. */
  posts?: BlogPost[];
  /** Total cards (featured + list). Default 4. */
  count?: number;
  /** How many total recommendations to cycle through. Default 12. */
  pool?: number;
  /** Auto-rotate interval in ms. Set 0 to disable. Default 7000. */
  rotateMs?: number;
  /** Heading text. */
  heading?: string;
  /** Tune the engine's signal weights. */
  weights?: Partial<ScoringWeights>;
  /** Extra className on the root element. */
  className?: string;
  /** Fires when a card is clicked (navigation still happens via the link). */
  onSelect?: (post: BlogPost) => void;
}

export default function Recommendation({
  currentRoute,
  currentTopic,
  excludeSlug,
  posts = blogs,
  count = 4,
  pool = 12,
  rotateMs = 7000,
  heading = "Recommended reading",
  weights,
  className = "",
  onSelect,
}: RecommendationProps) {
  const pathname = usePathname();
  const route = currentRoute ?? pathname ?? "";

  const index = useMemo(() => buildIndex(posts), [posts]);

  const recs = useMemo(
    () =>
      index
        .recommend({
          currentRoute: route,
          currentTopic,
          exclude: excludeSlug ? [excludeSlug] : [],
          limit: pool,
          weights,
        })
        .map((r) => r.post),
    [index, route, currentTopic, excludeSlug, pool, weights],
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Reset the featured index when context changes (render-time, no effect)
  const currentContext = `${recs.length}-${route}`;
  const [prevContext, setPrevContext] = useState(currentContext);
  if (currentContext !== prevContext) {
    setPrevContext(currentContext);
    setActive(0);
  }

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Auto-rotate the featured card
  useEffect(() => {
    if (rotateMs <= 0 || paused || reduceMotion || recs.length <= 1) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % recs.length),
      rotateMs,
    );
    return () => clearInterval(id);
  }, [rotateMs, paused, reduceMotion, recs.length]);

  if (recs.length === 0) return null;

  const featured = recs[active];
  const rest = recs
    .filter((_, i) => i !== active)
    .slice(0, Math.max(0, count - 1));

  return (
    <section
      className={`w-full ${className}`.trim()}
      aria-label={heading}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {/* ---------- HEADER ---------- */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#d3e3fd] text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
              For you
            </p>
            <h2 className="text-sm font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">
              {heading}
            </h2>
          </div>
        </div>

        {/* Pagination dots */}
        {recs.length > 1 && (
          <div
            className="flex shrink-0 items-center gap-1.5"
            aria-label="Cycle featured article"
          >
            {recs.slice(0, Math.min(recs.length, 6)).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show featured article ${i + 1}`}
                aria-current={i === active % Math.min(recs.length, 6)}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active % Math.min(recs.length, 6)
                    ? "w-5 bg-[#0b57d0] dark:bg-[#a8c7fa]"
                    : "w-1.5 bg-[#c4c7c5] hover:bg-[#747775] dark:bg-[#444746] dark:hover:bg-[#8e918f]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------- FEATURED CARD ---------- */}
      <Link
        href={featured.route}
        onClick={() => onSelect?.(featured)}
        className="group relative block overflow-hidden rounded-2xl bg-[#f0f4f9] p-5 transition-colors hover:bg-[#e8eef7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b57d0] dark:bg-[#1e1f21] dark:hover:bg-[#232527] md:p-7"
      >
        {/* Left accent bar (Material 3 "primary container" hint) */}
        <span className="absolute left-0 top-0 h-full w-1 bg-[#0b57d0] dark:bg-[#a8c7fa]" />

        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="min-w-0 flex-1 space-y-3">
            {featured.topics[0] && (
              <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0842a0] dark:bg-[#282a2c] dark:text-[#a8c7fa]">
                {featured.topics[0]}
              </span>
            )}

            <h3 className="text-lg font-medium leading-snug tracking-tight text-[#1f1f1f] transition-colors group-hover:text-[#0b57d0] dark:text-[#e3e3e3] dark:group-hover:text-[#a8c7fa] md:text-2xl md:leading-[1.2]">
              {featured.title}
            </h3>

            {featured.excerpt && (
              <p className="line-clamp-2 max-w-2xl text-sm leading-7 text-[#444746] dark:text-[#c4c7c5] md:text-base">
                {featured.excerpt}
              </p>
            )}
          </div>

          {/* Arrow CTA */}
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#c4c7c5] px-4 py-2 text-xs font-medium text-[#0b57d0] transition-colors group-hover:border-[#0b57d0] group-hover:bg-white dark:border-[#444746] dark:text-[#a8c7fa] dark:group-hover:border-[#a8c7fa] dark:group-hover:bg-[#282a2c]">
            <span>Read</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {/* ---------- COMPACT LIST ---------- */}
      {rest.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {rest.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={post.route}
                onClick={() => onSelect?.(post)}
                className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-[#f0f4f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b57d0] dark:hover:bg-[#1e1f21]"
              >
                {/* Numbered index */}
                <span className="w-7 shrink-0 text-right text-xs font-medium tabular-nums text-[#747775] dark:text-[#8e918f]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Divider line */}
                <span className="h-6 w-px shrink-0 bg-[#e0e3e7] dark:bg-[#2d2f31]" />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {post.topics[0] && (
                      <span className="truncate text-[10px] font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                        {post.topics[0]}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-sm font-medium text-[#1f1f1f] transition-colors group-hover:text-[#0b57d0] dark:text-[#e3e3e3] dark:group-hover:text-[#a8c7fa]">
                    {post.title}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-[#c4c7c5] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0b57d0] dark:text-[#444746] dark:group-hover:text-[#a8c7fa]" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
