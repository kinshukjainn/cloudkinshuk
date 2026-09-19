import type { BlogPost } from "./engine";

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
    slug: "db-sql",
    route: "/blogs/db-sql",
    title: "Why PostgreSQL Became My Go-To Database",
    topics: ["system-design", "architecture", "scaling", "database"],
    keywords: ["database", "sql", "postgress", "sharding", "caching"],
    excerpt:
      "The article shows that why i choosed postgress SQL database over other dabatbase for my projects i build.",
  },
  {
    slug: "aws-ccp-exam",
    route: "/blogs/aws-ccp-exam",
    title: "Right way to clear AWS Certification exam.",
    topics: ["aws", "aws certification", "exams", "guidance"],
    keywords: [
      "certifcations",
      "exams",
      "aws",
      "guide",
      "clf-02",
      "cloud practioner",
      "cloud developer",
    ],
    excerpt:
      "The article shows that why i choosed postgress SQL database over other dabatbase for my projects i build.",
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
