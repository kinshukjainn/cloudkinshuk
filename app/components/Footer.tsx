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

interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
}

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
    href: "https://instagram.com/kinshuukjainn",
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
    <footer className="bg-black   relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="flex flex-col items-center space-y-10">
          {/* Logo and brand section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 group">
              <FaCloud className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 transition-transform duration-300 group-hover:scale-110" />

              <div className="relative flex items-center h-10 sm:h-12">
                <h2 className="text-5xl  sm:text-5xl lg:text-6xl font-semibold text-white flex items-center">
                  CloudKinshuk
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white max-w-sm mx-auto">
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
                    className="text-sm sm:text-base text-gray-200 hover:text-blue-400 transition-colors duration-300 relative group py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
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
                    className="text-[#888888] hover:text-white hover:-translate-y-1 transition-all duration-300 transform"
                    aria-label={link.label}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright section */}
          <div className="text-center space-y-2 pt-6 border-t border-[#444444] w-full max-w-2xl">
            <p className="text-sm text-[#888888]">
              © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
            </p>
            <p className="text-xs text-[#555555] flex items-center justify-center gap-1">
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
