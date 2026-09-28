"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

/* ────────────────────────────────────────────────────────────
   Shape library — one shape per file category. Keeps the UI
   monochrome while still visually differentiating file types.
   ──────────────────────────────────────────────────────────── */
type Shape = {
  borderRadius: string;
  rotate: number;
  scaleX: number;
  scaleY: number;
};

const SHAPES: Shape[] = [
  { borderRadius: "32%", rotate: 0, scaleX: 1, scaleY: 1 }, // 0 · squircle   (folder)
  { borderRadius: "16%", rotate: 0, scaleX: 1, scaleY: 1 }, // 1 · soft square (code)
  { borderRadius: "50%", rotate: 0, scaleX: 1, scaleY: 1 }, // 2 · circle     (text)
  { borderRadius: "50% 4% 50% 4%", rotate: 0, scaleX: 1, scaleY: 1 }, // 3 · leaf (json)
  { borderRadius: "14%", rotate: 45, scaleX: 1, scaleY: 1 }, // 4 · diamond    (image)
  { borderRadius: "50%", rotate: 0, scaleX: 1.6, scaleY: 0.85 }, // 5 · pill (shell)
];

interface FileInfo {
  lang: string;
  Icon: LucideIcon;
  shapeIndex: number;
}

const getFileInfo = (filename: string): FileInfo => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "html":
    case "css":
      return { lang: "Code", Icon: FileCode2, shapeIndex: 1 };
    case "json":
      return { lang: "JSON", Icon: FileJson, shapeIndex: 3 };
    case "md":
      return { lang: "Markdown", Icon: FileText, shapeIndex: 2 };
    case "png":
    case "jpg":
    case "svg":
    case "webp":
    case "gif":
      return { lang: "Image", Icon: ImageIcon, shapeIndex: 4 };
    case "sh":
      return { lang: "Shell", Icon: Terminal, shapeIndex: 5 };
    case "sql":
      return { lang: "SQL", Icon: Database, shapeIndex: 3 };
    case "lock":
      return { lang: "Lockfile", Icon: FileBox, shapeIndex: 2 };
    default:
      return { lang: "Text", Icon: DefaultFile, shapeIndex: 2 };
  }
};

/* ────────────────────────────────────────────────────────────
   Design tokens — monochrome, borderless (matches whole site)
   ──────────────────────────────────────────────────────────── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const SUBTLE = "bg-[#F0F4F9] dark:bg-[#282A2C]";
const SOLID = "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] " +
  "focus-visible:ring-offset-0";

const STATE = "hover:bg-black/[0.06] dark:hover:bg-white/[0.10]";

/* ────────────────────────────────────────────────────────────
   Motion curves + springs (Material 3 Expressive)
   ──────────────────────────────────────────────────────────── */
const easeOut = [0.16, 1, 0.3, 1] as const;

const shapeSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.7,
};

/* ────────────────────────────────────────────────────────────
   ShapeIcon — atomic shape-morphing icon container
   ──────────────────────────────────────────────────────────── */
