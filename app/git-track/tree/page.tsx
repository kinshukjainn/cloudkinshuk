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
  const iconProps = {
    size: 18,
    className: "shrink-0 text-neutral-500 dark:text-neutral-400",
  };

  switch (ext) {
    case "js":
    case "jsx":
      return { lang: "JavaScript", icon: <FileCode2 {...iconProps} /> };
    case "ts":
    case "tsx":
      return { lang: "TypeScript", icon: <FileCode2 {...iconProps} /> };
    case "json":
      return { lang: "JSON", icon: <FileJson {...iconProps} /> };
    case "html":
      return { lang: "HTML", icon: <FileCode2 {...iconProps} /> };
    case "css":
      return { lang: "CSS", icon: <FileCode2 {...iconProps} /> };
    case "md":
      return { lang: "Markdown", icon: <FileText {...iconProps} /> };
    case "png":
    case "jpg":
    case "svg":
      return { lang: "Image", icon: <ImageIcon {...iconProps} /> };
    case "sh":
      return { lang: "Shell", icon: <Terminal {...iconProps} /> };
    case "sql":
      return { lang: "SQL", icon: <Database {...iconProps} /> };
    case "lock":
      return { lang: "Lockfile", icon: <FileBox {...iconProps} /> };
    default:
      return { lang: "Text", icon: <DefaultFile {...iconProps} /> };
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

  const fetchFileContent = async (filePath: string) => {
    setIsFileLoading(true);
    setError(null);
    try {
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
    setViewMode("tree");
  };

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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-800 dark:text-neutral-300 selection:bg-blue-200 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100">
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
        {/* ── TOP HEADER ── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-300 dark:border-neutral-800 pb-4">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Folder className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            Repository Explorer
          </h1>
          <Link
            href="/git-track"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm font-semibold text-neutral-900 dark:text-neutral-100 rounded-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Commits
          </Link>
        </div>

        {/* ── META INFO BLOCK ── */}
        <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-4 sm:p-6 mb-8 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 sm:gap-x-4">
            <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-xs pt-1">
              Repository
            </div>
            <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
              {GITHUB_CONFIG.username} /{" "}
              <span className="text-blue-600 dark:text-blue-500">
                {GITHUB_CONFIG.repository}
              </span>
            </div>

            <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-xs pt-1">
              Current Path
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              <span
                onClick={() => jumpToPath("")}
                className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              >
                {GITHUB_CONFIG.repository}
              </span>
              {pathBreadcrumbs.map((part, index) => {
                const buildPath = pathBreadcrumbs.slice(0, index + 1).join("/");
                const isLast = index === pathBreadcrumbs.length - 1;
                const isCurrentFile = isLast && viewMode === "blob";

                return (
                  <React.Fragment key={buildPath}>
                    <span className="text-neutral-400 dark:text-neutral-600">
                      /
                    </span>
                    <span
                      onClick={() => !isCurrentFile && jumpToPath(buildPath)}
                      className={
                        isCurrentFile
                          ? "text-neutral-900 dark:text-neutral-100 font-bold"
                          : "text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
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
          <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-sm font-bold rounded-md mb-6">
            Error: {error}
          </div>
        )}

        {/* ── MAIN CONTENT AREA ── */}
        <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 rounded-md">
          {/* Section Header */}
          <div className="bg-neutral-200 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800 py-3 px-4 sm:px-6">
            <h2 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">
              {viewMode === "tree" ? "Directory Contents" : "File View"}
            </h2>
          </div>

          {/* ── TREE VIEW ── */}
          {viewMode === "tree" ? (
            <div className="w-full flex flex-col">
              {isLoadingTree ? (
                <div className="p-8 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
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
                      className="flex items-center py-3 px-4 sm:px-6 hover:bg-white dark:hover:bg-neutral-900 gap-3 sm:gap-4 cursor-pointer border-b border-neutral-200 dark:border-neutral-800/80"
                    >
                      <div className="w-6 flex justify-center items-center">
                        <CornerLeftUp
                          size={18}
                          className="text-neutral-500 dark:text-neutral-400"
                        />
                      </div>
                      <div className="text-neutral-700 dark:text-neutral-300 font-semibold text-sm">
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
                              size={18}
                              className="text-blue-600 dark:text-blue-500 shrink-0"
                            />
                          ),
                        }
                      : getFileInfo(itemName);

                    return (
                      <div
                        key={item.sha}
                        onClick={() => handleNavigate(item.path, item.type)}
                        className="group flex flex-col sm:flex-row sm:items-center py-3 px-4 sm:px-6 hover:bg-white dark:hover:bg-neutral-900 gap-2 sm:gap-4 cursor-pointer border-b border-neutral-200 dark:border-neutral-800/80 last:border-0"
                      >
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                          <div className="w-6 flex justify-center items-center shrink-0">
                            {icon}
                          </div>
                          <span
                            className={`truncate text-sm ${
                              isFolder
                                ? "text-blue-700 dark:text-blue-400 font-bold"
                                : "text-neutral-900 dark:text-neutral-100 font-medium"
                            }`}
                          >
                            {itemName}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-6 shrink-0 text-xs font-semibold pl-9 sm:pl-0">
                          <span className="text-neutral-500 dark:text-neutral-500 hidden sm:block w-24 text-right uppercase tracking-widest">
                            {lang}
                          </span>
                          <span className="text-neutral-500 dark:text-neutral-500 w-20 text-right uppercase tracking-widest">
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
                <div className="p-8 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Loading file contents...
                </div>
              ) : (
                <div className="overflow-x-auto bg-white dark:bg-black p-4 sm:p-6">
                  <pre className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 font-mono leading-relaxed">
                    <code>{fileContent}</code>
                  </pre>
                </div>
              )}

              <div className="p-4 sm:p-6 border-t border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                <button
                  onClick={() => {
                    const pathParts = currentPath.split("/");
                    pathParts.pop();
                    jumpToPath(pathParts.join("/"));
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 px-5 py-2.5 text-sm font-bold text-neutral-900 dark:text-neutral-100 rounded-md"
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
