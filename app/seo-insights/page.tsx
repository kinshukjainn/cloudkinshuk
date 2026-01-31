"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  ChevronDown,
  Filter,
  AlertCircle,
  CheckCircle2,
  Zap,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
} from "lucide-react";

// ============================================================================
// Types & Constants
// ============================================================================

type Priority = "high" | "medium" | "low";
type Category = "performance" | "seo" | "accessibility";
type VitalStatus = "good" | "needs-improvement" | "poor";

interface FilterState {
  priority: Priority | "all";
  category: Category | "all";
}

interface ExpandedSections {
  environment: boolean;
  scores: boolean;
  vitals: boolean;
  opportunities: boolean;
}

const AUDIT_DATA = {
  auditMeta: {
    capturedAt: "2026-01-13T10:20:00+05:30",
    environment: {
      device: "Moto G Power (Emulated)",
      network: "Slow 4G",
      lighthouseVersion: "13.0.1",
      browser: "HeadlessChromium 137.0.7151.119",
    },
  },
  scores: {
    performance: 86,
    accessibility: 100,
    bestPractices: 100,
    seo: 66,
  },
  coreWebVitals: {
    fcp: {
      value: "4.1 s",
      status: "good" as VitalStatus,
      label: "First Contentful Paint",
    },
    lcp: {
      value: "7.0 s",
      status: "poor" as VitalStatus,
      label: "Largest Contentful Paint",
    },
    tbt: {
      value: "40 ms",
      status: "good" as VitalStatus,
      label: "Total Blocking Time",
    },
    cls: {
      value: "0",
      status: "good" as VitalStatus,
      label: "Cumulative Layout Shift",
    },
  },
  insights: {
    performanceImprovements: [
      {
        title: "Render Blocking Requests",
        savings: "2100ms",
        priority: "high" as Priority,
        category: "performance" as Category,
      },
      {
        title: "Document Request Latency",
        savings: "270ms",
        priority: "medium" as Priority,
        category: "performance" as Category,
      },
      {
        title: "Improve Image Delivery",
        savings: "1083 KiB",
        priority: "high" as Priority,
        category: "performance" as Category,
      },
      {
        title: "Missing Meta Description",
        savings: "N/A",
        priority: "medium" as Priority,
        category: "seo" as Category,
      },
      {
        title: "Image Alt Text Missing",
        savings: "N/A",
        priority: "high" as Priority,
        category: "accessibility" as Category,
      },
    ],
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

const getScoreColor = (score: number): string => {
  if (score >= 90) return "bg-emerald-600";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
};

const getStatusColor = (status: VitalStatus): string => {
  if (status === "good") return "text-emerald-600";
  if (status === "needs-improvement") return "text-amber-600";
  return "text-red-600";
};

const getPriorityColor = (priority: Priority): string => {
  if (priority === "high") return "bg-red-100 text-red-700";
  if (priority === "medium") return "bg-amber-100 text-amber-700";
  return "bg-blue-100 text-blue-700";
};

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Invalid Date";
  }
};

const generateMarkdownContent = (
  auditData: typeof AUDIT_DATA,
  filteredOpportunities: (typeof AUDIT_DATA.insights.performanceImprovements)[number][],
  avgScore: number,
): string => {
  const date = formatDate(auditData.auditMeta.capturedAt);

  const scoreRows = Object.entries(auditData.scores)
    .map(
      ([key, value]) =>
        `| ${key.replace(/([A-Z])/g, " $1").trim()} | ${value} |`,
    )
    .join("\n");

  const vitalRows = Object.entries(auditData.coreWebVitals)
    .map(
      ([, vital]) =>
        `| ${vital.label} | ${vital.value} | ${vital.status.toUpperCase()} |`,
    )
    .join("\n");

  const opportunityRows = filteredOpportunities
    .map(
      (item, idx) =>
        `| ${idx + 1} | ${item.title} | ${item.priority.toUpperCase()} | ${item.savings} | ${item.category} |`,
    )
    .join("\n");

  return `# SEO & Performance Audit Report

**Generated:** ${date}

---

## Executive Summary

- **Overall Score:** ${avgScore}
- **Critical Issues:** ${filteredOpportunities.filter((i) => i.priority === "high").length}
- **Total Opportunities:** ${filteredOpportunities.length}

---

## Category Scores

| Category | Score |
|----------|-------|
${scoreRows}

---

## Core Web Vitals

| Metric | Value | Status |
|--------|-------|--------|
${vitalRows}

---

## Performance Opportunities

| # | Issue | Priority | Savings | Category |
|---|-------|----------|---------|----------|
${opportunityRows}

---

## Test Environment

- **Device:** ${auditData.auditMeta.environment.device}
- **Network:** ${auditData.auditMeta.environment.network}
- **Browser:** ${auditData.auditMeta.environment.browser}
- **Lighthouse Version:** v${auditData.auditMeta.environment.lighthouseVersion}

---

*Report auto-generated from Lighthouse audit data.*
`;
};

