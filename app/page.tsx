"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Copy,
  Check,
  Download,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  Star,
  FileText,
  Zap,
} from "lucide-react";
import Signaturekinshuk from "./components/Signaturekinshuk";
// 1. Updated Import Name to match the file created previously

const CONFIG = {
  personal: {
    email: "kinshuk25jan04@gmail.com",
    whatsappNumber: "919172702501",
    location: "Ghaziabad, UP, India",
    bio: [
      "Student first. Builder always.",
      "I am currently pursuing my Bachelor's in Electrical Engineering learning how systems work, how they fail, and how they evolve. Alongside that, I am exploring the cloud, building small things that might someday scale, experimenting with infrastructure, and understanding how technology connects people.",
    ],
    availability: "Available for opportunities",
    status:
      "Completed an internship at UPPTCL (Uttar Pradesh Power Transmission Corporation Limited), where I gained hands-on experience in power systems and transmission network operations.",
    photoUrl: "/profile.jpg",
  },
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kinshukjainn",
      icon: "github",
      handle: "Github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/kinshukjainn/",
      icon: "linkedin",
      handle: "LinkedIn",
    },
    {
      platform: "Gmail",
      url: "mailto:kinshuk25jan04@gmail.com",
      icon: "mail",
      handle: "Mail to",
    },
    {
      platform: "X",
      url: "http://x.com/realkinshuk004",
      icon: "x",
      handle: "X (Twitter)",
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
      progress: "Re-Attempting",
      description:
        "Comprehensive certification covering AWS top 40 best core services of aws",
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
      skills: [
        "Amazon SageMaker",
        "ML Algorithms",
        "Data Processing",
        "Model Deployment",
      ],
    },
  ],
  skills: {
    "Cloud & DevOps": [
      "AWS",
      "Amplify",
      "EC2",
      "Amazon S3",
      "Lambda",
      "Route 53",
      "AWS IAM",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
    "Frontend & Build": [
      "Vite / React",
      "Nextjs",
      "TypeScript",
      "Tailwind CSS",
      "React icons",
    ],
    "Version Control": ["Git", "GitHub Actions"],
    "Developer Tools": ["VS Code", "Clerk Auth"],
  },
  projects: [
    {
      title: "Zeroleaks",
      year: "2024",
      status: "Live",
      type: "Security Tool",
      description: [
        "A modern, secure password generation tool built with React and TypeScript, focusing on creating cryptographically secure passwords with customizable parameters. Zeroleaks leverages the Web Crypto API for true randomness and implements industry-standard security practices.",
        "Features include multiple generation algorithms (memorable, random, pronounceable), real-time strength analysis with detailed feedback, secure clipboard integration, and password history management. The tool provides visual feedback on password entropy and follows NIST guidelines for password security.",
        "Deployed with zero-trust security principles, ensuring no passwords are logged or transmitted insecurely. The application works entirely client-side for maximum privacy.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
        "Web Crypto API",
      ],
      links: {
        live: "https://zeroleaks.cloudkinshuk.in",
        repo: "https://github.com/kinshukjainn/zeroleaks",
      },
      dockerCommand: "docker pull kinshukdev/zeroleaksproduct:latest",
    },
    {
      title: "AI Based FDS (Fault Detection System)",
      year: "2025",
      status: "Development Stage",
      type: "AI Tool",
      description: [
        "An AI-powered Fault Detection System designed to identify and analyze faults in power transmission lines and transformers. This intelligent system enhances reliability and efficiency in power grid monitoring by leveraging machine learning models to predict equipment failures before they occur.",
        "Built with Next.js 16 and integrated with Amazon Bedrock's Nova Pro model, FDS processes real-time sensor data and historical patterns to detect anomalies. The system provides actionable insights through an intuitive dashboard with real-time alerts, detailed fault analysis reports, and predictive maintenance recommendations.",
        "Features include multi-parameter fault classification, severity assessment, root cause analysis, and integration with AWS Lambda for serverless scalability. The system monitors voltage fluctuations, temperature patterns, harmonic distortion, and impedance changes to provide comprehensive power system health analysis.",
      ],
      technologies: [
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "React Icons",
        "Shadcn UI",
        "Lucide React",
        "Amazon Bedrock",
        "Amazon Nova Pro Model",
        "AWS Lambda",
        "AWS Amplify",
        "AWS Route 53",
      ],
      links: {
        live: null,
        repo: "https://github.com/kinshukjainn/fds-project",
      },
      dockerCommand: "Image is not available",
    },
  ],
  education: {
    degree: "Bachelor of Technology",
    field: "Electrical Engineering",
    institution: "JSS Academy of Technical Education",
    location: "Noida, Uttar Pradesh",
    period: "2022 - 2026",
    status: "Active",
    description:
      "Pursuing electrical engineering while self-learning cloud technologies and software development. Focusing on the intersection of traditional engineering and modern cloud computing.",
  },
};

