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
      title:
        "Mscada : AI-Powered Fault Detection System for Power Transmission",
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
      links: {
        live: null,
        repo: "https://github.com/kinshukjainn/m-scada",
      },
      dockerCommand: "",
    },
    {
      title: "EndVault : Your personal Password manager",
      year: "2025-26",
      status: "Completed",
      type: "Security Tool",
      description: [
        "EndVault is a modern, end-to-end encrypted password vault engineered for absolute privacy. By strictly separating authentication from decryption, your master key never leaves your browser's local memory. Say goodbye to cloud vulnerabilities and hello to a private ecosystem where the server remains a blind gatekeeper never a reader.",
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
      className="text-xs font-bold text-emerald-400 cursor-pointer rounded-lg hover:text-emerald-300 hover:bg-emerald-400/10 px-3 py-1.5 transition-colors focus:outline-none border border-emerald-500/20"
      title="Copy to clipboard"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "github":
      return <Github className="w-4 h-4 mr-2 inline" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4 mr-2 inline" />;
    case "mail":
      return <Mail className="w-4 h-4 mr-2 inline" />;
    case "x":
      return (
        <svg
          className="w-4 h-4 mr-2 inline"
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
    className="text-3xl font-bold  text-gray-100 pb-2 mt-12 mb-6 flex items-center border-b border-zinc-800"
  >
    <span className="text-emerald-500 mr-3 text-3xl">#</span>
    {title}
  </h2>
);

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#1e1e1e] text-gray-300 selection:bg-yellow-200 selection:text-black overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16 stagger">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl   font-extrabold tracking-tight text-white mb-2">
              cloud<span className="text-yellow-600">kinshuk</span>.in
            </h1>
            <p className="text-sm font-medium text-green-400 uppercase tracking-wider">
              Student • Builder • Cloud
            </p>
          </div>

          <nav className="hidden lg:flex flex-col gap-3 text-sm font-medium">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Shipped Stuff" },
              { id: "experience", label: "Experience" },
              { id: "skills", label: "Proficiencies" },
              { id: "certifications", label: "Certifications" },
              { id: "education", label: "Education" },
              { id: "terminal", label: "Terminal Access" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-zinc-200 hover:text-blue-300 transition-colors flex items-center group"
              >
                <span className="w-4 h-px bg-zinc-100 group-hover:bg-blue-300  mr-3 transition-colors" />
                {link.label}
              </a>
            ))}
          </nav>

          <div className="p-5 ">
            <h3 className="font-bold text-sm uppercase tracking-wider text-green-500 mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {CONFIG.social.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-100 hover:text-blue-400 underline transition-colors flex items-center text-sm font-medium group"
                  >
                    <span className="text-zinc-100  group-hover:text-blue-400 transition-colors">
                      <SocialIcon icon={social.icon} />
                    </span>
                    {social.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 pb-16">
          {/* HEADER / INTRO */}
          <section id="about" className="mb-16">
            <div className="text-base text-zinc-300 leading-relaxed space-y-5">
              <p className="text-3xl font-bold text-white mb-6">
                Hi everyone! My name is{" "}
                <strong className="font-bold text-yellow-500 ">Kinshuk</strong>.
              </p>
              {CONFIG.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-100 border border-blue-400 px-4 py-2 rounded-full">
              <FaLocationPin className="text-blue-500" />
              {CONFIG.personal.location}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/myresume.pdf"
                download="myresume.pdf"
                className="inline-flex items-center justify-center rounded-full border border-yellow-400/50 bg-yellow-500 px-4 py-1 text-md font-bold text-black transition hover:bg-yellow-400"
              >
                Download Resume
              </a>
              <a
                href="/home-blog"
                className="inline-flex items-center justify-center rounded-full  bg-green-500 px-4 py-1 text-md font-bold text-black transition hover:bg-green-400"
              >
                Read Blog
              </a>
            </div>
          </section>

          {/* PROJECTS */}
          <SectionHeader title="Shipped Stuff" id="projects" />
          <div className="space-y-6 mb-16">
            {CONFIG.projects.map((project, idx) => (
              <div
                key={idx}
                className=" border border-[#444444]  rounded-md p-6 sm:p-8 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-green-500">
                    {project.title}
                  </h3>
                  <div className="flex gap-1 text-xs font-semibold">
                    <span className="px-3 py-2 bg-red-700 text-white rounded-md border border-emerald-500/20">
                      {project.status}
                    </span>
                    <span className="px-6 py-2 bg-blue-700 text-white rounded-md ">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-zinc-100 space-y-3 mb-6">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-green-500 font-bold mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 border-2 border-blue-800 rounded-lg text-xs font-medium text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.dockerCommand && (
                  <div className="mb-6 bg-black border border-zinc-800 rounded-xl p-3 flex justify-between items-center group">
                    <code className="text-xs font-mono text-zinc-300 pl-2">
                      <span className="text-emerald-500 mr-2">$</span>
                      {project.dockerCommand}
                    </code>
                    <CopyText text={project.dockerCommand} />
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-black  bg-yellow-600  px-5 py-1 rounded-full transition-colors flex items-center gap-2"
                    >
                      View Live Project
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white bg-black  px-5 py-1 rounded-full transition-colors flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" /> Repository
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* EXPERIENCE */}
          <SectionHeader title="Where I Worked" id="experience" />
          <div className="mb-16  border border-zinc-600 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
              <h3 className="font-bold text-3xl text-green-500">UPPTCL</h3>
              <span className="text-sm font-medium text-white px-4 py-1 w-max border border-blue-400 rounded-full mt-1 sm:mt-0">
                July 2025 - Aug 2025
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-200 mb-4">
              Uttar Pradesh Power Transmission Corporation Limited
            </p>
            <p className="text-sm text-zinc-100 leading-relaxed mb-6">
              Worked with the transmission division to understand the operation,
              protection, and maintenance of 132kV and 220kV substations.
              Prepared technical documentation and maintained logs on equipment
              performance and safety checks.
            </p>
            <a
              href="/home-blog/blogE"
              className="inline-flex items-center text-sm font-bold bg-green-600 px-4 py-2 rounded-full text-black  transition-colors group"
            >
              Read article{" "}
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          {/* SKILLS */}
          <SectionHeader title=" crazy stuff i use" id="skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {Object.entries(CONFIG.skills).map(([category, skills]) => (
              <div
                key={category}
                className=" border border-[#444444] rounded-xl p-5"
              >
                <h3 className="font-semibold text-green-500 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5  border-3 border-zinc-700 rounded-lg text-xs font-medium text-zinc-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CERTIFICATIONS */}
          <SectionHeader title="Certifications i did..." id="certifications" />
          <div className="space-y-4 mb-16">
            {CONFIG.certifications.map((cert, idx) => (
              <div
                key={idx}
                className=" border border-[#444444] rounded-2xl p-5 sm:p-6 relative overflow-hidden"
              >
                {/* Left accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />

                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                  <h3 className="font-bold text-green-500 text-lg leading-tight">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                      >
                        {cert.title}
                      </a>
                    ) : (
                      cert.title
                    )}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold px-2.5 py-1 border border-blue-400 rounded-full text-white ">
                    {cert.year}
                  </span>
                </div>

                <div className="text-xs font-medium text-white mb-3">
                  {cert.organization} • {cert.status}
                </div>

                <p className="text-sm text-gray-100 mb-4">{cert.description}</p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-white font-medium"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <SectionHeader title="Education" id="education" />
          <div className="mb-16 border border-[#444444] rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
              <h3 className="font-bold text-xl text-green-500">
                {CONFIG.education.institution}
              </h3>
              <span className="text-sm font-medium text-white px-4 py-1 border border-blue-400 rounded-full mt-1 sm:mt-0">
                {CONFIG.education.period}
              </span>
            </div>
            <p className="text-sm font-medium text-white  mb-4">
              {CONFIG.education.location}
            </p>
            <p className="text-base text-zinc-200 font-semibold mb-3">
              {CONFIG.education.degree} in {CONFIG.education.field}
            </p>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {CONFIG.education.description}
            </p>
          </div>

          {/* CLI TOOL */}
          <SectionHeader title="Terminal Access" id="terminal" />
          <div className=" border border-[#444444] rounded-3xl p-6 sm:p-8">
            <p className="text-sm text-zinc-100 mb-5">
              Interactive command-line portfolio viewer built with Node.js.
              Install it globally via npm.
            </p>
            <div className="bg-black border border-zinc-800 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between p-2  rounded-xl transition-colors">
                <code className="text-sm font-mono text-emerald-400 pl-2">
                  <span className="text-zinc-600 mr-2">$</span>npm install -g
                  hackkinshuk
                </code>
                <CopyText text="npm install -g hackkinshuk" />
              </div>
              <div className="flex items-center justify-between p-2  rounded-xl transition-colors">
                <code className="text-sm font-mono text-emerald-400 pl-2">
                  <span className="text-zinc-600 mr-2">$</span>cloudkinshuk
                </code>
                <CopyText text="cloudkinshuk" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-[#09090b] relative z-10 text-center py-8 px-4">
        <p className="text-sm text-zinc-500 font-medium">
          © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
