"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Download,
  Filter,
  X,
  AlertCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";

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
    fcp: { value: "4.1 s", status: "good", label: "First Contentful Paint" },
    lcp: { value: "7.0 s", status: "poor", label: "Largest Contentful Paint" },
    tbt: { value: "40 ms", status: "good", label: "Total Blocking Time" },
    cls: { value: "0", status: "good", label: "Cumulative Layout Shift" },
  },
  insights: {
    performanceImprovements: [
      {
        title: "Render Blocking Requests",
        savings: "2100ms",
        priority: "high",
      },
      {
        title: "Document Request Latency",
        savings: "270ms",
        priority: "medium",
      },
      {
        title: "Improve Image Delivery",
        savings: "1083 KiB",
        priority: "high",
      },
    ],
  },
};

const ScoreBar = ({ score, label }: { score: number; label: string }) => {
  const getColor = (score: number) => {
    if (score >= 90) return "bg-emerald-600";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-lg font-bold text-gray-900">{score}</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const CollapsibleSection = ({
  title,
  isExpanded,
  onToggle,
  badge,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  badge?: string;
  children: React.ReactNode;
}) => (
  <div className="border-t border-gray-200">
    <button
      onClick={onToggle}
      className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
          isExpanded ? "transform rotate-180" : ""
        }`}
      />
    </button>
    {isExpanded && (
      <div className="pb-4 space-y-4 text-gray-700">{children}</div>
    )}
  </div>
);

export default function SeoInsights() {
  const [expanded, setExpanded] = useState({
    environment: true,
    scores: true,
    vitals: true,
    opportunities: true,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all");

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredOpportunities =
    AUDIT_DATA.insights.performanceImprovements.filter(
      (item) => filterPriority === "all" || item.priority === filterPriority,
    );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const avgScore = Math.round(
    (AUDIT_DATA.scores.performance +
      AUDIT_DATA.scores.accessibility +
      AUDIT_DATA.scores.bestPractices +
      AUDIT_DATA.scores.seo) /
      4,
  );

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      <Header
        avgScore={avgScore}
        date={formatDate(AUDIT_DATA.auditMeta.capturedAt)}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Avg Score" value={avgScore} />
          <StatCard label="Performance" value={AUDIT_DATA.scores.performance} />
          <StatCard
            label="Accessibility"
            value={AUDIT_DATA.scores.accessibility}
          />
          <StatCard label="SEO" value={AUDIT_DATA.scores.seo} />
        </div>

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
          <div className="space-y-3">
            {filteredOpportunities.map((item, idx) => (
              <OpportunityItem key={idx} item={item} />
            ))}
          </div>
        </CollapsibleSection>
      </main>
    </div>
  );
}

function Header({
  date,
  showFilters,
  setShowFilters,
  filterPriority,
  setFilterPriority,
}: {
  avgScore: number;
  date: string;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  filterPriority: string;
  setFilterPriority: (v: string) => void;
}) {
  return (
    <div className=" top-20 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              SEO & Performance
            </h1>
            <p className="text-sm text-gray-500">Lighthouse Audit • {date}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border border-gray-200">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flex-1 px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 bg-gray-50 rounded border border-gray-200">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function VitalCard({
  vital,
}: {
  vital: { value: string; status: string; label: string };
}) {
  const getStatusColor = (status: string) => {
    if (status === "good") return "text-emerald-600";
    if (status === "needs-improvement") return "text-amber-600";
    return "text-red-600";
  };

  const getStatusIcon = (status: string) => {
    if (status === "good") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "needs-improvement")
      return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="p-3 bg-gray-50 rounded border border-gray-200">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {vital.label}
      </p>
      <div className="flex items-start justify-between">
        <p className="text-xl font-bold text-gray-900">{vital.value}</p>
        <div className={`${getStatusColor(vital.status)}`}>
          {getStatusIcon(vital.status)}
        </div>
      </div>
    </div>
  );
}

function OpportunityItem({
  item,
}: {
  item: { title: string; savings: string; priority: string };
}) {
  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-700";
    if (priority === "medium") return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded border border-gray-200">
      <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{item.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Potential: {item.savings}
        </p>
      </div>
      <span
        className={`px-2 py-0.5 text-xs rounded font-medium whitespace-nowrap ${getPriorityColor(item.priority)}`}
      >
        {item.priority}
      </span>
    </div>
  );
}
