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
  if (score >= 90) return "text-white";
  if (score >= 50) return "text-white"; // Dark Amber for light theme
  return "text-[#cc0000]"; // Classic Red
};

const getStatusColor = (status: Status) => {
  if (status === "pass") return "text-white";
  if (status === "average") return "text-white";
  return "text-white";
};

const getStatusBorder = (status: Status) => {
  if (status === "pass") return "border-l-[#444444]";
  if (status === "average") return "border-l-[#444444]";
  return "border-l-[#444444]";
};

const getStatusIcon = (status: Status) => {
  if (status === "pass") return <CheckCircle2 className="w-4 h-4 text-white" />;
  if (status === "average") return <Info className="w-4 h-4 text-white" />;
  return <AlertTriangle className="w-4 h-4 text-white" />;
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
    <div className="min-h-screen bg-[#1e1e1e] text-[#333333]  selection:bg-[#006600] selection:text-white pb-16">
      {/* Top Green Bar */}
      <div className="h-2 w-full bg-black"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Header Block */}
        <header className="mb-8  p-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-6 bg-green-500 mr-3 inline-block"></span>
                Lighthouse Intelligence
              </h1>
              <div className="text-[13px]  text-white   p-2 inline-block">
                <strong>Captured:</strong> {AUDIT_DATA.meta.capturedAt} |{" "}
                <strong>v{AUDIT_DATA.meta.lighthouseVersion}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Device Toggle Tabs */}
              <div className="flex border w-max rounded-full bg-[#252525] border border-[#141414] p-1">
                <button
                  onClick={() => setDevice("mobile")}
                  className={`flex items-center justify-center gap-2 px-4 py-1.5 cursor-pointer text-[14px] rounded-full font-medium transition-none ${
                    device === "mobile"
                      ? "bg-[#141414] text-[#ff9100] border-[#101010]"
                      : "text-gray-300"
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> Mobile
                </button>
                <button
                  onClick={() => setDevice("desktop")}
                  className={`flex items-center justify-center gap-2 px-4 py-1.5 text-[14px] cursor-pointer font-medium  rounded-full  transition-none ${
                    device === "desktop"
                      ? "bg-[#141414] text-[#ff9100] border-[#101010]"
                      : "text-gray-300"
                  }`}
                >
                  <Monitor className="w-4 h-4" /> Desktop
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 text-white w-max font-bold text-[14px] rounded-full cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>
        </header>

        {/* 1. Environment Details */}
        <section className="mb-8 border border-[#181818] rounded-2xl bg-[#252525]">
          <h2 className="text-[16px] font-bold text-green-400 bg-[#181818] border-b border-[#181818] px-4 py-2">
            Environment Data
          </h2>
          <div className="p-4">
            <dl className="grid sm:grid-cols-[150px_1fr] gap-x-4 gap-y-2 text-[14px]">
              <dt className="text-white font-bold">Target Device:</dt>
              <dd className="text-gray-300 ">{currentData.environment}</dd>
              <dt className="text-white font-bold">User Agent:</dt>
              <dd className="text-gray-300 ">{AUDIT_DATA.meta.browser}</dd>
            </dl>
          </div>
        </section>

        {/* 2. Primary Scores */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center  pb-1">
            <span className="w-2   mr-3 inline-block">{"#"}</span>
            Category Scores
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(currentData.scores).map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl bg-[#252525] border border-[#181818] p-4 flex flex-col items-center justify-center text-center shadow-none"
              >
                <div
                  className={`text-4xl  font-semibold mb-2 ${getScoreColor(value)}`}
                >
                  {value}
                </div>
                <div className="text-[12px] font-bold text-white uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Core Web Vitals */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center  pb-1">
            <span className="w-2  text-white mr-3 inline-block">{"#"}</span>
            Core Web Vitals
          </h2>
          <div className="border border-[#181818] rounded-2xl bg-[#252525] overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#181818] border-b border-[#181818]">
                <tr>
                  <th className="px-4 py-2 font-bold text-white border-r border-[#444444]">
                    Metric
                  </th>
                  <th className="px-4 py-2 font-bold text-white border-r border-[#444444]">
                    Value
                  </th>
                  <th className="px-4 py-2 font-bold text-white ">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#4444444]">
                {currentData.metrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-[#303030]">
                    <td className="px-4 py-1 text-gray-300 border-r-2 border-[#444444]">
                      {metric.label}
                    </td>
                    <td
                      className={`px-4 py-1  font-bold border-r-2 border-[#444444] ${getStatusColor(metric.status)}`}
                    >
                      {metric.value}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2 capitalize font-bold text-gray-300">
                        {getStatusIcon(metric.status)}
                        <span>{metric.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Diagnostics & Opportunities */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center  pb-1">
            <span className="w-2 mr-3 inline-block">{"#"}</span>
            Diagnostic Opportunities
          </h2>
          <div className="space-y-3">
            {AUDIT_DATA.insights.map((item, idx) => (
              <div
                key={idx}
                className={`bg-[#252525] rounded-2xl border border-[#444444] border-l-4 p-4 ${getStatusBorder(item.status)}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <h3 className="text-[15px] font-bold text-white flex items-start gap-2">
                    {item.status === "fail" ? (
                      <XCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    )}
                    {item.title}
                  </h3>
                  {item.savings && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1  text-[12px] rounded-2xl  text-yellow-200 font-bold whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" /> Est. savings:{" "}
                      {item.savings}
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-gray-300 leading-relaxed ml-7">
                  {item.description}
                </p>
                <div className="mt-2 ml-7">
                  <span className="text-[12px]  text-white">
                    Category: {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Passed Audits (Summarized) */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center border-b-2 border-[#cccccc] pb-1">
            <span className="w-2  mr-3 inline-block">{"#"}</span>
            Passed Audits
          </h2>
          <div className="rounded-2xl border border-[#181818] bg-[#252525] p-4">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {AUDIT_DATA.passed.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
