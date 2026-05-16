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
import AmbientBackground from "../components/Backgroundcomp";

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
      {
        name: "AWS (amplify , route53 , neondb)",
        spec: "Cloud infrastructure",
        icon: Cloud,
      },
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

const ToolCategory = ({ section }: { section: ToolSection; index: number }) => {
  const CategoryIcon = section.icon;

  return (
    <section className="mb-6 border border-[#444444] rounded-2xl bg-black overflow-hidden">
      {/* Category Header */}
      <div className="flex items-center justify-between bg-[#181818] border-b border-[#444444] px-4 py-3">
        <div className="flex items-center gap-2">
          <CategoryIcon className="w-4 h-4 text-white flex-shrink-0" />
          <h2 className="text-[16px] font-bold text-white">
            {section.category}
          </h2>
        </div>
        <span className="text-[12px] font-bold text-blue-400 border border-blue-500/30 bg-[#222222] px-2 py-0.5 rounded-full">
          {section.items.length} items
        </span>
      </div>

      {/* Clean Boxy List Layout */}
      <ul className="divide-y divide-[#444444]">
        {section.items.map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <li
              key={idx}
              className="flex items-start gap-3 p-4 hover:bg-[#181818] transition-colors group"
            >
              <div className="mt-0.5 text-[#888888] group-hover:text-blue-400 transition-colors">
                <ItemIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[#e0e0e0] group-hover:text-white transition-colors">
                  {item.name}
                </div>
                <div className="text-[12px] text-[#888888] mt-0.5">
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
    <div className="relative min-h-screen bg-black text-[#cccccc] selection:bg-green-500/30 selection:text-green-200 overflow-hidden">
      {/* Background Component */}
      <AmbientBackground />

      {/* Content Wrapper */}
      <div className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
          {/* Header */}
          <header className="mb-10 p-2 sm:p-6">
            <h1 className="text-[130px] sm:text-[100px] font-bold text-white mb-5 title-font flex items-center tracking-tight">
              <span className="text-green-500">Setup</span>
              <span className="ml-2">i use</span>
            </h1>
            <p className="text-[15px] sm:text-md text-[#cccccc] leading-relaxed max-w-2xl pl-4 mb-6">
              A comprehensive overview of the hardware, software, and services
              powering my daily workflow and infrastructure.
            </p>

            <div className="inline-flex flex-wrap rounded-xl items-center gap-3 text-[13px] border border-[#444444]  px-4 py-2">
              <div>
                <strong className="text-white text-sm">{totalTools}</strong>{" "}
                Active Tools
              </div>
              <span className="text-[#555555] font-bold">|</span>
              <div>
                <strong className="text-white text-sm">
                  {setupData.length}
                </strong>{" "}
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
        </div>
      </div>
    </div>
  );
}
