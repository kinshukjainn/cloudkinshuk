"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { FaLocationPin } from "react-icons/fa6";
const CONFIG = {
  personal: {
    email: "kinshuk25jan04@gmail.com",
    location: "Ghaziabad, UP, India",
    bio: [
      "Student first. Builder always.",
      "I am currently pursuing my Bachelor's in Electrical Engineering learning how systems work, how they fail, and how they evolve. Alongside that, I am exploring the cloud, building small things that might someday scale, experimenting with infrastructure, and understanding how technology connects people.",
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
      "Lucide React ",
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
      title:
        "Mscada : AI-Powered Fault Detection System for Power Transmission",
      year: "2025-2026",
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
        "React icons",
        "Plotly.js",
        "Amazon Bedrock",
        "Amazon Route53",
        "Amazon Amplify",
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
      className="text-sm font-bold text-white cursor-pointer rounded-2xl hover:text-white bg-green-700  px-3 py-2 ml-2 transition-none focus:outline-none"
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
    className="text-xl font-bold text-gray-100  pb-1 mt-8 mb-4 flex items-center"
  >
    <span className="w-4 h-6 text-2xl mr-2 inline-block">{"#"}</span>
    {title}
  </h2>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#333333]  selection:bg-blue-300 selection:text-black">
      {/* Top Green Bar - Classic utilitarian styling */}
      <div className="h-2 w-full bg-[#212121]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          {/* Logo Area */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-gray-300">
              <span className="text-white">cloud</span>kinshuk.in
            </h1>
            <p className="text-sm text-gray-300 mt-1 pb-4">
              Student • Builder • Cloud
            </p>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex flex-col gap-1 text-sm font-bold">
            <a href="#about" className="text-green-400 hover:underline ">
              {"- "}About
            </a>
            <a href="#projects" className="text-green-400 hover:underline">
              {"- "}Shipped Stuff
            </a>
            <a href="#experience" className="text-green-400 hover:underline">
              {"- "}Experience
            </a>
            <a href="#skills" className="text-green-400 hover:underline">
              {"- "}Proficiencies
            </a>
            <a
              href="#certifications"
              className="text-green-400 hover:underline"
            >
              {"- "}Certifications
            </a>
            <a href="#education" className="text-green-400 hover:underline">
              {"- "}Education
            </a>
            <a href="#terminal" className="text-green-400 hover:underline">
              {"- "}Terminal Access
            </a>
          </nav>

          {/* Social Links Box */}
          <div className=" p-3 text-sm">
            <h3 className="font-bold text-lg mb-2 text-gray-200">
              {"# "}Connect
            </h3>
            <ul className="space-y-2">
              {CONFIG.social.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-400  hover:underline flex items-center"
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
            <div className="text-[15px] text-white leading-relaxed space-y-3">
              <p className="text-2xl">
                Hi everyone! My name is{" "}
                <strong className="font-bold text-green-400">Kinshuk</strong>.
              </p>
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p className="" key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-4 text-md text-gray-200  ">
              <span className="font-bold text-white">
                <FaLocationPin className="inline mr-1 text-white" />
                Location:{" "}
              </span>
              {CONFIG.personal.location}
            </div>

            {/* FFmpeg-style Big Download Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="/myresume.pdf"
                download="myresume.pdf"
                className="bg-green-600 text-white font-bold py-4 px-4 rounded-full  active:border-b-0 active:mt-[4px] transition-all inline-block"
              >
                Download Resume
              </a>
              <a
                href="/home-blog"
                className="bg-blue-700 text-white font-bold rounded-full py-4 px-3  transition-all inline-block"
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
                className=" bg-[#252525] border-2 border-[#181818] rounded-2xl p-4"
              >
                <div className="flex flex-col sm:flex-row justify-between mb-2 pb-2">
                  <h3 className="text-2xl font-bold text-green-400">
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-300  mt-1 sm:mt-0">
                    {project.year} | {project.status} | {project.type}
                  </span>
                </div>

                <div className="text-[14px] text-gray-200  space-y-2 mb-4">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="text-[13px]  text-white p-2  mb-3">
                  <strong className="text-green-200 font-semibold">
                    Stack:
                  </strong>{" "}
                  {project.technologies.join(", ")}
                </div>

                {project.dockerCommand && (
                  <div className="mb-3">
                    <strong className="text-[13px] text-white">
                      Docker Pull Command:
                    </strong>
                    <div className=" text-[12px]   mt-1 flex justify-between items-center">
                      <span className="font-mono text-white">
                        $ {project.dockerCommand}
                      </span>
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
                      className="text-white  p-2 bg-green-700 rounded-2xl"
                    >
                      ▶ Checkout live
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white p-2 bg-black rounded-2xl "
                    >
                      ▶ Github repository
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <SectionHeader title="Where I worked" id="experience" />
          <div className="mb-8">
            <h3 className="font-bold text-green-400 text-lg">UPPTCL</h3>
            <p className="text-sm font-semibold text-white mb-2">
              Uttar Pradesh Power Transmission Corporation Limited (July 2025 -
              Aug 2025)
            </p>
            <p className="text-[14px] text-gray-100  mb-2">
              Worked with the transmission division to understand the operation,
              protection, and maintenance of 132kV and 220kV substations.
              Prepared technical documentation and maintained logs on equipment
              performance and safety checks.
            </p>
            <a
              href="/home-blog/blogE"
              className="text-white bg-green-600 p-2 rounded-2xl text-sm font-semibold "
            >
              ▶ Read article
            </a>
          </div>

          {/* Technical Proficiencies */}
          <SectionHeader title="Crazy Stuff I know" id="skills" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-bold text-green-400 mb-2 ">{category}</h3>
                <ul className="list-['-'] list-inside text-[14px]  text-white">
                  {skills.map((skill) => (
                    <li key={skill}> {skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <SectionHeader title="Certifications" id="certifications" />
          <div className="space-y-4 mb-8">
            {CONFIG.certifications.map((cert, idx) => (
              <div key={idx} className="border-l-4 border-white pl-3 py-1">
                <h3 className="font-bold">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    <span className="text-gray-400">{cert.title}</span>
                  )}
                  <span className="text-sm font-normal text-gray-200 ml-2">
                    ({cert.year})
                  </span>
                </h3>
                <p className="text-[13px] font-bold text-gray-300">
                  {cert.organization} | Status: {cert.status}
                </p>
                <p className="text-[14px] text-white  mt-1">
                  {cert.description}
                </p>
                <p className="text-[15px] text-gray-200 mt-1 ">
                  Skills: {cert.skills.join(" • ")}
                </p>
              </div>
            ))}
          </div>

          {/* Education */}
          <SectionHeader title="Education" id="education" />
          <div className="mb-8">
            <h3 className="font-bold text-green-400 text-lg">
              {CONFIG.education.institution}
            </h3>
            <p className="text-sm text-gray-300 ">
              {CONFIG.education.location} | {CONFIG.education.period}
            </p>
            <p className="text-[14px] text-white font-bold mt-2">
              {CONFIG.education.degree} — {CONFIG.education.field}
            </p>
            <p className="text-[14px] text-gray-100  mt-1">
              {CONFIG.education.description}
            </p>
          </div>

          {/* CLI Tool */}
          <SectionHeader title="Terminal Access" id="terminal" />
          <div className="bg-[#252525] border border-[#181818] rounded-2xl p-4">
            <p className="text-[14px] text-white  mb-3">
              Interactive command-line portfolio viewer built with Node.js.
              Install it globally via npm.
            </p>
            <div className=" text-[13px] bg-[#202020] border border-[#141414] rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-green-400">
                  $ npm install -g hackkinshuk
                </span>
                <CopyText text="npm install -g hackkinshuk" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-green-400">$ cloudkinshuk</span>
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
