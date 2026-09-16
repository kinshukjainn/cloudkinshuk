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
  ChevronLeft,
  ChevronRight,
  CornerLeftUp,
  GitBranch,
  type LucideIcon,
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
// Utilities
// ============================================================================

const formatBytes = (bytes: number = 0, decimals = 1) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const getFileInfo = (filename: string): { lang: string; Icon: LucideIcon } => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "js":
    case "jsx":
      return { lang: "JavaScript", Icon: FileCode2 };
    case "ts":
    case "tsx":
      return { lang: "TypeScript", Icon: FileCode2 };
    case "json":
      return { lang: "JSON", Icon: FileJson };
    case "html":
      return { lang: "HTML", Icon: FileCode2 };
    case "css":
      return { lang: "CSS", Icon: FileCode2 };
    case "md":
      return { lang: "Markdown", Icon: FileText };
    case "png":
    case "jpg":
    case "svg":
      return { lang: "Image", Icon: ImageIcon };
    case "sh":
      return { lang: "Shell", Icon: Terminal };
    case "sql":
      return { lang: "SQL", Icon: Database };
    case "lock":
      return { lang: "Lockfile", Icon: FileBox };
    default:
      return { lang: "Text", Icon: DefaultFile };
  }
};

// ============================================================================
// Main Component
// ============================================================================

