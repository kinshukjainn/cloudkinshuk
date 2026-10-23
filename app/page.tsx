"use client";

import { useState } from "react";
import Link from "next/link";

/* ── CONFIGURATION ──────────────────────────────────────── */
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
        "Kosha is a personal cloud storage platform built with React, TypeScript, Tailwind CSS, and Nextjs as the framework, and NeonDB, AWS S3, Clerk Auth on the backend. It allows users to upload, manage, and organize their files in a secure and user-friendly interface.",
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

/* ── CERTIFICATIONS ─────────────────────────────────────── */
type Certification = {
  title: string;
  issuer: string;
  issued: string;
  skills: string[];
  verifyUrl: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "September 2026",
    skills: ["Cloud Concepts", "AWS Core Services", "Billing & Pricing"],
    verifyUrl:
      "https://www.credly.com/badges/f42e01a4-b2d6-4069-8038-db78a81c81b5/public_url",
  },
];

/* ── SHARED STYLES (hardcoded colors, no vars) ──────────── */
const LINK =
  "text-[#d0a869] underline decoration-1 underline-offset-4 transition-colors hover:text-[#e8c98f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d0a869] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0c]";

const MONO_LABEL = " text-[11px] uppercase tracking-[0.16em] text-[#8b867c]";

const PROSE = "text-[15px] leading-7 sm:text-base sm:leading-8";

const H2 = "text-xl font-bold leading-snug text-[#f2eee5]";

const RULE = "border-[#272521]";

/* ── TABS ───────────────────────────────────────────────── */
type TabId =
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "education";

const TABS: { id: TabId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
];

