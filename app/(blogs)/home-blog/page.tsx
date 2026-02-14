"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  X,
  ChevronDown,
  RotateCcw,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  readTimeInMinutes?: number;
  views?: number;
  reactionCount?: number;
  coverImage?: {
    url: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    name: string;
    profilePicture?: string;
  };
  url?: string;
}

interface Filters {
  tags: string[];
}

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blogA",
    title: "How Instagram Is Engineered Under The Hood",
    brief: "Explore how Instagram is designed under the hood.",
    slug: "instagram-engineering",
    publishedAt: "2025-06-19T10:00:00Z",
    updatedAt: "2025-06-19T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "Instagram", slug: "instagram" },
      { id: "2", name: "scalablity", slug: "scalablity" },
      { id: "3", name: "HLD", slug: "HLD" },
      { id: "4", name: "cloud", slug: "cloud" },
      { id: "5", name: "System Architecture", slug: "system-architecture" },
    ],
    author: { name: "Kinshuk Jain" },
  },
  {
    id: "blogB",
    title: "Linux is go to `os` for development",
    brief:
      "As a student navigating the world of software development, my comfort zone has always been Windows. It's the OS I grew up with. For years, it has served me well as I've dived into technologies like React, TypeScript, and TailwindCSS. ",
    slug: "linux-for-development",
    publishedAt: "2025-11-19T10:00:00Z",
    updatedAt: "2025-11-19T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "Linux", slug: "linux" },
      { id: "2", name: "Operating System", slug: "operating-system" },
      { id: "3", name: "Development", slug: "development" },
      { id: "4", name: "Windows", slug: "windows" },
      { id: "5", name: "System Architecture", slug: "system-architecture" },
    ],
    author: { name: "Kinshuk Jain" },
  },
  {
    id: "blogC",
    title: "How AWS Lambda Scales Seamlessly",
    brief:
      "AWS Lambda is a serverless compute service that automatically scales your applications in response to incoming traffic. This article explores the architecture and mechanisms behind Lambda's seamless scaling capabilities.",
    slug: "aws-lambda-scaling",
    publishedAt: "2025-12-25T10:00:00Z",
    updatedAt: "2025-12-25T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "AWS", slug: "aws" },
      { id: "2", name: "Serverless", slug: "serverless" },
      { id: "3", name: "Scalability", slug: "scalability" },
      { id: "4", name: "Lambda", slug: "lambda" },
      { id: "5", name: "Cloud Computing", slug: "cloud-computing" },
    ],
    author: { name: "Kinshuk Jain" },
  },
  {
    id: "blogD",
    title: "Lets Understand AWS Shared Responsibility Model",
    brief:
      "The AWS Shared Responsibility Model defines the division of security responsibilities between AWS and the customer. This article explains how AWS handles infrastructure security while customers are responsible for securing their data, applications, and configurations.",
    slug: "aws-shared-responsibility-model",
    publishedAt: "2026-01-29T10:00:00Z",
    updatedAt: "2026-01-31T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "AWS", slug: "aws" },
      {
        id: "2",
        name: "Shared Responsibility Model",
        slug: "shared-responsibility-model",
      },
      { id: "3", name: "Scalability", slug: "scalability" },
      { id: "4", name: "Lambda", slug: "lambda" },
      { id: "5", name: "Cloud Computing", slug: "cloud-computing" },
      { id: "6", name: "amazon", slug: "amazon" },
      { id: "7", name: "cloud", slug: "cloud" },
      { id: "8", name: "Serverless", slug: "Serverless" },
    ],
    author: { name: "Kinshuk Jain" },
  },
  {
    id: "blogE",
    title: "My Experience with UPPTCL Internship Program",
    brief:
      "I had the opportunity to intern at UPPTCL (Uttar Pradesh Power Transmission Corporation Limited) during my final year of engineering. This experience provided me with valuable insights into the power transmission sector.",
    slug: "upptcl-internship-experience",
    publishedAt: "2026-02-02T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "Internship", slug: "internship" },
      {
        id: "2",
        name: "UPPTCL",
        slug: "upptcl",
      },
      { id: "3", name: "Experience", slug: "experience" },
      {
        id: "4",
        name: "Electrical Engineering",
        slug: "electrical-engineering",
      },
      { id: "5", name: "Power Systems", slug: "power-systems" },
      {
        id: "6",
        name: "Transformers in electrical",
        slug: "transformers-in-electrical",
      },
      {
        id: "7",
        name: "Power Transmission",
        slug: "power-transmission",
      },
    ],
    author: { name: "Kinshuk Jain" },
  },
  {
    id: "blogF",
    title: "Why did i start blogging ?",
    brief:
      "In a world overflowing with information, quality blogging stands as a beacon of authentic learning and meaningful communication. I believe in the transformative power of blogging – not just as a platform, but as a commitment to clarity, growth, and community. This is why I'm dedicating myself to blogging in the most intentional and impactful way possible.",
    slug: "why-did-i-start-blogging",
    publishedAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
    readTimeInMinutes: 5,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "blogs", slug: "blogs" },
      { id: "2", name: "devlopers", slug: "devlopers" },
      { id: "3", name: "devlopers blogs", slug: "devlopers-blogs" },
      { id: "4", name: "student", slug: "student" },
      { id: "5", name: "reasoning", slug: "reasoning" },
      { id: "6", name: "community", slug: "community" },
    ],
    author: { name: "Kinshuk Jain" },
  },
];