interface ShapeIconProps {
  shapeIndex: number;
  active: boolean;
  size?: number;
  children: React.ReactNode;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({
  shapeIndex,
  active,
  size = 36,
  children,
}) => {
  const reduceMotion = useReducedMotion();
  const shape = SHAPES[shapeIndex % SHAPES.length];
  const target = active
    ? shape
    : { borderRadius: "50%", rotate: 0, scaleX: 1, scaleY: 1 };

  return (
    <motion.span
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : {
              borderRadius: target.borderRadius,
              rotate: target.rotate,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
            }
      }
      transition={shapeSpring}
      style={{
        width: size,
        height: size,
        borderRadius: target.borderRadius,
        transform: `rotate(${target.rotate}deg) scale(${target.scaleX}, ${target.scaleY})`,
      }}
      className={`
        grid shrink-0 place-items-center
        ${active ? `${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]` : `${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]`}
      `}
    >
      {children}
    </motion.span>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export default function RepositoryViewer() {
  const reduceMotion = useReducedMotion();
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
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#1F1F1F] selection:text-white
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#E3E3E3] dark:selection:text-[#1F1F1F]
      "
    >
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* ============ HEADER ============ */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/git-track"
            className={`
              group inline-flex items-center gap-1.5 rounded-full
              py-2 pl-1.5 pr-3.5 text-xs font-semibold
              ${SURFACE} text-[#1F1F1F] dark:text-[#E3E3E3]
              transition-all duration-300 ${EASE}
              hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_28px_-14px_rgba(0,0,0,0.55)]
              dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_12px_28px_-14px_rgba(255,255,255,0.35)]
              active:scale-[0.96] active:rounded-[14px]
              ${FOCUS}
            `}
          >
            <span
              className={`
                grid h-6 w-6 shrink-0 place-items-center rounded-full
                ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                transition-all duration-300 ${SPRING}
                group-hover:rounded-[8px]
              `}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Back to commits
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-full
                py-1.5 pl-1.5 pr-3 text-[11px] font-semibold
                ${SURFACE} text-[#1F1F1F] dark:text-[#E3E3E3]
              `}
            >
              <span
                className={`
                  grid h-5 w-5 shrink-0 place-items-center rounded-full
                  ${SOLID}
                `}
              >
                <Folder className="h-3 w-3" aria-hidden="true" />
              </span>
              {GITHUB_CONFIG.repository}
            </span>
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-full
                py-1.5 pl-1.5 pr-3 text-[11px] font-semibold
                ${SURFACE} text-[#1F1F1F] dark:text-[#E3E3E3]
              `}
            >
              <span
                className={`
                  grid h-5 w-5 shrink-0 place-items-center rounded-full
                  ${SOLID}
                `}
              >
                <GitBranch className="h-3 w-3" aria-hidden="true" />
              </span>
              {GITHUB_CONFIG.branch}
            </span>
          </div>
        </header>

        {/* ============ TITLE ============ */}
        <section className="mb-5">
          <h1 className="text-4xl font-bold h-font tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3] md:text-3xl">
            Repository Explorer
          </h1>
          <p className="mt-1 text-sm text-[#444746] dark:text-[#C4C7C5]">
            Browse files and directories in the repository.
          </p>
        </section>

        {/* ============ BREADCRUMB CHIP RAIL ============ */}
        <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1">
          <motion.button
            type="button"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            onClick={() => jumpToPath("")}
            className={`
              shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold
              transition-colors duration-300 ${EASE}
              ${FOCUS}
              ${
                pathBreadcrumbs.length === 0
                  ? `${SOLID}`
                  : `${SUBTLE} text-[#444746] dark:text-[#C4C7C5] hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]`
              }
            `}
          >
            {GITHUB_CONFIG.repository}
          </motion.button>

          {pathBreadcrumbs.map((part, index) => {
            const buildPath = pathBreadcrumbs.slice(0, index + 1).join("/");
            const isLast = index === pathBreadcrumbs.length - 1;
            const isFile = isLast && viewMode === "blob";

            return (
              <React.Fragment key={buildPath}>
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-[#C4C7C5] dark:text-[#5F6368]"
                  aria-hidden="true"
                />
                <motion.button
                  type="button"
                  whileTap={
                    reduceMotion || isFile ? undefined : { scale: 0.95 }
                  }
                  onClick={() => !isFile && jumpToPath(buildPath)}
                  disabled={isFile}
                  className={`
                    shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold
                    transition-colors duration-300 ${EASE}
                    ${FOCUS}
                    ${
                      isLast
                        ? `${SOLID}`
                        : `${SUBTLE} text-[#444746] dark:text-[#C4C7C5] hover:text-[#1F1F1F] dark:hover:text-[#E3E3E3]`
                    }
                    ${isFile ? "cursor-default opacity-90" : ""}
                  `}
                >
                  {part}
                </motion.button>
              </React.Fragment>
            );
          })}
        </div>

        {/* ============ ERROR ============ */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: easeOut }}
              className={`
                mb-4 flex items-center gap-3 rounded-2xl
                ${SURFACE} px-4 py-3
              `}
            >
              <span
                className={`
                  grid h-8 w-8 shrink-0 place-items-center rounded-[10px]
                  ${SOLID}
                `}
              >
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ MAIN CARD ============ */}
        <section className={`overflow-hidden rounded-[28px] ${SURFACE}`}>
          {/* Card header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <ShapeIcon
                shapeIndex={viewMode === "tree" ? 0 : 1}
                active
                size={36}
              >
                {viewMode === "tree" ? (
                  <Folder className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <FileCode2 className="h-4 w-4" aria-hidden="true" />
                )}
              </ShapeIcon>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#747775] dark:text-[#8E918F]">
                  {viewMode === "tree" ? "Directory" : "File"}
                </p>
                <h2 className="truncate text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  {viewMode === "tree"
                    ? currentFileName || GITHUB_CONFIG.repository
                    : currentFileName}
                </h2>
              </div>
            </div>

            <AnimatePresence>
              {viewMode === "tree" && !isLoadingTree && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                  className={`
                    shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold
                    ${SUBTLE} text-[#444746] dark:text-[#C4C7C5]
                  `}
                >
                  {currentItems.length}{" "}
                  {currentItems.length === 1 ? "item" : "items"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Card body */}
          {viewMode === "tree" ? (
            <>
              {isLoadingTree ? (
                <div className="p-10 text-center text-sm text-[#747775] dark:text-[#8E918F]">
                  Fetching repository structure…
                </div>
              ) : (
                <ul className="px-2 pb-2">
                  <AnimatePresence initial={false}>
                    {currentPath !== "" && (
                      <motion.li
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.24, ease: easeOut }}
                      >
                        <button
                          type="button"
                          onClick={goUp}
                          className={`
                            group flex w-full items-center gap-3 rounded-[18px]
                            px-3 py-3 text-left
                            transition-colors duration-300 ${EASE}
                            ${STATE} ${FOCUS}
                          `}
                        >
                          <ShapeIcon shapeIndex={0} active size={36}>
                            <CornerLeftUp
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </ShapeIcon>
                          <span className="text-sm font-semibold text-[#444746] dark:text-[#C4C7C5]">
                            Go up a directory
                          </span>
                        </button>
                      </motion.li>
                    )}
                  </AnimatePresence>

                  {currentItems.length === 0 && (
                    <li className="px-5 py-10 text-center text-sm text-[#747775] dark:text-[#8E918F]">
                      This directory is empty.
                    </li>
                  )}

                  {currentItems.map((item, idx) => {
                    const itemName = item.path.split("/").pop() || item.path;
                    const isFolder = item.type === "tree";

                    const { lang, Icon, shapeIndex } = isFolder
                      ? { lang: "Folder", Icon: Folder, shapeIndex: 0 }
                      : getFileInfo(itemName);

                    return (
                      <motion.li
                        key={item.sha}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.32,
                          delay: Math.min(idx * 0.025, 0.4),
                          ease: easeOut,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleNavigate(item.path, item.type)}
                          className={`
                            group flex w-full items-center gap-3 rounded-[18px]
                            px-3 py-3 text-left
                            transition-colors duration-300 ${EASE}
                            ${STATE} ${FOCUS}
                          `}
                        >
                          {/* Shape-morphing icon chip */}
                          <ShapeIcon shapeIndex={shapeIndex} active size={36}>
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </ShapeIcon>

                          {/* Name */}
                          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                            {itemName}
                          </span>

                          {/* Metadata (desktop only) */}
                          <span className="hidden shrink-0 items-center gap-3 sm:flex">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#747775] dark:text-[#8E918F]">
                              {lang}
                            </span>
                            <span className="w-16 text-right text-[11px] tabular-nums text-[#747775] dark:text-[#8E918F]">
                              {isFolder ? "—" : formatBytes(item.size)}
                            </span>
                          </span>

                          <span
                            className={`
                              grid h-7 w-7 shrink-0 place-items-center rounded-full
                              text-[#747775] dark:text-[#8E918F]
                              transition-all duration-300 ${SPRING}
                              group-hover:rounded-[8px]
                              group-hover:bg-[#1F1F1F] group-hover:text-white
                              dark:group-hover:bg-[#E3E3E3] dark:group-hover:text-[#1F1F1F]
                            `}
                          >
                            <ChevronRight
                              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPath}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                {isFileLoading ? (
                  <div className="p-10 text-center text-sm text-[#747775] dark:text-[#8E918F]">
                    Loading file contents…
                  </div>
                ) : (
                  <div className="overflow-x-auto px-5 py-5">
                    <pre className="whitespace-pre font-mono text-xs leading-6 text-[#1F1F1F] dark:text-[#E3E3E3] sm:text-[13px]">
                      <code>{fileContent}</code>
                    </pre>
                  </div>
                )}

                <div className="px-5 pb-4">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goUp();
                    }}
                    className={`
                      group inline-flex items-center gap-1.5 rounded-full
                      py-2 pl-1.5 pr-3.5 text-xs font-semibold
                      ${SURFACE} text-[#1F1F1F] dark:text-[#E3E3E3]
                      transition-all duration-300 ${EASE}
                      hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_28px_-14px_rgba(0,0,0,0.55)]
                      dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_12px_28px_-14px_rgba(255,255,255,0.35)]
                      active:scale-[0.96] active:rounded-[14px]
                      ${FOCUS}
                    `}
                  >
                    <span
                      className={`
                        grid h-6 w-6 shrink-0 place-items-center rounded-full
                        ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                        transition-all duration-300 ${SPRING}
                        group-hover:rounded-[8px]
                      `}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    Return to folder
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </main>
    </div>
  );
}
