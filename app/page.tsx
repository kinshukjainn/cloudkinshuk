"use client";

import {
  Github,
  Linkedin,
  Mail,
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

const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "github":
      return <Github className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    case "mail":
      return <Mail className="w-5 h-5" />;
    case "x":
      return (
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.658-5.848 6.658H2.425l7.752-8.858L.754 2.25h6.844l4.608 6.09L17.502 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
};

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-20 mb-6 border-b border-neutral-300 dark:border-neutral-800 pb-2">
    {title}
  </h2>
);

const Pill = ({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => (
  <span
    className={`px-3 py-1 text-xs font-semibold tracking-wide border rounded-md ${
      active
        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700"
    }`}
  >
    {children}
  </span>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-800 dark:text-neutral-300 selection:bg-blue-200 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100 transition-colors">
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-16">
          {/* HEADER / INTRO */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-md" />
                cloud
                <span className="text-blue-600 dark:text-blue-500">
                  kinshuk
                </span>
                .in
              </h1>
              <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white pb-2">
                Hi, I&apos;m Kinshuk.
              </p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 rounded-md dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-4 py-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                {CONFIG.personal.location}
              </span>
              <div className="flex items-center gap-2">
                {CONFIG.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors rounded-md"
                    title={social.platform}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/kinshukkjainnresume.pdf"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors rounded-md"
              >
                <Download className="w-4 h-4" /> Download Resume
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors rounded-md"
              >
                <BookOpen className="w-4 h-4" /> Read Blog
              </Link>
            </div>
          </section>

          <section className="space-y-6">
            <Recommendation />
          </section>

          {/* EXPERIENCE */}
          <div>
            <SectionHeader title="Experience" />
            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-6 md:p-8 rounded-md transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    UPPTCL
                  </h3>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                    Uttar Pradesh Power Transmission Corporation Limited
                  </p>
                </div>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-950 px-3 py-1.5 border border-neutral-300 dark:border-neutral-800 rounded-md">
                  Jul 2025 - Aug 2025
                </span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
                Worked with the transmission division to understand the
                operation, protection, and maintenance of 132kV and 220kV
                substations. Prepared technical documentation and maintained
                logs on equipment performance and safety checks.
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <div>
            <SectionHeader title="Shipped Stuff" />
            <div className="space-y-6">
              {CONFIG.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-6 md:p-8 rounded-md transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <Pill active={project.status === "Live"}>
                        {project.status}
                      </Pill>
                      <Pill>{project.year}</Pill>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
                    {project.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-neutral-200 dark:border-neutral-800">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white px-4 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center gap-2 transition-colors rounded-md"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Preview
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 flex items-center gap-2 transition-colors rounded-md"
                      >
                        <Github className="w-4 h-4" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div>
            <SectionHeader title="Tools I Use" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {Object.entries(CONFIG.skills).map(([category, skills]) => (
                <div
                  key={category}
                  className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-6 rounded-md"
                >
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-4 tracking-wide">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-400 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div>
            <SectionHeader title="Certifications" />
            <div className="space-y-4">
              {CONFIG.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-6 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 gap-4 rounded-md transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                        >
                          {cert.title}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-500 font-bold mb-3 tracking-wide">
                      {cert.organization} • {cert.status}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-950 px-3 py-1.5 border border-neutral-300 dark:border-neutral-800 rounded-md">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <SectionHeader title="Education" />
            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800 p-6 md:p-8 rounded-md">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {CONFIG.education.institution}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-500 mt-1.5 font-medium">
                    {CONFIG.education.degree} — {CONFIG.education.field}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 inline-block rounded-md">
                    {CONFIG.education.period}
                  </span>
                  <span className="text-xs text-neutral-500 block mt-2.5 font-medium">
                    {CONFIG.education.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {CONFIG.education.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 px-4 py-2 rounded-md">
                  <CheckCircle2 className="w-4 h-4" />
                  Degree Completed
                </span>
                <a
                  href="/2200910200015.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors px-5 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md"
                >
                  <Download className="w-4 h-4" />
                  Download PDC (pdf)
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 text-center bg-neutral-50 dark:bg-neutral-900/20">
        <p className="text-sm text-neutral-500 font-medium">
          © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
