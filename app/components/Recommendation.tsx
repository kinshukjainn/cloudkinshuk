"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  /** How many cards to show at once. Default 3. */
  count?: number;
  /** How many total recommendations to cycle through. Default 9. */
  pool?: number;
  /** Auto-rotate interval in ms. Set 0 to disable rotation. Default 6000. */
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
  count = 3,
  pool = 9,
  rotateMs = 6000,
  heading = "Recommended reading",
  weights,
  className = "",
  onSelect,
}: RecommendationProps) {
  const pathname = usePathname();
  const route = currentRoute ?? pathname ?? "";

  // Build the index once per post list, then re-query as context changes.
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

  const perView = Math.max(1, Math.min(count, recs.length || count));
  const pages = Math.max(1, Math.ceil(recs.length / perView));

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Instead of using useEffect to reset the page (which causes cascading renders and triggers ESLint errors),
  // we track the context during render and update state immediately if it changes.
  const currentContext = `${recs.length}-${route}`;
  const [prevContext, setPrevContext] = useState(currentContext);

  if (currentContext !== prevContext) {
    setPrevContext(currentContext);
    setPage(0);
  }

  // Respect the user's reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Auto-rotate (paused on hover/focus and when reduced motion is on).
  useEffect(() => {
    if (rotateMs <= 0 || paused || reduceMotion || pages <= 1) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), rotateMs);
    return () => clearInterval(id);
  }, [rotateMs, paused, reduceMotion, pages]);

  // Render nothing rather than break the page when there's nothing to show.
  if (recs.length === 0) return null;

  const start = (page * perView) % recs.length;
  const visible = Array.from(
    { length: perView },
    (_, i) => recs[(start + i) % recs.length],
  );

  return (
    <section
      className={`w-full box-border ${className}`.trim()}
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
      <div className="flex items-center justify-between gap-4 mb-4 border-b border-neutral-300 dark:border-neutral-800 pb-2">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest m-0">
          {heading}
        </h2>
        {pages > 1 && (
          <div
            className="flex gap-1.5 shrink-0"
            aria-label="Recommendation pages"
          >
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`w-2.5 h-2.5 p-0 border rounded-none cursor-pointer ${
                  i === page
                    ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                    : "bg-transparent border-neutral-400 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-neutral-300"
                }`}
                aria-label={`Show recommendation set ${i + 1} of ${pages}`}
                aria-current={i === page}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        )}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-0 p-0 list-none">
        {visible.map((post) => (
          <li key={post.slug} className="flex min-w-0">
            <Link
              href={post.route}
              className="flex flex-col gap-2 w-full p-4 border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 no-underline text-inherit rounded-none"
              onClick={() => onSelect?.(post)}
            >
              {post.topics[0] && (
                <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded-none">
                  {post.topics[0]}
                </span>
              )}
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                {post.title}
              </span>
              {post.excerpt && (
                <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </span>
              )}
              <span className="mt-auto pt-2 text-xs font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-widest flex items-center gap-1">
                Read Article
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
