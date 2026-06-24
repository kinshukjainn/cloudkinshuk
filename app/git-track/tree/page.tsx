"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Folder,
  FileCode2,
  FileText,
  FileJson,
  Image as ImageIcon,
  Terminal,
  FileBox,
  Database,
  File as DefaultFile,
  ArrowLeft,
  CornerLeftUp,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// Configuration & Types
// ============================================================================

const GITHUB_CONFIG = {
  username: "kinshukjainn",
  repository: "cloudkinshuk",
  branch: "main",
};

interface GithubTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

// ============================================================================
// Utility Functions
// ============================================================================

const formatBytes = (bytes: number = 0, decimals = 1) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const getFileInfo = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  const iconProps = { size: 20, className: "shrink-0" };

  switch (ext) {
    case "js":
    case "jsx":
      return {
        lang: "JavaScript",
        icon: <FileCode2 {...iconProps} className="text-yellow-400" />,
      };
    case "ts":
    case "tsx":
      return {
        lang: "TypeScript",
        icon: <FileCode2 {...iconProps} className="text-blue-400" />,
      };
    case "json":
      return {
        lang: "JSON",
        icon: <FileJson {...iconProps} className="text-green-400" />,
      };
    case "html":
      return {
        lang: "HTML",
        icon: <FileCode2 {...iconProps} className="text-orange-500" />,
      };
    case "css":
      return {
        lang: "CSS",
        icon: <FileCode2 {...iconProps} className="text-indigo-400" />,
      };
    case "md":
      return {
        lang: "Markdown",
        icon: <FileText {...iconProps} className="text-zinc-300" />,
      };
    case "png":
    case "jpg":
    case "svg":
      return {
        lang: "Image",
        icon: <ImageIcon {...iconProps} className="text-purple-400" />,
      };
    case "sh":
      return {
        lang: "Shell",
        icon: <Terminal {...iconProps} className="text-green-500" />,
      };
    case "sql":
      return {
        lang: "SQL",
        icon: <Database {...iconProps} className="text-amber-500" />,
      };
    case "lock":
      return {
        lang: "Lockfile",
        icon: <FileBox {...iconProps} className="text-zinc-500" />,
      };
    default:
      return {
        lang: "Text",
        icon: <DefaultFile {...iconProps} className="text-zinc-400" />,
      };
  }
};

// ============================================================================
// Main Component
// ============================================================================

