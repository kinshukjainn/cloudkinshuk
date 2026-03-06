"use client";

import React, { useState, useMemo } from "react";
import {
  Smartphone,
  Monitor,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Clock,
} from "lucide-react";

// ============================================================================
// Data Models (Based on provided Lighthouse dump)
// ============================================================================

type DeviceType = "mobile" | "desktop";
type ScoreCategory = "performance" | "accessibility" | "bestPractices" | "seo";
type Status = "pass" | "average" | "fail";

interface Metric {
  label: string;
  value: string;
  status: Status;
}

interface AuditItem {
  title: string;
  description: string;
  category: ScoreCategory;
  status: Status;
  savings?: string;
}

const AUDIT_DATA = {
  meta: {
    capturedAt: "Feb 20, 2026, 3:21 AM GMT+5:30",
    lighthouseVersion: "13.0.1",
    browser: "HeadlessChromium 144.0.7559.132",
  },
  mobile: {
    environment: "Emulated Moto G Power • Slow 4G throttling",
    scores: {
      performance: 39,
      accessibility: 94,
      bestPractices: 100,
      seo: 100,
    },
    metrics: [
      {
        label: "First Contentful Paint (FCP)",
        value: "3.2 s",
        status: "average",
      },
      {
        label: "Largest Contentful Paint (LCP)",
        value: "13.5 s",
        status: "fail",
      },
      { label: "Total Blocking Time (TBT)", value: "1,410 ms", status: "fail" },
      { label: "Cumulative Layout Shift (CLS)", value: "0", status: "pass" },
      { label: "Speed Index (SI)", value: "5.7 s", status: "average" },
    ] as Metric[],
  },
  desktop: {
    environment: "Emulated Desktop • Custom throttling",
    scores: {
      performance: 70,
      accessibility: 94,
      bestPractices: 100,
      seo: 100,
    },
    metrics: [
      { label: "First Contentful Paint (FCP)", value: "0.5 s", status: "pass" },
      {
        label: "Largest Contentful Paint (LCP)",
        value: "0.8 s",
        status: "pass",
      },
      { label: "Total Blocking Time (TBT)", value: "2,640 ms", status: "fail" },
      { label: "Cumulative Layout Shift (CLS)", value: "0", status: "pass" },
      { label: "Speed Index (SI)", value: "0.6 s", status: "pass" },
    ] as Metric[],
  },
  insights: [
    {
      title: "Document request latency",
      description:
        "Your first network request is the most important. Reduce its latency by avoiding redirects.",
      category: "performance",
      status: "fail",
      savings: "280 ms",
    },
    {
      title: "Render blocking requests",
      description:
        "Requests are blocking the page's initial render, which may delay LCP.",
      category: "performance",
      status: "fail",
      savings: "150 ms",
    },
    {
      title: "Legacy JavaScript",
      description:
        "Polyfills and transforms enable older browsers to use new JavaScript features.",
      category: "performance",
      status: "average",
      savings: "13 KiB",
    },
    {
      title: "Background and foreground colors lack contrast",
      description:
        "Low-contrast text is difficult or impossible for many users to read.",
      category: "accessibility",
      status: "fail",
    },
    {
      title: "Ensure CSP is effective against XSS attacks",
      description:
        "A strong Content Security Policy significantly reduces the risk of cross-site scripting.",
      category: "bestPractices",
      status: "fail",
    },
  ] as AuditItem[],
  passed: [
    "Page isn't blocked from indexing",
    "Document has a <title> element",
    "Document has a meta description",
    "Page has successful HTTP status code",
    "Links have descriptive text",
    "Image elements have [alt] attributes",
    "Uses HTTPS",
    "Avoids third-party cookies",
  ],
};

// ============================================================================
// Utility Functions
// ============================================================================

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-500";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
};

const getStatusColor = (status: Status) => {
  if (status === "pass") return "text-green-500";
  if (status === "average") return "text-amber-500";
  return "text-red-500";
};

const getStatusIcon = (status: Status) => {
  if (status === "pass")
    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  if (status === "average") return <Info className="w-4 h-4 text-amber-500" />;
  return <AlertTriangle className="w-4 h-4 text-red-500" />;
};

