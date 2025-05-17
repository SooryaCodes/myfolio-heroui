"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiGrid, 
  FiMessageCircle, 
  FiTwitter, 
  FiGithub, 
  FiLinkedin,
  FiShoppingBag,
  FiBookOpen,
  FiCommand,
  FiAward
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <FiHome className="text-lg" />,
    },
    {
      label: "About",
      href: "/#about",
      icon: <FiUser className="text-lg" />,
    },
    {
      label: "Services",
      href: "/#services",
      icon: <FiAward className="text-lg" />,
    },
    {
      label: "Projects",
      href: isHomePage ? "/#projects" : "/projects",
      icon: <FiBriefcase className="text-lg" />,
    },
    {
      label: "Blog",
      href: isHomePage ? "/#blog" : "/blog",
      icon: <FiBookOpen className="text-lg" />,
    },
    {
      label: "Marketplace",
      href: isHomePage ? "/#marketplace" : "/marketplace",
      icon: <FiShoppingBag className="text-lg" />,
    },
    {
      label: "Contact",
      href: "/#contact",
      icon: <FiMessageCircle className="text-lg" />,
    },
  ];

  const socialItems: NavItem[] = [
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: <FiTwitter className="text-lg" />,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: <FiGithub className="text-lg" />,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FiLinkedin className="text-lg" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Update active section based on scroll position
      if (isHomePage) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 300; // Offset for highlighting slightly before reaching the section

        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        });
      }
    };

    // Set handler and remove it on cleanup
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Only show on the homepage
  if (!isHomePage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50 px-4 w-full"
        >
          <nav className="mx-auto max-w-md bg-background/80 backdrop-blur-md border border-foreground/10 rounded-full p-2 flex justify-between shadow-xl">
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`text-xs flex flex-col items-center justify-center p-2 rounded-full transition-colors ${
                      activeSection === item.href.split("#")[1] || 
                      (item.href === "/" && activeSection === "home") || 
                      (item.href.includes("projects") && activeSection === "projects") ||
                      (item.href.includes("blog") && activeSection === "blog") ||
                      (item.href.includes("marketplace") && activeSection === "marketplace")
                        ? "text-primary bg-primary/10"
                        : "text-foreground/60 hover:text-foreground/80 hover:bg-foreground/5"
                    }`}
                    aria-label={item.label}
                    title={item.label}
                    onClick={(e) => {
                      if (item.href.includes("#") && isHomePage) {
                        e.preventDefault();
                        const targetId = item.href.split("#")[1];
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                          window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: "smooth",
                          });
                        }
                      }
                    }}
                  >
                    {item.icon}
                    <span className="text-[10px] mt-1 opacity-70">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-10 w-px bg-foreground/10 self-center mx-1"></div>
            <div className="flex items-center">
              <button className="text-foreground/60 hover:text-primary p-2 rounded-full transition-colors bg-foreground/5 flex items-center justify-center">
                <FiCommand className="text-lg" />
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};