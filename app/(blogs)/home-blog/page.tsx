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
          <mark key={i} className="bg-[#ffff00] text-[#333333] font-bold px-1">
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
      <div className="mb-6  p-4">
        <Link href={`/home-blog/${post.id}`} className="group block">
          {/* Title */}
          <h3 className="text-xl text-[#006600] mb-2 font-bold leading-tight group-hover:underline">
            {highlightText(post.title, searchQuery)}
          </h3>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-3 text-[13px] text-black  p-2 ">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            {post.readTimeInMinutes && (
              <div className="flex items-center gap-1.5 border-l border-[#cccccc] pl-4">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTimeInMinutes} min read</span>
              </div>
            )}
          </div>

          {/* Brief */}
          <p className="text-[#333333] text-[14px] mb-4 leading-relaxed">
            {post.brief}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <strong className="text-[12px] text-[#333333]">Tags:</strong>
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center justify-center px-1 border rounded-sm border-[#cccccc] bg-[#eeeeee] text-[12px] text-[#444444] "
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="inline-flex items-center justify-center rounded-sm px-1 border border-[#cccccc] bg-[#eeeeee] text-[12px] text-[#444444] ">
                +{post.tags.length - 4} more
              </span>
            )}
            <div className="ml-auto text-[#006600] font-bold text-sm group-hover:underline flex items-center gap-1">
              Read Article ▶
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
    <div className="mb-8 border border-[#cccccc] rounded-md bg-[#f9f9f9]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full px-4 py-2 cursor-pointer bg-[#eeeeee] border-b border-[#cccccc] font-bold text-[#333333]"
      >
        <span className="text-sm">
          Filter by tags {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </span>
        <ChevronDown size={16} className={`${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`${isOpen ? "block" : "hidden md:block"} p-4`}>
        <label className="block text-sm font-bold text-[#333333] border-b border-[#cccccc]  pb-1 mb-3">
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
                  inline-flex items-center justify-center px-2 py-1 text-[13px] rounded-sm border cursor-pointer 
                  ${
                    isSelected
                      ? "bg-[#006600] text-white border-[#004400] font-bold"
                      : "bg-white text-[#333333] border-[#cccccc] hover:bg-[#eeeeee]"
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
            className="mt-4 flex items-center justify-center gap-1 px-3 py-1 text-[13px] bg-[#eeeeee] border border-[#cccccc] text-[#333333] hover:bg-[#dddddd] font-bold"
          >
            <RotateCcw size={12} />
            Clear selections
          </button>
        )}
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
      <div className="flex items-stretch rounded-sm border border-[#cccccc] bg-white">
        <div className="flex items-center justify-center px-3 bg-[#eeeeee] border-r rounded-sm border-[#cccccc]">
          <Search className="w-4 h-4 text-[#666666]" aria-hidden="true" />
        </div>

        <input
          type="text"
          placeholder="Search articles, tags, or topics..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-white text-[#333333] placeholder-[#999999] px-3 py-2 text-[14px]  focus:outline-none focus:bg-[#fafffa]"
        />

        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="flex items-center justify-center px-3 bg-[#eeeeee] border-l border-[#cccccc] hover:bg-[#dddddd] text-[#333333]"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {searchInput && (
        <div className="mt-2 text-[13px] text-[#666666]  bg-[#eeeeee] inline-block px-2 py-1 border border-[#cccccc]">
          Found <strong className="text-[#333333]">{resultsCount}</strong> of{" "}
          {totalCount} articles
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

    // Sort by newest first
    result = [...result].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return result;
  }, [posts, searchInput, searchEngine, filters]);

  return (
    <div className="min-h-screen bg-white text-[#333333]  selection:bg-[#006600] selection:text-white pb-16">
      {/* Top Green Bar */}
      <div className="h-2 w-full bg-[#006600]"></div>

      {/* Header */}
      <header className="border-b border-[#cccccc] bg-[#f9f9f9] mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-[#333333] mb-4 flex items-center">
            <span className="w-3 h-6 bg-[#006600] mr-3 inline-block"></span>
            Developer Blogs
          </h1>
          <p className="text-[15px] text-[#444444] leading-relaxed max-w-3xl border-l-4 border-[#cccccc] pl-4">
            Hi <span className="text-[#006600] font-bold ">@everyone</span>,
            here I share my learning journey in cloud computing, DevOps,
            security, and infrastructure engineering. I write about AWS
            services, serverless systems, CI/CD basics, and Terraform, focusing
            on understanding concepts through hands-on practice.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback Card */}
        <div className="mb-8 p-4 rounded-sm border border-[#cccccc] bg-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-[#006600]" />
              <h3 className="text-lg font-bold text-black">
                Leave Your Feedback
              </h3>
            </div>
            <p className="text-[14px] text-black">
              Help me improve! Your thoughts and suggestions are invaluable for
              creating better content.
            </p>
          </div>
          <a
            href="https://fdb.cloudkinshuk.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#006600] text-white font-bold py-2 px-6 border-b-4 border-[#004400] rounded-sm hover:bg-[#008800] active:border-b-0 active:mt-[4px] transition-all whitespace-nowrap text-sm inline-flex items-center gap-2"
          >
            Leave Feedback
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Search & Filter Container */}
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 border-b border-[#cccccc] pb-1">
            Search & Filter Directory
          </h2>
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

        {/* Results */}
        <h2 className="text-xl font-bold text-[#333333] border-b-2 border-[#cccccc] pb-1 mb-6 flex items-center">
          <span className="w-2 h-4 bg-[#006600] mr-2 inline-block"></span>
          Published Articles
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-[#f9f9f9] border border-[#cccccc]">
            <h3 className="text-lg font-bold text-[#333333] mb-2">
              No articles found
            </h3>
            <p className="text-[#666666] text-sm mb-4">
              Try adjusting your search terms or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setFilters({ tags: [] });
                setFilterOpen(false);
              }}
              className="px-4 py-1 bg-[#eeeeee] border border-[#cccccc] text-[#333333] font-bold hover:bg-[#dddddd]"
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
