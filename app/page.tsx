"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

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
      handle: "Email",
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
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    "Version Control & Tools": ["Git Terminal", "GitHub Actions", "VS Code"],
  },
  projects: [
    {
      title: "Zeroleaks",
      year: "2024",
      status: "Live",
      type: "Security Tool",
      description: [
        "A modern, secure password generation tool built with React and TypeScript, focusing on creating cryptographically secure passwords with customizable parameters.",
        "Leverages the Web Crypto API for true randomness and implements industry-standard security practices. Deployed with zero-trust security principles, ensuring no passwords are logged or transmitted insecurely.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
        "Web Crypto API",
      ],
      links: {
        live: null,
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
        "An AI-powered Fault Detection System designed to identify and analyze faults in power transmission lines and transformers. Enhances reliability in power grid monitoring by leveraging machine learning models to predict equipment failures.",
        "Built with Next.js 16 and integrated with Open AI OSS Model 120b parameters. Processes real-time sensor data and historical patterns to detect anomalies.",
      ],
      technologies: [
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "Amazon Bedrock",
        "AWS Lambda",
      ],
      links: {
        live: "https://mscada.cloudkinshuk.in",
        repo: "https://github.com/kinshukjainn/m-scada",
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
      className="text-xs font-bold text-white cursor-pointer rounded-sm hover:text-white bg-[#006600] border border-[#006600] px-1 py-1 ml-2 transition-none focus:outline-none"
      title="Copy to clipboard"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "github":
      return <Github className="w-4 h-4 mr-1 inline" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4 mr-1 inline" />;
    case "mail":
      return <Mail className="w-4 h-4 mr-1 inline" />;
    case "x":
      return (
        <svg
          className="w-4 h-4 mr-1 inline"
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

const SectionHeader = ({ title, id }: { title: string; id?: string }) => (
  <h2
    id={id}
    className="text-xl font-bold text-[#333333] border-b-2 border-[#cccccc] pb-1 mt-8 mb-4 flex items-center"
  >
    <span className="w-2 h-4 bg-[#006600] mr-2 inline-block"></span>
    {title}
  </h2>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#333333]  selection:bg-[#006600] selection:text-white">
      {/* Top Green Bar - Classic utilitarian styling */}
      <div className="h-2 w-full bg-[#006600]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          {/* Logo Area */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-[#333333]">
              <span className="text-[#006600]">cloud</span>kinshuk_
            </h1>
            <p className="text-sm text-[#666666] mt-1 border-b border-[#cccccc] pb-4">
              Student • Builder • Cloud
            </p>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex flex-col gap-1 text-sm font-bold">
            <a
              href="#about"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              Shipped Stuff
            </a>
            <a
              href="#experience"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              Proficiencies
            </a>
            <a
              href="#certifications"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              Certifications
            </a>
            <a
              href="#education"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              Education
            </a>
            <a
              href="#terminal"
              className="text-[#006600] hover:underline hover:bg-[#f0f0f0] p-1"
            >
              Terminal Access
            </a>
          </nav>

          {/* Social Links Box */}
          <div className="bg-[#f9f9f9] border border-[#cccccc] p-3 text-sm">
            <h3 className="font-bold mb-2 text-[#333333]">Connect</h3>
            <ul className="space-y-2">
              {CONFIG.social.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#006600] hover:underline flex items-center"
                  >
                    <SocialIcon icon={social.icon} />
                    {social.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 pb-16">
          {/* Header / Intro */}
          <section id="about" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to my portfolio.
            </h2>
            <div className="text-[15px] leading-relaxed space-y-3">
              <p>
                Hi everyone! My name is <strong>Kinshuk</strong>.
              </p>
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-4 text-sm text-[#666666]">
              Location: {CONFIG.personal.location} | Status:{" "}
              {CONFIG.personal.availability}
            </div>

            {/* FFmpeg-style Big Download Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="/myresume.pdf"
                download="myresume.pdf"
                className="bg-[#006600] text-white font-bold py-2 px-6 border-b-4 border-[#004400] hover:bg-[#008800] active:border-b-0 active:mt-[4px] transition-all inline-block"
              >
                Download Resume
              </a>
              <a
                href="/home-blog"
                className="bg-[#eeeeee] text-[#333333] font-bold py-2 px-6 border border-[#cccccc] hover:bg-[#dddddd] transition-all inline-block"
              >
                Read Blog
              </a>
            </div>
          </section>

          {/* Selected Projects */}
          <SectionHeader title="Some shipped Stuff" id="projects" />
          <div className="space-y-8">
            {CONFIG.projects.map((project, idx) => (
              <div
                key={idx}
                className="border border-[#cccccc] bg-[#fdfdfd] p-4"
              >
                <div className="flex flex-col sm:flex-row justify-between mb-2 pb-2 border-b border-[#eeeeee]">
                  <h3 className="text-lg font-bold text-[#006600]">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[#666666]  mt-1 sm:mt-0">
                    [ {project.year} | {project.status} | {project.type} ]
                  </span>
                </div>

                <div className="text-[14px] space-y-2 mb-4">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="text-[13px] bg-[#f4f4f4] p-2 border border-[#dddddd] mb-3">
                  <strong>Stack:</strong> {project.technologies.join(", ")}
                </div>

                {project.dockerCommand && (
                  <div className="mb-3">
                    <strong className="text-[13px]">
                      Docker Pull Command:
                    </strong>
                    <div className=" text-[13px] bg-[#eeeeee] border border-[#cccccc] p-2 mt-1 flex justify-between items-center">
                      <span>$ {project.dockerCommand}</span>
                      <CopyText text={project.dockerCommand} />
                    </div>
                  </div>
                )}

                <div className="text-sm font-bold flex gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#006600] hover:underline"
                    >
                      ▶ View Live Web
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#006600] hover:underline"
                    >
                      ▶ Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <SectionHeader title="Where I worked" id="experience" />
          <div className="mb-8">
            <h3 className="font-bold text-lg">UPPTCL</h3>
            <p className="text-sm text-[#666666] mb-2">
              Uttar Pradesh Power Transmission Corporation Limited (July 2025 -
              Aug 2025)
            </p>
            <p className="text-[14px] mb-2">
              Worked with the transmission division to understand the operation,
              protection, and maintenance of 132kV and 220kV substations.
              Prepared technical documentation and maintained logs on equipment
              performance and safety checks.
            </p>
            <a
              href="/home-blog/blogE"
              className="text-[#006600] text-sm font-bold hover:underline"
            >
              ▶ Read Full Experience Blog
            </a>
          </div>

          {/* Technical Proficiencies */}
          <SectionHeader title="Crazy Stuff I know" id="skills" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div key={category} className="border border-[#cccccc] p-3">
                <h3 className="font-bold text-[#333333] mb-2 bg-[#eeeeee] p-1 border-b border-[#cccccc]">
                  {category}
                </h3>
                <ul className="list-disc list-inside text-[14px] text-[#444444]">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <SectionHeader title="Certifications" id="certifications" />
          <div className="space-y-4 mb-8">
            {CONFIG.certifications.map((cert, idx) => (
              <div key={idx} className="border-l-4 border-[#006600] pl-3 py-1">
                <h3 className="font-bold">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#006600] hover:underline"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                  <span className="text-sm font-normal text-[#666666] ml-2">
                    ({cert.year})
                  </span>
                </h3>
                <p className="text-[13px] font-bold text-[#444444]">
                  {cert.organization} | Status: {cert.status}
                </p>
                <p className="text-[14px] mt-1">{cert.description}</p>
                <p className="text-[12px] text-[#666666] mt-1 ">
                  Skills: {cert.skills.join(" • ")}
                </p>
              </div>
            ))}
          </div>

          {/* Education */}
          <SectionHeader title="Education" id="education" />
          <div className="mb-8">
            <h3 className="font-bold text-lg">
              {CONFIG.education.institution}
            </h3>
            <p className="text-sm text-[#666666] ">
              {CONFIG.education.location} | {CONFIG.education.period}
            </p>
            <p className="text-[14px] font-bold mt-2">
              {CONFIG.education.degree} — {CONFIG.education.field}
            </p>
            <p className="text-[14px] mt-1">{CONFIG.education.description}</p>
          </div>

          {/* CLI Tool */}
          <SectionHeader title="Terminal Access" id="terminal" />
          <div className="bg-[#f8f8f8] border border-[#cccccc] p-4">
            <p className="text-[14px] mb-3">
              Interactive command-line portfolio viewer built with Node.js.
              Install it globally via npm.
            </p>
            <div className=" text-[13px] bg-white border border-[#cccccc] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>$ npm install -g hackkinshuk</span>
                <CopyText text="npm install -g hackkinshuk" />
              </div>
              <div className="flex items-center justify-between">
                <span>$ cloudkinshuk</span>
                <CopyText text="cloudkinshuk" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#cccccc] text-center py-6 text-sm text-[#666666] bg-[#f9f9f9]">
        <p>
          Copyright © {new Date().getFullYear()} Kinshuk Jain. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