// ============================================================================
// Components
// ============================================================================

interface ScoreBarProps {
  score: number;
  label: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, label }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <span className="text-lg font-bold text-gray-900">{score}</span>
    </div>
    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${getScoreColor(score)}`}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

interface CollapsibleSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  badge?: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isExpanded,
  onToggle,
  badge,
  children,
}) => (
  <div className="border-t border-gray-200">
    <button
      onClick={onToggle}
      className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      aria-expanded={isExpanded}
      type="button"
    >
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {badge && (
          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
            {badge}
          </span>
        )}
      </div>
      <ChevronDown
        className={`w-5 h-5 text-gray-400 transition-transform ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
    {isExpanded && (
      <div className="pb-4 space-y-4 text-gray-700">{children}</div>
    )}
  </div>
);

export default function SeoInsights() {
  // ========================================================================
  // State Management
  // ========================================================================

  const [expanded, setExpanded] = useState<ExpandedSections>({
    environment: true,
    scores: true,
    vitals: true,
    opportunities: true,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priority: "all",
    category: "all",
  });

  // ========================================================================
  // Computed Values
  // ========================================================================

  const avgScore = useMemo(
    () =>
      Math.round(
        (AUDIT_DATA.scores.performance +
          AUDIT_DATA.scores.accessibility +
          AUDIT_DATA.scores.bestPractices +
          AUDIT_DATA.scores.seo) /
          4,
      ),
    [],
  );

  const filteredOpportunities = useMemo(
    () =>
      AUDIT_DATA.insights.performanceImprovements.filter((item) => {
        const matchesPriority =
          filters.priority === "all" || item.priority === filters.priority;
        const matchesCategory =
          filters.category === "all" || item.category === filters.category;
        return matchesPriority && matchesCategory;
      }),
    [filters],
  );

  const hasActiveFilters = useMemo(
    () => filters.priority !== "all" || filters.category !== "all",
    [filters],
  );

  const formattedDate = useMemo(
    () => formatDate(AUDIT_DATA.auditMeta.capturedAt),
    [],
  );

  // ========================================================================
  // Event Handlers
  // ========================================================================

  const toggleSection = useCallback((section: keyof ExpandedSections) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      priority: "all",
      category: "all",
    });
  }, []);

  const handleExportMarkdown = useCallback(() => {
    try {
      const markdownContent = generateMarkdownContent(
        AUDIT_DATA,
        filteredOpportunities,
        avgScore,
      );

      const element = document.createElement("a");
      element.setAttribute(
        "href",
        `data:text/markdown;charset=utf-8,${encodeURIComponent(markdownContent)}`,
      );
      element.setAttribute(
        "download",
        `seo-audit-${new Date().toISOString().split("T")[0]}.md`,
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error("[v0] Export markdown failed:", error);
      alert("Failed to export markdown. Please try again.");
    }
  }, [filteredOpportunities, avgScore]);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      <Header
        date={formattedDate}
        showFilters={showFilters}
        onToggleFilters={setShowFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
        onExportMarkdown={handleExportMarkdown}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Avg Score" value={avgScore} trend={2} />
          <StatCard
            label="Performance"
            value={AUDIT_DATA.scores.performance}
            trend={-3}
          />
          <StatCard
            label="Accessibility"
            value={AUDIT_DATA.scores.accessibility}
            trend={5}
          />
          <StatCard label="SEO" value={AUDIT_DATA.scores.seo} trend={1} />
        </div>

        {/* Active Filters Info */}
        {hasActiveFilters && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <Filter className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-blue-900">
                  Showing {filteredOpportunities.length} of{" "}
                  {AUDIT_DATA.insights.performanceImprovements.length} items
                </span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                type="button"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Environment */}
        <CollapsibleSection
          title="Test Environment"
          isExpanded={expanded.environment}
          onToggle={() => toggleSection("environment")}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Device
              </p>
              <p className="font-medium">
                {AUDIT_DATA.auditMeta.environment.device}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Network
              </p>
              <p className="font-medium">
                {AUDIT_DATA.auditMeta.environment.network}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Version
              </p>
              <p className="font-medium">
                v{AUDIT_DATA.auditMeta.environment.lighthouseVersion}
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Overall Scores */}
        <CollapsibleSection
          title="Overall Scores"
          isExpanded={expanded.scores}
          onToggle={() => toggleSection("scores")}
        >
          <div className="space-y-4">
            <ScoreBar
              score={AUDIT_DATA.scores.performance}
              label="Performance"
            />
            <ScoreBar
              score={AUDIT_DATA.scores.accessibility}
              label="Accessibility"
            />
            <ScoreBar
              score={AUDIT_DATA.scores.bestPractices}
              label="Best Practices"
            />
            <ScoreBar score={AUDIT_DATA.scores.seo} label="SEO" />
          </div>
        </CollapsibleSection>

        {/* Core Web Vitals */}
        <CollapsibleSection
          title="Core Web Vitals"
          isExpanded={expanded.vitals}
          onToggle={() => toggleSection("vitals")}
          badge="Critical"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(AUDIT_DATA.coreWebVitals).map(([key, vital]) => (
              <VitalCard key={key} vital={vital} />
            ))}
          </div>
        </CollapsibleSection>

        {/* Performance Opportunities */}
        <CollapsibleSection
          title="Performance Opportunities"
          isExpanded={expanded.opportunities}
          onToggle={() => toggleSection("opportunities")}
          badge={`${filteredOpportunities.length}`}
        >
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Filter className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">
                No opportunities match your current filters
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOpportunities.map((item, idx) => (
                <OpportunityItem key={idx} item={item} />
              ))}
            </div>
          )}
        </CollapsibleSection>
      </main>
    </div>
  );
}

