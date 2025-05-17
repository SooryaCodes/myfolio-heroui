"use client";

import React from "react";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { scrollToSection } from "../scroll-provider";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developerName = "Johan Beker"; // Developer name - consistent with other components

  return (
    <footer className="dark:bg-black/80 bg-gray-50/80 py-16 px-6 border-t dark:border-white/5 border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/logos/logo.svg" 
                alt="Developer Logo" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <h2 className="text-2xl font-bold dark:text-white text-gray-900">{developerName}</h2>
            </div>
            <p className="dark:text-white/70 text-gray-600 max-w-md">
              A passionate developer and designer creating beautiful and
              functional digital experiences for clients worldwide.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                isExternal
                href="https://github.com/yourusername"
                className="dark:bg-white/10 bg-black/5 hover:bg-primary/20 p-3 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={18} className="dark:text-white text-gray-900" />
              </Link>
              <Link
                isExternal
                href="https://twitter.com/yourusername"
                className="dark:bg-white/10 bg-black/5 hover:bg-primary/20 p-3 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} className="dark:text-white text-gray-900" />
              </Link>
              <Link
                isExternal
                href="https://linkedin.com/in/yourusername"
                className="dark:bg-white/10 bg-black/5 hover:bg-primary/20 p-3 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} className="dark:text-white text-gray-900" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => scrollToSection("hero")}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => scrollToSection("about")}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => scrollToSection("projects")}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => scrollToSection("skills")}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => scrollToSection("contact")}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li className="dark:text-white/70 text-gray-600 flex items-start gap-3">
                <FiMapPin className="mt-1 text-primary" />
                <span>Berlin, Germany</span>
              </li>
              <li>
                <Link
                  isExternal
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-start gap-3"
                  href="mailto:johan.beker@example.com"
                >
                  <FiMail className="mt-1 text-primary" />
                  <span>johan.beker@example.com</span>
                </Link>
              </li>
              <li>
                <Link
                  isExternal
                  className="dark:text-white/70 text-gray-600 hover:text-primary transition-colors flex items-start gap-3"
                  href="tel:+1234567890"
                >
                  <FiPhone className="mt-1 text-primary" />
                  <span>+49 (234) 567-890</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Spacer y={10} />
        <Divider className="dark:bg-white/10 bg-black/10" />
        <Spacer y={6} />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image 
                src="/images/avatar.jpg" 
                alt={developerName} 
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm dark:text-white/60 text-gray-500">
              © {currentYear} {developerName}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              className="text-sm dark:text-white/60 text-gray-500 hover:text-primary transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm dark:text-white/60 text-gray-500 hover:text-primary transition-colors"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm dark:text-white/60 text-gray-500 hover:text-primary transition-colors"
              href="/sitemap"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 