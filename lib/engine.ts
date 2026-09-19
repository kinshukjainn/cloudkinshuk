/**
 * recommendation-engine.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Content-based recommendation engine with a probabilistic core.
 *
 * Signals (each normalized to [0, 1]):
 *   • content      – BM25 (Okapi) term-matching score / max over corpus
 *   • topics       – IDF-weighted cosine over the topic vocabulary
 *   • route        – Jaccard over route segments
 *   • recency      – exponential decay: 0.5^(age / half-life)
 *   • cooccurrence – P(candidate topic | query topic) from the corpus
 *
 * Fusion: weighted sum in log-odds space → softmax over the corpus gives a
 * proper probability distribution over posts.
 *
 * Selection: Maximal Marginal Relevance (Carbonell & Goldstein, 1998) to
 * balance relevance with diversity so results don't cluster on one topic.
 *
 * No dependencies. Pure TypeScript. Server- or client-safe.
 */

/* ─────────────────────────────  Types  ───────────────────────────── */

export interface BlogPost {
  slug: string;
  route: string;
  title: string;
  topics: string[];
  keywords?: string[];
  excerpt?: string;
  date?: string;
  pinned?: boolean;
  boost?: number;
}

export interface ScoringWeights {
  content: number;
  topics: number;
  route: number;
  recency: number;
  cooccurrence: number;
  boost: number;
}

export interface RecommendationReasons {
  content: number;
  topics: number;
  route: number;
  recency: number;
  cooccurrence: number;
  /** Raw weighted sum (log-odds space, before softmax). */
  logOdds: number;
  /** Softmax probability across the corpus. */
  probability: number;
  /** Max similarity to already-selected recommendations (MMR). */
  diversityPenalty: number;
  /** Final MMR value used to rank within the selection. */
  finalScore: number;
  matchedTopics: string[];
  matchedTerms: string[];
}

export interface Recommendation {
  post: BlogPost;
  /** Raw fused score (kept for backward-compat with older callers). */
  score: number;
  /** Softmax probability — use this if you need a real distribution. */
  probability: number;
  reasons: RecommendationReasons;
}

export interface RecommendOptions {
  currentRoute?: string;
  currentTopic?: string | string[];
  exclude?: string[];
  limit?: number;
  weights?: Partial<ScoringWeights>;
  recencyHalfLifeDays?: number;
  /** MMR λ ∈ [0,1]: 1 = pure relevance, 0 = pure diversity. Default 0.7. */
  diversityLambda?: number;
  /** Softmax temperature. Lower = sharper. Default 1.0. */
  temperature?: number;
}

export interface RecommendationIndex {
  posts: BlogPost[];
  recommend(options?: RecommendOptions): Recommendation[];
}

/* ───────────────────────────  Constants  ─────────────────────────── */

const DEFAULT_WEIGHTS: ScoringWeights = {
  content: 1.0,
  topics: 1.8, // explicit shared topics are the strongest signal
  route: 0.7,
  recency: 0.5,
  cooccurrence: 0.9,
  boost: 1.0,
};

const BM25_K1 = 1.5; // term saturation
const BM25_B = 0.75; // length normalization
const PINNED_LOG_ODDS = 5; // effectively forces pinned posts to the top

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
  "blogs",
  "post",
  "posts",
  "guide",
  "guides",
  "intro",
  "introduction",
  "page",
  "pages",
]);

/* ──────────────────────────  Math helpers  ────────────────────────── */

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

function cosineSparse(a: Map<string, number>, b: Map<string, number>): number {
  if (a.size === 0 || b.size === 0) return 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  let dot = 0;
  for (const [k, v] of small) {
    const bv = big.get(k);
    if (bv) dot += v * bv;
  }
  return dot;
}

function l2Normalize(vec: Map<string, number>): Map<string, number> {
  let norm = 0;
  for (const v of vec.values()) norm += v * v;
  norm = Math.sqrt(norm) || 1;
  const out = new Map<string, number>();
  for (const [k, v] of vec) out.set(k, v / norm);
  return out;
}

/* ─────────────────────────  Tokenization  ───────────────────────── */

