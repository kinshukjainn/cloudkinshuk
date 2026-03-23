"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  X,
  ChevronDown,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  Clock,
  Calendar,
} from "lucide-react";
import Link from "next/link";

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
  {
    id: "blogG",
    title: "Challenges i faced while building my college project m-scada ?",
    brief: "There were many challanges which i faced while building .....",
    slug: "Challenges-i-faced-while-building-my-college-project-m-scada",
    publishedAt: "2026-03-11T10:00:00Z",
    updatedAt: "2026-03-11T10:00:00Z",
    readTimeInMinutes: 10,
    views: 0,
    reactionCount: 0,
    tags: [
      { id: "1", name: "blogs", slug: "blogs" },
      { id: "2", name: "devlopers", slug: "devlopers" },
      { id: "3", name: "scada", slug: "scada" },
      { id: "4", name: "power sytem", slug: "power-system" },
      { id: "5", name: "aws cloud", slug: "aws-cloud" },
      { id: "7", name: "aws bedrock", slug: "aws-bedrock" },
      { id: "8", name: "Amazon API Gateway", slug: "amazon-api-gayeway" },
      { id: "9", name: "Amazon Route 53", slug: "amazon-api-route-53" },
      { id: "10", name: "Amazon Lamba", slug: "amazon-lambda" },
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
      <div className="mb-4 p-5 border border-[#444444] bg-[#2b2b2b] rounded-sm hover:border-[#666666] transition-colors">
        <Link href={`/home-blog/${post.id}`} className="group block">
          {/* Title */}
          <h3 className="text-lg text-[#e0e0e0] mb-2 font-medium leading-tight group-hover:text-green-500 transition-colors">
            {highlightText(post.title, searchQuery)}
          </h3>

          {/* Metadata - Monospaced for technical feel */}
          <div className="flex items-center gap-4 mb-4 text-xs text-[#888888] ">
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

          {/* Brief */}
          <p className="text-[#b0b0b0] text-sm mb-5 leading-relaxed">
            {post.brief}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 5).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center justify-center px-2 py-0.5 border rounded-sm border-[#555555] bg-[#222222] text-xs text-[#999999]"
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 5 && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 border rounded-sm border-[#555555] bg-[#222222] text-xs text-[#999999]">
                +{post.tags.length - 5}
              </span>
            )}
            <div className="ml-auto text-green-500  text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              [Read]
            </div>
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
    <div className="mb-8 border border-[#444444] rounded-sm bg-[#2b2b2b]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full px-4 py-3 cursor-pointer bg-[#222222] border-b border-[#444444] text-[#cccccc]"
      >
        <span className="text-sm ">
          &gt; Filter Tags {activeFiltersCount > 0 && `[${activeFiltersCount}]`}
        </span>
        <ChevronDown size={16} className={`${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`${isOpen ? "block" : "hidden md:block"} p-5`}>
        <div className="flex items-center justify-between border-b border-[#444444] pb-2 mb-4">
          <label className="block text-sm text-[#cccccc] ">
            Available_Tags{" "}
            <span className="text-[#888888]">
              {filters.tags.length > 0 && `(${filters.tags.length} selected)`}
            </span>
          </label>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-[#999999] hover:text-[#cccccc]"
            >
              <RotateCcw size={12} />
              [Clear]
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
                className={`
                  inline-flex items-center justify-center px-2.5 py-1 text-xs rounded-sm border cursor-pointer  transition-colors
                  ${
                    isSelected
                      ? "bg-green-600/20 text-green-400 border-green-600/50"
                      : "bg-[#222222] text-[#999999] border-[#555555] hover:border-[#777777] hover:text-[#cccccc]"
                  }
                `}
              >
                {tag}
              </button>
            );
          })}
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
  return (
    <div className="mb-6 w-full">
      <div className="flex items-stretch rounded-sm border border-[#444444] bg-[#222222] focus-within:border-[#666666] transition-colors">
        <div className="flex items-center justify-center px-3 border-r border-[#444444]">
          <Search className="w-4 h-4 text-[#888888]" aria-hidden="true" />
        </div>

        <input
          type="text"
          placeholder="Search articles, tags, or topics..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-transparent text-[#e0e0e0] placeholder-[#666666] px-4 py-2.5 text-sm focus:outline-none"
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
        <div className="mt-2 text-xs text-[#888888]  flex items-center gap-2">
          <span>&gt; Query execution matched:</span>
          <strong className="text-green-400 font-normal">{resultsCount}</strong>
          <span>/ {totalCount} records</span>
        </div>
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

    result = [...result].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return result;
  }, [posts, searchInput, searchEngine, filters]);

  return (
    <div className="min-h-screen bg-[#313131] text-[#cccccc] selection:bg-green-500/30 selection:text-green-200 pb-16 ">
      {/* Header */}
      <header className="mb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-medium text-[#e0e0e0] mb-5 flex items-center tracking-tight">
            <span className="w-1.5 h-6 bg-green-500 mr-4 inline-block"></span>
            Blogs
          </h1>
          <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-3xl border-l border-[#555555] pl-4">
            <span className="text-green-500 ">@root</span> — Log of learning
            journeys in cloud computing, DevOps, security, and infrastructure
            engineering. Executing writes on AWS services, serverless systems,
            CI/CD, and Terraform via hands-on practice.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback Component (CLI Notice style) */}
        <div className="mb-8 p-4 border border-[#444444] rounded-sm bg-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-[#888888] mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-[#e0e0e0] mb-0.5">
                Output Diagnostics & Feedback
              </h3>
              <p className="text-xs text-[#888888] ">
                Provide system feedback to improve future documentation writes.
              </p>
            </div>
          </div>
          <a
            href="https://fdb.cloudkinshuk.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#555555] text-[#cccccc] hover:text-white hover:border-[#888888] bg-[#2b2b2b] py-1.5 px-4 rounded-sm transition-colors whitespace-nowrap text-xs  inline-flex items-center gap-2"
          >
            [Execute_Feedback]
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Directory Tools */}
        <div className="mb-10">
          <h2 className="text-xs  text-[#888888] uppercase tracking-wider mb-3"></h2>
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
          <span className="text-xs  text-[#888888] uppercase tracking-wider"></span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-10 border border-[#444444] border-dashed rounded-sm bg-[#2b2b2b] text-center">
            <p className="text-[#888888]  text-sm mb-4">
              Error 404: No blocks found matching query parameters.
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setFilters({ tags: [] });
                setFilterOpen(false);
              }}
              className="px-4 py-1.5 border border-[#555555] bg-[#222222] text-[#cccccc] text-xs  rounded-sm hover:border-[#888888] hover:text-white transition-colors"
            >
              [Reset_Parameters]
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
        /* Optional Custom Scrollbar for the filter panel to match the boring aesthetic */
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
