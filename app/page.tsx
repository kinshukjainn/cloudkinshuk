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
  Code2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
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
  logo: string;
  skills: string[];
  verifyUrl: string;
};

type Project = {
  title: string;
  year: string;
  status: string;
  type: string;
  images: string[];
  description: string[];
  technologies: string[];
  links: { live: string | null; repo: string | null };
};

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
      platform: "Github",
      url: "https://github.com/kinshukjainn",
      icon: Github,
    },
    {
      platform: "Linkedin",
      url: "https://linkedin.com/in/kinshukjainn/",
      icon: Linkedin,
    },
    {
      platform: "@kinshuk25jan04",
      url: "mailto:kinshuk25jan04@gmail.com",
      icon: Mail,
    },
    {
      platform: "@realkinshuk004",
      url: "http://x.com/realkinshuk004",
      icon: Twitter,
    },
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
      type: "Cloud Storage Platform",
      images: ["/koshaimageone.png", "/koshasigninpage.png"],
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
      images: [],
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
      images: ["/opaqueimageone.png", "/opaquedashboard.png"],
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
  ] as Project[],
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
    logo: "/aws.jpg",
    skills: ["Cloud Concepts", "AWS Core Services", "Billing & Pricing"],
    verifyUrl:
      "https://www.credly.com/badges/f42e01a4-b2d6-4069-8038-db78a81c81b5/public_url",
  },
];

/* ── COMPONENTS ─────────────────────────────────────────── */

