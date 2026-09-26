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
  Linkedin,
  Mail,
  Twitter,
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

/* ── Surface tokens (unchanged from header language) ───── */
const SURFACE =
  "bg-white dark:bg-[#1E1F20] " +
  "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.35)] " +
  "dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_24px_-16px_rgba(0,0,0,0.9)]";

const SUBTLE = "bg-[#F0F4F9] dark:bg-[#282A2C]";

const EASE = "ease-[cubic-bezier(0.2,0,0,1)]";
const SPRING = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#1F1F1F] dark:focus-visible:ring-[#E3E3E3] " +
  "focus-visible:ring-offset-0";

const STATE = "hover:bg-black/[0.06] dark:hover:bg-white/[0.10]";

/* ── Neutral "tint" — mirrors the header's monochrome system ── */
const NEUTRAL = {
  /** transparent icon container, black/white icon */
  idle: "bg-transparent text-[#1F1F1F] dark:text-[#E3E3E3]",
  /** inverted fill — for selected icons & primary actions */
  solid: "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]",
  /** inverted fill — for selected tiles */
  soft: "bg-[#1F1F1F] text-white dark:bg-[#E3E3E3] dark:text-[#1F1F1F]",
} as const;

/* ── Social icon mapping (monochrome only) ──────────────── */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-4.5 w-4.5" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-4.5 w-4.5" aria-hidden="true" />,
  Gmail: <Mail className="h-4.5 w-4.5" aria-hidden="true" />,
  X: <Twitter className="h-4.5 w-4.5" aria-hidden="true" />,
};

/* ── CREDLY BADGE IDS ───────────────────────────────────── */
const CREDLY_BADGES = [
  "f42e01a4-b2d6-4069-8038-db78a81c81b5",
  "a4406a81-77da-4003-b153-9e36582f7877",
  "a0042ec2-cc6e-4a99-84de-a1516ee5775a",
  "0bcd1190-2d68-45ff-91d9-32b65aa93ed8",
];

