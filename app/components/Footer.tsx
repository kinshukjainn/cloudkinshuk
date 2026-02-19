import type React from "react";
import Link from "next/link";
import {
  FaCloud,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

// 1. Improved Type Definition
// Using React.ComponentType or specific generic ensures TS knows this is a renderable component.
interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
}

// 2. Data moved OUTSIDE the component
// This prevents re-creation on every render and fixes TS inference issues inside the component scope.
const socialLinks: SocialLink[] = [
  {
    icon: FaGithub,
    href: "https://github.com/kinshukjainn",
    label: "GitHub",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com/realkinshuk004",
    label: "Twitter",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/kinshukjainn",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/kinshukjainn",
    label: "Instagram",
  },
  {
    icon: FaEnvelope,
    href: "mailto:kinshuk25jan04@gmail.com",
    label: "Email",
  },
];

const navLinks: NavLink[] = [
  { href: "/home-blog", label: "Blogs" },
  { href: "/seo-insights", label: "SEO Insights" },
  { href: "/updates", label: "Updates" },
  { href: "/setup", label: "Setup" },
];

const Footer = () => {
  return (
    <footer className="bg-[#313131] border-t border-white/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="flex flex-col items-center space-y-10">
          {/* Logo and brand section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 group">
              <FaCloud className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />

              <div className="relative flex items-center h-10 sm:h-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center">
                  CloudKinshuk
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 max-w-sm mx-auto">
              Building the future, one cloud at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="w-full">
            <ul className="flex justify-center items-center gap-6 sm:gap-8 flex-wrap">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 relative group py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social media links */}
          <div className="w-full max-w-md">
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all duration-300 transform"
                    aria-label={link.label}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright section */}
          <div className="text-center space-y-2 pt-6 border-t border-white/5 w-full max-w-2xl">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              and lots of ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
