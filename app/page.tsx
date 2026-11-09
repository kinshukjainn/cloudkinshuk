"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Download,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  Twitter,
  FolderGit2,
  Code2,
  Award,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Cpu,
  BadgeCheck,
} from "lucide-react";

/* ── TYPES ──────────────────────────────────────────────── */
type SocialLink = {
  platform: string;
  url: string;
  icon: React.ElementType;
};

type Certification = {
  title: string;
  issuer: string;
  issued: string;
  skills: string[];
  verifyUrl: string;
};

type TabId =
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "education";

/* ── CONFIGURATION ──────────────────────────────────────── */
const CONFIG = {
  personal: {
    email: "kinshuk25jan04@gmail.com",
    location: "Ghaziabad, UP, India",
    bio: [
      "I build secure software and cloud-native systems.",
      "Electrical Engineering graduate working across full-stack development, AWS infrastructure, and AI-powered applications.",
      "I have completed my graduation in Electrical Engineering, where I learned how systems work, how they fail, and how they evolve. Alongside that, I have been exploring cloud technologies, building small projects that could someday scale, experimenting with infrastructure, and understanding how technology connects people.",
    ],
    status:
      "Completed an internship at UPPTCL (Uttar Pradesh Power Transmission Corporation Limited), where I gained hands-on experience in power systems and transmission network operations.",
  },
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kinshukjainn",
      icon: Github,
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/kinshukjainn/",
      icon: Linkedin,
    },
    { platform: "Gmail", url: "mailto:kinshuk25jan04@gmail.com", icon: Mail },
    { platform: "X", url: "http://x.com/realkinshuk004", icon: Twitter },
  ] as SocialLink[],
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

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
];

