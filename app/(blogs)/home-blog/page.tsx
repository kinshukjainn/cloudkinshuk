"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search,
  X,
  ChevronDown,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  Clock,
  Calendar,
  User,
  Mail,
  Github,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { getFeedbacksAction } from "../../db-api-call/blogs-feedback";
import { LuMessageSquareQuote } from "react-icons/lu";
import { FaBookReader } from "react-icons/fa";

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

// Updated interface to match DB Schema
interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  github_id: string | null;
  category: "Blogs" | "Projects" | "Portfolio Website";
  feedback: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  reviewed_at: string | null;
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
  {
    id: "blogG",
    title: " I Built My Own Google Drive. Here&apos;s How It Actually Works.",
    brief: "There were many challanges which i faced while building .....",
    slug: "i-built-my-own-google-drive-here-s-how-it actually-works",
    publishedAt: "2026-04-11T10:00:00Z",
    updatedAt: "2026-04-11T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "blogs", slug: "blogs" },
      { id: "2", name: "devlopers", slug: "devlopers" },
      { id: "3", name: "Amazon S3", slug: "amazon-s3" },
      { id: "4", name: "Clerk", slug: "clerk" },
      { id: "5", name: "aws cloud", slug: "aws-cloud" },
      { id: "6", name: "Amazon Route 53", slug: "amazon-api-route-53" },
      { id: "7", name: "NeonDB", slug: "neondb" },
      { id: "8", name: "Database", slug: "database" },
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

// ─── Blog Item ───

interface BlogItemProps {
  post: BlogPost;
  searchQuery?: string;
}

const BlogItem = React.memo(function BlogItem({
  post,
  searchQuery,
}: BlogItemProps) {
  const highlightText = useCallback((text: string, query?: string) => {
    if (!query || !query.trim()) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-green-900/60 text-green-400 px-0.5 rounded-sm bg-transparent"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="mb-4 p-5 rounded-sm hover:border-[#666666] transition-colors">
      <Link href={`/home-blog/${post.id}`} className="group block">
        <h3 className="text-lg text-[#e0e0e0] mb-2 font-bold leading-tight group-hover:text-green-500 transition-colors">
          {highlightText(post.title, searchQuery)}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-xs text-[#888888]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          {post.readTimeInMinutes && (
            <div className="flex items-center gap-1.5 border-l border-[#555555] pl-4">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTimeInMinutes}m read</span>
            </div>
          )}
        </div>

        <p className="text-[#b0b0b0] text-sm mb-5 leading-relaxed">
          {post.brief}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 5).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center justify-center px-1  text-sm text-green-500"
            >
              {tag.name}
            </span>
          ))}
          {post.tags.length > 5 && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 border rounded-sm font-bold  border-green-500 bg-[#222222] text-xs text-green-500">
              +{post.tags.length - 5}
            </span>
          )}
          <div className="ml-auto text-green-500 text-md font-bold  transition-opacity flex items-center gap-1">
            <FaBookReader className="w-4 h-4" /> Read
          </div>
        </div>
      </Link>
    </div>
  );
});

// ─── Feedback Card ───

interface FeedbackCardProps {
  feedback: FeedbackItem;
  index: number;
}