class SimpleSearchEngine {
  private posts: BlogPost[] = [];

  constructor(posts: BlogPost[]) {
    this.posts = posts;
  }

  search(query: string): BlogPost[] {
    if (!query.trim()) return this.posts;

    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 0);

    return this.posts
      .map((post) => {
        let score = 0;
        const titleLower = post.title.toLowerCase();
        const briefLower = post.brief.toLowerCase();
        const authorLower = post.author.name.toLowerCase();
        const tagsLower = post.tags.map((t) => t.name.toLowerCase()).join(" ");

        if (titleLower.includes(queryLower)) score += 100;
        if (briefLower.includes(queryLower)) score += 50;
        if (authorLower.includes(queryLower)) score += 30;
        if (tagsLower.includes(queryLower)) score += 20;

        queryWords.forEach((word) => {
          if (titleLower.includes(word)) score += 10;
          if (briefLower.includes(word)) score += 5;
          if (authorLower.includes(word)) score += 3;
          if (tagsLower.includes(word)) score += 2;
        });

        return { post, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ post }) => post);
  }
}

interface BlogItemProps {
  post: BlogPost;
  searchQuery?: string;
}

const BlogItem: React.FC<BlogItemProps> = React.memo(
  ({ post, searchQuery }) => {
    const highlightText = useCallback((text: string, query?: string) => {
      if (!query || !query.trim()) return text;
      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      );
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-black px-0.5">
            {part}
          </mark>
        ) : (
          part
        ),
      );
    }, []);

    return (
      <div className="py-6 border-b border-gray-500 last:border-b-0">
        <Link href={`/home-blog/${post.id}`} className="group block">
          <h3 className="text-xl text-white mb-3 font-bold hover:underline">
            {highlightText(post.title, searchQuery)}
          </h3>
          <p className="text-white/70 mb-3 leading-relaxed">{post.brief}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag.id} className="text-sm text-yellow-200">
                {tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-sm text-white">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </Link>
      </div>
    );
  },
);

BlogItem.displayName = "BlogItem";