export function tokenize(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase → "camel Case"
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function segments(route: string): Set<string> {
  return new Set(route.split("/").filter(Boolean).flatMap(tokenize));
}

function repeat<T>(arr: T[], n: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(...arr);
  return out;
}

/** Field-weighted token list — title & topics carry more weight than body. */
function docTokenList(post: BlogPost): string[] {
  return [
    ...repeat(tokenize(post.title), 3),
    ...repeat(post.topics.flatMap(tokenize), 2),
    ...repeat((post.keywords ?? []).flatMap(tokenize), 2),
    ...tokenize(post.excerpt ?? ""),
    ...tokenize(post.route),
  ];
}

/* ──────────────────────────  Index builder  ────────────────────────── */

interface ScoredCandidate {
  idx: number;
  post: BlogPost;
  content: number;
  topics: number;
  route: number;
  recency: number;
  cooccurrence: number;
  rawScore: number;
  probability: number;
  matchedTopics: string[];
  matchedTerms: string[];
  diversityPenalty: number;
  finalScore: number;
}

export function buildIndex(posts: BlogPost[]): RecommendationIndex {
  const N = posts.length;
  if (N === 0) return { posts, recommend: () => [] };

  /* ---- Tokenization + BM25 stats ---- */
  const docLengths: number[] = [];
  const termFreqs: Map<string, number>[] = posts.map((p) => {
    const tokens = docTokenList(p);
    docLengths.push(tokens.length);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return tf;
  });
  const avgdl = docLengths.reduce((a, b) => a + b, 0) / N || 1;

  const df = new Map<string, number>();
  for (const tf of termFreqs) {
    for (const term of tf.keys()) df.set(term, (df.get(term) ?? 0) + 1);
  }

  /* ---- Topic vocabulary + IDF ---- */
  const topicDocCount = new Map<string, number>();
  for (const p of posts) {
    for (const t of new Set(p.topics)) {
      topicDocCount.set(t, (topicDocCount.get(t) ?? 0) + 1);
    }
  }
  const topicIDF = new Map<string, number>();
  for (const [t, c] of topicDocCount) {
    // Smoothed IDF, always positive.
    topicIDF.set(t, Math.log((N + 1) / (c + 1)) + 1);
  }

  const docTopicVecs = posts.map((p) => {
    const vec = new Map<string, number>();
    for (const t of new Set(p.topics)) vec.set(t, topicIDF.get(t) ?? 1);
    return l2Normalize(vec);
  });
  const postTopicSet = posts.map((p) => new Set(p.topics));

  /* ---- Route segments ---- */
  const docSegments = posts.map((p) => segments(p.route));

  /* ---- Topic co-occurrence: P(b | a) ---- */
  const cooc = new Map<string, Map<string, number>>();
  for (const p of posts) {
    for (const a of p.topics) {
      let row = cooc.get(a);
      if (!row) {
        row = new Map();
        cooc.set(a, row);
      }
      for (const b of p.topics) {
        if (a === b) continue;
        row.set(b, (row.get(b) ?? 0) + 1);
      }
    }
  }

  /* ---- BM25 ---- */
  const bm25 = (
    queryTerms: string[],
    docIdx: number,
  ): { score: number; matched: string[] } => {
    const tf = termFreqs[docIdx];
    const dl = docLengths[docIdx];
    const matched: string[] = [];
    const seen = new Set<string>();
    let score = 0;

    for (const q of queryTerms) {
      if (seen.has(q)) continue;
      seen.add(q);
      const f = tf.get(q) ?? 0;
      if (f === 0) continue;

      const nq = df.get(q) ?? 0;
      // BM25 IDF — with +1 smoothing it is guaranteed non-negative.
      const idf = Math.log((N - nq + 0.5) / (nq + 0.5) + 1);
      const denom = f + BM25_K1 * (1 - BM25_B + BM25_B * (dl / avgdl));
      score += idf * ((f * (BM25_K1 + 1)) / denom);
      matched.push(q);
    }
    return { score, matched };
  };

  /* ---- Pairwise similarity (for MMR diversity) ---- */
  const pairwiseSim = (i: number, j: number): number => {
    const jt = jaccard(postTopicSet[i], postTopicSet[j]);
    const cs = cosineSparse(docTopicVecs[i], docTopicVecs[j]);
    return 0.6 * jt + 0.4 * cs;
  };

  /* ---- recommend ---- */
  const recommend = (options: RecommendOptions = {}): Recommendation[] => {
    const {
      currentRoute = "",
      currentTopic,
      exclude = [],
      limit = 5,
      weights: weightOverrides,
      recencyHalfLifeDays = 120,
      diversityLambda = 0.7,
      temperature = 1.0,
    } = options;

    const weights = { ...DEFAULT_WEIGHTS, ...weightOverrides };
    const excludeSet = new Set(exclude);
    const lambda = Math.max(0, Math.min(1, diversityLambda));
    const T = Math.max(temperature, 1e-3);

    /* -- Query construction -- */
    const rawQueryTopics = Array.isArray(currentTopic)
      ? currentTopic
      : currentTopic
        ? [currentTopic]
        : [];
    const queryTopics = rawQueryTopics
      .map((t) => t.toLowerCase().trim())
      .filter(Boolean);

    const routeSegs = segments(currentRoute);

    // Route segments only contribute as topics when they actually appear
    // somewhere in the corpus's topic vocabulary — otherwise we'd be scoring
    // against terms with max IDF that never match.
    const queryTopicSet = new Set(queryTopics);
    for (const s of routeSegs) {
      if (topicDocCount.has(s)) queryTopicSet.add(s);
    }

    const queryTopicVec = l2Normalize(
      new Map([...queryTopicSet].map((t) => [t, topicIDF.get(t) ?? 1])),
    );

    const queryTerms = [
      ...tokenize(currentRoute),
      ...queryTopics.flatMap(tokenize),
    ];

    /* -- BM25 pre-pass to normalize content signal to [0, 1] -- */
    const bm25Results = posts.map((_, i) => bm25(queryTerms, i));
    const maxBM25 = bm25Results.reduce((m, r) => Math.max(m, r.score), 0) || 1;

    const now = Date.now();
    const halfLifeMs = recencyHalfLifeDays * 86_400_000;

    /* -- Score every candidate -- */
    const candidates: ScoredCandidate[] = [];

    for (let i = 0; i < N; i++) {
      const post = posts[i];
      if (excludeSet.has(post.slug) || excludeSet.has(post.route)) continue;

      // 1) Content — normalized BM25
      const bm = bm25Results[i];
      const content = bm.score / maxBM25;

      // 2) Topics — IDF-weighted cosine
      const topics = cosineSparse(queryTopicVec, docTopicVecs[i]);

      // 3) Route — Jaccard over URL segments
      const route = jaccard(routeSegs, docSegments[i]);

      // 4) Recency — exponential decay. Neutral 0.5 when no date.
      let recency = 0.5;
      if (post.date) {
        const t = new Date(post.date).getTime();
        if (!Number.isNaN(t)) {
          recency = Math.pow(0.5, Math.max(0, now - t) / halfLifeMs);
        }
      }

      // 5) Co-occurrence — average P(candidate topic | query topic)
      let cooccurrence = 0;
      if (queryTopicSet.size > 0 && post.topics.length > 0) {
        let total = 0;
        for (const q of queryTopicSet) {
          const row = cooc.get(q);
          if (!row) continue;
          const qCount = topicDocCount.get(q) ?? 1;
          for (const c of post.topics) {
            const cnt = row.get(c);
            if (cnt) total += cnt / qCount;
          }
        }
        cooccurrence = Math.min(1, total / queryTopicSet.size);
      }

      // Explicit overrides mapped into log-odds space.
      const priorBoost =
        (post.pinned ? PINNED_LOG_ODDS : 0) +
        (post.boost ? Math.log(Math.max(post.boost, 1e-3)) : 0);

      const rawScore =
        weights.content * content +
        weights.topics * topics +
        weights.route * route +
        weights.recency * recency +
        weights.cooccurrence * cooccurrence +
        weights.boost * priorBoost;

      // Explainability — rarest (most informative) items first.
      const matchedTopics = post.topics
        .filter((t) => queryTopicSet.has(t))
        .sort(
          (a, b) => (topicDocCount.get(a) ?? 0) - (topicDocCount.get(b) ?? 0),
        );

      const matchedTerms = bm.matched
        .slice()
        .sort((a, b) => (df.get(a) ?? 0) - (df.get(b) ?? 0))
        .slice(0, 8);

      candidates.push({
        idx: i,
        post,
        content,
        topics,
        route,
        recency,
        cooccurrence,
        rawScore,
        probability: 0,
        matchedTopics,
        matchedTerms,
        diversityPenalty: 0,
        finalScore: rawScore,
      });
    }

    if (candidates.length === 0) return [];

    /* -- Softmax → probability distribution over the corpus -- */
    const maxRaw = candidates.reduce(
      (m, c) => Math.max(m, c.rawScore),
      -Infinity,
    );
    const expScores = candidates.map((c) =>
      Math.exp((c.rawScore - maxRaw) / T),
    );
    const sumExp = expScores.reduce((a, b) => a + b, 0) || 1;
    for (let i = 0; i < candidates.length; i++) {
      candidates[i].probability = expScores[i] / sumExp;
    }

    /* -- MMR selection -- */
    const selected: ScoredCandidate[] = [];
    const pool = candidates.slice();

    while (selected.length < limit && pool.length > 0) {
      let bestIdx = 0;
      let bestVal = -Infinity;
      let bestSim = 0;

      for (let i = 0; i < pool.length; i++) {
        const cand = pool[i];

        let maxSim = 0;
        for (const s of selected) {
          const sim = pairwiseSim(cand.idx, s.idx);
          if (sim > maxSim) maxSim = sim;
        }

        const mmrVal = lambda * cand.probability - (1 - lambda) * maxSim;
        if (mmrVal > bestVal) {
          bestVal = mmrVal;
          bestIdx = i;
          bestSim = maxSim;
        }
      }

      const chosen = pool[bestIdx];
      chosen.diversityPenalty = bestSim;
      chosen.finalScore = bestVal;
      selected.push(chosen);
      pool.splice(bestIdx, 1);
    }

    /* -- Emit results -- */
    return selected.map((c) => ({
      post: c.post,
      score: c.rawScore,
      probability: c.probability,
      reasons: {
        content: c.content,
        topics: c.topics,
        route: c.route,
        recency: c.recency,
        cooccurrence: c.cooccurrence,
        logOdds: c.rawScore,
        probability: c.probability,
        diversityPenalty: c.diversityPenalty,
        finalScore: c.finalScore,
        matchedTopics: c.matchedTopics,
        matchedTerms: c.matchedTerms,
      },
    }));
  };

  return { posts, recommend };
}

/* ────────────────────────  Convenience API  ──────────────────────── */

export function recommend(
  posts: BlogPost[],
  options?: RecommendOptions,
): Recommendation[] {
  return buildIndex(posts).recommend(options);
}