/* ── PANELS ─────────────────────────────────────────────── */
function ExperiencePanel() {
  return (
    <div>
      <h2 className={H2}>
        UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
      </h2>
      <p className={`mt-1.5 ${MONO_LABEL}`}>Jul 2025 – Aug 2025</p>
      <p className={`mt-3 ${PROSE}`}>
        Worked with the transmission division to understand the operation,
        protection, and maintenance of 132kV and 220kV substations. Prepared
        technical documentation and maintained logs on equipment performance and
        safety checks.
      </p>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="space-y-10 divide-y divide-[#272521]">
      {CONFIG.projects.map((project) => (
        <article key={project.title}>
          <h2 className={H2}>{project.title}</h2>
          <p className={`mt-1.5 ${MONO_LABEL}`}>
            {project.year} · {project.type} · {project.status}
          </p>

          <div className={`mt-3 space-y-3 ${PROSE}`}>
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-[#8b867c]">
            <span className="text-[#d6d1c6]">Stack:</span>{" "}
            {project.technologies.join(" · ")}
          </p>

          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                live site ↗
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                source ↗
              </a>
            )}
          </p>
        </article>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="space-y-6">
      {Object.entries(CONFIG.skills).map(([category, skills]) => (
        <div key={category}>
          <h3 className={MONO_LABEL}>{category}</h3>
          <p className={`mt-1.5 ${PROSE}`}>{skills.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

function CertificationsPanel() {
  return (
    <div className="space-y-8 divide-y divide-[#272521]">
      {CERTIFICATIONS.map((cert) => (
        <div key={cert.verifyUrl}>
          <h2 className={H2}>{cert.title}</h2>
          <p className={`mt-1.5 ${MONO_LABEL}`}>
            {cert.issuer} · issued {cert.issued}
          </p>
          <p className={`mt-3 ${PROSE}`}>
            <span className="text-[#f2eee5]">Skills evaluated:</span>{" "}
            {cert.skills.join(", ")}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              verify credential ↗
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}

function EducationPanel() {
  const e = CONFIG.education;
  return (
    <div>
      <h2 className={H2}>{e.institution}</h2>
      <p className={`mt-1.5 ${MONO_LABEL}`}>
        {e.period} · {e.location}
      </p>

      <p className="mt-3 text-[15px] font-semibold text-[#f2eee5] sm:text-base">
        {e.degree} — {e.field}
      </p>

      <p className={`mt-2 ${PROSE}`}>{e.description}</p>

      <p className="mt-4 text-sm">
        <a
          href="/2200910200015.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          download transcript (pdf) ↓
        </a>
      </p>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
const SOCIAL_LABEL: Record<string, string> = { Gmail: "email" };

export default function Home() {
  const [bannerOk, setBannerOk] = useState(true);
  const [profileOk, setProfileOk] = useState(true);
  const [tab, setTab] = useState<TabId>("experience");

  const [tagline, ...bio] = CONFIG.personal.bio;

  return (
    <div className="min-h-screen bg-[#0d0d0c] font-sans text-[#d6d1c6] selection:bg-[#d0a869] selection:text-[#0d0d0c]">
      <style>{`@keyframes panelIn{from{opacity:0}to{opacity:1}}`}</style>

      <main className="mx-auto w-full max-w-[680px] px-5 py-12 sm:px-8 sm:py-16">
        {/* ============ HEADER ============ */}
        <header>
          <div className="flex items-center gap-4 sm:gap-5">
            {profileOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/profile.jpg"
                alt="Kinshuk Jain"
                className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                onError={() => setProfileOk(false)}
              />
            )}
            <div className="min-w-0">
              <h1 className="text-[28px] leading-none font-semibold tracking-tight text-[#f2eee5] sm:text-4xl">
                Kinshuk Jain
              </h1>
              <p className="mt-2 text-base text-[#8b867c] sm:text-lg">
                {tagline}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#8b867c]">
            {CONFIG.personal.location}
            <span aria-hidden className="mx-2 opacity-60">
              ·
            </span>
            available for collaboration
          </p>

          {/* Banner */}
          {bannerOk && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/banner.png"
              alt=""
              aria-hidden="true"
              className="mt-7 aspect-[3/1] w-full object-cover"
              onError={() => setBannerOk(false)}
            />
          )}

          {/* Bio */}
          <div className="mt-7 space-y-4">
            {bio.map((paragraph, i) => (
              <p key={i} className={PROSE}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Socials */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {CONFIG.social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                {SOCIAL_LABEL[s.platform] ?? s.platform.toLowerCase()}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link href="/myresumekinshuk.pdf" className={LINK}>
              résumé (pdf) ↓
            </Link>
            <Link href="/blogs" className={LINK}>
              blog ↗
            </Link>
          </div>
        </header>

        {/* ============ NAVIGATION ============ */}
        <hr className={`mt-10 border-0 border-t ${RULE}`} />

        <nav
          role="tablist"
          aria-label="Portfolio sections"
          className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d0a869] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d0d0c] ${
                  active
                    ? "text-[#d0a869]"
                    : "text-[#8b867c] hover:text-[#d6d1c6]"
                }`}
              >
                <span aria-hidden className={active ? "" : "opacity-0"}>
                  »{" "}
                </span>
                {t.label}
              </button>
            );
          })}
        </nav>

        <hr className={`mt-5 border-0 border-t ${RULE}`} />

        {/* ============ ACTIVE PANEL ============ */}
        <div
          key={tab}
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          style={{ animation: "panelIn 0.18s ease-out" }}
          className="mt-8"
        >
          {tab === "experience" && <ExperiencePanel />}
          {tab === "projects" && <ProjectsPanel />}
          {tab === "skills" && <SkillsPanel />}
          {tab === "certifications" && <CertificationsPanel />}
          {tab === "education" && <EducationPanel />}
        </div>

        {/* ============ FOOTER ============ */}
        <footer
          className={`mt-16 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t pt-5 ${RULE} ${MONO_LABEL}`}
        >
          <span>kinshuk jain © {new Date().getFullYear()}</span>
          <span>hand-coded · no templates</span>
        </footer>
      </main>
    </div>
  );
}