// ============================================================================
// Filter Panel Component
// ============================================================================

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  hasActiveFilters,
  onResetFilters,
}) => (
  <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center gap-2 mb-3">
      <Filter className="w-4 h-4 text-gray-600" />
      <h3 className="text-sm font-semibold text-gray-900">Filter Options</h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Priority Filter */}
      <div>
        <label
          htmlFor="priority-filter"
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          Priority Level
        </label>
        <select
          id="priority-filter"
          value={filters.priority}
          onChange={(e) =>
            onFilterChange({
              priority: e.target.value as Priority | "all",
            })
          }
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label
          htmlFor="category-filter"
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={(e) =>
            onFilterChange({
              category: e.target.value as Category | "all",
            })
          }
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="performance">Performance</option>
          <option value="seo">SEO</option>
          <option value="accessibility">Accessibility</option>
        </select>
      </div>
    </div>

    {hasActiveFilters && (
      <button
        onClick={onResetFilters}
        className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 rounded transition-colors"
        type="button"
      >
        Reset All Filters
      </button>
    )}
  </div>
);

// ============================================================================
// Header Component
// ============================================================================

interface HeaderProps {
  date: string;
  showFilters: boolean;
  onToggleFilters: (show: boolean) => void;
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onExportMarkdown: () => void;
}

const Header: React.FC<HeaderProps> = ({
  date,
  showFilters,
  onToggleFilters,
  filters,
  onFilterChange,
  hasActiveFilters,
  onResetFilters,
  onExportMarkdown,
}) => (
  <header className="top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-sm">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            SEO & Performance
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            Lighthouse Audit • {date}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors relative ${
              showFilters
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            type="button"
            aria-pressed={showFilters}
            aria-label="Toggle filters"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <button
            onClick={onExportMarkdown}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
            type="button"
            aria-label="Export as Markdown"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Export MD</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onFilterChange={onFilterChange}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={onResetFilters}
        />
      )}
    </div>
  </header>
);

// ============================================================================
// Stat Card Component
// ============================================================================

interface StatCardProps {
  label: string;
  value: number;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend }) => (
  <div className="p-3 bg-gray-50 rounded border border-gray-200">
    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    <div className="flex items-center justify-between mt-1">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {trend !== undefined && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trend > 0 ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {trend > 0 ? (
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span>{Math.abs(trend)}</span>
        </div>
      )}
    </div>
  </div>
);

// ============================================================================
// Vital Card Component
// ============================================================================

interface VitalCardProps {
  vital: {
    value: string;
    status: VitalStatus;
    label: string;
  };
}

const getStatusIcon = (status: VitalStatus) => {
  if (status === "good") return <CheckCircle2 className="w-4 h-4" />;
  return <AlertCircle className="w-4 h-4" />;
};

const VitalCard: React.FC<VitalCardProps> = ({ vital }) => (
  <div className="p-3 bg-gray-50 rounded border border-gray-200">
    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
      {vital.label}
    </p>
    <div className="flex items-start justify-between">
      <p className="text-xl font-bold text-gray-900">{vital.value}</p>
      <div className={getStatusColor(vital.status)} aria-hidden="true">
        {getStatusIcon(vital.status)}
      </div>
    </div>
  </div>
);

// ============================================================================
// Opportunity Item Component
// ============================================================================

interface OpportunityItemProps {
  item: {
    title: string;
    savings: string;
    priority: Priority;
    category: Category;
  };
}

const OpportunityItem: React.FC<OpportunityItemProps> = ({ item }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors">
    <Zap
      className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
      aria-hidden="true"
    />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{item.title}</p>
      <div className="flex items-center gap-3 mt-1">
        <p className="text-xs text-gray-500">Savings: {item.savings}</p>
        <span className="text-xs text-gray-400" aria-hidden="true">
          •
        </span>
        <p className="text-xs text-gray-500 capitalize">{item.category}</p>
      </div>
    </div>
    <span
      className={`px-2 py-0.5 text-xs rounded font-medium whitespace-nowrap ${getPriorityColor(item.priority)}`}
    >
      {item.priority.toUpperCase()}
    </span>
  </div>
);
