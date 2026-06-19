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

  // Reset to the first page whenever the recommendation set changes.
  useEffect(() => {}, [recs.length, route]);

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
      className={`rec ${className}`.trim()}
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
      <div className="rec__head">
        <h2 className="rec__title">{heading}</h2>
        {pages > 1 && (
          <div className="rec__dots" aria-label="Recommendation pages">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`rec__dot ${i === page ? "is-active" : ""}`.trim()}
                aria-label={`Show recommendation set ${i + 1} of ${pages}`}
                aria-current={i === page}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        )}
      </div>

      <ul
        key={page}
        className={`rec__grid ${reduceMotion ? "" : "rec__grid--fade"}`.trim()}
      >
        {visible.map((post) => (
          <li key={post.slug} className="rec__item">
            <Link
              href={post.route}
              className="rec__card"
              onClick={() => onSelect?.(post)}
            >
              {post.topics[0] && (
                <span className="rec__tag">{post.topics[0]}</span>
              )}
              <span className="rec__cardTitle">{post.title}</span>
              {post.excerpt && (
                <span className="rec__excerpt">{post.excerpt}</span>
              )}
              <span className="rec__more">Read article →</span>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .rec {
          container-type: inline-size; /* adapt to the container, not the viewport */
          width: 100%;
          box-sizing: border-box;
          color: var(--rec-fg, inherit);
          font: inherit;
        }
        .rec :global(*),
        .rec :global(*::before),
        .rec :global(*::after) {
          box-sizing: border-box;
        }
        .rec__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: clamp(0.75rem, 2cqi, 1.25rem);
        }
        .rec__title {
          margin: 0;
          font-size: clamp(1rem, 2.6cqi, 1.25rem);
          font-weight: 650;
          letter-spacing: -0.01em;
        }
        .rec__dots {
          display: flex;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        .rec__dot {
          width: 0.55rem;
          height: 0.55rem;
          padding: 0;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          background: var(--rec-dot, rgba(127, 127, 127, 0.35));
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }
        .rec__dot:hover {
          transform: scale(1.2);
        }
        .rec__dot.is-active {
          background: var(--rec-accent, currentColor);
          transform: scale(1.15);
        }
        .rec__grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          /* min(100%, …) keeps a single card from overflowing a narrow parent */
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 15rem), 1fr)
          );
          gap: clamp(0.6rem, 2cqi, 1.1rem);
        }
        .rec__grid--fade {
          animation: rec-fade 0.45s ease;
        }
        @keyframes rec-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .rec__item {
          min-width: 0; /* let cards shrink instead of forcing overflow */
          display: flex;
        }
        .rec__card {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          width: 100%;
          min-width: 0;
          padding: clamp(0.85rem, 2.5cqi, 1.15rem);
          border-radius: var(--rec-radius, 14px);
          text-decoration: none;
          color: inherit;
          background: var(--rec-card-bg, rgba(127, 127, 127, 0.08));
          border: 1px solid var(--rec-border, rgba(127, 127, 127, 0.18));
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }
        .rec__card:hover {
          transform: translateY(-3px);
          border-color: var(--rec-accent, rgba(127, 127, 127, 0.5));
          box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.25);
        }
        .rec__card:focus-visible {
          outline: 2px solid var(--rec-accent, currentColor);
          outline-offset: 2px;
        }
        .rec__tag {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.5rem;
          border-radius: 999px;
          background: var(--rec-tag-bg, rgba(127, 127, 127, 0.16));
          opacity: 0.85;
        }
        .rec__cardTitle {
          font-size: clamp(0.95rem, 2.2cqi, 1.05rem);
          font-weight: 600;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rec__excerpt {
          font-size: 0.85rem;
          line-height: 1.45;
          opacity: 0.72;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rec__more {
          margin-top: auto;
          padding-top: 0.2rem;
          font-size: 0.82rem;
          font-weight: 600;
          opacity: 0.9;
        }
        @media (prefers-reduced-motion: reduce) {
          .rec__grid--fade,
          .rec__card,
          .rec__dot {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