function SubHeading({ title }: { title: string }) {
  return (
    <h3 className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-4">
      {title}
    </h3>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-[28px] font-light text-[#0066cc] mb-6">{title}</h2>
  );
}

function ProjectBanner({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;

  const total = images.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="relative w-full mb-3 bg-[#f5f5f5] border border-[#dddddd] aspect-video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={`${title} preview ${index + 1}`}
        className="h-full w-full object-cover"
      />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */

export default function Home() {
  const [profileOk, setProfileOk] = useState(true);
  const [tagline, ...bio] = CONFIG.personal.bio;

  return (
    <div className="min-h-screen bg-white text-[#333333] ">
      <main className="mx-auto w-full max-w-[1024px] px-6 py-10">
        {/* ============ TOP HEADER / HERO ============ */}
        <header className="flex flex-col md:flex-row gap-8 mb-16 border-b border-[#eeeeee] pb-12">
          {/* Left: Image Box (Mimicking the VLC Carousel position) */}
          <div className="md:w-1/2">
            {profileOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/profile.jpg"
                alt="Kinshuk Jain"
                className="w-full aspect-video object-cover border border-[#dddddd]"
                onError={() => setProfileOk(false)}
              />
            ) : (
              <div className="w-full aspect-video bg-[#f5f5f5] border border-[#dddddd]" />
            )}
          </div>

          {/* Right: Title, Bio, Download (Mimicking the right side of VLC header) */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-[36px] font-light text-[#0066cc] mb-2 leading-tight">
              Kinshuk Jain
            </h1>

            <p className="text-[13px] text-[#666666] mb-4 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {CONFIG.personal.location}
            </p>

            <div className="text-[13px] leading-[1.6] text-[#333333] mb-6 space-y-3">
              <p>{tagline}</p>
              {bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4">
              <Link
                href="/myresumekinshuk.pdf"
                className="inline-flex items-center justify-center gap-2 bg-[#0066cc] text-white px-6 py-2.5 text-[15px] font-bold hover:bg-[#005bb5]"
              >
                Download Resume <Download className="h-4 w-4" />
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[#0066cc] hover:underline text-[13px] px-2"
              >
                Read my Blogs <BookOpen className="h-3 w-3" />
              </Link>
            </div>

            {/* Social Icons row mimicking the gray OS icons on VLC */}
            <div className="flex items-center gap-3 text-[#777777]">
              {CONFIG.social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#333333]"
                    aria-label={s.platform}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </header>

        {/* ============ PROJECTS SECTION ============ */}
        <section className="mb-16">
          <SectionHeading title="Projects" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONFIG.projects.map((project, idx) => (
              <div key={idx}>
                <SubHeading title={project.type} />
                <ProjectBanner images={project.images} title={project.title} />
                <h4 className="text-[15px] font-bold text-[#0066cc] mb-1">
                  {project.title}
                </h4>
                <p className="text-[11px] text-[#666666] mb-2">
                  {project.year} | {project.status}
                </p>
                <div className="text-[12px] leading-[1.5] text-[#333333] mb-3 space-y-2">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className="text-[11px] text-[#555555] mb-3 italic">
                  Tech: {project.technologies.join(", ")}
                </p>

                <div className="flex flex-col gap-1 text-[12px]">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] hover:underline flex items-center gap-1"
                    >
                      Check live project <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] hover:underline flex items-center gap-1"
                    >
                      Github repository <Code2 className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ SKILLS SECTION ============ */}
        <section className="mb-16 border-t border-[#eeeeee] pt-10">
          <SectionHeading title="Skills & Tools" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div key={category}>
                <SubHeading title={category} />
                <ul className="text-[13px] text-[#333333] leading-[1.8]">
                  {skills.map((skill) => (
                    <li key={skill} className="text-[#0066cc]">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============ EXPERIENCE & EDUCATION ============ */}
        <section className="mb-16 border-t border-[#eeeeee] pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Experience */}
            <div>
              <SectionHeading title="Experience" />
              <SubHeading title="INTERNSHIP" />
              <h4 className="text-[15px] font-bold text-[#333333] mb-1">
                UPPTCL — Uttar Pradesh Power Transmission Corporation Limited
              </h4>
              <p className="text-[12px] text-[#666666] mb-3">
                Jul 2025 – Aug 2025
              </p>
              <p className="text-[13px] leading-[1.6] text-[#333333] mb-3">
                Gained practical exposure to the operation, monitoring, and
                maintenance of 132 kV and 220 kV extra-high-voltage (EHV)
                substations, understanding their role in transmitting bulk
                electrical power from generating stations and the interstate
                transmission network to distribution substations across Uttar
                Pradesh. Studied substation layouts, single-line diagrams
                (SLDs), and power flow through key equipment.
              </p>
              <Link
                href="/blogs/upptcl-exp"
                className="text-[#0066cc] hover:underline text-[12px] flex items-center gap-1 uppercase font-bold"
              >
                Read More
              </Link>
            </div>

            {/* Education */}
            <div>
              <SectionHeading title="Education" />
              <SubHeading title="DEGREE" />
              <h4 className="text-[15px] font-bold text-[#333333] mb-1">
                {CONFIG.education.institution}
              </h4>
              <p className="text-[13px] text-[#333333] mb-1">
                {CONFIG.education.degree} in {CONFIG.education.field}
              </p>
              <p className="text-[12px] text-[#666666] mb-3">
                {CONFIG.education.location} | {CONFIG.education.period}
              </p>
              <p className="text-[13px] leading-[1.6] text-[#333333] mb-4">
                {CONFIG.education.description}
              </p>

              <div className="flex flex-col gap-1 text-[12px]">
                <a
                  href="/2200910200015.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066cc] hover:underline"
                >
                  Download PDC
                </a>
                <a
                  href="/degreecertificate.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066cc] hover:underline"
                >
                  Download Digilocker verified PDC
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS ============ */}
        <section className="mb-16 border-t border-[#eeeeee] pt-10">
          <SectionHeading title="Certifications" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.verifyUrl}>
                <SubHeading title="CREDENTIAL" />
                <div className="flex items-start gap-3 mb-2">
                  {cert.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.logo}
                      alt={`${cert.issuer} logo`}
                      className="h-10 w-10 border border-[#dddddd] object-cover"
                    />
                  )}
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0066cc]">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-[#666666]">
                      {cert.issuer} | Issued {cert.issued}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-[#333333] mb-2">
                  <strong>Evaluated:</strong> {cert.skills.join(", ")}
                </p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066cc] hover:underline text-[12px] uppercase font-bold"
                >
                  VERIFY CREDENTIAL
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="border-t border-[#eeeeee] pt-6 flex flex-col md:flex-row justify-between text-[11px] text-[#888888] uppercase tracking-wide">
          <span>Kinshuk Jain © {new Date().getFullYear()}</span>
          <span>Hand-coded • No templates</span>
        </footer>
      </main>
    </div>
  );
}