const CopyButton = ({ text }: { text: string }) => {
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
      className="p-2 cursor-pointer hover:bg-blue-800 rounded-full transition-colors flex-shrink-0"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-white" />
      ) : (
        <Copy className="w-4 h-4 text-white" />
      )}
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
    case "award":
      return <Award className="w-5 h-5" />;
    case "x":
      return (
        <svg
          className="w-5 h-5"
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

export default function Home() {
  return (
    <div className="min-h-screen pt-10 bg-black text-white">
      {/* Hero Header */}
      <header className="border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          {/* 2. UPDATED: Wrapper for the 3D Signature. 
             Since the component now has intrinsic height (140px mobile / 180px desktop),
             we just let it flow naturally in the flex container. */}
          <div className="mb-2 w-full  flex justify-start">
            <Signaturekinshuk />
          </div>

          <div className="space-y-4">
            <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              Hi <span className="text-blue-500 font-bold">@everyone</span> ! My
              name is <span className="font-semibold italic">Kinshuk</span>, and
              I&apos;m a student and builder focused on cloud infrastructure and
              distributed systems. I&apos;m pursuing my Bachelor&apos;s in
              Electrical Engineering at JSS Academy of Technical Education while
              exploring modern web technologies. Check out my projects on{" "}
              <a
                href="https://github.com/kinshukjainn"
                className="hover:text-blue-300 underline font-mono text-blue-400 transition-colors"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* About Section */}
        <section className="mb-16 scroll-mt-20">
          <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
            I am currently learning how systems work, how they fail, and how
            they evolve. Alongside that, I am exploring the cloud, building
            small things that might someday scale, experimenting with
            infrastructure, and understanding how technology connects people.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3 w-max  px-4 py-2 ">
              <div className="bg-blue-500 p-2 rounded-full text-black flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-white font-semibold">
                {CONFIG.personal.location}
              </span>
            </div>
            <div className="flex items-center gap-3  px-4 py-2 ">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-green-300 font-semibold">
                Available for opportunities
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {CONFIG.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-3 py-2  transition-all duration-300 group text-sm md:text-base"
              >
                <div className="text-white p-1.5 bg-blue-800 rounded-full group-hover:text-white transition-colors">
                  <SocialIcon icon={social.icon} />
                </div>
                <span className="font-medium">{social.handle}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Resume
            </h2>
          </div>
          <a
            href="/kinshukfinalresume.pdf"
            download="kinshukfinalresume.pdf"
            className="inline-flex items-center gap-3 text-white px-2 md:px-6 py-2 bg-blue-800 rounded-full transition-all duration-300 hover:scale-105 group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span className="font-semibold">Download (PDF)</span>
          </a>
          <p className="text-white/70 mt-4 leading-relaxed">
            View and download my comprehensive resume showcasing my technical
            expertise, project experience, and professional achievements.
          </p>
        </section>

        {/* Publications Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Publications
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-white/70 leading-relaxed mb-4">
                My personal perspectives and in-depth technical insights on
                cloud infrastructure, systems design, distributed computing, and
                emerging technologies. I share detailed explorations of
                challenges, solutions, and lessons learned from real-world
                projects and engineering experiences.
              </p>
              <a
                href="/home-blog"
                className="inline-flex items-center gap-2 text-white px-2 md:px-6 py-2 bg-blue-800 rounded-full font-bold transition-all duration-300 hover:scale-105 group"
              >
                <span>Explore Blogs</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Experience
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl font-medium text-white">UPPTCL</h3>
                <span className="text-white">July 2025 - Aug 2025</span>
              </div>
              <p className="text-white mb-3">
                Uttar Pradesh Power Transmission Corporation Limited
              </p>
              <div className="text-white/70 leading-relaxed space-y-3">
                <p>
                  Worked with the transmission division to understand the
                  operation, protection, and maintenance of 132kV and 220kV
                  substations. Studied working principles of power transformers,
                  circuit breakers, busbars, and protection relays.
                </p>
                <p>
                  Observed real-time SCADA dashboards for grid monitoring, load
                  management, and outage reporting. Assisted engineers during
                  shutdown procedures, equipment inspections, and testing of
                  CTs, PTs, and relays.
                </p>
                <p>
                  Prepared technical documentation and maintained logs on
                  equipment performance and safety checks. Improved technical
                  workflows by creating well-organized digital reports using
                  cloud and web tools.
                </p>
                <p className="pt-2">
                  <a
                    href="/home-blog/blogE"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-800 rounded-full transition-all duration-300 font-semibold text-white group text-sm md:text-base"
                  >
                    <span>Read Detailed Experience Blog</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Selected Projects
            </h2>
          </div>
          <div className="space-y-8">
            {CONFIG.projects.map((project) => (
              <div key={project.title} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                      >
                        {project.title}
                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className="text-white/60 text-sm md:text-base flex-shrink-0">
                    {project.year}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm font-medium">
                    {project.type}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs md:text-sm font-medium">
                    {project.status}
                  </span>
                </div>
                <div className="text-white/70 leading-relaxed space-y-3 mb-4">
                  {project.description.map((p, i) => (
                    <p key={i} className="text-sm md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mb-4 ">
                  <p className="text-white/50 text-md md:text-sm mb-2 font-semibold">
                    Technologies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-700 text-white font-semibold  rounded-full text-xs md:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.dockerCommand !== "Image is not available" && (
                  <div className="p-3 md:p-4 mb-4 font-mono text-xs md:text-sm bg-[#141414] rounded-2xl  overflow-x-auto">
                    <div className="flex items-center justify-between gap-3 min-w-max md:min-w-full">
                      <code className="text-green-400 break-all flex-1">
                        {project.dockerCommand}
                      </code>
                      <CopyButton text={project.dockerCommand} />
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 rounded-full transition-all duration-300 text-white font-semibold group text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                      <span className="group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] rounded-full border border-[#444444] transition-all duration-300 text-white font-semibold group text-sm md:text-base"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                      <span className="group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Technical Proficiencies
            </h2>
          </div>
          <div className="space-y-6">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-[#141414] hover:border hover:border-blue-500 text-white  cursor-pointer rounded-full text-sm md:text-sm transition-colors border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Certifications
            </h2>
          </div>
          <div className="space-y-6">
            {CONFIG.certifications.map((cert) => (
              <div
                key={cert.title}
                className="border-b border-white/20 rounded-2xl p-4 md:p-6 "
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-2">
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                      >
                        {cert.title}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      cert.title
                    )}
                  </h3>
                  <span className="text-white/60 text-sm md:text-base flex-shrink-0">
                    {cert.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="font-semibold text-yellow-300">
                    {cert.organization}
                  </span>
                </div>
                <p className="text-white/70 leading-relaxed mb-3 text-sm md:text-base">
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#141414] text-white rounded-full text-xs md:text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Education
            </h2>
          </div>
          <div className=" p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {CONFIG.education.degree}
              </h3>
              <span className="text-white/60 text-sm md:text-base flex-shrink-0">
                {CONFIG.education.period}
              </span>
            </div>
            <p className="text-blue-300 font-semibold mb-2">
              {CONFIG.education.field}
            </p>
            <p className="text-white/70 mb-3 text-sm md:text-base">
              {CONFIG.education.institution}, {CONFIG.education.location}
            </p>
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              {CONFIG.education.description}
            </p>
          </div>
        </section>

        {/* CLI Tool Section */}
        <section className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              CLI Tool
            </h2>
          </div>
          <p className="text-white/70 mb-6 leading-relaxed text-sm md:text-base">
            Interactive command-line portfolio viewer built with Node.js
          </p>
          <div className="space-y-3 font-mono text-xs md:text-sm">
            <div className="rounded-2xl p-3 md:p-4 bg-[#141414] border border-white/20 font-semibold text-[16px]  overflow-x-auto">
              <div className="flex items-center justify-between gap-3 min-w-max md:min-w-full">
                <div className="break-all flex-1">
                  <span className="text-cyan-400">$</span>{" "}
                  <span className="text-white/90">
                    <span className="text-yellow-300">npm</span> install{" "}
                    <span className="text-yellow-300">-g</span>{" "}
                    <span className="text-yellow-300">hackkinshuk</span>
                  </span>
                </div>
                <CopyButton text="npm install -g hackkinshuk" />
              </div>
            </div>
            <div className="rounded-2xl p-3 md:p-4 bg-[#141414]  font-semibold text-[16px]  border border-white/20 overflow-x-auto">
              <div className="flex items-center justify-between gap-3 min-w-max md:min-w-full">
                <div className="break-all flex-1">
                  <span className="text-cyan-400">$</span>{" "}
                  <span className="text-white/90">cloudkinshuk</span>
                </div>
                <CopyButton text="cloudkinshuk" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