/* ── PANELS ─────────────────────────────────────────────── */
function ExperiencePanel() {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-black mb-1">
        UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
      </h2>
      <p className="text-base font-semibold text-gray-700 mb-6">
        Internship • Jul 2025 – Aug 2025
      </p>

      <p className="text-[17px] leading-8 text-gray-900 mb-8">
        Gained practical exposure to the operation, monitoring, and maintenance
        of 132 kV and 220 kV extra-high-voltage (EHV) substations, understanding
        their role in transmitting bulk electrical power from generating
        stations and the interstate transmission network to distribution
        substations across Uttar Pradesh. Studied substation layouts,
        single-line diagrams (SLDs), and power flow through key equipment.
      </p>

      <Link
        className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-md text-base font-medium"
        href="/blogs/upptcl-exp"
      >
        <BookOpen className="h-5 w-5" />
        Read Full Experience
      </Link>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="space-y-12">
      {CONFIG.projects.map((project) => (
        <article
          key={project.title}
          className="pb-12 border-b border-gray-200 last:border-0 last:pb-0"
        >
          <h2 className="text-2xl font-bold text-black mb-2">
            {project.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gray-200 text-black px-3 py-1 rounded-sm text-sm font-semibold">
              {project.type}
            </span>
            <span className="bg-gray-200 text-black px-3 py-1 rounded-sm text-sm font-semibold">
              {project.status}
            </span>
            <span className="text-gray-700 text-sm font-semibold">
              {project.year}
            </span>
          </div>

          <div className="space-y-4 text-[17px] leading-8 text-gray-900 mb-6">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-base font-bold text-black mb-3">Technologies:</p>
            <p className="text-[17px] text-gray-800 leading-relaxed">
              {project.technologies.join(" • ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-md text-base font-medium"
              >
                <ExternalLink className="h-5 w-5" />
                View Live Site
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-200 text-black px-5 py-2.5 rounded-md text-base font-medium"
              >
                <Code2 className="h-5 w-5" />
                Source Code
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="space-y-10">
      {Object.entries(CONFIG.skills).map(([category, skills]) => (
        <div key={category}>
          <h3 className="text-lg font-bold text-black mb-3 pb-2 border-b border-gray-200">
            {category}
          </h3>
          <p className="text-[17px] leading-8 text-gray-900">
            {skills.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

function CertificationsPanel() {
  return (
    <div className="space-y-12">
      {CERTIFICATIONS.map((cert) => (
        <div
          key={cert.verifyUrl}
          className="pb-12 border-b border-gray-200 last:border-0 last:pb-0"
        >
          <div className="flex items-start gap-3 mb-2">
            <BadgeCheck className="h-7 w-7 text-black shrink-0" />
            <h2 className="text-2xl font-bold text-black">{cert.title}</h2>
          </div>

          <p className="text-base font-semibold text-gray-700 mb-4 pl-10">
            {cert.issuer} • Issued {cert.issued}
          </p>

          <p className="text-[17px] leading-8 text-gray-900 mb-6 pl-10">
            <span className="font-bold">Skills evaluated:</span>{" "}
            {cert.skills.join(", ")}
          </p>

          <div className="pl-10">
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-200 text-black px-5 py-2.5 rounded-md text-base font-medium"
            >
              Verify Credential
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationPanel() {
  const e = CONFIG.education;
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-black mb-1">{e.institution}</h2>

      <p className="text-base font-semibold text-gray-700 mb-6">
        {e.location} • {e.period}
      </p>

      <p className="text-[19px] font-bold text-black mb-4">
        {e.degree} in {e.field}
      </p>

      <p className="text-[17px] leading-8 text-gray-900 mb-8">
        {e.description}
      </p>

      <a
        href="/2200910200015.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-md text-base font-medium"
      >
        <Download className="h-5 w-5" />
        Download Transcript (PDF)
      </a>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
const SOCIAL_LABEL: Record<string, string> = {
  Gmail: "Email",
  X: "X (Twitter)",
};

export default function Home() {
  const [profileOk, setProfileOk] = useState(true);
  const [tab, setTab] = useState<TabId>("experience");

  const [tagline, ...bio] = CONFIG.personal.bio;

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <main className="mx-auto w-full max-w-[700px] px-6 py-16 sm:py-24">
        {/* ============ HEADER ============ */}
        <header className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            {profileOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/profile.jpg"
                alt="Kinshuk Jain"
                className="h-24 w-24 shrink-0 rounded-full object-cover bg-gray-100"
                onError={() => setProfileOk(false)}
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-black tracking-tight mb-2">
                Kinshuk Jain
              </h1>
              <p className="flex items-center gap-2 text-base font-semibold text-gray-700">
                <MapPin className="h-4 w-4" /> {CONFIG.personal.location}
              </p>
            </div>
          </div>

          <div className="space-y-5 text-[18px] leading-8 text-gray-900 mb-10">
            <p className="font-bold text-[20px]">{tagline}</p>
            {bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Social Actions (Solid & Clear) */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {CONFIG.social.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-100 text-black px-4 py-2.5 rounded-md text-base font-medium hover:bg-gray-200 transition-none"
                >
                  <Icon className="h-5 w-5" />
                  {SOCIAL_LABEL[s.platform] ?? s.platform}
                </a>
              );
            })}
          </div>

          {/* Primary Actions (Solid & Clear) */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/myresumekinshuk.pdf"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-base font-medium"
            >
              <Download className="h-5 w-5" />
              Download Resume (PDF)
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 rounded-md text-base font-medium"
            >
              <BookOpen className="h-5 w-5" />
              Read my Blogs
            </Link>
          </div>
        </header>

        {/* ============ NAVIGATION ============ */}
        <nav
          role="tablist"
          aria-label="Portfolio sections"
          className="flex flex-wrap gap-x-8 gap-y-4 border-b border-gray-200 mb-10"
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 pb-4 text-base font-bold transition-none ${
                  active
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* ============ ACTIVE PANEL ============ */}
        <div
          key={tab}
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "experience" && <ExperiencePanel />}
          {tab === "skills" && <SkillsPanel />}
          {tab === "certifications" && <CertificationsPanel />}
          {tab === "projects" && <ProjectsPanel />}
          {tab === "education" && <EducationPanel />}
        </div>

        {/* ============ FOOTER ============ */}
        <footer className="mt-24 border-t border-gray-200 pt-8 text-sm font-semibold text-gray-700 flex flex-col sm:flex-row justify-between gap-4">
          <span>Kinshuk Jain © {new Date().getFullYear()}</span>
          <span>Hand-coded • No templates</span>
        </footer>
      </main>
    </div>
  );
}
