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
  Fingerprint,
  Cloud,
} from "lucide-react";
import Link from "next/link";
import Recommendation from "./components/Recommendation";
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
  credentialId: string;
  skills: string[];
  verifyUrl: string;
  icon: React.ReactNode;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "Issued September 2026",
    credentialId: "f42e01a4-b2d6-4069-8038-db78a81c81b5",
    skills: ["Cloud Concepts", "AWS Core Services", "Billing & Pricing"],
    verifyUrl:
      "https://www.credly.com/badges/f42e01a4-b2d6-4069-8038-db78a81c81b5/public",
    icon: <Cloud className="h-5 w-5" aria-hidden="true" />,
  },
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
    <section className="mb-14">
      <div className="mb-6 border-b-2 border-[#1f1f1f] pb-2 dark:border-[#e3e3e3]">
        <h2 className="flex items-center gap-2 text-xl font-bold uppercase tracking-widest text-[#1F1F1F] dark:text-[#E3E3E3]">
          {icon}
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm italic text-[#555] dark:text-[#aaa]">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

/* ── CERTIFICATION CARD ─────────────────────────────────── */
function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className="mb-8 block">
      <h3 className="flex items-center gap-2 text-lg font-bold text-[#1F1F1F] dark:text-[#E3E3E3]">
        {cert.icon} {cert.title}
        <span className="bg-[#1f1f1f] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white dark:bg-[#e3e3e3] dark:text-[#1f1f1f]">
          Verified
        </span>
      </h3>
      <p className="mt-1 text-base font-bold text-[#444] dark:text-[#ccc]">
        {cert.issuer}
      </p>

      <div className="mt-2 flex flex-col gap-1 text-sm text-[#555] dark:text-[#aaa]">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" /> {cert.issued}
        </span>
        <span className="flex items-center gap-1.5">
          <Fingerprint className="h-4 w-4" /> Credential ID: {cert.credentialId}
        </span>
      </div>

      <p className="mt-3 text-sm text-[#444] dark:text-[#ccc]">
        <strong>Skills evaluated:</strong> {cert.skills.join(", ")}
      </p>

      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 font-bold text-blue-700 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <ExternalLink className="h-4 w-4" /> Verify on official portal
      </a>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  /* Track image load failures so we can fall back to a gradient
     banner and an initial-letter avatar gracefully. */
  const [bannerOk, setBannerOk] = useState(true);
  const [profileOk, setProfileOk] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] selection:bg-[#111] selection:text-white dark:bg-black dark:text-[#eee] dark:selection:bg-[#eee] dark:selection:text-[#111]">
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* ============ HERO ============ */}
        <header className="mb-14">
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
                text-3xl font-extrabold text-white
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
            <div className="flex flex-col gap-2 text-sm font-bold sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {CONFIG.personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Available for collaboration
              </span>
            </div>

            <div className="space-y-4 text-base leading-relaxed md:text-lg">
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Social Links — editorial chip style */}
            <div className="flex flex-wrap gap-3 pt-2">
              {CONFIG.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-1.5 rounded-md
                    bg-blue-900 px-2.5 py-1.5
                    text-xs font-bold  tracking-wider text-white
                    transition-colors duration-300
                    
                    dark:bg-[#e3e3e3] dark:text-[#111]
                    dark:hover:bg-blue-400 dark:hover:text-[#0a0a0a]
                  "
                >
                  {SOCIAL_ICONS[s.platform]} {s.platform}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6 pt-2 font-bold">
              <Link
                href="/myresumekinshuk.pdf"
                className="flex items-center gap-1.5 text-black px-2 py-1/2 dark:bg-yellow-400  bg-yellow-500 dark:text-black rounded"
              >
                <Download className="h-4 w-4" /> Download My Resume
              </Link>

              <Link
                href="/blogs"
                className="flex items-center gap-1.5 text-black px-2 py-1/2 bg-blue-500 dark:bg-blue-400  dark:text-black rounded"
              >
                <BookOpen className="h-4 w-4" /> Read my blogs, thoughts…
              </Link>
            </div>
          </div>
        </header>

        {/* ============ RECOMMENDATION ============ */}
        <div className="mb-14">
          <Recommendation />
        </div>

        {/* ============ CONTENT STACK ============ */}
        <div className="space-y-16">
          {/* EXPERIENCE */}
          <Section
            icon={<Briefcase className="h-5 w-5" />}
            title="Experience"
            subtitle="Where I've worked"
          >
            <div className="block">
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-bold">
                  UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
                </h3>
                <span className="shrink-0 text-sm font-bold text-[#555] dark:text-[#aaa]">
                  Jul 2025 – Aug 2025
                </span>
              </div>
              <p className="text-base leading-relaxed">
                Worked with the transmission division to understand the
                operation, protection, and maintenance of 132kV and 220kV
                substations. Prepared technical documentation and maintained
                logs on equipment performance and safety checks.
              </p>
            </div>
          </Section>

          {/* PROJECTS */}
          <Section
            icon={<FolderGit2 className="h-5 w-5" />}
            title="Shipped Stuff"
            subtitle="Selected projects"
          >
            <div className="space-y-10">
              {CONFIG.projects.map((project, idx) => (
                <div key={idx} className="block">
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-bold">
                      {project.title}{" "}
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-400">
                        [{project.status.toUpperCase()}]
                      </span>
                    </h3>
                    <span className="shrink-0 text-sm font-bold text-[#555] dark:text-[#aaa]">
                      {project.year} • {project.type}
                    </span>
                  </div>

                  <div className="mb-4 space-y-3 text-base leading-relaxed">
                    {project.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <p className="mb-4 text-sm text-[#444] dark:text-[#ccc]">
                    <strong className="text-[#111] dark:text-[#eee]">
                      Technologies:
                    </strong>{" "}
                    {project.technologies.join(" • ")}
                  </p>

                  <div className="flex gap-6 text-sm font-bold">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 dark:text-white text-white dark:bg-red-800 bg-red-700 px-2 py-1 rounded-xs dark:text-white"
                      >
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 dark:text-white text-white dark:bg-blue-800 bg-blue-800 px-2 py-1 rounded-xs dark:text-white"
                      >
                        <Github className="h-4 w-4" /> Source
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* SKILLS */}
          <Section
            icon={<Wrench className="h-5 w-5" />}
            title="Tools & Technologies"
            subtitle="What I build with"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(CONFIG.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="mb-1 text-base font-bold uppercase tracking-wide">
                    {category}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#444] dark:text-[#ccc]">
                    {skills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* CERTIFICATIONS */}
          <Section
            icon={<Award className="h-5 w-5" />}
            title="Certifications"
            subtitle="Verified badges & exams"
          >
            <div className="space-y-8">
              {CERTIFICATIONS.map((cert) => (
                <CertificationCard key={cert.credentialId} cert={cert} />
              ))}
            </div>
          </Section>

          {/* EDUCATION */}
          <Section
            icon={<GraduationCap className="h-5 w-5" />}
            title="Education"
            subtitle="Academic background"
          >
            <div className="block">
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-bold">
                  {CONFIG.education.institution}
                </h3>
                <span className="shrink-0 text-sm font-bold text-[#555] dark:text-[#aaa]">
                  {CONFIG.education.period}
                </span>
              </div>

              <p className="mb-1 text-base font-bold text-[#333] dark:text-[#bbb]">
                {CONFIG.education.degree} — {CONFIG.education.field}
              </p>

              <p className="mb-4 text-sm italic text-[#555] dark:text-[#aaa]">
                {CONFIG.education.location}
              </p>

              <p className="mb-5 text-base leading-relaxed">
                {CONFIG.education.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Degree Completed
                </span>
                <span className="text-[#aaa]">|</span>
                <a
                  href="/2200910200015.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-700 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Download className="h-4 w-4" /> Download PDF Transcript
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
