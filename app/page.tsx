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

const CONFIG = {
  personal: {
    email: "kinshuk25jan04@gmail.com",
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
      title: "AWS Developer Cloud Associate - DVA-02",
      organization: "AWS",
      status: "Preparing",
      year: "2025",
      progress: "First Attempt",
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
    "Version Control": ["Git Terminal", "GitHub Actions"],
    "Developer Tools": ["VS Code"],
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
        "Built with Next.js 16 and integrated with  Open AI OSS Model 120b parameters, FDS processes real-time sensor data and historical patterns to detect anomalies. The system provides actionable insights through an intuitive dashboard with real-time alerts, detailed fault analysis reports, and predictive maintenance recommendations.",
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
        "Open AI OSS Bedrock Model 120B",
        "AWS Lambda",
        "Amazon API Gateway",
        "AWS Amplify",
        "AWS Route 53",
      ],
      links: {
        live: "https://fdsai.cloudkinshuk.in",
        repo: "https://github.com/kinshukjainn/fds-college",
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
      className={`p-1 cursor-pointer rounded-md transition-colors flex-shrink-0  ${
        copied ? "bg-green-500  text-black" : "bg-green-700 text-white"
      }`}
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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

const SectionHeader = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{ className: string }>;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white flex-shrink-0" />
    <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
      {title}
    </h2>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1b1b1b]  pt-10 text-[#eaeaeb] selection:bg-[#8cb4ff]/30 selection:text-white">
      {/* Hero Header */}
      <header className="border-b border-[#333] mb-8 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="mb-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white flex items-center">
            cloudkinshuk<span className="text-[#8cb4ff]">_</span>
          </div>
          <p className="text-lg sm:text-xl text-[#eaeaeb] leading-relaxed max-w-3xl">
            Hi @everyone! My name is{" "}
            <span className="font-semibold text-white">Kinshuk</span>, and
            I&apos;m a student and builder focused on cloud infrastructure and
            distributed systems. I&apos;m pursuing my Bachelor&apos;s in
            Electrical Engineering while exploring modern web technologies.
            Check out my projects on{" "}
            <a
              href="https://github.com/kinshukjainn"
              className="text-white font-semibold border-b-[3px] px-2 border-green-300  hover:bg-green-400/10 hover:border-b-4 transition-all"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {/* About & Socials Section */}
        <section className="scroll-mt-20">
          <p className="text-base sm:text-lg text-[#eaeaeb] leading-relaxed mb-6">
            I am currently learning how systems work, how they fail, and how
            they evolve. Alongside that, I am exploring the cloud, building
            small things that might someday scale, experimenting with
            infrastructure, and understanding how technology connects people.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex items-center gap-2.5 px-2 py-1 bg-[#252525] rounded-md  w-max">
              <MapPin className="w-4 h-4 text-[#eaeaeb] flex-shrink-0" />
              <span className="text-[#eaeaeb] text-sm font-medium">
                {CONFIG.personal.location}
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-2 py-1 bg-[#252525]  rounded-md w-max">
              <div className="w-2 h-2 bg-[#8cb4ff] rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-[#eaeaeb] text-sm font-medium">
                {CONFIG.personal.availability}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {CONFIG.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-1.5 bg-[#252525] rounded-sm transition-all duration-200 text-[#eaeaeb] hover:text-white group"
              >
                <div className="text-green-500  transition-colors">
                  <SocialIcon icon={social.icon} />
                </div>
                <span className="text-sm font-medium">{social.handle}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:text-[#8cb4ff] transition-all" />
              </a>
            ))}
          </div>
        </section>

        {/* Resume & Publications Grid */}
        <section className="grid sm:grid-cols-2 gap-6 scroll-mt-20">
          <div className="bg-[#1e1e1e] border border-[#42414d] rounded-md p-6 sm:p-8 flex flex-col items-start justify-between transition-colors hover:border-[#555]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Resume</h2>
              </div>
              <p className="text-[#eaeaeb] text-sm mb-6 leading-relaxed">
                View my comprehensive resume showcasing my technical expertise,
                project experience, and professional achievements.
              </p>
              <div className="border-[#ff7b72] border-l-4 px-3 py-2 mb-6 bg-[#ff7b72]/10">
                <p className="text-[#ff7b72] text-sm leading-relaxed">
                  Currently resume is not available to download soon my updated
                  resume will be available here.
                </p>
              </div>
            </div>
            <a
              href="/kinshukfinalresume.pdf"
              download="kinshukfinalresume.pdf"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-3 py-1 bg-green-700 font-semibold rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>

          <div className="bg-[#1e1e1e] border border-[#42414d] rounded-md p-6 sm:p-8 flex flex-col items-start h-max justify-between transition-colors hover:border-[#555]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Publications
                </h2>
              </div>
              <p className="text-[#eaeaeb] text-sm mb-6 leading-relaxed">
                My perspectives and technical insights on cloud infrastructure,
                systems design, and emerging technologies.
              </p>
            </div>
            <a
              href="/home-blog"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-3 py-1 bg-green-700 font-semibold rounded-md transition-colors"
            >
              Read Blogs
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Experience Section */}
        <section className="scroll-mt-20">
          <SectionHeader title="Experience" icon={Briefcase} />
          <div className="bg-[#1e1e1e] border border-[#42414d] rounded-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-2">
              <h3 className="text-xl font-semibold text-white">UPPTCL</h3>
              <span className="text-[#eaeaeb] text-sm font-medium">
                July 2025 - Aug 2025
              </span>
            </div>
            <p className="text-[#8cb4ff] text-md font-semibold mb-5">
              Uttar Pradesh Power Transmission Corporation Limited
            </p>
            <div className="text-[#eaeaeb] text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Worked with the transmission division to understand the
                operation, protection, and maintenance of 132kV and 220kV
                substations. Studied working principles of power transformers,
                circuit breakers, busbars, and protection relays.
              </p>
              <p>
                Observed real-time SCADA dashboards for grid monitoring, load
                management, and outage reporting. Assisted engineers during
                shutdown procedures, equipment inspections, and testing of CTs,
                PTs, and relays.
              </p>
              <p>
                Prepared technical documentation and maintained logs on
                equipment performance and safety checks. Improved technical
                workflows by creating well-organized digital reports using cloud
                and web tools.
              </p>
              <div className="pt-3">
                <a
                  href="/home-blog/blogE"
                  className="inline-flex items-center gap-2 text-white px-3 py-1 bg-green-700 rounded-sm font-semibold  transition-all text-md"
                >
                  Read blog <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="scroll-mt-20">
          <SectionHeader title="Selected Projects" icon={Code} />
          <div className="space-y-6">
            {CONFIG.projects.map((project) => (
              <div
                key={project.title}
                className="bg-[#1e1e1e] border border-[#42414d] hover:border-[#555] rounded-xl p-6 sm:p-8 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    {project.title}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#eaeaeb] hover:text-[#8cb4ff] transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </h3>
                  <span className="text-[#eaeaeb] text-sm flex-shrink-0">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-2.5 py-1  text-green-500 text-sm font-bold uppercase">
                    {project.type}
                  </span>
                  <span
                    className={`px-2.5 py-1  rounded-md text-xs font-semibold ${
                      project.status === "Live"
                        ? "bg-[#8cb4ff]/10  text-[#8cb4ff]"
                        : "bg-[#1b1b1b]  text-[#eaeaeb]"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="text-[#eaeaeb] text-sm sm:text-base leading-relaxed space-y-3 mb-6">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#303030] text-[#eaeaeb] rounded-sm text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.dockerCommand !== "Image is not available" && (
                  <div className="p-1 mb-6 font-mono text-xs sm:text-sm bg-[#252525] rounded-md flex items-center justify-between gap-3 overflow-hidden">
                    <code className="text-[#eaeaeb] truncate px-2">
                      <span className="text-[#8cb4ff] mr-2">$</span>
                      {project.dockerCommand}
                    </code>
                    <CopyButton text={project.dockerCommand} />
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-800  text-white text-sm font-semibold rounded-md  transition-colors"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-black  text-sm font-semibold rounded-md transition-colors"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="scroll-mt-20">
          <SectionHeader title="Technical Proficiencies" icon={Zap} />
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div
                key={category}
                className="bg-[#1e1e1e] border border-[#42414d] rounded-md  p-3 sm:p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#303030]  text-[#eaeaeb] rounded-md  text-xs sm:text-sm font-medium"
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
        <section className="scroll-mt-20">
          <SectionHeader title="Certifications" icon={Star} />
          <div className="grid sm:grid-cols-2 gap-6">
            {CONFIG.certifications.map((cert) => (
              <div
                key={cert.title}
                className="bg-[#1e1e1e] border border-[#42414d] rounded-md p-3 flex flex-col justify-between hover:border-[#555] transition-colors"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-green-300   transition-colors inline-flex items-center gap-2"
                        >
                          {cert.title}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Award className="w-4 h-4 text-white" />
                    <span className="text-[#eaeaeb]">{cert.organization}</span>
                    <span className="text-gray-400 ml-auto">{cert.year}</span>
                  </div>
                  <p className="text-[#eaeaeb] text-sm leading-relaxed mb-5">
                    {cert.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 font-semibold   text-green-500 rounded-sm text-xs"
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
        <section className="scroll-mt-20">
          <SectionHeader title="Education" icon={GraduationCap} />
          <div className="bg-[#1e1e1e] border border-[#42414d] rounded-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-2">
              <h3 className="text-xl font-semibold text-white">
                {CONFIG.education.degree}
              </h3>
              <span className="text-[#eaeaeb] text-sm">
                {CONFIG.education.period}
              </span>
            </div>
            <p className="text-[#8cb4ff] font-medium mb-3 text-sm sm:text-base">
              {CONFIG.education.field}
            </p>
            <p className="text-[#eaeaeb] text-sm sm:text-base mb-4 font-medium">
              {CONFIG.education.institution}, {CONFIG.education.location}
            </p>
            <p className="text-[#eaeaeb] text-sm sm:text-base leading-relaxed">
              {CONFIG.education.description}
            </p>
          </div>
        </section>

        {/* CLI Tool Section */}
        <section className="scroll-mt-20">
          <SectionHeader title="CLI Tool" icon={Code} />
          <div className="bg-[#1e1e1e] border border-[#42414d] rounded-md p-6 sm:p-8">
            <p className="text-[#eaeaeb] text-sm sm:text-base mb-6">
              Interactive command-line portfolio viewer built with Node.js.
              Install it globally via npm.
            </p>
            <div className="space-y-3 font-mono text-sm">
              <div className="p-1 bg-[#1b1b1b] border border-[#42414d] rounded-sm flex items-center justify-between gap-2 overflow-hidden">
                <div className="truncate text-[#eaeaeb] px-2">
                  <span className="text-[#8cb4ff] mr-2">$</span>
                  npm install -g hackkinshuk
                </div>
                <CopyButton text="npm install -g hackkinshuk" />
              </div>
              <div className="p-1 bg-[#1b1b1b] border border-[#42414d] rounded-sm flex items-center justify-between gap-2 overflow-hidden">
                <div className="truncate text-[#eaeaeb] px-2">
                  <span className="text-[#8cb4ff] mr-2">$</span>
                  cloudkinshuk
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