interface FilterPanelProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  availableTags: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  availableTags,
  isOpen,
  setIsOpen,
}) => {
  const toggleTag = (tag: string) => {
    setFilters({
      tags: filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag],
    });
  };

  const resetFilters = () => {
    setFilters({
      tags: [],
    });
  };

  const activeFiltersCount = filters.tags.length;

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full px-4 py-3 bg-[#141414] border border-[#444444] rounded-4xl transition-colors duration-200 mb-4"
      >
        <span className="text-sm font-medium text-white">
          Filter by tags {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </span>
        <div className="p-1 bg-blue-800 rounded-full cursor-pointer">
          <ChevronDown
            size={20}
            className={`text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-96 md:max-h-none opacity-100"
            : "max-h-0 md:max-h-none opacity-0 md:opacity-100"
        } md:opacity-100 md:max-h-none`}
      >
        <div className="border border-gray-500 bg-[#141414] rounded-3xl p-6">
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              TAGS {filters.tags.length > 0 && `(${filters.tags.length})`}
            </label>
            <div className="max-h-48 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-xs transition-all duration-200 ${
                      filters.tags.includes(tag)
                        ? "bg-blue-400 text-black font-semibold rounded-full"
                        : "bg-black text-white rounded-lg cursor-pointer hover:rounded-full hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="mt-4 flex items-center justify-center cursor-pointer gap-2 px-2 py-2 w-max bg-blue-800 text-white text-sm font-medium rounded-full transition-colors duration-200"
            >
              <RotateCcw size={16} />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  resultsCount: number;
  totalCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  resultsCount,
  totalCount,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

    // Trigger typing animation
    setIsTyping(true);

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to stop typing animation
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 150);

    setTypingTimeout(timeout);
  };

  return (
    <div className="mb-8 w-full">
      {/* Animated wrapper */}
      <motion.div
        initial={false}
        whileHover="hover"
        animate={isTyping ? "typing" : searchInput ? "focus" : "rest"}
        variants={{
          rest: {
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            borderColor: "rgba(255,255,255,0.15)",
            scale: 1,
            y: 0,
          },
          hover: {
            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
            borderColor: "rgba(255,255,255,0.25)",
            scale: 1,
            y: 0,
          },
          focus: {
            boxShadow: "0 10px 40px rgba(59,130,246,0.35)",
            borderColor: "rgba(255,255,255,0.4)",
            scale: 1,
            y: 0,
          },
          typing: {
            boxShadow: [
              "0 10px 40px rgba(59,130,246,0.35)",
              "0 12px 50px rgba(139,92,246,0.45)",
              "0 10px 40px rgba(59,130,246,0.35)",
            ],
            borderColor: [
              "rgba(255,255,255,0.4)",
              "rgba(168,85,247,0.6)",
              "rgba(255,255,255,0.4)",
            ],
            scale: [1, 1.008, 1],
            y: [0, -1, 0],
          },
        }}
        transition={{
          duration: isTyping ? 0.3 : 0.22,
          ease: isTyping ? [0.34, 1.56, 0.64, 1] : [0.25, 0.8, 0.25, 1],
          times: isTyping ? [0, 0.5, 1] : undefined,
        }}
        className="relative rounded-full border bg-[#141414]"
      >
        {/* Glow effect on typing */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isTyping ? "typing" : "idle"}
          variants={{
            idle: {
              opacity: 0,
            },
            typing: {
              opacity: [0, 0.15, 0],
              scale: [0.98, 1.02, 0.98],
            },
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(139,92,246,0.3), transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Search Icon with typing animation */}
        <motion.div
          animate={isTyping ? "typing" : "idle"}
          variants={{
            idle: { scale: 1, rotate: 0 },
            typing: { scale: [1, 1.1, 1], rotate: [0, -5, 0] },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <Search size={20} className="text-white/60" />
        </motion.div>

        {/* Input */}
        <input
          type="text"
          placeholder="Articles, blogs, developers, students, reasoning, community"
          value={searchInput}
          onChange={handleInputChange}
          className="w-full pl-12 pr-12 py-3 rounded-full bg-transparent text-white placeholder:text-white/40 focus:outline-none text-base relative z-10"
        />

        {/* Clear Button with subtle animation */}
        {searchInput && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchInput("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </motion.button>
        )}
      </motion.div>

      {/* Result Count */}
      {searchInput && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 text-sm text-white/60"
        >
          Found {resultsCount} of {totalCount} articles
        </motion.div>
      )}
    </div>
  );
};

export default function BlogsPage() {
  const [searchInput, setSearchInput] = useState("");
  const posts = MOCK_BLOG_POSTS;
  const searchEngine = useMemo(() => new SimpleSearchEngine(posts), [posts]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    tags: [],
  });

  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag.name));
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = searchInput.trim() ? searchEngine.search(searchInput) : posts;

    if (filters.tags.length > 0) {
      result = result.filter((post) =>
        post.tags.some((tag) => filters.tags.includes(tag.name)),
      );
    }

    // Sort by newest first (default)
    result = [...result].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return result;
  }, [posts, searchInput, searchEngine, filters]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-black/10 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-7xl font-bold text-white mb-6">Dev. Blogs</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
            Hi <span className="font-semibold text-blue-500">@everyone</span>,
            here I&apos;m sharing my learning journey in cloud computing,
            DevOps, security, and infrastructure engineering. I write about AWS
            services, serverless and container-based systems, CI/CD basics,
            Terraform, and AI-powered projects, focusing on understanding
            concepts through hands-on practice, experiments, and real academic
            projects.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-[#141414] rounded-3xl p-6 border border-[#444444] transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-white">
                  Share Your Feedback
                </h3>
              </div>

              <p className="text-white/70 text-sm">
                Help me improve! Your thoughts and suggestions are invaluable
                for creating better content.
              </p>
            </div>

            <a
              href="https://feedbacks.cloudkinshuk.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-3xl transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg shadow-blue-500/25"
            >
              Feedback
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          resultsCount={filteredPosts.length}
          totalCount={posts.length}
        />

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          availableTags={availableTags}
          isOpen={filterOpen}
          setIsOpen={setFilterOpen}
        />

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white mb-2">
              No articles found
            </h3>
            <p className="text-white/70 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setFilters({
                  tags: [],
                });
                setFilterOpen(false);
              }}
              className="px-6 py-2 bg-black hover:bg-black/80 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="border border-black/10 rounded-lg p-6">
            {filteredPosts.map((post) => (
              <BlogItem key={post.id} post={post} searchQuery={searchInput} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