export default function RepositoryViewer() {
  const [treeData, setTreeData] = useState<GithubTreeItem[]>([]);
  const [isLoadingTree, setIsLoadingTree] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // -- View States --
  const [viewMode, setViewMode] = useState<"tree" | "blob">("tree");
  const [currentPath, setCurrentPath] = useState<string>("");

  // -- File Content States --
  const [fileContent, setFileContent] = useState<string>("");
  const [isFileLoading, setIsFileLoading] = useState(false);

  useEffect(() => {
    fetchRepositoryTree();
  }, []);

  // 1. Fetch the entire folder structure once
  const fetchRepositoryTree = async () => {
    setIsLoadingTree(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/git/trees/${GITHUB_CONFIG.branch}?recursive=1`,
        { headers: { Accept: "application/vnd.github.v3+json" } },
      );
      if (!response.ok) throw new Error("Failed to fetch repository tree.");
      const data = await response.json();
      setTreeData(data.tree);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoadingTree(false);
    }
  };

  // 2. Fetch the actual code on-the-fly when a file is clicked
  const fetchFileContent = async (filePath: string) => {
    setIsFileLoading(true);
    setError(null);
    try {
      // Using GitHub's raw content URL for direct text retrieval
      const response = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/${GITHUB_CONFIG.branch}/${filePath}`,
      );
      if (!response.ok) throw new Error("Failed to load file content.");
      const text = await response.text();
      setFileContent(text);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unknown error reading file",
      );
    } finally {
      setIsFileLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // Navigation
  // --------------------------------------------------------------------------

  const handleNavigate = (path: string, type: "blob" | "tree") => {
    setCurrentPath(path);
    if (type === "tree") {
      setViewMode("tree");
    } else {
      setViewMode("blob");
      fetchFileContent(path);
    }
  };

  const jumpToPath = (path: string) => {
    setCurrentPath(path);
    setViewMode("tree"); // Always default back to tree when clicking a breadcrumb folder
  };

  // Filter items for current directory view
  const currentItems = useMemo(() => {
    const items = treeData.filter((item) => {
      if (currentPath === "" || viewMode === "blob") {
        return !item.path.includes("/");
      } else {
        const prefix = currentPath + "/";
        if (!item.path.startsWith(prefix)) return false;
        return !item.path.slice(prefix.length).includes("/");
      }
    });

    return items.sort((a, b) => {
      if (a.type === b.type) return a.path.localeCompare(b.path);
      return a.type === "tree" ? -1 : 1;
    });
  }, [treeData, currentPath, viewMode]);

  const pathBreadcrumbs = currentPath.split("/").filter(Boolean);

  return (
    <div className="min-h-screen bg-[#161923] text-zinc-300  selection:bg-green-700/30 selection:text-green-200">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        {/* ── TOP HEADER ── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl sm:text-4xl font-normal text-white flex items-center gap-3">
            <Folder className="w-8 h-8 text-green-500" />
            Repository Explorer
          </h1>
          <Link
            href="/git-track"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b1f2b] hover:bg-zinc-800 border border-zinc-700 rounded-md text-sm font-medium text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Commits
          </Link>
        </div>

        {/* ── META INFO BLOCK ── */}
        <div className="bg-[#1b1f2b] border border-zinc-800 rounded-md p-4 sm:p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 sm:gap-x-4 text-sm">
            <div className="text-zinc-500 font-medium uppercase tracking-wider text-xs sm:text-sm pt-1">
              Repository
            </div>
            <div className="font-medium text-white text-base">
              {GITHUB_CONFIG.username} /{" "}
              <span className="text-green-400">{GITHUB_CONFIG.repository}</span>
            </div>

            <div className="text-zinc-500 font-medium uppercase tracking-wider text-xs sm:text-sm pt-1">
              Current Path
            </div>
            <div className="flex flex-wrap items-center gap-2 text-base font-medium">
              <span
                onClick={() => jumpToPath("")}
                className="text-zinc-300 hover:text-green-400 cursor-pointer transition-colors"
              >
                {GITHUB_CONFIG.repository}
              </span>
              {pathBreadcrumbs.map((part, index) => {
                const buildPath = pathBreadcrumbs.slice(0, index + 1).join("/");
                const isLast = index === pathBreadcrumbs.length - 1;
                const isCurrentFile = isLast && viewMode === "blob";

                return (
                  <React.Fragment key={buildPath}>
                    <span className="text-zinc-600">/</span>
                    <span
                      onClick={() => !isCurrentFile && jumpToPath(buildPath)}
                      className={
                        isCurrentFile
                          ? "text-white font-medium"
                          : "text-zinc-300 hover:text-green-400 cursor-pointer transition-colors"
                      }
                    >
                      {part}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── ERROR DISPLAY ── */}
        {error && (
          <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-md text-red-400 font-medium mb-6">
            Error: {error}
          </div>
        )}

        {/* ── MAIN CONTENT AREA ── */}
        <div className="bg-[#1b1f2b] border border-zinc-800 rounded-md overflow-hidden shadow-sm">
          {/* Section Header */}
          <div className="bg-black/20 border-b border-zinc-800 py-3 px-4 sm:px-6">
            <h2 className="text-sm font-medium text-white uppercase tracking-wider">
              {viewMode === "tree" ? "Directory Contents" : "File View"}
            </h2>
          </div>

          {/* ── TREE VIEW ── */}
          {viewMode === "tree" ? (
            <div className="w-full flex flex-col">
              {isLoadingTree ? (
                <div className="p-8 text-center text-zinc-500 font-medium animate-pulse">
                  Fetching repository structure...
                </div>
              ) : (
                <>
                  {currentPath !== "" && (
                    <div
                      onClick={() => {
                        const pathParts = currentPath.split("/");
                        pathParts.pop();
                        jumpToPath(pathParts.join("/"));
                      }}
                      className="flex items-center py-3 px-4 sm:px-6 hover:bg-[#222736] transition-colors gap-3 sm:gap-4 cursor-pointer border-b border-zinc-800/50"
                    >
                      <div className="w-8 flex justify-center items-center">
                        <CornerLeftUp size={20} className="text-zinc-500" />
                      </div>
                      <div className="text-zinc-400 font-medium hover:text-white transition-colors">
                        Go up a directory
                      </div>
                    </div>
                  )}

                  {currentItems.map((item) => {
                    const itemName = item.path.split("/").pop() || item.path;
                    const isFolder = item.type === "tree";
                    const { lang, icon } = isFolder
                      ? {
                          lang: "Directory",
                          icon: (
                            <Folder
                              size={20}
                              className="text-blue-400 fill-blue-400/20 shrink-0"
                            />
                          ),
                        }
                      : getFileInfo(itemName);

                    return (
                      <div
                        key={item.sha}
                        onClick={() => handleNavigate(item.path, item.type)}
                        className="group flex flex-col sm:flex-row sm:items-center py-3 px-4 sm:px-6 hover:bg-[#222736] transition-colors gap-2 sm:gap-4 cursor-pointer border-b border-zinc-800/50 last:border-0"
                      >
                        <div className="flex-1 min-w-0 flex items-center gap-4">
                          <div className="w-8 flex justify-center items-center shrink-0">
                            {icon}
                          </div>
                          <span
                            className={`truncate text-sm sm:text-base transition-colors ${
                              isFolder
                                ? "text-green-400 font-medium group-hover:text-green-300"
                                : "text-zinc-200 font-medium group-hover:text-white"
                            }`}
                          >
                            {itemName}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-6 shrink-0 text-sm pl-12 sm:pl-0">
                          <span className="text-zinc-500 hidden sm:block w-24 text-right">
                            {lang}
                          </span>
                          <span className="text-zinc-500 w-20 text-right font-medium">
                            {isFolder ? "--" : formatBytes(item.size)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          ) : (
            /* ── BLOB (CODE) VIEW ── */
            <div className="w-full flex flex-col">
              {isFileLoading ? (
                <div className="p-8 text-center text-zinc-500 font-medium animate-pulse">
                  Loading file contents...
                </div>
              ) : (
                <div className="overflow-x-auto bg-[#161923] p-4 sm:p-6">
                  <pre className="text-sm text-zinc-300 leading-relaxed ">
                    <code>{fileContent}</code>
                  </pre>
                </div>
              )}

              <div className="p-4 sm:p-6 border-t border-zinc-800 bg-[#1b1f2b]">
                <button
                  onClick={() => {
                    const pathParts = currentPath.split("/");
                    pathParts.pop();
                    jumpToPath(pathParts.join("/"));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Return to Folder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
