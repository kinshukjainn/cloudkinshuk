"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
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

interface ToolCardProps {
  section: ToolSection;
  index: number;
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

const ToolCard: React.FC<ToolCardProps> = ({ section, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const CategoryIcon = section.icon;

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(20px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${index * 0.1}s`,
      }}
    >
      <div className="group border-l-2 border-neutral-300 hover:border-blue-600 transition-colors duration-200">
        <div className="pl-3 sm:pl-4 pb-4 sm:pb-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-200 flex items-center justify-center">
              <CategoryIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold text-neutral-800 uppercase tracking-wider">
              {section.category}
            </h2>
            <span className="ml-auto text-[10px] sm:text-xs text-neutral-500 font-mono">
              [{section.items.length}]
            </span>
          </div>

          {/* Items */}
          <div className="space-y-2 sm:space-y-2.5">
            {section.items.map((item: ToolItem, idx: number) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="group/item flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border border-neutral-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ItemIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-600 group-hover/item:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-neutral-900 font-medium mb-0.5">
                      {item.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-neutral-600 font-mono">
                      {item.spec}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DevToolsCompact() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const totalTools = setupData.reduce(
    (acc, section) => acc + section.items.length,
    0,
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header
        ref={headerRef}
        className="border-b border-neutral-300"
        style={{
          transform: isHeaderInView ? "none" : "translateY(-20px)",
          opacity: isHeaderInView ? 1 : 0,
          transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-block px-2 py-1 bg-blue-600 mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider">
                  DEVELOPMENT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight">
                Development Stack
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-xl font-mono">
                Tools and technologies powering my development workflow
              </p>
            </div>
            <div className="flex gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 font-mono">
                  {totalTools}
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                  Tools
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 font-mono">
                  {setupData.length}
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                  Categories
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {setupData.map((section: ToolSection, index: number) => (
            <ToolCard key={section.category} section={section} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-300 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
              <span className="text-[10px] sm:text-xs text-neutral-600 font-mono">
                Last updated: 2025
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">
              Built with Next.js 16 • React • Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
