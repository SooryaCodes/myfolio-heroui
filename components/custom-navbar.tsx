"use client";

import { useState, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { scrollToSection } from "@/components/scroll-provider";

export const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      
      // Determine which section is active
      const sections = ["hero", "services", "projects", "skills", "experience", "testimonials", "contact"];
      
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

  // Updated navigation items to include Services
  const navItems = [
    { label: "Home", href: "/", section: "hero" },
    { label: "Services", href: "/services", section: "services" },
    { label: "Projects", href: "/projects", section: "projects" },
    { label: "Skills", href: "/skills", section: "skills" },
    { label: "Experience", href: "/experience", section: "experience" },
    { label: "Testimonials", href: "/testimonials", section: "testimonials" },
    { label: "Contact", href: "/contact", section: "contact" },
  ];

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky" 
      className={`transition-all duration-300 ${
        scrolled 
          ? "glass-premium shadow-sm" 
          : "bg-transparent py-4"
      }`}
      classNames={{
        wrapper: "px-4 sm:px-8",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-primary/30 mix-blend-overlay z-20"></div>
                <span className="absolute inset-0 flex items-center justify-center text-foreground font-bold z-30">J</span>
              </div>
            </motion.div>
            <motion.p 
              className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70"
              initial={{ opacity: 1 }}
              whileHover={{ 
                opacity: [1, 0.8, 1],
                transition: { duration: 1, repeat: Infinity }
              }}
            >
              JOHAN
            </motion.p>
          </NextLink>
        </NavbarBrand>
        
        <motion.ul 
          className="hidden lg:flex gap-8 justify-start ml-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
              
            return (
              <motion.li key={item.href} variants={{ hidden: { y: -10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                <NavbarItem>
                  <Link
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium py-2",
                      "relative group"
                    )}
                    color="foreground"
                    data-active={isActive}
                    onClick={() => scrollToSection(item.section)}
                  >
                    {item.label}
                    <span className={`absolute left-0 bottom-0 w-full h-[2px] transform origin-left transition-transform duration-300 ${isActive ? 'bg-primary scale-x-100' : 'bg-primary/40 scale-x-0 group-hover:scale-x-100'}`}></span>
                  </Link>
                </NavbarItem>
              </motion.li>
            );
          })}
        </motion.ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-6">
          <Link 
            isExternal 
            aria-label="Twitter" 
            href={siteConfig.links.twitter}
            className="relative overflow-hidden group"
          >
            <FiTwitter className="text-muted transition-transform duration-300 group-hover:translate-y-[-100%]" />
            <FiTwitter className="text-primary absolute top-0 left-0 transition-transform duration-300 translate-y-[100%] group-hover:translate-y-0" />
          </Link>
          <Link 
            isExternal 
            aria-label="LinkedIn" 
            href={siteConfig.links.linkedin}
            className="relative overflow-hidden group"
          >
            <FiLinkedin className="text-muted transition-transform duration-300 group-hover:translate-y-[-100%]" />
            <FiLinkedin className="text-primary absolute top-0 left-0 transition-transform duration-300 translate-y-[100%] group-hover:translate-y-0" />
          </Link>
          <Link 
            isExternal 
            aria-label="Github" 
            href={siteConfig.links.github}
            className="relative overflow-hidden group"
          >
            <FiGithub className="text-muted transition-transform duration-300 group-hover:translate-y-[-100%]" />
            <FiGithub className="text-primary absolute top-0 left-0 transition-transform duration-300 translate-y-[100%] group-hover:translate-y-0" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="btn-premium px-6 group"
            onClick={() => scrollToSection("contact")}
            variant="ghost"
            endContent={
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            }
          >
            Let's Talk
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <FiGithub className="text-muted" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-lg pt-8">
        <div className="mx-4 mt-8 flex flex-col gap-5">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color="foreground"
                className="text-xl font-medium w-full flex justify-between items-center group"
                onClick={() => scrollToSection(item.section)}
                size="lg"
              >
                <span>{item.label}</span>
                <FiArrowRight className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
}; 