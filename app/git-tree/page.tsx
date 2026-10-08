"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FileCode2,
  FileText,
  FileJson,
  FolderCode,
  Image as ImageIcon,
  Terminal,
  CornerDownLeft,
  FileBox,
  Database,
  File as DefaultFile,
  ChevronRight,
  CornerLeftUp,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Editorial Repository Explorer

   · Flat, high-contrast, bold uppercase type.
   · `border-b-2` ink rules mark every section break.
   · One accent: blue-700 / blue-400.
   · Fully responsive: 320 px → ultra-wide.
   · Pure Tailwind — zero CSS variables, zero external stylesheet.
   · Motion: 300 ms cubic-bezier(0.2,0,0,1).
   ───────────────────────────────────────────────────────────── */

/* ── Config ────────────────────────────────────────────── */
const GITHUB_CONFIG = {
  username: "kinshukjainn",
  repository: "cloudkinshuk",
  branch: "main",
} as const;

interface GithubTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

/* ── Utilities ─────────────────────────────────────────── */
const formatBytes = (bytes = 0, decimals = 1): string => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"] as const;
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1,
  );
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

interface FileInfo {
  lang: string;
  Icon: LucideIcon;
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
      return { lang: "Code", Icon: FileCode2 };
    case "json":
      return { lang: "JSON", Icon: FileJson };
    case "md":
      return { lang: "Markdown", Icon: FileText };
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
    case "webp":
    case "gif":
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

/* ── Design tokens (fixed strings — Tailwind-scannable) ── */
const SHELL =
  "min-h-screen bg-[#FAFAFA] text-[#111] " +
  "selection:bg-[#111] selection:text-white " +
  "dark:bg-[#0a0a0a] dark:text-[#eee] " +
  "dark:selection:bg-[#eee] dark:selection:text-[#111]";

const TEXT = "text-[#111] dark:text-[#eee]";
const TEXT_MUTED = "text-[#444] dark:text-[#ccc]";
const TEXT_SUBTLE = "text-[#555] dark:text-[#aaa]";

/* Hover: subtle → ink (both themes explicit, NOT interpolated) */
const HOVER_TO_INK = "hover:text-[#111] dark:hover:text-[#eee]";

const ACCENT = "text-blue-700 dark:text-blue-400";

const RULE_INK = "border-[#1f1f1f] dark:border-[#e3e3e3]";
const RULE_SOFT = "border-black/[0.12] dark:border-white/[0.18]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-blue-700/60 dark:focus-visible:ring-blue-400/60";

/* Framer Motion expects a mutable 4-tuple; `as const` breaks older
   versions of the lib, so we type it explicitly. */
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Reusable active-chip style (breadcrumb last segment) */
const CHIP_ACTIVE =
  "border-blue-700 bg-blue-700 text-white " +
  "dark:border-blue-400 dark:bg-blue-400 dark:text-[#0a0a0a]";

/* Reusable idle-chip style */
const CHIP_IDLE =
  `border-black/[0.12] ${TEXT_SUBTLE} ${HOVER_TO_INK} ` +
  `dark:border-white/[0.18]`;

/* ============================================================================
   Main Component
   ============================================================================ */

export default function RepositoryViewer() {
  const reduceMotion = useReducedMotion();
  const [treeData, setTreeData] = useState<GithubTreeItem[]>([]);
  const [isLoadingTree, setIsLoadingTree] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"tree" | "blob">("tree");
  const [currentPath, setCurrentPath] = useState<string>("");

  const [fileContent, setFileContent] = useState<string>("");
  const [isFileLoading, setIsFileLoading] = useState(false);

  /* ── Reserve space for the fixed mobile dock ─────────── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      document.body.style.paddingBottom = mq.matches ? "5rem" : "";
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.body.style.paddingBottom = "";
    };
  }, []);

  /* ── Fetchers (declared before use) ──────────────────── */
  const fetchRepositoryTree = useCallback(async () => {
    setIsLoadingTree(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/git/trees/${GITHUB_CONFIG.branch}?recursive=1`,
        { headers: { Accept: "application/vnd.github.v3+json" } },
      );
      if (!response.ok) throw new Error("Failed to fetch repository tree.");
      const data: { tree: GithubTreeItem[] } = await response.json();
      setTreeData(data.tree);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoadingTree(false);
    }
  }, []);

  const fetchFileContent = useCallback(async (filePath: string) => {
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
  }, []);

  useEffect(() => {
    void fetchRepositoryTree();
  }, [fetchRepositoryTree]);

  /* ── Navigation ──────────────────────────────────────── */
  const handleNavigate = (path: string, type: "blob" | "tree") => {
    setCurrentPath(path);
    if (type === "tree") {
      setViewMode("tree");
    } else {
      setViewMode("blob");
      void fetchFileContent(path);
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

  /* ── Derived state ───────────────────────────────────── */
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

  /* ========================================================================
     RENDER
     ======================================================================== */
  return (
    <div className={SHELL}>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        {/* ═══════════ HEADER ═══════════ */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 md:mb-10">
          <Link
            href="/git-track"
            className={`
              group inline-flex items-center gap-2
              text-xs font-bold uppercase tracking-wider
              ${TEXT_SUBTLE} ${HOVER_TO_INK}
              transition-colors duration-300 ${EASE}
              focus-visible:outline-none focus-visible:underline
              focus-visible:decoration-2 focus-visible:underline-offset-4
            `}
          >
            <CornerDownLeft
              className={`
                h-3.5 w-3.5 transition-transform duration-300 ${EASE}
                group-hover:-translate-x-0.5
              `}
              aria-hidden="true"
            />
            <span>Back to commits</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-md
                border ${RULE_SOFT} px-2 py-1
                text-[10px] font-bold uppercase tracking-wider ${TEXT_SUBTLE}
              `}
            >
              <FolderCode className="h-3 w-3" aria-hidden="true" />
              {GITHUB_CONFIG.repository}
            </span>
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-md
                border ${RULE_SOFT} px-2 py-1
                text-[10px] font-bold uppercase tracking-wider ${TEXT_SUBTLE}
              `}
            >
              <GitBranch className="h-3 w-3" aria-hidden="true" />
              {GITHUB_CONFIG.branch}
            </span>
          </div>
        </header>

        {/* ═══════════ TITLE ═══════════ */}
        <section className="mb-8 space-y-3 md:mb-10">
          <div
            className={`
              flex items-center gap-2 text-xs font-bold uppercase
              tracking-wider ${TEXT_SUBTLE}
            `}
          >
            <FolderCode className="h-4 w-4" aria-hidden="true" />
            <span>Repository</span>
          </div>

          <h1
            className={`
              text-3xl font-extrabold tracking-tight break-words
              sm:text-4xl md:text-5xl ${TEXT}
            `}
          >
            Repository Explorer
          </h1>

          <p
            className={`
              max-w-2xl text-base leading-relaxed md:text-lg ${TEXT_MUTED}
            `}
          >
            Browse files and directories in the repository.
          </p>

          <div className={`border-b-2 ${RULE_INK}`} />
        </section>

        {/* ═══════════ BREADCRUMB RAIL ═══════════ */}
        <nav
          aria-label="Breadcrumb"
          className="-mx-4 mb-6 flex items-center gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          <motion.button
            type="button"
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            onClick={() => jumpToPath("")}
            className={`
              shrink-0 rounded-md border px-2.5 py-1
              text-[11px] font-bold uppercase tracking-wider
              transition-colors duration-300 ${EASE} ${FOCUS}
              ${pathBreadcrumbs.length === 0 ? CHIP_ACTIVE : CHIP_IDLE}
            `}
          >
            {GITHUB_CONFIG.repository}
          </motion.button>

          {pathBreadcrumbs.map((part, index) => {
            const buildPath = pathBreadcrumbs.slice(0, index + 1).join("/");
            const isLast = index === pathBreadcrumbs.length - 1;
            const isFile = isLast && viewMode === "blob";

            const chipClass = isLast
              ? isFile
                ? `border-black/[0.12] ${TEXT} dark:border-white/[0.18] cursor-default`
                : CHIP_ACTIVE
              : CHIP_IDLE;

            return (
              <React.Fragment key={buildPath}>
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 ${TEXT_SUBTLE}`}
                  aria-hidden="true"
                />
                <motion.button
                  type="button"
                  whileTap={
                    reduceMotion || isFile ? undefined : { scale: 0.95 }
                  }
                  onClick={() => {
                    if (!isFile) jumpToPath(buildPath);
                  }}
                  disabled={isFile}
                  className={`
                    shrink-0 rounded-md border px-2.5 py-1
                    text-[11px] font-bold uppercase tracking-wider
                    transition-colors duration-300 ${EASE} ${FOCUS}
                    ${chipClass}
                  `}
                >
                  {part}
                </motion.button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* ═══════════ ERROR ═══════════ */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: easeOut }}
              role="alert"
              className={`
                mb-6 flex items-center gap-3 border-2 ${RULE_INK}
                px-4 py-3
              `}
            >
              <span
                className={`
                  grid h-8 w-8 shrink-0 place-items-center rounded-md
                  bg-[#1f1f1f] text-white
                  dark:bg-[#e3e3e3] dark:text-[#111]
                `}
              >
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span
                className={`text-sm font-bold uppercase tracking-wider ${TEXT}`}
              >
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════ EXPLORER ═══════════ */}
        <section>
          {/* Header row */}
          <div
            className={`
              flex items-center justify-between gap-3
              border-b-2 ${RULE_INK} pb-2
            `}
          >
            <div className="flex min-w-0 items-center gap-2">
              {viewMode === "tree" ? (
                <FolderCode
                  className={`h-4 w-4 shrink-0 ${ACCENT}`}
                  aria-hidden="true"
                />
              ) : (
                <FileCode2
                  className={`h-4 w-4 shrink-0 ${ACCENT}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`
                  truncate text-xs font-extrabold uppercase tracking-widest
                  sm:text-sm ${TEXT}
                `}
              >
                {viewMode === "tree"
                  ? currentFileName || GITHUB_CONFIG.repository
                  : currentFileName}
              </span>
            </div>

            <AnimatePresence>
              {viewMode === "tree" && !isLoadingTree && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                  className={`
                    shrink-0 text-[11px] font-bold uppercase tracking-wider
                    tabular-nums ${TEXT_SUBTLE}
                  `}
                >
                  {currentItems.length}{" "}
                  {currentItems.length === 1 ? "item" : "items"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Body */}
          {viewMode === "tree" ? (
            <>
              {isLoadingTree ? (
                <div
                  className={`
                    flex flex-col items-center justify-center gap-2
                    border-b ${RULE_SOFT} py-14 text-center
                  `}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-widest ${TEXT}`}
                  >
                    Fetching repository structure…
                  </p>
                </div>
              ) : (
                <ul className={`border-b ${RULE_SOFT}`}>
                  <AnimatePresence initial={false}>
                    {currentPath !== "" && (
                      <motion.li
                        key="__go-up__"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.24, ease: easeOut }}
                        className={`border-b ${RULE_SOFT}`}
                      >
                        <button
                          type="button"
                          onClick={goUp}
                          className={`
                            group flex w-full items-center gap-3 px-1 py-3.5
                            text-left transition-colors duration-300 ${EASE}
                            ${FOCUS}
                            hover:bg-black/[0.03]
                            dark:hover:bg-white/[0.04]
                          `}
                        >
                          <span
                            className={`
                              grid h-8 w-8 shrink-0 place-items-center rounded-md
                              border ${RULE_SOFT} ${TEXT_SUBTLE}
                              transition-colors duration-300 ${EASE}
                              group-hover:border-blue-700 group-hover:text-blue-700
                              dark:group-hover:border-blue-400
                              dark:group-hover:text-blue-400
                            `}
                          >
                            <CornerLeftUp
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </span>
                          <span
                            className={`
                              text-[11px] font-bold uppercase tracking-wider
                              ${TEXT_SUBTLE}
                              transition-colors duration-300 ${EASE}
                              group-hover:text-blue-700
                              dark:group-hover:text-blue-400
                            `}
                          >
                            Go up a directory
                          </span>
                        </button>
                      </motion.li>
                    )}
                  </AnimatePresence>

                  {currentItems.length === 0 && (
                    <li
                      className={`
                        py-14 text-center text-xs font-bold uppercase
                        tracking-widest ${TEXT_SUBTLE}
                      `}
                    >
                      This directory is empty.
                    </li>
                  )}

                  {currentItems.map((item, idx) => {
                    const itemName = item.path.split("/").pop() || item.path;
                    const isFolder = item.type === "tree";
                    const { lang, Icon } = isFolder
                      ? { lang: "Folder", Icon: FolderCode }
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
                        className={`border-b ${RULE_SOFT} last:border-b-0`}
                      >
                        <button
                          type="button"
                          onClick={() => handleNavigate(item.path, item.type)}
                          className={`
                            group flex w-full items-center gap-3 px-1 py-3.5
                            text-left transition-colors duration-300 ${EASE}
                            ${FOCUS}
                            hover:bg-black/[0.03]
                            dark:hover:bg-white/[0.04]
                          `}
                        >
                          {/* Icon chip */}
                          <span
                            className={`
                              grid h-8 w-8 shrink-0 place-items-center rounded-md
                              border ${RULE_SOFT} ${TEXT_SUBTLE}
                              transition-colors duration-300 ${EASE}
                              group-hover:border-blue-700
                              group-hover:text-blue-700
                              dark:group-hover:border-blue-400
                              dark:group-hover:text-blue-400
                            `}
                          >
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>

                          {/* Name */}
                          <span
                            className={`
                              min-w-0 flex-1 truncate text-sm font-bold
                              ${TEXT}
                              transition-colors duration-300 ${EASE}
                              group-hover:text-blue-700
                              dark:group-hover:text-blue-400
                            `}
                          >
                            {itemName}
                          </span>

                          {/* Metadata (sm+) */}
                          <span className="hidden shrink-0 items-center gap-3 sm:flex">
                            <span
                              className={`
                                text-[10px] font-bold uppercase tracking-wider
                                ${TEXT_SUBTLE}
                              `}
                            >
                              {lang}
                            </span>
                            <span
                              className={`
                                w-16 text-right text-[11px] font-medium
                                tabular-nums ${TEXT_SUBTLE}
                              `}
                            >
                              {isFolder ? "—" : formatBytes(item.size)}
                            </span>
                          </span>

                          {/* Chevron */}
                          <ChevronRight
                            className={`
                              h-4 w-4 shrink-0 ${TEXT_SUBTLE}
                              transition-all duration-300 ${EASE}
                              group-hover:translate-x-0.5
                              group-hover:text-blue-700
                              dark:group-hover:text-blue-400
                            `}
                            aria-hidden="true"
                          />
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
                  <div
                    className={`
                      border-b ${RULE_SOFT} py-14 text-center
                      text-xs font-bold uppercase tracking-widest ${TEXT}
                    `}
                  >
                    Loading file contents…
                  </div>
                ) : (
                  <div
                    className={`
                      overflow-x-auto border-b ${RULE_SOFT} py-5
                    `}
                  >
                    <pre
                      className={`
                        whitespace-pre font-mono text-[12.5px] leading-6
                        ${TEXT} sm:text-[13px]
                      `}
                    >
                      <code>{fileContent}</code>
                    </pre>
                  </div>
                )}

                <div className="pt-5">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goUp();
                    }}
                    className={`
                      group inline-flex items-center gap-2
                      text-xs font-bold uppercase tracking-wider
                      ${TEXT_SUBTLE} ${HOVER_TO_INK}
                      transition-colors duration-300 ${EASE}
                      focus-visible:outline-none focus-visible:underline
                      focus-visible:decoration-2 focus-visible:underline-offset-4
                    `}
                  >
                    <CornerDownLeft
                      className={`
                        h-3.5 w-3.5 transition-transform duration-300 ${EASE}
                        group-hover:-translate-x-0.5
                      `}
                      aria-hidden="true"
                    />
                    <span>Return to folder</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer
        className={`
          mx-auto max-w-3xl px-4 pt-6 pb-10 text-center
          text-xs font-bold uppercase tracking-wider
          sm:px-6 ${TEXT_SUBTLE}
        `}
      >
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
