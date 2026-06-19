import type { BlogPost } from "./engine";

/**
 * The single source of truth for every blog post.
 *
 * 👉 To add a recommendation, just append an object to this array.
 *    The engine indexes whatever is here automatically — no other code
 *    needs to change, no matter how many posts you add.
 *
 * Tips for good recommendations:
 *   - `topics`   carry the most weight, so keep them consistent across
 *                related posts (e.g. always use "aws", not "AWS").
 *   - `route`    should match the real route the post lives on.
 *   - `excerpt`  + `keywords` widen the matching and improve quality.
 *   - `pinned`   forces a post to the top; `boost` nudges it (e.g. 1.5).
 *   - `date`     (ISO, e.g. "2025-09-01") turns on recency ranking. None of
 *                the posts below have a date yet — add real publish dates to
 *                rank newer posts higher. Until then they're ordered
 *                newest-first so that fallback ordering still makes sense.
 */
export const blogs: BlogPost[] = [
  {
    slug: "kosha",
    route: "/blogs/kosha",
    title: "Kosha — Your Personal Cloud Storage",
    topics: ["cloud-storage", "aws", "s3", "system-design", "project"],
    keywords: [
      "dropbox",
      "google drive",
      "presigned urls",
      "architecture",
      "from scratch",
    ],
    excerpt:
      "A real cloud storage platform where your files never touch my server — a from-scratch take on the architecture behind Dropbox and Google Drive.",
  },
  {
    slug: "opaque",
    route: "/blogs/opaque",
    title: "Opaque — Your Personal Password Manager",
    topics: ["security", "encryption", "nextjs", "project"],
    keywords: [
      "zero-knowledge",
      "end-to-end encryption",
      "password manager",
      "clerk",
      "neon",
    ],
    excerpt:
      "A zero-knowledge, end-to-end encrypted password vault built on Next.js, Clerk, and Neon.",
  },
  {
    slug: "kijauktheme",
    route: "/blogs/kijauktheme",
    title: "Kijauk — My Own Terminal Theme",
    topics: ["terminal", "linux", "tooling", "project"],
    keywords: ["oh my posh", "theme", "shell", "prompt", "customization"],
    excerpt:
      "A handcrafted Oh My Posh terminal theme that's both visually appealing and highly functional.",
  },
  {
    slug: "google-drive",
    route: "/blogs/google-drive",
    title: "I Built My Own Google Drive — Here's How It Actually Works",
    topics: ["aws", "s3", "cloud-storage", "system-design"],
    keywords: ["clerk", "neondb", "route 53", "dropbox", "presigned urls"],
    excerpt:
      "The real challenges of building a Drive-style app with S3, Clerk, NeonDB, and Route 53.",
  },
  {
    slug: "how-aws-lambda-scales-seamlessly",
    route: "/blogs/how-aws-lambda-scales-seamlessly",
    title: "How AWS Lambda Scales Seamlessly",
    topics: ["aws", "serverless", "lambda", "scaling", "architecture"],
    keywords: ["auto-scaling", "concurrency", "cold start", "functions"],
    excerpt: "The architecture and mechanisms behind serverless auto-scaling.",
  },
  {
    slug: "the-aws-shared-responsibility-model-explained",
    route: "/blogs/the-aws-shared-responsibility-model-explained",
    title: "The AWS Shared Responsibility Model Explained",
    topics: ["aws", "security", "cloud"],
    keywords: [
      "compliance",
      "infrastructure",
      "data protection",
      "responsibility",
    ],
    excerpt:
      "A clear explanation of how responsibility is split between AWS and you.",
  },
  {
    slug: "how-instagram-is-engineered-under-the-hood",
    route: "/blogs/how-instagram-is-engineered-under-the-hood",
    title: "How Instagram Is Engineered Under the Hood",
    topics: ["system-design", "architecture", "scaling"],
    keywords: ["instagram", "feed", "database", "sharding", "caching"],
    excerpt:
      "Ideas and thoughts on how Instagram is engineered under the hood.",
  },
  {
    slug: "linux-is-go-to-os-for-development",
    route: "/blogs/linux-is-go-to-os-for-development",
    title: "Linux Is the Go-To OS for Development",
    topics: ["linux", "devops", "tooling"],
    keywords: ["development", "production", "workflow", "shell"],
    excerpt:
      "Why Linux makes such a strong operating system for both development and production.",
  },
  {
    slug: "the-power-of-blogging-why-im-committed-to-sharing-knowledge",
    route: "/blogs/the-power-of-blogging-why-im-committed-to-sharing-knowledge",
    title: "The Power of Blogging: Why I'm Committed to Sharing Knowledge",
    topics: ["blogging", "writing", "career"],
    keywords: ["knowledge sharing", "learning", "motivation"],
    excerpt:
      "Why I started blogging and stay committed to sharing what I learn.",
  },
];