/* ── SECTION WRAPPER ────────────────────────────────────── */
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
        <span
          className={`
            grid h-10 w-10 shrink-0 place-items-center rounded-[14px]
            ${NEUTRAL.solid}
            shadow-[0_2px_6px_rgba(0,0,0,0.12)]
            transition-transform duration-300 ${SPRING}
          `}
        >
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3] md:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#747775] dark:text-[#8E918F]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#1F1F1F] selection:text-white
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#E3E3E3] dark:selection:text-[#1F1F1F]
      "
    >
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        {/* ============ HERO ============ */}
        <header className="mb-10 space-y-7 md:mb-14">
          {/* Status chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-full
                py-1.5 px-2 ${SURFACE}
              `}
            >
              <span
                className={`
                  grid h-8 w-8 shrink-0 place-items-center rounded-full
                  ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  transition-all duration-300 ${SPRING}
                `}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-[13px] font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                Available for collaboration
              </span>
            </span>

            <span
              className={`
                inline-flex items-center gap-1.5 rounded-full
                py-1.5 px-2 ${SURFACE}
              `}
            >
              <span
                className={`
                  grid h-8 w-8 shrink-0 place-items-center rounded-full
                  ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  transition-all duration-300 ${SPRING}
                `}
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-[13px] font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                {CONFIG.personal.location}
              </span>
            </span>
          </div>

          {/* Heading + bio */}
          <div className="space-y-3">
            <h1 className="h-font text-3xl font-bold tracking-tight text-[#1F1F1F] dark:text-[#E3E3E3] sm:text-4xl md:text-5xl md:leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="text-[#0B57D0] dark:text-[#A8C7FA]">
                Kinshuk
              </span>
              .
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#444746] dark:text-[#C4C7C5] md:text-lg">
              {CONFIG.personal.bio[0]}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-[#444746] dark:text-[#C4C7C5] md:text-base">
              {CONFIG.personal.bio[1]}
            </p>
          </div>

          {/* Social + CTA row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            {/* Social links — shape-morph chips */}
            <div className="flex flex-wrap gap-2">
              {CONFIG.social.map((s) => {
                const icon = SOCIAL_ICONS[s.platform] ?? (
                  <span className="text-[10px] font-bold">@</span>
                );
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group inline-flex items-center gap-2 rounded-full
                      py-2 pl-2 pr-4 ${SURFACE}
                      transition-all duration-300 ${EASE}
                      hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_28px_-14px_rgba(0,0,0,0.55)]
                      dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_12px_28px_-14px_rgba(255,255,255,0.35)]
                      active:scale-[0.96] active:rounded-xl
                      ${FOCUS}
                    `}
                  >
                    <span
                      className={`
                        grid h-8 w-8 shrink-0 place-items-center rounded-full
                        ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                        transition-all duration-300 ${SPRING}
                        group-hover:rounded-[8px]
                      `}
                    >
                      {icon}
                    </span>
                    <span className="text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                      {s.platform}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/myresumekinshuk.pdf"
                className={`
                  inline-flex items-center gap-2 rounded-full
                  bg-[#1F1F1F] px-4 py-2.5 text-sm font-semibold text-white
                  shadow-[0_1px_3px_rgba(0,0,0,0.16),0_8px_20px_-10px_rgba(0,0,0,0.9)]
                  transition-all duration-300 ${EASE}
                  hover:brightness-125
                  hover:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_12px_28px_-10px_rgba(0,0,0,1)]
                  active:scale-[0.95] active:rounded-[18px]
                  dark:bg-[#E3E3E3] dark:text-[#1F1F1F]
                  dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_8px_20px_-10px_rgba(255,255,255,0.55)]
                  dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.7),0_12px_28px_-10px_rgba(255,255,255,0.75)]
                  ${FOCUS}
                `}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download My Resume
              </Link>

              <Link
                href="/blogs"
                className={`
                  inline-flex items-center gap-2 rounded-full px-4 py-2.5
                  text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]
                  ${SURFACE} ${STATE}
                  transition-all duration-300 ${EASE}
                  active:scale-[0.95] active:rounded-[18px]
                  ${FOCUS}
                `}
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Read my blogs, thoughts…
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
            icon={<Briefcase className="h-4 w-4" aria-hidden="true" />}
            title="Experience"
            subtitle="Where I've worked"
          >
            <div
              className={`${SURFACE} rounded-[28px] p-5 md:p-6 transition-all duration-300 ${EASE} hover:-translate-y-0.5`}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
                </h3>
                <span
                  className={`
                    inline-flex w-fit items-center rounded-full px-2.5 py-1
                    text-[10px] font-semibold uppercase tracking-wide
                    ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  `}
                >
                  Jul 2025 – Aug 2025
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#444746] dark:text-[#C4C7C5]">
                Worked with the transmission division to understand the
                operation, protection, and maintenance of 132kV and 220kV
                substations. Prepared technical documentation and maintained
                logs on equipment performance and safety checks.
              </p>
            </div>
          </Section>

          {/* PROJECTS */}
          <Section
            icon={<FolderGit2 className="h-4 w-4" aria-hidden="true" />}
            title="Shipped Stuff"
            subtitle="Selected projects"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {CONFIG.projects.map((project, idx) => (
                <article
                  key={idx}
                  className={`
                    ${SURFACE} rounded-[28px] p-5 md:p-6
                    flex flex-col gap-4
                    transition-all duration-300 ${EASE}
                    hover:-translate-y-1
                    hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(0,0,0,0.6)]
                    dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(255,255,255,0.3)]
                    ${idx === 0 ? "md:col-span-2" : ""}
                  `}
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`
                          inline-flex items-center gap-1.5 rounded-full
                          py-1 pl-1 pr-2.5 text-[10px] font-bold uppercase tracking-wide
                          ${SUBTLE}
                        `}
                      >
                        <span
                          className={`
                            grid h-4 w-4 place-items-center rounded-full
                            ${NEUTRAL.solid}
                          `}
                        >
                          <CheckCircle2
                            className="h-2.5 w-2.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-[#1F1F1F] dark:text-[#E3E3E3]">
                          {project.status}
                        </span>
                      </span>
                      <span className="text-[11px] font-medium text-[#747775] dark:text-[#8E918F]">
                        {project.year} · {project.type}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold leading-snug text-[#1F1F1F] dark:text-[#E3E3E3] md:text-lg">
                      {project.title}
                    </h3>

                    <div className="space-y-2 text-sm leading-7 text-[#444746] dark:text-[#C4C7C5]">
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
                        className={`
                          rounded-full px-2.5 py-1 text-[11px] font-medium
                          ${SUBTLE} text-[#444746] dark:text-[#C4C7C5]
                        `}
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[11px] font-medium
                          ${SUBTLE} text-[#747775] dark:text-[#8E918F]
                        `}
                      >
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
                        className={`
                          inline-flex items-center gap-1.5 rounded-full
                          bg-[#1F1F1F] px-3.5 py-2 text-xs font-semibold text-white
                          shadow-[0_1px_3px_rgba(0,0,0,0.16),0_6px_16px_-8px_rgba(0,0,0,0.9)]
                          transition-all duration-300 ${EASE}
                          hover:brightness-125
                          active:scale-[0.95] active:rounded-[14px]
                          dark:bg-[#E3E3E3] dark:text-[#1F1F1F]
                          dark:shadow-[0_1px_3px_rgba(0,0,0,0.6),0_6px_16px_-8px_rgba(255,255,255,0.5)]
                          ${FOCUS}
                        `}
                      >
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Live
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          inline-flex items-center gap-1.5 rounded-full px-3.5 py-2
                          text-xs font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]
                          ${SURFACE} ${STATE}
                          transition-all duration-300 ${EASE}
                          active:scale-[0.95] active:rounded-[14px]
                          ${FOCUS}
                        `}
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
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
            icon={<Wrench className="h-4 w-4" aria-hidden="true" />}
            title="Tools & Technologies"
            subtitle="What I build with"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(CONFIG.skills).map(([category, skills]) => (
                <div
                  key={category}
                  className={`
                    ${SURFACE} rounded-[28px] p-5
                    transition-all duration-300 ${EASE}
                    hover:-translate-y-0.5
                  `}
                >
                  <h3 className="mb-3 text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className={`
                          rounded-full px-2.5 py-1 text-[11px] font-medium
                          ${SUBTLE} text-[#444746] dark:text-[#C4C7C5]
                        `}
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
            icon={<Award className="h-4 w-4" aria-hidden="true" />}
            title="Certifications"
            subtitle="Verified badges & exams"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {CREDLY_BADGES.map((badgeId) => (
                <div
                  key={badgeId}
                  className={`
                    group flex min-w-0 items-center justify-center overflow-hidden
                    rounded-[28px] p-3 ${SURFACE}
                    transition-all duration-300 ${EASE}
                    hover:-translate-y-1
                    hover:shadow-[0_2px_6px_rgba(0,0,0,0.1),0_18px_40px_-20px_rgba(0,0,0,0.6)]
                    dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.7),0_18px_40px_-20px_rgba(255,255,255,0.3)]
                  `}
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
            icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}
            title="Education"
            subtitle="Academic background"
          >
            <div
              className={`${SURFACE} rounded-[28px] p-5 md:p-6 transition-all duration-300 ${EASE} hover:-translate-y-0.5`}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                  {CONFIG.education.institution}
                </h3>
                <span
                  className={`
                    inline-flex w-fit items-center rounded-full px-2.5 py-1
                    text-[10px] font-semibold uppercase tracking-wide
                    ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  `}
                >
                  {CONFIG.education.period}
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]">
                {CONFIG.education.degree} — {CONFIG.education.field}
              </p>
              <p className="text-xs text-[#747775] dark:text-[#8E918F]">
                {CONFIG.education.location}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#444746] dark:text-[#C4C7C5]">
                {CONFIG.education.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span
                  className={`
                    inline-flex items-center gap-1.5 rounded-full
                    py-1 pl-1 pr-3 text-[11px] font-semibold
                    ${SUBTLE} text-[#1F1F1F] dark:text-[#E3E3E3]
                  `}
                >
                  <span
                    className={`
                      grid h-5 w-5 place-items-center rounded-full
                      ${NEUTRAL.solid}
                    `}
                  >
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span>Degree Completed</span>
                </span>

                <a
                  href="/2200910200015.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
                    text-[11px] font-semibold text-[#1F1F1F] dark:text-[#E3E3E3]
                    ${SURFACE} ${STATE}
                    transition-all duration-300 ${EASE}
                    active:scale-[0.95] active:rounded-[12px]
                    ${FOCUS}
                  `}
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download PDC
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-xs text-[#747775] dark:text-[#8E918F]">
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