const generateMarkdown = (device: DeviceType) => {
  const data = AUDIT_DATA[device];
  return `# Lighthouse Audit Report - ${device.toUpperCase()}
Generated: ${AUDIT_DATA.meta.capturedAt}

## Scores
- Performance: ${data.scores.performance}
- Accessibility: ${data.scores.accessibility}
- Best Practices: ${data.scores.bestPractices}
- SEO: ${data.scores.seo}

## Core Web Vitals
${data.metrics.map((m) => `- ${m.label}: ${m.value} (${m.status})`).join("\n")}

## Key Opportunities
${AUDIT_DATA.insights.map((i) => `- [${i.category.toUpperCase()}] ${i.title} (Savings: ${i.savings || "N/A"})`).join("\n")}
  `;
};

// ============================================================================
// Main Component
// ============================================================================

export default function SeoInsights() {
  const [device, setDevice] = useState<DeviceType>("mobile");

  const currentData = useMemo(() => AUDIT_DATA[device], [device]);

  const handleExport = () => {
    const md = generateMarkdown(device);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lighthouse-report-${device}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-16 md:pt-24 bg-[#1b1b1b] text-gray-200  selection:bg-green-500 selection:text-black">
      <div className="max-w-4xl pt-10 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Block */}
        <header className="mb-10 border-b border-[#444] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-5xl font-semibold text-white mb-2 tracking-tight">
              Lighthouse Intelligence
            </h1>
            <div className="text-sm font-mono text-gray-100">
              Captured: {AUDIT_DATA.meta.capturedAt} | v
              {AUDIT_DATA.meta.lighthouseVersion}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Toggle */}
            <div className="flex   rounded-sm p-1">
              <button
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer font-medium rounded-sm transition-colors ${
                  device === "mobile"
                    ? " text-white shadow-sm"
                    : "text-gray-200 hover:text-gray-200"
                }`}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
              <button
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-2 px-3 py-1.5  text-sm cursor-pointer font-medium rounded-sm transition-colors ${
                  device === "desktop"
                    ? " text-white shadow-sm"
                    : "text-gray-200 hover:text-gray-200"
                }`}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 cursor-pointer hover:bg-green-400 text-black text-sm font-semibold rounded-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </header>

        {/* 1. Environment Details */}
        <section className="mb-10">
          <dl className="grid sm:grid-cols-[150px_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-gray-500 font-mono">Target Device:</dt>
            <dd className="text-gray-300">{currentData.environment}</dd>
            <dt className="text-gray-500 font-mono">User Agent:</dt>
            <dd className="text-gray-300">{AUDIT_DATA.meta.browser}</dd>
          </dl>
        </section>

        {/* 2. Primary Scores */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
            <span className="text-green-500 font-mono text-lg">1.</span>{" "}
            Category Scores
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(currentData.scores).map(([key, value]) => (
              <div
                key={key}
                className="  p-5 rounded-sm flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`text-4xl font-mono font-bold mb-2 ${getScoreColor(value)}`}
                >
                  {value}
                </div>
                <div className="text-sm font-medium text-gray-300 uppercase tracking-wider capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Core Web Vitals */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
            <span className="text-green-500 font-mono text-lg">2.</span> Core
            Web Vitals
          </h2>
          <div className="  rounded-sm overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#333] border-b border-[#444]">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-300">
                    Metric
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-300">Value</th>
                  <th className="px-4 py-3 font-medium text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#444]">
                {currentData.metrics.map((metric, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#333]/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-200">{metric.label}</td>
                    <td
                      className={`px-4 py-3 font-mono font-medium ${getStatusColor(metric.status)}`}
                    >
                      {metric.value}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 capitalize">
                        {getStatusIcon(metric.status)}
                        <span className="text-gray-200">{metric.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Diagnostics & Opportunities */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
            <span className="text-green-500 font-mono text-lg">3.</span>{" "}
            Diagnostic Opportunities
          </h2>
          <div className="space-y-4">
            {AUDIT_DATA.insights.map((item, idx) => (
              <div
                key={idx}
                className=" border-l-2 border-l-[#444] hover:border-l-amber-500 border-t border-r border-b border-t-[#444] border-r-[#444] border-b-[#444] p-4 sm:p-5 rounded-r-sm transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-medium text-white flex items-start gap-2">
                    {item.status === "fail" ? (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    {item.title}
                  </h3>
                  {item.savings && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#333] border border-[#555] rounded-sm text-xs font-mono text-amber-400 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" /> Est. savings:{" "}
                      {item.savings}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-200 leading-relaxed ml-7">
                  {item.description}
                </p>
                <div className="mt-3 ml-7">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    Category:{" "}
                    <span className="text-gray-300">{item.category}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Passed Audits (Summarized) */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
            <span className="text-green-500 font-mono text-lg">4.</span> Passed
            Audits
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {AUDIT_DATA.passed.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
