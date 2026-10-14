"use client";

import { useState } from "react";
import {
  Github,
  ExternalLink,
  Download,
  BookOpen,
  MapPin,
  CheckCircle2,
  Briefcase,
  FolderGit2,
  Award,
  GraduationCap,
  Wrench,
  Sparkles,
  Mail,
  Twitter,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { FaAws } from "react-icons/fa";
import { TbBrandLinkedinFilled } from "react-icons/tb";

// --- CONFIGURATION ---
const CONFIG = {
  personal: {
    email: "kinshuk25jan04@gmail.com",
    location: "Ghaziabad, UP, India",
    bio: [
      "Student first. Builder always.",
      "I have completed my graduation in Electrical Engineering, where I learned how systems work, how they fail, and how they evolve. Alongside that, I have been exploring cloud technologies, building small projects that could someday scale, experimenting with infrastructure, and understanding how technology connects people.",
    ],
    status:
      "Completed an internship at UPPTCL (Uttar Pradesh Power Transmission Corporation Limited), where I gained hands-on experience in power systems and transmission network operations.",
  },
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kinshukjainn",
      icon: "github",
      handle: "@kinshukjainn",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/kinshukjainn/",
      icon: "TbBrandLinkedinFilled",
      handle: "@kinshukjainn",
    },
    {
      platform: "Gmail",
      url: "mailto:kinshuk25jan04@gmail.com",
      icon: "mail",
      handle: "@kinshuk25jan04",
    },
    {
      platform: "X",
      url: "http://x.com/realkinshuk004",
      icon: "x",
      handle: "@realkinshuk04",
    },
  ],
  skills: {
    "Cloud & DevOps": [
      "AWS (Amazon Web Services)",
      "AWS Amplify",
      "Amazon S3",
      "Amazon Lambda",
      "Amazon Route 53",
      "Amazon Bedrock",
      "AWS IAM",
      "Docker",
    ],
    "Frontend & Build": [
      "Vite / React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Icons",
      "Lucide React",
      "React Router DOM",
    ],
    "Database & Authentication": [
      "NeonDB",
      "Supabase",
      "PostgresSQL",
      "SQL",
      "Clerk",
    ],
    "AI Tools I use": ["Gemini", "Claude", "Chat GPT"],
    "Version Control & Tools": ["Git Terminal", "VS Code"],
  },
  projects: [
    {
      title: "Kosha : Your Personal Cloud Storage Platform",
      year: "2026",
      status: "Live",
      type: "Cloud Storage SaaS",
      description: [
        "Kosha is a personal cloud storage platform built with React, TypeScript, Tailwind CSS, and Nextjs as the framework, and NeonDB, AWS S3 , Clerk Auth on the backend. It allows users to upload, manage, and organize their files in a secure and user-friendly interface.",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React icons",
        "Lucide react",
        "Amazon S3",
        "Amazon Amplify",
        "Neon DB",
        "Clerk Auth",
      ],
      links: {
        live: "https://kosha.cloudkinshuk.in",
        repo: "https://github.com/kinshukjainn/pvtcldstrg",
      },
      dockerCommand: null,
    },
    {
      title: "Mscada : AI-Powered Fault Detection System",
      year: "2025-26",
      status: "Completed",
      type: "AI Tool",
      description: [
        "An AI-powered Fault Detection System designed to identify and analyze faults in power transmission lines and transformers. Enhances reliability in power grid monitoring by leveraging machine learning models to predict equipment failures.",
        "Built with Next.js 16 and integrated with Open AI OSS Model 120b parameters. Processes real-time sensor data and historical patterns to detect anomalies.",
      ],
      technologies: [
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "React icons",
        "Plotly.js",
        "Amazon Bedrock",
        "Amazon Route53",
        "Amazon Amplify",
        "AWS Lambda",
      ],
      links: { live: null, repo: "https://github.com/kinshukjainn/m-scada" },
      dockerCommand: "",
    },
    {
      title: "Opaque : Your personal Password manager",
      year: "2025-26",
      status: "Live",
      type: "Security Tool",
      description: [
        "Opaque is a modern, end-to-end encrypted password vault engineered for absolute privacy. By strictly separating authentication from decryption, your master key never leaves your browser's local memory. Say goodbye to cloud vulnerabilities and hello to a private ecosystem where the server remains a blind gatekeeper never a reader.",
      ],
      technologies: [
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "React icons",
        "clerk auth",
        "Neondb",
        "SQL",
        "Amazon Route53",
        "Amazon Amplify",
      ],
      links: {
        live: "https://opaque.cloudkinshuk.in",
        repo: "https://github.com/kinshukjainn/opaque",
      },
      dockerCommand: "",
    },
  ],
  education: {
    degree: "Bachelor of Technology",
    field: "Electrical Engineering",
    institution: "JSS Academy of Technical Education",
    location: "Noida, Uttar Pradesh",
    period: "2022 - 2026",
    description:
      "B.Tech graduate in Electrical Engineering, passionate about cloud computing and software development. Built practical skills through self-learning, focusing on the convergence of traditional engineering and modern cloud technologies.",
  },
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-4 w-4" aria-hidden="true" />,
  LinkedIn: <TbBrandLinkedinFilled className="h-4 w-4" aria-hidden="true" />,
  Gmail: <Mail className="h-4 w-4" aria-hidden="true" />,
  X: <Twitter className="h-4 w-4" aria-hidden="true" />,
};

