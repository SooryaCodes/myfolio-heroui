"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Badge } from "@heroui/badge";
import { Spacer } from "@heroui/spacer";
import { Avatar } from "@heroui/avatar";
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { scrollToSection } from "../scroll-provider";

export const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.85 } },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-10 md:pt-0 px-6 relative">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent via-transparent to-background/30 dark:to-background/10" />
      <div className="absolute inset-0 z-[-2]">
        <div className="absolute inset-0 bg-grid-small-white/[0.025] dark:bg-grid-small-white/[0.05]" />
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <Badge 
            className="mb-6" 
            variant="flat" 
            color="primary" 
            size="lg"
          >
            Full-stack Developer & UI/UX Designer
          </Badge>
        </motion.div>

        <motion.h1 
          variants={item} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-4"
        >
          Crafting Digital <span className="text-primary">Experiences</span>
          <br />
          with <span className="text-primary">Precision</span> & <span className="text-primary">Passion</span>
        </motion.h1>

        <motion.p 
          variants={item} 
          className="max-w-2xl text-lg text-foreground/80 mb-8"
        >
          I build innovative, pixel-perfect, and accessible digital products 
          that connect brands with their users through intuitive and engaging experiences.
        </motion.p>

        <motion.div 
          variants={item} 
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <Link 
            onClick={() => scrollToSection("projects")}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
          >
            View Projects <FiArrowRight className="ml-2" />
          </Link>
          <Link 
            isExternal
            href="https://github.com/yourusername"
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
          >
            <FiGithub className="mr-2" /> GitHub Profile
          </Link>
        </motion.div>

        <Spacer y={4} />

        <motion.div variants={item} className="flex items-center gap-6">
          <Avatar 
            src="https://i.pravatar.cc/150?img=68" 
            size="lg"
            className="border-4 border-background"
          />
          <div className="flex gap-4">
            <Link
              isExternal
              href="https://github.com/yourusername"
              className="bg-default/20 hover:bg-default/40 p-3 rounded-full transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </Link>
            <Link
              isExternal
              href="https://twitter.com/yourusername"
              className="bg-default/20 hover:bg-default/40 p-3 rounded-full transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter size={20} />
            </Link>
            <Link
              isExternal
              href="https://linkedin.com/in/yourusername"
              className="bg-default/20 hover:bg-default/40 p-3 rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}; 