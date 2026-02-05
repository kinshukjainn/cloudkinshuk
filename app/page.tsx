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
} from "lucide-react";

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
      handle: "kinshuk25jan04@gmail.com",
    },
    {
      platform: "X",
      url: "http://x.com/realkinshuk004",
      icon: "x",
      handle: "@realkinshuk004",
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
        "A modern, secure password generation tool built with React and TypeScript, focusing on creating cryptographically secure passwords with customizable parameters.",
        "Features include multiple generation algorithms, strength analysis, and secure clipboard integration.",
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
      type: "Ai Tool",
      description: [
        "An AI-powered Fault Detection System built using modern web technologies. This project is primarily designed to identify and analyze faults that commonly occur in power transmission lines and transformers, enhancing reliability and efficiency in power system monitoring.",
      ],
      technologies: [
        "Nextjs16",
        "TypeScript",
        "Tailwind CSS",
        "React Icons",
        "Shadcn UI",
        "Lucide React",
        "Amazon Bedrock",
        "Amazon Nova Pro Model",
        "AWS Lambda",
        "AWS Amplify",
        "Aws Route53",
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
      className="p-1.5 cursor-pointer hover:bg-gray-700 rounded transition-colors flex-shrink-0"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
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
    <div className="min-h-screen pt-20 bg-[#f5f3ed]">
      {/* Hero Header */}
      <header className="border-b border-black/10 bg-[#f5f3ed]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1
            className="
    font-light text-black mb-6
    text-[clamp(1.75rem,5vw,4.5rem)]
    leading-tight
  "
          >
            Cloudkinshuk.in
          </h1>

          <div className="space-y-4">
            <p className="text-xl text-black/80 leading-relaxed">
              Hey there! My name is{" "}
              <span className="font-semibold">Kinshuk</span> and I&apos;m a
              student and builder with a focus on cloud infrastructure and
              systems. I&apos;m currently pursuing my Bachelor&apos;s in
              Electrical Engineering at JSS Academy of Technical Education. Here
              are some projects of mine on github {"->"}{" "}
              <a
                href="https://github.com/kinshukjainn"
                className="underline font-bold hover:text-black/60 transition-colors"
              >
                open source
              </a>
              .
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-16">
          <p className="text-lg text-black/80 leading-relaxed mb-6">
            I am currently learning how systems work, how they fail, and how
            they evolve. Alongside that, I am exploring the cloud, building
            small things that might someday scale, experimenting with
            infrastructure, and understanding how technology connects people.
          </p>
          <div className="flex items-center gap-3 text-black/70 mb-4">
            <MapPin className="w-5 h-5" />
            <span>{CONFIG.personal.location}</span>
          </div>
          <div className="flex items-center gap-3 text-green-600 mb-6">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-black/70">Available for opportunities</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {CONFIG.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-black/70 hover:text-black underline transition-colors"
              >
                <SocialIcon icon={social.icon} />
                <span>{social.handle}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">Resume</h2>
          <a
            href="/kinshukfinalresume.pdf"
            download="kinshukfinalresume.pdf"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black underline transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Resume (PDF)
          </a>
        </section>

        {/* Publications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">Publications</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-black mb-2">
                <a
                  href="/home-blog"
                  className="underline font-bold hover:text-black/60"
                >
                  @checkout blogs
                </a>
              </h3>
              <p className="text-black/70 leading-relaxed">
                Research notes, security findings, and technical deep-dives on
                cloud infrastructure and systems architecture.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">Experience</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl font-medium text-black">UPPTCL</h3>
                <span className="text-black/60">July 2025 - Aug 2025</span>
              </div>
              <p className="text-black/70 mb-3">
                Uttar Pradesh Power Transmission Corporation Limited
              </p>
              <div className="text-black/70 leading-relaxed space-y-3">
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
                <span>To Know more in depth checkout my blog : </span>
                <a
                  href="/home-blog/blogE"
                  className="underline font-bold hover:text-black/60"
                >
                  @Read
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">
            Selected Projects
          </h2>
          <div className="space-y-8">
            {CONFIG.projects.map((project) => (
              <div key={project.title}>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-medium text-black">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className="text-black/60">{project.year}</span>
                </div>
                <p className="text-sm text-black/60 mb-3">{project.type}</p>
                <div className="text-black/70 leading-relaxed space-y-3 mb-4">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mb-4">
                  <span className="text-black/70">Technologies: </span>
                  <span className="text-black/60">
                    {project.technologies.join(", ")}
                  </span>
                </div>
                {project.dockerCommand !== "Image is not available" && (
                  <div className="p-4 mb-4 font-mono text-sm bg-black/5 rounded border border-black/10">
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-black/70 break-all flex-1">
                        {project.dockerCommand}
                      </code>
                      <CopyButton text={project.dockerCommand} />
                    </div>
                  </div>
                )}
                <div className="flex gap-3 flex-wrap">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black/70 hover:text-black underline transition-colors"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black/70 hover:text-black underline transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">
            Technical Proficiencies
          </h2>
          <div className="space-y-6">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-lg font-medium text-black mb-3">
                  {category}
                </h3>
                <p className="text-black/70">{skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">
            Certifications
          </h2>
          <div className="space-y-8">
            {CONFIG.certifications.map((cert) => (
              <div key={cert.title}>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-medium text-black">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {cert.title}
                      </a>
                    ) : (
                      cert.title
                    )}
                  </h3>
                  <span className="text-black/60">{cert.year}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-black/60" />
                  <span className="text-black/70">{cert.organization}</span>
                </div>
                <p className="text-black/70 leading-relaxed mb-3">
                  {cert.description}
                </p>
                <p className="text-black/60">
                  Skills: {cert.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">Education</h2>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-medium text-black">
                {CONFIG.education.degree}
              </h3>
              <span className="text-black/60">{CONFIG.education.period}</span>
            </div>
            <p className="text-black/70 mb-2">{CONFIG.education.field}</p>
            <p className="text-black/60 mb-3">
              {CONFIG.education.institution}, {CONFIG.education.location}
            </p>
            <p className="text-black/70 leading-relaxed">
              {CONFIG.education.description}
            </p>
          </div>
        </section>

        {/* CLI Tool Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-black mb-6">CLI Tool</h2>
          <p className="text-black/70 mb-6 leading-relaxed">
            Interactive command-line portfolio viewer built with Node.js
          </p>
          <div className="space-y-3 font-mono text-sm">
            <div className="rounded p-4 bg-black/5 border border-black/10">
              <div className="flex items-center justify-between gap-3">
                <div className="break-all flex-1">
                  <span className="text-black/60">$</span>{" "}
                  <span className="text-black/70">
                    npm install -g hackkinshuk
                  </span>
                </div>
                <CopyButton text="npm install -g hackkinshuk" />
              </div>
            </div>
            <div className="rounded p-4 bg-black/5 border border-black/10">
              <div className="flex items-center justify-between gap-3">
                <div className="break-all flex-1">
                  <span className="text-black/60">$</span>{" "}
                  <span className="text-black/70">cloudkinshuk</span>
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
