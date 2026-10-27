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
      <h2 className="text-xl font-bold leading-snug text-[#f2eee5]">
        UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
      </h2>
      <p className="mt-1.5 text-[13px] font-normal tracking-[0.16em] text-[#8b867c]">
        Jul 2025 – Aug 2025
      </p>
      <p className="mt-3 text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8">
        Gained practical exposure to the operation, monitoring, and maintenance
        of 132 kV and 220 kV extra-high-voltage (EHV) substations, understanding
        their role in transmitting bulk electrical power from generating
        stations and the interstate transmission network to distribution
        substations across Uttar Pradesh.Studied substation layouts, single-line
        diagrams (SLDs), and power flow through key equipment, including power
        transformers, busbars, circuit breakers, isolators, current transformers
        (CTs), potential/voltage transformers (PTs/VTs), lightning arresters,
        and earthing systems. Learned about SCADA (Supervisory Control and Data
        Acquisition) systems used for remote monitoring and supervisory control
        of substations, including the observation of voltage, current, active
        and reactive power, breaker status, alarms, and equipment indications
        through human-machine interface (HMI) displays.Studied the operation and
        maintenance of overhead transmission lines, including conductors,
        insulators, towers, earth wires, and associated line bays, along with
        the importance of insulation coordination, lightning protection, and
        reliable power transfer across the transmission network. Assisted with
        technical documentation and the maintenance of equipment-performance
        records, inspection logs, and safety-check documentation, gaining
        familiarity with preventive maintenance practices, abnormal-condition
        reporting, and systematic record-keeping in high-voltage installations.
      </p>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="space-y-10 ">
      {CONFIG.projects.map((project) => (
        <article key={project.title}>
          <h2 className="text-xl font-bold leading-snug text-[#f2eee5]">
            {project.title}
          </h2>
          <p className="mt-1.5 text-[13px] font-normal tracking-[0.16em] text-[#8b867c]">
            {project.year} · {project.type} · {project.status}
          </p>

          <div className="mt-3 space-y-3 text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-300">
            <span className="text-blue-400 font-bold">Stack:</span>{" "}
            {project.technologies.join(" | ")}
          </p>

          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white bg-black py-1.5 rounded-md px-3  underline-offset-4 transition-colors"
              >
                Live site ↗
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-black bg-white py-1.5 rounded-md px-3  underline-offset-4 transition-colors "
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
          <h3 className="text-[14px] font-medium tracking-[0.16em] text-blue-400">
            {category}
          </h3>
          <p className="mt-1.5 text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8">
            {skills.join(" || ")}
          </p>
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
          <h2 className="text-xl font-bold leading-snug text-[#f2eee5]">
            {cert.title}
          </h2>
          <p className="mt-1.5 text-[13px] font-normal tracking-[0.16em] text-[#8b867c]">
            {cert.issuer} · issued {cert.issued}
          </p>
          <p className="mt-3 text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8">
            <span className="text-[#f2eee5]">Skills evaluated:</span>{" "}
            {cert.skills.join(", ")}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white bg-black px-3 py-1.5 rounded-md  underline-offse-4 "
            >
              Verify credential ↗
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
      <h2 className="text-xl font-bold leading-snug text-[#f2eee5]">
        {e.institution}
      </h2>
      <p className="mt-1.5 text-[13px] font-normal tracking-[0.16em] text-[#8b867c]">
        {e.period} · {e.location}
      </p>

      <p className="mt-3 text-[15px] font-semibold text-[#f2eee5] sm:text-base">
        {e.degree} — {e.field}
      </p>

      <p className="mt-2 text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8">
        {e.description}
      </p>

      <p className="mt-4 text-sm">
        <a
          href="/2200910200015.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white bg-black px-3 py-1.5 rounded-md  underline-offse-4 "
        >
          Download transcript (pdf) ↓
        </a>
      </p>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
const SOCIAL_LABEL: Record<string, string> = { Gmail: "Gmail id" };

export default function Home() {
  const [profileOk, setProfileOk] = useState(true);
  const [tab, setTab] = useState<TabId>("experience");

  const [tagline, ...bio] = CONFIG.personal.bio;

  return (
    <div className="min-h-screen bg-[#1B1B1D] font-sans text-[#d6d1c6] selection:bg-[#d0a869] selection:text-[#0d0d0c]">
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
                className="h-30 w-30 shrink-0 rounded-2xl object-cover sm:h-35 sm:w-25"
                onError={() => setProfileOk(false)}
              />
            )}
            <div className="min-w-0">
              <h1 className="text-[38px] leading-none font-semibold tracking-tight text-[#f2eee5] sm:text-5xl">
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

          {/* Bio */}
          <div className="mt-7 space-y-4">
            {bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-[15px] leading-7 text-[#d6d1c6] sm:text-base sm:leading-8"
              >
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
                className="font-semibold text-black px-2 py-1.5 rounded-md bg-green-400  "
              >
                {SOCIAL_LABEL[s.platform] ?? s.platform}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              href="/myresumekinshuk.pdf"
              className="font-semibold text-black bg-white px-2 py-1.5 rounded-md "
            >
              My resume download (pdf)
            </Link>
            <Link
              href="/blogs"
              className="font-semibold text-black bg-gray-400 px-2 py-1.5 rounded-md "
            >
              Read my Blogs
            </Link>
          </div>
        </header>

        {/* ============ NAVIGATION ============ */}
        <hr className="mt-10 border-0 border-t border-[#272521]" />

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
                className={`font-medium text-[16px] py-1.5 px-3 rounded-md  cursor-pointer ${
                  active
                    ? "text-white bg-[#121212]  font-semibold"
                    : "text-[#8b867c] hover:bg-[#121212] hover:text-[#d6d1c6]"
                }`}
              >
                <span aria-hidden className={active ? "" : "opacity-0"}>
                  {" "}
                </span>
                {t.label}
              </button>
            );
          })}
        </nav>

        <hr className="mt-5 border-0 border-t border-[#272521]" />

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
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#272521] pt-5 text-[13px] font-normal tracking-[0.16em] text-[#8b867c]">
          <span>kinshuk jain © {new Date().getFullYear()}</span>
          <span>hand-coded · no templates</span>
        </footer>
      </main>
    </div>
  );
}
