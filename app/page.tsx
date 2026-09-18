"use client";

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
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import Recommendation from "./components/Recommendation";

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
      icon: "linkedin",
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

// --- SHARED TOKENS ---
const surfaceCard = "rounded-4xl bg-[#f0f4f9] dark:bg-[#191919] p-5 md:p-6";
const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] dark:border-[#444746] px-3 py-1 text-xs font-medium text-[#444746] dark:text-[#c4c7c5]";
const iconChip =
  "inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d3e3fd] dark:bg-[#004a77] text-[#0842a0] dark:text-[#d3e3fd]";
const linkPrimary =
  "text-[#0b57d0] hover:text-[#0842a0] dark:text-[#a8c7fa] dark:hover:text-[#d3e3fd] transition-colors";

// --- CREDLY BADGE IDS ---
const CREDLY_BADGES = [
  "f42e01a4-b2d6-4069-8038-db78a81c81b5",
  "a4406a81-77da-4003-b153-9e36582f7877",
  "a0042ec2-cc6e-4a99-84de-a1516ee5775a",
  "0bcd1190-2d68-45ff-91d9-32b65aa93ed8",
];

// --- SECTION WRAPPER ---
function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className={iconChip}>{icon}</span>
        <div>
          <h2 className="text-lg font-medium tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] md:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#747775] dark:text-[#8e918f]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1f1f1f] selection:bg-[#d3e3fd] selection:text-[#0842a0] dark:bg-[#1f1f1f] dark:text-[#e3e3e3] dark:selection:bg-[#004a77] dark:selection:text-[#d3e3fd]">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        {/* ============ HERO ============ */}
        <header className="mb-10 space-y-6 md:mb-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className={chip}>
              <Sparkles className="h-3.5 w-3.5" />
              Available for collaboration
            </span>
            <span className={chip}>
              <MapPin className="h-3.5 w-3.5" />
              {CONFIG.personal.location}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3] h-font sm:text-4xl md:text-5xl md:leading-[1.1]">
              Hi, I&apos;m <span className="font-bold">Kinshuk</span>.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#444746] dark:text-[#c4c7c5] md:text-lg">
              {CONFIG.personal.bio[0]}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-[#444746] dark:text-[#c4c7c5] md:text-base">
              {CONFIG.personal.bio[1]}
            </p>
          </div>

          {/* Social + CTA row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {CONFIG.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#c4c7c5] px-3.5 py-1.5 text-xs font-medium text-[#444746] transition-colors hover:bg-[#f0f4f9] dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
                >
                  {s.platform}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/myresumekinshuk.pdf"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0b57d0] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0842a0] dark:bg-[#a8c7fa] dark:text-[#062e6f] dark:hover:bg-[#d3e3fd]"
              >
                <Download className="h-4 w-4" />
                Download My Resume
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-4 py-2 text-sm font-medium text-[#0b57d0] transition-colors hover:bg-[#f0f4f9] dark:border-[#444746] dark:text-[#a8c7fa] dark:hover:bg-[#282a2c]"
              >
                <BookOpen className="h-4 w-4" />
                Read my blogs, thoughts..{"+"}
              </Link>
            </div>
          </div>
        </header>

        {/* ============ RECOMMENDATION ============ */}
        <div className="mb-10 md:mb-14">
          <Recommendation />
        </div>

        {/* ============ CONTENT STACK ============ */}
        <div className="space-y-10 md:space-y-14">
          {/* EXPERIENCE */}
          <Section
            icon={<Briefcase className="h-4 w-4" />}
            title="Experience"
            subtitle="Where I've worked"
          >
            <div className={surfaceCard}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">
                  UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
                </h3>
                <span className="text-xs text-[#747775] dark:text-[#8e918f]">
                  Jul 2025 – Aug 2025
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-[#444746] dark:text-[#c4c7c5]">
                Worked with the transmission division to understand the
                operation, protection, and maintenance of 132kV and 220kV
                substations. Prepared technical documentation and maintained
                logs on equipment performance and safety checks.
              </p>
            </div>
          </Section>

          {/* PROJECTS */}
          <Section
            icon={<FolderGit2 className="h-4 w-4" />}
            title="Shipped Stuff"
            subtitle="Selected projects"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {CONFIG.projects.map((project, idx) => (
                <article
                  key={idx}
                  className={`${surfaceCard} flex flex-col gap-4 ${
                    idx === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          project.status === "Live"
                            ? "rounded-full bg-[#d3e3fd] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#0842a0] dark:bg-[#004a77] dark:text-[#d3e3fd]"
                            : "rounded-full bg-[#f0f4f9] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#444746] dark:bg-[#282a2c] dark:text-[#c4c7c5]"
                        }
                      >
                        {project.status}
                      </span>
                      <span className="text-[11px] text-[#747775] dark:text-[#8e918f]">
                        {project.year} · {project.type}
                      </span>
                    </div>

                    <h3 className="text-base font-medium leading-snug text-[#1f1f1f] dark:text-[#e3e3e3] md:text-lg">
                      {project.title}
                    </h3>

                    <div className="space-y-2 text-sm leading-7 text-[#444746] dark:text-[#c4c7c5]">
                      {project.description.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((t, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-[#444746] dark:bg-[#282a2c] dark:text-[#c4c7c5]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-[#747775] dark:bg-[#282a2c] dark:text-[#8e918f]">
                        +{project.technologies.length - 6}
                      </span>
                    )}
                  </div>

                  {/* Action row */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0b57d0] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0842a0] dark:bg-[#a8c7fa] dark:text-[#062e6f] dark:hover:bg-[#d3e3fd]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#c4c7c5] px-3.5 py-1.5 text-xs font-medium text-[#444746] transition-colors hover:bg-white dark:border-[#444746] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* SKILLS */}
          <Section
            icon={<Wrench className="h-4 w-4" />}
            title="Tools & Technologies"
            subtitle="What I build with"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(CONFIG.skills).map(([category, skills]) => (
                <div key={category} className={surfaceCard}>
                  <h3 className="mb-3 text-sm font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#444746] dark:bg-[#282a2c] dark:text-[#c4c7c5]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* CERTIFICATIONS */}
          <Section
            icon={<Award className="h-4 w-4" />}
            title="Certifications"
            subtitle="Verified badges & exams"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {CREDLY_BADGES.map((badgeId) => (
                <div
                  key={badgeId}
                  className="group flex min-w-0 items-center justify-center overflow-hidden rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:ring-white/10"
                >
                  <div
                    data-iframe-width="150"
                    data-iframe-height="270"
                    data-share-badge-id={badgeId}
                    data-share-badge-host="https://www.credly.com"
                  />
                </div>
              ))}
            </div>

            <Script
              id="credly-embed-script"
              src="https://cdn.credly.com/assets/utilities/embed.js"
              strategy="afterInteractive"
            />
          </Section>

          {/* EDUCATION */}
          <Section
            icon={<GraduationCap className="h-4 w-4" />}
            title="Education"
            subtitle="Academic background"
          >
            <div className={surfaceCard}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">
                  {CONFIG.education.institution}
                </h3>
                <span className="text-xs text-[#747775] dark:text-[#8e918f]">
                  {CONFIG.education.period}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-[#0b57d0] dark:text-[#a8c7fa]">
                {CONFIG.education.degree} — {CONFIG.education.field}
              </p>
              <p className="text-xs text-[#747775] dark:text-[#8e918f]">
                {CONFIG.education.location}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#444746] dark:text-[#c4c7c5]">
                {CONFIG.education.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#444746] dark:text-[#c4c7c5]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0b57d0] dark:text-[#a8c7fa]" />
                  Degree Completed
                </span>
                <a
                  href="/2200910200015.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${linkPrimary}`}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDC
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e0e3e7] py-8 text-center text-xs text-[#747775] dark:border-[#2d2f31] dark:text-[#8e918f]">
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
