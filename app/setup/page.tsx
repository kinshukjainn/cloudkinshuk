"use client";

import React from "react";
import {
  Monitor,
  Settings,
  Code2,
  FileCode,
  Palette,
  Zap,
  Shield,
  Laptop,
  Terminal,
  Github,
  Cloud,
  Lock,
  Type,
  Box,
  LucideIcon,
} from "lucide-react";

interface ToolItem {
  name: string;
  spec: string;
  icon: LucideIcon;
}

interface ToolSection {
  category: string;
  icon: LucideIcon;
  items: ToolItem[];
}

const setupData: ToolSection[] = [
  {
    category: "Hardware",
    icon: Monitor,
    items: [
      { name: "Acer Swift 3", spec: "i5 EVO • 8GB • 512GB SSD", icon: Laptop },
      { name: "Windows 11 Home", spec: "Primary OS", icon: Monitor },
      { name: "Mechanical Keyboard", spec: "Premium typing", icon: Settings },
      { name: "Wired Mouse", spec: "High precision", icon: Settings },
    ],
  },
  {
    category: "Development",
    icon: Code2,
    items: [
      { name: "VS Code", spec: "Primary editor", icon: FileCode },
      { name: "Git & GitHub", spec: "Version control", icon: Github },
      { name: "WSL2 Ubuntu", spec: "Linux environment", icon: Terminal },
      { name: "AWS (EC2, RDS)", spec: "Cloud infrastructure", icon: Cloud },
      { name: "Docker", spec: "Containerization", icon: Box },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    items: [
      { name: "Figma", spec: "UI/UX design", icon: Palette },
      { name: "Google Fonts", spec: "Typography", icon: Type },
      { name: "Tailwind CSS", spec: "Styling framework", icon: Zap },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    items: [
      { name: "GitHub Security", spec: "Code scanning", icon: Shield },
      { name: "SSL/TLS", spec: "Encryption", icon: Lock },
    ],
  },
];

const ToolCategory = ({
  section,
  index,
}: {
  section: ToolSection;
  index: number;
}) => {
  const CategoryIcon = section.icon;

  return (
    <section className="mb-6 border border-[#cccccc] bg-white">
      {/* Category Header */}
      <div className="flex items-center justify-between bg-[#eeeeee] border-b border-[#cccccc] px-3 py-2">
        <div className="flex items-center gap-2">
          <CategoryIcon className="w-4 h-4 text-[#006600] flex-shrink-0" />
          <h2 className="text-[16px] font-bold text-[#333333]">
            {section.category}
          </h2>
        </div>
        <span className="text-[12px] font-mono text-[#666666] bg-white border border-[#cccccc] px-1">
          [{section.items.length} items]
        </span>
      </div>

      {/* Clean Boxy List Layout */}
      <ul className="divide-y divide-[#eeeeee]">
        {section.items.map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 hover:bg-[#fafffa] transition-none group"
            >
              <div className="mt-0.5 text-[#666666] group-hover:text-[#006600]">
                <ItemIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[#333333] group-hover:underline">
                  {item.name}
                </div>
                <div className="text-[12px] font-mono text-[#666666] mt-0.5">
                  {item.spec}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default function DevToolsCompact() {
  const totalTools = setupData.reduce(
    (acc, section) => acc + section.items.length,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-[#333333]  selection:bg-[#006600] selection:text-white pb-16">
      {/* Top Green Bar */}
      <div className="h-2 w-full bg-[#006600]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Header */}
        <header className="mb-8 border border-[#cccccc] bg-[#f9f9f9] p-5 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-4 flex items-center">
            <span className="w-3 h-6 bg-[#006600] mr-3 inline-block"></span>
            Development Stack
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#444444] leading-relaxed max-w-2xl border-l-4 border-[#cccccc] pl-3 mb-5">
            A comprehensive overview of the hardware, software, and services
            powering my daily workflow and infrastructure.
          </p>

          <div className="inline-flex flex-wrap items-center gap-3 text-[13px] font-mono bg-white border border-[#cccccc] p-2">
            <div>
              <strong className="text-[#006600]">{totalTools}</strong> Active
              Tools
            </div>
            <span className="text-[#cccccc]">|</span>
            <div>
              <strong className="text-[#333333]">{setupData.length}</strong>{" "}
              Categories
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {setupData.map((section, index) => (
            <ToolCategory
              key={section.category}
              section={section}
              index={index}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-4 border-t border-[#cccccc] bg-[#f9f9f9] border-b">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#666666] font-mono p-4">
            <div className="flex items-center gap-2">
              {/* Removed the CSS pulse animation for a static, software-like status block */}
              <div className="w-2 h-2 bg-[#006600] border border-[#004400]"></div>
              <span>[Status: Environment active and up to date]</span>
            </div>
            <div>Built with Next.js • React • Tailwind</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
