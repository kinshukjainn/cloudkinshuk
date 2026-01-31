"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Search, X, ChevronDown, RotateCcw } from "lucide-react";
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

type SortOption = "newest" | "oldest" | "mostViewed" | "mostLiked" | "readTime";

interface Filters {
  tags: string[];
  readTimeMin: number;
  readTimeMax: number;
  sortBy: SortOption;
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
    const formatDate = useCallback((dateString: string): string => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }, []);

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
            className="bg-blue-100 text-blue-900 px-0.5 font-medium"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      );
    }, []);

    return (
      <div className="py-4 transition-all font-blog duration-300 border-b border-gray-100 last:border-b-0">
        <div className="flex items-start gap-4 md:gap-6 group hover:bg-gray-50 p-4 md:p-6 rounded-lg transition-colors duration-200">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
              {highlightText(post.title, searchQuery)}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
              {post.brief}
            </p>
            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 flex-wrap">
              <span className="font-medium text-gray-700">
                {highlightText(post.author.name, searchQuery)}
              </span>
              <span className="text-gray-300">•</span>
              <span>{formatDate(post.publishedAt)}</span>
              {post.readTimeInMinutes && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{post.readTimeInMinutes} min</span>
                </>
              )}
              {post.views && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{post.views.toLocaleString()} views</span>
                </>
              )}
            </div>
          </div>
          <Link
            href={`/home-blog/${post.id}`}
            className="flex-shrink-0 px-2 py-2 bg-gray-700 text-white text-sm md:text-base font-bold rounded-md cursor-pointer transition-colors duration-200 whitespace-nowrap"
          >
            Read More
          </Link>
        </div>
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
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "mostViewed", label: "Most Viewed" },
    { value: "mostLiked", label: "Most Liked" },
    { value: "readTime", label: "Read Time" },
  ];

  const toggleTag = (tag: string) => {
    setFilters({
      ...filters,
      tags: filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag],
    });
  };

  const resetFilters = () => {
    setFilters({
      tags: [],
      readTimeMin: 0,
      readTimeMax: 100,
      sortBy: "newest",
    });
  };

  const activeFiltersCount =
    filters.tags.length +
    (filters.readTimeMin > 0 || filters.readTimeMax < 100 ? 1 : 0);

  return (
    <div className="mb-6 md:mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 mb-4"
      >
        <span className="text-sm font-semibold text-gray-900">
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid gap-4 md:gap-6 transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-96 md:max-h-none opacity-100"
            : "max-h-0 md:max-h-none opacity-0 md:opacity-100"
        } md:opacity-100 md:max-h-none`}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value as SortOption })
              }
              className="w-full px-3 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Read Time (minutes)
            </label>
            <div className="flex items-center gap-2 md:gap-3">
              <input
                type="number"
                min="0"
                max="100"
                value={filters.readTimeMin}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    readTimeMin: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.readTimeMax}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    readTimeMax: parseInt(e.target.value) || 100,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Tags {filters.tags.length > 0 && `(${filters.tags.length})`}
            </label>
            <div className="max-h-40 md:max-h-48 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200 ${
                      filters.tags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm md:text-base font-semibold rounded-lg transition-colors duration-200"
            >
              <RotateCcw size={16} />
              Reset Filters
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
    <div className="mb-6 md:mb-8">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search articles, tags, authors..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 outline-none rounded-lg text-gray-900 placeholder-gray-400 text-sm md:text-base transition-colors duration-200"
        />
        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {searchInput && (
        <div className="mt-3 text-xs md:text-sm text-gray-600 font-medium">
          Found {resultsCount} of {totalCount} articles
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
    readTimeMin: 0,
    readTimeMax: 100,
    sortBy: "newest",
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

    result = result.filter((post) => {
      const readTime = post.readTimeInMinutes || 0;
      return readTime >= filters.readTimeMin && readTime <= filters.readTimeMax;
    });

    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "mostViewed":
          return (b.views || 0) - (a.views || 0);
        case "mostLiked":
          return (b.reactionCount || 0) - (a.reactionCount || 0);
        case "readTime":
          return (a.readTimeInMinutes || 0) - (b.readTimeInMinutes || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [posts, searchInput, searchEngine, filters]);

  return (
    <>
      <div className="min-h-screen bg-white pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <header className="mb-10 md:mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Blogs
            </h1>
            <p className="text-base md:text-lg text-gray-900 max-w-2xl">
              Hi <span className="font-bold text-blue-700">@everyone</span> here
              i am sharing my learning journey in cloud computing, DevOps,
              security, and infrastructure engineering. I write about AWS
              services, serverless and container-based systems, CI/CD basics,
              Terraform, and AI-powered projects, focusing on understanding
              concepts through hands-on practice, experiments, and real academic
              projects.
            </p>
          </header>

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
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchInput("");
                  setFilters({
                    tags: [],
                    readTimeMin: 0,
                    readTimeMax: 100,
                    sortBy: "newest",
                  });
                  setFilterOpen(false);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {filteredPosts.map((post) => (
                <BlogItem key={post.id} post={post} searchQuery={searchInput} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
