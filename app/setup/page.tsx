"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="mb-12"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-5 border-b border-[#444] pb-2">
        <CategoryIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
        <h2 className="text-xl font-medium text-white tracking-tight">
          {section.category}
        </h2>
        <span className="ml-auto text-xs font-medium text-gray-500 bg-[#282828] px-2 py-0.5 rounded-sm border border-[#444]">
          {section.items.length} items
        </span>
      </div>

      {/* Clean List Layout */}
      <ul className="space-y-4">
        {section.items.map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <li key={idx} className="flex items-start gap-4 group">
              <div className="mt-0.5 text-gray-500 group-hover:text-green-500 transition-colors">
                <ItemIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base text-gray-200 font-medium leading-snug group-hover:text-white transition-colors">
                  {item.name}
                </div>
                <div className="text-sm text-gray-400 mt-0.5 leading-snug">
                  {item.spec}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
};

export default function DevToolsCompact() {
  const totalTools = setupData.reduce(
    (acc, section) => acc + section.items.length,
    0,
  );

  return (
    <div className="min-h-screen bg-[#313131] text-gray-100  selection:bg-green-500 selection:text-black pt-16 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 md:mb-16 border-b border-[#444] pb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
              Development Stack
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mb-6">
              A comprehensive overview of the hardware, software, and services
              powering my daily workflow and infrastructure.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="text-green-500">{totalTools}</span> Active
                Tools
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-white">{setupData.length}</span>{" "}
                Categories
              </div>
            </div>
          </motion.div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {setupData.map((section, index) => (
            <ToolCategory
              key={section.category}
              section={section}
              index={index}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#444] pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Environment active and up to date</span>
            </div>
            <div>Built with Next.js • React • Tailwind</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