const FeedbackCard = React.memo(function FeedbackCard({
  feedback,
  index,
}: FeedbackCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4 sm:p-5 border border-[#444444] bg-[#2b2b2b] rounded-sm hover:border-[#666666] transition-colors">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-xs font-medium">
            #{index + 1}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#555555] hidden sm:block" />
          <span className="text-xs text-[#888888]">
            {formatDate(feedback.created_at)}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#555555] hidden sm:block" />
          <span className="text-xs text-[#888888] hidden sm:inline">
            {formatTime(feedback.created_at)}
          </span>
        </div>

        {/* Category & Status Badges */}
        <div className="flex items-center gap-2">
          {feedback.status === "approved" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-green-900/40 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-wider w-fit">
              <CheckCircle2 size={10} /> {feedback.status}
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-green-700/20 text-green-400 text-xs w-fit">
            {feedback.category}
          </span>
        </div>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <User className="w-3.5 h-3.5 text-[#666666] shrink-0" />
          <span className="text-[#888888] shrink-0">Name</span>
          <span className="text-[#e0e0e0] truncate">{feedback.name}</span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <Mail className="w-3.5 h-3.5 text-[#666666] shrink-0" />
          <span className="text-[#888888] shrink-0">Email</span>
          <span className="text-[#e0e0e0] truncate">{feedback.email}</span>
        </div>
        {feedback.github_id && (
          <div className="flex items-center gap-2 min-w-0 sm:col-span-2">
            <Github className="w-3.5 h-3.5 text-[#666666] shrink-0" />
            <span className="text-[#888888] shrink-0">GitHub</span>
            <a
              href={`https://github.com/${feedback.github_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 truncate transition-colors"
            >
              {feedback.github_id}
            </a>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#444444] my-3" />

      {/* Feedback content */}
      <div
        className="text-[#b0b0b0] text-sm leading-relaxed prose-invert max-w-none break-words [&_a]:text-green-500 [&_a:hover]:text-green-400 [&_strong]:text-[#e0e0e0] [&_em]:text-[#cccccc] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: feedback.feedback }}
      />
    </div>
  );
});

// ─── Filter Panel ───

interface FilterPanelProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  availableTags: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function FilterPanel({
  filters,
  setFilters,
  availableTags,
  isOpen,
  setIsOpen,
}: FilterPanelProps) {
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
    <div className="mb-8 border border-[#444444] rounded-2xl bg-[#2b2b2b]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full rounded-2xl px-4 py-3 cursor-pointer bg-[#222222] border-b border-[#444444] text-white"
      >
        <span className="text-md font-semibold">
          Filter Tags {activeFiltersCount > 0 && `[${activeFiltersCount}]`}
        </span>
        <ChevronDown size={16} className={`${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`${isOpen ? "block" : "hidden md:block"} p-5`}>
        <div className="flex items-center justify-between border-b border-[#444444] pb-2 mb-4">
          <label className="block text-sm text-[#cccccc]">
            Available Tags{" "}
            <span className="text-[#888888]">
              {filters.tags.length > 0 && `(${filters.tags.length} selected)`}
            </span>
          </label>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-md font-semibold text-white cursor-pointer"
            >
              <RotateCcw size={12} />
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {availableTags.map((tag) => {
            const isSelected = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`inline-flex items-center justify-center px-2.5 py-1 text-sm rounded-full cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-green-700 text-black"
                    : "bg-[#222222] text-white border-[#444444] border-2 "
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Search Bar ───

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  resultsCount: number;
  totalCount: number;
}

function SearchBar({
  searchInput,
  setSearchInput,
  resultsCount,
  totalCount,
}: SearchBarProps) {
  return (
    <div className="mb-6 w-full">
      <div className="flex items-stretch rounded-full border border-[#444444] bg-[#222222] focus-within:border-[#666666] transition-colors">
        <div className="flex items-center justify-center  px-3 border-r border-[#444444]">
          <Search className="w-4 h-4 text-green-500" aria-hidden="true" />
        </div>

        <input
          type="text"
          placeholder="Search articles, tags, or topics..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-transparent text-[#e0e0e0] placeholder-[#666666] px-4 py-3 text-lg focus:outline-none"
        />

        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="flex items-center justify-center px-4 hover:bg-[#333333] border-l border-[#444444] text-[#888888] hover:text-[#cccccc] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {searchInput && (
        <div className="mt-2 text-sm text-white flex items-center font-bold gap-2">
          <span>Query matched:</span>
          <strong className="text-green-400 font-semibold">
            {resultsCount}
          </strong>
          <span>/ {totalCount} records</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───

export default function BlogsPage() {
  const [searchInput, setSearchInput] = useState("");
  const posts = MOCK_BLOG_POSTS;
  const searchEngine = useMemo(() => new SimpleSearchEngine(posts), [posts]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    tags: [],
  });

  // Feedback state
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        setFeedbackLoading(true);
        const result = await getFeedbacksAction();
        // Server already guarantees these are both 'Blogs' and 'approved'
        if (result.success && result.data) {
          setFeedbacks(result.data as FeedbackItem[]);
        } else {
          setFeedbackError(result.error || "Failed to load feedbacks.");
        }
      } catch {
        setFeedbackError("Failed to load feedbacks.");
      } finally {
        setFeedbackLoading(false);
      }
    }
    loadFeedbacks();
  }, []);

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

    result = [...result].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return result;
  }, [posts, searchInput, searchEngine, filters]);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc] selection:bg-green-500/30 selection:text-green-200 pb-16">
      {/* Header */}
      <header className="mb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-6xl font-medium text-green-500 mb-5 flex items-center tracking-tight">
            <span className="w-1.5 h-19 bg-green-500 mr-4 inline-block"></span>
            Blogs
          </h1>
          <p className="text-md text-white leading-relaxed max-w-3xl border-l-2 border-green-500 pl-4">
            Hi{" "}
            <span className="text-green-500 font-bold italic">@everyone</span>{" "}
            This blog documents my learning journey in cloud computing, DevOps,
            security, and infrastructure engineering. I share hands-on
            experiences working with AWS services, serverless architectures and
            CI/CD pipelines.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback CTA */}
        <div className="mb-8 p-4 border border-[#444444] rounded-sm bg-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-[#888888] mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-[#e0e0e0] mb-0.5">
                Feedback
              </h3>
              <p className="text-md text-[#888888]">
                Provide system feedback to improve future documentation writes.
              </p>
            </div>
          </div>
          <a
            href="https://clkfeedbacks.cloudkinshuk.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-700 py-3 px-5 rounded-lg cursor-pointer transition-colors whitespace-nowrap text-md inline-flex items-center gap-2"
          >
            Leave Feedback
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* ─── Feedbacks Section ─── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-1 h-5 bg-green-500 inline-block rounded-xl" />
              <h2 className="text-lg font-medium text-[#e0e0e0]">
                Community Feedback
              </h2>
              {!feedbackLoading && (
                <span className="text-sm text-green-500 px-2 py-0.5 rounded-full bg-[#222222] border border-[#444444] inline-flex items-center gap-1">
                  <LuMessageSquareQuote className="w-4 h-4 inline-block mr-1" />
                  {feedbacks.length} received
                </span>
              )}
            </div>
          </div>

          {feedbackLoading ? (
            <div className="p-10 border border-[#444444] border-dashed rounded-xl bg-[#2b2b2b] flex items-center justify-center gap-3">
              <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
              <span className="text-sm text-[#888888]">
                Loading feedbacks...
              </span>
            </div>
          ) : feedbackError ? (
            <div className="p-6 border border-red-900/50 rounded-sm bg-red-950/20 text-center">
              <p className="text-red-400 text-sm">{feedbackError}</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="p-10 border border-[#444444] border-dashed rounded-xl bg-[#2b2b2b] text-center">
              <p className="text-white  text-sm">
                No feedback received yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {feedbacks.map((fb, i) => (
                <FeedbackCard key={fb.id} feedback={fb} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Directory Tools */}
        <div className="mb-10">
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
        </div>

        {/* Output Stream */}
        <div className="flex items-center mb-6 border-b border-[#444444] pb-2">
          <span className="text-xs text-[#888888] uppercase tracking-wider"></span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-10 border border-[#444444] border-dashed rounded-sm bg-[#2b2b2b] text-center">
            <p className="text-[#888888] text-sm mb-4">
              No matching results found for your query and filters. Try
              adjusting your search terms or clearing filters to see more posts.
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setFilters({ tags: [] });
                setFilterOpen(false);
              }}
              className="px-5 py-3 bg-green-700 text-white font-medium cursor-pointer text-md rounded-lg transition-colors"
            >
              Reset filters and search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <BlogItem key={post.id} post={post} searchQuery={searchInput} />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #222222;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555555;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777777;
        }
      `}</style>
    </div>
  );
}
