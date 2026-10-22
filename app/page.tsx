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
    { platform: "GitHub", url: "https://github.com/kinshukjainn" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/kinshukjainn/" },
    { platform: "Gmail", url: "mailto:kinshuk25jan04@gmail.com" },
    { platform: "X", url: "http://x.com/realkinshuk004" },
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
    icon: <FaAws className="h-5 w-5" aria-hidden="true" />,
  },
];

/* ── SHARED STYLES ──────────────────────────────────────── */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 dark:focus-visible:ring-blue-400/40";

const CARD =
  "rounded-md border border-[#D6D6D0] bg-white p-5 dark:border-[#2B2B2E] dark:bg-transparent sm:p-6";

const CARD_HOVER = `${CARD} transition-all hover:-translate-y-0.5 hover:border-blue-700 hover:shadow-md dark:hover:border-blue-400`;

const CHIP =
  "rounded-md border border-[#D6D6D0] bg-[#F2F2EF] px-2.5 py-1 text-[13px] font-semibold text-[#1A1A1A] dark:border-[#2B2B2E] dark:bg-[#121212] dark:text-[#E6E6E6]";

const BTN_BASE = `inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-[13px] font-bold tracking-[0.06em] transition-colors ${FOCUS}`;

const BTN_SOLID = `${BTN_BASE} border-gray-500 bg-white text-black hover:border-blue-700 dark:border-[#2B2B2E] dark:bg-[#121214] dark:text-white dark:hover:border-blue-400`;

const BTN_GHOST = `${BTN_BASE} border-[#D6D6D0] bg-white text-[#111] hover:border-blue-700 dark:border-[#2B2B2E] dark:bg-[#121214] dark:text-[#E6E6E6] dark:hover:border-blue-400`;

const PROMPT = "text-sm font-bold text-[#111] dark:text-[#F2F2F2]";

const PANEL_LABEL =
  "text-sm font-bold tracking-[0.14em] text-[#555] dark:text-[#A8A8A8]";

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
    <span className="shrink-0 rounded-md border border-[#D6D6D0] bg-[#F2F2EF] px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-[#555] dark:border-[#2B2B2E] dark:bg-[#121212] dark:text-[#A8A8A8]">
      {children}
    </span>
  );
}

function PanelNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2 rounded-md border border-[#D6D6D0] bg-[#F2F2EF] px-4 py-3 dark:border-[#2B2B2E] dark:bg-[#121212]">
      <span className={PROMPT}>$</span>
      <span className={PANEL_LABEL}>{children}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const live = status.toLowerCase() === "live";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#D6D6D0] bg-[#F2F2EF] px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-[#555] dark:border-[#2B2B2E] dark:bg-[#121212] dark:text-[#A8A8A8]">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {status}
    </span>
  );
}