export default function RepositoryViewer() {
  const [treeData, setTreeData] = useState<GithubTreeItem[]>([]);
  const [isLoadingTree, setIsLoadingTree] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"tree" | "blob">("tree");
  const [currentPath, setCurrentPath] = useState<string>("");

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

  const goUp = () => {
    const parts = currentPath.split("/");
    parts.pop();
    jumpToPath(parts.join("/"));
  };

  const currentItems = useMemo(() => {
    const items = treeData.filter((item) => {
      if (currentPath === "" || viewMode === "blob") {
        return !item.path.includes("/");
      }
      const prefix = currentPath + "/";
      if (!item.path.startsWith(prefix)) return false;
      return !item.path.slice(prefix.length).includes("/");
    });

    return items.sort((a, b) => {
      if (a.type === b.type) return a.path.localeCompare(b.path);
      return a.type === "tree" ? -1 : 1;
    });
  }, [treeData, currentPath, viewMode]);

  const pathBreadcrumbs = currentPath.split("/").filter(Boolean);
  const currentFileName = pathBreadcrumbs[pathBreadcrumbs.length - 1] ?? "";

  return (
    <div className="min-h-screen bg-white text-[#1f1f1f] selection:bg-[#d3e3fd] selection:text-[#0842a0] dark:bg-[#1f1f1f] dark:text-[#e3e3e3] dark:selection:bg-[#004a77] dark:selection:text-[#d3e3fd]">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* ============ HEADER ============ */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/git-track"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-3.5 py-2 text-xs font-medium text-[#0b57d0] transition-colors hover:bg-[#f0f4f9] dark:border-[#444746] dark:text-[#a8c7fa] dark:hover:bg-[#282a2c]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to commits
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f4f9] px-3 py-1.5 text-xs font-medium text-[#444746] dark:bg-[#282a2c] dark:text-[#c4c7c5]">
              <Folder className="h-3.5 w-3.5 text-[#0b57d0] dark:text-[#a8c7fa]" />
              {GITHUB_CONFIG.repository}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f4f9] px-3 py-1.5 text-xs font-medium text-[#444746] dark:bg-[#282a2c] dark:text-[#c4c7c5]">
              <GitBranch className="h-3.5 w-3.5" />
              {GITHUB_CONFIG.branch}
            </span>
          </div>
        </header>

        {/* ============ TITLE ============ */}
        <section className="mb-5">
          <h1 className="text-4xl font-bold h-font tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] md:text-3xl">
            Repository Explorer
          </h1>
          <p className="mt-1 text-sm text-[#444746] dark:text-[#c4c7c5]">
            Browse files and directories in the repository.
          </p>
        </section>

        {/* ============ BREADCRUMB CHIP RAIL ============ */}
        <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => jumpToPath("")}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              pathBreadcrumbs.length === 0
                ? "bg-[#d3e3fd] text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]"
                : "bg-[#f0f4f9] text-[#444746] hover:bg-[#e8eef7] dark:bg-[#282a2c] dark:text-[#c4c7c5] dark:hover:bg-[#2f3133]"
            }`}
          >
            {GITHUB_CONFIG.repository}
          </button>

          {pathBreadcrumbs.map((part, index) => {
            const buildPath = pathBreadcrumbs.slice(0, index + 1).join("/");
            const isLast = index === pathBreadcrumbs.length - 1;
            const isFile = isLast && viewMode === "blob";

            return (
              <React.Fragment key={buildPath}>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#c4c7c5] dark:text-[#444746]" />
                <button
                  type="button"
                  onClick={() => !isFile && jumpToPath(buildPath)}
                  disabled={isFile}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isLast
                      ? "bg-[#d3e3fd] text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]"
                      : "bg-[#f0f4f9] text-[#444746] hover:bg-[#e8eef7] dark:bg-[#282a2c] dark:text-[#c4c7c5] dark:hover:bg-[#2f3133]"
                  } ${isFile ? "cursor-default" : ""}`}
                >
                  {part}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* ============ ERROR ============ */}
        {error && (
          <div className="mb-4 rounded-2xl border border-[#f6aea9] bg-[#fce8e6] px-4 py-3 text-sm font-medium text-[#8c1d18] dark:border-[#8c1d18] dark:bg-[#2a1215] dark:text-[#f6aea9]">
            {error}
          </div>
        )}

        {/* ============ MAIN CARD ============ */}
        <section className="overflow-hidden rounded-3xl bg-[#f0f4f9] dark:bg-[#1e1f21]">
          {/* Card header */}
          <div className="flex items-center justify-between gap-3 border-b border-[#e0e3e7] px-5 py-4 dark:border-[#2d2f31]">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0b57d0] dark:bg-[#282a2c] dark:text-[#a8c7fa]">
                {viewMode === "tree" ? (
                  <Folder className="h-4 w-4" />
                ) : (
                  <FileCode2 className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                  {viewMode === "tree" ? "Directory" : "File"}
                </p>
                <h2 className="truncate text-sm font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">
                  {viewMode === "tree"
                    ? currentFileName || GITHUB_CONFIG.repository
                    : currentFileName}
                </h2>
              </div>
            </div>

            {viewMode === "tree" && !isLoadingTree && (
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[#747775] dark:bg-[#282a2c] dark:text-[#8e918f]">
                {currentItems.length}{" "}
                {currentItems.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {/* Card body */}
          {viewMode === "tree" ? (
            <>
              {isLoadingTree ? (
                <div className="p-10 text-center text-sm text-[#747775] dark:text-[#8e918f]">
                  Fetching repository structure…
                </div>
              ) : (
                <ul className="divide-y divide-[#e0e3e7] dark:divide-[#2d2f31]">
                  {currentPath !== "" && (
                    <li>
                      <button
                        type="button"
                        onClick={goUp}
                        className="group flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white dark:hover:bg-[#282a2c]"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0b57d0] dark:bg-[#282a2c] dark:text-[#a8c7fa]">
                          <CornerLeftUp className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium text-[#444746] transition-colors group-hover:text-[#0b57d0] dark:text-[#c4c7c5] dark:group-hover:text-[#a8c7fa]">
                          Go up a directory
                        </span>
                      </button>
                    </li>
                  )}

                  {currentItems.length === 0 && (
                    <li className="px-5 py-10 text-center text-sm text-[#747775] dark:text-[#8e918f]">
                      This directory is empty.
                    </li>
                  )}

                  {currentItems.map((item) => {
                    const itemName = item.path.split("/").pop() || item.path;
                    const isFolder = item.type === "tree";

                    const { lang, Icon } = isFolder
                      ? { lang: "Folder", Icon: Folder }
                      : getFileInfo(itemName);

                    return (
                      <li key={item.sha}>
                        <button
                          type="button"
                          onClick={() => handleNavigate(item.path, item.type)}
                          className="group flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white dark:hover:bg-[#282a2c]"
                        >
                          {/* Icon chip */}
                          <span
                            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              isFolder
                                ? "bg-[#d3e3fd] text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]"
                                : "bg-white text-[#444746] dark:bg-[#282a2c] dark:text-[#c4c7c5]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>

                          {/* Name */}
                          <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#1f1f1f] transition-colors group-hover:text-[#0b57d0] dark:text-[#e3e3e3] dark:group-hover:text-[#a8c7fa]">
                            {itemName}
                          </span>

                          {/* Metadata (desktop only) */}
                          <span className="hidden shrink-0 items-center gap-3 sm:flex">
                            <span className="text-[11px] font-medium uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                              {lang}
                            </span>
                            <span className="w-16 text-right text-[11px] tabular-nums text-[#747775] dark:text-[#8e918f]">
                              {isFolder ? "—" : formatBytes(item.size)}
                            </span>
                          </span>

                          <ChevronRight className="h-4 w-4 shrink-0 text-[#c4c7c5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#0b57d0] dark:text-[#444746] dark:group-hover:text-[#a8c7fa]" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          ) : (
            <>
              {isFileLoading ? (
                <div className="p-10 text-center text-sm text-[#747775] dark:text-[#8e918f]">
                  Loading file contents…
                </div>
              ) : (
                <div className="overflow-x-auto px-5 py-5">
                  <pre className="whitespace-pre font-mono text-xs leading-6 text-[#1f1f1f] dark:text-[#e3e3e3] sm:text-[13px]">
                    <code>{fileContent}</code>
                  </pre>
                </div>
              )}

              <div className="border-t border-[#e0e3e7] px-5 py-4 dark:border-[#2d2f31]">
                <button
                  type="button"
                  onClick={goUp}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-4 py-2 text-xs font-medium text-[#0b57d0] transition-colors hover:bg-white dark:border-[#444746] dark:text-[#a8c7fa] dark:hover:bg-[#282a2c]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Return to folder
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