type Certification = {
  title: string;
  issuer: string;
  issued: string;
  skills: string[];
  verifyUrl: string;
  icon: React.ReactNode;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "September 2026",
    skills: ["Cloud Concepts", "AWS Core Services", "Billing & Pricing"],
    verifyUrl:
      "https://www.credly.com/badges/f42e01a4-b2d6-4069-8038-db78a81c81b5/public_url",
    icon: <FaAws className="h-6 w-6" aria-hidden="true" />,
  },
];

/* ── SHARED STYLES ──────────────────────────────────────── */
const CARD = "bg-white p-5  dark:bg-black";

const CHIP =
  " border rounded-sm border-[#e6e6e6] bg-[#FAFAFA] px-2 py-2 text-[13px] font-normal text-black dark:border-[#3a3536] dark:bg-[#121212] dark:text-white";

/* ── TABS ───────────────────────────────────────────────── */
type TabId =
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "education";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderGit2 className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Wrench className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: <Award className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="h-4 w-4" aria-hidden="true" />,
  },
];

/* ── SMALL BUILDING BLOCKS ──────────────────────────────── */
function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 text-xs font-semibold text-[#666] sm:text-sm dark:text-[#a5a5a5]">
      {children}
    </span>
  );
}

function PanelNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-sm text-[#666] dark:text-[#a5a5a5]">{children}</p>
  );
}

/* ── CERTIFICATION CARD ─────────────────────────────────── */
function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className={CARD}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-[#1F1F1F] sm:text-lg dark:text-[#E3E3E3]">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#181818] text-white">
            {cert.icon}
          </span>
          {cert.title}
        </h3>
        <span className="w-fit shrink-0 rounded-full border border-emerald-300 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
          Verified
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-[#333] dark:text-[#ccc]">
        {cert.issuer}
      </p>

      <span className="mt-1 flex items-center gap-1.5 text-xs text-[#666] dark:text-[#a5a5a5]">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{" "}
        {cert.issued}
      </span>

      <p className="mt-3 text-sm text-[#444] dark:text-[#ccc]">
        <strong className="text-[#111] dark:text-[#eee]">
          Skills evaluated:
        </strong>{" "}
        {cert.skills.join(", ")}
      </p>

      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded bg-blue-800 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700"
      >
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Verify on
        official portal
      </a>
    </div>
  );
}

