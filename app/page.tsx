"use client";

import {
  Github,
  ExternalLink,
  Download,
  BookOpen,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
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
  certifications: [
    {
      title: "AWS Getting started with storage services",
      organization: "AWS",
      status: "Completed",
      year: "2025 July",
      url: "https://www.credly.com/badges/a4406a81-77da-4003-b153-9e36582f7877/public_url",
      description:
        "Digital badge covering storage services concepts and AWS storage solutions",
      skills: ["Amazon S3", "Amazon EBS", "Amazon EFS", "AWS Storage Gateway"],
    },
    {
      title: "AWS Cloud Practitioner Exam - CLF-02",
      organization: "AWS",
      status: "Preparing",
      year: "2025",
      description:
        "Comprehensive certification covering AWS top 40 best core services of aws",
      skills: ["Cloud Computing", "AWS Services", "Security", "Pricing Models"],
    },
    {
      title: "AWS Developer Cloud Associate - DVA-02",
      organization: "AWS",
      status: "Preparing",
      year: "2025",
      description:
        "Certification focused on AWS development and deployment best practices, covering core AWS services, security, and application development concepts",
      skills: ["Cloud Computing", "AWS Services", "Security", "Pricing Models"],
    },
    {
      title: "AWS Serverless Badge",
      organization: "AWS",
      status: "Completed",
      year: "2024",
      url: "https://www.credly.com/badges/0bcd1190-2d68-45ff-91d9-32b65aa93ed8/public_url",
      description:
        "Digital badge demonstrating serverless architecture knowledge and implementation",
      skills: [
        "Amazon Lambda",
        "API Gateway",
        "DynamoDB",
        "Serverless Framework",
      ],
    },
    {
      title: "AWS Machine Learning Badge",
      organization: "AWS",
      status: "Completed",
      year: "2025",
      url: "https://www.credly.com/badges/a0042ec2-cc6e-4a99-84de-a1516ee5775a/public_url",
      description:
        "Digital badge covering machine learning concepts and AWS ML services",
      skills: ["ML Algorithms", "Data Processing", "Model Deployment"],
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

// --- COMPONENTS ---

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mt-16 mb-6">
    {title}
  </h2>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-200 selection:bg-blue-200 dark:selection:bg-blue-900 selection:text-black dark:selection:text-white">
      {/* Widen max-width to max-w-4xl/5xl to give it a broader document feel */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* HEADER / INTRO */}
        <section className="space-y-6 mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
            Hi, I&apos;m Kinshuk.
          </h1>

          <div className="space-y-4 text-base md:text-lg leading-relaxed max-w-3xl">
            {CONFIG.personal.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pt-2 text-base">
            <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <MapPin className="w-4 h-4" />
              {CONFIG.personal.location}
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {CONFIG.social.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link
              href="/kinshukkjainnresume.pdf"
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium text-lg"
            >
              <Download className="w-4 h-4" /> Resume
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium text-lg"
            >
              <BookOpen className="w-4 h-4" /> Read Blog
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <Recommendation />
        </section>

        {/* EXPERIENCE */}
        <section className="mb-16">
          <SectionHeader title="Experience" />
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <h3 className="text-lg font-bold text-black dark:text-white">
                UPPTCL (Uttar Pradesh Power Transmission Corporation Limited)
              </h3>
              <span className="text-sm text-neutral-500 font-medium">
                Jul 2025 - Aug 2025
              </span>
            </div>
            <p className="text-base leading-relaxed">
              Worked with the transmission division to understand the operation,
              protection, and maintenance of 132kV and 220kV substations.
              Prepared technical documentation and maintained logs on equipment
              performance and safety checks.
            </p>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-16">
          <SectionHeader title="Shipped Stuff" />
          <div className="space-y-12">
            {CONFIG.projects.map((project, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {project.title}
                  </h3>
                  <span className="text-sm text-neutral-500">
                    ({project.year}) • {project.status}
                  </span>
                </div>

                <div className="space-y-2 text-base leading-relaxed">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  <strong className="text-neutral-900 dark:text-neutral-200">
                    Technologies:
                  </strong>{" "}
                  {project.technologies.join(", ")}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Preview
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-16">
          <SectionHeader title="Tools & Technologies" />
          <div className="space-y-6">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-base font-bold text-black dark:text-white mb-1">
                  {category}
                </h3>
                <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="mb-16">
          <SectionHeader title="Certifications" />
          <div className="space-y-8">
            {CONFIG.certifications.map((cert, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                    >
                      {cert.title}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      {cert.title}
                    </h3>
                  )}
                  <span className="text-sm text-neutral-500">
                    {cert.year} • {cert.status}
                  </span>
                </div>

                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 pb-1">
                  {cert.organization}
                </p>

                <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-16">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
              <h3 className="text-lg font-bold text-black dark:text-white">
                {CONFIG.education.institution}
              </h3>
              <span className="text-sm font-medium text-neutral-500">
                {CONFIG.education.period}
              </span>
            </div>

            <div>
              <p className="text-base font-medium text-black dark:text-white">
                {CONFIG.education.degree} — {CONFIG.education.field}
              </p>
              <p className="text-sm text-neutral-500">
                {CONFIG.education.location}
              </p>
            </div>

            <p className="text-base leading-relaxed">
              {CONFIG.education.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4" /> Degree Completed
              </span>
              <a
                href="/2200910200015.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <Download className="w-4 h-4" /> Download PDC
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 text-center text-sm text-neutral-500 font-medium">
        <p>© {new Date().getFullYear()} Kinshuk Jain. All rights reserved.</p>
      </footer>
    </div>
  );
}
