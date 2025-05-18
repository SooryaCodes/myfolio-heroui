"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiGrid, FiCode, FiBriefcase, FiMessageCircle, FiLayers, FiStar, FiShoppingBag, FiSun, FiMoon, FiZap } from "react-icons/fi";
import { scrollToSection } from "@/components/scroll-provider";
import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";

export const FloatingNavbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Determine which section is active
    const handleScroll = () => {
      const sections = ["hero", "services", "projects", "skills", "experience", "testimonials", "marketplace", "blog", "contact"];
      
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

  const navItems = [
    { id: "hero", label: "Home", icon: <FiHome size={18} /> },
    { id: "services", label: "Services", icon: <FiLayers size={18} /> },
    { id: "projects", label: "Projects", icon: <FiGrid size={18} />,  },
    { id: "skills", label: "Skills", icon: <FiCode size={18} /> },
    { id: "experience", label: "Experience", icon: <FiBriefcase size={18} /> },
    { id: "marketplace", label: "Marketplace", icon: <FiShoppingBag size={18} />,  },
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
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center pb-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
    >
      <div className="glass-premium rounded-full flex items-center justify-between px-4 py-3 gap-1 md:gap-2 border border-border w-auto shadow-lg">
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
                  variant={activeSection === item.id ? "flat" : "light"}
                  color={activeSection === item.id ? "primary" : "default"}
                  radius="full"
                  size="sm"
                  className="navbar-icon-inner w-9 h-9"
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
          <Tooltip content={mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}>
            <Button
              isIconOnly
              variant="light"
              color="default"
              radius="full"
              size="sm"
              className="navbar-icon-inner w-9 h-9"
              onClick={toggleTheme}
            >
              {mounted && theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} className="text-foreground" />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};