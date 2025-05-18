"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiGrid,
  FiCode,
  FiBriefcase,
  FiMessageCircle,
  FiLayers,
  FiStar,
  FiShoppingBag,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { scrollToSection } from "@/components/scroll-provider";

export const FloatingNavbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Determine which section is active
    const handleScroll = () => {
      const sections = [
        "hero",
        "services",
        "projects",
        "skills",
        "experience",
        "testimonials",
        "marketplace",
        "blog",
        "contact",
      ];

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Only show essential items on mobile
  const navItems = isMobile 
    ? [
        { id: "hero", label: "Home", icon: <FiHome size={16} /> },
        { id: "projects", label: "Projects", icon: <FiGrid size={16} /> },
        { id: "marketplace", label: "Marketplace", icon: <FiShoppingBag size={16} /> },
        { id: "contact", label: "Contact", icon: <FiMessageCircle size={16} /> },
      ]
    : [
        { id: "hero", label: "Home", icon: <FiHome size={18} /> },
        { id: "services", label: "Services", icon: <FiLayers size={18} /> },
        { id: "projects", label: "Projects", icon: <FiGrid size={18} /> },
        { id: "skills", label: "Skills", icon: <FiCode size={18} /> },
        { id: "experience", label: "Experience", icon: <FiBriefcase size={18} /> },
        { id: "marketplace", label: "Marketplace", icon: <FiShoppingBag size={18} /> },
        { id: "blog", label: "Blog", icon: <FiStar size={18} /> },
        { id: "contact", label: "Contact", icon: <FiMessageCircle size={18} /> },
      ];

  const handleNavigation = (id: string, externalLink?: string) => {
    if (externalLink) {
      // External navigation handled by Link component
      return;
    }
    scrollToSection(id);
  };

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center pb-4"
      initial={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
    >
      <div className="glass-premium rounded-full flex items-center justify-between px-3 md:px-4 py-2 md:py-3 gap-1 md:gap-2 border border-border w-auto shadow-lg">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="navbar-icon"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Tooltip content={item.label}>
              <Button
                isIconOnly
                className="navbar-icon-inner w-8 h-8 md:w-9 md:h-9"
                color={activeSection === item.id ? "primary" : "default"}
                radius="full"
                size="sm"
                variant={activeSection === item.id ? "flat" : "light"}
                onClick={() => handleNavigation(item.id)}
              >
                {item.icon}
              </Button>
            </Tooltip>
          </div>
        ))}

        {/* Theme switcher */}
        <div
          className="navbar-icon"
          onMouseEnter={() => setHoveredItem("theme")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Tooltip
            content={mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            <Button
              isIconOnly
              className="navbar-icon-inner w-8 h-8 md:w-9 md:h-9"
              color="default"
              radius="full"
              size="sm"
              variant="light"
              onClick={toggleTheme}
            >
              {mounted && theme === "dark" ? (
                <FiSun size={isMobile ? 16 : 18} />
              ) : (
                <FiMoon className="text-foreground" size={isMobile ? 16 : 18} />
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};
