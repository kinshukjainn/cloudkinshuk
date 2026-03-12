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
            className="bg-amber-500/20 text-amber-300 font-medium px-1 rounded-xl"
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
        day: "numeric",
        year: "numeric",
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link
          href={`/home-blog/${post.id}`}
          className="group block p-3    transition-all duration-200 "
        >
          {/* Title */}
          <h3 className="text-xl text-white mb-2 font-bold leading-tight transition-colors duration-200 group-hover:text-blue-200">
            {highlightText(post.title, searchQuery)}
          </h3>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            {post.readTimeInMinutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTimeInMinutes} min read</span>
              </div>
            )}
          </div>

          {/* Brief */}
          <p className="text-gray-200 text-sm mb-5 leading-relaxed line-clamp-2">
            {post.brief}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center justify-center px-2.5 py-1 text-xs  text-yellow-200 font-bold group-hover:border-[#555]"
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold text-yellow-200">
                +{post.tags.length - 4} more
              </span>
            )}
            <div className="ml-auto text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-semibold">
              Read <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </motion.div>
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
        className="flex md:hidden items-center justify-between bg-[#252525] rounded-md w-full px-4 py-3  border-2 border-[#444444]  transition-colors duration-200 mb-4"
      >
        <span className="text-sm font-medium text-white">
          Filter by tags {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-200 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-96 md:max-h-none opacity-100"
            : "max-h-0 md:max-h-none opacity-0 md:opacity-100"
        } md:opacity-100 md:max-h-none`}
      >
        <div className=" p-2">
          <label className="block text-sm font-medium text-white mb-3">
            Available Tags{" "}
            {filters.tags.length > 0 && `(${filters.tags.length} selected)`}
          </label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {availableTags.map((tag) => {
              const isSelected = filters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    inline-flex items-center justify-center px-3 py-1.5 text-xs cursor-pointer font-semibold rounded-sm transition-all duration-200
                    ${
                      isSelected
                        ? "bg-green-500 text-black  font-semibold"
                        : "bg-[#121212]  text-gray-300  hover:text-white"
                    }
                  `}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="mt-5 flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-200 hover:text-white transition-colors duration-200"
            >
              <RotateCcw size={14} />
              Clear selections
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
  return (
    <div className="mb-6 w-full">
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 z-10 flex items-center justify-center pointer-events-none">
          <Search className="w-5 h-5 text-blue-400" aria-hidden="true" />
        </div>

        <input
          type="text"
          placeholder="Search articles, tags, or topics..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-[#252525] text-white placeholder:text-gray-500  focus:outline-none rounded-sm  pl-12 pr-12 py-2 text-sm sm:text-base transition-colors duration-200"
        />

        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="absolute right-4 z-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {searchInput && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-gray-200 flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Found <span className="text-white font-medium">
            {resultsCount}
          </span>{" "}
          of {totalCount} articles
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

    // Sort by newest first
    result = [...result].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return result;
  }, [posts, searchInput, searchEngine, filters]);

  return (
    <div className="min-h-screen bg-[#1b1b1b] text-gray-100  selection:bg-green-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-[#444] mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
            Developer Blogs
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            Hi{" "}
            <span className="text-green-400 font-bold font-mono">
              {"@"}everyone
            </span>
            , here I share my learning journey in cloud computing, DevOps,
            security, and infrastructure engineering. I write about AWS
            services, serverless systems, CI/CD basics, and Terraform, focusing
            on understanding concepts through hands-on practice.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Feedback Card */}
        <div className="mb-10   flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-600 p-2 rounded-sm">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Leave Your Feedback
              </h3>
            </div>
            <p className="text-gray-200 text-sm">
              Help me improve! Your thoughts and suggestions are invaluable for
              creating better content.
            </p>
          </div>
          <a
            href="https://fdb.cloudkinshuk.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500  text-black font-bold rounded-lg transition-colors whitespace-nowrap"
          >
            Leave Feedback
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

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
          <div className="text-center py-20 bg-[#1e1e1e] border border-[#444] rounded-xl">
            <h3 className="text-xl font-medium text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-200 mb-6">
              Try adjusting your search terms or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setFilters({ tags: [] });
                setFilterOpen(false);
              }}
              className="px-6 py-2 bg-[#3f3f3f]  text-white font-medium rounded-xl transition-colors duration-200"
            >
              Clear all filters
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
    </div>
  );
}
