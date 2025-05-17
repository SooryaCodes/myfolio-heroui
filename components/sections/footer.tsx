"use client";

import React from "react";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { scrollToSection } from "../scroll-provider";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-default-100/50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-2xl font-bold">Developer Portfolio</h2>
            <p className="text-foreground/70 max-w-md">
              A passionate developer and designer creating beautiful and
              functional digital experiences for clients worldwide.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                isExternal
                href="https://github.com/yourusername"
                className="bg-default/20 hover:bg-default/40 p-3 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </Link>
              <Link
                isExternal
                href="https://twitter.com/yourusername"
                className="bg-default/20 hover:bg-default/40 p-3 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </Link>
              <Link
                isExternal
                href="https://linkedin.com/in/yourusername"
                className="bg-default/20 hover:bg-default/40 p-3 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => scrollToSection("hero")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => scrollToSection("projects")}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => scrollToSection("skills")}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-foreground/70">San Francisco, CA, USA</li>
              <li>
                <Link
                  isExternal
                  className="text-foreground/70 hover:text-primary transition-colors"
                  href="mailto:your.email@example.com"
                >
                  your.email@example.com
                </Link>
              </li>
              <li>
                <Link
                  isExternal
                  className="text-foreground/70 hover:text-primary transition-colors"
                  href="tel:+1234567890"
                >
                  +1 (234) 567-890
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Spacer y={10} />
        <Divider />
        <Spacer y={6} />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Developer Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
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