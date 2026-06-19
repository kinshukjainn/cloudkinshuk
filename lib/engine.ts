/**
 * recommendation-engine.ts
 * --------------------------------------------------------------------------
 * A dependency-free, content-based recommendation engine.
 *
 * It ranks blog posts for a given context (the current route + optional
 * topic) by blending four signals:
 *
 *   1. content  – TF-IDF cosine similarity between the query text and each
 *                 post's text (title + topics + keywords + excerpt + route).
 *   2. topics   – overlap of topic tags (Jaccard).
 *   3. route    – overlap of route segments (Jaccard).
 *   4. recency  – exponential decay based on the post's date.
 *
 * Every signal is weighted and tunable, plus per-post `boost` and `pinned`
 * overrides. Each result includes a `reasons` breakdown so you can see *why*
 * something was recommended (great for debugging / tuning the weights).
 *
 * Works on the server or the client — it's pure TypeScript, no React.
 */

export interface BlogPost {
  /** Unique identifier (used to dedupe / exclude the current post). */
  slug: string;
  /** The route this post is served on, e.g. "/blog/app-router-deep-dive". */
  route: string;
  /** Human-readable title. */
  title: string;
  /** Topic tags / categories — the strongest relevance signal. */
  topics: string[];
  /** Optional extra keywords to widen matching. */
  keywords?: string[];
  /** Short summary; improves content similarity. */
  excerpt?: string;
  /** ISO date string ("2025-09-12"); enables the recency boost. */
  date?: string;
  /** Force this post to always rank near the top. */
  pinned?: boolean;
  /** Manual score multiplier (default 1). */
  boost?: number;
}

export interface ScoringWeights {
  content: number;
  topics: number;
  route: number;
  recency: number;
}

export interface Recommendation {
  post: BlogPost;
  score: number;
  /** Per-signal breakdown (each 0..1 before weighting). */
  reasons: ScoringWeights;
}

export interface RecommendOptions {
  /** Current route / pathname. Drives route + content matching. */
  currentRoute?: string;
  /** Current topic(s) to bias toward. */
  currentTopic?: string | string[];
  /** Slugs or routes to exclude (e.g. the post being viewed). */
  exclude?: string[];
  /** Max number of recommendations to return. Default 5. */
  limit?: number;
  /** Override any of the default weights. */
  weights?: Partial<ScoringWeights>;
  /** Half-life in days for the recency decay. Default 120. */
  recencyHalfLifeDays?: number;
}

export interface RecommendationIndex {
  posts: BlogPost[];
  recommend(options?: RecommendOptions): Recommendation[];
}

const DEFAULT_WEIGHTS: ScoringWeights = {
  content: 1.0,
  topics: 1.6, // a shared topic is the clearest signal of relevance
  route: 0.9,
  recency: 0.4,
};

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "up",
  "about",
  "into",
  "over",
  "after",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "as",
  "how",
  "what",
  "why",
  "when",
  "your",
  "you",
  "we",
  "our",
  "blog",
  "post",
  "guide",
  "intro",
  "introduction",
  "page",
]);

/** Split text / routes / camelCase into clean, lowercase tokens. */
export function tokenize(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase -> "camel Case"
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

function segments(route: string): Set<string> {
  return new Set(route.split("/").filter(Boolean).flatMap(tokenize));
}

function docTokens(post: BlogPost): string[] {
  return [
    ...tokenize(post.title),
    ...post.topics.flatMap(tokenize),
    ...(post.keywords ?? []).flatMap(tokenize),
    ...tokenize(post.excerpt ?? ""),
    ...tokenize(post.route),
  ];
}

/**
 * Build a reusable index. IDF is computed once over the whole corpus, so
 * repeated `recommend()` calls are cheap. Call this once and reuse it.
 */
export function buildIndex(posts: BlogPost[]): RecommendationIndex {
  const N = posts.length;

  // Document frequency, for IDF.
  const df = new Map<string, number>();
  const docTokenLists: string[][] = [];

  for (const post of posts) {
    const tokens = docTokens(post);
    docTokenLists.push(tokens);
    for (const term of new Set(tokens)) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }

  // Smoothed IDF — always positive, never divides by zero.
  const idf = (term: string) =>
    Math.log((N + 1) / ((df.get(term) ?? 0) + 1)) + 1;

  // Build an L2-normalized TF-IDF vector for a token list.
  const buildVector = (tokens: string[]): Map<string, number> => {
    const vec = new Map<string, number>();
    if (tokens.length === 0) return vec;

    const counts = new Map<string, number>();
    for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);

    let norm = 0;
    for (const [term, count] of counts) {
      const w = (count / tokens.length) * idf(term);
      vec.set(term, w);
      norm += w * w;
    }
    norm = Math.sqrt(norm) || 1;
    for (const [term, w] of vec) vec.set(term, w / norm);
    return vec;
  };

  const docVectors = docTokenLists.map(buildVector);

  // Both vectors are L2-normalized, so the dot product *is* the cosine.
  const cosine = (a: Map<string, number>, b: Map<string, number>): number => {
    const [small, big] = a.size < b.size ? [a, b] : [b, a];
    let dot = 0;
    for (const [term, w] of small) {
      const bw = big.get(term);
      if (bw) dot += w * bw;
    }
    return dot;
  };

  // Precompute per-post topic token sets and route segments.
  const postTopicTokens = posts.map((p) => new Set(p.topics.flatMap(tokenize)));
  const postSegments = posts.map((p) => segments(p.route));

  const recommend = (options: RecommendOptions = {}): Recommendation[] => {
    const {
      currentRoute = "",
      currentTopic,
      exclude = [],
      limit = 5,
      weights: weightOverrides,
      recencyHalfLifeDays = 120,
    } = options;

    const weights = { ...DEFAULT_WEIGHTS, ...weightOverrides };
    const excludeSet = new Set(exclude);

    const topicList = Array.isArray(currentTopic)
      ? currentTopic
      : currentTopic
        ? [currentTopic]
        : [];

    const queryVec = buildVector([
      ...tokenize(currentRoute),
      ...topicList.flatMap(tokenize),
    ]);
    const queryTopicTokens = new Set(topicList.flatMap(tokenize));
    const querySegments = segments(currentRoute);
    const now = Date.now();

    const scored: Recommendation[] = posts.map((post, i) => {
      const content = cosine(queryVec, docVectors[i]);
      const topics = jaccard(queryTopicTokens, postTopicTokens[i]);
      const route = jaccard(querySegments, postSegments[i]);

      let recency = 0;
      if (post.date) {
        const ageDays = (now - new Date(post.date).getTime()) / 86_400_000;
        recency = Math.pow(0.5, Math.max(0, ageDays) / recencyHalfLifeDays);
      }

      let score =
        content * weights.content +
        topics * weights.topics +
        route * weights.route +
        recency * weights.recency;

      score *= post.boost ?? 1;
      if (post.pinned) score += 1000; // floats pinned posts to the top

      return { post, score, reasons: { content, topics, route, recency } };
    });

    return scored
      .filter(
        (r) => !excludeSet.has(r.post.slug) && !excludeSet.has(r.post.route),
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  return { posts, recommend };
}

/** One-shot convenience: build an index and query it in a single call. */
export function recommend(
  posts: BlogPost[],
  options?: RecommendOptions,
): Recommendation[] {
  return buildIndex(posts).recommend(options);
}
