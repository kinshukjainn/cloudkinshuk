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
  <h2 className="text-2xl font-bold text-zinc-100 mt-16 mb-6 border-b border-zinc-700 pb-2">
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
    className={`px-2 py-1 rounded-full text-xs font-bold  ${
      active ? "bg-red-700 text-white" : "bg-[#141414] text-white"
    }`}
  >
    {children}
  </span>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-green-700/30 selection:text-green-200">
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-10">
          {/* HEADER / INTRO */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-xs font-bold text-white uppercase tracking-widest">
                cloud<span className="text-[#ff9100]">kinshuk</span>.in
              </h1>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-white pb-2">
                Hi, I&apos;m Kinshuk.
              </p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-zinc-200 max-w-2xl">
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-2 text-sm text-white bg-[#141414] px-3 py-2 rounded-full ">
                <MapPin className="w-4 h-4 text-blue-400" />
                {CONFIG.personal.location}
              </span>
              <div className="flex items-center gap-2">
                {CONFIG.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-white hover:text-white bg-[#141414] rounded-full transition-colors "
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download Resume
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition-colors shadow-sm"
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
            <div className="bg-[#141414] border border-[#141414] rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">UPPTCL</h3>
                  <p className="text-sm font-medium text-blue-400 mt-0.5">
                    Uttar Pradesh Power Transmission Corporation Limited
                  </p>
                </div>
                <span className="text-xs font-semibold text-white">
                  Jul 2025 - Aug 2025
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
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
                <div key={idx} className="bg-[#141414] rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <Pill active={project.status === "Live"}>
                        {project.status}
                      </Pill>
                      <Pill>{project.year}</Pill>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5 text-sm text-zinc-200 leading-relaxed">
                    {project.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-zinc-300 bg-black px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800/50">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white px-3 py-1.5 bg-red-700 rounded-full flex items-center gap-1.5  transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" /> Live link
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold  px-3 py-1.5 bg-white  rounded-full text-black flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-4 h-4" /> Github
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div>
            <SectionHeader title="Tools i use.." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(CONFIG.skills).map(([category, skills]) => (
                <div key={category} className="bg-[#141414]  rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white mb-3">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-black  rounded-full text-sm font-medium text-zinc-300"
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
            <div className="space-y-3">
              {CONFIG.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-5 rounded-2xl bg-[#141414]  gap-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-400 transition-colors underline decoration-green-400/30 hover:decoration-green-400 underline-offset-4"
                        >
                          {cert.title}
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h3>
                    <p className="text-xs text-blue-400 font-bold mb-2">
                      {cert.organization} | {cert.status}
                    </p>
                    <p className="text-sm text-zinc-300">{cert.description}</p>
                  </div>
                  <span className="shrink-0 text-sm text-white px-2.5 py-1 ">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <SectionHeader title="Education" />
            <div className="bg-[#141414] rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {CONFIG.education.institution}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 font-medium">
                    {CONFIG.education.degree} — {CONFIG.education.field}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-sm font-bold text-white px-2.5 py-1  inline-block">
                    {CONFIG.education.period}
                  </span>
                  <span className="text-xs text-zinc-400 block mt-2">
                    {CONFIG.education.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {CONFIG.education.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 ">
                <span className="inline-flex items-center gap-1.5 text-sm font-se mibold text-white border-blue-500 border-2  bg-[#252525] px-2.5 py-1.5 rounded-full ">
                  <CheckCircle2 className="w-4 h-4" />
                  Degree Completed
                </span>
                <a
                  href="/2200910200015.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-800 transition-colors px-3 py-1.5 rounded-full border border-zinc-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDC (pdf)
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/50 mt-16 py-8 text-center">
        <p className="text-xs text-zinc-500 font-medium">
          © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
