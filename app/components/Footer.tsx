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
  icon: React.ElementType;
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
}

const Footer = () => {
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
    { href: "/blogs", label: "Blogs" },
    { href: "/seo-insights", label: "SEO Insights" },
    { href: "/updates", label: "Updates" },
    { href: "/setup", label: "Setup" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and brand section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FaCloud className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                CloudKinshuk
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Building the future, one cloud at a time
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="w-full max-w-md">
            <ul className="flex justify-center items-center gap-6 sm:gap-8 flex-wrap">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-700 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social media links */}
          <div className="w-full max-w-md">
            <div className="flex justify-center items-center gap-4 sm:gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright section */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Kinshuk Jain. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">Made with ❤️ and lots of ☕</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
