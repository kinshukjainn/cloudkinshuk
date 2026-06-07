"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  BookOpen,
  Terminal,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// --- CONFIGURATION ---
// (Zero information lost from original)
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
    "Database & Authentication": ["NeonDB", "Supabase", "Clerk"],
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
        live: "https://endvault.cloudkinshuk.in",
        repo: "https://github.com/kinshukjainn/endvault",
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
      "Pursuing electrical engineering while self-learning cloud technologies and software development. Focusing on the intersection of traditional engineering and modern cloud computing.",
  },
};

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.4 },
  },
};

// --- COMPONENTS ---
const CopyText = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs font-medium text-zinc-400 hover:text-zinc-100 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors"
      title="Copy to clipboard"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

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
  <h2 className="text-xl font-semibold text-zinc-100 tracking-tight mt-20 mb-8 border-b border-zinc-800/50 pb-4">
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
    className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border ${active ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-zinc-900/50 text-zinc-400 border-zinc-800/50"}`}
  >
    {children}
  </span>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400  selection:bg-blue-500/30 selection:text-blue-200">
      <main className="max-w-3xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* HEADER / INTRO */}
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                cloud<span className="text-zinc-300">kinshuk</span>.in
              </h1>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 pb-2">
                Hi, I&apos;m Kinshuk.
              </p>
            </div>

            <div className="space-y-5 text-base leading-relaxed text-zinc-200 max-w-2xl">
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-2 text-md text-white bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800/50">
                <div className="p-1.5 bg-blue-700 rounded-full">
                  <MapPin className="w-4 h-4 text-white" />
                </div>{" "}
                {CONFIG.personal.location}
              </span>
              <div className="flex items-center gap-3 ml-2">
                {CONFIG.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-100 hover:text-white hover:bg-blue-700 rounded-full transition-all"
                    title={social.platform}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/myresume.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download Resume
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Read Blog
              </Link>
            </div>
          </motion.section>

          {/* EXPERIENCE */}
          <motion.div variants={itemVariants}>
            <SectionHeader title="Experience" />
            <div className="group relative bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/80 rounded-3xl p-6 sm:p-8 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    UPPTCL
                  </h3>
                  <p className="text-sm font-medium text-blue-400 mt-0.5">
                    Uttar Pradesh Power Transmission Corporation Limited
                  </p>
                </div>
                <span className="text-sm font-mono text-zinc-100 bg-zinc-950 px-3 py-2.5 rounded-2xl border-2 border-zinc-800/50">
                  Jul 2025 - Aug 2025
                </span>
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed mb-6">
                Worked with the transmission division to understand the
                operation, protection, and maintenance of 132kV and 220kV
                substations. Prepared technical documentation and maintained
                logs on equipment performance and safety checks.
              </p>
            </div>
          </motion.div>

          {/* PROJECTS */}
          <motion.div variants={itemVariants}>
            <SectionHeader title="Shipped Stuff" />
            <div className="space-y-6">
              {CONFIG.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h3 className="text-lg font-bold text-zinc-100">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <Pill active={project.status === "Live"}>
                        {project.status}
                      </Pill>
                      <Pill>{project.year}</Pill>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm text-zinc-200 leading-relaxed">
                    {project.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-200 bg-zinc-800 px-2 py-1 rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800/50">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-white px-3 py-1.5 bg-blue-700 rounded-2xl flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-100 px-3 py-1.5 bg-black rounded-2xl hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-4 h-4" /> Github
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SKILLS */}
          <motion.div variants={itemVariants}>
            <SectionHeader title="Proficiencies" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(CONFIG.skills).map(([category, skills]) => (
                <div key={category} className="bg-zinc-900/30 rounded-3xl p-6">
                  <h3 className="text-md font-medium text-zinc-200 mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-zinc-950   rounded-xl text-[11px] font-medium text-zinc-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CERTIFICATIONS */}
          <motion.div variants={itemVariants}>
            <SectionHeader title="Certifications" />
            <div className="space-y-3">
              {CONFIG.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-5 rounded-2xl bg-zinc-900/20 border border-zinc-800/30 gap-4"
                >
                  <div>
                    <h3 className="text-sm font-medium text-zinc-200 mb-1">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                        >
                          {cert.title}
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h3>
                    <p className="text-xs text-blue-300 font-semibold mb-2">
                      {cert.organization} • {cert.status}
                    </p>
                    <p className="text-xs text-zinc-200">{cert.description}</p>
                  </div>
                  <span className="shrink-0 text-[12px] font-mono text-zinc-100 bg-zinc-950 px-2.5 py-2 rounded-xl border border-zinc-800/30">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* EDUCATION */}
          <motion.div variants={itemVariants}>
            <SectionHeader title="Education" />
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {CONFIG.education.institution}
                  </h3>
                  <p className="text-sm text-blue-300 mt-1">
                    {CONFIG.education.degree} — {CONFIG.education.field}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs  text-white block">
                    {CONFIG.education.period}
                  </span>
                  <span className="text-xs text-zinc-200 block mt-1">
                    {CONFIG.education.location}
                  </span>
                </div>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {CONFIG.education.description}
              </p>
            </div>
          </motion.div>

          {/* TERMINAL */}
          <motion.div variants={itemVariants}>
            <SectionHeader title="Terminal Access" />
            <div className="bg-black/50 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-md">
              <div className="bg-zinc-900/50 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-800/80">
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-xs font-mono text-zinc-500">cli.exe</span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <p className="text-sm text-zinc-500 mb-5">
                  Interactive command-line portfolio viewer built with Node.js.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                  <code className="text-sm font-mono text-zinc-300 break-all">
                    <span className="text-blue-500 mr-2">$</span>npm install -g
                    hackkinshuk
                  </code>
                  <CopyText text="npm install -g hackkinshuk" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                  <code className="text-sm font-mono text-zinc-300 break-all">
                    <span className="text-blue-500 mr-2">$</span>cloudkinshuk
                  </code>
                  <CopyText text="cloudkinshuk" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 mt-20 py-10 text-center">
        <p className="text-xs text-zinc-600 font-medium">
          © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