/* ── PANELS ─────────────────────────────────────────────── */
function ExperiencePanel() {
  return (
    <>
      <PanelNote>Where I&apos;ve worked</PanelNote>
      <div className={CARD}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-base font-semibold text-[#111] sm:text-lg dark:text-[#eee]">
            UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
          </h3>
          <Meta>Jul 2025 – Aug 2025</Meta>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#333] sm:text-base dark:text-[#cfcfcf]">
          Worked with the transmission division to understand the operation,
          protection, and maintenance of 132kV and 220kV substations. Prepared
          technical documentation and maintained logs on equipment performance
          and safety checks.
        </p>
      </div>
    </>
  );
}

function ProjectsPanel() {
  return (
    <>
      <PanelNote>Selected projects — designed, built and shipped</PanelNote>
      <div className="space-y-5">
        {CONFIG.projects.map((project, idx) => (
          <div key={idx} className={CARD}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <h3 className="text-base font-semibold text-[#111] sm:text-lg dark:text-[#eee]">
                {project.title}
              </h3>
              <div className="flex shrink-0 items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0e0e0] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#555] dark:border-[#3d3839] dark:text-[#bbb]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.status.toLowerCase() === "live"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  {project.status}
                </span>
                <Meta>
                  {project.year} • {project.type}
                </Meta>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#333] sm:text-base dark:text-[#cfcfcf]">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#666] dark:text-[#a5a5a5]">
                Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t, i) => (
                  <span key={i} className={CHIP}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5 text-sm font-semibold">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                  Live
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded bg-blue-800 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" /> Source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsPanel() {
  return (
    <>
      <PanelNote>What I build with</PanelNote>
      <div className="grid gap-5 sm:grid-cols-2">
        {Object.entries(CONFIG.skills).map(([category, skills]) => (
          <div key={category} className={CARD}>
            <h3 className="mb-3 text-md font-semibold uppercase tracking-wide text-[#111] dark:text-[#eee]">
              {category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className={CHIP}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CertificationsPanel() {
  return (
    <>
      <PanelNote>Verified badges &amp; exams</PanelNote>
      <div className="space-y-5">
        {CERTIFICATIONS.map((cert) => (
          <CertificationCard key={cert.verifyUrl} cert={cert} />
        ))}
      </div>
    </>
  );
}

function EducationPanel() {
  const e = CONFIG.education;
  return (
    <>
      <PanelNote>Academic background</PanelNote>
      <div className={CARD}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-base font-semibold text-[#111] sm:text-lg dark:text-[#eee]">
            {e.institution}
          </h3>
          <Meta>{e.period}</Meta>
        </div>

        <p className="mt-2 text-sm font-semibold text-[#333] dark:text-[#bbb]">
          {e.degree} — {e.field}
        </p>

        <p className="mt-0.5 text-xs italic text-[#666] dark:text-[#a5a5a5]">
          {e.location}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[#333] sm:text-base dark:text-[#cfcfcf]">
          {e.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
          <span className="flex items-center gap-1.5 text-[#333] dark:text-[#ccc]">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Degree
            Completed
          </span>
          <span className="hidden text-[#ccc] sm:inline dark:text-[#555]">
            |
          </span>
          <a
            href="/2200910200015.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-700 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
            Transcript
          </a>
        </div>
      </div>
    </>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  /* Track image load failures so we can fall back to a gradient
     banner and an initial-letter avatar gracefully. */
  const [bannerOk, setBannerOk] = useState(true);
  const [profileOk, setProfileOk] = useState(true);
  const [tab, setTab] = useState<TabId>("experience");

  return (
    <div className="min-h-screen bg-white text-[#111] selection:bg-[#111] selection:text-white dark:bg-black dark:text-[#eee] dark:selection:bg-[#eee] dark:selection:text-[#111]">
      <style>{`@keyframes panelIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* ============ HERO ============ */}
        <header className="mb-12">
          {/* ── BANNER ──────────────────────────────────────── */}
          <div
            className="
              relative aspect-[3/1] w-full overflow-hidden
              bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#4a4a4a]
              dark:from-[#e3e3e3] dark:via-[#bbb] dark:to-[#888]
              sm:aspect-[4/1]
            "
          >
            {bannerOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/banner.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setBannerOk(false)}
              />
            )}
          </div>

          {/* ── PROFILE PHOTO (overlaps banner) ─────────────── */}
          <div
            className="
              relative -mt-14 ml-3 h-24 w-24 overflow-hidden rounded-full
              border-4 border-[#FAFAFA] bg-[#1f1f1f]
              dark:border-black dark:bg-[#e3e3e3]
              sm:-mt-16 sm:ml-4 sm:h-28 sm:w-28
              md:-mt-20 md:ml-6 md:h-32 md:w-32
            "
          >
            {/* Fallback initial — hidden once photo loads */}
            <span
              aria-hidden="true"
              className="
                absolute inset-0 grid place-items-center
                text-3xl font-semibold text-white
                dark:text-[#111]
                sm:text-4xl md:text-5xl
              "
            >
              K
            </span>

            {profileOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/profile.jpg"
                alt="Kinshuk Jain"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setProfileOk(false)}
              />
            )}
          </div>

          {/* ── HERO CONTENT ────────────────────────────────── */}
          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />{" "}
                {CONFIG.personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Available
                for collaboration
              </span>
            </div>

            <div className="space-y-4 text-base leading-relaxed md:text-lg">
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Social Links — editorial chip style */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {CONFIG.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-1.5 rounded-md
                    bg-blue-900 px-2.5 py-1.5
                    text-xs font-semibold tracking-wider text-white
                    transition-colors duration-300
                    hover:bg-blue-800
                    dark:bg-[#e3e3e3] dark:text-[#111]
                    dark:hover:bg-blue-400 dark:hover:text-[#0a0a0a]
                  "
                >
                  {SOCIAL_ICONS[s.platform]} {s.platform}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
              <Link
                href="/myresumekinshuk.pdf"
                className="flex items-center gap-1.5 rounded bg-slate-800 px-2.5 py-1.5 text-white transition-colors hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> Download My
                Resume
              </Link>

              <Link
                href="/blogs"
                className="flex items-center gap-1.5 rounded bg-blue-800 px-2.5 py-1.5 text-white transition-colors hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Read my
                blogs, thoughts…
              </Link>
            </div>
          </div>
        </header>

        {/* ============ NAVIGATION ============ */}
        <nav
          role="tablist"
          aria-label="Portfolio sections"
          className="
            sticky top-0 z-20 mb-8
            bg-white border-b border-black dark:border-[#444444] backdrop-blur
            dark:bg-black/90
          "
        >
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`
                    -mb-px flex shrink-0 items-center gap-2 whitespace-nowrap
                     rounded-t-2xl px-2 py-1.5 text-md font-semibold
                    transition-colors duration-150
                    ${
                      active
                        ? "  text-black bg-gray-200 dark:bg-[#121212] dark:text-white"
                        : "border-transparent text-[#666] hover:text-[#111] dark:text-[#a5a5a5] dark:hover:text-[#eee]"
                    }
                  `}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ============ ACTIVE PANEL ============ */}
        <div
          key={tab}
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          style={{ animation: "panelIn 0.18s ease-out" }}
        >
          {tab === "experience" && <ExperiencePanel />}
          {tab === "projects" && <ProjectsPanel />}
          {tab === "skills" && <SkillsPanel />}
          {tab === "certifications" && <CertificationsPanel />}
          {tab === "education" && <EducationPanel />}
        </div>
      </main>
    </div>
  );
}