/* ── CERTIFICATION CARD ─────────────────────────────────── */
function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className={CARD}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="flex items-center gap-3 text-lg font-bold leading-snug text-[#111] dark:text-[#F2F2F2]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#111] text-white dark:bg-[#F2F2F2] dark:text-[#0B0B0C]">
            {cert.icon}
          </span>
          {cert.title}
        </h3>
        <span className="w-fit shrink-0 rounded-md border border-emerald-600/40 bg-emerald-50/50 px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400">
          Verified
        </span>
      </div>

      <div className="mt-5 border-t border-[#D6D6D0] pt-5 dark:border-[#2B2B2E]">
        <p className="text-base font-bold text-[#111] dark:text-[#F2F2F2]">
          {cert.issuer}
        </p>

        <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#555] dark:text-[#A8A8A8]">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {cert.issued}
        </span>

        <p className="mt-3 text-base leading-7 text-[#333] dark:text-[#CFCFCF]">
          <strong className="text-[#111] dark:text-[#F2F2F2]">
            Skills evaluated:
          </strong>{" "}
          {cert.skills.join(", ")}
        </p>
      </div>

      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${BTN_SOLID} mt-5`}
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        Verify on official portal
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h3 className="text-lg font-bold leading-snug text-[#111] dark:text-[#F2F2F2]">
            UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
          </h3>
          <Meta>Jul 2025 – Aug 2025</Meta>
        </div>
        <p className="mt-5 border-t border-[#D6D6D0] pt-5 text-base leading-7 text-[#333] dark:border-[#2B2B2E] dark:text-[#CFCFCF]">
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
      <div className="space-y-4">
        {CONFIG.projects.map((project) => (
          <div key={project.title} className={CARD_HOVER}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <h3 className="text-lg font-bold leading-snug text-[#111] dark:text-[#F2F2F2]">
                {project.title}
              </h3>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <StatusBadge status={project.status} />
                <Meta>
                  {project.year} • {project.type}
                </Meta>
              </div>
            </div>

            <div className="mt-5 space-y-2 border-t border-[#D6D6D0] pt-5 text-base leading-7 text-[#333] dark:border-[#2B2B2E] dark:text-[#CFCFCF]">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-5">
              <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-[#555] dark:text-[#A8A8A8]">
                Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t} className={CHIP}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-[#D6D6D0] pt-5 dark:border-[#2B2B2E]">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live site for ${project.title}`}
                  className={BTN_SOLID}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open GitHub repository for ${project.title}`}
                  className={BTN_GHOST}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Code
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
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(CONFIG.skills).map(([category, skills]) => (
          <div key={category} className={CARD}>
            <h3 className="mb-3.5 border-b border-[#D6D6D0] pb-3 text-sm font-bold tracking-[0.14em] text-[#111] dark:border-[#2B2B2E] dark:text-[#F2F2F2]">
              {category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className={CHIP}>
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
      <div className="space-y-4">
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h3 className="text-lg font-bold leading-snug text-[#111] dark:text-[#F2F2F2]">
            {e.institution}
          </h3>
          <Meta>{e.period}</Meta>
        </div>

        <div className="mt-5 border-t border-[#D6D6D0] pt-5 dark:border-[#2B2B2E]">
          <p className="text-base font-bold text-[#111] dark:text-[#F2F2F2]">
            {e.degree} — {e.field}
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#555] dark:text-[#A8A8A8]">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {e.location}
          </p>

          <p className="mt-3 text-base leading-7 text-[#333] dark:text-[#CFCFCF]">
            {e.description}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#D6D6D0] pt-5 dark:border-[#2B2B2E]">
          <span className="flex items-center gap-1.5 rounded-md border border-emerald-600/40 bg-emerald-50/50 px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Degree Completed
          </span>

          <a
            href="/2200910200015.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className={BTN_GHOST}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF Transcript
          </a>
        </div>
      </div>
    </>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  const [bannerOk, setBannerOk] = useState(true);
  const [profileOk, setProfileOk] = useState(true);
  const [tab, setTab] = useState<TabId>("experience");

  return (
    <div className="min-h-screen bg-white text-[#111] selection:bg-[#111] selection:text-white dark:bg-zinc-950 dark:text-[#F2F2F2] dark:selection:bg-[#F2F2F2] dark:selection:text-[#0B0B0C]">
      <style>{`@keyframes panelIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
        {/* ============ TOP STRIP ============ */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-bold tracking-[0.22em] text-[#555] dark:text-[#A8A8A8]">
          <span>~/kinshuk-jain</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            available for collaboration
          </span>
        </div>

        {/* ============ HERO ============ */}
        <header className="mb-12">
          {/* BANNER */}
          <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg border border-[#D6D6D0] dark:border-[#2B2B2E]">
            {bannerOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/banner.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setBannerOk(false)}
              />
            )}
          </div>

          {/* IDENTITY ROW */}
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-6">
            <div className="relative -mt-16 h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-[#F2F2EF] bg-[#1f1f1f] dark:border-[#0B0B0C] dark:bg-[#e3e3e3] sm:-mt-20 sm:h-28 sm:w-28">
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center text-3xl font-bold text-white dark:text-[#111] sm:text-4xl"
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

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-sm font-bold tracking-[0.12em] text-[#555] dark:text-[#A8A8A8]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {CONFIG.personal.location}
              </span>
            </div>
          </div>

          {/* BIO */}
          <div className="mt-9">
            <div className="mb-4 flex items-center gap-2 rounded-md border border-[#D6D6D0] bg-[#F2F2EF] px-4 py-3 dark:border-[#2B2B2E] dark:bg-[#121212]">
              <span className={PROMPT}>$</span>
              <span className={PANEL_LABEL}>whoami</span>
            </div>
            <div className="space-y-3 text-lg leading-8 text-[#1A1A1A] sm:text-xl sm:leading-9 dark:text-[#E2E2E2]">
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* SOCIALS */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2 rounded-md border border-[#D6D6D0] bg-[#F2F2EF] px-4 py-3 dark:border-[#2B2B2E] dark:bg-[#121212]">
              <span className={PROMPT}>$</span>
              <span className={PANEL_LABEL}>connect</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CONFIG.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-md border border-[#D6D6D0] bg-white px-3.5 py-2 text-[13px] font-bold tracking-[0.06em] text-[#111] transition-colors hover:border-blue-700 dark:border-[#2B2B2E] dark:bg-[#121214] dark:text-[#E6E6E6] dark:hover:border-blue-400 ${FOCUS}`}
                >
                  {SOCIAL_ICONS[s.platform]}
                  {s.platform}
                </a>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link href="/myresumekinshuk.pdf" className={BTN_SOLID}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download My Resume
            </Link>

            <Link href="/blogs" className={BTN_GHOST}>
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Read my blogs, thoughts…
            </Link>
          </div>
        </header>

        {/* ============ NAVIGATION ============ */}
        <nav role="tablist" aria-label="Portfolio sections" className="mb-8">
          <div className="flex gap-1.5 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-3 py-2 text-[13px] font-bold tracking-[0.06em] transition-colors ${FOCUS} ${
                    active
                      ? "border-blue-700 bg-white text-black dark:border-blue-400 dark:bg-[#121214] dark:text-white"
                      : "border-[#D6D6D0] bg-white text-[#555] hover:bg-[#F2F2EF] hover:text-[#111] dark:border-[#2B2B2E] dark:bg-[#121214] dark:text-[#A8A8A8] dark:hover:bg-[#1A1A1C] dark:hover:text-[#F2F2F2]"
                  }`}
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
          style={{ animation: "panelIn 0.2s ease-out" }}
        >
          {tab === "experience" && <ExperiencePanel />}
          {tab === "projects" && <ProjectsPanel />}
          {tab === "skills" && <SkillsPanel />}
          {tab === "certifications" && <CertificationsPanel />}
          {tab === "education" && <EducationPanel />}
        </div>

        {/* ============ FOOTER STRIP ============ */}
        <footer className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[#D6D6D0] pt-5 text-[11px] font-bold tracking-[0.22em] text-[#555] dark:border-[#2B2B2E] dark:text-[#A8A8A8]">
          <span>Kinshuk Jain © {new Date().getFullYear()}</span>
          <span>Built with intent</span>
        </footer>
      </main>
    </div>
  );
}
