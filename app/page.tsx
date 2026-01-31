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
import Image from "next/image";

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
    {
      platform: "Instagram",
      url: "http://instagram.com/kinshuk.0",
      icon: "instagram",
      handle: "@kinshuk.0",
    },
    {
      platform: "Credly",
      url: "https://www.credly.com/users/kinshuk004",
      icon: "award",
      handle: "@kinshuk004",
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
      className="p-1 cursor-pointer hover:text-blue-600 transition-colors flex-shrink-0"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-black" />
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
    case "instagram":
      return (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.335.012 7.052.07 2.695.278.273 2.882.06 7.052.009 8.333 0 8.756 0 12s.012 3.667.06 4.948c.213 4.17 2.635 6.774 6.948 6.932 1.284.058 1.705.07 4.052.07 2.347 0 2.768-.012 4.052-.07 4.305-.158 6.734-2.764 6.949-6.932.048-1.281.06-1.702.06-4.948 0-3.246-.012-3.667-.06-4.948-.216-4.165-2.639-6.774-6.949-6.932C15.667.012 15.246 0 12 0z" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="18.406" cy="5.594" r="0.9" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Home() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-16 lg:pt-20 xl:pt-30 bg-white">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Header Section */}
        <header className="mb-6 sm:mb-8 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Profile Image */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full  overflow-hidden">
                <Image
                  src={CONFIG.personal.photoUrl || "/placeholder.svg"}
                  alt="Kinshuk Jain"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                Kinshuk Jain
              </h1>
              <p className="text-base sm:text-lg text-black mb-4">
                Student first. Builder always.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-2 sm:gap-3 mb-4 justify-center sm:justify-start flex-wrap">
                {CONFIG.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-black  text-white  rounded-full transition-colors"
                    title={social.handle}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>

              {/* Location and Status */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 sm:gap-3 text-sm md:text-base text-black justify-center sm:justify-start">
                <div className="flex p-2 sm:p-3bg-white] rounded-2xl items-center gap-1.5">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold  sm:text-sm md:text-base">
                    {CONFIG.personal.location}
                  </span>
                </div>
                <span className="hidden sm:inline text-black">|</span>
                <div className="flex items-center gap-1.5 text-black p-2 sm:p-3 bg-white font-bold rounded-2xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Available for opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="text-xs sm:text-sm md:text-base text-black leading-relaxed space-y-3 max-w-2xl">
            <p>
              I am currently pursuing my Bachelors in Electrical Engineering
              learning how systems work, how they fail, and how they evolve.
              Alongside that, I am exploring the cloud, building small things
              that might someday scale, experimenting with infrastructure, and
              understanding how technology connects people.
            </p>
          </div>
        </header>

        {/* Resume Download */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Resume
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-centerbg-white] rounded-2xl sm:rounded-3xl justify-between gap-3 p-4">
            <div>
              <h3 className="font-semibold text-black text-xs sm:text-sm md:text-base">
                My Resume
              </h3>
              <p className="text-xs sm:text-sm text-black">PDF Format</p>
            </div>
            <a
              href="/kinshukfinalresume.pdf"
              download="kinshukfinalresume.pdf"
              className="inline-flex items-center gap-2 text-white p-3 sm:p-2 bg-gray-700 rounded-md font-bold transition-colors text-xs sm:text-sm md:text-base"
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              Download
            </a>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Publications
          </h2>
          <div className="p-4bg-white] rounded-2xl sm:rounded-3xl">
            <h3 className="font-semibold text-black text-sm sm:text-base md:text-lg mb-2">
              Technical Blog
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-black mb-4 leading-relaxed">
              Research notes, security findings, and technical deep-dives on
              cloud infrastructure and systems architecture.
            </p>
            <a
              href="/home-blog"
              className="inline-flex items-center gap-2 text-white   p-3 sm:p-2 bg-gray-700 rounded-md  font-bold transition-colors text-xs sm:text-sm md:text-base"
            >
              Check out Blogs
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            </a>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Experience
          </h2>
          <div className="p-4bg-white] rounded-2xl sm:rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-1">
              <h3 className="font-bold text-black text-sm sm:text-base md:text-lg">
                UPPTCL
              </h3>
              <span className="text-xs sm:text-sm text-black">
                July 2025 - Aug 2025
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-black mb-4 font-semibold">
              Uttar Pradesh Power Transmission Corporation Limited
            </p>
            <div className="space-y-3 text-xs sm:text-sm md:text-base text-black leading-relaxed">
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
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Selected Projects
          </h2>
          <div className="space-y-6">
            {CONFIG.projects.map((project) => (
              <div
                key={project.title}
                className="p-4 sm:p-5bg-white] rounded-2xl sm:rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-1">
                  <h3 className="font-bold text-black text-sm sm:text-base md:text-lg">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 p-2 font-semibold  w-max text-xs sm:text-sm md:text-base text-black">
                    <span>{project.type}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4 text-xs sm:text-sm md:text-base text-black leading-relaxed">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mb-4">
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-black uppercase">
                    Technologies:{" "}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base text-black break-words">
                    {project.technologies.join(", ")}
                  </span>
                </div>

                {project.dockerCommand !== "Image is not available" && (
                  <div className=" p-3 mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <code className="text-black whitespace-nowrap sm:break-all">
                        {project.dockerCommand}
                      </code>
                      <CopyButton text={project.dockerCommand} />
                    </div>
                  </div>
                )}

                <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white p-3 sm:p-2  bg-gray-700 rounded-md w-max font-semibold transition-colors text-xs sm:text-sm md:text-base"
                    >
                      View Project
                      <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white p-3 sm:p-2 bg-black hover:bg-gray-900 w-max rounded-md font-semibold transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <Github className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Technical Proficiencies
          </h2>
          <div className="space-y-5">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div
                key={category}
                className="p-4bg-white] rounded-2xl sm:rounded-3xl"
              >
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-black mb-3 uppercase tracking-wide">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 sm:px-3 bg-gray-300 rounded-md py-1.5 sm:py-2 text-xs sm:text-sm text-black font-medium whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Certifications
          </h2>
          <div className="space-y-5">
            {CONFIG.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-4bg-white] rounded-2xl sm:rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-1">
                  <h3 className="font-bold text-black text-xs sm:text-sm md:text-base">
                    {cert.title}
                  </h3>
                  <span className="text-xs p-2 w-max rounded-full font-bold text-black">
                    {cert.year}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-2 py-1 text-xs sm:text-sm mb-3">
                  <Award className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="font-semibold text-black">
                    {cert.organization}
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-black mb-3 leading-relaxed">
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-1bg-gray-300 rounded-full text-xs sm:text-sm text-black font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-gray-700  p-2 sm:p-2 rounded-md  font-bold transition-colors text-xs sm:text-sm md:text-base"
                  >
                    View Credential
                    <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            Education
          </h2>
          <div className="p-4bg-white] rounded-2xl sm:rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-1">
              <h3 className="font-bold text-black text-xs sm:text-sm md:text-base">
                {CONFIG.education.degree}
              </h3>
              <span className="text-xs font-semibold sm:text-sm p-2  w-max text-black">
                {CONFIG.education.period}
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-black mb-1">
              {CONFIG.education.field}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-black mb-3">
              {CONFIG.education.institution}, {CONFIG.education.location}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed">
              {CONFIG.education.description}
            </p>
          </div>
        </section>

        {/* CLI Tool */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wider mb-4">
            CLI Tool
          </h2>
          <div className=" p-4 rounded-2xl sm:rounded-3xl">
            <p className="text-xs sm:text-sm md:text-base text-black mb-4">
              Interactive command-line portfolio viewer built with Node.js
            </p>
            <div className="space-y-1 font-mono text-xs sm:text-sm overflow-x-auto">
              <div className=" rounded-lg sm:rounded-xl p-1 whitespace-nowrap">
                <span className="text-green-400">$</span>{" "}
                <span className="text-black">npm install -g hackkinshuk</span>
              </div>
              <div className=" rounded-lg sm:rounded-xl p-1 whitespace-nowrap">
                <span className="text-green-400">$</span>{" "}
                <span className="text-black">cloudkinshuk</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
